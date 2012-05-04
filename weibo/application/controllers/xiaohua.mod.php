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

class xiaohua_mod {

	function xiaohua_mod() {

	}
	function default_action() {
		$id = V('g:id', 0);
		$xiaohua = array ();
		if ($id > 0) {
			$xiaohua = DS('xintao/xiaohua.getById', 'g0/' . CACHE_24X30, $id);
		}
		$modules = DS('PageModule.getPageModules', /*'g1/300'*/
		'', 1, 1);
		TPL :: assign('main_modules', isset ($modules[1]) ? $modules[1] : array ());
		TPL :: assign('side_modules', isset ($modules[2]) ? $modules[2] : array ());
		TPL :: assign('xiaohua', $xiaohua);
		TPL :: display('xintao/xiaohua/xiaohua');
	}

}