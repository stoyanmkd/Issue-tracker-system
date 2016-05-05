"use strict";

angular
	.module('issueTracker.controllers.changePassword', [])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider.when('/profile/password', {
			controller : 'ChangePasswordController',
			templateUrl : 'app/profile/change-password-template.html'
		});
	}])
	.controller('ChangePasswordController', [
		'authService',
		'$scope',
		'$route',
		'notifier',
		function ChangePasswordController(authService, $scope, $route, notifier){
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
