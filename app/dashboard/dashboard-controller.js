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
        'labelsService',
        'ITEMS_PER_PAGE',
        function($scope, $location, issuesService, projectsService, authService, labelsService, ITEMS_PER_PAGE){
            if(!sessionStorage['authToken']){
                $location.path('/login');
            }

            $scope.projectParams1 = {
                'startPage' : 1,
                'pageSize' : ITEMS_PER_PAGE,
                'filter' : ''
            };

            $scope.projectParams2 = {
                'startPage' : 1,
                'pageSize' : ITEMS_PER_PAGE,
                'filter' : ''
            };

            $scope.projectParams3 = {
                'startPage' : 1,
                'pageSize' : ITEMS_PER_PAGE,
                'filter' : ''
            };

            $scope.itemsPerPage = ITEMS_PER_PAGE;

            // Panel with all issues assigned to the current user
            $scope.getIssues = function getIssues(){
                issuesService.getAssignedToCurrentUser(
                    'DueDate desc',
                    $scope.projectParams1.pageSize,
                    $scope.projectParams1.startPage)
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
                            $scope.projectParams2.pageSize,
                            $scope.projectParams2.startPage,
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

            // Panel with all projects that have issues assigned to the current user
            $scope.getProjectsWithAssignedIssues = function () {
                $scope.totalProjectsWithAssignedIssues = [];
                issuesService.getAssignedToCurrentUser(
                    'DueDate',
                    $scope.projectParams3.pageSize,
                    $scope.projectParams3.startPage)
                    .then(function(issuesAssigned){
                        //get all isses assigned
                        var uniqueProjectIds = [];
                        if(issuesAssigned.Issues.length > 0) {
                            issuesAssigned.Issues.forEach(function (i){
                                //get the projects ids for issues
                                uniqueProjectIds[i.ProjectId] = i.Project.Id;
                            });
                        }

                        if (uniqueProjectIds){
                            //get the unique projects
                            uniqueProjectIds.forEach(function (id){
                                projectsService.getById(id)
                                    .then(function (success){
                                        $scope.totalProjectsWithAssignedIssues.push(success)
                                    }, function(error){
                                        console.log(error)
                                    })
                            });
                        }
                        $scope.totalProjectsIssues = $scope.totalProjectsWithAssignedIssues.count || 0;
                    }, function(error){
                        console.log(error)
                    })
            };
            $scope.getProjectsWithAssignedIssues();
        }]);