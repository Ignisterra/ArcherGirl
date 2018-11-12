/* MANU BURGER */

$(function () {
      $('.burger').click(function () {
            $(this).toggleClass('open');
            $('nav').toggleClass('open-nav', 1000, "easeOutSine" );
      });
});