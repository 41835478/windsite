<?php


/**
 * 查找单个店铺类目
 */
function shopCat($cid) {
	$cats = shopCats();
	foreach ($cats as $cat) {
		if ($cat['cid'] == $cid) {
			return $cat;
		}
	}
	return array ();
}
/**
 * 店铺分类
 */
function shopCats() {
	return F('top.shopcatsListGet', -999, '店铺分类', true);
}
/**
 * 更新商品分类信息
 */
function updateCat() {
	$db = APP :: ADP('db');
	///店铺分类更新(直接查找没有名称的cid，然后根据cid更新)
	$rs = $db->query('SELECT distinct(cid) FROM ' . $db->getPrefix() . T_XT_USER_SHOP . ' WHERE `cid`>0 AND catName is null');
	if (!empty ($rs)) {
		foreach ($rs as $row) {
			$cat = shopCat($row['cid']);
			if (!empty ($cat)) {
				$db->execute('UPDATE ' . $db->getPrefix() . T_XT_USER_SHOP . ' SET catName=\'' . $db->escape($cat['name']) . '\' WHERE cid=' . $row['cid']);
			}
		}
	}
	///商品分类更新
	//第一步：查找没有CID的商品，并获取
	for ($i = 0; $i < 10; $i++) {
		$sql = 'SELECT nid FROM ' . $db->getPrefix() . T_XT_USER_ITEM . '_' . $i . ' WHERE cid is null OR cid =\'\' OR cid=0';
		$rs = $db->query($sql);
		if (!empty ($rs)) {
			$rss = array_chunk($rs, 20);
			if (!empty ($rss)) {
				foreach ($rss as $each) { //每20个一组，获取CID
					$numIids = array ();
					foreach ($each as $nids) {
						$numIids[] = $nids['nid'];
					}
					$ret = F('top.itemsListGet', -999, '商品分类ID', array (
						'fields' => 'num_iid,cid',
						'num_iids' => implode(',', $numIids)
					), true, false);
					$items = array ();
					if (array_key_exists('items', $ret['rst'])) {
						$items = $ret['rst']['items']['item'];
					}
					if (!empty ($items)) {
						foreach ($items as $item) { //更新CID
							$db->execute('UPDATE ' . $db->getPrefix() . T_XT_USER_ITEM . '_' . $i . ' SET cid=' . $item['cid'] . ' WHERE nid=' . $item['num_iid']);
						}
					}
				}
			}
		}
	}
	//第二步：更新CATNAME
	for ($i = 0; $i < 10; $i++) {
		$sql = 'SELECT distinct(cid) FROM ' . $db->getPrefix() . T_XT_USER_ITEM . '_' . $i . ' WHERE cid>0 AND catName is null';
		$rs = $db->query($sql);
		if (!empty ($rs)) {
			foreach ($rs as $row) {
				$cat = array ();
				$cats = F('top.itemcatsGet', 108, '分类详情', $row['cid'], true);
				if ($cats) {
					$cat = $cats[0];
				}
				if (!empty ($cat)) {
					$db->execute('UPDATE ' . $db->getPrefix() . T_XT_USER_ITEM . '_' . $i . ' SET catName=\'' . $db->escape($cat['name']) . '\' WHERE cid=' . $row['cid']);
				}
			}
		}
	}
	updateTaokeCat();
	updateWowTaokeCat();
}

