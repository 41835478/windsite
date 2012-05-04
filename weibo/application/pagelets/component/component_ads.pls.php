<?php
require_once dirname(__FILE__) . '/component_abstract.pls.php';
/**
 * 广告位
 * @author fxy060608
 * @version $Id: component_ads.pls.php
 *
 */
class component_ads_pls extends component_abstract_pls {

	function run($mod) {
		parent :: run($mod);
		TPL :: module('xintao/ads', array (
			'mod' => $mod
		));
		//return $mod['param'];
	}
}