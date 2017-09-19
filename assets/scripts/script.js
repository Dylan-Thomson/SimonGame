// Document Ready
$(function() {
	initGameButtonListeners();
	initControlButtonListeners();
});

var isOn = $("input:checkbox").is(":checked");

function initGameButtonListeners() {
	$(".btn-upper-left").on("click", function() {
		if(isOn) {
		console.log(".btn-upper-left clicked");
		}
	});
	$(".btn-upper-right").on("click", function() {
		if(isOn) {
		console.log(".btn-upper-right clicked");
		}
	});
	$(".btn-lower-left").on("click", function() {
		if(isOn) {
		console.log(".btn-lower-left clicked");
		}
	});	
	$(".btn-lower-right").on("click", function() {
		if(isOn) {
		console.log(".btn-lower-right clicked");
		}
	});	
}

function initControlButtonListeners() {
	$(".start-btn").on("click", function() {
		if(isOn) {
			console.log(".start-btn clicked");
		}
	});
	$(".strict-btn").on("click", function() {
		if(isOn) {
			console.log(".strict-btn clicked");
		}
	});
	$("input:checkbox").on("change", function() {
		isOn = !isOn;
		if($(this).is(":checked")) {
			console.log("on", isOn);
		}
		else {
			console.log("off", isOn);
		}
	});	
}