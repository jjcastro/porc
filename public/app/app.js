angular.module('porcApp', ['ngAnimate', 'ui.bootstrap', 'app.routes', 'authService', 'mainCtrl', 'overviewCtrl', 'appCtrl', 'transactionService'])

// application configuration to integrate token into requests
.config(function($httpProvider) {

	// attach our auth interceptor to the http requests
	$httpProvider.interceptors.push('AuthInterceptor');

});