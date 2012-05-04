<?php
function synItemAdmin($mod) {
	$db = APP :: ADP('db');
	$admins = ($db->query('SELECT user_id FROM ' . $db->getTable(T_ADMIN) . ' WHERE mod(user_id,10)=' . $mod . ' AND item_status=0 AND group_id !=0'));
	if (!empty ($admins)) {
		foreach ($admins as $admin) {
			try {
				print_r((F('http_get_contents', 'http://t' . $admin['user_id'] . '.xintaowang.com/map.synItem')));
				sleep(1);
			} catch (Exception $e) {
			}
		}
	}
}
/**
 * 迭代更新商品
 */
function _synItemAdmin($mod) {
	//	$db = APP :: ADP('db');
	//	$admins = ($db->query('SELECT user_id FROM ' . $db->getTable(T_ADMIN) . ' WHERE mod(user_id,10)=' . $mod . ' AND item_status=0 AND group_id !=0'));
	//	if (!empty ($admins)) {
	//		foreach ($admins as $admin) {
	//			try {
	//				(F('http_get_contents', 'http://t' . $admin['user_id'] . '.xintaowang.com/map.synItem'));
	//				sleep(1);
	//			} catch (Exception $e) {
	//			}
	//		}
	//		//_synItemAdmin($mod);
	//	}
}

/**
 * 更新今日的店铺，商品预计营销数量
 */
function updatePreYingxiaoNums() {
	$shopNums = 15;
	$itemNums = 25;
	$db = APP :: ADP('db');
	$db->checksql_set(array (
		'sub_select_allow' => true,
		'union_select_allow' => true
	));
	$select_count = 'select shop_nums from xwb_xt_yingxiao where user_id in(select user_id from xwb_xt_user_shop where isseller=1 and isItems=1 and click_url is not null and click_url !=\'\') order by shop_nums desc limit 1'; //fixed by fxy060608 增加userId过滤;
	$lastShopNums = $db->getOne($select_count);
	if ($lastShopNums > 0) {
		$shopNums = $lastShopNums;
	}
	$db->checksql_set(array (
		'sub_select_allow' => true,
		'union_select_allow' => true
	));
	$select_count = 'select item_nums from xwb_xt_yingxiao where user_id in(select user_id from xwb_xt_user_shop where isseller=1 and isItems=1 and click_url is not null and click_url !=\'\') order by item_nums desc limit 1'; //fixed by fxy060608 增加userId过滤;
	$lastItemNums = $db->getOne($select_count);
	if ($lastItemNums > 0) {
		$itemNums = $lastItemNums;
	}
	CACHE :: set(TB_CACHE_KEY_PRE . 'yingxiaoShopNums', $shopNums);
	CACHE :: set(TB_CACHE_KEY_PRE . 'yingxiaoItemNums', $itemNums);
}
/**
 * 获得今日店铺，商品预计营销数量
 */
