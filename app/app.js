'use strict';

// Declare app level module which depends on views, and components
angular.module('issueTracker', [
  'ngRoute',
  'angular-growl',
  'issueTracker.services.headerConstructor',
  'issueTracker.services.authService',
  'issueTracker.services.labels',
  'issueTracker.services.notifier',
  'issueTracker.services.projects',
  'issueTracker.services.issues',
  'issueTracker.controllers.login',
  'issueTracker.controllers.register',
  'issueTracker.controllers.logout',
  'issueTracker.controllers.profile',
  'issueTracker.controllers.changePassword',
  'issueTracker.controllers.projects',
  'issueTracker.controllers.addProject',
  'issueTracker.controllers.issues',
  'issueTracker.controllers.dashboard',
  'issueTracker.navbarDirective'
])
    .config(['$routeProvider', function($routeProvider) {
      //$routeProvider.otherwise({redirectTo: '/login'});
}])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
    .constant('ITEMS_PER_PAGE', 10);

