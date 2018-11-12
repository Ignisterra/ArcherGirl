/* MANU BURGER */

$(function () {
      $('.burger').click(function () {
      	var height = window.height;
            $(this).toggleClass('open');
            $('nav').toggleClass('open-nav', 1000, "easeOutSine" );
            /*$('.open-nav').height(height);*/
      });
});