function getPreYingxiaoNums() {
	$shopNums = CACHE :: get(TB_CACHE_KEY_PRE . 'yingxiaoShopNums');
	if (!$shopNums || $shopNums <= 10) {
		$shopNums = 15;
	}
	$itemNums = CACHE :: get(TB_CACHE_KEY_PRE . 'yingxiaoItemNums');
	if (!$itemNums || $itemNums <= 25) {
		$itemNums = 25;
	}
	return array (
		'shop' => $shopNums,
		'item' => $itemNums
	);
}
function synWowUserItem() {
	$db = APP :: ADP('db');
	DS('mgr/xintao/wow.setUserItemIsValid', '', XT_USER_ID);
	if (XT_IS_SELLER == 'true' && XT_FREE_DATELINE == '') {
		$nicks = '';
		if (XT_SHOPS != '') {
			$nicks = str_replace(array (
				'[',
				']'
			), array (
				'',
				''
			), XT_SHOPS); //使用当前站点的店铺集合
		} else {
			if (XT_SID != '' && XT_USER_NICK != '') {
				$nicks = XT_USER_NICK;
			}
		}
		if ($nicks != '') {
			for ($i = 1; $i < 26; $i++) {
				//开始同步该卖家人气商品
				$params = array ();
				$params['show_num'] = 40;
				$params['page_no'] = $i;
				$params['nicks'] = $nicks;
				//第二步
				$params['fields'] = 'num_iid,title,nick,pic_url,cid,price,type,delist_time,post_fee,location,score,volume,has_discount,num,is_prepay,promoted_service,ww_status,list_time';
				$rst = array ();
				if (!empty ($params['nicks'])) {
					$rst = F('top.itemsSearch', 107, '站内店铺商品搜索', $params, true, false);
				} else {
					return;
				}
				if (!empty ($rst)) { //如果返回结果不为空
					$total_results = $rst['total_results'];
					$itemSearch = _generateItemSearch($rst);
					$items = _generateItemSearchItems($itemSearch);
					if (!empty ($items)) { //不为空，则开始同步
						_saveWowUserItem($items); //第一步：保存普通商品
					}
				} else {
					break;
				}
			}
		}
	}
	$db->execute('DELETE FROM ' . $db->getTable(T_XT_WOW_USER_ITEM) . ' WHERE `isValid`=0 AND user_id=' . XT_USER_ID); //更新状态
}
function _saveWowUserItem($items) {
	if (!empty ($items)) {
		foreach ($items as $item) {
			$count = DS('mgr/xintao/wow.getUserItemCount', '', $item['num_iid']);
			if ($count == 1) {
				DS('mgr/xintao/wow.saveUserItem', '', array (
					'title' => $item['title'],
					'price' => $item['price'],
					'pic_url' => $item['pic_url'],
					'volume' => $item['volume'],
					'isValid' => 1,
					'addtime' => strtotime($item['delist_time'])
				), $item['num_iid']);
			} else {
				DS('mgr/xintao/wow.saveUserItem', '', array (
					'nid' => $item['num_iid'],
					'title' => $item['title'],
					'price' => $item['price'],
					'nick' => $item['nick'],
					'pic_url' => $item['pic_url'],
					'volume' => $item['volume'],
					'nums' => 0,
					'user_id' => XT_USER_ID,
					'addtime' => strtotime($item['delist_time'])
				));
			}

		}
	}

}
/**
 * 同步商品营销(每天最多同步40个)
 */
function synUserItem() {
	//第一步：清理nums=0的商品，全部设置为非卖家服务
	DS('xintao/userItem.clearNums');
	DS('xintao/userItem.setIsValid', '', XT_USER_ID);
	DS('xintao/userItem.setIsSeller', '', 0, XT_USER_ID);
	//第二步：设置店铺不可推广淘客商品
	DS('xintao/userShop.setIsItems', '', 0, XT_USER_ID);
	$nicks = '';
	if (XT_SHOPS != '') {
		$nicks = str_replace(array (
			'[',
			']'
		), array (
			'',
			''
		), XT_SHOPS); //使用当前站点的店铺集合
	} else {
		if (XT_SID != '' && XT_USER_NICK != '') {
			$nicks = XT_USER_NICK;
		}
	}

	$db = APP :: ADP('db');
	if ($nicks != '') {
		$isSeller = (XT_IS_SELLER == 'true' && XT_FREE_DATELINE == '' ? 1 : 0); //是否卖家服务
		//开始同步该卖家人气商品
		$params = array ();
		$params['show_num'] = 40;
		$params['page_no'] = 1;
		$params['nicks'] = $nicks;
		//第二步
		$params['fields'] = 'num_iid,title,nick,pic_url,cid,price,type,delist_time,post_fee,location,score,volume,has_discount,num,is_prepay,promoted_service,ww_status,list_time';
		$rst = array ();
		if (!empty ($params['nicks'])) {
			$rst = F('top.itemsSearch', 107, '站内店铺商品搜索', $params, true, false);
		} else {
			$db->execute('UPDATE ' . $db->getTable(T_ADMIN) . ' SET item_status=1 WHERE user_id=' . XT_USER_ID); //更新状态
			return;
		}
		if (!empty ($rst)) { //如果返回结果不为空
			$total_results = $rst['total_results'];
			$itemSearch = _generateItemSearch($rst);
			$items = _generateItemSearchItems($itemSearch);
			if (!empty ($items)) { //不为空，则开始同步
				if (XT_IS_SELLER == 'true' && XT_IS_ITEMCLOSED == 'true') { //如果是卖家服务，且关闭了自动挑选，则不保存
				} else {
					_save($items, $isSeller); //第一步：保存普通商品
				}
				if ($isSeller) { //如果是卖家服务
					$numIids = '';
					foreach ($items as $row) {
						$numIids .= $row['num_iid'] . ',';
					}
					$taobaokeItems = F('top.taobaokeItemsConvert', 97, '商品搜索', $numIids, '', true, false);
					if (!empty ($taobaokeItems)) { //卖家服务，根据淘客商品同步
						if (XT_IS_SELLER == 'true' && XT_IS_ITEMCLOSED == 'true') { //如果是卖家服务，且关闭了自动挑选，则不保存
						} else {
							_updateByTaoke($taobaokeItems, $isSeller); //第二步：更新当前淘客商品推广信息
						}
						DS('xintao/userShop.setIsItems', '', 1, XT_USER_ID); //设置为该店铺可推广淘客商品
					}
				}
			}
		}
		synUserItemToTaokeItem();
	}
	$db->execute('DELETE FROM ' . $db->getTable(T_XT_USER_ITEM) . ' WHERE `type`=0 AND `isValid`=0 AND user_id=' . XT_USER_ID); //更新状态
	$db->execute('UPDATE ' . $db->getTable(T_ADMIN) . ' SET item_status=1 WHERE user_id=' . XT_USER_ID); //更新状态
	echo '[{'.XT_USER_ID.'}done]';
}
function synUserItemToTaokeItem() {
	if (XT_IS_SELLER == 'true' && XT_FREE_DATELINE == '' && XT_IS_TAOKE_SHOP == 'true') {
		$db = APP :: ADP('db');
		$items = $db->query('SELECT nid FROM ' . $db->getTable(T_XT_USER_ITEM) . ' WHERE `type`=1 AND user_id=' . XT_USER_ID);
		if (!empty ($items)) {
			$numIids = '';
			foreach ($items as $row) {
				$numIids .= $row['nid'] . ',';
			}
			$taobaokeItems = F('top.taobaokeItemsConvert', 97, '商品搜索', $numIids, '', true, false);
			if (!empty ($taobaokeItems)) { //卖家服务，根据淘客商品同步
				_updateByTaoke($taobaokeItems, 1); //第二步：更新当前淘客商品推广信息
				DS('xintao/userShop.setIsItems', '', 1, XT_USER_ID); //设置为该店铺可推广淘客商品
			}
		}

	}
}
/**
 * 非淘客商品
 */
