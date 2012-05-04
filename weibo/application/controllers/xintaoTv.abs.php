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

class xintaoTv {

	function xintaoTv() {
	}
	function action() {
		if ($_SERVER['SERVER_NAME'] != 'www.xintaotv.com') {
			exit ('暂不对外开放此功能');
		}
	}

}