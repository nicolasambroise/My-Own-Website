$(".avatar").bind("webkitAnimationEnd mozAnimationEnd animationEnd", function(){
	$(this).removeClass("animated");
	 /*
	 if ($('.avatar').is(':hover')) {
		$(this).addClass("animated");  
	 }
	 */
})

$(".avatar").hover(function(){
  $(this).addClass("animated");        
})

$('.menu-icon .header-crossed').click(function(){
	$('.menu-icon').toggleClass('active');
});

$('.learn-more').click(function(){
	$('.menu-icon').toggleClass('active');
});
