<?php
function get_xintaotv_last_shops($isForce = false) {
	$shops = array ();
	if (!$isForce) {
		$shops = CACHE :: get(TB_CACHE_TV_KEY_PRE . 'LastShops');
	}
	if (empty ($shops)) {
		$m = APP :: N('mongo_db');
		$result = $m->db->user->find(array (
			"sid" => array (
				'$gt' => 0
			),
			"item_score" => array (
				'$gt' => "0.0"
			)
		))->sort(array (
			"lastVisit" => -1
		))->limit(10);
		foreach ($result as $shop) {
			if ('u[' . $shop['_id'] . ']' == $shop['title']) //如果标题是用户ID，说明店铺已不存在
				continue;
			$shops[$shop['sid'] + ""] = $shop;
		}
		if (!empty ($shops)) {
			CACHE :: set(TB_CACHE_TV_KEY_PRE . 'LastShops', $shops);
		}
	}
	return $shops;
}

function add_xintaotv_last_shops($shop) {
	$shops = get_xintaotv_last_shops();
	if (isset ($shops[$shop['sid'] + ""]) && $shops[$shop['sid'] + ""]) {
	} else {
		$shops = array_reverse($shops); //反转
		$shops[$shop['sid'] + ""] = $shop; //追加
		$shops = array_reverse($shops); //再反转
		CACHE :: set(TB_CACHE_TV_KEY_PRE . 'LastShops', array_slice($shops, 0, 10, true));
	}
}