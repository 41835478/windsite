<?php
include_once ('simple_html_dom.php');

function wowTaokeItemCats() {
	$result = array ();
	$cats = DS('xintao/wow.getTaokeItemCat', 0);
	if (!empty ($cats)) {
		foreach ($cats as $cat) {
			if (!empty ($cat['title']) && $cat['isValid'] && $cat['nums'] > 0) {
				$sub = array ();
				$result[$cat['id']] = array (
					'title' => $cat['title'],
					'ico' => ''
				);
			}
		}
	}
	return $result;
}
function wowTaokeItemCatName($cat) {
	$cats = DS('xintao/wow.getTaokeItemCat', 0);
	if (!empty ($cats)) {
		foreach ($cats as $row) {
			if ($cat == $row['id']) {
				return $row['title'];
			}
		}
	}
	return '';
}
function synWowDetails() {
	for ($i = 0; $i < 10; $i++) {
		synWowDetailsByIndex($i);
	}
}
function synWowDetailsByIndex($i) {
	_synWowDetailsByIndex($i);
}
/**
 * 淘客
 */
function _synWowDetailsByIndex($i) {
	$db = APP :: ADP('db');
	$sql = 'SELECT distinct(nid),nick FROM ' . $db->getPrefix() . T_XT_WOW_TAOKE_ITEM . '_' . $i . ' WHERE isSyn=0 AND volume>0';
	$row = $db->getRow($sql);
	if (!empty ($row)) {
		$weibo = array ();
		try {
			$weibo = synWowDetail($row['nid'], $row['nick']);
		} catch (Exception $e) {
		}
		if (!empty ($weibo) && isset ($weibo['weibo']) && !empty ($weibo['weibo'])) {
			$weibo['weibo'] = F('cut_string', $weibo['weibo'], 70);
			$db->execute('UPDATE ' . $db->getPrefix() . T_XT_WOW_TAOKE_ITEM . '_' . $i . ' SET archive_logo=\'' . $db->escape($weibo['archiveLogo']) . '\',archive=\'' . $db->escape($weibo['archive']) . '\',weibo=\'' . $db->escape($weibo['weibo']) . '\',share_nums=' . $db->escape($weibo['share_nums']) . ',isSyn=1 WHERE nid=' . $row['nid']);
		} else {
			$db->execute('UPDATE ' . $db->getPrefix() . T_XT_WOW_TAOKE_ITEM . '_' . $i . ' SET isSyn=1 WHERE nid=' . $row['nid']);
		}
		_synWowDetailsByIndex($i);
	}
}
/**
 * 卖家
 */
function synWowUserItemDetails() {
	for ($i = 0; $i < 10; $i++) {
		synWowUserItemDetailsByIndex($i);
	}
}
function synWowUserItemDetailsByIndex($i) {
	_synWowUserItemDetailsByIndex($i);
}
/**
 * 淘客
 */
