console.log('app.js filed loaded');
var app = angular.module('app', ['ngRoute', 'ngMessages']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/login.html',
      controller: 'usersController',
      controllerAs: 'uC'
    })
    .when('/wall', {
      templateUrl: 'partials/wall.html',
      controller: 'wallController',
      controllerAs: 'wC'
    })
    .otherwise('/');
})
