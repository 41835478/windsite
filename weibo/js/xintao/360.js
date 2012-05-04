function selectFirstMenu(first, second) {
	var li = $('#header li:eq(' + first + ')');
	if (li.length == 0) {
		li = $('#header li:eq(0)');
		first = 0;
	}
	li.addClass('pushed').siblings().removeClass('pushed');
	var tmp = li.attr('data-tmp');
	var value = li.attr('data-value');
	$('#ks-content .layout').remove();
	$('#ks-content').prepend(tmp == 1 ? ONE_TMP : TWO_TMP);
	selectSecondMenu(tmp, value, first, second);
}
function selectSecondMenu(tmp, value, first, second) {
	$('#loading-mask,#loading').show();
	if (1 == tmp) {
		var li = $('#header li:eq(' + first + ')');
		if (li.attr('data-access') == 'true') {
			$('#ks-content iframe').attr('src', value);
		} else {
			var m = value.split('mgr/')[1];
			$('#ks-content iframe').attr('src',
					'/admin.php?m=mgr/xintao/xintao.demo&module=' + m);
		}
	} else if (2 == tmp) {
		$('#ks-content .menu-group').hide();
		$('#ks-content .menu-group[data-value="' + value + '"]').show();
		var li = $('#ks-content .menu-group:visible li:eq(' + second + ')');
		if (li.length == 0) {
			li = $('#ks-content .menu-group:visible li:eq(0)');
			second = 0;
		}
		$('#ks-content .menu-group:visible li').click(function() {
					selectFirstMenu(first, $(this).index());
				});
		li.addClass('current').siblings().removeClass('current');
		if (li.find('a.a-menu').attr('data-access') == 'true') {
			$('#ks-content iframe').attr('src',
					li.find('a.a-menu').attr('href'));
		} else {
			var m = li.find('a.a-menu').attr('href').split('mgr/')[1];
			$('#ks-content iframe').attr('src',
					'/admin.php?m=mgr/xintao/xintao.demo&module=' + m);
		}

		$('#side-menu').height($('#mainDiv').height());
	}
	$('#ks-content iframe').load(function() {
				$('#loading-mask,#loading').hide();
			});
	var hash = [first, second].join(',');
	window.location.hash = hash;
}

$(function() {
			// 初始化 自适应窗口大小
			var autoSize = function() {
				var height = document.documentElement.clientHeight - 140;
				// if(height>460)
				$('#mainDiv').height(height);
				$('#loading-mask').height(height).width($('#mainDiv').width());
				$('#side-menu').height(height);
			}
			autoSize();
			$(window).resize(autoSize);
			$('#header li').hover(function() {
						$(this).addClass('hover').siblings()
								.removeClass('hover');
					}, function() {
						$(this).removeClass('hover');
					}).click(function() {
						selectFirstMenu($(this).index(), 0);
					});
			var n = [], hash = window.location.hash;
			if (hash.length > 1) {
				n = hash.substr(1).split(',', 2);
				selectFirstMenu(n[0], n[1]);
				// selectMainMenu(parseInt(n[0]), parseInt(n[1]));
			} else {
				selectFirstMenu(0, 0);
			}
		});