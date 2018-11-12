/* MANU BURGER */

$(function () {
  $('.burger').click(function () {
    $(this).toggleClass('open');
    $('nav').toggleClass('open-nav', 600, "easeOutSine" );
    if ($('nav').hasClass("open-nav")) {
    	$('nav').css('height', 'calc(100% - ' + $("header").css("height") + ')');
    }else{
    	$('nav').height(0);
    }
    
  });

  $(window).resize(function(){
  	$('.open-nav').css('height', 'calc(100% - ' + $("header").css("height") + ')');
  });

});
