"use-strict";

angular
    .module('issueTracker.services.headerConstructor', [])
    .factory('headersService', [
        function headerConstructor(){
            function getAuthHeader(){
                return {
                    headers : {'Authorization': 'Bearer ' + sessionStorage['authToken']}
                };
            }

            function getJSONContentHeader(){
                return {
                    headers : {'Content-type' : 'application/json'}
                };
            }

            function getUrlContentHeader(){
                return {
                    headers : {'Content-type': 'application/x-www-form-urlencoded'}
                };
            }

            function getAuthAndJSONContentHeader(){
                return {
                    headers : {
                        'Authorization' : 'Bearer ' + sessionStorage['authToken'],
                        'Content-type' : 'application/json'
                    }
                }
            }

            function getAuthAndUrlContentHeader(){
                return {
                    headers : {
                        'Authorization' : 'Bearer ' + sessionStorage['authToken'],
                        'Content-type': 'application/x-www-form-urlencoded'
                    }
                }
            }

            return {
                getAuthHeader : getAuthHeader,
                getJSONContentHeader : getJSONContentHeader,
                getUrlContentHeader : getUrlContentHeader,
                getAuthAndJSONContentHeader : getAuthAndJSONContentHeader,
                getAuthAndUrlContentHeader : getAuthAndUrlContentHeader
            }
        }
    ]);
