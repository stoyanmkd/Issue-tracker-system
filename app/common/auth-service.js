"use strict";

angular
    .module('issueTracker.services.auth', [])
    .factory('usersService', [
        '$http',
        '$q',
        'BASE_URL',
        'headersService'
    ]);