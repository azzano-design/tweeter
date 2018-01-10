$(function() {
  $('.new-tweet').on('keyup', 'textarea', function() {
    var charCount = +$(this).val().length;
    $('.counter').text(140 - charCount);
    if (140 - charCount < 0) {
      $('.counter').addClass('invalid');
    } else if (140 - charCount === 0 ) {
      $('.counter').addClass('invalid');
    }
    else {
      $('.counter').removeClass('invalid');
    }
   });
});