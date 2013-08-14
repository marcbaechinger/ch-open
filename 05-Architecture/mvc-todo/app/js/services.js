/*global angular: false  */
/*jslint browser: true */
(function () {
    'use strict';
    
    var baseUrl = "https://localhost:8181/baas/api/todo",
        defaultErrorHandler = function (e) {
            console.error("error", arguments);
        },
        createRequest = function (loginService, method, url, data) {
            return {
                method: method.toUpperCase(),
                url: url,
                headers: {
                    Authorization: "Basic " + loginService.base64AuthToken()
                },
                data: data
            };  
        },
        update = function (loginService, $http, todo, callback) {
            $http(createRequest(loginService, "POST", baseUrl + "/" + todo.id, todo))
                .success(function(data) {
                    console.log("retrieved update of todo", todo);
                    callback(data);
                })
                .error(defaultErrorHandler);
        };

    angular.module('todos.services', [], function ($provide) {
        $provide.factory('loginService', [function () {
             var authToken;
             return {
                 base64AuthToken: function() {
                     if (!authToken) {
                          authToken = btoa(prompt("enter credentials (user:password)", "user:password"))
                     }
                     return authToken;
                 }
             };
        }]);
        $provide.factory('todoService', ["$http", "loginService", function ($http, loginService) {
            return {
                getAll: function (callback) {
                    $http(createRequest(loginService, "GET", baseUrl))
                        .success(function (data) {
                            callback(data);
                        })
                        .error(defaultErrorHandler);
                },
                createTodo: function(todo, callback) {
                    $http(createRequest(loginService, "PUT", baseUrl, todo))
                        .success(function(data) {
                            callback(data);
                        })
                        .error(defaultErrorHandler);
                },
                toggleTodo: function(todo, callback) {
                    todo.done = !todo.done;
                    update(loginService, $http, todo, callback);
                },
                updateTodo: function(todo, callback) {
                    update(loginService, $http, todo, callback);
                },
                deleteTodo: function(todo, callback) {
                    $http(createRequest(loginService, "DELETE", baseUrl + "/" + todo.id))
                        .success(function() {
                            console.log("retrieved deletion for todo", todo);
                            callback();
                        })
                        .error(defaultErrorHandler);
                }
            };
        }]);
    });
}());