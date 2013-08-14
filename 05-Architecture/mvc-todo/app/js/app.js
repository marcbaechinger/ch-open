'use strict';


// Declare app level module which depends on filters, and services
angular.module('todos', ['todos.filters', 'todos.services', 'todos.directives', 'todos.controllers']).
  config(["$routeProvider", "$httpProvider", function($routeProvider, $httpProvider) {
    $routeProvider.when('/todos', {templateUrl: 'partials/todos.html', controller: 'TodoController'});
    $routeProvider.when('/about', {templateUrl: 'partials/about.html', controller: 'AboutController'});
    $routeProvider.otherwise({redirectTo: '/todos'});

    //$httpProvider.defaults.headers.common["Authorization"] = "Basic " + btoa("marc:secret");
  }]);
