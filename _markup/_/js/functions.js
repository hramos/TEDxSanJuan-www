// remap jQuery to $
(function($){})(window.jQuery);


/* trigger when page is ready */
$(document).ready(init);

function init(){
	setSolapita(1)
	setCaja(1)
	
	/* Asigno Eventos */
	$('.solapita').each(function(index){
		index++;
		$('.solapita:nth-child('+index+')').click(function(){
			setSolapita(index)
			setCaja(index)
		})
	})
}

function setSolapita(n){
	$('.solapita').removeClass('active')
	$('.solapita:nth-child('+n+')').addClass('active')
}

function setCaja(n){
	$('.caja').css('display','none')
	$('.caja:nth-child('+n+')').css('display','block')
}

/* optional triggers

$(window).load(function() {
	
});

$(window).resize(function() {
	
});

*/