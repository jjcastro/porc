angular.module('app.routes', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise("/");
  $locationProvider.html5Mode(true);
	$stateProvider

		// route for the home page
		.state('home', {
      url: '/',
			templateUrl : 'app/views/pages/home.html'
		})
		
		// login page
		.state('login', {
      url: '/login',
			templateUrl : 'app/views/app/login.html',
 			controller  : 'mainController',
			controllerAs: 'login'
		})
		
		// show all users
		.state('overview', {
      url: '/overview',
			templateUrl: 'app/views/app/overview/main.html',
			controller: 'overviewController',
			controllerAs: 'overview'
		})

		// form to create a new transaction
		// same view as edit page
		.state('createtransaction', {
      url: '/transactions/create',
			templateUrl: 'app/views/app/transactions/single.html',
			controller: 'transactionCreateController',
			controllerAs: 'transaction'
		})

		// page to edit a transaction
		.state('edittransaction', {
      url: '/transactions/:tran_id',
			templateUrl: 'app/views/app/transactions/single.html',
			controller: 'transactionEditController',
			controllerAs: 'transaction'
		});

});
