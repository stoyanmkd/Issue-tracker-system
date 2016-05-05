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

            function getWWWContentHeader(){
                return {
                    headers : {'Content-type': 'application/x-www-form-urlencoded'}
                };
            }

            function getJSONContentHeader(){
                return {
                    headers : {'Content-type' : 'application/json'}
                };
            }

            function getAuthAndWWWContentHeader(){
                return {
                    headers : {
                        'Authorization' : 'Bearer ' + sessionStorage['authToken'],
                        'Content-type': 'application/x-www-form-urlencoded'
                    }
                }
            }

            function getAuthAndJSONContentHeader(){
                return {
                    headers : {
                        'Authorization' : 'Bearer ' + sessionStorage['authToken'],
                        'Content-type' : 'application/json'
                    }
                }
            }

            return {
                getAuthHeader : getAuthHeader,
                getWWWContentHeader : getWWWContentHeader,
                getJSONContentHeader : getJSONContentHeader,
                getAuthAndWWWContentHeader : getAuthAndWWWContentHeader,
                getAuthAndJSONContentHeader : getAuthAndJSONContentHeader
            }
        }
    ]);
