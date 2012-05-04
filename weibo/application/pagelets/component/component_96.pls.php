<?php
require_once dirname(__FILE__) . '/component_abstract.pls.php';
function merge_cats($category, $cat) {
	if ($category['category_id'] == $cat['cid']) {
		$cat['count'] = $category['count'];
	}
	return $cat;
}
/**
 * 分类|属性搜索
 * @author yaoying
 * @version $Id: component_100.pls.php
 *
 */
class component_96_pls extends component_abstract_pls {

	function run($mod) {
		parent :: run($mod);
		//根据返回的类别生成搜索区（分类|属性）
		///1.无返回分类[直接返回]，2.仅一个分类[查询该分类属性值]，3.多个分类[查询多个分类详情]
		$mod['param'] = array_merge($mod['param'], V('g')); //参数列表
		$params = $mod['param'];
		$categorys = $params['cats'];
		$cat = array();
		if (isset ($params['cat']))
			$cat = $params['cat'];
		$cats = array ();
		$props = array (); //属性数组
		if (1 == count($categorys)) { //如果只有一个分类，则查询属性
			if (!$cat) {
				$cat = F('top.itemcatsGet', 96, '淘宝分类模块', $categorys[0]['category_id']);
			}
			if (count($cat) == 1)
				$props = F('top.itempropsGet', 96, '淘宝属性模块', $cat[0]['cid'], true);
		}
		elseif (count($categorys) > 1) { //多个分类，则查询当前所有分类
			if (!empty ($mod['param']['cid']) && !$cat) {
				$cat = F('top.itemcatsGet', 96, '淘宝分类模块', $mod['param']['cid']);
			}
			$cids = '';
			foreach ($categorys as $row) {
				$cids .= $row['category_id'] . ',';
			}
			$cats = F('top.itemcatsGet', 96, '淘宝分类模块', $cids);
			if (count($cats) > 0) {
				$cats = array_map('merge_cats', $categorys, $cats);
				// 取得列的列表(按COUNT排序)
				foreach ($cats as $key => $row) {
					$volume[$key] = $row['count'];
				}
				// 将数据根据 volume 降序排列，根据 edition 升序排列
				// 把 $data 作为最后一个参数，以通用键排序
				array_multisort($volume, SORT_DESC, $cats);
			}

		}
		TPL :: module('xintao/cats', array (
			'data_type' => 'tb_cats',
			'mod' => $mod,
			'cat' => $cat,
			'cats' => $cats,
			'props' => $props,
			'queryStr' => $mod['queryStr']
		));

	}

	/**
	 *
	 * @param array $rst 本组件内生成的分类rst数组资源
	 * @return array
	 */
	function _generateCatList($rst) {
		return $rst['item_cats']['item_cat'];
	}
	/**
		 *
		 * @param array $rst 本组件内生成的分类属性rst数组资源
		 * @return array
		 */
	function _generatePropList($rst) {
		return $rst['item_props']['item_prop'];
	}
}