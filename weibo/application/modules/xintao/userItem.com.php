<?php


/**
 * 站内店铺数据存储对象
 *
 *  @create 2010/11/6 23:35
 *  @author fxy <fxy060608@gmail.com>
 */
class userItem {

	/**
	 * 数据库操作对象
	 */
	var $db;

	/**
	 * 构造函数，初始化内部使用的对象
	 *
	 */
	function userItem() {
		$this->db = APP :: ADP('db');
		$db = & $this->db;
	}
	/**
	 * 查询指定站点的商品营销
	 */
	function getItems($type = 0) {
		$db = $this->db;
		$sql = 'SELECT * FROM ' . $db->getTable(T_XT_USER_ITEM) . ' WHERE `user_id`=' . XT_USER_ID . ' 	AND `type`=' . $type . ' ORDER BY `isValid` desc,`nums` desc,`volume` desc LIMIT 40';
		return RST($db->query($sql));
	}
	/**
	 * 查询指定站点的商品营销
	 */
	function deleteItems($num_iids) {
		if (!$num_iids) {
			return RST(false, $errno = 1210002, $err = 'Parameter must be a number');
		}
		$db = $this->db;
		$sql = 'DELETE FROM ' . $db->getTable(T_XT_USER_ITEM) . ' WHERE `nid` in (' . $num_iids . ') AND `user_id`=' . XT_USER_ID;
		return RST($db->query($sql));
	}
	/**
	 * 查询指定站点的商品营销
	 */
	function getItemsCount($type = 1) {
		$db = $this->db;
		$sql = 'SELECT COUNT(*) FROM ' . $db->getTable(T_XT_USER_ITEM) . ' WHERE `user_id`=' . XT_USER_ID . ' 	AND `type`=' . $type;
		return RST($db->getOne($sql));
	}

	/**
	 * 查询指定站点的商品营销(淘客商品)
	 */
	function getItemCount($nid) {
		if (!is_numeric($nid)) {
			return RST(false, $errno = 1210002, $err = 'Parameter must be a number');
		}
		$db = $this->db;
		$sql = 'SELECT COUNT(*) FROM ' . $db->getTable(T_XT_USER_ITEM) . ' WHERE `nid`=' . $nid . ' AND `user_id`=' . XT_USER_ID;
		return RST($db->getOne($sql));
	}
	/**
	 * 查询指定站点的商品营销
	 */
	function getByUserId($USER_ID = '') {
		if ($USER_ID == '') {
			return RST(false, $errno = 1210000, $err = 'Parameter can not be empty');
		}
		$db = $this->db;
		$sql = 'SELECT * FROM ' . $db->getTable(T_XT_USER_ITEM) . ' WHERE `user_id`=' . $USER_ID . ' AND `isValid`=1 AND `today_nums`=0 ORDER BY `type` desc,`nums` asc,`volume` desc';
		return RST($db->getRow($sql));
	}
	/**
	 * 查询随机站点的商品营销(淘客商品)
	 */
	function getRandomItem() {
		$db = $this->db;
		$sql = 'SELECT * FROM ' . $db->getPrefix() . T_XT_USER_ITEM . '_' . rand(0, 9) . ' WHERE isSeller=1 AND `isValid`=1 AND `click_url` != \'\' ORDER BY `type` desc,`nums` asc,`volume` desc';
		return RST($db->getRow($sql));
	}
	/**
	 * 查询指定站点的商品营销(淘客商品)
	 */
	function getItemBySellerAndUrl($USER_ID) {
		$db = $this->db;
		$sql = 'SELECT * FROM ' . $db->getPrefix() . T_XT_USER_ITEM . '_' . (substr($USER_ID, strlen($USER_ID) - 1)) . ' WHERE `user_id`=' . $USER_ID . ' AND `isSeller`=1 AND `isValid`=1 AND `click_url`!=\'\' ORDER BY `type` desc,`nums` asc,`volume` desc';
		return RST($db->getRow($sql));
	}
	/**
	 * 根据NumIid获取商品记录
	 */
	function getByNumIid($nid = '') {
		if ($nid == '') {
			return RST(false, $errno = 1210000, $err = 'Parameter can not be empty');
		}
		$db = $this->db;
		$sql = 'SELECT * FROM ' . $db->getTable(T_XT_USER_ITEM) . ' WHERE `nid`=' . $nid;
		return RST($db->query($sql));
	}

	/**
	 * 根据NumIid获取商品记录
	 */
	function getCountByNumIid($nid) {
		if ($nid == '') {
			return RST(false, $errno = 1210000, $err = 'Parameter can not be empty');
		}
		$db = $this->db;
		$sql = 'SELECT COUNT(*) FROM ' . $db->getTable(T_XT_USER_ITEM) . ' WHERE `nid`=' . $nid;
		return RST($db->getOne($sql));
	}

	/**
	 * 保存数据
	 *
	 * @param $data array 配置内容,如array('title' => 'xxx', 'text' => 'aaaaaa');
	 * @return boolean
	 *
	 */
	function save($data, $nid = '') {
		if (!empty ($data) && is_array($data)) {
			$db = & $this->db;
			$db->setTable(T_XT_USER_ITEM);
			$db->setIgnoreInsert(true);
			$db->save($data, $nid, '', 'nid');
			return true;
		}
		return false;
	}
	/**
		 * 设置店铺是否为卖家
		 */
	function setIsValid($USER_ID = '') {
		if ($USER_ID == '') {
			return;
		}
		$db = APP :: ADP('db');
		$sql = 'UPDATE ' . $db->getTable(T_XT_USER_ITEM) . ' SET `isValid`=0,`today_nums`=0 WHERE `user_id`=' . $db->escape($USER_ID);
		return RST($db->execute($sql));
	}
	/**
	 * 设置店铺是否为卖家
	 */
	function setIsSeller($isSeller = 0, $USER_ID = '') {
		if ($USER_ID == '') {
			return;
		}
		$db = APP :: ADP('db');
		if ($isSeller == 1) {
			$sql = 'UPDATE ' . $db->getTable(T_XT_USER_ITEM) . ' SET `isSeller`=1 WHERE `user_id`=' . $db->escape($USER_ID);
		} else {
			$sql = 'UPDATE ' . $db->getTable(T_XT_USER_ITEM) . ' SET `isSeller`=0,`click_url`=null WHERE `user_id`=' . $db->escape($USER_ID);
		}
		return RST($db->execute($sql));
	}
	/**
	 * 清理0商品
	 */
	function clearNums() {
		$db = APP :: ADP('db');
		$sql = 'DELETE FROM ' . $db->getTable(T_XT_USER_ITEM) . ' WHERE (`nums`=0 AND `type`=0) AND `user_id`=' . XT_USER_ID;
		return RST($db->execute($sql));
	}
	/**
	 * 设置店铺是否为卖家
	 */
	function setNickName($nickname = '', $USER_ID = '', $type = '') {
		if ($nickname == '' || $USER_ID == '') {
			return;
		}
		$db = APP :: ADP('db');
		$sql = 'UPDATE ' . $db->getTable(T_XT_USER_ITEM) . ' SET `' . $type . 'nickname`=\'' . $db->escape($nickname) . '\' WHERE `user_id`=' . $db->escape($USER_ID);
		return RST($db->execute($sql));
	}
}