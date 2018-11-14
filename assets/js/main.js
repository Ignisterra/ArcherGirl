/* MANU BURGER */

$(function () {
  // afficher cacher le menu	
  $('.burger').click(function () {
    $(this).toggleClass('open');
    $('nav').toggleClass('open-nav', 600, "easeOutSine" );
    if ($('nav').hasClass("open-nav") == true) {
    	
    	$('nav').css('height', 'calc(100% - ' + $("header").css("height") + ')');   		
    }else{
    	$('nav').height(0);
    }
    hideMenu();
  });
  //resize la hauteur du menu ouvert
  $(window).resize(function(){
  	$('.open-nav').css('height', 'calc(100% - ' + $("header").css("height") + ')');
  });

  // lancer le jeu
  $('#launch').click(function(){
    $('#glauncher').hide();
    $('#game_container').show();
		$('html, body').stop(true, false).animate({scrollTop: $('#game_container').offset().top}, 1000 );
  });



hideMenu();


});


/* cacher et aficher la navbar au scroll */
function hideMenu() {
		if($('nav').hasClass('open-nav') == false){		
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
				$("header").css('top', 0);
			}
		}
}


