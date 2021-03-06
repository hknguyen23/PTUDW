function editButtonClick(input) {
	var mainRow = document.getElementById("mainRow");
	var row = input.parentNode.parentNode;
	var parts = window.location.pathname.split('/');
	
	row.insertCell(4).innerHTML = `
		<td style="float: right; text-align: right; width: 5%;">
			<button class="btn btn-success" type="submit" formaction="save"><i class="fa fa-floppy-o" aria-hidden="true"></i></button>
			<button class="btn btn-danger" type="submit" formaction="del" onclick="return checkQuantity();"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
			<input name="rowSelected[]" id="rowSelected" hidden>
			<input name="idLoaiCap1" id="idLoaiCap1" style="border: none; width: 100%;" hidden>
		</td>`;
	mainRow.insertCell(4).innerHTML = `<th style="text-align: right; width: 5%;" scope="col"></th>`;
	$("#rowSelected").val(row.rowIndex);
	document.getElementById("idLoaiCap1").value = parts[2];
	//input.disabled = true;
	//$("#catName").prop('readonly', false);
	//document.getElementById("catName").readOnly = false;
	$('button[id^="editButton"]').prop('disabled', true);			// disabled all button start with id="editButton"
	$('button[id^="addButton"]').prop('disabled', true);
	$(row).find("td").find(".catName").attr("readonly", false);
}

function addButtonClick() {
	var table = document.getElementById("myTable");
	var row = table.insertRow(-1);
	var parts = window.location.pathname.split('/');
	$('button[id^="addButton"]').prop('disabled', true);
	$('button[id^="editButton"]').prop('disabled', true);
	
	var cell0 = row.insertCell(0);
	cell0.innerHTML = `<th style="width: 5%;" scope="row"><input name="idLoaiCap1" id="idLoaiCap1" style="border: none; width: 100%;" hidden></th>`;
	document.getElementById("idLoaiCap1").value = parts[2];
	var cell1 = row.insertCell(1);
	cell1.innerHTML = `<td><input name="newCatName" id="newCatName" style="border: none; width: 100%;" required></td>`;
	var cell2 = row.insertCell(2);
	cell2.innerHTML = `<td><button class="btn btn-success" type="submit" formaction="add"><i class="fa fa-plus fa-sm" aria-hidden="true"></i></button></td>`;
}

function checkQuantity() {
	var table = document.getElementById("myTable");
	var row = table.rows[$("#rowSelected").val()];
	var quantity = row.cells[2].innerHTML;
	var check = true;
	if (quantity > 0){
		if (confirm(`Danh mục này hiện có ${quantity} sản phẩm, bạn có chắc muốn xóa danh mục này không?`)){
			check = true;
		}
		else {
			check = false;
		}
	}
	return check;
}