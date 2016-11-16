app.factory('messagesFactory', ['$http', '$routeParams', function($http, $routeParams) {
  function MessagesFactory() {
    var self = this;
    this.create = function(message, userId, callback) {
      $http.post(`/messages/${userId}`, message).then(function(res) {
        self.index(callback);
      });
    };
    this.index = function(callback) {
      $http.get(`/messages`).then(function(res) {
        console.log(res.data);
        callback(res.data);
      });
    };
    this.createComment = function(messageId, userId, comment, callback) {
      console.log(comment);
      var data = {
        messageId: messageId,
        comment: comment.content
      }
      $http.post(`/comments/${userId}`, data).then(function(res) {
        console.log(res);
        self.index(callback);
      });
    };
  }
  return new MessagesFactory();
}])
