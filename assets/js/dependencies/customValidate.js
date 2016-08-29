$(document).ready(function(){
    $('#sign_up_form').validate({
        rules:{
            name:{
                required: true
            },
            email: {
                required: true,
                email: true
            },
            password: {
                minlength: 6,
            },
            passwordagain: {
                equalTo: "#password"                
            }
            
        },
        success: function(element){
            element.text('OK!').addClass('valid');
        }
    });
});