<?php


/**
 * 淘客商品数据存储对象
 *
 *  @create 2010/11/6 23:35
 *  @author fxy <fxy060608@gmail.com>
 */
class taokeItem {

	/**
	 * 数据库操作对象
	 */
	var $db;
	var $item_count_sql = '';
	var $taoke_item_nid_count = '';

	/**
	 * 构造函数，初始化内部使用的对象
	 *
	 */
	function taokeItem() {
		$this->db = APP :: ADP('db');
		$db = & $this->db;
	}
	
	/**
		 * 查询淘客商品营销微博
		 * @param $rows int 返回的记录行数
		 * @param $offset int 偏移量
		 * @return array
		 */
	function getTaokeItemWeibo($rows = 20, $offset = 0) {
		$db = APP :: ADP('db');
		$where = ' WHERE weibo.`user_id`=' . XT_USER_ID;
		$this->item_count_sql = 'SELECT COUNT(*) FROM ' . $db->getTable(T_XT_TAOKE_ITEM_WEIBO) . ' weibo ' . $where;
		$sql = 'SELECT copy.*,weibo.qq_id,weibo.sh_id,weibo.wy_id FROM ' . $db->getTable(T_WEIBO_COPY) . ' copy,' . $db->getTable(T_XT_TAOKE_ITEM_WEIBO) . ' weibo ' . $where . ' AND copy.id=weibo.id ORDER BY weibo.`id` DESC LIMIT ' . (int) $offset . ',' . (int) $rows;
		$rs = $db->query($sql);
		$data = array ();
		for ($i = 0, $count = count($rs); $i < $count; $i++) {
			$rs[$i]['comments'] = $rs[$i]['rt'] = 0;
			$data[$rs[$i]['id']] = $rs[$i];
		}
		return $data;
	}
	/**
	 * 统计记录总数,由用于查询的方法提供统计的SQL，该方法只用于执行指定的SQL
	 * @return int
	 */
	function getCount() {
		if ($this->item_count_sql) {
			$db = APP :: ADP('db');
			$rst = $db->getOne($this->item_count_sql);
			return RST($rst);
		}
		return $this->_err(2152001, '统计记录数时，前置的查询方法没有提供用于统计的SQL');
	}
	/**
	 * 查询指定站点的商品营销
	 */
	function getItems() {
		$db = $this->db;
		$sql = 'SELECT * FROM ' . $db->getTable(T_XT_TAOKE_ITEM) . ' WHERE `user_id`=' . XT_USER_ID . ' ORDER BY `isValid` desc,`nums` desc,`volume` desc';
		return RST($db->query($sql));
	}
	/**
		 * 查询指定站点的商品营销(单个)
		 */
	function getItem() {
		$db = $this->db;
		$sql = 'SELECT * FROM ' . $db->getTable(T_XT_TAOKE_ITEM) . ' WHERE `user_id`=' . XT_USER_ID . ' AND `isValid`=1 AND `today_nums`=0 ORDER BY `nums` asc,`volume` desc';
		return RST($db->getRow($sql));
	}
	/**
	 * 查询指定站点的商品营销
	 */
	function deleteItems($num_iids) {
		if (!$num_iids) {
			return RST(false, $errno = 1210002, $err = 'Parameter must be a number');
		}
		$db = $this->db;
		$sql = 'DELETE FROM ' . $db->getTable(T_XT_TAOKE_ITEM) . ' WHERE `nid` in (' . $num_iids . ') AND `user_id`=' . XT_USER_ID;
		return RST($db->query($sql));
	}

	/**
	 * 查询指定站点的商品营销
	 */
	function getItemsCount() {
		$db = $this->db;
		$sql = 'SELECT COUNT(*) FROM ' . $db->getTable(T_XT_TAOKE_ITEM) . ' WHERE `user_id`=' . XT_USER_ID;
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
		$sql = 'SELECT COUNT(*) FROM ' . $db->getTable(T_XT_TAOKE_ITEM) . ' WHERE `nid`=' . $nid . ' AND `user_id`=' . XT_USER_ID;
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
			$db->setTable(T_XT_TAOKE_ITEM);
			$db->save($data, $nid, '', '`user_id`=' . XT_USER_ID . ' AND nid');
			return true;
		}
		return false;
	}
	

	/**
	 * 清理0商品
	 */
	function clearNums() {
		$db = APP :: ADP('db');
		$sql = 'DELETE FROM ' . $db->getTable(T_XT_TAOKE_ITEM) . ' WHERE (`nums`=0) AND `user_id`=' . XT_USER_ID;
		return RST($db->execute($sql));
	}

}