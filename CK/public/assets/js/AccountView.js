function upgradeRequest(){
	var table = document.getElementById('myTable');
	var str = table.rows[6].cells[1].innerText;
	if (str == 'Bidder'){
		window.alert('Yêu cầu của bạn đã được gửi đi');
	}
	if (str == 'Seller'){
		window.alert('Bạn đã là Seller');
	}
}