function _synWowUserItemDetailsByIndex($i) {
	$db = APP :: ADP('db');
	$sql = 'SELECT nid,nick FROM ' . $db->getPrefix() . T_XT_WOW_USER_ITEM . '_' . $i . ' WHERE isSyn=0 AND volume>0';
	$row = $db->getRow($sql);
	if (!empty ($row)) {
		$weibo = array ();
		try {
			$weibo = synWowDetail($row['nid'], $row['nick']);
		} catch (Exception $e) {
		}
		if (!empty ($weibo) && isset ($weibo['weibo']) && !empty ($weibo['weibo'])) {
			$weibo['weibo'] = F('cut_string', $weibo['weibo'], 70);
			$db->execute('UPDATE ' . $db->getPrefix() . T_XT_WOW_USER_ITEM . '_' . $i . ' SET archive_logo=\'' . $db->escape($weibo['archiveLogo']) . '\',archive=\'' . $db->escape($weibo['archive']) . '\',weibo=\'' . $db->escape($weibo['weibo']) . '\',share_nums=' . $db->escape($weibo['share_nums']) . ',isSyn=1 WHERE nid=' . $row['nid']);
		} else {
			$db->execute('UPDATE ' . $db->getPrefix() . T_XT_WOW_USER_ITEM . '_' . $i . ' SET isSyn=1 WHERE nid=' . $row['nid']);
		}
		_synWowUserItemDetailsByIndex($i);
	}
}
function synWowDetail($nid, $seller) {
//	try {
//		$ret = F('top.traderatesSearch', -999, '商品分享评价', array (
//			'num_iid' => $nid,
//			'seller_nick' => $seller,
//			'page_no' => 1,
//			'page_size' => 20
//		), false);
//		$rst = $ret['rst'];
//		if (!empty ($rst) && isset ($rst['total_results']) && $rst['total_results'] > 0) {
//			$rates = $rst['trade_rates']['trade_rate'];
//			foreach ($rates as $rate) {
//				if (trim($rate['result']) == 'good') {
//					return array (
//						'nid' => $nid,
//						'archiveLogo' => '',
//						'archive' => $rate['nick'],
//						'weibo' => $rate['content'],
//						'share_nums' => $rst['total_results']
//					);
//				}
//			}
//		}
//	} catch (Exception $e) {
//	}
	return array ();
}
function _synWowDetail($nid) {
	try {
		$html = file_get_html('http://wow.taobao.com/view/item_share.htm?item_id=' . $nid);
		$ret = $html->find('div#J_detailShare', 0);
		if (!empty ($ret)) {
			$share_nums = $ret->find('h2 strong', 0);
			if ($share_nums) {
				$nums = intval($share_nums->plaintext);
				echo $nums;
				if ($nums > 0) {
					$li = $ret->find('ul.fx-items li', 0);
					$archiveLogo = $li->find('div.wow-avatar img', 0)->src;
					$archive = mb_convert_encoding($li->find('p.author-nick a', 0)->plaintext, 'UTF-8', 'HTML-ENTITIES');
					$weibo = trim(mb_convert_encoding($li->find('p.summary', 0)->plaintext, 'UTF-8', 'GBK'));
					return array (
						'nid' => $nid,
						'archiveLogo' => $archiveLogo,
						'archive' => $archive,
						'weibo' => $weibo,
						'share_nums' => $nums
					);
				}
			}
		}
		$html->clear();
	} catch (Exception $e) {
	}
	return array ();
}
function synWow($cat1) {
	$cats = V('-:wow');
	if ($cats[$cat1]) {
		$subs = $cats[$cat1]['sub'];
		foreach ($subs as $key => $value) {
			for ($i = 5; $i > 0; $i--) {
				$html = file_get_html('http://wow.taobao.com/front/index.htm?square_id=' . $cat1 . '&cat_id=' . $key . '&page=' . $i);
				$ret = $html->find('div#J_containerWrap', 0)->find('div.result-item');
				if (!empty ($ret)) {
					foreach ($ret as $item) {
						$a = $item->find('div.pic-brief a', 0);
						if ($a) {
							$hrefs = split('id=', $a->href);
							$archiveLogo = $item->find('div.fxer-archive img', 0);
							$archive = $item->find('div.fxer-archive dl a', 0);
							$weibo = $item->find('p.fx-txts a', 0);
							//$fav_nums = $item->find('span.J_Counter', 0);
							$share_nums = $item->find('div.pic-brief .fxer-count', 0);
							//$shows = $item->find('a.show-pic');
							if (!$archive || !$archiveLogo || !$weibo || !$share_nums) {
								continue;
							}
							$wow = array ();
							if (is_numeric(trim($hrefs[1]))) {
								$wow['pic_url'] = str_replace('_210x1000.jpg', '', $a->find('img', 0)->src);
								$wow['archive_logo'] = $archiveLogo->src;
								$wow['archive'] = mb_convert_encoding($archive->plaintext, 'UTF-8', 'HTML-ENTITIES');
								$wow['weibo'] = mb_convert_encoding($weibo->plaintext, 'UTF-8', 'HTML-ENTITIES');
								//$wow['fav_nums'] = $fav_nums->plaintext;
								$wow['share_nums'] = $share_nums->plaintext;
								$wow['cat'] = $key;
								_synWow($cat1, trim($hrefs[1]), $wow);
							}
						}
					}
				} else {
					continue;
				}
				$html->clear();
			}
		}
	}

}
function _synWow($cat, $id, $wow) {
	if (!empty ($wow)) {
		$count = DS('xintao/wow.getByIdCount', '', $cat, $id);
		if ($count == 0) {
			$wow['nid'] = $id;
			$wow['addtime'] = time();
			DS('xintao/wow.save', '', $cat, $wow);
		}
		elseif ($count == 1) {
			DS('xintao/wow.save', '', $cat, $wow, $id);

		}
	}
}
/**
 * 同步商品营销(每天最多同步40个)
 */
function synWowTaokeItem() {
	$tables = array (
		T_XT_WOW_LADY,
		T_XT_WOW_MAN,
		T_XT_WOW_LIFE,
		T_XT_WOW_IDEA
	);
	$db = APP :: ADP('db');
	foreach ($tables as $table) {
		$db->execute('UPDATE ' . $db->getTable($table) . ' SET nick=null');
		_getWowTaokeItem($table, 1);
	}

}
function _getWowTaokeItem($table, $page) {
	$db = APP :: ADP('db');
	$items = $db->query('SELECT `nid` FROM ' . $db->getTable($table) . ' WHERE nick is null LIMIT 40');
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
				$set = ' `title`=\'' . $db->escape($item['title']) . '\',`price`=\'' . $db->escape($item['price']) . '\',`commission`=\'' . $db->escape($item['commission']) . '\',`commission_rate`=\'' . $db->escape($item['commission_rate']) . '\',`nick`=\'' . $db->escape($item['nick']) . '\' ';
				$db->checksql_set(array (
					'sub_select_allow' => true,
					'union_select_allow' => true
				));
				$db->execute('UPDATE ' . $db->getTable($table) . ' SET ' . $set . ' WHERE `nid`=' . $item['num_iid']);
				$taokeIdArray[] = $item['num_iid'];
			}
			//删除所有非淘宝客商品
		}
		$diff = array_diff($idArray, $taokeIdArray);
		if (!empty ($diff)) {
			$db->execute('DELETE FROM ' . $db->getTable($table) . ' WHERE nid in (' . implode(',', $diff) . ')');
		}
		_getWowTaokeItem($table, $page +1);
	}

}