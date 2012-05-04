<?php
function autoCronWeibo($weibo, $isSave = true) {
	if (empty ($weibo) || empty ($weibo['weibo'])) {
		return ('微博内容为空');
	}
	echo 'SOHU::';
	//搜狐平台
	try {
		if (WB_SOHU_UID != '' && WB_SOHU_USER_OAUTH_TOKEN != '' && WB_SOHU_USER_OAUTH_TOKEN_SECRET != '') {
			updateWeibo('sh', $weibo, $isSave);
		}
	} catch (Exception $e) {

	}
	echo '163::';
	//网易平台
	try {
		if (WB_WY_UID != '' && WB_WY_USER_OAUTH_TOKEN != '' && WB_WY_USER_OAUTH_TOKEN_SECRET != '') {
			updateWeibo('wy', $weibo, $isSave);
		}
	} catch (Exception $e) {

	}
}
function updateWeibo($type, $weibo, $isSave = true) {
	$id = 0;
	$text = '';
	if (isset ($weibo['sina']) && !empty ($weibo['sina']) && isset ($weibo[$type]) && !empty ($weibo[$type])) { //替换指定平台微博昵称
		$text = str_replace($weibo['sina'], $weibo[$type], $weibo['weibo']);
	} else {
		$text = $weibo['weibo'];
	}
	if (!empty ($weibo['pic'])) { //带图
		$id = F($type . '.' . $type . '_add_pic', $text, $weibo['pic']);
	} else { //不带图
		$id = F($type . '.' . $type . '_add', $text);
	}
	echo $type . ':' . $id . '||';
	if ($isSave && $id != 0) { //保存该条微博的发布情况
		$db = APP :: ADP('db');
		switch ($weibo['type']) {
			case 'SHOP' : //店铺推广（记录）
				updateShopWeibo($type, $db, $id, $weibo);
				break;
			case 'ITEM' : //商品推广（记录）
				updateItemWeibo($type, $db, $id, $weibo);
				break;
			case 'TAOKE_ITEM' : //淘宝客自主商品推广（记录）
				updateTaokeItemWeibo($type, $db, $id, $weibo);
				break;
		}
	}
}
//根据该店铺所属会员，设置该会员的该条店铺营销微博的指定平台标识以及更新该平台营销次数
function updateShopWeibo($type, $db, $id, $weibo) {
	$db->save(array (
		$type . '_id' => $id
	), $weibo['id'], T_XT_USER_SHOP_WEIBO);
	//更新搜狐店铺营销数量
	$sql = 'UPDATE ' . $db->getTable(T_XT_USER_SHOP) . ' SET `' . $type . '_nums`=`' . $type . '_nums`+1 WHERE `sid`=' . $db->escape($weibo['sid']);
	$db->execute($sql);
}
//根据该商品所属会员，设置该会员的该条商品营销微博的指定平台标识以及更新该平台营销次数
function updateItemWeibo($type, $db, $id, $weibo) {
	if ($weibo['userid'] > 0) {
		$NUM = (substr($weibo['userid'], strlen($weibo['userid']) - 1));
		$sql = 'UPDATE ' . $db->getPrefix() . T_XT_USER_ITEM_WEIBO . '_' . $NUM . ' SET `' . $type . '_id`=\'' . $id . '\' ,`nums`=`nums`+1 WHERE `id`=' . $weibo['id'];
		$db->execute($sql);
		$sql = 'UPDATE ' . $db->getPrefix() . T_XT_USER_ITEM . '_' . $NUM . ' SET `' . $type . '_nums`=`' . $type . '_nums`+1 WHERE `nid`=' . $db->escape($weibo['nid']);
		$db->execute($sql);
	}
}
//根据该淘客商品所属淘客，设置该淘客的该条淘客商品营销微博的指定平台标识
function updateTaokeItemWeibo($type, $db, $id, $weibo) {
	$sql = 'UPDATE ' . $db->getTable(T_XT_TAOKE_ITEM_WEIBO) . ' SET `' . $type . '_id`=\'' . $id . '\' WHERE `id`=' . $weibo['id'];
	$db->execute($sql);
}