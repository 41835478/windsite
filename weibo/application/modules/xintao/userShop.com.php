<?php


/**
 * 站内店铺数据存储对象
 *
 *  @create 2010/11/6 23:35
 *  @author fxy <fxy060608@gmail.com>
 */
class userShop {

	/**
	 * 数据库操作对象
	 */
	var $db;

	/**
	 * 构造函数，初始化内部使用的对象
	 *
	 */
	function userShop() {
		$this->db = APP :: ADP('db');
		$db = & $this->db;
	}
	/**
	 * 根据isSeller来获取卖家服务店铺列表
	 */
	function getShopBySeller() {
		$db = $this->db;
		$sql = 'SELECT * FROM ' . $db->getPrefix() . T_XT_USER_SHOP . ' WHERE `isSeller`=1 ORDER BY `level` DESC';
		return RST($db->query($sql));
	}

	/**
	 * 根据isSeller,click_url,shop_nums,level排序来获取卖家服务店铺(两个表，user_shop与yingxiao)
	 */
	function getShopBySellerAndUrl() {
		$db = $this->db;
		$sql = 'SELECT s.* FROM ' . $db->getTable(T_XT_USER_SHOP) . ' s,' . $db->getTable(T_XT_YINGXIAO) . ' y WHERE s.`isSeller`=1 AND s.`click_url` is not null AND s.`click_url`!=\'\' AND s.`user_id`=y.`user_id` ORDER BY y.`shop_nums` asc,s.`level` desc';
		return RST($db->getRow($sql));
	}
	/**
	 * 根据isSeller,click_url,shop_nums,level排序来获取卖家服务店铺(两个表，user_shop与yingxiao)
	 */
	function getItemBySellerAndUrl() {
		$db = $this->db;
		$sql = 'SELECT s.* FROM ' . $db->getTable(T_XT_USER_SHOP) . ' s,' . $db->getTable(T_XT_YINGXIAO) . ' y WHERE s.`isSeller`=1 AND s.`isItems`=1 AND s.`click_url` is not null AND s.`click_url`!=\'\' AND s.`user_id`=y.`user_id` ORDER BY y.`item_nums` asc,s.`level` desc';
		return RST($db->getRow($sql));
	}
	/**
	 * 根据SID,userId计数指定淘宝用户
	 */
	function getShopNum($sid, $userId) {
		$db = $this->db;
		$where = array ();
		if ($sid) {
			$where[] = '`sid` = ' . $db->escape($sid);
		}
		if ($userId) {
			$where[] = '`user_id` = ' . $db->escape($userId);
		}
		if (!empty ($where)) {
			$select_count = 'SELECT COUNT(*) FROM ' . $db->getPrefix() . T_XT_USER_SHOP . ' WHERE ' . implode(' AND ', $where);
			return RST($db->getOne($select_count));
		} else {
			return RST(false, $errno = 1210000, $err = 'Parameter can not be empty');
		}
	}
	/**
	 * 根据USERID获取指定站内店铺（信用排序，最多5个）
	 */
	function getByUserId($userId) {
		$db = $this->db;
		$keyword = $db->escape($userId);
		if ($keyword) {
			$where = ' WHERE `user_id` = ' . $keyword; //fixed by fxy060608 增加userId过滤
			$limit = ' LIMIT 0,4';
			$sql = 'SELECT * FROM ' . $db->getPrefix() . T_XT_USER_SHOP . $where . ' ORDER BY `level` DESC ' . $limit;
			return RST($db->query($sql));
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
	function save($data, $sid = '') {
		if (!empty ($data) && is_array($data)) {
			$db = & $this->db;
			$db->setTable(T_XT_USER_SHOP);
			$db->save($data, $sid, '', '`user_id`=' . XT_USER_ID . ' and `sid`');
			return true;
		}
		return false;
	}
	/**
	 * 保存数据
	 *
	 * @param $data array 配置内容,如array('title' => 'xxx', 'text' => 'aaaaaa');
	 * @return boolean
	 *
	 */
	function saveByUserId($data, $sid = '', $USER_ID = '') {
		if (!empty ($data) && is_array($data) && $sid != '' && $USER_ID != '') {
			$db = & $this->db;
			$db->setTable(T_XT_USER_SHOP);
			$db->save($data, $sid, '', '`user_id`=' . $USER_ID . ' and `sid`');
			return true;
		}
		return false;
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
			$sql = 'UPDATE ' . $db->getTable(T_XT_USER_SHOP) . ' SET `isSeller`=1 WHERE `user_id`=' . $db->escape($USER_ID);
		} else {
			$sql = 'UPDATE ' . $db->getTable(T_XT_USER_SHOP) . ' SET `isSeller`=0,`click_url`=null WHERE `user_id`=' . $db->escape($USER_ID);
		}
		return RST($db->execute($sql));
	}
	/**
	 * 设置店铺是否有商品
	 */
	function setIsItems($isItems = 0, $USER_ID = '') {
		if ($USER_ID == '') {
			return;
		}
		$db = APP :: ADP('db');
		if ($isItems == 1) {
			$sql = 'UPDATE ' . $db->getTable(T_XT_USER_SHOP) . ' SET `isItems`=1 WHERE `user_id`=' . $db->escape($USER_ID);
		} else {
			$sql = 'UPDATE ' . $db->getTable(T_XT_USER_SHOP) . ' SET `isItems`=0 WHERE `user_id`=' . $db->escape($USER_ID);
		}
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
		$sql = 'UPDATE ' . $db->getTable(T_XT_USER_SHOP) . ' SET `' . $type . 'nickname`=\'' . $db->escape($nickname) . '\' WHERE `user_id`=' . $db->escape($USER_ID);
		return RST($db->execute($sql));
	}
}