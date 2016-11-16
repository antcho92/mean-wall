app.factory('messagesFactory', ['$http', '$routeParams', function($http, $routeParams) {
  function MessagesFactory() {
    var self = this;
    this.create = function(message, userId, callback) {
      $http.post(`/messages/${userId}`, message).then(function(res) {
        callback();
      });
    };
    this.index = function(callback) {
      $http.get(`/messages`).then(function(res) {
        console.log(res.data);
        callback(res.data);
      });
    };
    this.createComment = function(message, userId) {
      console.log(message);
      $http.post(`/comments/${userId}`, message).then(function(res) {
        console.log(res);
      });
    };
  }
  return new MessagesFactory();
}])
