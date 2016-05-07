"use strict";

angular
    .module('issueTracker.controllers.login', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider){
        $routeProvider.when('/login', {
            templateUrl: 'app/login/login.html',
            controller: 'LoginController'
        });
    }])
    .controller('LoginController', [
        '$scope',
        'authService',
        '$location',
        'notifier',
        function Login($scope, authService, $location, notifier){
            $scope.login = function (loginUser){
                authService.login(loginUser)
                    .then(function (success){
                        sessionStorage['authToken'] = success.data['access_token'];
                        $location.path('/');
                        authService.getCurrent().then(function (userData) {
                            notifier.success('Welcome, ' + userData.Username + '!');
                            sessionStorage['isAdmin'] = userData.isAdmin;
                            sessionStorage['username'] = userData.Username;
                            sessionStorage['userId'] = userData.Id;
                        })
                    }, function (error){
                        notifier.error(error.data.error_description)
                    })
            };
        }
    ]);