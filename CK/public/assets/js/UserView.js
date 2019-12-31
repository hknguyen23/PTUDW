function upgradeBidderClick(input){	
	var row = input.parentNode.parentNode;
	var link = $(row).find("td").find("input");
	if (link.val() == 'Seller'){
		window.alert('Không thể nâng cấp Seller');
	}
	
	if (link.val() == 'Bidder'){
		link.val('Seller');
	}
}
			
function downgradeSellerClick(input){
	var row = input.parentNode.parentNode;
	var link = $(row).find("td").find("input");
	if (link.val() == 'Bidder'){
		window.alert('Không thể hạ cấp Bidder');
	}
	
	if (link.val() == 'Seller'){
		link.val('Bidder');
	}
}

function deleteUserClick(input){
	var row = input.parentNode.parentNode;
	var deleteCheckbox = $(row).find("p").find("input").val();
	var isDelete = $(row).find("h6").find("input");
	if (deleteCheckbox == "on"){
		isDelete.val(1);
	}
	else {
		isDelete.val(0);
	}
}
