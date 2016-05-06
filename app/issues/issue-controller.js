'use strict';

angular
    .module('issueTracker.controllers.issues', [])
    .config(['$routeProvider', function ($routeProvider){
        $routeProvider.when('/issues/:id', {
            controller : 'IssuesController',
            templateUrl : 'app/issues/issue-template.html'
        });
    }])
    .controller('IssuesController', [
        '$scope',
        '$routeParams',
        'issuesService',
        '$location',
        '$route',
        'projectsService',
        'notifier',
        function IssuesController($scope, $routeParams, issuesService, $location, $route, projectsService, notifier){
            $scope.getById = function(){
                issuesService.getById($routeParams.id)
                    .then(function (success){
                        $scope.currentIssue = success;
                        $scope.isAssignee = success.Assignee.id == sessionStorage['userId'] && !!sessionStorage['userId'];
                        projectsService.getById(success.Project.Id)
                            .then(function (project){
                                $scope.isLead = project.Lead.Id == sessionStorage['userId'];
                            })
                    });
            };

            $scope.getById();

            $scope.editIssue = function(){
                $location.path('issues/' + $routeParams.id + '/edit');
            };

            function getComments(){
                issuesService.getComments($routeParams.id)
                    .then(function (success) {
                        $scope.issueComments = success;
                    });
            }

            getComments();

            $scope.addComment = function(){
                issuesService.addComment($routeParams.id, $scope.addCommentDescription)
                    .then(function (){
                        getComments();
                        notifier.success('Comment added');
                        $route.reload();
                    }, function (error) {
                        notifier.error(error.statusText)
                    })
            };

            $scope.changeStatus = function(){
                var newStatus = $scope.newStatus;
                issuesService.changeStatus($routeParams.id, newStatus)
                    .then(function(){
                        notifier.success('Status changed');
                        $route.reload();
                    }, function(error){
                        notifier.error(error.statusText);
                    })
            };

            $scope.backToProject = function(){
                $location.path('/projects/' + $scope.currentIssue.Project.Id)
            };
        }
    ]);