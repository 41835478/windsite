<?php
class version_mod {
	function version_mod() {
	}

	/**
	 * 版本说明页面
	 */
	function default_action() {
		TPL :: display('xintao/version');
	}
}