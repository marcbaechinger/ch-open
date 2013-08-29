/*global alert: false */
/*jslint browser: true */
(function (global) {
	
	var Dialog = function (spec) {
		this.spec = spec;
		// select container
		this.container = $("#" + spec.id);
		// delegate button clicks
		this.container.on("click", $.proxy(this.delegate, this));
	};
	
	Dialog.prototype.delegate = function (ev) {
		var target = $(ev.target),
			action = target.data("action");
		
		if (this.spec.actions && this.spec.actions[action]) {
			this.spec.actions[action].call(this, ev);
		} else if (action === "save") {
			this.container.trigger("save.myApp", {
				password: this.container.find("[name=password]").val(),
				email: this.container.find("[name=email]").val(),
			});
		} else if (action === "cancel") {
			this.container.find("input").val("");
			this.container.addClass("away");
		}
		ev.preventDefault();
		ev.stopPropagation();
	};
	
	global.Dialog = Dialog;
}(this));

var dialog = new Dialog({
	id: "dialog"
});

dialog.container.on("save.myApp", function (ev, data) {
	alert("saved data: " + JSON.stringify(data));
});