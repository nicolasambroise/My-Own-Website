$(document).ready(function() {
	// Background
	$('.NIA-background').addClass('site-background');
	
	// Modals 
	 $('#modals-wrapper').load('./cover/script/modals.html');
	
	// Lazy Load
	$('#competences').on("show.bs.modal", function () {
		$('#competences .lazy_load').each(function(){
			var img = $(this);
			img.attr('src', img.data('src'));
		});
	});  
	$('#timeline').on("show.bs.modal", function () {
		$('#timeline .lazy_load').each(function(){
			var img = $(this);
			img.attr('src', img.data('src'));
		});
	}); 
	
	// Style
	if (document.createStyleSheet){
	    document.createStyleSheet('./cover/css/cover.css');
	}
	else {
	    $("head").append($("<link rel='stylesheet' href='./cover/css/cover.css' type='text/css' media='screen' />"));
        }   
});








// Avatar
/*
$(".avatar").bind("webkitAnimationEnd mozAnimationEnd animationEnd", function(){
	$(this).removeClass("animated");
})

$(".avatar").hover(function(){
  $(this).addClass("animated");
})
*/

function whichTransitionEvent(){
  var t, el = document.createElement("fakeelement");
  var transitions = {
    "transition"      : "transitionend",
    "OTransition"     : "oTransitionEnd",
    "MozTransition"   : "transitionend",
    "WebkitTransition": "webkitTransitionEnd"
  }

  for (t in transitions){
    if (el.style[t] !== undefined){
      return transitions[t];
    }
  }
}

window.onload = function(){
	var transitionEvent = whichTransitionEvent();
	var avatar = document.getElementsByClassName("avatar");
	avatar.onmouseover = function(){
		avatar.className += " animated";
	};

	avatar.one(transitionEvent,function(){
		avatar.className -= " animated";
	})
}

// Menu Navbar
/*
$('.menu-icon .header-crossed').click(function(){
	$('.menu-icon').toggleClass('active');
});

$('.learn-more').click(function(){
	$('.menu-icon').toggleClass('active');
});
*/
window.onload = function(){
	document.getElementsByClassName("header-crossed").onclick = function(){
		document.getElementsByClassName("menu-icon").classList.toggle("active");
	};
	document.getElementsByClassName("learn-more").onclick = function(){
		document.getElementsByClassName("menu-icon").classList.toggle("active");
	};
}

/*!
 * IE10 viewport hack for Surface/desktop Windows 8 bug
 * Copyright 2014-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

// See the Getting Started docs for more information:
// http://getbootstrap.com/getting-started/#support-ie10-width

(function () {
  'use strict';

  if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement('style')
    msViewportStyle.appendChild(
      document.createTextNode(
        '@-ms-viewport{width:auto!important}'
      )
    )
    document.querySelector('head').appendChild(msViewportStyle)
  }

})();

/* Google Analytics */
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-32138391-3', 'auto');
  ga('send', 'pageview');

// Google Map

/*
function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 9,
          center: new google.maps.LatLng(49.6374007,6.217181799999935),
		  mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(49.6374007,6.217181799999935),
          map: map
        });
      }
*/
