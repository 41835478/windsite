<?php
require_once dirname(__FILE__) . '/component_abstract.pls.php';
/**
 * 凡客分类搜索
 * @author fxy
 * @version $Id: component_95.pls.php
 *
 */
class component_95_pls extends component_abstract_pls {

	function run($mod) {
		parent :: run($mod);
		$search = V('g:search', '');
		$q = V('g:q', '');
		$cid = V('g:cid', '');
		$g = V('g');
		if (!empty ($q)) {
			$mod['param'] = F('taobao.vancl_default_search', array (
				'q' => $q
			));
			//仅查询关键词
		}
		elseif (!empty ($cid)) {
			$mod['param'] = F('taobao.vancl_default_search', array (
				'cid' => $cid
			)); //仅查询分类
		}
		elseif (!empty ($search) && strpos($search, '--------------') !== 0) { //如果搜索参数存在
			//echo $search;exit;
			$mod['param'] = F('taobao.vancl_convert_search', $search); //根据URL参数查询,转换search参数
		} else { //默认配置
			$mod['param'] = F('taobao.vancl_default_search', $mod['param']);
		}
		$params = $mod['param'];
		$catWhere = 'cat1';
		if (!empty ($params['cid'])) {
			$cat = F('vancl.getCat', 95, '凡客分类搜索', $params['cid']);
			if (!empty ($cat)) {
				$catWhere = 'cat' . $cat['level'];
			}
		}
		$page = (int) V('g:page_no', 1);
		$offset = ($page -1) * 20;
		$list = F('vancl.getProducts', 95, '凡客商品搜索', $params['q'], $params['cid'], $catWhere, $params['isspecial'], $params['sortOrder'], $params['sprice'], $params['eprice'], $offset, 20);
		$total_results = F('vancl.getProductsNum', 95, '凡客商品搜索', $params['q'], $params['cid'], $catWhere, $params['isspecial'], $params['sprice'], $params['eprice']);
		TPL :: module('xintao/vancls', array (
			'mod' => $mod,
			'total_results' => $total_results,
			'list' => $list
		));

	}
}