/**
 * 视频搜索
 */
function newTvSearch() {
	$query = [];
	$query.push({
				'k' : 'key',
				'v' : $('#J_TVSearchInput').val() ? $('#J_TVSearchInput').val()
						.replace(/-/gi, ' ') : ''
			});
	$query.push({
				'k' : 'c',
				'v' : $('#J_TVSearchC').val() ? $('#J_TVSearchC').val()
						.replace(/-/gi, ' ') : '1'
			});
	$query.push({
				'k' : 'tvType',
				'v' : ''
			});
	$query.push({
				'k' : 'cat',
				'v' : ''
			});
	$query.push({
				'k' : 'area',
				'v' : ''
			});
	$query.push({
				'k' : 'year',
				'v' : ''
			});
	$query.push({
				'k' : 'cs',
				'v' : ''
			});
	$query.push({
				'k' : 'age',
				'v' : ''
			});
	$query.push({
				'k' : 'language',
				'v' : ''
			});
	// 保留10个扩展参数
	$query.push({
				'k' : 'extra_1',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_2',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_3',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_4',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_5',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_6',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_7',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_8',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_9',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_10',
				'v' : ''
			});
	// 扩展参数结束
	$query.push({
				'k' : 'fee',
				'v' : ''
			});
	$query.push({
				'k' : 'o',
				'v' : ''
			});
	$query.push({
				'k' : 'page_no',
				'v' : 1
			});
	// 显示数量
	$query.push({
				'k' : 'show_num',
				'v' : 40
			});
	var url = convertSearchUrl($query);
	document.location.href = '/video.search' + url;
	return false;
}
/**
 * 视频搜索
 */
function tvSearch() {
	$query = [];
	$query.push({
				'k' : 'key',
				'v' : $('#J_TVSearchInput').val() ? $('#J_TVSearchInput').val()
						.replace(/-/gi, ' ') : ''
			});
	$query.push({
				'k' : 'c',
				'v' : $('#J_TVSearchC').val() ? $('#J_TVSearchC').val()
						.replace(/-/gi, ' ') : '1'
			});
	$query.push({
				'k' : 'tvType',
				'v' : ''
			});
	$query.push({
				'k' : 'cat',
				'v' : ''
			});
	$query.push({
				'k' : 'area',
				'v' : ''
			});
	$query.push({
				'k' : 'year',
				'v' : ''
			});
	$query.push({
				'k' : 'cs',
				'v' : ''
			});
	$query.push({
				'k' : 'age',
				'v' : ''
			});
	$query.push({
				'k' : 'language',
				'v' : ''
			});
	// 保留10个扩展参数
	$query.push({
				'k' : 'extra_1',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_2',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_3',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_4',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_5',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_6',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_7',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_8',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_9',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_10',
				'v' : ''
			});
	// 扩展参数结束
	$query.push({
				'k' : 'fee',
				'v' : ''
			});
	$query.push({
				'k' : 'o',
				'v' : ''
			});
	$query.push({
				'k' : 'page_no',
				'v' : 1
			});
	// 显示数量
	$query.push({
				'k' : 'show_num',
				'v' : 40
			});
	var url = convertSearchUrl($query);
	document.location.href = '/tv.search' + url;
	return false;
}
/**
 * 凡客商品搜索Component_95
 */
function vanclItemSearch() {
	$query = [];
	$query.push({
				'k' : 'q',
				'v' : $('#q').val() ? $('#q').val().replace(/-/gi, ' ') : ''
			});
	$query.push({
				'k' : 'cid',
				'v' : $('#J_VanclCid').val()
			});
	$query.push({
				'k' : 'isspecial',
				'v' : $('#J_VanclSpecial input[type="radio"]:checked').val()
			});
	var sprice = $('#J_VanclSPrice').val();
	if (!/^\d+$/.test(sprice)) {
		sprice = '';
	}
	$query.push({
				'k' : 'sprice',
				'v' : sprice
			});
	var eprice = $('#J_VanclEPrice').val();
	if (!/^\d+$/.test(eprice)) {
		eprice = '';
	}
	$query.push({
				'k' : 'eprice',
				'v' : eprice
			});
	$query.push({
				'k' : 'extra_1',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_2',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_3',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_4',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_5',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_6',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_7',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_8',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_9',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_10',
				'v' : ''
			});
	$query.push({
				'k' : 'sortOrder',
				'v' : $('#J_VanclSortOrder').val()
			});
	$query.push({
				'k' : 'page_no',
				'v' : $('#J_VanclPageNo').val()
			});
	// 显示数量
	$query.push({
				'k' : 'show_num',
				'v' : 20
			});
	var url = convertSearchUrl($query);
	document.location.href = '/vancls' + url;
	return false;
}
/**
 * 站内店铺搜索component_107
 */
