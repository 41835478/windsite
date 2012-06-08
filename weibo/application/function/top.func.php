<?php


/**
 * 每日更新画报
 */
function posterUpdate($channelId, $page_no = 1) {
	$posters = posterPostersSearch(-999, '画报更新', F('taobao.poster_default_search', array (
		'channel_ids' => $channelId + '',
		'page_no' => $page_no
	)), true, false);
	$isContinue = true;
	if (!empty ($posters)) {
		foreach ($posters as $poster) {
			$v = DS('xintao/poster.getById', '', $poster['id']);
			if (!empty ($v)) {
				$isContinue = false;
				continue;
			}
			DS('xintao/poster.save', '', array (
				'id' => $poster['id'],
				'title' => isset ($poster['title']) ? $poster['title'] : null,
				'tag' => isset ($poster['tag']) ? $poster['tag'] : null,
				'cover_pic_url' => isset ($poster['cover_pic_url']) ? $poster['cover_pic_url'] : null,
				'channel_id' => $channelId,
				'nums' => 0
			));
		}
		if ($isContinue && $page_no < 150) { //递归更新
			posterUpdate($channelId, $page_no +1);
		}
	}
}
/**
 * 关注掌柜说
 */
function jianghuFanFollow($id = -999, $title = '未知模块', $params, $isAjax = false) {
	$ret = TB('top/TopClient.jianghuFanFollow', '', $params);
	//错误处理
	if (!$isAjax) {
		if (API_ERROR($ret, 'jianghuFanFollow', true, $id, $title)) {
			return array ();
		}
		return $ret['rst']['follow_result'];
	} else {
		return $ret;
	}
}
/**
 * 获取主动通知
 */
function incrementCustomersGet($id = -999, $title = '未知模块', $params, $isAjax = false) {
	$ret = TB('top/TopClient.incrementCustomersGet', '', $params);
	//错误处理
	if (!$isAjax) {
		if (API_ERROR($ret, 'incrementCustomersGet', true, $id, $title)) {
			return array ();
		}
		return $ret['rst'];
	} else {
		return $ret;
	}
}
/**
 * 批量获取商品信息
 */
function itemsListGet($id = -999, $title = '未知模块', $params, $isAjax = false, $isCache = true) {
	$isCache = false;
	$ret = TB('top/TopClient.itemsListGet', ($isCache ? ('g0/' . CACHE_24) : ''), $params);
	//错误处理
	if (!$isAjax) {
		if (API_ERROR($ret, 'itemsListGet', true, $id, $title)) {
			return array ();
		}
		if (array_key_exists('items', $ret['rst'])) {
			return $ret['rst']['items']['item'];
		}
		return array ();
	} else {
		return $ret;
	}
}

/**
 * 淘宝客关键词转换
 */
function taobaokelisturlGet($id = -999, $title = '未知模块', $q, $isAjax = false, $isCache = true) {
	$isCache = false;
	$ret = TB('top/TopClient.taobaokelisturlGet', ($isCache ? ('g0/' . CACHE_24) : ''), $q);
	//错误处理
	if (!$isAjax) {
		if (API_ERROR($ret, 'taobaokelisturlGet', true, $id, $title)) {
			return array ();
		}
	}
	if (array_key_exists('taobaoke_item', $ret['rst'])) {
		return $ret['rst']['taobaoke_item']['keyword_click_url'];
	}
	return '';
}
/**
 * 淘宝客店铺转换
 */
function taobaokeShopsConvert($id = -999, $title = '未知模块', $params, $isAjax = false, $isCache = true) {
	$isCache = false;
	$ret = TB('top/TopClient.taobaokeShopsConvert', ($isCache ? ('g0/' . CACHE_24) : ''), $params);
	//错误处理
	if (!$isAjax) {
		if (API_ERROR($ret, 'taobaokeShopsConvert', true, $id, $title)) {
			return array ();
		}
	}

	if (array_key_exists('taobaoke_shops', $ret['rst'])) {
		return $ret['rst']['taobaoke_shops']['taobaoke_shop'];
	}
	return array ();
}
/**
 * 获取商品信息
 */
