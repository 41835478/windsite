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

class vancls_mod {

	function vancls_mod() {
		// Cunstructor Here
	}

	/**
	 * 商品
	 */
	function default_action() {
		$mod = array ();
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
			$mod['param'] = F('taobao.vancl_convert_search', $search); //根据URL参数查询,转换search参数
		} else { //默认配置
			$pm = APP :: N('pageManager');
			$manager = $pm->getPageManager(9999);
			$mod['param'] = json_decode($manager['param'], TRUE);
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
		$offset = ($page -1) * 40;
		$list = F('vancl.getProducts', 95, '凡客商品搜索', $params['q'], $params['cid'], $catWhere, $params['isspecial'], $params['sortOrder'], $params['sprice'], $params['eprice'], $offset, 40);
		$total_results = F('vancl.getProductsNum', 95, '凡客商品搜索', $params['q'], $params['cid'], $catWhere, $params['isspecial'], $params['sprice'], $params['eprice']);
		TPL :: assign('mod', $mod);
		TPL :: assign('total_results', $total_results);
		TPL :: assign('list', $list);
		TPL :: display('xintao/vancls');
	}
}