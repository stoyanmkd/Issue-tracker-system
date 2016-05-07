'use strict';

angular
    .module('issueTracker.services.issues', [])
    .factory('issuesService', [
        '$http',
        '$q',
        'BASE_URL',
        'headersService',
        function issuesService($http, $q, BASE_URL, headersService){
            function getAllFor(projectId){
                var deferred = $q.defer();
                $http.get(BASE_URL + 'projects/' + projectId + '/issues', headersService.getAuthHeader())
                    .then(function (success){
                        deferred.resolve(success.data);
                    }, function (error){
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getFiltered(filter, pageSize, pageNumber){
                var url = BASE_URL + 'issues/?filter=' + filter;
                if(pageSize){
                    url += '&pageSize=' + pageSize;
                }

                if(pageNumber){
                    url += '&pageNumber=' + pageNumber;
                }

                var deferred = $q.defer();
                $http.get(url, headersService.getAuthHeader())
                    .then(function (success){
                        deferred.resolve(success.data);
                    }, function (error){
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getAssignedToCurrentUser(orderBy, pageSize, pageNumber){
                var url = BASE_URL + 'issues/me?orderBy=' + orderBy;
                if(pageSize){
                    url += '&pageSize=' + pageSize;
                }

                if(pageNumber){
                    url += '&pageNumber=' + pageNumber;
                }

                var deferred = $q.defer();
                $http.get(url, headersService.getAuthHeader())
                    .then(function (success){
                        deferred.resolve(success.data);
                    }, function (error){
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getById(id){
                var deferred = $q.defer();
                $http.get(BASE_URL + 'issues/' + id, headersService.getAuthHeader())
                    .then(function (success){
                        deferred.resolve(success.data);
                    }, function (error){
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            //admin //lead
            function add(title, description, dueDate, projectId, assigneeId, priorityId, labels){
                var issue = {
                    Title : title,
                    Description : description,
                    DueDate : dueDate,
                    ProjectId : projectId,
                    AssigneeId : assigneeId,
                    PriorityId : priorityId,
                    Labels : []
                };

                labels.forEach(function (l){
                    issue.Labels.push({Name: l})
                });

                var deferred = $q.defer();
                $http.post(BASE_URL + 'issues/', issue, headersService.getAuthHeader())
                    .then(function (success){
                        deferred.resolve(success.data);
                    }, function (error){
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            //admin //lead
            function updateIssue(id, title, description, dueDate, assigneeId, priorityId, labels){
                var issue = {
                    Title : title,
                    Description : description,
                    DueDate : dueDate,
                    AssigneeId : assigneeId,
                    PriorityId : priorityId,
                    Labels : []
                };

                var labelsSplitted = labels.split(',');

                labelsSplitted.forEach(function (l){
                    issue.Labels.push({Name: l.trim()})
                });

                var deferred = $q.defer();
                $http.put(BASE_URL + 'issues/' + id, issue, headersService.getAuthHeader())
                    .then(function (success){
                        deferred.resolve(success.data);
                    }, function (error){
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            //admin //lead //assignee
            function changeStatus(issueId, statusId) {
                var url = BASE_URL + 'issues/' + issueId + '/changestatus?statusid=' + statusId;
                var deferred = $q.defer();
                $http.put(url, undefined, headersService.getAuthHeader())
                    .then(function (success) {
                        deferred.resolve(success.data);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getComments(issueId) {
                var url = BASE_URL + 'issues/' + issueId + '/comments';
                var deferred = $q.defer();
                $http.get(url, headersService.getAuthHeader())
                    .then(function (success) {
                        deferred.resolve(success.data);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            // lead / assignee
            function addComment(issueId, text) {
                var url = BASE_URL + 'issues/' + issueId + '/comments';
                var deferred = $q.defer();
                $http.post(url, {Text: text}, headersService.getAuthHeader())
                    .then(function (success) {
                        deferred.resolve(success.data);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            return {
                getAllFor: getAllFor,
                getFiltered: getFiltered,
                getAssignedToCurrentUser: getAssignedToCurrentUser,
                getById: getById,
                addIssue: add,
                updateIssue: updateIssue,
                changeStatus: changeStatus,
                getComments: getComments,
                addComment: addComment
            }
        }
    ]);