(function (global) {
    var ToDoService = function (spec) {
		spec = spec || {};
        this.base = spec.base || "https://localhost:8181/baas-gf/api/";
    };
    
    // general hints:
    // - inspect the annotations of the REST service in the baas-gf to now what to call
    // - docs: http://api.jquery.com/jQuery.ajax/
    // - use CURL to check responses of REST services
    
    // task-1: get all todos from getAll of REST service in baas-gf project
    ToDoService.prototype.getAll = function(callback, errorCallback) {
        $.ajax({
            REPLACE_ME: "REPLACE_ME",
            success: function(todos) {
                // pass todos to callback
                "REPLACE ME"
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
    
    // task-2: get a single todo by id from REST service in baas-gf project
    ToDoService.prototype.get = function(id, callback, errorCallback) {
        $.ajax({
            // REPLACE_ME
        });
    };
    
    // task-3: handle success and errro of PUT request
    ToDoService.prototype.createToDo = function(todo, callback, errorCallback) {
        $.ajax({
            url: this.base + "todo",
            type: "PUT",
            data: JSON.stringify(todo),
            dataType: "json",
            contentType: "application/json",
            
        });
    };
    
    // task-4: a POST request is very similar to a PUT request (see above) 
    ToDoService.prototype.updateToDo = function(todo, callback, errorCallback) {
        
    };
    
    // task-5: if you down here. A delete is a snap for you ;-)
    ToDoService.prototype.deleteToDo = function(id, callback, errorCallback) {
        
    };
    
    global.service = {
        ToDoService: ToDoService
    };
}(this));

