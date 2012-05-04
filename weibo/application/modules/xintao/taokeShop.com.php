<?php


/**
 * 淘客店铺数据存储对象
 *
 *  @create 2010/11/6 23:35
 *  @author fxy <fxy060608@gmail.com>
 */
class taokeShop {

	/**
	 * 数据库操作对象
	 */
	var $db;

	/**
	 * 构造函数，初始化内部使用的对象
	 *
	 */
	function taokeShop() {
		$this->db = APP :: ADP('db');
		$db = & $this->db;
	}

	/**
	 * 根据USERIDS获取指定淘宝客店铺
	 */
	function getByUserIds($userIds) {
		$db = $this->db;
		$keyword = $db->escape($userIds);
		$where = '';
		if ($keyword) {
			$where .= ' WHERE `userId` in (' . $keyword . ')';
		} else {
			return RST(false, $errno = 1210000, $err = 'Parameter can not be empty');
		}
		$sql = 'SELECT * FROM windsite.t_' . T_XT_TAOKESHOP . ' ' . $where . ' ORDER BY `sellerCredit`*1 desc';
		return RST($db->query($sql));
	}

	/**
	 * 保存数据
	 *
	 * @param $data array 配置内容,如array('title' => 'xxx', 'text' => 'aaaaaa');
	 * @return boolean
	 *
	 */
	function save($data) {
		if (!empty ($data) && is_array($data)) {

			$db = & $this->db;

			foreach ($data as $key => $val) {
				$sql = 'update ' . $db->getTable() . ' set `value`="' . $db->escape($val) . '" where `key`="' . $key . '" and `group_id`=' . $this->config_group . ' and `user_id` = ' . XT_USER_ID; //fixed by fxy060608 增加userId过滤;

				$db->execute($sql);
			}

			return true;
		}

		return false;
	}
}