'use strict';

angular
    .module('issueTracker.services.notifier', [])
    .config(['growlProvider',
        function (growlProvider) {
            growlProvider.globalTimeToLive(2000);
        }])
    .factory('notifier', [
        'growl',
        function (growl) {
            return {
                success: function (msg) {
                    growl.addSuccessMessage(msg);
                },
                warning: function (msg) {
                    growl.addWarnMessage(msg);
                },
                error: function (msg) {
                    growl.addErrorMessage(msg);
                }
            }
        }
    ]);