console.log('users controller loaded')
app.controller('usersController', ['$scope', 'usersFactory', function($scope, uF) {
  var self = this;
  uF.checkSess(function(id) {
    self.userId = id;
  });
  this.login = function() {
    uF.login(this.user, function(errors) {
      self.errors = errors;
    });
  };
}]);
