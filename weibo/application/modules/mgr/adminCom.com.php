<?php


/**************************************************
*  Created:  2010-10-27
*
*  文件说明
*
*  @Xweibo (C)1996-2099 SINA Inc.
*  @Author liwen <liwen2@staff.sina.com.cn>
*
***************************************************/
class adminCom {
	/**
	 * 查询付费已绑定独立域名的站点
	 */
	function getAdminsByDomain(){
		$db = APP :: ADP('db');
		$sql = 'SELECT * FROM ' . $db->getPrefix() . T_ADMIN . ' WHERE `group_id`>4 AND domain not like \'%xintaowang.com%\'';
		return RST($db->query($sql));
	}
	/**
	 * 查询所有站点
	 */
	function getAdmins() {
		$db = APP :: ADP('db');
		$sql = 'SELECT * FROM ' . $db->getPrefix() . T_ADMIN . ' WHERE `group_id`>4 ORDER BY `id`';
		return RST($db->query($sql));
	}
	/**
	 * 查询所有站点（根据group）
	 */
	function getAdminsByGroup() {
		$db = APP :: ADP('db');
		$sql = 'SELECT * FROM ' . $db->getPrefix() . T_ADMIN . ' WHERE `group_id`>4 ORDER BY `id`';
		return RST($db->query($sql));
	}
	/**
	 * 根据group_id查询所有已绑定的站点
	 */
	function getAdminsByGroupAndAutoFans() {
		$db = APP :: ADP('db');
		$sql = 'SELECT * FROM ' . $db->getPrefix() . T_ADMIN . ' WHERE `nickname` is not null AND `nickname` !=\'\' AND `access_token` !=\'\' AND `group_id`>4 ORDER BY `id`';
		return RST($db->query($sql));
	}
	/**
	 * 查询已绑定新浪微博的管理员ID列表
	 */
	function getAdminsSinaUidByAutoFans(){
		$db = APP :: ADP('db');
		$sql = 'SELECT distinct(sina_uid) FROM ' . $db->getPrefix() . T_ADMIN . ' WHERE `nickname` is not null AND `nickname` !=\'\' AND `access_token` is not null AND `access_token` !=\'\' ORDER BY `id`';
		return RST($db->query($sql));
	}
	/**
	 * 查询已绑定新浪微博的管理员列表
	 */
	function getAdminsByAutoFans(){
		$db = APP :: ADP('db');
		$sql = 'SELECT * FROM ' . $db->getPrefix() . T_ADMIN . ' WHERE `nickname` is not null AND `nickname` !=\'\' AND `access_token` is not null AND `access_token` !=\'\' ORDER BY `id`';
		return RST($db->query($sql));
	}
	/**
	 * 查询已绑定新浪微博的管理员列表(仅返回user_id与group_id)
	 */
	function getAdminsByAutoCrons(){
		$db = APP :: ADP('db');
		$sql = 'SELECT admin.`user_id`,admin.`group_id`,admin.`appKey`,yx.crons FROM ' . $db->getPrefix() . T_ADMIN . ' admin,'.$db->getTable(T_XT_YINGXIAO).' yx WHERE admin.group_id!=0 AND admin.`nickname` !=\'\' AND admin.`access_token` !=\'\' AND admin.user_id=yx.user_id ORDER BY admin.`id`';
		return RST($db->query($sql));
	}
	/*
	 * 获取管理员数量
	 * @return int
	 */
	function getAdminNum() {
		$db = APP :: ADP('db');
		$select_count = 'SELECT COUNT(*) FROM ' . $db->getPrefix() . T_ADMIN . ' WHERE `user_id` = ' . XT_USER_ID; //fixed by fxy060608 增加userId过滤;
		return RST($db->getOne($select_count));
	}
	/*
	 * 根据USERID获取管理员数据
	 * @param int $sina_uid
	 * @param int $offset
	 * @param int $each
	 * @return array()
	 */
	function getAdminByUserId($userId) {

		$db = APP :: ADP('db');

		$keyword = $db->escape($userId);
		$where = ' WHERE `user_id` = ' . $keyword;

		$sql = 'SELECT * FROM ' . $db->getPrefix() . T_ADMIN . ' LEFT JOIN ' . $db->getTable(T_ADMIN_GROUP) . ' ON group_id=gid' . $where;
		return RST($db->getRow($sql));
	}

