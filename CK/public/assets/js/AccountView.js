function upgradeRequest(){
	var table = document.getElementById('loai');
	if (table == 'Bidder'){
		return window.alert('Yêu cầu của bạn đã được gửi đi');
	}
	if (table == 'Seller'){
		window.alert('Bạn đã là Seller');
	}
}

