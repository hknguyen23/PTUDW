function OKCheckboxClick(input){
	var row = input.parentNode.parentNode;
	var OKCheckbox = $(row).find("td").find("input").val();
	var isDelete = $(row).find("p").find("input");
	if (OKCheckbox == "on"){
		isDelete.val(1);
	}
	else {
		isDelete.val(0);
	}
}