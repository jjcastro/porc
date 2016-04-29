// inject ngRoute for all our routing needs
angular.module('app.routes', ['ngRoute'])

// configure our routes
.config(function($routeProvider, $locationProvider) {
  
  $routeProvider
    // home page route
    .when('/', {
      templateUrl : 'views/pages/home.html'
    });

  // set our app up to have pretty URLS
  $locationProvider.html5Mode(true);
});