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
        function ($scope, $location, $timeout){
            $scope.logout = function(){
                sessionStorage.removeItem('authToken');
                $location.path('/login');
            }
        }]);