$(function() {
  $('.new-tweet').on('keyup', 'textarea', function() {
    var charCount = +$(this).val().length;
    if (charCount > 140) {
      $('.counter').addClass('invalid');
    } else {
      $('.counter').removeClass('invalid');
    }
    $('.counter').text(charCount);
   });
});