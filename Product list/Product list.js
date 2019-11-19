function checkOffset() {
    if($('.sidebar-container').offset().top + $('.sidebar-container').height() 
                                           >= $('.footer').offset().top - 10)
        $('.sidebar-container').css('position', 'absolute');
    if($(document).scrollTop() + window.innerHeight < $('.footer').offset().top)
        $('.sidebar-container').css('position', 'fixed'); // restore when you scroll up
}
$(document).scroll(function() {
    checkOffset();
});


$(document).ready(function() {
	$(".ellipsis").dotdotdot({
		height: 100,
		watch: true,
	});
});


$('.fa-bookmark').on('click', function(){
    $(this).toggleClass('green-color');
});