function taobaokeItemsDetailGet($id = -999, $title = '未知模块', $params, $isCache = true) {
	$isCache = false;
	return TB('top/TopClient.taobaokeItemsDetailGet', ($isCache ? ('g0/' . CACHE_24) : ''), $params);
}
function traderatesSearch($id = -999, $title = '未知模块', $params, $isCache = true) {
	$isCache = false;
	return TB('top/TopClient.traderatesSearch', ($isCache ? ('g0/' . CACHE_24) : ''), $params);
}
/**
 * 获取商品详情信息
 */
function itemDescGet($id = -999, $title = '未知模块', $numIid) {
	$isCache = false;
	return TB('top/TopClient.itemDescGet', 'g0/' . CACHE_24X30, $numIid);
}
/**
 * 获取交易信息
 */
function tradeGet($id = -999, $title = '未知模块', $params) {
	return TB('top/TopClient.tradeGet', '', $params);
}
/**
 * 获取商品信息
 */
function itemGet($id = -999, $title = '未知模块', $params) {
	$isCache = false;
	return TB('top/TopClient.itemGet', 'g0/' . CACHE_24, $params);
}
/**
 * 添加收藏夹
 */
function favoriteAdd($id = -999, $title = '未知模块', $params) {
	$ret = TB('top/TopClient.favoriteAdd', '', $params);
	return $ret;
}
/**
 * 获取店铺信息
 */
function shopGet($id = -999, $title = '未知模块', $params, $isAjax = false, $isCache = true) {
	$isCache = false;
	$ret = TB('top/TopClient.shopGet', $isCache ? ('g0/' . CACHE_24) : '', $params);
	if (!$isAjax) {
		if (API_ERROR($ret, 'shopGet', true, $id, $title)) {
			return "";
		}
		return $ret['rst']['shop'];
	} else {
		if (isset ($ret['rst']['shop'])) {
			return $ret['rst']['shop'];
		}
		return array ();
	}

}
/**
 * 获取用户信息
 */
function userGet($id = -999, $title = '未知模块', $params, $isAjax = false, $isCache = true) {
	$isCache = false;
	$ret = TB('top/TopClient.userGet', $isCache ? ('g0/' . CACHE_24) : '', $params);
	if (!$isAjax) {
		if (API_ERROR($ret, 'userGet', true, $id, $title)) {
			return "";
		}
	}

	return $ret['rst']['user'];
}
/**
 * 淘宝客类目URL转换
 */
function taobaokeCaturlGet($id = -999, $title = '未知模块', $params, $isAjax = false, $isCache = true) {
	$isCache = false;
	$ret = TB('top/TopClient.taobaokeCaturlGet', ($isCache ? ('g0/' . CACHE_24X30) : ''), $params);
	if (!$isAjax) {
		if (API_ERROR($ret, 'taobaokeCaturlGet', true, $id, $title)) {
			return "";
		}
	}

	return $ret['rst']['taobaoke_item']['taobaoke_cat_click_url'];
}

/**
 * 收费项目查询
 */
function vasSubscribeGet($id = -999, $title = '未知模块', $params, $isAjax = false) {
	$ret = DR('top/TopClient.vasSubscribeGet', '', $params); //不缓存
	if ($ret['errno']) {
		return 9999;
	}
	if (!$isAjax) {
		if (API_ERROR($ret, 'vasSubscribeGet', true, $id, $title)) {
			return array ();
		}
	}
	return $ret['rst']['article_user_subscribes']['article_user_subscribe'];

}

/**
 * 无线画报-画报商品详情(使用该API可获得NUM_IID,但无商品坐标)
 */
function huabaoPosterGoodsinfoGet($id = -999, $title = '未知模块', $poster_id) {
	$isCache = false;
	$ret = POSTERS('top/TopClient.huabaoPosterGoodsinfoGet', 'g0/' . CACHE_24X30, $poster_id);
	if (API_ERROR($ret, 'huabaoPosterGoodsinfoGet', true, $id, $title)) {
		return array ();
	}
	return $ret['rst']['goodsinfolist']['poster_goods_info'];
}

/**
 * 淘画报-画报商品详情(暂无用，因为返回数据没有商品的真实NUM_IID) TODO API尚不完善
 */
