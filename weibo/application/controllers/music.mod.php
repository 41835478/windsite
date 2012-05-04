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
class music_mod extends xintaoTv {

	function music_mod() {
		parent :: action();
	}
	function default_action() {
		TPL :: display('xintao/tv/music');
	}

}