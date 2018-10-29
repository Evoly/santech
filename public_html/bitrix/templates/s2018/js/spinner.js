$(function(){

    (function ($) {
      $('.spinner .btn:first-of-type').on('click', function() {
        $('.spinner input').val( parseInt($('.spinner input').val(), 10) + 1);
      });
      $('.spinner .btn:last-of-type').on('click', function() {
            var newVal =  parseInt($('.spinner input').val(), 10) - 1;
            $('.spinner input').val(newVal > 1 ? newVal : 1);
      });
    })(jQuery);

});