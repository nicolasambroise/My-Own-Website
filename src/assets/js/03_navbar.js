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
};
