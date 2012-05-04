<?php


/**
 * 免费数据存储对象
 *
 *  @create 2010/11/6 23:35
 *  @author fxy <fxy060608@gmail.com>
 */
class adItem {

	/**
	 * 数据库操作对象
	 */
	var $db;

	/**
	 * 构造函数，初始化内部使用的对象
	 *
	 */
	function adItem() {
		$this->db = APP :: ADP('db');
		$db = & $this->db;
	}
	/**
		 * 根据分类获取推广商品
		 */
	function getTopItems() {
		$db = APP :: ADP('db');
		$sql = 'SELECT * FROM ' . $db->getTable(T_XTTV_ADITEM);
		return RST($db->query($sql));
	}
	/**
	 * 根据分类获取推广商品
	 */
	function getByCat($cat, $limit = 5) {
		$db = APP :: ADP('db');
		$sql = 'SELECT * FROM ' . $db->getTable(T_XTTV_ADITEM) . ' WHERE `cat`="' . $db->escape($cat) . '" ORDER BY RAND() LIMIT ' . $limit;
		return RST($db->query($sql));
	}
	/**
	 * 根据分类获取推广商品
	 */
	function getById($cat, $id) {
		$db = APP :: ADP('db');
		$sql = 'SELECT * FROM ' . $db->getTable(T_XTTV_ADITEM) . ' WHERE `cat`="' . $db->escape($cat) . '" AND `id`=' . $db->escape($id);
		return RST($db->getRow($sql));
	}

	/**
	 * 保存数据
	 *
	 * @param $data array 配置内容,如array('title' => 'xxx', 'text' => 'aaaaaa');
	 * @return boolean
	 *
	 */
	function save($cat, $data, $id) {
		if (!empty ($data) && is_array($data)) {
			//删除缓存
			$db = & $this->db;
			$db->setTable(T_XTTV_ADITEM);
			return RST($db->save($data, $id, '', 'cat="' . $db->escape($cat) . '" AND id'));
		} else {
			return RST(false, $errno = 1210000, $err = 'Parameter can not be empty');
		}
	}
}