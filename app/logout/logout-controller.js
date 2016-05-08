angular
    .module('issueTracker.controllers.logout', [])
    .config(['$routeProvider', function ($routeProvider){
        $routeProvider.when('/logout', {
            controller: 'LogoutController'
        });
    }])
    .controller('LogoutController', [
        '$scope',
        '$location',
        '$timeout',
        'notifier',
        function LogoutController($scope, $location, $timeout, notifier){
            $scope.logout = function(){
                delete sessionStorage['authToken'];
                delete sessionStorage['isAdmin'];
                delete sessionStorage['userId'];
                delete sessionStorage['username'];
                $timeout(function () {
                    $scope.$apply(function () {
                        $location.path('/login');
                        notifier.success('Logged out')
                    });
                }, 200);
            };
        }]);