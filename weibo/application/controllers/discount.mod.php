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
class discount_mod extends xintaoTv {

	function discount_mod() {
		parent :: action();
	}
	function default_action() {
		$discounts = CACHE :: get(TB_CACHE_TV_KEY_PRE . 'Discounts');
		if (!$discounts || empty ($discounts)) {
			$db = APP :: ADP('db');
			$discounts = $db->query('SELECT * FROM xwb_xttv_dianpu_discount');
			CACHE :: set(TB_CACHE_TV_KEY_PRE . 'Discounts', $discounts);
		}
		TPL :: assign('discounts', $discounts);
		TPL :: display('xintao/tv/newDiscount');
	}

}