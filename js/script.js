$(function(){

	// вызов фенсибокса
	$('.fancybox').fancybox();

	// установка заднего фона на блок категорий на главной
	$('.catalog__cell').hover(function(){
		$('.catalog__cell-inner-bg').attr('style', $(this).attr('style'));
	});

	// ф-я разбивки на разряды
	function numberWithCommas(x) {
        return x.toString().replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g,"\$1 ");
    }
	$('._replace').each(function(i, j){
		$(this).html(numberWithCommas($(this).html()));
	});

	// проставляем индексы для превьюшек товара
	$('.product__image-thumb-link').each(function(el){
		$(this).attr('data-slide-index', el);
	});

	// блок фото в продукте
	$('.product__image-list').bxSlider({
		pagerCustom: '.product__image-thumbs-block',
		infinityLoop: true
	});

	// только цифры в инпуте даты
	$('.product__input').bind("change keyup input click", function() {
		if (this.value.match(/[^0-9]/g, '')) {
			this.value = this.value.replace(/[^0-9]/g, '');
		}
	});

	$('.product__specification-tab-link').each(function(el){$(this).attr('data-tab-index', el)}); // проставляем индексы для табов
	$('.product__tab-block').each(function(el){$(this).attr('data-tab-index', el)}); // проставляем индексы для блоков табов
	
	// обработка табов
	$('.product__specification-tab-link').click(function(){
		$('.product__specification-tab-link').removeClass('active');
		$('.product__tab-block').removeClass('active');
		$(this).addClass('active');
		$(this).parents('.product__specification-block').find('.product__tab-block[data-tab-index="' + $(this).attr('data-tab-index')+'"]').addClass('active');
		return false;
	});
});