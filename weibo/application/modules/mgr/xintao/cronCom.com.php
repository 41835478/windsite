<?php
class cronCom {
	/**
	 * 查询超时的自动微博发布（同时删除）
	 */
	function getWeiboCrons() {
		$db = APP :: ADP('db');
		$where = ' WHERE `addtime` <= ' . APP_LOCAL_TIMESTAMP;
		$sql = 'SELECT * FROM ' . $db->getTable(T_XT_WEIBO_CRON) . $where;

		$result = $db->query($sql);
		if (!empty ($result)) {
			//同时删除
			$ids = array ();
			foreach ($result as $row) {
				$ids[] = $row['id'];
			}
			$db->execute('DELETE FROM ' . $db->getTable(T_XT_WEIBO_CRON) . ' WHERE `id` in (' . implode(',', $ids) . ')');
		}
		return RST($result);
	}
	/**
	 * 更新淘客自主商品分享数量
	 */
	function updateTaokeItemNums($id = '') {
		$db = APP :: ADP('db');
		$sql = 'UPDATE ' . $db->getTable(T_XT_TAOKE_ITEM) . ' SET `nums`=`nums`+1,`today_nums`=`today_nums`+1 WHERE `nid`=' . $db->escape($id) . ' AND `user_id`=' . XT_USER_ID;
		return RST($db->execute($sql));
	}
	/**
	 * 更新商品被分享数量
	 */
	function updateUserItemNums($id = '', $USER_ID = '', $isQQ = false, $isSH = false, $isWY = false) {
		if ($id == '') {
			return;
		}
		$updates = array (
			'`nums`=`nums`+1'
		);
		if ($USER_ID == XT_USER_ID) { //如果发布者和商品拥有者是同一个人
			$updates[] = '`today_nums`=`today_nums`+1';
		}
		if ($isQQ) {
			$updates[] = '`qq_nums`=`qq_nums`+1';
		}
		if ($isSH) {
			$updates[] = '`sh_nums`=`sh_nums`+1';
		}
		if ($isWY) {
			$updates[] = '`wy_nums`=`wy_nums`+1';
		}
		$db = APP :: ADP('db');
		$sql = 'UPDATE ' . $db->getPrefix() . T_XT_USER_ITEM . '_' . (substr($USER_ID, strlen($USER_ID) - 1)) . ' SET ' . implode(',', $updates) . ' ' . ' WHERE `nid`=' . $db->escape($id);
		return RST($db->execute($sql));
	}
	/**
	 * 更新店铺被分享数量
	 */
	function updateUserShopNums($id = '', $isQQ = false, $isSH = false, $isWY = false) {
		if ($id == '') {
			return;
		}
		$updates = array (
			'`nums`=`nums`+1'
		);
		if ($isQQ) {
			$updates[] = '`qq_nums`=`qq_nums`+1';
		}
		if ($isSH) {
			$updates[] = '`sh_nums`=`sh_nums`+1';
		}
		if ($isWY) {
			$updates[] = '`wy_nums`=`wy_nums`+1';
		}
		$db = APP :: ADP('db');
		$sql = 'UPDATE ' . $db->getTable(T_XT_USER_SHOP) . ' SET ' . implode(',', $updates) . ' ' . ' WHERE `sid`=' . $db->escape($id);
		return RST($db->execute($sql));
	}
	/**
	 * 更新笑话被分享数量
	 */
	function updateXiaohuaNums($id = '') {
		if ($id == '') {
			return;
		}
		$db = APP :: ADP('db');
		$sql = 'UPDATE ' . $db->getTable(T_XT_XIAOHUA) . ' SET `nums`=`nums`+1 ' . ' WHERE `id`=' . $db->escape($id);
		return RST($db->execute($sql));
	}
	/**
	 * 更新画报被分享数量
	 */
	function updatePosterNums($id = '') {
		if ($id == '') {
			return;
		}
		$db = APP :: ADP('db');
		$sql = 'UPDATE ' . $db->getTable(T_XT_POSTER) . ' SET `nums`=`nums`+1 ' . ' WHERE `id`=' . $db->escape($id);
		return RST($db->execute($sql));
	}
	/**
	 * 更新视频被分享数量
	 */
	function updateTvNums($id = '') {
		if ($id == '') {
			return;
		}
		$db = APP :: ADP('db');
		$sql = 'UPDATE ' . $db->getTable(T_XT_TV) . ' SET `nums`=`nums`+1 ' . ' WHERE `vid`=' . $db->escape($id);
		return RST($db->execute($sql));
	}

	/**
	 * 获取一条随机笑话（根据已发布数量降序，ID降序，分类）
	 */
	function getRandomXiaohua($cats, $isShort = false) {
		$db = APP :: ADP('db');
		$cat = array_rand($cats, 1);
		$where = ' WHERE `type`= ' . $cats[$cat] . ' ' . ($isShort == true ? 'AND `cSize`<=300' : '') . ' ORDER BY `nums` asc,`id` desc';
		$sql = 'SELECT * FROM ' . $db->getPrefix() . T_XT_XIAOHUA . $where;
		return RST($db->getRow($sql));
	}
	/**
	 * 获取一条随机画报（根据已发布数量降序，ID降序，分类）
	 */
	function getRandomPoster($cats, $isShort = false) {
		$db = APP :: ADP('db');
		$cat = array_rand($cats, 1);
		$where = ' WHERE `channel_id`= ' . $cats[$cat] . '  ORDER BY `nums` asc,`id` desc';
		$sql = 'SELECT * FROM ' . $db->getPrefix() . T_XT_POSTER . $where;
		return RST($db->getRow($sql));
	}
	/**
	 * 获取一条随机视频（根据已发布数量降序，ID降序，分类）
	 */
	function getRandomTv($cats, $isShort = false) {
		$db = APP :: ADP('db');
		$cat = array_rand($cats, 1);
		$where = ' WHERE `cat`= ' . $cats[$cat] . '  ORDER BY `nums` asc,`vid` desc';
		$sql = 'SELECT * FROM ' . $db->getPrefix() . T_XT_TV . $where;
		return RST($db->getRow($sql));
	}

