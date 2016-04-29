angular.module('myApp', [])

// inject $http into our controller
.controller('mainController', function($http) {

  var vm = this;

  // make an API call
  $http.get('/api/users')
    .then(function(data) {

      // bind the users we receive to vm.users
      vm.users = data.users;

    });
    
});