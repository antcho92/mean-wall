console.log('user schema initiated');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    maxlength: [20, 'name cannot be longer than 20 chars']
  },
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'Message'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
}, {
  timestamps: true
});

mongoose.model('User', userSchema);

var User = mongoose.model('User');
