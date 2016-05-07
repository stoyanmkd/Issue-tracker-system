'use strict';

angular
    .module('issueTracker.controllers.addProject', [])
    .config(['$routeProvider', function ($routeProvider){
        $routeProvider.when('/projects/add', {
            controller: 'AddProjectController',
            templateUrl: 'app/projects/project-add-template.html'
        });
    }])
    .controller('AddProjectController', [
        '$scope',
        '$q',
        '$location',
        'labelsService',
        'projectsService',
        'authService',
        'notifier',
        function AddProjectController($scope, $q, $location, labelsService, projectsService, authService, notifier){
            if(!sessionStorage['authToken'] || !sessionStorage['isAdmin']){
                $location.path('/login');
            }

            authService.getCurrent().then(function(currentUser){
                if(!currentUser.isAdmin){
                    $location.path('/login');
                }
            });

            $scope.addProject = function(project){
                // get priorities in proper format
                var proritiesUnsplited = project.Priorities.split(',');
                var labelsUnsplited = project.Labels.split(',');
                var priorities = [];
                var labels = [];

                proritiesUnsplited.forEach(function (p) {
                    priorities.push(p.trim())
                });

                labelsUnsplited.forEach(function (l) {
                    labels.push(l.trim())
                });

                console.log(priorities);
                projectsService.addProject(project.Name, project.Description, project.LeadId.Id, labels, priorities)
                    .then(function (success) {
                        notifier.success(success.statusText);
                        $location.path('/');
                    }, function (error) {
                        notifier.error(error.statusText)
                    })
            };

            authService.getAll()
                .then(function (success) {
                    $scope.allUsers = success;
                });

            $scope.toDashboard = function(){
                $location.path('/');
            }
        }
    ]);