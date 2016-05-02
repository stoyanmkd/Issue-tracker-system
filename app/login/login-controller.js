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
        function Login($scope, authService, $location){
            $scope.login = function (loginUser){
                authService.login(loginUser)
                    .then(function (success){
                        sessionStorage['authToken'] = success.data['access_token'];
                        $location.path('/');
                    }, function (error){
                        console.log(error)
                    })
            };
        }
    ]);