'use strict';

angular
    .module('issueTracker.controllers.addIssue', [])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/projects/:id/add-issue', {
            controller : 'AddIssueController',
            templateUrl : 'app/issues/issue-add-template.html'
        });
    }])
    .controller('AddIssueController', [
        '$scope',
        '$location',
        '$routeParams',
        '$q',
        'authService',
        'projectsService',
        'labelsService',
        'issuesService',
        function AddIssueController($scope, $location, $routeParams, $q, authService, projectsService, labelsService, issuesService){
            $scope.backToProject = function(){
                $location.path('/projects' + $routeParams.id)
            };

            $scope.addIssue = function(issueToAdd){
                var labelsUnsplited = issueToAdd.Labels.split(',');
                var labels = [];

                labelsUnsplited.forEach(function (l) {
                    labels.push(l.trim())
                });

                issuesService.addIssue(issueToAdd.Title, issueToAdd.Description, issueToAdd.DueDate,
                $routeParams.id, issueToAdd.AssigneeId.Id, issueToAdd.PriorityId, labels)
                    .then(function (success){
                        $location.path('/projects/' + $routeParams.id)
                    }, function (error) {
                        console.log(error)
                    });
            }

            // get all users for the dropdown menu
            authService.getAll().then(function (success) {
                $scope.allUsers = success;
            }, function (error) {
                console.error(error);
            });

            // get project name and priorities
            projectsService.getById($routeParams.id)
                .then(function (success) {
                    $scope.addIssueProjectName = success.Name;
                    $scope.addIssueProjectPriorities = success.Priorities;
                    if (sessionStorage['userId'] != success.Lead.Id) {
                        $location.path('/projects/' + $routeParams.id);
                    }

                }, function (error) {
                    console.log(error);
                });
        }
    ]);