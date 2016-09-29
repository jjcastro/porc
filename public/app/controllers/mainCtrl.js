angular.module('mainCtrl', [])

.controller('mainController', function($rootScope, $state, Auth) {

	var vm = this;

	// get info if a person is logged in
	vm.loggedIn = Auth.isLoggedIn();

  vm.sendEmail = function(email_data) {
    Auth.sendEmail({ email: email_data })
      .success(function(data) {
        vm.newsletter = data.message;
        console.log('omg');
      });
  }

	// check to see if a user is logged in on every request
	$rootScope.$on('$routeChangeStart', function() {
		vm.loggedIn = Auth.isLoggedIn();	

		// get user information on page load
		Auth.getUser()
			.then(function(data) {
				vm.user = data.data;
			});	
	});	

	// function to handle login form
	vm.doLogin = function() {
		vm.processing = true;

		// clear the error
		vm.error = '';

		Auth.login(vm.loginData.username, vm.loginData.password)
			.success(function(data) {
				vm.processing = false;			

				// if a user successfully logs in, redirect to users page
				if (data.success)			
					$state.go('app.overview');
				else 
					vm.error = data.message;
				
			});
	};

	// function to handle logging out
	vm.doLogout = function() {
		Auth.logout();
		vm.user = '';
		
		$state.go('login');
	};

	vm.createSample = function() {
		Auth.createSampleUser();
	};

  vm.openDialogA = function() { vm.dialogOpenA = true; };
  vm.closeDialogA = function() { vm.dialogOpenA = false; };
  vm.openDialogB = function() { vm.dialogOpenB = true; };
  vm.closeDialogB = function() { vm.dialogOpenB = false; };

});
