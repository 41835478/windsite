if (typeof(TOP) != 'undefined') {
	var XT = {};
	var eGetFanxian = $('#X_API-Item-Get-Fanxian');
	var eGetPrice = $('#X_API-Item-Get-Price');
	var eGetVolume = $('#X_API-Item-Get-Volume');

	var isfx = <?php echo $fx ?>;
	var rate = <?php echo $fx_rate ?>;
	var fx_type = '<?php echo $fx_type ?>';
	var price = '<?php echo $price ?>';
	var fx = '', rate = '';
	XT.taobaoItemsConvert(id,
			'shop_click_url,commission,commission_rate,volume', function(resp) {
				if (resp) {
					try {
						if (resp.taobaoke_items.taobaoke_item) {
							fx = Math
									.round((resp.taobaoke_items.taobaoke_item[0].commission
											* XT.rate * 100))
									/ (fx_type == 'jifenbao' ? 100 : 10000);
							if (fx_type == 'jifenbao') {
								fx = Math.round(fx);
							} else {
								fx = Math.round(fx * 100) / 100;
							}
							rate = resp.taobaoke_items.taobaoke_item[0].commission_rate;
							eGetVolume.innerHTML = (resp.taobaoke_items.taobaoke_item[0].volume);
						}
						if (fx) {
							if (fx_type == 'jifenbao') {
								eGetFanxian.setAttribute('data-rate', rate);
								eGetFanxian.innerHTML = ('<strong class="text-default">'
										+ (fx)
										+ '&nbsp;<span class="text-gray">'
										+ (XT.jifenbao)
										+ '</span></strong>&nbsp;&nbsp;&nbsp;&nbsp;<span class="muted">(100'
										+ XT.jifenbao + '=1元)</span>');
							} else {
								eGetFanxian.setAttribute('data-rate', rate);
								eGetFanxian.innerHTML = ('<strong class="text-default">'
										+ (fx) + '<span>元</span></strong>');
							}
						} else {
							eGetFanxian.setAttribute('data-rate', -1);
							eGetFanxian.innerHTML = ('<span class="muted">该商品暂无返现</span>');
						}
					} catch (e) {
						eGetFanxian.setAttribute('data-rate', -1);
						eGetFanxian.innerHTML = ('<span class="muted">该商品暂无返现</span>');
					}
				}
			});

	XT.taobaoItemsCouponGet(title, function(resp) {
		if (resp) {
			try {
				if (resp.total_results && resp.total_results > 0) {
					for (var i = 0; i < resp.taobaoke_items.taobaoke_item.length; i++) {
						if (resp.taobaoke_items.taobaoke_item[i].num_iid == id) {
							var coupon_price = resp.taobaoke_items.taobaoke_item[i].coupon_price;
							eGetPrice.text(coupon_price);
							_XT_Search_UpdateCommission(fx_type, eGetFanxian,
									coupon_price);
							break;
						}
					}

				}
			} catch (e) {

			}
		}
	});
	window._XT_Search_UpdateCommission = function(type, element, coupon_price) {
		if (element.getAttribute('data-rate')) {
			var rate = element.getAttribute('data-rate');
			if (rate > 0) {
				var fx = Math
						.round(((coupon_price * (rate / 10000)) * XT.rate * 100))
						/ (type == 'jifenbao' ? 100 : 10000);
				if (fx) {
					if (type == 'jifenbao') {
						fx = Math.round(fx);
					} else {
						fx = Math.round(fx * 100) / 100;
					}
					if (type == 'jifenbao') {
						if (<?php echo $from == 'detail' || $from == 'box' ? true : false ?>) {// box
							element.innerHTML = ('<strong class="text-default">'
									+ (fx)
									+ '&nbsp;<span class="text-gray">'
									+ (XT.jifenbao)
									+ '</span></strong>&nbsp;&nbsp;&nbsp;&nbsp;<span class="muted">(100'
									+ XT.jifenbao + '=1元)</span>');
						}
					} else {
						if (<?php echo $from == 'detail' || $from == 'box' ? true : false ?>) {
							element.innerHTML = ('<strong class="text-default">'
									+ (fx) + '<span>元</span></strong>');
						}
					}
				}
			}
		} else {
			window.setTimeout('_XT_Search_UpdateCommission(' + type + ','
							+ element + ',' + coupon_price + ')', 300);
		}
	}
	function $(a) {
		return document.getElementById(a.replace('#', ''));
	}
	XT.taobaoItemsConvert = function(ids, fields, successCallback) {
		if (typeof(TOP) != 'undefined') {
			TOP.api({
						method : 'taobao.taobaoke.widget.items.convert',
						fields : fields,
						num_iids : ids
					}, function(resp) {
						XT.taobaoError(resp);
						successCallback(resp);
					});
		} else {
			successCallback('');
		}
		return false;
	}
	XT.taobaoItemsCouponGet = function(keyword, successCallback) {
		if (typeof(TOP) != 'undefined') {
			TOP.api({
						method : 'taobao.taobaoke.items.coupon.get',
						fields : 'num_iid,coupon_price,commission_rate,commission',
						keyword : keyword,
						page_no : 1,
						page_size : 100
					}, function(resp) {
						XT.taobaoError(resp);
						successCallback(resp);
					});
		} else {
			successCallback('');
		}
		return false;
	}
	XT.taobaoError = function(resp) {
		if (resp.hasOwnProperty('error_response')) {
			if (resp.error_response.hasOwnProperty('code')) {
				if (resp.error_response.code == 31) {
					alert('请刷新重试');
					top.location.href = top.location.href.split('#')[0];
				}
			}
		}
	}
}