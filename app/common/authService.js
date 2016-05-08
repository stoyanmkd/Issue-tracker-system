"use strict";

angular
    .module('issueTracker.services.authService', [])
    .factory('authService', [
        '$http',
        '$q',
        'BASE_URL',
        'headersService',
        'notifier',
        function authService($http, $q, BASE_URL, headerService, notifier){
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
                $http.post(BASE_URL + 'api/Token', data, headerService.getUrlContentHeader())
                    .then(function(success){
                        defered.resolve(success)
                    }, function(error){
                        defered.reject(error)
                    });

                return defered.promise;
            }

            function getAll() {
                var deferred = $q.defer();
                $http.get(BASE_URL + 'users/', headerService.getAuthHeader())
                    .then(function (success) {
                        var users = success.data.sort(function (a, b) {
                            return a.Username.localeCompare(b.Username);
                        });
                        deferred.resolve(users);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
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
                $http.post(BASE_URL + 'api/Account/ChangePassword', data, headerService.getAuthAndUrlContentHeader())
                    .then(function (success){
                        deferred.resolve(success)
                    }, function(error){
                        deferred.reject(error)
                    });

                    return deferred.promise;
            }

            function makeAdmin(userId) {
                var deferred = $q.defer();
                getCurrent().then(function (currentUser) {
                    if (!currentUser.isAdmin) {
                        notifier.error('Only admins can do that.');
                        return;
                    }

                    var data = 'UserId=' + userId;
                    $http.put(BASE_URL + 'users/makeadmin', data, headerService.getAuthAndUrlContentHeader())
                        .then(function (success) {
                            deferred.resolve(success);
                        }, function (error) {
                            deferred.reject(error);
                        });
                }, function (error) {
                    console.error(error);
                });

                return deferred.promise;
            }

            function isAdmin() {
                getCurrent().then(function (success) {
                    return success.isAdmin;
                })
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
                getAll : getAll,
                changePassword : changePassword,
                isAdmin : isAdmin,
                makeAdmin : makeAdmin
            }
        }
    ]);