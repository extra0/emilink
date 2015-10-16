$(function(){

	// маска на телефон
	$('.mask').mask('+7 999 999 99 99');

	// присваиваем название города в тайтл модального заказа звонка и скрытый инпут
	$('.phones__block-callback').click(function(){
		var cityName = $(this).parent().find('.phones__block-city').html();
		$('.modal__header-city').html(cityName);
		$('input[name="city"]').val(cityName);
	});

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

	// раскрываем список заказа в истории линого кабинета
	$('.cart__table-show-btn').click(function(){
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).html('Смотреть товары');
			$(this).parents('.cart__table').find('tbody').fadeOut(500);
		} else {
			$(this).addClass('active');
			$(this).html('Свернуть');
			$(this).parents('.cart__table').find('tbody').fadeIn(500);
		}
	});

	// тольо цифры в инпуте
	$('.order__table-quantity-input').bind("change keyup input click", function() {
		if (this.value.match(/[^0-9]/g, '')) {
			this.value = this.value.replace(/[^0-9]/g, '');
		}
	});
	
});