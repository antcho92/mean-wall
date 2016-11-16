console.log('users controller loaded');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = (function() {
  return {
    index: function(req, res) {
      console.log('index');
      User.find({}, function(err, users) {
        if (err) {
          res.json(err);
        } else {
          res.json(users);
        }
      })
    },
    login: function(req, res) {
      User.findOne({name: req.body.name}, function(err, user) {
        if (err) {
          res.json(err);
        } else {
          if (!user) {
            var userInstance = new User(req.body);
            userInstance.save(function(err, user) {
              if (err) {
                res.json(err);
              } else {
                console.log(user);
                req.session.userId = user._id;
                req.session.save();
                res.json(req.session.userId);
              }
            });
          } else {
            req.session.userId = user._id;
            req.session.save();
            res.json(req.session.userId);
          }
        }
      })
    },
    checkSess: function(req, res) {
      if (req.session.userId) {
        res.json(req.session.userId);
      } else {
        res.send(null);
      }
    },
    logout: function(req, res) {
      req.session.destroy();
      res.redirect('/');
    }
  }
})();
