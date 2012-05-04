<?php
include (P_ADMIN_MODULES . '/action.abs.php');
class domains_mod extends action {

	function domains_mod() {
		parent :: action();
	}

	function default_action() {
		$status = 0;
		if (isset ($_GET['status'])) {
			$status = $_GET['status'];
		}
		$domains = DS('mgr/xintao/domainsCom.getDomains', '', $status);
		TPL :: assign('list', $domains);
		TPL :: display('mgr/xintao/domains', '', 0, false);
	}
	function buchangAudit() {
		$status = 0;
		if (isset ($_GET['status'])) {
			$status = $_GET['status'];
		}
		$buchangs = DS('mgr/xintao/domainsCom.getBuchangs', '', $status);
		TPL :: assign('list', $buchangs);
		TPL :: display('mgr/xintao/buchangs', '', 0, false);
	}
	function buchang() {
		$buchang = DS('mgr/xintao/domainsCom.getBuchang', '', XT_USER_NICK);
		TPL :: assign('buchang', $buchang);
		TPL :: display('mgr/xintao/buchang', '', 0, false);
	}
	function buchangSave() {
		$data = array (
			'status' => $_POST['status'],
			'remark' => $_POST['remark'],
			'nick' => $_POST['nick']
		);
		if (!isset ($_POST['nick']) || !isset ($_POST['status'])) {
			APP :: ajaxRst(false, '1', '缺少参数');
		}
		if (isset ($_POST['remark']) && !empty ($_POST['remark'])) { //审核未通过时备注
			$data['remark'] = $_POST['remark'];
		}
		$rst = DR('mgr/xintao/domainsCom.buchangSave', '', $data, $_POST['nick']); //保存或修改
		if ($rst['rst']) {
			$this->_succ('操作已成功', $_SERVER['HTTP_REFERER']);
			exit;
		} else {
			$this->_error('操作失败', $_SERVER['HTTP_REFERER']);
		}
	}
	function bindDomainView() {
		$domain = DS('mgr/xintao/domainsCom.getDomain', '', XT_USER_ID);
		TPL :: assign('domain', $domain);
		TPL :: display('mgr/xintao/domain', '', 0, false);
	}

	function delete() {
		$rst = DR('mgr/xintao/domainsCom.delDomain', '', $_GET['id']); //删除
		if ($rst['rst'] && $rst['rst'] > 0) {
			$this->_succ('删除域名审核成功', $_SERVER['HTTP_REFERER']);
			exit;
		} else {
			$this->_error('删除域名审核失败', $_SERVER['HTTP_REFERER']);
		}
	}
	function save() {
		$data = array (
			'domain' => $_POST['domain'],
			'status' => $_POST['status'],
			'user_id' => $_POST['user_id']
		);
		$id = '';
		if (isset ($_POST['id'])) {
			$id = $_POST['id'];
		} else {
			$data['created'] = date("Y-m-d H:m:s", time());
			$data['domain'] = $data['domain']; //新增时，默认加入t.
		}
		if (!isset ($_POST['domain']) || !isset ($_POST['status'])) {
			APP :: ajaxRst(false, '1', '缺少参数');
		}
		if (isset ($_POST['remark']) && !empty ($_POST['remark'])) { //审核未通过时备注
			$data['remark'] = $_POST['remark'];
		}
		$rst = DR('mgr/xintao/domainsCom.saveDomainById', '', $data, $id); //保存或修改
		if ($rst['rst'] && $rst['rst'] > 0) {
			$this->_succ('操作已成功', $_SERVER['HTTP_REFERER']);
			exit;
		} else {
			$this->_error('操作失败', $_SERVER['HTTP_REFERER']);
		}
	}

}