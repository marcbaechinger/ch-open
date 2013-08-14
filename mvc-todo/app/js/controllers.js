'use strict';

/* Controllers */

angular.module('todos.controllers', []).
  controller('TodoController', ["$scope", "todoService", function($scope, todoService) {
        $scope.toggle = function (todo) {
            todoService.toggleTodo(todo, 
                function (todo) {
                    $scope.model.todos.forEach(function(curr) {
                        if (todo.id === curr.id) {
                            curr.done = todo.done;
                        }
                    });
                }
            );
        };
        $scope.deleteCompleted = function() {
            $scope.model.todos.forEach(function (todo) {
                if (todo.done) {
                    todoService.deleteTodo(todo, function () {
                        $scope.model.todos.forEach(function (curr, idx) {
                            if (curr.id === todo.id) {
                                $scope.model.todos.splice(idx, 1);
                                return false;
                            }
                        });
                    });
                }
            });
        };
        $scope.updateTitle = function (todo) {
            var title = prompt("What's to do?", todo.title);
            if (title && title.trim()) {
                todo.title = title;
                todoService.updateTodo(todo, 
                    function (todo) {
                        $scope.model.todos.forEach(function (curr, idx) {
                            if (curr.id === todo.id) {
                                $scope.model.todos.splice(idx, 1, todo);
                            }
                        });
                    }
                );
            }
        };
        $scope.updateDescription= function (todo) {
            var desc = prompt("Enter a short description", todo.description);
            console.log("arguments", arguments);
            if (desc) {
                todo.description = desc;
                todoService.updateTodo(todo, 
                    function (todo) {
                        $scope.model.todos.forEach(function (curr, idx) {
                            if (curr.id === todo.id) {
                                $scope.model.todos.splice(idx, 1, todo);
                            }
                        });
                    }
                );
            }
        };
        $scope.createTodo = function () {
            var title = prompt("What's to do?", "");
            if (title) {
                todoService.createTodo({ 
                    title: title
                }, 
                function (todo) {
                    $scope.model.todos.push(todo);
                });
            }
        };
  }])
  .controller('AboutController', [function() {

  }])
  .controller('ApplicationController', ["$scope", "todoService", function($scope, todoService) {
        $scope.model = {
            user: "marc",
            password: "secret"
        };
        todoService.getAll(function(todos) {
            $scope.model.todos = todos;
        });
  }]);