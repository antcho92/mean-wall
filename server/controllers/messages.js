var mongoose = require('mongoose');
var User = mongoose.model('User');
var Message = mongoose.model('Message');
var Comment = mongoose.model('Comment');

module.exports = (function() {
  return {
    index: function(req, res) {
      console.log('index');
      Message.find({})
      .populate('_user')
      .populate({path: 'comments'})
      .exec(function(err, messages) {
        //creating options for the future populate method
        var options = {
          path: 'comments._user',
          model: 'User'
        };
        if (err) {
          res.json(err);
        } else {
          // using options to get the users in comments
          Message.populate(messages, options, function(err, messages) {
            res.json(messages);
          })
        }
      });
    },
    create: function(req, res) {
      User.findOne({_id: req.params.id}, function(err, user) {
        if (err) {
          res.json(err);
        } else {
          // add messages to user
          var message = new Message(req.body);
          console.log(message);
          message._user = user._id;
          message.save(function(err) {
            user.messages.push(message);
            user.save(function(err, user) {
              if (err) {
                res.json(err)
              } else {
                res.json(user);
              }
            })
          })
        }
      })
    },
    createComment: function(req, res) {
      User.findOne({_id: req.params.id}, function(err, user) {
        Message.findOne({_id: req.body._id}, function(err, message) {
          console.log(message);
          var comment = new Comment({content: req.body.comment});
          console.log(comment);
          comment._message = message._id;
          comment._user = user._id;
          comment.save(function(err) {
            message.comments.push(comment);
            message.save(function(err) {
              user.comments.push(comment);
              user.save(function(err, user) {
                if (err) {
                  res.json(err);
                } else {
                  res.json(user)
                }
              })
            })
          });
        });
      });
    }
  }
})()
