
$(function () {
    var DELIMITER = "\n\n";
    
    // new service instance
    var service = new window.service.ToDoService({}),
        textarea = $("#response"),
        uiLog = function () {
            var buf = "", i;
            
            for (i = 0; i < arguments.length; i++) {
                buf += arguments[i] + DELIMITER;
            }
            textarea.val(buf);
        };
    
    
    // register click handler 
    $(".get-all").on("click", function (ev) {
        service.getAll(function (todos) {
            uiLog(JSON.stringify(todos, null, 4));
        });
    });
    
    // task: use the service to get a todo by id
    // task: use the jquery data(key) method to get the id from the DOM
    $(".get").on("click", function (ev) {
        var id = $(ev.target).data("id");
        
        id = prompt("id of todo", id);
        
        if (id) {
            service.get(id, 
                function success(todo) {
                    uiLog(JSON.stringify(todo, null, 4));
                }, 
                function error() {
                    alert("Todo mit id " + id + " nicht gefunden");
                });
        }
    });
    
    // register click handler 
    $(".create").on("click", function (ev) {
        var todo = {
            title: "Encapsulate ajax",
            description: "encapsulate all jquery ajax calls in a service with a sound api"
        };  
        
        service.createToDo(todo, function (todo) {
                uiLog(JSON.stringify(todo, null, 4));
        });
    });
    
    // register click handler 
    $(".update").on("click", function (ev) {
        var todo;
        
        try {
            todo = JSON.parse(textarea.val());
            
            service.updateToDo(todo, 
                function success (todo) {
                    uiLog(JSON.stringify(todo, null, 4));
                },
                function error() {
                    alert("Update des Todos gescheitert. Stimmt die uuid?")
                });
                
        } catch (e) {
            alert("Eingabe in der Textarea ist kein valides JSON");
        }
        
    });
    
    
    $(".delete").on("click", function (ev) {
        var id = $(ev.target).data("id");
        
        id = prompt("id of todo", id);
        
        if (id) {
            service.deleteToDo(id, 
                function success (todo) {
                    uiLog("service.deleteToDo(id cb) ", JSON.stringify(todo, null, 4));
                },
                function error() {
                    alert("Das Löschen des Eintrages ist fehlgeschlage. Stimmt die uuid?");
                });
        }
    });
    
    // load source code of TodoService into text area at startup
    $("#response").load("js/services.js");
});

