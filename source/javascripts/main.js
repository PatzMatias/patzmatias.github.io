$(document).ready(function(){
	$('.showslide').on('click',function(){
		var cont=$('#slide');
		var cont1=$('body, .back-to-top');
		var button=$('.nav-icons');
		var move= cont.css('margin-right') === '-300px' ? '0px' : '-300px';
		var move1=cont1.css('margin-right') === '0px' ? '300px' : '0px';
		var move2=button.css('right') === '10px' ? '310px' : '10px';
		var move3=cont1.css('margin-left') === '0px' ? '-300px' : '0px';
		var icon=$('.showslide p .fa');

		cont.animate({'margin-right':move},'slow');
		cont1.animate({'margin-right':move1,'margin-left':move3},'slow');
		button.animate({'right':move2},'slow');

		if(icon.hasClass('fa-bars'))
			icon.removeClass('fa-bars').toggleClass('fa-times').css('color','#f00');
		else
			icon.removeClass('fa-times').toggleClass('fa-bars').css('color','#fff');
	});

      $('.home-landing-area').css({'height':($(window).height())+'px'},{'width':($(window).width())+'px'});
      $(window).resize(function(){
      $('.home-landing-area').css({'height':($(window).height())+'px'},{'width':($(window).width())+'px'});
    });

	$(function() {
	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').stop().animate({scrollTop: target.offset().top}, 1000,'easeInOutExpo');
				return false;
				}
			}
		});
	});

	$('a[href="#"]').click(function() {
		return false;
	});


});

$(window).load(function(){
	$('.spinner').fadeOut('slow');
	$('.preloader').delay(350).fadeOut('slow');
	$('.preloader1').delay(50).fadeOut('slow');
});