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
