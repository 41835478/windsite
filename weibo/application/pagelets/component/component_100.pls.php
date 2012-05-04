<?php
require_once dirname(__FILE__) . '/component_abstract.pls.php';
/**
 * 店铺搜索
 * @author fxy
 * @version $Id: component_100.pls.php
 *
 */
class component_100_pls extends component_abstract_pls {

	function run($mod) {
		parent :: run($mod);
		$params = $mod['param']; //参数列表
		$params['page_no'] = (int) V('g:page', 1);
		//执行店铺搜索
		$rst = F('top.taobaokeShopsGet', 100, '侧边栏店铺搜索', $params);
		$shopList = $this->_generateShopList($rst);
		TPL :: module('xintao/top', array (
			'data_type' => 'shop',
			'mod' => $mod,
			'list' => $shopList
		));
	}

	/**
	 *
	 * @param array $rst 本组件内生成的店铺rst数组资源
	 * @return array
	 */
	function _generateShopList($rst) {
		return $rst['taobaoke_shops']['taobaoke_shop'];
	}

}