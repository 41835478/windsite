<?php
require_once dirname(__FILE__) . '/component_abstract.pls.php';
/**
 * 商品搜索
 * @author fxy
 * @version $Id: component_105.pls.php
 *
 */
class component_105_pls extends component_abstract_pls {

	function run($mod) {
		parent :: run($mod);
		$params = $mod['param']; //参数列表
		$params['page_no'] = 1;
		//TODO 区别来源
		$rst = F('top.taobaokeItemsGet', 105, '侧边栏商品搜索', $params);
		$itemList = $this->_generateItemList($rst);
		TPL :: module('xintao/top', array (
			'data_type' => 'item',
			'mod' => $mod,
			'list' => $itemList
		));
	}

	/**
	 *
	 * @param array $rst 本组件内生成的淘宝客商品rst数组资源
	 * @return array
	 */
	function _generateItemList($rst) {
		return $rst['taobaoke_items']['taobaoke_item'];
	}

}