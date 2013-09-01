(function (global) {
	// task: select the left image (class=trigger)
	var trigger = $(".trigger");
	
	// task: register mouse over event
	trigger.on("mouseover", function (ev) {
		// add class 'animate' to right image
		$(".target").addClass("animate");
	});
	
	// task: register mouse out event
	trigger.on("mouseout", function (ev) {
		// add class 'animate' to right image
		$(".target").removeClass("animate");
	});
}(this));