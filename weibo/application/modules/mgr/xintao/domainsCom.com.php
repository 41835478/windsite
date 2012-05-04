<?php
class domainsCom {
	/*
	 * 获取要审核的独立域名列表
	 */
	function getDomains($status = 0) {
		$db = APP :: ADP('db');
		$where = ' WHERE status=' . $status;
		if ($status) {

		}
		$sql = 'SELECT * FROM ' . $db->getPrefix() . T_XT_DOMAINS . $where . ' ORDER BY `id` DESC';
		return RST($db->query($sql));
	}
	/*
	 * 获取指定的独立域名
	 */
	function getDomain($userId) {
		$db = APP :: ADP('db');
		$where = ' WHERE user_id=' . $userId;
		$sql = 'SELECT * FROM ' . $db->getPrefix() . T_XT_DOMAINS . $where;
		return RST($db->getRow($sql));
	}
	/*
	 * 获取要审核的补偿列表
	 */
	function getBuchangs($status = 0) {
		$db = APP :: ADP('db');
		$where = ' WHERE status=' . $status;
		if ($status) {

		}
		$sql = 'SELECT * FROM ' . $db->getPrefix() . T_XT_BUCHANG . $where . ' ORDER BY `created` DESC';
		return RST($db->query($sql));
	}
	function getBuchang($nick) {
		$db = APP :: ADP('db');
		$where = ' WHERE `nick`=\'' . $nick . '\'';
		$sql = 'SELECT * FROM ' . $db->getPrefix() . T_XT_BUCHANG . $where;
		return RST($db->getRow($sql));
	}
	function buchangSave($data, $nick = '') {
		if (!is_array($data)) {
			return RST(false, $errno = 1210000, $err = 'Parameter can not be empty');
		}
		$db = APP :: ADP('db');
		$db->setTable(T_XT_BUCHANG);
		if ($data['status'] == 1) { //审核通过，需要设置先配置域名配置文件，再保存
			$BUCHANG = include_once (dirname(__FILE__) . '/../../../../xintao/buchang.php'); //补偿列表
			$data['appstore'] = $BUCHANG[$nick];
			if (F('xintao.set_buchang_config', $data)) {
				$result = $db->save($data, '\'' . $nick . '\'', '', 'nick'); //更新状态
				if ($result) {
					$appstore = array (
						XT_APPSTORE_FREE
					);
					$dateline = date("Y-m-d", strtotime("$d +30 day"));
					if ($data['appstore'] == 'appstore-10911-1') { //付费普及版
						$appstore = array (
							XT_APPSTORE_FREE,
							XT_APPSTORE_TAOKE
						);
					}
					elseif ($data['appstore'] == 'appstore-10911-2') { //返利版
						$appstore = array (
							XT_APPSTORE_FREE,
							XT_APPSTORE_TAOKE
						);
						$dateline = date("Y-m-d", strtotime("$d +45 day"));
					}
					elseif ($data['appstore'] == 'appstore-10911-3') { //卖家版
						$appstore = array (
							XT_APPSTORE_FREE,
							XT_APPSTORE_SELLER_MULTI
						);
					}
					F('xintao.set_betas_config', $nick, array (
						'appstore' => $appstore,
						'dateline' => $dateline
					));
					return RST($result);
				} else {
					return RST(false);
				}
			} else {
				return RST(false);
			}
		} else {
			$result = '';
			if ($data['status'] == 0 && $data['remark'] == '') { //0为新增
				$BUCHANG = include_once (dirname(__FILE__) . '/../../../../xintao/buchang.php'); //补偿列表
				$data['appstore'] = $BUCHANG[$nick];
				$data['nick'] = $nick;
				$data['created'] = date("Y-m-d H:m:s", time());
				$db->save($data, '', '', 'nick');
				$result = 1;
			} else { //2为审核拒绝
				$db->save($data, $nick, '', 'nick');
			}
			if ($result) {
				return RST($result);
			} else {
				return RST(false);
			}
		}
	}
	/*
	 * 修改，插入独立域名审核
	 * @param array $data
	 * @param int $id
	 * @return boolean
	 */
	function saveDomainById($data, $id = '') {
		if (!is_array($data)) {
			return RST(false, $errno = 1210000, $err = 'Parameter can not be empty');
		}
		$db = APP :: ADP('db');
		$db->setTable(T_XT_DOMAINS);
		if ($data['status'] == 1) { //审核通过，需要设置先配置域名配置文件，再保存
			if (F('xintao.set_domain_config', $data)) {
				$result = $db->save($data, $id, '', 'id'); //更新状态
				if ($result) {
					//更新站长域名
					DS('mgr/adminCom.saveAdminByUserId', '', array (
						'domain' => $data['domain']
					), $data['user_id'], $data['user_id']);
					//TODO 更改ico名称，配置
					F('xintao.update_config_file', array (
						'XT_SITE_DOMAIN' => $data['domain']
					), $data['user_id']); //更新
					return RST($result);
				} else {
					return RST(false);
				}
			} else {
				return RST(false);
			}
		} else {
			$result = $db->save($data, $id, '', 'id');
			if ($result) {
				return RST($result);
			} else {
				return RST(false);
			}
		}
	}
	/*
	 * 域名删除
	 * @param int $id
	 * @return boolean
	 */
	function delDomain($id) {
		if (!is_numeric($id)) {
			return RST(false, $errno = 1210002, $err = 'Parameter must be a number');
		}
		$db = APP :: ADP('db');
		$db->setTable(T_XT_DOMAINS);
		return RST($db->delete($id));

	}

}