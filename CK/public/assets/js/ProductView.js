function suggest_price() {
    var current_price = +document.getElementById("current_price").innerHTML;
    document.getElementById("suggest").innerHTML = current_price + 100000;
}

function parseInt() {
    var x = document.getElementById('price');
    // alert(x);
    var parseInt = (x.value.replace(/\D/g, ''));
    x.value = parseInt;
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