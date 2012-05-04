<?php

include(P_ADMIN_MODULES . '/action.abs.php');
class version_mod extends action {

	function version_mod() {
		parent :: action();
	}

	function default_action(){
		TPL :: display('mgr/xintao/version', '', 0, false);
	}
}
