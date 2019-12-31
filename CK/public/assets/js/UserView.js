function upgradeBidderClick(input){	
	var row = input.parentNode.parentNode;
	//window.alert(row.cells[5].innerText);
	if (row.cells[5].value == 'Seller'){
		window.alert('Không thể nâng cấp Seller');
	}
	
	if (row.cells[5].value == 'Bidder'){
		row.cells[5].value = 'Seller';
	}
}
			
function downgradeSellerClick(input){
	var row = input.parentNode.parentNode;
	//window.alert(row.cells[5].innerText);
	if (row.cells[5].value == 'Bidder'){
		window.alert('Không thể hạ cấp Bidder');
	}
	
	if (row.cells[5].value == 'Seller'){
		row.cells[5].value = 'Bidder';
	}
}
