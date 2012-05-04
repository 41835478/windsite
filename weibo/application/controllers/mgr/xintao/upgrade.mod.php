<?php
include (P_ADMIN_MODULES . '/action.abs.php');
class upgrade_mod extends action {

	function upgrade_mod() {
		parent :: action();
	}

	function default_action() {
		//exit('已升级完毕');
		set_time_limit(0); //设置总执行时间限制，预期不可超过30分钟。
		$db = APP :: ADP('db');
		$sql = 'SELECT * FROM ' . $db->getPrefix() . T_ADMIN . ' WHERE xt_version<4';
		$admins = $db->query($sql);
		$upgrades = array ();
		foreach ($admins as $admin) {
			//$upgrade = array ();
			//$upgrade['user_id'] = $admin['user_id'];
			//$upgrade['user_nick'] = $admin['user_nick'];
			//$upgrade['upgrade'] = 
			F('http_get_contents', 'http://t' . $admin['user_id'] . '.xintaowang.com/map.upgrade');
			//$upgrades[] = $upgrade;
		}
		//TPL :: assign('list', $upgrades);
		TPL :: display('mgr/xintao/upgrades', '', 0, false);
	}
}