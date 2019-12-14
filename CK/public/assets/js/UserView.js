// Delete a selected row in a table
function deleteUserClick(input){
	var row = input.parentNode.parentNode;
	row.parentNode.removeChild(row);
}
		
function upgradeBidderClick(input){	
	var row = input.parentNode.parentNode;
	//window.alert(row.cells[5].innerText);
	if (row.cells[5].innerText == 'Seller'){
		window.alert('Không thể nâng cấp Seller');
	}
	
	if (row.cells[5].innerText == 'Bidder'){
		row.cells[5].innerText = 'Seller';
	}
}
			
function downgradeSellerClick(input){
	var row = input.parentNode.parentNode;
	//window.alert(row.cells[5].innerText);
	if (row.cells[5].innerText == 'Bidder'){
		window.alert('Không thể hạ cấp Bidder');
	}
	
	if (row.cells[5].innerText == 'Seller'){
		row.cells[5].innerText = 'Bidder';
	}
}
