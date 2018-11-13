/* MANU BURGER */

$(function () {
  // afficher cacher le menu	
  $('.burger').click(function () {
    $(this).toggleClass('open');
    $('nav').toggleClass('open-nav', 600, "easeOutSine" );
    if ($('nav').hasClass("open-nav") == true) {
    	console.log($('nav').hasClass("open-nav") == true);
    	hideMenu();
    	$('nav').css('height', 'calc(100% - ' + $("header").css("height") + ')');
    		
    }else{
    	$('nav').height(0);
    	hideMenu();
    }
    
  });
  //resize la hauteur du menu ouvert
  $(window).resize(function(){
  	$('.open-nav').css('height', 'calc(100% - ' + $("header").css("height") + ')');
  });



/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */


hideMenu();

});

function hideMenu() {
		if($('nav').hasClass('open-nav') == false){
		console.log($('nav').hasClass('open-nav') == false);
		var prevScrollpos = window.pageYOffset;
		window.onscroll = function() {
		  var currentScrollPos = window.pageYOffset;
		  if (prevScrollpos > currentScrollPos) {
		    $("header").css('top', 0);
		  } else {
		    $("header").css('top', -80);
		  }
		  prevScrollpos = currentScrollPos;
		}

		}else{
			window.onscroll = function() {
				console.log('fdsfsdf');
			
				$("header").css('top', 0);
			}
		}
}