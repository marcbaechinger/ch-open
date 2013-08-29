(function () {
	// task 1 ==> select first image by id (id="antonin")
	$("#antonin").addClass("badge");
	
	// task 2 ==> select first image by class (class="diego")
	$(".diego").addClass("badge");
	
	// task 3 ==> select all 'section' elements within element of class 'image-container' 
	//  (<div class="image-container"><section/></div>)
	$(".image-container section").addClass("badge");
	
	// task 4 ==> select the 'section' element which is a direct child of the body
	$("body > section").removeClass("badge");
	
	// check resulting browser view: 4 badges with Zico are shown in a grid
}());