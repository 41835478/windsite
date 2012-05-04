$(function() {
			$('#selectObj').change(function() {
						if ($(this).val() == "1") {// 卖家
							$('#cat').hide();
						} else {// 商品
							$('#cat').show();
						}
					});
			$('#search').click(function() {
				if ($('#selectObj').val() == '0') {
					advanceItemsSearch($('#q').val(), '', $('#cat').val(), '',
							'volume:desc');
				} else {
					advanceItemsSearch('', $('#q').val(), $('#cat').val(), '',
							'volume:desc');
				}

			});
		});
function advanceItemsSearch_() {
	if ($('#selectObj').val() == '0') {
		advanceItemsSearch($('#q').val(), '', $('#cat').val(), '',
				'volume:desc');
	} else {
		advanceItemsSearch('', $('#q').val(), $('#cat').val(), '',
				'volume:desc');
	}
}
function advanceItemsSearch(q, nicks, cid, is_mall, order_by, state, city,
		start_price, end_price, page_no) {
	if (!q) {
		q = '';
	}
	if (!nicks) {
		nicks = '';
	}
	if (!cid) {
		cid = '';
	}
	if (!is_mall) {
		is_mall = '';
	}
	if (!order_by) {
		order_by = '';
	}
	if (!state) {
		state = '';
	}
	if (!city) {
		city = '';
	}
	if (!start_price) {
		start_price = '';
	}
	if (!end_price) {
		end_price = '';
	}
	if (!page_no) {
		page_no = 1;
	}
	getHtmlContent('items-result', '/router/top/taoke/items/search', 'POST', {
				nick : $('#nick').val(),
				nicks : nicks,
				q : q,
				cid : cid,
				order_by : order_by,
				is_mall : is_mall,
				state : state,
				city : city,
				start_price : start_price,
				end_price : end_price,
				page_no : page_no
			}, function(data) {
				$('#items-result').empty().append(data);
			}, function() {
			});
}