function upgradeRequest(){
	var table = document.getElementById('myTable');
	var str = table.rows[7].cells[1].innerHTML;
	if (str == 'Bidder'){
		window.alert('Yêu cầu của bạn đã được gửi đi');
	}
	if (str == 'Seller'){
		window.alert('Bạn đã là Seller');
	}
}