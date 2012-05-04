<?php


/**************************************************
*  Created:  2010-06-08
*
*  fxy060608
*
*  @Xintao 
*  @Author fxy <fxy060608@gmail.com>
*
***************************************************/

class shop_mod {
	var $uInfo = false;

	function shop_mod() {
		// Cunstructor Here
	}

	/**
	 * 店铺
	 */
	function default_action() {
		$id = V('g:id');
		$nick = V('g:nick');
		$shop = array ();
		$shops = array ();
		$cat = array ();
		$items = array ();
		if (!$id && !$nick && XT_IS_SELLER=='true') { //如果未指定店铺，且版本符合，以及设置了站内店铺
			$local = explode(',', XT_SHOPS);
			$nick = str_replace(array (
				'[',
				']'
			), array (
				'',
				''
			), $local[0]);
		}
		if ($id) { //根据ID查询（淘宝客）

		}
		if ($nick) {
			$shop = F('top.shopGet', -999, '店铺详情', array (
				'nick' => $nick
			), true);
			$shop['click_url'] = '';
			$shop['seller_credit'] = '';
			$shop['commission_rate'] = '';
			$shop['shop_type'] = '';
			if ($shop) {
				$isItems = true;
				if (in_array('[' . $nick . ']', explode(',', XT_SHOPS))) { //无需转换

				} else {
					$tShops = F('top.taobaokeShopsConvert', -999, '店铺详情', array (
						'sids' => $shop['sid'],
						'fields' => 'click_url,commission_rate,shop_type'
					));
					if ($tShops && count($tShops) == 1) { //淘宝客店铺
						$tShop = $tShops[0];
						$shop['click_url'] = $tShop['click_url'];
						$shop['commission_rate'] = $tShop['commission_rate'];
						$shop['shop_type'] = $tShop['shop_type'];
					} else { //非淘宝客店铺（查找同类）
						$isItems = false;
					}
				}
			}
		}
		TPL :: assign('cat', $cat);
		TPL :: assign('shop', $shop);
		TPL :: assign('isItems', $isItems);
		TPL :: assign('shops', $shops);
		TPL :: display('xintao/shop');
	}
}