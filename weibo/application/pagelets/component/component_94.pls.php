<?php
require_once dirname(__FILE__) . '/component_abstract.pls.php';
/**
 * 凡客分类
 * @author fxy
 * @version $Id: component_94.pls.php
 *
 */
class component_94_pls extends component_abstract_pls {

	function run($mod) {
		parent :: run($mod);
		$cid = V('g:cid');
		if (isset ($cid)) {
			$mod['param']['cid'] = $cid;
		}
		$cid = $mod['param']['cid'];
		$cat = '';
		if ($cid != 0) {
			$cat = F('vancl.getCat', 94, '凡客分类', $cid);
		}
		$cats = F('vancl.getCats', 94, '凡客分类', $cid);
		//TODO 尚未处理分类Path
		TPL :: module('xintao/vanclCats', array (
			'mod' => $mod,
			'cats' => $cats,
			'cat' => $cat
		));

	}
}