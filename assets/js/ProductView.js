function suggest_price() {
    var current_price = +document.getElementById("current_price").innerHTML;
    document.getElementById("suggest").innerHTML = current_price + 100000;
}

function checkInput(event) {
    document.getElementById("dropdown1").style.display = "none";
    return (event.charCode != 8 && event.charCode == 0 || (event.charCode >= 48 && event.charCode <= 57))
}

function checkPrice() {

    var current_price = +document.getElementById("current_price").innerHTML;
    var input_price = +frmain.price.value;
    if (input_price <= current_price) {
        document.getElementById("dropdown1").style.display = "block";
        return false;
    }
    return true;
}

function show(img_id) {
    var new_src = document.getElementById(img_id).src;
    document.getElementById('main_window').src = new_src
}

// bật tắt chức năng add to watch list
$(".btn.addToFav").click(function () {
    $(this).toggleClass("btn-warning btn-outline-warning");
});

$("a.history_expand").click(function () {
    $(this).find('i').toggleClass("fa-angle-double-up fa-angle-double-down");

});