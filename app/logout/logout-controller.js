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
        function ($scope, $location){
            $scope.logout = function(){
                delete sessionStorage['authToken'];
                delete sessionStorage['isAdmin'];
                delete sessionStorage['userId'];
                delete sessionStorage['username'];
                $location.path('/login');
            }
        }]);