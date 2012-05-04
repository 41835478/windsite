<?php
class tvHistory {
	function getTvHistoryByVid($userId, $vid) {
		$db = APP :: ADP('db');
		$keyword = $db->escape($userId);
		$where = ' WHERE `user_id` = ' . $keyword . ' AND vid = ' . $db->escape($vid);
		$sql = 'SELECT * FROM ' . $db->getPrefix() . F('xintaotv.getTableSuffix', T_XTTV_PLAY_HISTORY, $userId) . $where;
		return RST($db->getRow($sql));
	}
	function getTvHistoryByBid($userId, $bid) {
		$db = APP :: ADP('db');
		$keyword = $db->escape($userId);
		$where = ' WHERE `user_id` = ' . $keyword . ' AND bid = ' . $db->escape($bid);
		$sql = 'SELECT * FROM ' . $db->getPrefix() . F('xintaotv.getTableSuffix', T_XTTV_PLAY_HISTORY, $userId) . $where;
		return RST($db->getRow($sql));
	}
	/*
	 * 查询最近10条播放记录
	 * @param int $sina_uid
	 * @param int $offset
	 * @param int $each
	 * @return array()
	 */
	function getTvHistories($userId) {
		$db = APP :: ADP('db');
		$keyword = $db->escape($userId);
		$where = ' WHERE `user_id` = ' . $keyword . ' ORDER BY `dateline` DESC LIMIT 0,10';
		$sql = 'SELECT * FROM ' . $db->getPrefix() . F('xintaotv.getTableSuffix', T_XTTV_PLAY_HISTORY, $userId) . $where;
		return RST($db->query($sql));
	}
	function deleteTvHistoryById($userId, $id) {
		$this->_cleanCache($userId);
		$db = APP :: ADP('db');
		$keyword = $db->escape($userId);
		$where = ' WHERE `user_id` = ' . $keyword . ' AND id=' . $db->escape($id);
		$sql = 'DELETE FROM ' . $db->getPrefix() . F('xintaotv.getTableSuffix', T_XTTV_PLAY_HISTORY, $userId) . $where;
		return RST($db->execute($sql));
	}
	function deleteTvHistories($userId) {
		$this->_cleanCache($userId);
		$db = APP :: ADP('db');
		$keyword = $db->escape($userId);
		$where = ' WHERE `user_id` = ' . $keyword;
		$sql = 'DELETE FROM ' . $db->getPrefix() . F('xintaotv.getTableSuffix', T_XTTV_PLAY_HISTORY, $userId) . $where;
		return RST($db->execute($sql));
	}
	/*
	 * 清除缓存
	 */
	function _cleanCache($userId) {
		CACHE :: set(TB_CACHE_TV_KEY_PRE . 'History_' . $userId, null);
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
		$this->_cleanCache($userId);
		$db = APP :: ADP('db');
		$db->setTable(F('xintaotv.getTableSuffix', T_XTTV_PLAY_HISTORY, $userId));
		return RST($db->save($data, $id, '', 'id'));
	}

}