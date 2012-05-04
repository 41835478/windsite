<?php


/**
 * 画报数据存储对象
 *
 *  @create 2010/11/6 23:35
 *  @author fxy <fxy060608@gmail.com>
 */
class poster {

	/**
	 * 数据库操作对象
	 */
	var $db;

	/**
	 * 构造函数，初始化内部使用的对象
	 *
	 */
	function poster() {
		$this->db = APP :: ADP('db');
		$db = & $this->db;
	}

	/**
	 * 根据画报标识获取单画报
	 */
	function getById($posterId) {
		if (!is_numeric($posterId)) {
			return RST(false, $errno = 1210002, $err = 'Parameter must be a number');
		}
		$db = $this->db;
		return RST($db->get($db->escape($posterId), T_XT_POSTER, 'id'));
	}

	/**
	 * 保存数据
	 *
	 * @param $data array 配置内容,如array('title' => 'xxx', 'text' => 'aaaaaa');
	 * @return boolean
	 *
	 */
	function save($data, $posterId = '') {
		if (!empty ($data) && is_array($data)) {
			$db = & $this->db;
			$db->setTable(T_XT_POSTER);
			return RST($db->save($data, $posterId, '', 'id'));
		} else {
			return RST(false, $errno = 1210000, $err = 'Parameter can not be empty');
		}

	}
}