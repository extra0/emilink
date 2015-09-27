$(function(){

	// вызов фенсибокса
	$('.fancybox').fancybox();

	// установка заднего фона на блок
	$('.catalog__cell').hover(function(){
		$(this).children('.catalog__cell-inner').css('background', 'url(../'+ $(this).children('.catalog__cell-bg').attr('src') +')');
	});

});