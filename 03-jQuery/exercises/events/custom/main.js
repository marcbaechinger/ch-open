/*global alert: false */
/*jslint browser: true */
(function (global) {
	
	var dialog = $("#dialog");
	
	dialog.on("click", "footer button", function (ev) {
		var target = $(ev.target),
			action = target.data("action");
			
		if (action === "save") {
			// task: fire a custom event
			target.trigger("update.myApp", {
				password: dialog.find("[name=password]").val(),
				email: dialog.find("[name=email]").val(), 
			});
		} else if (action === "cancel") {
			dialog.find("input").val("");
		}
		
		ev.preventDefault();
		ev.stopPropagation();
	});
	
	
	dialog.on("update.myApp", function (ev, data) {
		alert("custom: " + JSON.stringify(data));
	});
}(this));