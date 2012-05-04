<?php


/**************************************************
*  Created:  2010-06-08
*
*  fxy060608
*
*  @Xintao 
*  @Author fxy <fxy060608@gmail.com>
*
***************************************************/
include_once ('xintaoTv.abs.php');
class xintaotv_mod extends xintaoTv {
	var $m;
	function xintaotv_mod() {
		parent :: action();
		$this->m = APP :: N('mongo_db');
	}
	function buildconnection() {
		if (!USER :: isTvLogin()) {
			exit ('202');
		} else {
			exit ('200');
		}
	}
	function synUser() {
		if (!USER :: isTvLogin()) {
			exit ('202');
		}
		if (USER :: get('__CLIENT_XTTV_SYNUSER') != 1) {
			exit ('201');
		}
		USER :: set('__CLIENT_XTTV_SYNUSER', 0);
		$params = array (
			'nick' => USER :: tvNick()
		);
		$tvSession = USER :: tvSession();
		if (isset ($tvSession) && !empty ($tvSession)) {
			$params['session'] = $tvSession;
		}
		$user = F('top.userGet', -999, '淘宝用户信息同步', $params, true, false);
		$data = array ();
		if ($user) {
			$data = array (
				'_id' => $user['user_id'],
				'username' => $user['nick'],
				'sex' => isset ($user['sex']) ? $user['sex'] : '',
				'avatar' => isset ($user['avatar']) ? $user['avatar'] : '',
				'created' => $user['created'],
				'last_visit' => $user['last_visit'],
				'type' => $user['type'],
				'buyer_credit' => '',
				'seller_credit' => '',
				'sid' => '',
				'title' => '',
				'pic_path' => '',
				'item_score' => '',
				'service_score' => '',
				'delivery_score' => '',
				'pid' => '',
				'lastVisit' => date("Y-m-d H:m:s", time()),
				'visits' => 1
			);
			//买家/买家信用
			$buyer = $user['buyer_credit'];
			if ($buyer) {
				$data['buyer_credit'] = $buyer['level'];
			}
			$seller = $user['seller_credit'];
			if ($seller) {
				$data['seller_credit'] = $seller['level'];
			}
			//同步店铺信息
			if ($user['has_shop'] == 'true') { //有店铺
				$shop = F('top.shopGet', -999, '淘宝店铺信息同步', array (
					'nick' => $user['nick']
				), true, false);
				if ($shop) {
					$data['sid'] = $shop['sid'];
					$data['title'] = $shop['title'];
					$data['pic_path'] = $shop['pic_path'];
					$score = $shop['shop_score'];
					if ($score) {
						$data['item_score'] = $score['item_score'];
						$data['service_score'] = $score['service_score'];
						$data['delivery_score'] = $score['delivery_score'];
						if ($data['item_score'] != '0.0') {
							F('get_xintaotv_last_shops.add_xintaotv_last_shops', $data);
						}
					}
				}
			}
			if (!empty ($data)) {
				USER :: tvSid($data['sid']);
				USER :: tvPid($data['pid']);
				USER :: tvTitle($data['title']);
				$this->m->synUser($data);
				exit ('200');
			}
		}
	}
	function clearHistory() {
		if (!USER :: isTvLogin()) {
			exit ('202');
		}
		$userId = USER :: tvId();
		$userNick = USER :: tvNick();
		$id = V('p:id');
		if (!empty ($id)) {
			DS('mgr/xintao/tvHistory.deleteTvHistoryById', '', $userId, $id);
		} else {
			DS('mgr/xintao/tvHistory.deleteTvHistories', '', $userId);
		}
		exit ('200');
	}

	function history() {
		if (!USER :: isTvLogin()) {
			exit ('202');
		}
		$userId = USER :: tvId();
		$userNick = USER :: tvNick();

		$title = V('p:title', '');
		if (empty ($title)) {
			exit ('201');
		}
		$vid = V('p:vid', '');
		if (!empty ($vid)) {
			$history = DS('mgr/xintao/tvHistory.getTvHistoryByVid', '', $userId, $vid);
			if (empty ($history)) { //新增
				DS('mgr/xintao/tvHistory.save', '', $userId, array (
					'vid' => $vid,
					'dateline' => time(),
					'title' => $title,
					'user_id' => $userId,
					'user_nick' => USER :: tvNick()
				));
			} else {
				DS('mgr/xintao/tvHistory.save', '', $userId, array (
					'dateline' => time(),
					'title' => $title
				), $history['id']);
			}
		} else {
			$bid = V('p:bid', '');
			if (!empty ($bid)) {
				$history = DS('mgr/xintao/tvHistory.getTvHistoryByBid', '', $userId, $bid);
				if (empty ($history)) { //新增
					DS('mgr/xintao/tvHistory.save', '', $userId, array (
						'bid' => $bid,
						'dateline' => time(),
						'title' => $title,
						'user_id' => $userId,
						'user_nick' => USER :: tvNick()
					));
				} else {
					DS('mgr/xintao/tvHistory.save', '', $userId, array (
						'dateline' => time(),
						'title' => $title
					), $history['id']);
				}
			}
		}
		exit ('200');
	}
	function topCallback() {
		$ret = TB('top/TopClient.newValidateSession');
		if ($ret === false) {
			APP :: tips(array (
				'msg' => '当前请求不正确',
				'tpl' => 'mgr/error',
				'baseskin' => false,
				'location' => TB_XTTV_CONTAINER
			));
		}
		if (empty ($ret['userId'])) {
			header("Location:http://www.xintaotv.com");
			exit;
		}
		$user = DS('mgr/xintao/tvUser.getTvUser', '', $ret['userId']);
		if (empty ($user)) { //新增，插入
			DS('mgr/xintao/tvUser.save', '', $ret['userId'], array (
				'id' => $ret['userId'],
				'user_nick' => $ret['nick'],
				'tSession' => $ret['session'],
				'sid' => $ret['sid'],
				'pid' => $ret['pid']
			));
		} else {
			DS('mgr/xintao/tvUser.save', '', $ret['userId'], array (
				'tSession' => $ret['session']
			), $ret['userId']);
		}
		session_regenerate_id(); //防御Session Fixation
		USER :: tvId($ret['userId']);
		USER :: tvNick($ret['nick']);
		USER :: tvSession($ret['session']);
		USER :: set('__CLIENT_XTTV_SYNUSER', 1);
		$isModule = V('g:type', '');
		$isModule = ($isModule == 'module' ? 'true' : 'false');
		USER :: set('isModule', $isModule);
		if (!empty ($user)) {
			USER :: tvSid($user['sid']);
			USER :: tvPid($user['pid']);
			USER :: tvTitle($user['title']);
		}
		header("Location:http://www.xintaotv.com/teleplay");
		exit;
	}
}