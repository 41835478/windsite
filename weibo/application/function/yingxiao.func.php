<?php
function resetYingxiaoTop10() {
	$shops = DS('xintao/xintao.getShopYingxiaoTop10');
	CACHE :: set(TB_CACHE_KEY_PRE . 'shopYingxiaoTop10', $shops, CACHE_24X3);
	$shops = DS('xintao/xintao.getItemYingxiaoTop10');
	CACHE :: set(TB_CACHE_KEY_PRE . 'itemYingxiaoTop10', $shops, CACHE_24X3);
	$shops = DS('xintao/xintao.getWeiboYingxiaoTop10');
	CACHE :: set(TB_CACHE_KEY_PRE . 'weiboYingxiaoTop10', $shops, CACHE_24X3);
	$count = DS('xintao/xintao.getWeiboYingxiao');
	CACHE :: set(TB_CACHE_KEY_PRE . 'getWeiboYingxiao', $count, CACHE_24X3);
	$account = DS('xintao/xintao.getWeiboAccount');
	CACHE :: set(TB_CACHE_KEY_PRE . 'getWeiboAccount', $account, CACHE_24X3);
}
function getWeiboAccount() {
	$count = CACHE :: get(TB_CACHE_KEY_PRE . 'getWeiboAccount');
	if (!$count || empty ($count) || $count == null) {
		$count = DS('xintao/xintao.getWeiboAccount');
		CACHE :: set(TB_CACHE_KEY_PRE . 'getWeiboAccount', $count, CACHE_24X3);
	}
	return $count;
}
/**
 * 所有微博数量
 */
function getWeiboYingxiao() {
	$count = CACHE :: get(TB_CACHE_KEY_PRE . 'getWeiboYingxiao');
	if (!$count || empty ($count) || $count == null) {
		$count = DS('xintao/xintao.getWeiboYingxiao');
		CACHE :: set(TB_CACHE_KEY_PRE . 'getWeiboYingxiao', $count, CACHE_24X3);
	}
	return $count * 4;
}
/**
 * 我的营销
 */
function getMyYingxiao() {
	$result = array ();
	$shops = 0;
	$items = 0;
	$weibos = 0;
	$nums = 0;
	if (XT_SID != '' || XT_SIDS != '') {
		$nums = getMyShopYingxiao();
		if ($nums > 0) {
			$shops = $nums;
		}
		$nums = getMyItemYingxiao();
		if ($nums > 0) {
			$items = $nums;
		}
	}
	$nums = getMyWeiboYingxiao();
	if ($nums > 0) {
		$weibos = $nums;
	}
	return array (
		'shop' => $shops,
		'item' => $items,
		'weibo' => $weibos
	);
}
/**
 * 我的店铺营销数
 */
function getMyShopYingxiao() {
	return DS('xintao/xintao.getMyShopYingxiao', 'g0/' . CACHE_1);
}
/**
 * 我的商品营销数
 */
function getMyItemYingxiao() {
	return DS('xintao/xintao.getMyItemYingxiao', 'g0/' . CACHE_1);
}
/**
 * 我的微博营销数
 */
function getMyWeiboYingxiao() {
	return DS('xintao/xintao.getMyWeiboYingxiao', 'g0/' . CACHE_1);
}
/**
 * 获得店铺营销排行榜（前10）
 */
function getShopYingxiaoTop10() {
	$shops = CACHE :: get(TB_CACHE_KEY_PRE . 'shopYingxiaoTop10');
	if (!$shops || empty ($shops) || $shops == null) {
		$shops = DS('xintao/xintao.getShopYingxiaoTop10');
		CACHE :: set(TB_CACHE_KEY_PRE . 'shopYingxiaoTop10', $shops, CACHE_24X3);
	}
	return $shops;
}
/**
 * 获得商品营销排行榜（前10）
 */
function getItemYingxiaoTop10() {
	$shops = CACHE :: get(TB_CACHE_KEY_PRE . 'itemYingxiaoTop10');
	if (!$shops || empty ($shops) || $shops == null) {
		$shops = DS('xintao/xintao.getItemYingxiaoTop10');
		CACHE :: set(TB_CACHE_KEY_PRE . 'itemYingxiaoTop10', $shops, CACHE_24X3);
	}
	return $shops;
}

/**
 * 获得微博营销排行榜（前10）
 */
function getWeiboYingxiaoTop10() {
	$shops = CACHE :: get(TB_CACHE_KEY_PRE . 'weiboYingxiaoTop10');
	if (!$shops || empty ($shops) || $shops == null) {
		$shops = DS('xintao/xintao.getWeiboYingxiaoTop10');
		CACHE :: set(TB_CACHE_KEY_PRE . 'weiboYingxiaoTop10', $shops, CACHE_24X3);
	}
	return $shops;
}