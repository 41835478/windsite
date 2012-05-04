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

class fiting_mod
{
	var $uInfo = false;
	
	
	function fiting_mod() 
	{
		// Cunstructor Here
	}

	
	
	/**
	 * 名人堂
	 */
	function default_action() 
	{
		TPL::display('xintao/fiting_room');
	}
}
