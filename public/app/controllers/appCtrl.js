angular.module('appCtrl', [])

.controller('appController', function($state) {

  var vm = this;

  vm.isActive = function(state) {
    var active = $state.current.name == state;
    return active ? 'active' : '';
  };


});