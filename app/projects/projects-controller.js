'use strict';

angular
    .module('issueTracker.controllers.projects', [])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/projects/add', {
            controller : 'AddProjectController'
        });

        $routeProvider.when('/projects/:id', {
            controller : 'ProjectsController',
            templateUrl : 'app/projects/project-template.html'
        });
    }])
    .controller('ProjectsController', [
        '$scope',
        '$routeParams',
        '$location',
        'issuesService',
        'projectsService',
        'authService',
        'ITEMS_PER_PAGE',
        function ProjectsController($scope, $routeParams, $location, issuesService, projectsService, authService, ITEMS_PER_PAGE){
            $scope.getById = function(){
                projectsService.getById($routeParams.id)
                    .then(function (success){
                        $scope.currentProject = success;
                        authService.getCurrent().then(function (success){
                            $scope.isLead = $scope.currentProject.Lead.Id = success.Id;
                        })
                    });
            };
            $scope.getById();

            $scope.goToEdit = function(){
                $location.path('/projects/' + $routeParams.id + '/edit')
            };

            $scope.goToAddIssue = function (){
                $location.path('/projects/' + $routeParams.id + '/add-issue')
            };

            $scope.goToOwnIssue = function (issueId){
                $location.path('/issues/' + issueId);
            };

            $scope.goToDashboard = function(){
                $location.path('/')
            };

            issuesService.getAllFor($routeParams.id)
                .then(function(success){
                    $scope.currentProjectIssues = success;
                    $scope.currentProjectCurrentUserIssues = success.filter(function(issue){
                        return issue.Assignee.Id == sessionStorage['userId'];
                    })
                });

            $scope.showAll = false;
            $scope.toggleShowAll = function() {
                $scope.showAll = !$scope.showAll;
            };
        }
    ]);