<?php


/**************************************************
*  Created:  2012-02-01
*
*  MongoDB
*
*
***************************************************/

class mongo_db {
	var $db;
	function mongo_db() {
		$m = new Mongo("mongodb://mongoc2.grandcloud.cn:10007", array (
			"persist" => "xintaotv"
		));
		$this->db = $m->xintaotv;
		$this->db->authenticate('xintaotv', 'i8c8e5u8y4');
	}
	function getUser($userId) {
		if (is_numeric($userId)) {
			return $this->db->user->findOne(array (
				"_id" => $userId
			));
		}
		return array ();
	}
	function synUser($user) {
		if (!empty ($user)) {
			$c = $this->db->user;
			$_user = $this->getUser($user['_id']);
			if (empty ($_user)) {
				$c->insert($user);
			} else {
				$user['visits'] = isset ($_user['visits']) ? ($_user['visits'] + 1) : (1);
				$c->update(array (
					'_id' => $_user['_id']
				), $user);
			}
		}
	}
}
?>