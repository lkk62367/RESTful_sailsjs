$(document).ready(function () {

  $('#sign-up-form').validate({
    rules: {
      name:{
        required: true
      },
      email: {
        type: 'email',
        required: true
      },
      password: {
        minlength:6,
        required: true
      },
      confirmation: {
        minlength:6,
        equalTo: "#password"
      }
    },
    success: function(element){
      element.text('OK!').addClass('valid');
    }
  });

});
