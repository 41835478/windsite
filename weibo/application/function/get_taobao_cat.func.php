<?php
function get_taobao_cat_root() {
	//执行分类搜索
	$ret = TB('top/TopClient.itemcatsGet', '', array (
		'cid' => '0'
	));
	$root = $ret['rst']['item_cats']['item_cat'];
	foreach ($root as $cat) {
		$cat['depth'] = 1;
		$cat['path'] = urldecode(json_encode(array (
			'' . $cat['cid'] => urlencode($cat['name'])
		)));
		save_taobao_cat($cat);
	}
}
function get_taobao_cat_item() {
	set_time_limit(12000); //设置总执行时间限制，预期不可超过2分钟。
	$db = APP :: ADP('db');
	$rst = $db->query('select * from xwb_xt_cat where price is null limit 100');
	foreach ($rst as $cat) {
		_get_taobao_cat_item($cat, 1);
		refresh_taobao_cat($cat);
	}
}
function _get_taobao_cat_item($cat, $page = 1) {
	$ret = F('top.taobaokeItemsGet', -999, '商品搜索', array (
		'cid' => $cat['cid'],
		'sort' => 'commissionNum_desc',
		'fields' => 'num_iid,price,commission,commission_rate,commission_num,volume',
		'page_no' => $page
	), true, false);
	$rst = $ret['rst'];
	if ($rst) {
		$total_results = $rst['total_results'];
		$taobaoke_items = $rst['taobaoke_items']['taobaoke_item'];
		$db = APP :: ADP('db');
		foreach ($taobaoke_items as $item) {
			$sql = 'INSERT IGNORE INTO xwb_xt_cat_item(`nid`,`price`,`commission`,`commission_rate`,`commission_num`,`volume`,`cid`) VALUES(' . $item['num_iid'] . ',\'' . $item['price'] . '\',\'' . $item['commission'] . '\',\'' . $item['commission_rate'] . '\',' . $item['commission_num'] . ',' . $item['volume'] . ',' . $cat['cid'] . ')';
			$rst = $db->execute($sql);
		}
		if ($page < 25) {
			_get_taobao_cat_item($cat, $page +1);
		}
	}
}
function refresh_taobao_cat($cat) {
	$db = APP :: ADP('db');
	$count = $db->getRow('select count(*) as nums,ROUND(AVG(`price`*1),2) as price,ROUND(AVG(`commission`*1),2) as commission,ROUND(AVG(`commission_rate`*1)) as commissionRate,ROUND(AVG(`commission_num`*1)) as commissionVolume,ROUND(AVG(`volume`*1)) as volume from xwb_xt_cat_item where cid=' . $cat['cid']);
	if ($count && $count['nums'] > 0) {
		$db->execute('update xwb_xt_cat set `nums`=' . $count['nums'] . ',`volume`=\'' . $count['volume'] . '\',`commissionVolume`=\'' . $count['commissionVolume'] . '\',`commissionRate`=\'' . $count['commissionRate'] . '\',`commission`=\'' . $count['commission'] . '\',`price`=\'' . $count['price'] . '\' where cid=' . $cat['cid']);
	} else {
		$db->execute('update xwb_xt_cat set `nums`=0,`volume`=\'0\',`commissionVolume`=\'0\',`commissionRate`=\'0\',`commission`=\'0\',`price`=\'0\' where cid=' . $cat['cid']);
	}
	$db->execute('delete from xwb_xt_cat_item');
}
function get_taobao_cat() {
	set_time_limit(12000); //设置总执行时间限制，预期不可超过2分钟。
	$db = APP :: ADP('db');
	$sql = 'SELECT * FROM xwb_xt_cat WHERE isParent=1 AND isSuccess=0';
	$rst = $db->query($sql);
	foreach ($rst as $cat) {
		_get_taobao_cat($cat);
		$rst = $db->execute('UPDATE xwb_xt_cat SET isSuccess=1 WHERE cid=' . $cat['cid']);
	}
}
function _get_taobao_cat($cat) {
	$ret = TB('top/TopClient.itemcatsGet', '', array (
		'cid' => $cat['cid']
	));
	if (isset ($ret['rst']) && isset ($ret['rst']['item_cats']) && isset ($ret['rst']['item_cats']['item_cat'])) {
		$cats = $ret['rst']['item_cats']['item_cat'];
		$depth = $cat['depth'] + 1;
		foreach ($cats as $_cat) {
			$_cat['depth'] = $depth;
			$array = array ();
			$as = json_decode($cat['path'], true);
			foreach ($as as $key => $value) {
				$array['' . $key] = urlencode($value);
			}
			$array['' . $_cat['cid']] = urlencode($_cat['name']);
			$_cat['path'] = urldecode(json_encode($array));
			save_taobao_cat($_cat);
			//			if ($_cat['is_parent']) {
			//				_get_taobao_cat($cat);
			//			}
		}
	}
}
function save_taobao_cat($cat) {
	$db = APP :: ADP('db');
	$count = $db->getOne('SELECT count(*) from xwb_xt_cat WHERE cid=' . $cat['cid']);
	if ($count == 1) {
		$sql = 'UPDATE xwb_xt_cat SET `title`=\'' . $cat['name'] . '\',`parentCid`=' . $cat['parent_cid'] . ',`isParent`=' . ($cat['is_parent'] ? 1 : 0) . ',`depth`=' . $cat['depth'] . ',`path`=\'' . $cat['path'] . '\' WHERE cid=' . $cat['cid'];
	} else {
		$sql = 'INSERT IGNORE INTO xwb_xt_cat(`cid`,`title`,`parentCid`,`isParent`,`depth`,`path`) VALUES(' . $cat['cid'] . ',\'' . $cat['name'] . '\',\'' . $cat['parent_cid'] . '\',' . ($cat['is_parent'] ? 1 : 0) . ',' . $cat['depth'] . ',\'' . $cat['path'] . '\')';
	}
	$rst = $db->execute($sql);
}