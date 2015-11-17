$(function(){

	// ф-я разбивки на разряды
	function numberWithCommas(x) {
		return x.toString().replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g, "\$1 ");
	}

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

	// разделяем на разряды цены
	$('.replace').each(function(){
		$(this).html(numberWithCommas($(this).html()));
	});


	// -- КОРЗИНА
		function cart() {

			var totalSum = $('.order__table-total-price'),
				sum = 0,
				totalWeight = 0,
				totalVolume = 0,
				sumRozn = 0;
				sumPartn = 0;
				sumDiller = 0;
				input = $(this).parents('tr').find('input');
				rozn = $('#rozn').val();
				partn = $('#partner').val();


			$('[data-rozn]').each(function(){sumRozn += (parseFloat($(this).attr('data-rozn')) * $(this).parents('tr').find('input').val());}); // общая розничная цена
			$('[data-partner]').each(function(){sumPartn += (parseFloat($(this).attr('data-partner')) * $(this).parents('tr').find('input').val());}); // общая  партнерская цена
			$('[data-diller]').each(function(){sumDiller += (parseFloat($(this).attr('data-diller')) * $(this).parents('tr').find('input').val());}); // общая  диллерская цена

			// проверяем первый диапазон цены 
			if (sumRozn < rozn) {
				$('[data-rozn]').each(function(){
					sum += (parseFloat($(this).attr('data-rozn')) * $(this).parents('tr').find('input').val());
					$(this).parents('tr').find('[data-total]').html($(this).attr('data-rozn')); //меняем цену в графе "Цена"
					$(this).parents('tr').find('[data-total]').attr('data-total', $(this).attr('data-rozn')); // меняем attr total
					$(this).parents('tr').find('[data-total]').attr('data-total', $(this).parents('tr').find('input').val() * parseFloat($(this).attr('data-rozn'))); // меняем attr total
					$(this).parents('tr').find('.order__table-line-price').html($(this).attr('data-total')); // записываем общую цену линии
				});

			// проверяем второй диапазон цены 
			} else if ((sumRozn >= rozn) && (sumRozn < partn)) {
				$('[data-partner]').each(function(){
					sum += (parseFloat($(this).attr('data-partner')) * $(this).parents('tr').find('input').val());
					$(this).parents('tr').find('[data-total]').html($(this).attr('data-partner')); //меняем цену в графе "Цена"
					$(this).parents('tr').find('[data-total]').attr('data-total', $(this).parents('tr').find('input').val() * parseFloat($(this).attr('data-partner'))); // меняем attr total
					$(this).parents('tr').find('.order__table-line-price').html($(this).attr('data-total')); // записываем общую цену линии
				});

			// проверяем третий диапазон цены 
			} else if (sumRozn >= partn) {
				$('[data-diller]').each(function(){
					sum += (parseFloat($(this).attr('data-diller')) * $(this).parents('tr').find('input').val());
					$(this).parents('tr').find('[data-total]').html($(this).attr('data-diller')); //меняем цену в графе "Цена"
					$(this).parents('tr').find('[data-total]').attr('data-total', $(this).attr('data-diller')); // меняем attr total
					$(this).parents('tr').find('[data-total]').attr('data-total', $(this).parents('tr').find('input').val() * parseFloat($(this).attr('data-diller'))); // меняем attr total
					$(this).parents('tr').find('.order__table-line-price').html($(this).attr('data-total')); // записываем общую цену линии
				});
			}


			// вывод суммы в "итого"
			totalSum.html(sum.toFixed(2));

			$('._replace').each(function(){$(this).html(numberWithCommas($(this).html()));});

			// рассчитываем общий вес при загрузке страницы
			$('.order__table-product-text[data-total-weight]').each(function(){
				totalWeight += parseFloat($(this).attr('data-total-weight'));
			});
			$('.order__table-total-weight').html(totalWeight.toFixed(3)); //заносим общий вес по всем товарам в Итого - ВЕС

			// рассчитываем общий объем при загрузке страницы
			$('.order__table-product-text[data-total-volume]').each(function(){
				totalVolume += parseFloat($(this).attr('data-total-volume'));
			});
			$('.order__table-total-volume').html(totalVolume.toFixed(3)); //заносим общий объем по всем товарам в Итого - объем

		}

		// изменяем количество товара
		$('.order__table-quantity-changer').click(function(){
			var input = $(this).parents('tr').find('input'),
				totalLine = $(this).parents('tr').find('.order__table-item-price'),
				totalLineHtml = $(this).parents('tr').find('.order__table-line-price'),
				weight = $(this).parents('tr').find('.order__table-product-text[data-weight]'),
				volume = $(this).parents('tr').find('.order__table-product-text[data-volume]'),
				totalWeight = 0;
				totalVolume = 0;

			// изменяем значение в инпуте
			input.val(parseFloat(input.val()) + parseFloat($(this).attr('data-val')));

			// проверка на мин значение
			if (input.val() < input.attr('data-min-val')) {
				input.val('1');
			}

			// изменяем значение общее по товару
			// totalLine.attr('data-total', input.val() * parseFloat(totalLine.attr('data-rozn')));
			// totalLineHtml.html(totalLine.attr('data-total')); // заносим общую сумму по товару в Столбец "стоимость"

			//  рассчет веса
			weight.attr('data-total-weight', (parseFloat(input.val())) * (parseFloat(weight.html()))); //рассчитываем вес по каждому товару
			$('.order__table-product-text[data-total-weight]').each(function(){
				totalWeight += parseFloat($(this).attr('data-total-weight'));
			});
			$('.order__table-total-weight').html(totalWeight.toFixed(3)); //заносим общий вес по всем товарам в Итого - ВЕС

			//  рассчет объема
			volume.attr('data-total-volume', (parseFloat(input.val())) * (parseFloat(volume.html()))); //рассчитываем объем по каждому товару
			$('.order__table-product-text[data-total-volume]').each(function(){
				totalVolume += parseFloat($(this).attr('data-total-volume'));
			});
			$('.order__table-total-volume').html(totalVolume.toFixed(3)); //заносим общий объем по всем товарам в Итого - объем

			cart();
		});

		// удаляем значение
		$('.order__table-delete').click(function() {
			$(this).parents('tr').remove();
			cart();
		});


		// делаем расчет суммы по ручному вводу количества в инпут
		$('.order__table-quantity-input').keyup(function(){
			var input = $(this).parents('tr').find('input'),
				totalLine = $(this).parents('tr').find('.order__table-item-price');
				totalLineHtml = $(this).parents('tr').find('.order__table-line-price');
				weight = $(this).parents('tr').find('.order__table-product-text[data-weight]'),
				volume = $(this).parents('tr').find('.order__table-product-text[data-volume]'),
				totalWeight = 0,
				totalVolume = 0;

			// проверка на мин значение
			if (input.val() < input.attr('data-min-val')) {
				input.val('1');
			}

			// totalLine.attr('data-total', input.val() * parseFloat(totalLine.attr('data-rozn')));
			// totalLineHtml.html(totalLine.attr('data-total'));  // заносим общую сумму по товару в Столбец "стоимость"

			//  рассчет веса
			weight.attr('data-total-weight', (parseFloat(input.val())) * (parseFloat(weight.html()))); //рассчитываем вес по каждому товару
			$('.order__table-product-text[data-total-weight]').each(function(){
				totalWeight += parseFloat($(this).attr('data-total-weight'));
			});
			$('.order__table-total-weight').html(totalWeight.toFixed(3)); //заносим общий вес по всем товарам в Итого - ВЕС


			//  рассчет объема
			volume.attr('data-total-volume', (parseFloat(input.val())) * (parseFloat(volume.html()))); //рассчитываем объем по каждому товару
			$('.order__table-product-text[data-total-volume]').each(function(){
				totalVolume += parseFloat($(this).attr('data-total-volume'));
			});
			$('.order__table-total-volume').html(totalVolume.toFixed(3)); //заносим общий объем по всем товарам в Итого - объем

			cart();
		});
	cart();
	
});