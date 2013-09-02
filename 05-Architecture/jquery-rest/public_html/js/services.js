(function (global) {
    var ToDoService = function (spec) {
		spec = spec || {};
        this.base = spec.base || "https://localhost:8181/baas-gf/api/";
    };
    
    ToDoService.prototype.getAll = function(callback, errorCallback) {
        $.ajax({
            url: this.base + "todo",
            success: function(todos) {
                callback(todos);
            },
            error: function(jqXhr) {
                if (errorCallback) {
                    errorCallback(jqXhr);
                } else {
                    console.error("getting todos failed", jqXhr);
                }
            }
        });
    };
    
    ToDoService.prototype.get = function(id, callback, errorCallback) {
        $.ajax({
            url: this.base + "todo/" + id,
            success: function(todo) {
                callback(todo);
            },
            error: function(jqXhr) {
                var errorMessage = "getting todo by id " + id + " failed";
                if (errorCallback) {
                    errorCallback(errorMessage, jqXhr);
                } else {
                    console.error(errorMessage, jqXhr);
                }
            }
        });
    };
    ToDoService.prototype.createToDo = function(todo, callback, errorCallback) {
        $.ajax({
            url: this.base + "todo",
            type: "PUT",
            data: JSON.stringify(todo),
            dataType: "json",
            contentType: "application/json",
            success: function(todo) {
                callback(todo);
            },
            error: function(jqXhr) {
                var errorMessage = "creating todo failed";
                if (errorCallback) {
                    errorCallback(errorMessage, jqXhr);
                } else {
                    console.error(errorMessage, jqXhr);
                }
            }
        });
    };
    ToDoService.prototype.updateToDo = function(todo, callback, errorCallback) {
        $.ajax({
            url: this.base + "todo/" + todo.id,
            type: "POST",
            data: JSON.stringify(todo),
            dataType: "json",
            contentType: "application/json",
            success: function(todo) {
                callback(todo);
            },
            error: function(jqXhr) {
                var errorMessage = "creating todo failed";
                if (errorCallback) {
                    errorCallback(errorMessage, jqXhr);
                } else {
                    console.error(errorMessage, jqXhr);
                }
            }
        });
    };
    
    
    ToDoService.prototype.deleteToDo = function(id, callback, errorCallback) {
        $.ajax({
            url: this.base + "todo/" + id,
            type: "DELETE",
            success: function(todo) {
                callback(todo);
            },
            error: function(jqXhr) {
                var errorMessage = "deleting todo " + id + " failed";
                if (errorCallback) {
                    errorCallback(errorMessage, jqXhr);
                } else {
                    console.error(errorMessage, jqXhr);
                }
            }
        });
    };
    
    global.service = {
        ToDoService: ToDoService
    };
}(this));

