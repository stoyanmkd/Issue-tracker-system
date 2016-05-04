"use strict";

angular
    .module('issueTracker.controllers.register', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider){
        $routeProvider.when('/register', {
            templateUrl: 'app/register/register.html',
            controller: 'RegisterController'
        });
    }])
    .directive('compareTo', [function() {
    return {
            require: "ngModel",
            scope: { otherModelValue: "=compareTo"},
            link: function(scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
            };
    }])
    .controller('RegisterController', [
        '$scope',
        '$location',
        'authService',
        function Register($scope, $location, authService){
            $scope.register = function(registerUser){
                authService.register(registerUser)
                    .then(function (success){
                        $location.path('#/login');
                    },
                    function (error){
                        console.log(error)
                    });
            }
        }
    ]);