function taobaoProductSearch() {
	$query = [];
	$query.push({
				'k' : 'q',
				'v' : $('#filterSearchKeyWord').val().replace(/-/gi, ' ')
			});// 关键词
	$query.push({
				'k' : 'cid',
				'v' : $('#J_ParamCid').val()
			});// CID分类
	// 属性组合
	var props = {};
	props['k'] = 'props';
	props['v'] = '';
	$('#J_SelectedArea dd').each(function() {
				var p = $(this).attr('data-value');
				if (p) {
					props['v'] += p + ';';
				}
			});
	$query.push(props);
	// 卖家
	$query.push({
				'k' : 'nicks',
				'v' : ''
			});
	// 是否商城
	var mall = {};
	mall['k'] = 'is_mall';
	mall['v'] = '';
	$query.push(mall);
	// 新旧
	$query.push({
				'k' : 'stuff_status',
				'v' : ''
			});
	// 是否包邮
	$query.push({
				'k' : 'post_free',
				'v' : ''
			});
	// 是否货到付款
	$query.push({
				'k' : 'is_cod',
				'v' : ''
			});
	// 7天退换
	$query.push({
				'k' : 'promoted_service',
				'v' : ''
			});
	// 正品保障
	$query.push({
				'k' : 'genuine_security',
				'v' : ''
			});
	// 消费者保障（如实描述[先行赔付]）
	$query.push({
				'k' : 'is_prepay',
				'v' : ''
			});

	// 会员打折（暂不启用）
	$query.push({
				'k' : 'has_discount',
				'v' : ''
			});
	// 淘一站
	$query.push({
				'k' : 'one_station',
				'v' : ''
			});
	// 旺旺状态
	$query.push({
				'k' : 'ww_status',
				'v' : ''
			});
	// 省份
	var locSelected = $('#sel-loc .selected a');
	$query.push({
				'k' : 'state',
				'v' : ''
			});
	// 城市
	$query.push({
				'k' : 'city',
				'v' : ''
			});
	// 价格
	$query.push({
				'k' : 'start_price',
				'v' : $('#J_StartPrice').val()
			});
	// 价格
	$query.push({
				'k' : 'end_price',
				'v' : $('#J_EndPrice').val()
			});
	$query.push({
				'k' : 'extra_1',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_2',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_3',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_4',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_5',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_6',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_7',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_8',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_9',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_10',
				'v' : ''
			});
	// 排序
	var orderby = $('#J_FilterOrderBy a.crt');
	$query.push({
				'k' : 'order_by',
				'v' : ((orderby.length == 1 && orderby.attr('data-value'))
						? orderby.attr('data-value')
						: '')
			});
	$query.push({
				'k' : 'style',
				'v' : ''
			});
	$query.push({
				'k' : 'page_no',
				'v' : ''
			});
	// 显示数量
	$query.push({
				'k' : 'show_num',
				'v' : ''
			});
	// 显示大小
	$query.push({
				'k' : 'show_size',
				'v' : ''
			});
	var url = convertSearchUrl($query);
	document.location.href = '/products' + url;
	return false;
}
/**
 * 淘宝商品搜索Component_97
 */