function posterPosterGoodsinfoGet($id = -999, $title = '未知模块', $poster_id) {
	$isCache = false;
	$ret = POSTERS('top/TopClient.posterPosterGoodsinfoGet', 'g0/' . CACHE_24X30, $poster_id);
	if (API_ERROR($ret, 'posterPosterGoodsinfoGet', true, $id, $title)) {
		return array ();
	}
	return $ret['rst']['posterauctions']['huabao_auction_info'];
}
/**
 * 淘画报-画报详情
 */
function posterPosterdetailGet($id = -999, $title = '未知模块', $poster_id) {
	$isCache = false;
	$ret = POSTERS('top/TopClient.posterPosterdetailGet', 'g0/' . CACHE_24X30, $poster_id);
	if (API_ERROR($ret, 'posterPosterdetailGet', false, $id, $title)) {
		return array ();
	}
	return $ret['rst'];
}
/**
 * 淘画报-画报频道详情
 */
function posterChannelGet($id = -999, $title = '未知模块', $channel_id) {
	$isCache = false;
	$ret = POSTERS('top/TopClient.posterChannelGet', 'g0/' . CACHE_24X30, $channel_id);
	if (API_ERROR($ret, 'posterChannelGet', false, $id, $title)) {
		return array ();
	}
	return $ret['rst']['channel'];
}
/**
 * 淘画报-画报频道
 */
function posterChannelsGet($id = -999, $title = '淘画报频道') {
	$isCache = false;
	$ret = POSTERS('top/TopClient.posterChannelsGet', 'g0/' . CACHE_24X30);
	if (API_ERROR($ret, 'posterChannelsGet', true, $id, $title)) {
		return array ();
	}
	return $ret['rst']['channels']['huabao_channel'];
}
/**
 * 淘画报-搜索画报
 */
function posterPostersSearch($id = -999, $title = '未知模块', $params, $isAjax = false, $isCache = true) {
	$isCache = false;
	$ret = POSTERS('top/TopClient.posterPostersSearch', ($isCache ? ('g0/' . CACHE_24) : ''), $params);
	if ($isAjax) {
		if (API_ERROR($ret, 'posterPostersSearch', true, $id, $title)) {
			return array ();
		}
	}

	if (isset ($ret['rst']['posters'])) {
		if (isset ($ret['rst']['posters']['huabao'])) {
			return $ret['rst']['posters']['huabao'];
		}
	}
	return array ();

}
/**
 * 淘画报-获取指定画报搜索列表（热门，推荐）
 */
function posterSpecialpostersGet($id = -999, $title = '未知模块', $params) {
	$isCache = false;
	$ret = POSTERS('top/TopClient.posterAppointedpostersGet', 'g0/' . CACHE_24, $params);
	if (API_ERROR($ret, 'posterAppointedpostersGet', true, $id, $title)) {
		return array ();
	}
	return $ret['rst']['appointedposters']['huabao'];
}
/**
 * 淘宝客商品搜索
 */
function taobaokeItemsGet($id = -999, $title = '未知模块', $params, $isAjax = false, $isCache = true) {
	$isCache = false;
	$ret = ITEMS('top/TopClient.taobaokeItemsGet', $isCache ? ('g0/' . CACHE_24) : '', $params);
	if (!$isAjax) {
		if (API_ERROR($ret, 'taobaokeItemsGet', true, $id, $title)) {
			return array ();
		}
		return $ret['rst'];
	}
	return $ret;
}
/**
 * 淘宝客店铺搜索
 */
function taobaokeShopsGet($id = -999, $title = '未知模块', $params) {
	$isCache = false;
	$ret = SHOPS('top/TopClient.taobaokeShopsGet', 'g0/' . CACHE_24, $params);
	if (API_ERROR($ret, 'taobaokeShopsGet', true, $id, $title)) {
		return array ();
	}
	return $ret['rst'];
}
/**
 * 淘宝客商品转换
 */
