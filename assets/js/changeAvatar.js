// Change avatar
function changeAvatar(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		
		reader.onload = function (e) {
			$('#avatar')
			.attr('src', e.target.result)
			.width(200)
			.height(200);
		};
		
		reader.readAsDataURL(input.files[0]);
		avatar.src = reader;
		avatar.name = reader;
	}
}