function taobaoItemSearch() {
	$query = [];
	$query.push({
				'k' : 'q',
				'v' : $('#filterSearchKeyWord').val().replace(/-/gi, ' ')
			});// 关键词
	$query.push({
				'k' : 'cid',
				'v' : $('#J_ParamCid').val()
			});// CID分类
	// 属性组合
	var props = {};
	props['k'] = 'props';
	props['v'] = '';
	$('#J_SelectedArea dd').each(function() {
				var p = $(this).attr('data-value');
				if (p) {
					props['v'] += p + ';';
				}
			});
	$query.push(props);
	// 卖家
	$query.push({
		'k' : 'nicks',
		'v' : $('#filterSearchNicks').val()
			// $('#J_ParamNicks').val().replace(/-/gi, ' ')
		});
	// 是否商城
	var mall = {};
	mall['k'] = 'is_mall';
	mall['v'] = '';
	var tab = $('#J_FilterTabBar li.selected');
	if (tab.length == 1 && 'mall' == tab.attr('data-value')) {
		mall['v'] = '1';
	}
	$query.push(mall);
	// 新旧
	$query.push({
				'k' : 'stuff_status',
				'v' : $('#J_StuffStatus .select-item').attr('data-value')
			});
	// 是否包邮
	$query.push({
				'k' : 'post_free',
				'v' : $('#J_PostFree').attr('checked') ? '1' : ''
			});
	// 是否货到付款
	$query.push({
				'k' : 'is_cod',
				'v' : $('#filterServiceCOD').attr('checked') ? '1' : ''
			});
	// 7天退换
	$query.push({
				'k' : 'promoted_service',
				'v' : $('#J_PromotedService4').attr('checked') ? '4' : ''
			});
	// 正品保障
	$query.push({
				'k' : 'genuine_security',
				'v' : $('#filterProtectionQuality').attr('checked') ? '1' : ''
			});
	// 消费者保障（如实描述[先行赔付]）
	$query.push({
				'k' : 'is_prepay',
				'v' : $('#filterProtectionTruth').attr('checked') ? '1' : ''
			});

	// 会员打折（暂不启用）
	$query.push({
				'k' : 'has_discount',
				'v' : ''
			});
	// 淘一站
	$query.push({
				'k' : 'one_station',
				'v' : $('#filterServiceTao1Site').attr('checked') ? '1' : ''
			});
	// 旺旺状态
	$query.push({
				'k' : 'ww_status',
				'v' : $('#filterServiceWWOnline').attr('checked') ? '1' : ''
			});
	// 省份
	var locSelected = $('#sel-loc .selected a');
	$query.push({
				'k' : 'state',
				'v' : locSelected.attr('data-state')
			});
	// 城市
	$query.push({
				'k' : 'city',
				'v' : locSelected.attr('data-city')
			});
	// 价格
	$query.push({
				'k' : 'start_price',
				'v' : $('#J_StartPrice').val()
			});
	// 价格
	$query.push({
				'k' : 'end_price',
				'v' : $('#J_EndPrice').val()
			});
	$query.push({
				'k' : 'extra_1',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_2',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_3',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_4',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_5',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_6',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_7',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_8',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_9',
				'v' : ''
			});
	$query.push({
				'k' : 'extra_10',
				'v' : ''
			});
	// 排序
	var orderby = $('#J_FilterOrderBy a.crt');
	$query.push({
				'k' : 'order_by',
				'v' : ((orderby.length == 1 && orderby.attr('data-value'))
						? orderby.attr('data-value')
						: '')
			});
	$query.push({
				'k' : 'style',
				'v' : ''
			});
	$query.push({
				'k' : 'page_no',
				'v' : ''
			});
	// 显示数量
	$query.push({
				'k' : 'show_num',
				'v' : 20
			});
	// 显示大小
	$query.push({
				'k' : 'show_size',
				'v' : $('#J_ParamShowSize').val()
			});
	var url = convertSearchUrl($query);
	document.location.href = '/items' + url;
	return false;
}

function convertSearchUrl($query) {
	var $v = [];
	if ($query.length > 0) {
		for (var i = 0; i < $query.length; i++) {
			$v.push(encodeURIComponent($query[i]['v']));
		}
	}
	return '/search-' + $v.join('-');
}
