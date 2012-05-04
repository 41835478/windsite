<?php


/**
 * 影视数据存储对象
 *
 *  @create 2010/11/6 23:35
 *  @author fxy <fxy060608@gmail.com>
 */
class xiaohua {

	/**
	 * 数据库操作对象
	 */
	var $db;

	/**
	 * 构造函数，初始化内部使用的对象
	 *
	 */
	function xiaohua() {
		$this->db = APP :: ADP('db');
		$db = & $this->db;
	}

	/**
	 * 根据标识获取笑话记录
	 */
	function getById($id) {
		if (!is_numeric($id)) {
			return RST(false, $errno = 1210002, $err = 'Parameter must be a number');
		}
		$db = $this->db;
		return RST($db->get($db->escape($id), T_XT_XIAOHUA, 'id'));
	}

}