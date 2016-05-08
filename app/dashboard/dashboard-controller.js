'use strict';

angular
    .module('issueTracker.controllers.dashboard', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider){
        $routeProvider.when('/', {
            controller : 'DashboardController',
            templateUrl : 'app/dashboard/dashboard-template.html'
        });
    }])
    .controller('DashboardController', [
        '$scope',
        '$location',
        'issuesService',
        'projectsService',
        'authService',
        'ITEMS_PER_PAGE',
        function($scope, $location, issuesService, projectsService, authService, ITEMS_PER_PAGE){
            if(!sessionStorage['authToken']){
                $location.path('/login');
            }

            $scope.assignedIssuesParams = {
                'startPage' : 1,
                'pageSize' : ITEMS_PER_PAGE,
                'filter' : ''
            };

            $scope.projectsLedParams = {
                'startPage' : 1,
                'pageSize' : ITEMS_PER_PAGE,
                'filter' : ''
            };

            $scope.itemsPerPage = ITEMS_PER_PAGE;

            // Panel with all issues assigned to the current user
            $scope.getIssues = function getIssues(){
                issuesService.getAssignedToCurrentUser(
                    'DueDate desc',
                    $scope.assignedIssuesParams.pageSize,
                    $scope.assignedIssuesParams.startPage)
                    .then(function (success){
                        $scope.assignedIssues = success.Issues;
                        $scope.assignedIssuesTotalNumber = success.TotalCount;
                    });
            };
            $scope.getIssues();

            // Panel with projects led by the current user
            $scope.getLedProjects = function(){
                $scope.projectsWithAssignedIssues = [];
                authService.getCurrent()
                    .then(function (currentUserData){
                        $scope.isAdmin = currentUserData.isAdmin;
                        projectsService.getByFilter(
                            $scope.projectsLedParams.pageSize,
                            $scope.projectsLedParams.startPage,
                            'Lead.Username',
                            currentUserData.Username)
                            .then(function (success){
                                $scope.totalLedProjects = success.TotalCount;
                                $scope.projectsLead = success.Projects;
                            }, function (error){
                                console.log(error)
                            });
                    });
            };

            $scope.getLedProjects();

            $scope.goToProject = function(id){
                $location.path('projects/' + id)
            };

            $scope.goToIssue = function(id){
                $location.path('issues/' + id)
            };

            $scope.go = function(path){
                $location.path(path)
            };
        }]);