function updateTaokeCat() {
	$db = APP :: ADP('db');
	//第三步：查找没有CID的淘客商品，并获取
	for ($i = 0; $i < 10; $i++) {
		$sql = 'SELECT distinct(nid) FROM ' . $db->getPrefix() . T_XT_TAOKE_ITEM . '_' . $i . ' WHERE cid is null OR cid =\'\' OR cid=0';
		$rs = $db->query($sql);
		if (!empty ($rs)) {
			$rss = array_chunk($rs, 20);
			if (!empty ($rss)) {
				foreach ($rss as $each) { //每20个一组，获取CID
					$numIids = array ();
					foreach ($each as $nids) {
						$numIids[] = $nids['nid'];
					}
					$ret = F('top.itemsListGet', -999, '商品分类ID', array (
						'fields' => 'num_iid,cid',
						'num_iids' => implode(',', $numIids)
					), true, false);
					$items = array ();
					if (array_key_exists('items', $ret['rst'])) {
						$items = $ret['rst']['items']['item'];
					}
					if (!empty ($items)) {
						foreach ($items as $item) { //更新CID
							$db->execute('UPDATE ' . $db->getPrefix() . T_XT_TAOKE_ITEM . '_' . $i . ' SET cid=' . $item['cid'] . ' WHERE nid=' . $item['num_iid']);
						}
					}
				}
			}
		}
	}
	//第四步：更新淘客CATNAME
	for ($i = 0; $i < 10; $i++) {
		$sql = 'SELECT distinct(cid) FROM ' . $db->getPrefix() . T_XT_TAOKE_ITEM . '_' . $i . ' WHERE cid>0 AND catName is null';
		$rs = $db->query($sql);
		if (!empty ($rs)) {
			foreach ($rs as $row) {
				$cat = array ();
				$cats = F('top.itemcatsGet', 108, '分类详情', $row['cid'], true);
				if ($cats) {
					$cat = $cats[0];
				}
				if (!empty ($cat)) {
					$db->execute('UPDATE ' . $db->getPrefix() . T_XT_TAOKE_ITEM . '_' . $i . ' SET catName=\'' . $db->escape($cat['name']) . '\' WHERE cid=' . $row['cid']);
				}
			}
		}
	}
}
function updateWowTaokeCat() {
	$db = APP :: ADP('db');
	//第三步：查找没有CID的淘客商品，并获取
	for ($i = 0; $i < 10; $i++) {
		$sql = 'SELECT distinct(nid) FROM ' . $db->getPrefix() . T_XT_WOW_TAOKE_ITEM . '_' . $i . ' WHERE cid is null OR cid =\'\' OR cid=0';
		$rs = $db->query($sql);
		if (!empty ($rs)) {
			$rss = array_chunk($rs, 20);
			if (!empty ($rss)) {
				foreach ($rss as $each) { //每20个一组，获取CID
					$numIids = array ();
					foreach ($each as $nids) {
						$numIids[] = $nids['nid'];
					}
					$ret = F('top.itemsListGet', -999, '商品分类ID', array (
						'fields' => 'num_iid,cid',
						'num_iids' => implode(',', $numIids)
					), true, false);
					$items = array ();
					if (array_key_exists('items', $ret['rst'])) {
						$items = $ret['rst']['items']['item'];
					}
					if (!empty ($items)) {
						foreach ($items as $item) { //更新CID
							$db->execute('UPDATE ' . $db->getPrefix() . T_XT_WOW_TAOKE_ITEM . '_' . $i . ' SET cid=' . $item['cid'] . ' WHERE nid=' . $item['num_iid']);
						}
					}
				}
			}
		}
	}
	//第四步：更新淘客CATNAME
	for ($i = 0; $i < 10; $i++) {
		$sql = 'SELECT distinct(cid) FROM ' . $db->getPrefix() . T_XT_WOW_TAOKE_ITEM . '_' . $i . ' WHERE cid>0 AND catName is null';
		$rs = $db->query($sql);
		if (!empty ($rs)) {
			foreach ($rs as $row) {
				$cat = array ();
				$cats = F('top.itemcatsGet', 108, '分类详情', $row['cid'], true);
				if ($cats) {
					$cat = $cats[0];
				}
				if (!empty ($cat)) {
					$db->execute('UPDATE ' . $db->getPrefix() . T_XT_WOW_TAOKE_ITEM . '_' . $i . ' SET catName=\'' . $db->escape($cat['name']) . '\' WHERE cid=' . $row['cid']);
				}
			}
		}
	}
}