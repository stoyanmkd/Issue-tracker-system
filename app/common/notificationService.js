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
            console.log(growl)
            return {
                success: function (msg) {
                    console.log(msg)
                    growl.addSuccessMessage(msg);
                },
                warning: function (msg) {
                    growl.addWarnMessage(msg);
                },
                error: function (msg) {
                    console.log(msg)
                    growl.addErrorMessage(msg);
                }
            }
        }
    ]);