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
		}
	]);
