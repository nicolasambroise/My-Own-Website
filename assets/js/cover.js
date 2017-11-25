$(document).ready(function() {
	// Background
	$('.NIA-background').addClass('site-background');
	
	// Modals 
	 $('#modals-wrapper').load('./assets/script/modals.html');
	
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
			document.createStyleSheet('./assets/css/cover.css');
	}
	else {
			$("head").append($("<link rel='stylesheet' href='./assets/css/cover.css' type='text/css' media='screen' />"));
    }   
});

// Avatar
$(".avatar").bind("webkitAnimationEnd mozAnimationEnd animationEnd", function(){
	$(this).removeClass("animated");
})

$(".avatar").hover(function(){
  $(this).addClass("animated");        
})

// Menu Navbar
$('.menu-icon .header-crossed').click(function(){
	$('.menu-icon').toggleClass('active');
});

$('.learn-more').click(function(){
	$('.menu-icon').toggleClass('active');
});



/* Google Analytics */
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-32138391-3', 'auto');
  ga('send', 'pageview');
