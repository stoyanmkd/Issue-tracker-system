'use strict';

angular
    .module('issueTracker.controllers.makeAdmin', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/makeadmin', {
            controller: 'MakeAdminController',
            templateUrl: 'app/profile/make-admin-template.html'
        });
    }])
    .controller('MakeAdminController', [
        '$scope',
        '$location',
        'authService',
        'notifier',
        function MakeAdminController($scope, $location, authService, notifier) {
            if(!sessionStorage['authToken'] || sessionStorage['isAdmin'] == false){
                $location.path('/');
            }

            authService.getAll()
                .then(function(allUsers){
                    $scope.allUsers = allUsers;
                });

            $scope.makeAdmin = function (userId) {
                authService.makeAdmin(userId.Id)
                    .then(function (success) {
                        notifier.success(userId.Username + ' is set to Admin')
                        $location.path('/')
                    }, function (error) {
                        notifier.error(error.data.Message);
                    })
            };

            $scope.toDashboard = function () {
                $location.path('/');
            }
        }
    ]);