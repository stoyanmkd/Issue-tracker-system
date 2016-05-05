"use strict";

angular
    .module('issueTracker.services.authService', [])
    .factory('authService', [
        '$http',
        '$q',
        'BASE_URL',
        'headersService',
        function authService($http, $q, BASE_URL, headerService){
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

            function getCurrent() {
                var deferred = $q.defer();
                $http.get(BASE_URL + 'users/me/', headerService.getAuthHeader())
                    .then(function (success) {
                        deferred.resolve(success.data);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function changePassword(oldPass, newPass, confirmNewPass){
                if(newPass != confirmNewPass){
                    console.log('Passwords do not match');
                }

                var deferred = $q.defer();

                var data = 'OldPassword=' + oldPass + '&NewPassword=' + newPass + '&ConfirmPassword=' + confirmNewPass;
                $http.post(BASE_URL + 'api/Account/ChangePassword', data, headerService.getAuthAndWWWContentHeader())
                    .then(function (success){
                        deferred.resolve(success)
                    }, function(error){
                        deferred.reject(error)
                    });

                    return deferred.promise;
            }

            function isLoggedIn(){
                return sessionStorage['authToken'] != undefined;
            }

            function isAnonymous(){
                return sessionStorage['authToken'] == undefined;
            }

            return {
                register : register,
                login : login,
                isLoggedIn : isLoggedIn,
                isAnonymous : isAnonymous,
                getCurrent : getCurrent,
                changePassword : changePassword
            }
        }
    ]);