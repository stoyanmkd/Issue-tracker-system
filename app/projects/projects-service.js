'use strict';

angular
    .module('issueTracker.services.projects', [])
    .factory('projectsService', [
        '$http',
        '$q',
        'BASE_URL',
        'headersService',
        function projectsService($http, $q, BASE_URL, headersService){
            function getAll(){
                var deferred = $q.defer();
                $http.get(BASE_URL + 'projects/', headersService.getAuthAndJSONContentHeader())
                    .then(function (success){
                        deferred.resolve(success.data)
                    }, function (error){
                        deferred.reject(error)
                    });
                return deferred.promise;
            }

            function getById(id){
                var deferred = $q.defer();
                $http.get(BASE_URL + 'projects/' + id, headersService.getAuthAndJSONContentHeader())
                    .then(function (success){
                        deferred.resolve(success.data)
                    }, function (error){
                        deferred.reject(error)
                    });
                return deferred.promise;
            }

            function getByFilter(pageSize, pageNumber, filter, value){
                var requestUrl = BASE_URL + 'projects/?filter=';
                if(filter && value){
                    requestUrl += filter + '="' + value + '"';
                }

                requestUrl += '&pageSize=' + pageSize + '&pageNumber=' + pageNumber;

                var deferred = $q.defer();
                $http.get(requestUrl, headersService.getAuthAndJSONContentHeader())
                    .then(function (success){
                        deferred.resolve(success.data)
                    }, function (error){
                        deferred.reject(error)
                    });
                return deferred.promise;
            }

            function addProject(name, description, leadId, labels, priorities){
                var project = {
                    Description : description,
                    Labels : [],
                    LeadId : leadId,
                    Name : name,
                    Priorites : []
                };

                labels.forEach(function (item){
                    project.Priorites.push({Name : item});
                });

                var projectKey = '';
                var nameSplit = name.split(/\s+/g);
                nameSplit.forEach(function (word){
                    projectKey += word.charAt(0).toUpperCase();
                });
                project.ProjectKey = projectKey;

                var deferred = $q.defer();
                $http.post(BASE_URL + 'projects/', project, headersService.getAuthAndJSONContentHeader())
                    .then(function (success){
                        deferred.resolve(success.data)
                    }, function (error){
                        deferred.reject(error)
                    });
                return deferred.promise;
            }

            function editProject(id, name, description, leadId, labels, priorities){
                var data = 'Name=' + name + '&Description=' + description;

                if(labels.length){
                    for (var i = 0; i < labels.length; i++) {
                        data += '&labels[' + i + '].Name=' + labels[i];
                    }
                }

                if(priorities.length){
                    for (var i = 0; i < priorities.length; i++) {
                        data += '&priorities[' + i + '].Name=' + priorities[i];
                    }
                }

                data += '&LeadId=' + leadId;

                var deferred = $q.defer();
                $http.post(BASE_URL + 'projects/' + id, data, headersService.getAuthAndJSONContentHeader())
                    .then(function (success){
                        deferred.resolve(success.data)
                    }, function (error){
                        deferred.reject(error)
                    });
                return deferred.promise;
            }

            return {
                getAll : getAll,
                getById : getById,
                getByFilter : getByFilter,
                addProject : addProject,
                editProject : editProject
            }
        }
    ]);