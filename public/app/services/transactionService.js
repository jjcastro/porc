angular.module('transactionService', [])

.factory('Transaction', function($http) {

  // create a new object
  var transactionFactory = {};

  // get all transactions
  transactionFactory.all = function() {
    return $http.get('/api/transactions/');
  };

  // get a single transaction
  transactionFactory.get = function(id) {
    return $http.get('/api/transactions/' + id);
  };

  // create a transaction
  transactionFactory.create = function(tranData) {
    return $http.post('/api/transactions/', tranData);
  };

  // update transaction
  transactionFactory.update = function(id, tranData) {
    return $http.put('/api/transactions/' + id, tranData);
  };

  // delete a transaction
  transactionFactory.delete = function(id) {
    return $http.delete('/api/transactions/' + id);
  };

  // return our entire transactionFactory object
  return transactionFactory;

});