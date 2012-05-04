<?php


/**
 * 免费数据存储对象
 *
 *  @create 2010/11/6 23:35
 *  @author fxy <fxy060608@gmail.com>
 */
class free {

	/**
	 * 数据库操作对象
	 */
	var $db;

	/**
	 * 构造函数，初始化内部使用的对象
	 *
	 */
	function free() {
		$this->db = APP :: ADP('db');
		$db = & $this->db;
	}
	
	/**
	 * 根据标识获取免费记录
	 */
	function getById($id) {
		if (!is_numeric($id)) {
			return RST(false, $errno = 1210002, $err = 'Parameter must be a number');
		}
		$db = $this->db;
		return RST($db->get($db->escape($id), T_XT_FREE, 'user_id'));
	}

	/**
	 * 保存数据
	 *
	 * @param $data array 配置内容,如array('title' => 'xxx', 'text' => 'aaaaaa');
	 * @return boolean
	 *
	 */
	function save($data, $id) {
		if (!empty ($data) && is_array($data)) {
			//删除缓存
			DD('xintao/free.getById');
			$db = & $this->db;
			$db->setTable(T_XT_FREE);
			return RST($db->save($data, $id, '', 'user_id'));
		} else {
			return RST(false, $errno = 1210000, $err = 'Parameter can not be empty');
		}
	}
}