function _save($items, $isSeller) {
	foreach ($items as $item) {
		$_itemCount = DS('xintao/userItem.getCountByNumIid', '', $item['num_iid']);
		if ($_itemCount == 1) { //更新
			DS('xintao/userItem.save', '', array (
				'title' => $item['title'],
				'price' => $item['price'],
				'nick' => $item['nick'],
				'pic_url' => $item['pic_url'],
				'volume' => isset ($item['volume']) ? $item['volume'] : 0,
				'isSeller' => $isSeller,
				'isValid' => 1,
				'cid' => $item['cid'],
				'nickname' => SYSTEM_SINA_USERNICK,
				'qq_nickname' => WB_QQ_NAME,
				'sh_nickname' => WB_SOHU_NICK,
				'wy_nickname' => WB_WY_NAME
			), $item['num_iid']);
		} else { //新增
			DS('xintao/userItem.save', '', array (
				'nid' => $item['num_iid'],
				'title' => $item['title'],
				'price' => $item['price'],
				'nick' => $item['nick'],
				'pic_url' => $item['pic_url'],
				'click_url' => '',
				'commission' => '',
				'commission_num' => 0,
				'item_location' => '',
				'volume' => isset ($item['volume']) ? $item['volume'] : 0,
				'isSeller' => $isSeller,
				'nickname' => SYSTEM_SINA_USERNICK,
				'qq_nickname' => WB_QQ_NAME,
				'sh_nickname' => WB_SOHU_NICK,
				'wy_nickname' => WB_WY_NAME,
				'nums' => 0,
				'user_id' => XT_USER_ID,
				'cid' => $item['cid']
			));
		}
	}
}
/**
 * 根据淘客
 */
function _updateByTaoke($items, $isSeller) {
	foreach ($items as $item) {
		DS('xintao/userItem.save', '', array (
			'click_url' => $item['click_url'],
			'commission' => $item['commission'],
			'commission_num' => $item['commission_num'],
			'item_location' => $item['item_location'],
			'volume' => isset ($item['volume']) ? $item['volume'] : 0,
			'isSeller' => $isSeller,
			'isValid' => 1
		), $item['num_iid']);
	}
}
/**
	 * @param array $rst 本组件内生成的商品搜索结果rst数组资源
	 * @return array
	 */
function _generateItemSearchItems($rst) {
	if (array_key_exists('items', $rst)) {
		return $rst['items']['item'];
	}
	return array ();
}
/**
 *
 * @param array $rst 本组件内生成的商品搜索结果rst数组资源
 * @return array
 */
function _generateItemSearch($rst) {
	if (array_key_exists('item_search', $rst)) {
		return $rst['item_search'];
	}
	return array ();
}