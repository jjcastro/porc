angular.module('overviewCtrl', ['transactionService'])

.controller('overviewController', function(Transaction) {

  var vm = this;

  // set a processing variable to show loading things
  vm.processing = true;

  // grab all the transactions at page load
  Transaction.all()
    .success(function(data) {

      // when all the users come back, remove the processing variable
      vm.processing = false;

      // bind the users that come back to vm.users
      vm.transactions = data;
    });

  // function to delete a transacion
  vm.deleteTransaction = function(id) {
    vm.processing = true;

    Transaction.delete(id)
      .success(function(data) {

        // get all transacions to update the table
        // you can also set up your api 
        // to return the list of transacions with the delete call
        Transaction.get()
          .success(function(data) {
            vm.processing = false;
            vm.users = data;
          });

      });
  };

})

// controller applied to user creation page
.controller('transactionCreateController', function(Transaction) {
  
  var vm = this;

  // variable to hide/show elements of the view
  // differentiates between create or edit pages
  vm.type = 'create';

  // function to create a user
  vm.saveTransaction = function() {
    vm.processing = true;
    vm.message = '';

    // use the create function in the userService
    Transaction.create(vm.transactionData)
      .success(function(data) {
        vm.processing = false;
        vm.userData = {};
        vm.message = data.message;
      });
      
  };  

})

// controller applied to user edit page
.controller('transactionEditController', function($stateParams, Transaction) {

  var vm = this;

  // variable to hide/show elements of the view
  // differentiates between create or edit pages
  vm.type = 'edit';

  // get the user data for the user you want to edit
  // $stateParams is the way we grab data from the URL
  Transaction.get($stateParams.tran_id)
    .success(function(data) {
      vm.transactionData = data;
    });

  // function to save the user
  vm.saveTransaction = function() {
    vm.processing = true;
    vm.message = '';

    // call the userService function to update 
    Transaction.update($stateParams.tran_id, vm.transactionData)
      .success(function(data) {
        vm.processing = false;

        // clear the form
        vm.transactionData = {};

        // bind the message from our API to vm.message
        vm.message = data.message;
      });
  };

});