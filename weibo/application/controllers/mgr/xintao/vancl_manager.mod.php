<?php
include (P_ADMIN_MODULES . '/action.abs.php');
/**
 * 凡客后台管理
 */
class vancl_manager_mod extends action {

	function vancl_manager_mod() {
		parent :: action();
	}

	function default_action() {
		$this->_display('xintao/active_vancl');
	}
	function save() {
		DS('mgr/adminCom.saveAdminByUserId', '', array (
			'vancl_nick' => V('p:vancl_nick')
		), XT_USER_ID);
		F('xintao.update_config_file', array (
			'XT_VANCL_NICK' => V('p:vancl_nick')
		), XT_USER_ID); //更新
		exit ('{"state":"200"}');
	}
}