function initConvert() {
	$('#linksMore').click(function() {
				$('#links li.more').show();
				$(this).hide();
			});
	$('#links .link').blur(function() {
		var url = $(this).val();
		$(this).removeClass('link-error');
		if (url && url != '') {
			var nid = $.url.setUrl(url.replace('http://ju.atpanel.com/?url=',
					'')).param('id');
			if (!nid || nid == '') {
				$(this).addClass('link-error');
			}
		}
	}).focus(function() {
				$(this).removeClass('link-error');
			}).click(function() {
				$(this).select();
			});
	$('#clearLinks').click(function() {
				$('#links .link').val('');
			});
	var root = $("#convertWizard").scrollable();
	var api = root.scrollable();
	api.onBeforeSeek(function(event, i) {
				$("#status li").removeClass("active").eq(i).addClass("active");
			});
	$('#firstNext').click(function() {
		var nids = [];
		var unnids = [];
		$('.link').each(function() {
			var url = $(this).val();
			if (url && url != '') {
				var nid = $.url.setUrl(url.replace(
						'http://ju.atpanel.com/?url=', '')).param('id');
				if (!nid || nid == '') {
					unnids.push($(this).attr('num'));
				} else {
					nids.push(nid);
				}
			}
		});
		if (unnids.length > 0) {
			confirm(
					'您填写的【' + unnids.join(',') + '】商品地址格式错误，点击确定将忽略错误，只转换正确的商品',
					function(r) {
						if (r) {
							if (nids.length == 0) {
								alert('您尚未填写要转换的商品URL地址，或者填写的全部是错误地址');
								return;
							}
							api.seekTo(1);
							getHtmlLinksConvertResult(nids.join(','));
						}
					});

		} else {
			if (nids.length == 0) {
				alert('您尚未填写要转换的商品URL地址，或者填写的全部是错误地址');
				return;
			}
			api.seekTo(1);
			getHtmlLinksConvertResult(nids.join(','));
		}

	});
}

function getHtmlLinksConvertResult(nids) {
	getHtmlContent("secondStepDiv", '/router/member/links/convert/result?v='
					+ Math.random(), "GET", {
				nids : nids
			}, function(data) {
				$('#secondStepDiv').empty().append(data);
				$('.wTable').pager('.pageTbody', {
							navId : 'pageTr_nav',
							navClass : 'nav_pager',
							height : 370
						});
			});
}