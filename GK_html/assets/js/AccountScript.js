$("tbody").on("click", "tr", function(e) {     
	$(this).toggleClass("selected").siblings(".selected").removeClass("selected");
});