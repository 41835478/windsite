<?php


/**
 * 影视数据存储对象
 *
 *  @create 2010/11/6 23:35
 *  @author fxy <fxy060608@gmail.com>
 */
class tv {

	/**
	 * 数据库操作对象
	 */
	var $db;

	/**
	 * 构造函数，初始化内部使用的对象
	 *
	 */
	function tv() {
		$this->db = APP :: ADP('db');
		$db = & $this->db;
	}

	/**
	 * 根据标识获取影视记录
	 */
	function getByVid($vid) {
		if (!is_numeric($vid)) {
			return RST(false, $errno = 1210002, $err = 'Parameter must be a number');
		}
		$db = $this->db;
		return RST($db->get($db->escape($vid), T_XT_TV, 'vid'));
	}

	/**
	 * 保存数据
	 *
	 * @param $data array 配置内容,如array('title' => 'xxx', 'text' => 'aaaaaa');
	 * @return boolean
	 *
	 */
	function save($data, $vid) {
		if (!empty ($data) && is_array($data)) {
			$db = & $this->db;
			$db->setTable(T_XT_TV);
			return RST($db->save($data, $vid, '', 'vid'));
		} else {
			return RST(false, $errno = 1210000, $err = 'Parameter can not be empty');
		}
	}
}