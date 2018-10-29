/* http://keith-wood.name/countdown.html
 * Russian initialisation for the jQuery countdown extension
 * Written by Sergey K. (xslade{at}gmail.com) June 2010. */
(function($) {
        $.countdown.regionalOptions['ru'] = {
		labels: ['Лет', 'Месяцев', 'Недель', 'дней', 'часов', 'минут', 'секунд'],
		labels1: ['Год', 'Месяц', 'Неделя', 'дней', 'часов', 'минут', 'секунд'],
		labels2: ['Года', 'Месяца', 'Недели', 'дней', 'часов', 'минут', 'секунд'],
		compactLabels: ['л', 'м', 'н', 'д'], compactLabels1: ['г', 'м', 'н', 'д'],
		whichLabels: function(amount) {
			var units = amount % 10;
			var tens = Math.floor((amount % 100) / 10);
			return (amount == 1 ? 1 : (units >= 2 && units <= 4 && tens != 1 ? 2 :
				(units == 1 && tens != 1 ? 1 : 0)));
		},
		digits: [
                    '<span class="num">0</span>',
                    '<span class="num">1</span>',
                    '<span class="num">2</span>',
                    '<span class="num">3</span>',
                    '<span class="num">4</span>',
                    '<span class="num">5</span>',
                    '<span class="num">6</span>',
                    '<span class="num">7</span>',
                    '<span class="num">8</span>',
                    '<span class="num">9</span>'
                ],
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regionalOptions['ru']);
})(jQuery);