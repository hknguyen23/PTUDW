function suggest_price() {
    var current_price = +document.getElementById("current_price").innerHTML;
    document.getElementById("suggest").innerHTML = current_price + 100000;
}


function formatMoney() {
    var x = +document.getElementById('price').value;
    // alert(x);
    document.getElementById('price').value = x.toLocaleString();
}

function checkPrice(current_price) {
    var input_price = +frmain.price.value;
    if (input_price <= current_price) {
        alert("Giá nhập phải lớn hơn giá hiện tại của sản phẩm!");
        return false;
    }
    return confirm('Bạn chắc chắn muốn đấu giá?');
}

function check(input, giamuangay, buocgia) {
    giamuangay = giamuangay || input + 1;
    if (input.value >= giamuangay)
        $('#price').attr("step", 1);
    else $('#price').attr("step", buocgia);
}


function show(img_id) {
    var new_src = document.getElementById(img_id).src;
    document.getElementById('main_window').src = new_src
}

// bật tắt chức năng add to watch list
$(".btn.addToFav").click(function() {
    $(this).toggleClass("btn-warning btn-outline-warning");
});

$("a.history_expand").click(function() {
    $(this).find('i').toggleClass("fa-angle-double-up fa-angle-double-down");

});

$(document).ready(function() {
    $('.wrapper').click(function() {
        $('.div1, .div2').toggle();
    });
});

$(".countdown").each(
    function countdown() {
        var object = this;
        var original = object.innerHTML;
        var date = new Date(object.innerHTML);
        //object.innerHTML = date.toLocaleDateString();
        var expire = date.getTime();

        function minTwoDigits(n) {
            return (n < 10 ? '0' : '') + n;
        }

        var timer = setInterval(function() {
                // Get today's date and time
                var now = new Date().getTime();

                // Find the distance between now and the count down date
                var distance = expire - now;
                if (distance < 259200000) { //less than 3 days: use relative time
                    // Time calculations for days, hours, minutes and seconds
                    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                    hours = minTwoDigits(hours);
                    minutes = minTwoDigits(minutes);
                    seconds = minTwoDigits(seconds);

                    // Display the result in the element with id="demo"
                    if (days == 0) {
                        object.innerHTML = hours + ":" + minutes + ":" + seconds;
                    } else {
                        object.innerHTML = days + " ngày " + hours + ":" + minutes + ":" + seconds;
                    }
                } else {
                    object.innerHTML = original;
                    //alert(original);
                }
                // If the count down is finished, write some text
                if (distance < 0) {
                    clearInterval(timer);
                    object.innerHTML = original;
                }
                $(object).removeClass("hidden")
            },
            1000);
    }
);