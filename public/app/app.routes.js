angular.module('app.routes', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise("/");
  $urlRouterProvider.when('/a', '/a/overview');
  $locationProvider.html5Mode(true);
	$stateProvider

    // login page
    .state('login', {
      url         : "/login",
      templateUrl : "app/views/pages/login.tpl.html",
      controller  : "mainController",
      controllerAs: "login"
    })

    // PARENT
    // route for the presentation page with top bar
    .state('presentation', {
      url: "",
      templateUrl: "app/views/pages/presentation.tpl.html"
    })

		// route for the presentation page (parent)
		.state('presentation.home', {
      url: "/",
			templateUrl: "app/views/pages/presentation/home.tpl.html"
		})

    // route for the presentation page (parent)
    .state('app', {
      url: "/a",
      abstract: true,
      controller: "appController",
      controllerAs: "app",
      templateUrl: "app/views/pages/app.tpl.html"
    })
		
		// show all users
		.state('app.overview', {
      url         : "/overview",
			templateUrl : "app/views/pages/app/overview/main.tpl.html",
			controller  : "overviewController",
			controllerAs: "overview"
		})

    .state('app.entries', {
      url         : "/entries",
      templateUrl : "app/views/pages/app/entries/main.tpl.html"
    })

    .state('app.budgets', {
      url         : "/budgets",
      templateUrl : "app/views/pages/app/budgets/main.tpl.html"
    })

    .state('app.reports', {
      url         : "/reports",
      templateUrl : "app/views/pages/app/reports/main.tpl.html"
    })

		// form to create a new transaction
		// same view as edit page
		.state('createtransaction', {
      url         : "/entries/create",
			templateUrl : "app/views/pages/app/entries/single.tpl.html",
			controller  : "transactionCreateController",
			controllerAs: "transaction"
		})

		// page to edit a transaction
		.state('edittransaction', {
      url         : "/entries/:tran_id",
			templateUrl : "app/views/pages/app/entries/single.tpl.html",
			controller  : "transactionEditController",
			controllerAs: "transaction"
		});

});
