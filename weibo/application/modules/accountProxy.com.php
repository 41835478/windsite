<?php
class accountProxy {
	/**
	 * 添加一个代理帐号
	 */
	function add($data) {
		$db = APP :: ADP('db');
		$db->setTable(T_ACCOUNT_PROXY);
		$db->setIgnoreInsert(true);
		$rs = $db->save($data);
		return RST($rs);
	}

	function updateByUserId($data, $id = '', $USER_ID) {
		if (!is_array($data)) {
			return RST(false, $errno = 1210000, $err = 'Parameter can not be empty');
		}
		$db = APP :: ADP('db');
		$db->setTable(T_ACCOUNT_PROXY);
		$rs = $db->save($data, $id, '', ' `user_id`=' . $USER_ID . ' AND sina_uid');
		return RST($rs);
	}

	/**
	 * 得到帐号列表
	 */
	function getList() {
		$db = APP :: ADP('db');
		$db->setTable(T_ACCOUNT_PROXY);
		$rs = $db->query('SELECT * FROM ' . $db->getTable(T_ACCOUNT_PROXY) . ' WHERE `user_id`=' . XT_USER_ID);
		return RST($rs);
	}

	/**
	 * 删除帐号
	 */
	function delAccount($id) {
		$db = APP :: ADP('db');
		$db->setTable(T_ACCOUNT_PROXY);
		$rs = $db->delete($id, '', 'id');
		return RST($rs);
	}

	/**
	 * 删除指定站点的所有代理帐号  
	 * @param $userId mixed 
	 * @return int|false 如果成功则返回影响行业,失败返回false
	 */
	function delAccountByUserId($USER_ID) {
		$db = APP :: ADP('db');
		$db->setTable(T_ACCOUNT_PROXY);
		$rs = $db->delete($USER_ID, '', 'user_id');
		return RST($rs);
	}
	/**
	 * 判断是否已经设置代理帐号
	 */
	function issetProxy() {
		$list = $this->getList();
		$rs = !empty ($list['rst']);
		return RST($rs);
	}

	/**
	 * 得到随机帐号
	 */
	function getRandomAccount() {
		$rows = $this->getList();
		$count = count($rows['rst']);
		if ($count < 1) {
			return RST(false);
		}
		$rand = rand(0, $count -1);
		return RST($rows['rst'][$rand]);
	}
	/**
	 * 清空指定的代理帐号
	 */
	function clearByTokenAndSecret($token = '', $refresh = '') {
		if ($token == '' || $refresh == '') {
			return;
		}
		$db = APP :: ADP('db');
		$sql = 'DELETE FROM ' . $db->getTable(T_ACCOUNT_PROXY) . ' WHERE `v2_access_token`=\'' . $db->escape($token) . '\'';
		if (!empty ($refresh)) {
			$sql .= ' AND `v2_refresh_token` = \'' . $db->escape($refresh) . '\'';
		}
		return RST($db->execute($sql));
	}
}
?>
