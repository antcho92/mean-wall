app.factory('usersFactory', ['$http', '$location', '$routeParams', function($http, $location, $routeParams) {
  function UsersFactory() {
    var self = this;
    this.login = function(user, callback) {
      $http.post('/users/login', user).then(function(res) {
        console.log(res.data);
        if (res.data.errors) {
          console.log(res.data);
          callback(res.data.errors);
        } else {
          $location.url('/wall');
        }
      })
    };
    this.checkSess = function(callback) {
      $http.get('/users/checkSess').then(function(res) {
        console.log(res, 'sessions');
        if (!res.data) {
          console.log('user is not logged in');
          $location.url('/');
        } else {
          console.log(res, 'id');
          callback(res.data);
          $location.url('/wall');
        }
      });
    };

  }
  return new UsersFactory();
}])
