"use strict";

angular
	.module('issueTracker.controllers.profile', [])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider.when('/profile', {
			controller : 'ProfileController',
			templateUrl : 'app/profile/profile-template.html'
		});
	}])
	.controller('ProfileController', [
		'authService',
		'$scope',
		'$route',
		'notifier',
		function ProfileController(authService, $scope, $route, notifier){
			authService.getCurrent()
				.then(function(success){
					$scope.currentUser = success
				})

				$scope.changePass = function(){
					authService.changePassword(
						$scope.passwordChange.current,
						$scope.passwordChange.new,
						$scope.passwordChange.confirm)
						.then(function (success){
							notifier.success('Password changed');
							$route.reload()
						},
						function (error){
							notifier.error(error.statusText)
						})
				}
		}
	]);
