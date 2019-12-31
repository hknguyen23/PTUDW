/*function checkOffset() {
    if($('.sidebar-container').offset().top + $('.sidebar-container').height() 
                                           >= $('.footer').offset().top - 10)
        $('.sidebar-container').css('position', 'absolute');
    if($(document).scrollTop() + window.innerHeight < $('.footer').offset().top)
        $('.sidebar-container').css('position', 'fixed'); // restore when you scroll up
}
$(document).scroll(function() {
    checkOffset();
});*/


$(document).ready(function() {
	$(".ellipsis").dotdotdot({
		height: 100,
		watch: true,
    });
    
    $(".maskHalf").each (
        function maskHalf() {
            var str = this.innerHTML;
            var pos = str.lastIndexOf(" ");
        
            var mask = "(" +"****" + str.substring(pos);
            this.innerHTML = mask;
            $(this).removeClass( "hidden" )
        }
    );

    $(".countdown").each (
        function countdown() {
            var object = this;
            
            var expire = new Date(object.innerHTML).getTime();
            object.innerHTML = 0;
            function minTwoDigits(n) {
                return (n < 10 ? '0' : '') + n;
            }

            var timer = setInterval(function() {
                // Get today's date and time
                var now = new Date().getTime();

               // Find the distance between now and the count down date
                var distance = expire - now;

                // Time calculations for days, hours, minutes and seconds
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                hours = minTwoDigits(hours);
                minutes = minTwoDigits(minutes);
                seconds = minTwoDigits(seconds);

                // Display the result in the element with id="demo"
                if (days == 0){
                    object.innerHTML = hours + ":" + minutes + ":" + seconds;
                }
                else{
                    object.innerHTML = days + "d " + hours + ":" + minutes + ":" + seconds;
                }
                // If the count down is finished, write some text
                if (distance < 0) {
                    clearInterval(timer);
                    object.innerHTML = "Finished";
                }
                $(object).removeClass( "hidden" )
            },
            1000);
        }
    );
});


$('.fa-bookmark').on('click', function(){
    $(this).toggleClass('green-color');
});