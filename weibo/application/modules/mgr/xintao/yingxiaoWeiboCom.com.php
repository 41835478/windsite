<?php
class yingxiaoWeiboCom {
	var $db = null;
	var $table = null;
	var $count_sql = '';
	var $item_count_sql = '';
	var $item_sql = '';
	function yingxiaoWeiboCom() {
		$this->db = APP :: ADP('db');
		$this->db->setTable(T_XT_USER_SHOP_WEIBO);
		$this->table = $this->db->getTable(T_XT_USER_SHOP_WEIBO);
	}
	/*
	 * 获取商品营销推广数量
	 * @return int
	 */
	function getItemWeiboNum() {
		$db = APP :: ADP('db');
		$select_count = 'SELECT sum(nums) FROM ' . $db->getTable(T_XT_USER_ITEM_WEIBO) . ' WHERE `userid` = ' . XT_USER_ID; //fixed by fxy060608 增加userId过滤;
		return RST($db->getOne($select_count));
	}
	/*
	 * 获取店铺营销推广数量
	 * @return int
	 */
	function getShopWeiboNum($sids = array ()) {
		$count = count($sids);
		if ($count == 0) {
			return $this->_err(2152001, '未指定店铺');
		}
		$where = '';
		if ($count == 1) {
			$where = ' WHERE `sid`=' . $sids[0];
		}
		elseif ($count > 1) {
			$where = ' WHERE `sid` in (' . implode(',', $sids) . ') ';
		}
		$db = APP :: ADP('db');
		$select_count = 'SELECT count(*) FROM ' . $db->getTable(T_XT_USER_SHOP_WEIBO) . $where; //fixed by fxy060608 增加userId过滤;
		return RST($db->getOne($select_count));
	}
	/**
	 * 保存被删除的微博内容
	 */
	function saveDelete($data) {
		if (!is_array($data)) {
			return RST(false, $errno = 1210000, $err = 'Parameter can not be empty');
		}
		$db = APP :: ADP('db');
		$db->setTable('xt_weibo_delete');
		return RST($db->save($data, '', '', 'id'));
	}
	/**
		 * 查询商品营销
		 * @param $rows int 返回的记录行数
		 * @param $offset int 偏移量
	* @param $with boolean 是否返回转发数和评论数 
		 * @return array
		 */
	function getUserItem($rows = 40, $offset = 0) {
		$db = APP :: ADP('db');
		$where = ' WHERE `user_id`=' . XT_USER_ID;
		$this->item_sql = 'SELECT COUNT(*) FROM ' . $db->getTable(T_XT_USER_ITEM) . $where;
		$sql = 'SELECT * FROM ' . $db->getTable(T_XT_USER_ITEM) . $where . ' ORDER BY `isValid` DESC,(`nums`+`qq_nums`+`sh_nums`+`wy_nums`) DESC,`volume` DESC LIMIT ' . (int) $offset . ',' . (int) $rows;
		return RST($db->query($sql));
	}
	/**
	 * 统计记录总数,由用于查询的方法提供统计的SQL，该方法只用于执行指定的SQL
	 * @return int
	 */
	function getUserItemCount() {
		if ($this->item_sql) {
			$db = APP :: ADP('db');
			$rst = $db->getOne($this->item_sql);
			return RST($rst);
		}
		return $this->_err(2152001, '统计记录数时，前置的查询方法没有提供用于统计的SQL');
	}
	/**
		 * 查询商品营销微博
		 * @param $rows int 返回的记录行数
		 * @param $offset int 偏移量
	* @param $with boolean 是否返回转发数和评论数 
		 * @return array
		 */
	function getItemWeibo($rows = 20, $offset = 0, $with = false) {
		$db = APP :: ADP('db');
		$where = ' WHERE `userid`=' . XT_USER_ID;
		$this->item_count_sql = 'SELECT COUNT(*) FROM ' . $db->getTable(T_XT_USER_ITEM_WEIBO) . $where;
		$sql = 'SELECT * FROM ' . $db->getTable(T_XT_USER_ITEM_WEIBO) . $where . ' ORDER BY `addtime` DESC LIMIT ' . (int) $offset . ',' . (int) $rows;
		$rs = $db->query($sql);

		$data = array ();
		for ($i = 0, $count = count($rs); $i < $count; $i++) {
			$rs[$i]['comments'] = $rs[$i]['rt'] = 0;
			$data[$rs[$i]['id']] = $rs[$i];
		}
		if ($with && $data) {
			$id = array ();
			foreach ($data as $key => $row) {
				$id[] = $key;
			}
			DR('xweibo/xwb.setToken', '', 2);
			$rs = DR('xweibo/xwb.getCounts', '', implode(',', $id));
			if ($rs['errno'] == 0) {
				$rs = $rs['rst'];
				$count = count($rs);
				for ($i = 0; $i < $count; $i++) {
					$data[$rs[$i]['id']]['comments'] = isset ($rs[$i]) ? $rs[$i]['comments'] : 0;
					$data[$rs[$i]['id']]['rt'] = isset ($rs[$i]) ? $rs[$i]['rt'] : 0;
				}
			}
		}
		return $data;
	}
	/**
	 * 统计记录总数,由用于查询的方法提供统计的SQL，该方法只用于执行指定的SQL
	 * @return int
	 */
	function getItemCount() {
		if ($this->item_count_sql) {
			$db = APP :: ADP('db');
			$rst = $db->getOne($this->item_count_sql);
			return RST($rst);
		}
		return $this->_err(2152001, '统计记录数时，前置的查询方法没有提供用于统计的SQL');
	}
	/**
		 * 查询店铺营销微博
		 * @param $sids string 店铺IDS
		 * @param $rows int 返回的记录行数
		 * @param $offset int 偏移量
	* @param $with boolean 是否返回转发数和评论数 
		 * @return array
		 */
	function getShopWeibo($sids = array (), $rows = 20, $offset = 0, $with = false) {
		$count = count($sids);
		if ($count == 0) {
			return $this->_err(2152001, '未指定店铺');
		}
		$where = '';
		if ($count == 1) {
			$where = ' WHERE `sid`=' . $sids[0];
		}
		elseif ($count > 1) {
			$where = ' WHERE `sid` in (' . implode(',', $sids) . ') ';
		}
		$this->count_sql = 'SELECT COUNT(*) FROM ' . $this->table . $where;
		$sql = 'SELECT * FROM ' . $this->table . $where . ' ORDER BY `addtime` DESC LIMIT ' . (int) $offset . ',' . (int) $rows;
		$rs = $this->db->query($sql);

		$data = array ();
		for ($i = 0, $count = count($rs); $i < $count; $i++) {
			$rs[$i]['comments'] = $rs[$i]['rt'] = 0;
			$data[$rs[$i]['id']] = $rs[$i];
		}
		if ($with && $data) {
			$id = array ();
			foreach ($data as $key => $row) {
				$id[] = $key;
			}
			DR('xweibo/xwb.setToken', '', 2);
			$rs = DR('xweibo/xwb.getCounts', '', implode(',', $id));
			if ($rs['errno'] == 0) {
				$rs = $rs['rst'];
				$count = count($rs);
				for ($i = 0; $i < $count; $i++) {
					$data[$rs[$i]['id']]['comments'] = isset ($rs[$i]) ? $rs[$i]['comments'] : 0;
					$data[$rs[$i]['id']]['rt'] = isset ($rs[$i]) ? $rs[$i]['rt'] : 0;
				}
			}
		}
		return $data;
	}
	/**
	 * 统计记录总数,由用于查询的方法提供统计的SQL，该方法只用于执行指定的SQL
	 * @return int
	 */
	function getCount() {
		if ($this->count_sql) {
			$rst = $this->db->getOne($this->count_sql);
			return RST($rst);
		}
		return $this->_err(2152001, '统计记录数时，前置的查询方法没有提供用于统计的SQL');
	}
}