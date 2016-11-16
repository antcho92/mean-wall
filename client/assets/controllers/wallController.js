console.log('wall controller loaded');
app.controller('wallController', ['$scope', 'usersFactory', 'messagesFactory', function($scope, uF, mF) {
  var self = this;
  var refreshMessages = function(messages) {
    self.messages = messages;
    self.message = {};
  }
  uF.checkSess(function(id) {
    self.userId = id;
  });
  this.create = function() {
    mF.create(this.message, this.userId, refreshMessages);
  };
  this.createComment = function(messageId, comment) {
    console.log(messageId);
    console.log(comment);
    // mF.createComment(message, this.userId, refreshMessages);
  }
  mF.index(refreshMessages);
}])
