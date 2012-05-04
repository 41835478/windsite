<?php
include (P_ADMIN_MODULES . '/action.abs.php');
class taoke_sites_mod extends action {

	function taoke_sites_mod() {
		parent :: action();
	}

	function default_action() {
		if (XT_IS_SELLER == 'true') {
			$result = F('xintao.getTaokeSites');
			TPL :: assign('result', $result);
			TPL :: display('mgr/xintao/getTaokeSites', '', 0, false);
		} else {
			$this->_error('您必须是淘宝卖家，并且订购了微购卖家服务');
		}
	}

}