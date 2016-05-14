angular.module('porcApp', ['ngAnimate', 'app.routes', 'authService', 'mainCtrl', 'overviewCtrl', 'transactionService'])

// application configuration to integrate token into requests
.config(function($httpProvider) {

	// attach our auth interceptor to the http requests
	$httpProvider.interceptors.push('AuthInterceptor');

});