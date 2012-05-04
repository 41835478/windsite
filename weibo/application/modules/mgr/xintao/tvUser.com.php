<?php
class tvUser {
	/*
		 * 根据USERID获取管理员数据
		 * @param int $sina_uid
		 * @param int $offset
		 * @param int $each
		 * @return array()
		 */
	function getTvUser($userId) {
		$db = APP :: ADP('db');
		$keyword = $db->escape($userId);
		$where = ' WHERE `id` = ' . $keyword;
		$sql = 'SELECT * FROM ' . $db->getPrefix() . F('xintaotv.getTableSuffix', T_XTTV_USER, $userId) . $where;
		return RST($db->getRow($sql));
	}
	/*
	 * 修改，插入事件
	 * @param array $data
	 * @param int $id
	 * @return boolean
	 */
	function save($userId, $data, $id = '') {
		if (!is_array($data)) {
			return RST(false, $errno = 1210000, $err = 'Parameter can not be empty');
		}
		$db = APP :: ADP('db');
		$db->setTable(F('xintaotv.getTableSuffix', T_XTTV_USER, $userId));
		return RST($db->save($data, $id, '', 'id'));
	}

}