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







