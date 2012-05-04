<?php
function wkey($user_id = 0) {
	if ($user_id > 0) {
		$wKey = CACHE :: get(TB_CACHE_KEY_PRE . 'wKey_' . $user_id); //缓存
		if (empty ($wKey)) {
			$db = APP :: ADP('db');
			$sql = 'SELECT wKey FROM ' . $db->getTable(T_ADMIN) . ' WHERE `user_id`=' . $user_id;
			$wKey = $db->getOne($sql);
			if (empty ($wKey)) { //如果为空，则生成
				$wKey = APP :: N('tools/mstring')->randString(4);
				$sql = 'SELECT count(*) FROM ' . $db->getTable(T_ADMIN) . ' WHERE `wKey`=\'' . $wKey . '\'';
				$count = $db->getOne($sql);
				if ($count == 0) { //保存
					DS('mgr/adminCom.saveAdminByUserId', '', array (
						'wKey' => $wKey
					), $user_id);
					CACHE :: set(TB_CACHE_KEY_PRE . 'wKey_' . $user_id, $wKey, 0); //永久
				} else {
					$wKey = '';
				}
			}
		}
		return $wKey;
	}
	return '';
}