<?php
class wow {
	var $taoke_item_sql = '';
	var $user_item_sql = '';
	var $db;
	function wow() {
		$this->db = APP :: ADP('db');
		$db = & $this->db;
	}
	/*
	 * 清除缓存
	 */
	function _cleanCache() {
		DD('xintao/wow.getTaokeItemCat');
	}
	function getTaokeItemCat($USER_ID = '') {
		if (!$USER_ID) {
			$USER_ID = XT_USER_ID;
		}
		$db = APP :: ADP('db');
		$sql = 'SELECT * FROM ' . $db->getTable(T_XT_WOW_TAOKE_ITEM_CAT) . ' WHERE `user_id`=' . $USER_ID . ' ORDER BY `sortOrder` asc';
		return RST($db->query($sql));
	}
	function getWowUserItemList($offset = 0, $each = 20) {
		$db = APP :: ADP('db');
		$where = ' WHERE `user_id`=' . XT_USER_ID;
		$this->user_item_sql = 'SELECT COUNT(*) FROM ' . $db->getTable(T_XT_WOW_USER_ITEM) . $where;
		$sql = 'SELECT * FROM ' . $db->getTable(T_XT_WOW_USER_ITEM) . $where . ' ORDER BY `isValid` DESC,`volume` DESC LIMIT ' . (int) $offset . ',' . (int) $each;
		return RST($db->query($sql));
	}
	/**
	 * 统计记录总数,由用于查询的方法提供统计的SQL，该方法只用于执行指定的SQL
	 * @return int
	 */
	function getWowUserItemCount() {
		if ($this->user_item_sql) {
			$db = APP :: ADP('db');
			$rst = $db->getOne($this->user_item_sql);
			return RST($rst);
		}
		return $this->_err(2152001, '统计记录数时，前置的查询方法没有提供用于统计的SQL');
	}
	function getWowTaokeItemList($cat = '', $isValid = '', $offset = 0, $each = 20) {
		$db = APP :: ADP('db');
		$where = ' WHERE `user_id`=' . XT_USER_ID;
		if ($cat != '') {
			$where = $where . ' AND `cat` = ' . $db->escape($cat);
		}
		if ($isValid != '') {
			$where = $where . ' AND `isValid` = ' . $db->escape($isValid);
		}
		$this->taoke_item_sql = 'SELECT COUNT(*) FROM ' . $db->getTable(T_XT_WOW_TAOKE_ITEM) . $where;
		$sql = 'SELECT * FROM ' . $db->getTable(T_XT_WOW_TAOKE_ITEM) . $where . ' ORDER BY `isValid` DESC,`addtime` DESC LIMIT ' . (int) $offset . ',' . (int) $each;
		return RST($db->query($sql));
	}
	/**
	 * 统计记录总数,由用于查询的方法提供统计的SQL，该方法只用于执行指定的SQL
	 * @return int
	 */
	function getWowTaokeItemCount() {
		if ($this->taoke_item_sql) {
			$db = APP :: ADP('db');
			$rst = $db->getOne($this->taoke_item_sql);
			return RST($rst);
		}
		return $this->_err(2152001, '统计记录数时，前置的查询方法没有提供用于统计的SQL');
	}
	/**
	 * 查询指定站点的商品营销
	 */
	function getTaokeItemsCount($cat = '') {
		$db = $this->db;
		$where = '';
		if ($cat != '') {
			$where = ' AND cat=' . $cat;
		}
		$sql = 'SELECT COUNT(*) FROM ' . $db->getTable(T_XT_WOW_TAOKE_ITEM) . ' WHERE `user_id`=' . XT_USER_ID . $where;
		return RST($db->getOne($sql));
	}

	/**
	 * 查询指定站点的商品营销(淘客商品)
	 */
	function getTaokeItemCount($nid) {
		if (!is_numeric($nid)) {
			return RST(false, $errno = 1210002, $err = 'Parameter must be a number');
		}
		$db = $this->db;
		$sql = 'SELECT COUNT(*) FROM ' . $db->getTable(T_XT_WOW_TAOKE_ITEM) . ' WHERE `nid`=' . $nid . ' AND `user_id`=' . XT_USER_ID;
		return RST($db->getOne($sql));
	}
	/**
		 * 查询指定站点的商品营销
		 */
	function deleteTaokeItems($num_iids) {
		if (!$num_iids) {
			return RST(false, $errno = 1210002, $err = 'Parameter must be a number');
		}
		$this->_cleanCache();
		$db = $this->db;
		$sql = 'DELETE FROM ' . $db->getTable(T_XT_WOW_TAOKE_ITEM) . ' WHERE `nid` in (' . $num_iids . ') AND `user_id`=' . XT_USER_ID;
		return RST($db->query($sql));
	}
	/**
	 * 保存数据
	 *
	 * @param $data array 配置内容,如array('title' => 'xxx', 'text' => 'aaaaaa');
	 * @return boolean
	 *
	 */
	function saveTaokeItemCat($data, $id = '') {
		if (!empty ($data) && is_array($data)) {
			$this->_cleanCache();
			$db = APP :: ADP('db');
			$db->setTable(T_XT_WOW_TAOKE_ITEM_CAT);
			$db->save($data, $id, '', ' `user_id`=' . XT_USER_ID . ' AND id ');
			return true;
		}
		return false;
	}
	/**
		 * 查询指定站点的商品营销(淘客商品)
		 */
	function getUserItemCount($nid) {
		if (!is_numeric($nid)) {
			return RST(false, $errno = 1210002, $err = 'Parameter must be a number');
		}
		$db = APP :: ADP('db');
		$sql = 'SELECT COUNT(*) FROM ' . $db->getTable(T_XT_WOW_USER_ITEM) . ' WHERE `nid`=' . $nid;
		return RST($db->getOne($sql));
	}
	/**
	 * 保存数据
	 *
	 * @param $data array 配置内容,如array('title' => 'xxx', 'text' => 'aaaaaa');
	 * @return boolean
	 *
	 */
	function saveTaokeItem($data, $nid = '') {
		if (!empty ($data) && is_array($data)) {
			$this->_cleanCache();
			$db = APP :: ADP('db');
			$db->setTable(T_XT_WOW_TAOKE_ITEM);
			$db->save($data, $nid, '', ' `user_id`=' . XT_USER_ID . ' AND nid ');
			return true;
		}
		return false;
	}
	/**
	 * 设置店铺是否为卖家
	 */
	function setUserItemIsValid($USER_ID = '') {
		if ($USER_ID == '') {
			return;
		}
		$db = APP :: ADP('db');
		$sql = 'UPDATE ' . $db->getTable(T_XT_WOW_USER_ITEM) . ' SET `isValid`=0,`today_nums`=0 WHERE `user_id`=' . $db->escape($USER_ID);
		return RST($db->execute($sql));
	}
	/**
	 * 保存数据
	 *
	 * @param $data array 配置内容,如array('title' => 'xxx', 'text' => 'aaaaaa');
	 * @return boolean
	 *
	 */
	function saveUserItem($data, $nid = '') {
		if (!empty ($data) && is_array($data)) {
			$db = APP :: ADP('db');
			$db->setTable(T_XT_WOW_USER_ITEM);
			$db->save($data, $nid, '', ' `user_id`=' . XT_USER_ID . ' AND nid ');
			return true;
		}
		return false;
	}
}