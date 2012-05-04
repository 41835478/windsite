$(function() {
			$('img').lazyload({
						placeholder : "/assets/min/images/grey.gif",
						effect : "fadeIn"
					});
			$('.prop-item .more').click(function() {
						if ($(this).text() == '更多') {
							$(this).parent().find('.moreValue').show();
							$(this).text('收起');
						} else {
							$(this).parent().find('.moreValue').hide();
							$(this).text('更多');
						}
					});
			$('.wm_list_li').hover(function() {
				$(this).toggleClass("ui-selecting").siblings()
						.removeClass("ui-selecting");
			}, function() {
				$(this).removeClass("ui-selecting");
			});
			$('#mysizes').change(function() {// 6种条件查询
						var q = $('#wm_search_input').val();
						if (!q || "输入组件名称" == q) {
							q = '';
						}
						document.location.href = document.location.href
								.split('?')[0]
								+ '?q='
								+ q
								+ '&layout='
								+ $(this).val()
								+ '&cid='
								+ $('#mycats').val()
								+ '&sortOrder='
								+ $('#sortOrderHidden').val()
								+ '&pageNo='
								+ $('#pageNoHidden').val()
								+ '&type='
								+ $('#mytypes').val();
					});
			$('#mytypes').change(function() {// 6种条件查询
						var q = $('#wm_search_input').val();
						if (!q || "输入组件名称" == q) {
							q = '';
						}
						document.location.href = document.location.href
								.split('?')[0]
								+ '?q='
								+ q
								+ '&layout='
								+ $('#mysizes').val()
								+ '&cid='
								+ $('#mycats').val()
								+ '&sortOrder='
								+ $('#sortOrderHidden').val()
								+ '&pageNo='
								+ $('#pageNoHidden').val()
								+ '&type='
								+ $(this).val();
					});
			$('#mycats').change(function() {// 5种条件查询
						var q = $('#wm_search_input').val();
						if (!q || "输入组件名称" == q) {
							q = '';
						}
						document.location.href = document.location.href
								.split('?')[0]
								+ '?q='
								+ q
								+ '&layout='
								+ $('#mysizes').val()
								+ '&cid='
								+ $(this).val()
								+ '&sortOrder='
								+ $('#sortOrderHidden').val()
								+ '&pageNo='
								+ $('#pageNoHidden').val()
								+ '&type='
								+ $('#mytypes').val();
					});
			$('#wm_search_but').click(function() {
				var st = $('#wm_search_input').val();
				if (!st || '输入组件名称' == st) {
					st = '';
				}
				document.location.href = document.location.href.split('?')[0]
						+ "?q=" + st;
			});
			$('.w-commission').click(function() {
				if ($(this).hasClass('w-viewcommission')) {
					previewCommission($('.widget-customer[cwid="'
							+ $(this).attr('cwid') + '"]'));
					$(this).removeClass('w-viewcommission')
							.addClass('w-hidecommission');
				} else {
					$(
							'.c-c',
							$('.widget-customer[cwid="' + $(this).attr('cwid')
									+ '"]')).remove();
					$(this).removeClass('w-hidecommission')
							.addClass('w-viewcommission');
				}
				return false;
			});
			$('.w-addfav').click(function() {
						var self = $(this);
						addMyFavoriteWidget($(this).attr('cwid'), function() {
									self.parent().empty().append('已收藏');
								});
						return false;
					});
			$('.w-deletefav').click(function() {
						deleteMyFavoriteWidget($(this).attr('cwid'));
						return false;
					});
			$('.w-deletewidget').click(function() {
						var cwid = $(this).attr('cwid');
						confirm('您确认要删除该组件吗?', function(r) {
									if (r) {
										deleteMyWidget(cwid);
									}
								})

						return false;
					});
		});
function getUsedHistoryList(cwid, pageNo) {
	if (!pageNo) {
		pageNo = 1;
	}
	getHtmlContent("usedHistoryList", "/router/member/widget/detail/used/"
					+ cwid, "GET", {
				pageNo : pageNo
			}, function(data) {
				$('#usedHistoryList').empty().append(data);
			});
}
function getFavoriteHistoryList(cwid, pageNo) {
	if (!pageNo) {
		pageNo = 1;
	}
	getHtmlContent("favoriteHistoryList",
			"/router/member/widget/detail/favorite/" + cwid, "GET", {
				pageNo : pageNo
			}, function(data) {
				$('#favoriteHistoryList').empty().append(data);
			});
}