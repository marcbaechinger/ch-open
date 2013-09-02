
$(function () {
    var DELIMITER = "\n\n";
    
    // task-1: creaete a new service instance from window.service.ToDoService
    var service = new window.service.ToDoService({});
    
    // add basic authorization header to all requests made by jQuery
    $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
        options.headers = {
            Authorization: "Basic " + btoa("chopen2013:chopen2013")   //Y2hvcGVuMjAxMzpjaG9wZW4yMDEz
        };
    });

    // ui stuff to log messages to textarea
    var textarea = $("#response"),
        uiLog = function () {
            var buf = "", i;
            
            for (i = 0; i < arguments.length; i++) {
                buf += arguments[i] + DELIMITER;
            }
            textarea.val(buf);
        };
        
    
    
    // exersice 1: 
    $(".get-all").on("click", function (ev) {
		// task-1: call 'getAll' function of the service and pass a callback
        service.getAll(function (todos) {
            uiLog(JSON.stringify(todos, null, 4));
        });
    });
    
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
    
    // register click handler 
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

