$("tbody").on("click", "tr", function(e) {     
	$(this).toggleClass("selected").siblings(".selected").removeClass("selected");
});

$(document).ready(function() { 
    $(".maskHalf").each (
        function maskHalf() {
            var str = this.innerHTML;
            var pos = str.length;
            var mask = ""
            
            mask = "****" + str.substring(pos - 4);
            this.innerHTML = mask;
        }
    );
});
