<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
var el = document.getElementById("category");
el.onchange = function(){
	var category = $('#category :selected').attr('class');
  $('#subcategory optgroup').hide();
  $('#subcategory').val("");
  $('#subcategory .'+category).show();}
  