function suggest_price() {
    var current_price = +document.getElementById("current_price").innerHTML;
    document.getElementById("suggest").innerHTML = current_price + 100000;
}

function checkInput(event) {
    document.getElementById("dropdown1").style.display = "none";
    return (event.charCode != 8 && event.charCode == 0 || (event.charCode >= 48 && event.charCode <= 57))
}

function checkPrice(current_price, bidder_score) {
    var input_price = +frmain.price.value;
    if (input_price <= current_price || +bidder_score < 8.0) {
        // document.getElementById("dropdown1").style.display = "block";
        alert("Kiểm tra lại giá hoặc bạn không đủ nhân phẩm");
        return false;
    }
    return true;
}

function show(img_id) {
    var new_src = document.getElementById(img_id).src;
    document.getElementById('main_window').src = new_src
}

function maskHalf(id) {
    var str = document.getElementById(id).innerHTML;
    var pos = str.lastIndexOf(" ");

    var mask = "****" + str.substring(pos);
    document.getElementById(id).innerHTML = mask;
}

// bật tắt chức năng add to watch list
$(".btn.addToFav").click(function() {
    $(this).toggleClass("btn-warning btn-outline-warning");
});

$("a.history_expand").click(function() {
    $(this).find('i').toggleClass("fa-angle-double-up fa-angle-double-down");

});