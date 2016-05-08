"use strict";

angular
    .module('issueTracker.navbarDirective', [])
    .directive('navbar', [
        function navbar(){
            return {
                restrict: 'A',
                templateUrl: 'app/common/partial/navbar.html',
                link: function (scope){
                    scope.isLogged = function(){
                        return !!sessionStorage['authToken']
                    };
                    scope.isAnAdmin = function(){
                        return !!sessionStorage['isAdmin']
                    }
                }
            }
        }]);