	/*
	 * 根据sina_uid获取管理员数据
	 * @param int $sina_uid
	 * @param int $offset
	 * @param int $each
	 * @return array()
	 */
	function getAdminByUid($sina_uid = '', $offset = 0, $each = 1) {
		if (!is_numeric($offset) || !is_numeric($each)) {
			return RST(false, $errno = 1210002, $err = 'Parameter must be a number');
		}

		$db = APP :: ADP('db');

		$keyword = $db->escape($sina_uid);
		$where = ' WHERE `user_id` = ' . XT_USER_ID; //fixed by fxy060608 增加userId过滤
		if ($keyword) {
			$where .= ' AND `sina_uid` = ' . $keyword;
		}

		$sql = 'SELECT * FROM ' . $db->getPrefix() . T_ADMIN . ' LEFT JOIN ' . $db->getTable(T_ADMIN_GROUP) . ' ON group_id=gid' . $where . ' ORDER BY `id` LIMIT ' . $offset . ',' . $each;
		return RST($db->query($sql));
	}

	/*
	 * 管理员删除
	 * @param int $id
	 * @param $is_sina_uid boolean 参数$id是否使用sina_uid
	 * @return boolean
	 */
	function delAdmin($id, $is_sina_uid = false) {
		if (!is_numeric($id)) {
			return RST(false, $errno = 1210002, $err = 'Parameter must be a number');
		}
		$this->_cleanCache();
		$db = APP :: ADP('db');
		$db->setTable(T_ADMIN);
		return RST($db->delete($id, '', ($is_sina_uid ? 'sina_uid' : 'id')));

	}

	/*
	 * 根据id获取管理员信息
	 * @param int $id
	 * @return array()
	 */
	function getAdminById($id) {
		if (!is_numeric($id)) {
			return RST(false, $errno = 1210002, $err = 'Parameter must be a number');
		}

		$db = APP :: ADP('db');

		$sql = 'SELECT * FROM ' . $db->getPrefix() . T_ADMIN . ' WHERE id="' . $id . '" AND user_id="' . XT_USER_ID . '"'; //fixed by fxy060608 增加userId过滤
		return RST($db->getRow($sql));

	}

	/*
	 * 修改,插入管理员数据
	 * @param array $data
	 * @param int $id
	 * @return boolean
	 */
	function saveAdminById($data, $id = '') {
		if (!is_array($data)) {
			return RST(false, $errno = 1210000, $err = 'Parameter can not be empty');
		}
		$this->_cleanCache();
		$db = APP :: ADP('db');
		$db->setTable(T_ADMIN);
		return RST($db->save($data, $id, '', 'id'));
	}
	/*
	 * 修改,插入管理员数据
	 * @param array $data
	 * @param int $id
	 * @return boolean
	 */
	function saveAppstoreById($data) {
		if (!is_array($data)) {
			return RST(false, $errno = 1210000, $err = 'Parameter can not be empty');
		}
		$db = APP :: ADP('db');
		$sql = 'REPLACE ' . $db->getTable(T_XT_APPSTORE) . '(`item_code`,`deadline`,`user_id`) VALUES("' . $data[0] . '","' . $data[1] . '",' . $data[2] . ')';
		$rst = $db->execute($sql);
		return RST($rst);
	}
	/*
	 * 修改,插入管理员数据
	 * @param array $data
	 * @param int $id
	 * @param int $USER_ID(站长标识)
	 * @return boolean
	 */
	function saveAdminByIdAndUserId($data, $id = '', $USER_ID) {
		if (!is_array($data)) {
			return RST(false, $errno = 1210000, $err = 'Parameter can not be empty');
		}
		$this->_cleanCache();
		$db = APP :: ADP('db');
		$db->setTable(T_ADMIN);
		$data['user_id'] = $USER_ID; //fixed by fxy060608 增加userId过滤
		return RST($db->save($data, $id, '', 'user_id=' . $USER_ID . ' and id'));
	}
	/*
	 * 修改
	 * @param array $data
	 * @param int $id
	 * @param int $USER_ID(站长标识)
	 * @return boolean
	 */
	function saveAdminByUserId($data, $USER_ID) {
		if (!is_array($data)) {
			return RST(false, $errno = 1210000, $err = 'Parameter can not be empty');
		}
		$this->_cleanCache();
		$db = APP :: ADP('db');
		$db->setTable(T_ADMIN);
		return RST($db->save($data, $USER_ID, '', 'user_id'));
	}

	/**
	 * 得到组信息
	 *@param $group_id int
	 *@return array
	 */
	function getGroupInfo($group_id) {
		$db = APP :: ADP('db');
		$rs = $db->get($group_id, T_ADMIN_GROUP, 'gid');
		return RST($rs);
	}

	/*
	 * 清除缓存
	 */
	function _cleanCache() {
		DD('mgr/adminCom.getAdminNum');
		DD('mgr/adminCom.getAdminByUid');
		DD('mgr/adminCom.getAdminById');
	}
}