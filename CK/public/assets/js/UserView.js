// Delete a selected row in a table
function deleteUserClick(input){
	var row = input.parentNode.parentNode;
	row.parentNode.removeChild(row);
}
		
function upgradeBidderClick(input){
	var row = input.parentNode.parentNode;
	if (row.cells[5].innerHTML == 'Seller'){
		window.alert('Không thể nâng cấp Seller');
	}
	
	if (row.cells[5].innerHTML == 'Bidder'){
		row.cells[5].innerHTML = 'Seller';
	}
}
			
function downgradeSellerClick(input){
	var row = input.parentNode.parentNode;
	if (row.cells[5].innerHTML == 'Bidder'){
		window.alert('Không thể hạ cấp Bidder');
	}
	
	if (row.cells[5].innerHTML == 'Seller'){
		row.cells[5].innerHTML = 'Bidder';
	}
}