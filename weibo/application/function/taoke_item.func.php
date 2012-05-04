<?php

function synWowTaokeItem(){
	$db = APP :: ADP('db');
	for ($i = 0; $i < 10; $i++) {
		$sql = 'UPDATE ' . $db->getPrefix() . (T_XT_WOW_TAOKE_ITEM) . '_' . $i . ' SET `isValid`=2'; //第一步：全部设置为无效
		$db->execute($sql);
		_synWowTaokeItem($i);
	}
}
function _synWowTaokeItem($index){
	$db = APP :: ADP('db');
	$items = $db->query('SELECT DISTINCT(`nid`) FROM ' . $db->getPrefix() . (T_XT_WOW_TAOKE_ITEM) . '_' . $index . ' WHERE isValid=2 LIMIT 40');
	if (!empty ($items)) {
		$numIids = '';
		$idArray = array ();
		foreach ($items as $row) {
			$numIids .= $row['nid'] . ',';
			$idArray[] = $row['nid'];
		}
		$taokeIdArray = array ();
		$taobaokeItems = F('top.taobaokeItemsConvert', 97, '商品搜索', $numIids, '', true, false);
		if (!empty ($taobaokeItems)) { //卖家服务，根据淘客商品同步
			foreach ($taobaokeItems as $item) {
				$set = ' title="' . $db->escape($item['title']) . '",price="' . $db->escape($item['price']) . '",pic_url="' . $db->escape($item['pic_url']) . '",commission="' . $db->escape($item['commission']) . '",volume="' . $item['volume'] . '",isValid=1 ';
				$db->execute('UPDATE ' . $db->getPrefix() . (T_XT_WOW_TAOKE_ITEM) . '_' . $index . ' SET ' . $set . ' WHERE nid=' . $item['num_iid']);
				$taokeIdArray[] = $item['num_iid'];
			}
		}
		$diff = array_diff($idArray, $taokeIdArray);
		if (!empty ($diff)) {
			$db->execute('UPDATE ' . $db->getPrefix() . (T_XT_WOW_TAOKE_ITEM) . '_' . $index . ' SET isValid=0 WHERE nid in (' . implode(',', $diff) . ')');
		}
		_synWowTaokeItem($index);
	}
}
/**
 * 同步商品营销(每天最多同步40个)
 */
function synTaokeItem() {
	$db = APP :: ADP('db');
	for ($i = 0; $i < 10; $i++) {
		$sql = 'UPDATE ' . $db->getPrefix() . (T_XT_TAOKE_ITEM) . '_' . $i . ' SET `isValid`=2 , `today_nums`=0'; //第一步：全部设置为无效
		$db->execute($sql);
		_getTaokeItem($i, 1);
	}

}
function _getTaokeItem($index) {
	$db = APP :: ADP('db');
	$items = $db->query('SELECT DISTINCT(`nid`) FROM ' . $db->getPrefix() . (T_XT_TAOKE_ITEM) . '_' . $index . ' WHERE isValid=2 LIMIT 40');
	if (!empty ($items)) {
		$numIids = '';
		$idArray = array ();
		foreach ($items as $row) {
			$numIids .= $row['nid'] . ',';
			$idArray[] = $row['nid'];
		}
		$taokeIdArray = array ();
		$taobaokeItems = F('top.taobaokeItemsConvert', 97, '商品搜索', $numIids, '', true, false);
		if (!empty ($taobaokeItems)) { //卖家服务，根据淘客商品同步
			foreach ($taobaokeItems as $item) {
				$set = ' title="' . $db->escape($item['title']) . '",price="' . $db->escape($item['price']) . '",pic_url="' . $db->escape($item['pic_url']) . '",commission="' . $db->escape($item['commission']) . '",commission_num="' . $db->escape($item['commission_num']) . '",volume="' . $item['volume'] . '",isValid=1 ';
				$db->execute('UPDATE ' . $db->getPrefix() . (T_XT_TAOKE_ITEM) . '_' . $index . ' SET ' . $set . ' WHERE nid=' . $item['num_iid']);
				$taokeIdArray[] = $item['num_iid'];
			}
		}
		$diff = array_diff($idArray, $taokeIdArray);
		if (!empty ($diff)) {
			$db->execute('UPDATE ' . $db->getPrefix() . (T_XT_TAOKE_ITEM) . '_' . $index . ' SET isValid=0 WHERE nid in (' . implode(',', $diff) . ')');
		}
		_getTaokeItem($index);
	}
}