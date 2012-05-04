$(function() {
			initSearchWidget();
		});
function initSearchWidget(widget) {
	if (!widget) {
		widget = $('body');
	}
	$('.prop-item .more', widget).click(function() {
				if ($(this).hasClass('close')) {
					$(this).parent().find('.moreValue').show();
					$(this).text('收起').removeClass('close').addClass('open');
				} else {
					$(this).parent().find('.moreValue').hide();
					$(this).text('更多').removeClass('open').addClass('close');
				}
				return false;
			});
	$('.J_PropToggler', widget).click(function() {
				var a = $('a', $(this));
				if (a.hasClass('close')) {
					$('.prop-item:gt(3)', $(this).parent()).show();
					$('span', a).text('收起');
					a.removeClass('close').addClass('open');
				} else {
					$('.prop-item:gt(3)', $(this).parent()).hide();
					$('span', a).text('更多');
					a.removeClass('open').addClass('close');
				}
				return false;
			});
	$('.prop-item li a', widget).click(function(event) {
		var widget = $(this).parents('.widget-customer:first');
		if ($(this).hasClass('selected')) {
			$(this).removeClass('selected');
			$('.selected-attr a[value="' + $(this).attr('value') + '"]', widget)
					.parent().remove();
			if ($('.selected-attr dd', widget).length == 0) {
				$('.selected-attr', widget).hide();
			}
		} else {
			$('.selected-attr', widget).show();
			$('a', $(this).parents('dd:first')).removeClass('selected');
			$(this).addClass('selected');
			var pid = $(this).attr('value').split(':')[0];
			$('.selected-attr a[value*="' + pid + ':"]', widget).parent()
					.remove();
			var propName = $(this).parents('.prop-item').find('dt.search-prop');
			var ndd = $('<dd><a value="' + $(this).attr('value') + '"><h5>'
					+ propName.text() + '</h5>' + $(this).text()
					+ '<span class="close-icon"></span></a></dd>');
			$('.selected-attr dl', widget).append(ndd);
			ndd.click(function() {
						$(this).remove();
						$(
								'.prop-item a[value="'
										+ $('a', this).attr('value') + '"]',
								widget).removeClass('selected');
						if ($('.selected-attr dd', widget).length == 0) {
							$('.selected-attr', widget).hide();
						}
					});
		}
		return false;
	});
	$('.searchwidget-btn,.answer', widget).click(function() {
				var widget = $(this).parents('.widget-customer:first');
				var props = "";
				var isFirst = true;
				$('.selected-attr dd a', widget).each(function() {
							props += $(this).attr('value') + ";";
						});
				$('.searchCustome input[name="props"]', widget).val(props);
				$('.searchCustome', widget).submit();

			});
}