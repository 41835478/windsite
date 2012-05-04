<?php
require_once dirname(__FILE__) . '/component_abstract.pls.php';
/**
 * 单店铺
 * @author fxy
 * @version $Id: component_110.pls.php
 *
 */
class component_110_pls extends component_abstract_pls {

	function run($mod) {
		parent :: run($mod);
		$params = $mod['param']; //参数列表
		$items = array (); //包含商品
		//第一步查询单店铺基本信息
		$shop = array ();
		if (!empty ($params['nick'])) {
			$shop = F('top.shopGet', 106, '单店铺推广', $params, true);
		}
		//第二步查询店铺信用相关
		if ($shop) {
			$params['fields'] = 'seller_credit'; //仅查询信用
			$user = F('top.userGet', 110, '单店铺推广-店铺信用', $params);
			if ($user) {
				$shop['level'] = $user['seller_credit']['level'];
				$shop['score'] = $user['seller_credit']['score'];
				$shop['total_num'] = $user['seller_credit']['total_num'];
				$shop['good_num'] = $user['seller_credit']['good_num'];
			}
		} else {
			if (isset ($mod['id'])) { //如果当前配置的卖家不存在，则清空
				$params['nick'] = '';
				$db = APP :: ADP('db');
				$db->save(array (
					'param' => json_encode($params)
				), $mod['id'], T_PAGE_MANAGER, 'id');
			}
		}
		TPL :: module('xintao/shop', array (
			'mod' => $mod,
			'position' => 2,
			'shop' => $shop,
			'nick' => $params['nick']
		));
	}

}