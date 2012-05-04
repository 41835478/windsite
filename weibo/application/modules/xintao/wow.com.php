<?php


/**
 * 分享存储对象
 *
 *  @create 2010/11/6 23:35
 *  @author fxy <fxy060608@gmail.com>
 */
class wow {

	/**
	 * 数据库操作对象
	 */
	var $db;
	var $count_sql = '';
	var $wowTables = array (
		1 => T_XT_WOW_LADY,
		2 => T_XT_WOW_MAN,
		3 => T_XT_WOW_LIFE,
		4 => T_XT_WOW_IDEA
	);

	/**
	 * 构造函数，初始化内部使用的对象
	 *
	 */
	function wow() {
		$this->db = APP :: ADP('db');
		$db = & $this->db;
	}
	function getTaokeItemCat($USER_ID = '') {
		if (!$USER_ID) {
			$USER_ID = XT_USER_ID;
		}
		$db = APP :: ADP('db');
		$sql = 'SELECT * FROM ' . $db->getTable(T_XT_WOW_TAOKE_ITEM_CAT) . ' WHERE `user_id`=' . $USER_ID . ' ORDER BY `sortOrder` asc';
		return RST($db->query($sql));
	}
	function getWowTaokeItemList($cat = '', $offset = 0, $each = 20) {
		$db = APP :: ADP('db');
		$where = ' WHERE `isValid` = 1 AND `user_id`=' . XT_USER_ID;
		if ($cat != '') {
			$where = $where . ' AND `cat` = ' . $db->escape($cat);
		}
		$taoke_item_sql = 'SELECT COUNT(*) FROM ' . $db->getTable(T_XT_WOW_TAOKE_ITEM) . $where;
		$sql = 'SELECT * FROM ' . $db->getTable(T_XT_WOW_TAOKE_ITEM) . $where . ' ORDER BY `volume` DESC LIMIT ' . (int) $offset . ',' . (int) $each;
		return array (
			'items' => $db->query($sql),
			'count' => $db->getOne($taoke_item_sql)
		);
	}
	function getWowUserItems($USER_ID, $offset = 0, $rows = 40) {
		$db = APP :: ADP('db');
		$where = ' WHERE user_id =' . $USER_ID;
		$count_sql = 'SELECT COUNT(*) FROM ' . $db->getPrefix() . (T_XT_WOW_USER_ITEM) . '_' . (substr($USER_ID, strlen($USER_ID) - 1)) . $where;
		$sql = 'SELECT * FROM ' . $db->getPrefix() . (T_XT_WOW_USER_ITEM) . '_' . (substr($USER_ID, strlen($USER_ID) - 1)) . $where . '  ORDER BY `volume` DESC LIMIT ' . (int) $offset . ',' . (int) $rows;
		return array (
			'items' => $db->query($sql),
			'count' => $db->getOne($count_sql)
		);
	}
	function getWowShops() {
		$db = APP :: ADP('db');
		$sql = 'SELECT * FROM ' . $db->getTable(T_XT_USER_SHOP) . ' WHERE `isSeller`=1 AND click_url !=\'\' ORDER BY `level` DESC';
		return RST($db->query($sql));
	}
	function getWowShop($USER_ID) {
		$db = APP :: ADP('db');
		$sql = 'SELECT * FROM ' . $db->getTable(T_XT_USER_SHOP) . ' WHERE `isSeller`=1 AND click_url !=\'\' AND user_id=' . $USER_ID;
		return RST($db->getRow($sql));
	}
	function getWowShopTitle($USER_ID) {
		$db = APP :: ADP('db');
		$sql = 'SELECT title FROM ' . $db->getTable(T_XT_USER_SHOP) . ' WHERE user_id=' . $USER_ID;
		return RST($db->getOne($sql));
	}
	function updateShareItemNums($cat, $nid) {
		$table = $this->wowTables[$cat];
		if (empty ($table)) {
			return RST('');
		}
		$db = APP :: ADP('db');
		$sql = 'UPDATE ' . $db->getTable($table) . ' SET `nums`=`nums`+1 ' . ' WHERE `nid`=' . $db->escape($nid);
		return RST($db->execute($sql));
	}
	/**
		 * 获取一条随机商品分享（根据已发布数量降序，addtime降序，share_nums降序）
		 */
	function getRandomShare($cat, $cats) {
		$db = APP :: ADP('db');
		$cats = explode(',', $cats);
		$cat2 = array_rand($cats, 1);
		$table = $this->wowTables[$cat];
		if (empty ($table)) {
			return RST('');
		}
		$sql = 'SELECT * FROM ' . $db->getTable($table) . ' WHERE `cat`=' . $cats[$cat2] . ' ORDER BY `nums` ASC,`addtime` DESC,`share_nums` DESC';
		return RST($db->getRow($sql));
	}
	/**
	 * 查询分享商品
	 * @param $rows int 返回的记录行数
	 * @param $offset int 偏移量
	 * @return array
	 */
	function getWowTaokeItem($cat1 = 0, $cat2 = 0, $rows = 40, $offset = 0) {
		$db = APP :: ADP('db');
		$where = '';
		if (!is_numeric($cat1)) {
			$cat1 = 1;
		}
		if (!is_numeric($cat2)) {
			$cat2 = 0;
		}
		$table = $this->wowTables[$cat1];
		if (empty ($table)) {
			$table = $this->wowTables[1];
		}
		if ($cat2 > 0) {
			$where = ' WHERE cat=' . $db->escape($cat2) . ' ';
		}
		$this->count_sql = 'SELECT COUNT(*) FROM ' . $db->getTable($table) . $where;
		$sql = 'SELECT * FROM ' . $db->getTable($table) . $where . ' ORDER BY `addtime` DESC,`share_nums` DESC LIMIT ' . (int) $offset . ',' . (int) $rows;
		return array (
			'items' => $db->query($sql),
			'count' => $db->getOne($this->count_sql)
		);
	}
	/**
		 * 统计记录总数,由用于查询的方法提供统计的SQL，该方法只用于执行指定的SQL
		 * @return int
		 */
	function getCount() {
		if ($this->count_sql) {
			$db = APP :: ADP('db');
			$rst = $db->getOne($this->count_sql);
			return RST($rst);
		}
		return $this->_err(2152001, '统计记录数时，前置的查询方法没有提供用于统计的SQL');
	}
	function getByIdCount($cat, $id) {
		$db = APP :: ADP('db');
		$select_count = 'SELECT COUNT(*) FROM ' . $db->getTable($this->wowTables[$cat]) . ' WHERE `nid` = ' . $id;
		return RST($db->getOne($select_count));
	}
	/**
	 * 根据标识获取分享商品
	 */
	function getById($cat, $id) {
		if (!is_numeric($id)) {
			return RST(false, $errno = 1210002, $err = 'Parameter must be a number');
		}
		$db = $this->db;
		return RST($db->get($db->escape($id), $this->wowTables[$cat], 'nid'));
	}

	/**
	 * 保存数据
	 *
	 * @param $data array 配置内容,如array('title' => 'xxx', 'text' => 'aaaaaa');
	 * @return boolean
	 *
	 */
	function save($cat, $data, $id = '') {
		if (!empty ($data) && is_array($data)) {
			$db = & $this->db;
			$db->setTable($this->wowTables[$cat]);
			return RST($db->save($data, $id, '', 'nid'));
		} else {
			return RST(false, $errno = 1210000, $err = 'Parameter can not be empty');
		}
	}
}