angular.module('userService', [])

.factory('User', function($http) {

	// create a new object
	var userFactory = {};

	// get a single user
	userFactory.get = function(id) {
		return $http.get('/api/users/');
	};

	// create a user
	userFactory.create = function(userData) {
		return $http.post('/api/users/', userData);
	};

	// update user
	userFactory.update = function(id, userData) {
		return $http.put('/api/users/me', userData);
	};

	// delete a user
	userFactory.delete = function(id) {
		return $http.delete('/api/users/me');
	};

	// return our entire userFactory object
	return userFactory;

});