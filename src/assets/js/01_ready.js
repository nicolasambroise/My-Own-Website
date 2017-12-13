document.addEventListener("DOMContentLoaded", function() {
	// Background
	 document.getElementById('NIA-background').classList.add('site-background');
	
	// Modals 
	 document.getElementById('modals-wrapper').innerHTML='<object type="text/html" data="./assets/pages/modals.html" ></object>';
	// Lazy Load
	/*
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
	*/
	// Style
	if (document.createStyleSheet){document.createStyleSheet('./assets/css/styles.min.css');}
	else {
		var newLink = document.createElement("link");
		newLink.href = "./assets/css/styles.min.css";
		newLink.setAttribute('rel', 'stylesheet');
		newLink.setAttribute('type', 'text/css');
		newLink.setAttribute('media', 'screen');
		document.head.appendChild(newLink);
   }   
});
