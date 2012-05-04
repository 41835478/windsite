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
include_once ('xintaoTv.abs.php');
class brand_mod extends xintaoTv {

	function brand_mod() {
		parent :: action();
	}
	function default_action() {
		$name = V('g:name', '');
		if (!empty ($name)) {
			$brand = F('get_xintaotv_brand', $name);
			if (empty ($brand)) {
				F('err404', '当前品牌不存在');
			}
			TPL :: assign('brand', $brand);
			TPL :: display('xintao/tv/brandItem');
		} else {
			TPL :: display('xintao/tv/brand');
		}
	}

}