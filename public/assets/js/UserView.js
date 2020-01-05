function upgradeBidderClick(input){	
	var row = input.parentNode.parentNode;
	var link = $(row).find("h6").find("input");
	
	if (link.val() == 'Admin'){
		window.alert('Không thể nâng cấp Admin');
	}
	
	if (link.val() == 'Seller'){
		link.val('Admin');
	}
	
	if (link.val() == 'Bidder'){
		link.val('Seller');
	}
}
			
function downgradeSellerClick(input){
	var row = input.parentNode.parentNode;
	var link = $(row).find("h6").find("input");
	
	if (link.val() == 'Bidder'){
		window.alert('Không thể hạ cấp Bidder');
	}
	
	if (link.val() == 'Seller'){
		link.val('Bidder');
	}
	
	if (link.val() == 'Admin'){
		link.val('Seller');
	}
}

function deleteUserClick(input){
	var row = input.parentNode.parentNode;
	var deleteCheckbox = $(row).find("h5").find("input");
	var isDelete = $(row).find("h4").find("input");
	if (deleteCheckbox.val() == "on"){
		isDelete.val(1);
		deleteCheckbox.val("off");
	}
	else {
		isDelete.val(0);
		deleteCheckbox.val("on");
	}
}
