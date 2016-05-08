'use strict';

angular
    .module('issueTracker.controllers.editIssue', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/issues/:id/edit', {
            controller: 'EditIssueController',
            templateUrl: 'app/issues/issue-edit-template.html'
        })
    }])
    .controller('EditIssueController', [
        '$scope',
        '$routeParams',
        '$location',
        'authService',
        'issuesService',
        'projectsService',
        'notifier',
        function EditIssueController($scope, $routeParams, $location, authService, issuesService, projectsService, notifier) {
            // get all users for the dropdown menu
            authService.getAll().then(function (success) {
                $scope.allUsers = success;
            }, function (error) {
                console.log(error);
            });

            // get issue data
            issuesService.getById($routeParams.id)
                .then(function (success) {
                    projectsService.getById(success.Project.Id)
                        .then(function (project) {
                            if(sessionStorage['userId'] != project.Lead.Id){
                                $location.path('/issues/' + $routeParams.id);
                            }
                        });

                    $scope.editedIssue = success;
                    var allAvailableStatuses = [];
                    var labels = [];
                    var labelsForTemplate = '';
                    var count = 0;
                    allAvailableStatuses.push(success.Status)
                    if(success.AvailableStatuses){
                        success.AvailableStatuses.forEach(function (s) {
                            allAvailableStatuses.push(s)
                        })
                    }

                    $scope.availableStatuses = allAvailableStatuses;
                    $scope.currentStatus = success.Status;
                    $scope.priorities = success.Priority;

                    for (var obj in $scope.editedIssue.Labels) {
                        if(count > 0){
                            labelsForTemplate += ', ';
                        }
                        labelsForTemplate += $scope.editedIssue.Labels[obj].Name;
                        count ++
                    }

                    labels = $scope.editedIssue.Labels.forEach(function (l) {
                        labels.push(l.Name);
                    });

                    $scope.editedIssue.EditLabels = labelsForTemplate;
                });

            $scope.edit = function (editedIssue) {
                issuesService.updateIssue(
                    editedIssue.Id,
                    editedIssue.Title,
                    editedIssue.Description,
                    editedIssue.DueDate,
                    editedIssue.Assignee.Id,
                    editedIssue.Priority.Id,
                    editedIssue.EditLabels)
                    .then(function (success) {
                        notifier.success('Issue successfully edited');
                        $location.path('/issues/' + $routeParams.id)
                    }, function (error) {
                        notifier.error(error.statusText)
                    })
            };

            $scope.goBack = function () {
                $location.path('issues/' + $routeParams.id);
            }
        }
    ]);