function taobaokeItemsConvert($id = -999, $title = '未知模块', $numIids, $fields = '', $isAjax = false, $isCache = true) {
	$isCache = false;
	$ret = ITEMS('top/TopClient.taobaokeItemsConvert', ($isCache ? ('g0/' . CACHE_24) : ''), array (
		'num_iids' => $numIids,
		'fields' => $fields
	));
	if (!$isAjax) {
		//错误处理
		if (API_ERROR($ret, 'taobaokeItemsConvert', true, $id, $title)) {
			return array ();
		}
	}

	if (array_key_exists('taobaoke_items', $ret['rst'])) {
		return $ret['rst']['taobaoke_items']['taobaoke_item'];
	}
	return array ();
}
/**
 * 商品搜索
 */
function itemsSearch($id = -999, $title = '未知模块', $params, $isAjax = false, $isCache = true) {
	$isCache = false;
	$ret = ITEMS('top/TopClient.itemsSearch', ($isCache ? ('g0/' . CACHE_24) : ''), $params);
	//错误处理
	if (!$isAjax) {
		if (API_ERROR($ret, 'itemsSearch', true, $id, $title)) {
			return array ();
		}
	}
	return $ret['rst'];
}

/**
 * 查询淘宝商品根分类
 */
function getRootCat() {
	//执行店铺搜索
	$ret = TB('top/TopClient.itemcatsGet', 'g0/' . CACHE_24X30, array (
		'cid' => '0'
	));
	if (API_ERROR($ret, 'itemcatsGet')) {
		return array ();
	}
	return $ret['rst']['item_cats']['item_cat'];
}
/**
 * 获取后台供卖家发布商品的标准商品类目
 */
function itempropsGet($id = -999, $title = '未知模块', $cid, $isAjax = false) {
	$ret = TB('top/TopClient.itempropsGet', 'g0/' . CACHE_24X30, array (
		'cid' => $cid
	));
	if (!$isAjax) {
		if (API_ERROR($ret, 'itempropsGet', true, $id, $title)) {
			return array ();
		}
		return $ret['rst']['item_props']['item_prop'];
	} else {
		if (isset ($ret['rst']['item_props']) && isset ($ret['rst']['item_props']['item_prop'])) {
			return $ret['rst']['item_props']['item_prop'];
		} else {
			return array ();
		}
	}
}
//店铺类目
function shopcatsListGet($id = -999, $title = '未知模块', $isAjax = false, $isCache = true) {
	$isCache = false;
	$ret = TB('top/TopClient.shopcatsListGet', ($isCache ? ('g0/' . CACHE_24X30) : ''));
	if (!$isAjax) {
		if (API_ERROR($ret, 'shopcatsListGet', true, $id, $title)) {
			return array ();
		}
	}
	return $ret['rst']['shop_cats']['shop_cat'];
}
function itemcatsGet($id = -999, $title = '未知模块', $cids, $isAjax = false, $isCache = true) {
	$isCache = false;
	$ret = TB('top/TopClient.itemcatsGet', ($isCache ? ('g0/' . CACHE_24X30) : ''), array (
		'cids' => $cids
	));
	if (!$isAjax) {
		if (API_ERROR($ret, 'itemcatsGet', true, $id, $title)) {
			return array ();
		}
	}
	return $ret['rst']['item_cats']['item_cat'];
}
function itemcatsGetByCid($id = -999, $title = '未知模块', $cid, $isAjax = false, $isCache = true) {
	$isCache = false;
	$ret = TB('top/TopClient.itemcatsGet', ($isCache ? ('g0/' . CACHE_24X30) : ''), array (
		'cid' => $cid
	));
	if (!$isAjax) {
		if (API_ERROR($ret, 'itemcatsGet', true, $id, $title)) {
			return array ();
		}
	}
	return $ret['rst']['item_cats']['item_cat'];
}
function API_ERROR($ret, $api = '未知API', $isArray = true, $id = -999, $title = '未知模块') {
	if ($ret['errno']) {
		P_ERROR(L('pls__top__apiError', $api, $ret['err'], $ret['errno']), $id, $title);
		return true;
	}
	elseif (empty ($ret['rst'])) {
		P_ERROR(L('pls__top__rstError', $api), $id, $title);
		return true;
	}
	elseif ($isArray && !is_array($ret['rst'])) {
		P_ERROR(L('pls__top__Error', $api), $id, $title);
		return true;
	}
	return false;
}