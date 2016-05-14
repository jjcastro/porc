angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

	$routeProvider

		// route for the home page
		.when('/', {
			templateUrl : 'app/views/pages/home.html'
		})
		
		// login page
		.when('/login', {
			templateUrl : 'app/views/pages/login.html',
 			controller  : 'mainController',
			controllerAs: 'login'
		})
		
		// show all users
		.when('/overview', {
			templateUrl: 'app/views/pages/overview/main.html',
			controller: 'overviewController',
			controllerAs: 'overview'
		})

		// form to create a new transaction
		// same view as edit page
		.when('/transactions/create', {
			templateUrl: 'app/views/pages/transactions/single.html',
			controller: 'transactionCreateController',
			controllerAs: 'transaction'
		})

		// page to edit a transaction
		.when('/transactions/:tran_id', {
			templateUrl: 'app/views/pages/transactions/single.html',
			controller: 'transactionEditController',
			controllerAs: 'transaction'
		});

	$locationProvider.html5Mode(true);

});
