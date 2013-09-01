(function (global) {
	// task: select the left (class=trigger) and right image (class=target) 
	var trigger = $(".trigger"),
		target = $(".target");
	
	// task-1: register mouseover event to trigger using jquery api
	// ---------------------------------------------
	trigger.on("mouseover", function (e) {
		// add class 'animate' to target image: must be called on mouse over
		target.addClass("animate");
	});
	
	
	// task-2: register mouseout event to trigger
	// ---------------------------------------------
	trigger.on("mouseout", function () {
		// add class 'animate' to target image: must be called on mouse out
		target.removeClass("animate");
	});
	
	
	// task-3: stop propagation and default processing on click
	// ---------------------------------------------
	$("img").on("click", function (ev) {
		ev.stopPropagation(); // avoid further propagation of event
		ev.preventDefault(); // avoid processing of default action 
	});
	
	$(document).on("click", "img", function (ev) {
		alert("Verhindere das Propagieren der Events");
	});
}(this));
