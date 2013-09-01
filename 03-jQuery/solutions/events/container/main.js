/*global alert: false */
/*jslint browser: true */
(function (global) {
	
	var dialog = $("#dialog");
	
	dialog.delegate("footer button", "click", function (ev) {
		var target = $(ev.target),
			action = target.data("action");
			
		if (action === "save") {
			alert(dialog.serialize());
		} else if (action === "cancel") {
			dialog.find("[name=password]").val("");
			dialog.find("[name=email]").val("");
		}
		
		ev.preventDefault();
		ev.stopPropagation();
	});
}(this));