function editButtonClick(input) {
	var mainRow = document.getElementById("mainRow");
	var row = input.parentNode.parentNode;
	row.insertCell(4).innerHTML = `
		<td style="float: right; text-align: right; width: 5%;">
			<button class="btn btn-success" type="submit" formaction="save"><i class="fa fa-floppy-o" aria-hidden="true"></i></button>
			<button class="btn btn-danger" type="submit" formaction="del"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
			<input name="rowSelected" id="rowSelected" hidden>
		</td>`;
	mainRow.insertCell(4).innerHTML = `<th style="text-align: right; width: 5%;" scope="col"></th>`;
	$("#rowSelected").val(row.rowIndex);
	input.disabled = true;
	//$("#catName").prop('readonly', false);
	document.getElementById("catName").readOnly = false;
}

function addButtonClick(input) {
	var table = document.getElementById("myTable");
	var row = table.insertRow(-1);
	var parts = window.location.pathname.split('/');
	
	var cell0 = row.insertCell(0);
	cell0.innerHTML = `<th style="width: 5%;" scope="row"><input name="idLoaiCap1" id="idLoaiCap1" style="border: none; width: 100%;" hidden></th>`;
	document.getElementById("idLoaiCap1").value = parts[2];
	var cell1 = row.insertCell(1);
	cell1.innerHTML = `<td><input name="newCatName" style="border: none; width: 100%;"></td>`;
	var cell2 = row.insertCell(2);
	cell2.innerHTML = `<td><button class="btn btn-success" type="submit" formaction="add"><i class="fa fa-plus fa-sm" aria-hidden="true"></i></button></td>`;
}