	/**
	 * 查询一条营销配置
	 */
	function getYingxiao($userId) {
		$db = APP :: ADP('db');
		$keyword = $db->escape($userId);
		$where = ' WHERE `user_id` = ' . $keyword;
		$sql = 'SELECT * FROM ' . $db->getPrefix() . T_XT_YINGXIAO . $where;
		return RST($db->getRow($sql));
	}
	/**
	 * 重置每日营销数量
	 */
	function resetYingxiaoNums() {
		$db = APP :: ADP('db');
		$sql = 'UPDATE ' . $db->getTable(T_XT_YINGXIAO) . ' SET `shop_nums`=0,`item_nums`=0 ';
		return RST($db->execute($sql));
	}
	/**
	 * 递加每日店铺营销数量
	 */
	function updateYingxiaoShopNums($USER_ID) {
		$db = APP :: ADP('db');
		$sql = 'UPDATE ' . $db->getTable(T_XT_YINGXIAO) . ' SET `shop_nums`=`shop_nums`+1 ' . ' WHERE `user_id`=' . $db->escape($USER_ID);
		return RST($db->execute($sql));
	}
	/**
	 * 递加每日商品营销数量
	 */
	function updateYingxiaoItemNums($USER_ID) {
		$db = APP :: ADP('db');
		$sql = 'UPDATE ' . $db->getTable(T_XT_YINGXIAO) . ' SET `item_nums`=`item_nums`+1 ' . ' WHERE `user_id`=' . $db->escape($USER_ID);
		return RST($db->execute($sql));
	}
	/*
	 * 修改，插入营销配置
	 * @param array $data
	 * @param int $id
	 * @return boolean
	 */
	function saveYingxiao($data, $id = '') {
		if (!is_array($data)) {
			return RST(false, $errno = 1210000, $err = 'Parameter can not be empty');
		}
		$db = APP :: ADP('db');
		$db->setTable(T_XT_YINGXIAO);
		return RST($db->save($data, $id, '', 'user_id'));
	}
	/*
	 * 获取已启用的自动营销数量
	 * @return int
	 */
	function getAutoCronNum() {
		$db = APP :: ADP('db');
		$select_count = 'SELECT COUNT(*) FROM ' . $db->getTable(T_XT_CRON) . ' WHERE `isValid`=1 AND `user_id` = ' . XT_USER_ID; //fixed by fxy060608 增加userId过滤;
		return RST($db->getOne($select_count));
	}
	/*
	 * 获取定时事件
	 */
	function getCron($id = 0, $isValid = '') {
		if (!is_numeric($id)) {
			return RST(false, $errno = 1210002, $err = 'Parameter must be a number');
		}
		$db = APP :: ADP('db');
		$where = array ();
		$where[] = '`user_id`=' . XT_USER_ID;
		if ($id > 0) {
			$where[] = ' `id`=' . $db->escape($id);
		}
		if ($isValid === true) {
			$where[] = '`isValid`=1';
		}
		elseif ($isValid === false) {
			$where[] = '`isValid`=0';
		}
		$sql = 'SELECT * FROM ' . $db->getTable(T_XT_CRON) . ' WHERE ' . implode(' AND ', $where) . ' ORDER BY `id` ASC';
		return RST($db->query($sql));
	}
	/**
	 * 获取自动发布微博事件
	 */
	function getAutoCron($USER_ID = '') {
		$db = APP :: ADP('db');
		$where = array (
			'`user_id`=' . ($USER_ID ? $USER_ID : XT_USER_ID),
			'`type`=\'auto\''
		);
		$sql = 'SELECT * FROM ' . $db->getTable(T_XT_CRON) . ' WHERE ' . implode(' AND ', $where) . ' ORDER BY `id` ASC';
		return RST($db->query($sql));
	}
	/*
	 * 修改，插入定时事件
	 * @param array $data
	 * @param int $id
	 * @return boolean
	 */
	function save($data, $id = '') {
		if (!is_array($data)) {
			return RST(false, $errno = 1210000, $err = 'Parameter can not be empty');
		}
		//清除缓存
		$this->_cleanCache();
		$db = APP :: ADP('db');
		$db->setTable(T_XT_CRON);
		return RST($db->save($data, $id, '', 'id'));
	}
	function updateAutoCronNums($id = '') {
		if ($id == '') {
			return;
		}
		$db = APP :: ADP('db');
		$sql = 'UPDATE ' . $db->getTable(T_XT_CRON) . ' SET `nums`=`nums`+1 ' . ' WHERE `id`=' . $db->escape($id) . ' AND `type`=\'auto\' AND `user_id`=' . XT_USER_ID;
		return RST($db->execute($sql));
	}
	/*
	 * 清除缓存
	 */
	function _cleanCache() {
		DD('mgr/xintao/cronCom.getAutoCron');
	}

}