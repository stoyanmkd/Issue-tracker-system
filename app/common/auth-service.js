"use strict";

angular
    .module('issueTracker.services.auth', [])
    .factory('usersService', [
        '$http',
        '$q',
        'BASE_URL',
        'headersService',
        function usersService($http, $q, BASE_URL, headerService){
            function register(user){
                var defered = $q.defer();
                $http.post(BASE_URL + 'api/Account/Register', user)
                    .then(function (success){
                        defered.resolve(success.data)
                    }, function (error) {
                        defered.reject(error)
                    });

                return defered.promise;
            }

            function login(user){
                var defered = $q.defer();
                var data = 'username=' + user.email + '&password=' + user.password +
                    '&grant_type=password';
                $http.post(BASE_URL + 'api/Token', data, headerService.getWWWContentHeader())
                    .then(function(success){
                        defered.resolve(success)
                    }, function(error){
                        defered.reject(error)
                    });

                return defered.promise;
            }

            return {
                register : register,
                login : login
            }
        }
    ]);