<?php


/**
 * 新淘通用数据存储对象
 *
 *  @create 2010/11/6 23:35
 *  @author fxy <fxy060608@gmail.com>
 */
class xintao {

	/**
	 * 构造函数，初始化内部使用的对象
	 *
	 */
	function xintao() {
	}
	/**
	 * 查询当前用户GROUP_ID
	 */
	function getGroupId($user_id) {
		$db = APP :: ADP('db');
		$sql = 'SELECT `nickname` as sina,`group_id`,`user_nick` as nick,`wy_name` as wy,`sh_nick` as sh,`qq_name` as qq FROM ' . $db->getPrefix() . T_ADMIN . ' WHERE `user_id`=' . $user_id;
		return $db->getRow($sql);
	}
	/**
	 * 推广过商品的淘客数量
	 */
	function getItemYingxiaoWeiboTaoke($user_id) {
		$db = APP :: ADP('db');
		$sql = 'SELECT count(distinct(`nickname`)) FROM ' . $db->getPrefix() . T_XT_USER_ITEM_WEIBO . '_' . (substr($user_id, strlen($user_id) - 1)) . ' WHERE `userid`=' . $user_id;
		return RST($db->getOne($sql));
	}
	/**
	 * 推广过店铺的淘客数量
	 */
	function getShopYingxiaoWeiboTaoke($sid) {
		$db = APP :: ADP('db');
		$sql = 'SELECT count(distinct(`nickname`)) FROM ' . $db->getTable(T_XT_USER_SHOP_WEIBO) . ' WHERE `sid`=' . $sid;
		return RST($db->getOne($sql));
	}
	/**
	 * 所有微博帐号
	 */
	function getWeiboAccount() {
		//TODO 目前以开通微购的会员显示，稍后平台绑定帐号增多时，以真实数据显示
		$db = APP :: ADP('db');
		$sql = 'SELECT count(*) FROM ' . $db->getTable(T_ADMIN);
		return RST($db->getOne($sql));
	}
	/**
	 * 微博营销(所有)
	 */
	function getWeiboYingxiao() {
		$db = APP :: ADP('db');
		$result = array ();
		$count = 0;
		for ($i = 0; $i < 10; $i++) { //查找10个分表中每个表的微博数量
			$sql = 'SELECT count(*) FROM ' . $db->getPrefix() . T_WEIBO_COPY . '_' . $i;
			$count = $count + $db->getOne($sql);
		}
		return RST($count);
	}
	/**
	 * 我的店铺营销数
	 */
	function getMyShopYingxiao() {
		$db = APP :: ADP('db');
		$sql = ' SELECT sum(`nums`+`qq_nums`+`sh_nums`+`wy_nums`) as nums FROM ' . $db->getTable(T_XT_USER_SHOP) . ' WHERE `user_id`=' . XT_USER_ID;
		return RST($db->getOne($sql));
	}
	/**
	 * 我的商品营销数
	 */
	function getMyItemYingxiao() {
		$db = APP :: ADP('db');
		$sql = ' SELECT sum(`nums`) as nums FROM ' . $db->getTable(T_XT_USER_ITEM_WEIBO) . ' WHERE `userid`=' . XT_USER_ID;
		return RST($db->getOne($sql));
	}
	/**
	 * 我的微博营销数
	 */
	function getMyWeiboYingxiao() {
		$db = APP :: ADP('db');
		$sql = ' SELECT count(*) as nums FROM ' . $db->getTable(T_WEIBO_COPY) . ' WHERE `user_id`=' . XT_USER_ID;
		return RST($db->getOne($sql));
	}
	/**
	 * 店铺营销
	 */
	function getShopYingxiaoTop10() {
		$db = APP :: ADP('db');
		$sql = ' SELECT (`nums`+`qq_nums`+`sh_nums`+`wy_nums`) as nums,`nick`,`sid`,`user_id`,`title`,`isSeller`,`nickname`,`qq_nickname`,`sh_nickname`,`wy_nickname` FROM ' . $db->getTable(T_XT_USER_SHOP) . ' order by (`nums`+`qq_nums`+`sh_nums`+`wy_nums`) DESC LIMIT 10';
		$result = $db->query($sql);
		// 查找当前卖家的淘客数
		$results = array ();
		foreach ($result as $row) {
			$temp = array ();
			$temp['sid'] = $row['sid'];
			$temp['nick'] = $row['nick'];
			$temp['nums'] = $row['nums'];
			$temp['title'] = $row['title'];
			$temp['user_id'] = $row['user_id'];
			$temp['isSeller'] = $row['isSeller'];
			$ret = $this->getShopYingxiaoWeiboTaoke($row['sid']);
			$temp['taokes'] = $ret['rst'];
			$temp['sina'] = $row['nickname'];
			$temp['qq'] = $row['qq_nickname'];
			$temp['sh'] = $row['sh_nickname'];
			$temp['wy'] = $row['wy_nickname'];
			$temp['wKey'] = F('wkey', $row['user_id']);
			$results[] = $temp;
		}
		return RST($results);

	}
	/**
	 * 商品营销
	 */
	function getItemYingxiaoTop10() {
		$db = APP :: ADP('db');
		$result = array ();
		for ($i = 0; $i < 10; $i++) { //查找10个分表中每个表的前20个
			$sql = ' SELECT sum(`nums`) as nums,`userid` as user_id FROM ' . $db->getPrefix() . T_XT_USER_ITEM_WEIBO . '_' . $i . ' GROUP BY `userid` ORDER BY sum(`nums`) DESC LIMIT 20';
			$rs = $db->query($sql);
			foreach ($rs as $row) {
				$nums = $row['nums'];
				$userid = $row['user_id'];
				$result[$userid] = $nums;
			}
		}
		arsort($result);
		// 排序，且取前10个
		$result = array_slice($result, 0, 10, true);
		// 查找当前卖家的淘客数
		$results = array ();
		foreach ($result as $user_id => $nums) {
			$temp = array ();
			$temp['user_id'] = $user_id;
			$temp['nums'] = $nums;
			$ret = $this->getItemYingxiaoWeiboTaoke($user_id);
			$temp['taokes'] = $ret['rst'];
			$user = $this->getGroupId($user_id);
			$temp['nick'] = $user['nick'];
			$temp['isSeller'] = $user['group_id'] > 4 ? 1 : 0;
			$temp['sina'] = $user['sina'];
			$temp['qq'] = $user['qq'];
			$temp['sh'] = $user['sh'];
			$temp['wy'] = $user['wy'];
			$temp['wKey'] = F('wkey', $user_id);
			$results[] = $temp;
		}
		return RST($results);
	}
	/**
	 * 微博营销
	 */
	function getWeiboYingxiaoTop10() {
		$db = APP :: ADP('db');
		$result = array ();
		for ($i = 0; $i < 10; $i++) { //查找10个分表中每个表的前20个
			$sql = 'SELECT count(*) nums,`user_id` FROM ' . $db->getPrefix() . T_WEIBO_COPY . '_' . $i . ' GROUP BY `user_id` ORDER BY count(*) DESC LIMIT 20';
			$rs = $db->query($sql);
			foreach ($rs as $row) {
				$user_id = $row['user_id'];
				$nums = $row['nums'];
				if (isset ($result[$user_id])) {
					$result[$user_id] = $result[$user_id] + $nums;
				} else {
					$result[$user_id] = $nums;
				}
			}
		}
		arsort($result);
		// 排序，且取前10个
		$result = array_slice($result, 0, 10, true);
		$rows = $db->query('SELECT `domain`,`user_nick`,`user_id`,`group_id` FROM ' . $db->getTable(T_ADMIN) . ' WHERE `user_id` in (' . (implode(',', array_keys($result))) . ')');
		$array = array ();
		foreach ($result as $key => $value) {
			$user = array ();
			$user['user_id'] = $key;
			$user['nums'] = $value;
			foreach ($rows as $row) {
				if ($row['user_id'] == $key) {
					$user['domain'] = $row['domain'];
					$user['nick'] = $row['user_nick'];
					$user['isSeller'] = $row['group_id'] > 4 ? 1 : 0;
					break;
				}
			}
			$array[] = $user;
		}
		return RST($array);
	}
	/**
	 * 查询淘宝客会员人数
	 */
	function getTaokeNums() {
		$db = APP :: ADP('db');
		$select_count = 'SELECT COUNT(*) FROM ' . $db->getTable(T_ADMIN) . ' WHERE `sid` is null';
		return RST($db->getOne($select_count));
	}
	/**
	 * 查询配置了淘客商品推广的卖家人数
	 */
	function getTaokeItemSellerNums() {
		$db = APP :: ADP('db');
		$select_count = 'SELECT COUNT(*) FROM ' . $db->getTable(T_XT_YINGXIAO) . ' WHERE `user_id` in(SELECT `user_id` FROM ' . $db->getTable(T_ADMIN) . ' WHERE `sid` >0 AND `sina_uid` >0) AND `metadata` like \'%item%\'';
		$db->checksql_set(array (
			'sub_select_allow' => true,
			'union_select_allow' => true
		));
		return RST($db->getOne($select_count));
	}
	/**
	 * 查询配置了淘客店铺推广的卖家人数
	 */
	function getTaokeShopSellerNums() {
		$db = APP :: ADP('db');
		$select_count = 'SELECT COUNT(*) FROM ' . $db->getTable(T_XT_YINGXIAO) . ' WHERE `user_id` in(SELECT `user_id` FROM ' . $db->getTable(T_ADMIN) . ' WHERE `sid` >0 AND `sina_uid` >0) AND `metadata` like \'%shop%\'';
		$db->checksql_set(array (
			'sub_select_allow' => true,
			'union_select_allow' => true
		));
		return RST($db->getOne($select_count));
	}

}