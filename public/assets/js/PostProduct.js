function checkInput(event) {
    return (event.charCode != 8 && event.charCode == 0 || (event.charCode >= 48 && event.charCode <= 57))
}

$(function() {
    // Multiple images preview in browser
    var imagesPreview = function(input, placeToInsertImagePreview) {

        if (input.files) {
            var filesAmount = input.files.length;




            for (i = 0; i < filesAmount; i++) {

                var reader = new FileReader();
                reader.onload = function(event) {
                    $($.parseHTML('<img>')).attr('src', event.target.result).appendTo(placeToInsertImagePreview);

                }
                reader.readAsDataURL(input.files[i]);

            }

        }

    };
    $('#gallery-photo-add').on('change', function() {
        imagesPreview(this, 'div.gallery');
    });

});

function displaymain() {
    var x = document.getElementById('main_window');
    var src = $('div.gallery:first-child').attr('src');
    x.attr.src = src;
}


// function previewImages() {

//     var $preview = $('.gallery').empty();
//     if (this.files) $.each(this.files, readAndPreview);


//     function readAndPreview(i, file) {

//         var reader = new FileReader();
//         $(reader).on("load", function() {
//             $preview.append($("<img/>", { src: this.result }));


//         });

//         $('#main_window').attr('src', this.result);
//         reader.readAsDataURL(file);

//     }

// }

// $('#gallery-photo-add').on("change", previewImages);