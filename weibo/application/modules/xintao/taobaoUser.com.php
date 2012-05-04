<?php


/**
 * 淘客用户数据存储对象
 *
 *  @create 2010/11/6 23:35
 *  @author fxy <fxy060608@gmail.com>
 */
class taobaoUser {

	/**
	 * 数据库操作对象
	 */
	var $db;

	/**
	 * 构造函数，初始化内部使用的对象
	 *
	 */
	function taobaoUser() {
		$this->db = APP :: ADP('db');
		$db = & $this->db;
	}
	/**
	 * 根据USERID计数指定淘宝用户
	 */
	function getUserNum($userId) {
		$db = $this->db;
		$keyword = $db->escape($userId);
		if ($keyword) {
			$select_count = 'SELECT COUNT(*) FROM ' . $db->getPrefix() . T_XT_TAOBAO_USER . ' WHERE `user_id` = ' . $keyword;
			return RST($db->getOne($select_count));
		} else {
			return RST(false, $errno = 1210000, $err = 'Parameter can not be empty');
		}
	}
	/**
	 * 根据USERID获取指定淘宝用户
	 */
	function getByUserId($userId) {
		$db = $this->db;
		$keyword = $db->escape($userId);
		if ($keyword) {
			return RST($db->get($keyword, T_XT_TAOBAO_USER, 'user_id'));
		} else {
			return RST(false, $errno = 1210000, $err = 'Parameter can not be empty');
		}
	}

	/**
	 * 保存数据
	 *
	 * @param $data array 配置内容,如array('title' => 'xxx', 'text' => 'aaaaaa');
	 * @return boolean
	 *
	 */
	function save($data, $userId='') {
		if (!empty ($data) && is_array($data)) {
			$db = & $this->db;
			$db->setTable(T_XT_TAOBAO_USER);
			$db->save($data, $userId, '', 'user_id');
			return true;
		}
		return false;
	}
}