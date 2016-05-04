'use strict';

// Declare app level module which depends on views, and components
angular.module('issueTracker', [
  'ngRoute',
  'issueTracker.services.headerConstructor',
  'issueTracker.services.authService',
  'issueTracker.controllers.login',
  'issueTracker.controllers.register',
  'issueTracker.controllers.logout',
  'issueTracker.navbarDirective'
])
    .config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/login'});
}])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
    .constant('ISSUES_PER_PAGE', 10);

