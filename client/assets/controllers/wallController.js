console.log('wall controller loaded');
app.controller('wallController', ['$scope', 'usersFactory', 'messagesFactory', function($scope, uF, mF) {
  var self = this;
  uF.checkSess(function(id) {
    self.userId = id;
  });
  this.create = function() {
    mF.create(this.message, this.userId, function() {
      self.message.content = '';
    });
  };
  this.createComment = function(message) {
    console.log(message);
    mF.createComment(message, this.userId);
  }
  mF.index(function(messages) {
    self.messages = messages;
  });
}])
