function toggleResetPswd(e){
    e.preventDefault();
    $('.alert-danger').toggle();
    $('#logreg-forms .form-signin').toggle() // display:block or none
    $('#logreg-forms .form-reset').toggle() // display:block or none
}

function toggleSignUp(e){
    e.preventDefault();
    $('.alert-danger').toggle();
    $('#logreg-forms .form-signin').toggle(); // display:block or none
    $('#logreg-forms .form-signup').toggle(); // display:block or none
    grecaptcha.reset(captcha1);
    grecaptcha.reset(captcha2);
}

$(()=>{
    // Login Register Form
    $('#logreg-forms #forgot_pswd').click(toggleResetPswd);
    $('#logreg-forms #cancel_reset').click(toggleResetPswd);
    $('#logreg-forms #btn-signup').click(toggleSignUp);
    $('#logreg-forms #cancel_signup').click(toggleSignUp);
    $('#navbarSignupButton').click(toggleSignUp);
})

// Open sign-up from link
if(window.location.hash) {
    var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
    if(hash == "sign-up") {
        $('#logreg-forms .form-signin').toggle(); // display:block or none
        $('#logreg-forms .form-signup').toggle(); // display:block or none
    }
    if(hash == "forgot") {
        $('#logreg-forms .form-signin').toggle(); // display:block or none
        $('#logreg-forms .form-reset').toggle(); // display:block or none
    }
} else {
    // No hash found
}

