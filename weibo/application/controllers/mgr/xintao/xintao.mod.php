<?php
include (P_ADMIN_MODULES . '/action.abs.php');
class xintao_mod extends action {

	function xintao_mod() {
		parent :: action();
	}
	function default_action() {
		TPL :: display('mgr/xintao/version', '', 0, false);
	}
	function weigoulog() {
		TPL :: display('mgr/xintao/log', '', 0, false);
	}
	function upgrade() {
		TPL :: display('mgr/xintao/upgrade', '', 0, false);
	}
	function analytics() {
		TPL :: display('mgr/xintao/analytics', '', 0, false);
	}
	function cancelBind() {
		$type = V('p:type', '');
		switch ($type) {
			case 'sina' :
				F('account_proxy.clear', WB_USER_OAUTH_TOKEN, WB_USER_OAUTH_TOKEN_SECRET, XT_USER_ID);
				break;
			case 'qq' :
				F('account_proxy.clear_qq', XT_USER_ID);
				break;
			case 'sh' :
				F('account_proxy.clear_sh', XT_USER_ID);
				break;
			case 'wy' :
				F('account_proxy.clear_wy', XT_USER_ID);
				break;
		}
		exit ('{"state":"200"}');
	}
	function checkIp() {
		$domain = V('p:domain', '');
		if (!empty ($domain)) {
			$ip = gethostbyname(trim($domain));
			if ($ip == '223.4.88.215') {
				exit ('{"state":"200"}');
			}
		}
		exit ('{"state":"201"}');
	}
	function openAppstore() {
		TPL :: display('mgr/xintao/360Appstore', '', 0, false);
	}
	function top() {
		TPL :: display('mgr/xintao/top10', '', 0, false);
	}
	function demo() {
		TPL :: assign('m', V('g:module', ''));
		TPL :: display('mgr/xintao/demo', '', 0, false);
	}
	function setIsSimple() {
		$isSimple = V('p:isSimple', 'false');
		F('xintao.update_config_file', array (
			'XT_IS_SIMPLE' => $isSimple == 'true' ? 'true' : 'false'
		), XT_USER_ID); //更新PID
		APP :: ajaxRst('设置成功');
		exit;
	}
	function setIsItemClose() {
		$isClose = V('p:isClose', 'false');
		F('xintao.update_config_file', array (
			'XT_IS_ITEMCLOSED' => $isClose == 'true' ? 'true' : 'false'
		), XT_USER_ID); //更新PID
		if ($isClose == 'true') { //删除所有自动营销
			$db = APP :: ADP('db');
			$sql = 'DELETE FROM ' . $db->getTable(T_XT_USER_ITEM) . ' WHERE (`type`=0) AND `user_id`=' . XT_USER_ID;
			$db->execute($sql);
		}
		APP :: ajaxRst('设置成功');
		exit;
	}
	/**
	 * 设置视频广告是否显示卖家商品
	 */
	function setIsTVPlayAd() {
		$config_arr = array (
			'XT_TVAD_IS_SELLER' => V('p:isSeller', 'isSeller') == 'isSeller' ? 'true' : 'false'
		);
		F('xintao.update_config_file', $config_arr, XT_USER_ID); //更新PID
		APP :: ajaxRst('设置成功');
		exit;
	}
	function taokeReport() {
		TPL :: display('mgr/xintao/taokeReport', '', 0, false);
	}
	function synTaokeShop() {
		$state = 202;
		if (XT_IS_SELLER == 'true' && XT_FREE_DATELINE == '' && XT_SID != '') {
			$shops = DS('xintao/userShop.getByUserId', '', XT_USER_ID);
			if (empty ($shops)) {
				$shops = array (
					array (
						'sid' => XT_SID,
						'user_id' => XT_USER_ID,
						'isItems' => 1,
						'click_url' => 1
					)
				);
				//主要为了我那个该死的测试帐号
			}
			if (is_array($shops) && !empty ($shops)) {
				foreach ($shops as $shop) {
					//第一步：同步淘客店铺
					$isTaoke = true;
					$taokeShops = F('top.taobaokeShopsConvert', -999, '未知模块', array (
						'sids' => $shop['sid']
					), true);
					if (!empty ($taokeShops) && count($taokeShops) == 1) {
						if (empty ($shop['click_url'])) {
							$rs = DR('xintao/userShop.saveByUserId', '', array (
								'click_url' => $taokeShops[0]['click_url']
							), $shop['sid'], $shop['user_id']);
						}
						F('xintao.update_config_file', array (
							'XT_IS_TAOKE_SHOP' => 'true'
						), XT_USER_ID); //更新PID
						$state = 200;
					} else { //清空
						$isTaoke = false;
						$rs = DR('xintao/userShop.saveByUserId', '', array (
							'click_url' => null
						), $shop['sid'], $shop['user_id']);
						F('xintao.update_config_file', array (
							'XT_IS_TAOKE_SHOP' => 'false'
						), XT_USER_ID); //更新PID
						$state = 201;
					}
				}
				//第二步：同步淘客商品
				if ($isTaoke && $shop['isItems'] == 0) {
					F('user_item.synUserItem');
				}
			}
		}
		exit ('{"state":"' . $state . '"}');
	}
	/**
	 * 同步淘宝信息（需识别是否已订购拥有初始化其他表的服务）
	 */
	function initXintao() {
		F('wkey', XT_USER_ID); //同步WKEY
		$nick = $_POST['nick'];
		if (empty ($nick)) {
			$nick = XT_USER_NICK;
		}
		$GROUP_ID = 4;
		if (XT_FREE_DATELINE != '') { //体验版
			$GROUP_ID = 3;
		}
		elseif (XT_IS_MULTI == 'true') { //卖家
			$GROUP_ID = 7;
		}
		elseif (XT_IS_TAOKE == 'true') { //淘客
			$GROUP_ID = 5;
		}
		DS('mgr/adminCom.saveAdminByUserId', '', array (
			'group_id' => $GROUP_ID
		), XT_USER_ID);
		//获取PID
		if (XT_USER_PID == '') {
			$url = F('top.taobaokeCaturlGet', -999, 'PID同步', array (
				'cid' => '0',
				'nick' => $nick
			));
			if ($url) {
				$url = parse_url($url, PHP_URL_QUERY);
				if ($url) {
					$params = array ();
					parse_str($url, $params);
					if ($params) {
						//数据库
						DS('mgr/adminCom.saveAdminByUserId', '', array (
							'pid' => $params['pid']
						), XT_USER_ID);
						//配置文件
						$config_arr = array (
							'XT_USER_PID' => $params['pid'],
							'XT_USER_SPID' => str_replace('mm_', '', str_replace('_0_0', '', $params['pid']))
						);
						F('xintao.update_config_file', $config_arr, XT_USER_ID); //更新PID
					}
				}
			}
		}
		//同步淘宝用户信息
		$user = F('top.userGet', -999, '淘宝用户信息同步', array (
			'session' => USER :: get('tb_session')
		), true, false);
		if ($user) {
			$shop = array ();
			$data = array (
				'user_id' => $user['user_id'],
				'nick' => $user['nick'],
				'created' => $user['created'],
				'last_visit' => $user['last_visit'],
				'type' => $user['type'],
				'status' => $user['status'],
				'alipay_no' => $user['alipay_no'],
				//'avatar' => $user['avatar'],
	'has_shop' => $user['has_shop'],
				'email' => $user['email'],
				'online_gaming' => $user['online_gaming']
			);
			//买家/买家信用
			$buyer = $user['buyer_credit'];
			if ($buyer) {
				$data['buyer_credit'] = $buyer['level'];
			} else {
				$data['buyer_credit'] = '';
			}
			$seller = $user['seller_credit'];
			if ($seller) {
				$data['seller_credit'] = $seller['level'];
			} else {
				$data['seller_credit'] = '';
			}

			$rs = DR('xintao/taobaoUser.getUserNum', '', XT_USER_ID);
			if ($rs['rst'] > 0) {
				$rs = DR('xintao/taobaoUser.save', '', $data, XT_USER_ID);
			} else {
				$rs = DR('xintao/taobaoUser.save', '', $data);
			}
			//同步店铺信息
			if ($user['has_shop'] == 'true') { //有店铺
				$shop = F('top.shopGet', -999, '淘宝店铺信息同步', array (
					'nick' => XT_USER_NICK
				), true, false);
				if ($shop) {
					//数据库
					DS('mgr/adminCom.saveAdminByUserId', '', array (
						'sid' => $shop['sid']
					), XT_USER_ID);
					$data = array (
						'sid' => $shop['sid'],
						'title' => $shop['title'],
						'cid' => $shop['cid'],
						'nick' => $shop['nick'],
						'level' => $data['seller_credit'],
						'pic_path' => $shop['pic_path'],
						'user_id' => XT_USER_ID,
						'isSeller' => (XT_IS_MULTI == 'true' ? 1 : 0),
						'nickname' => SYSTEM_SINA_USERNICK
					);
					if (XT_IS_MULTI != 'true') { //如果不是卖家服务，则清空店铺推广链接
						$data['click_url'] = '';
					}
					$score = $shop['shop_score'];
					if ($score) {
						$data['item_score'] = $score['item_score'];
						$data['service_score'] = $score['service_score'];
						$data['delivery_score'] = $score['delivery_score'];
					}
					$rs = DR('xintao/userShop.getShopNum', '', $shop['sid'], XT_USER_ID);
					if ($rs['rst'] > 0) { //更新
						$rs = DR('xintao/userShop.save', '', $data, $shop['sid']);
					} else { //新增
						$rs = DR('xintao/userShop.save', '', $data);
					}
					if (XT_SID == '') { //如果还未设置
						F('xintao.update_config_file', array (
							'XT_SID' => $shop['sid']
						), XT_USER_ID); //更新SID	
					}
				}
			}
			//写入站内店铺信息进入配置,只有订购了指定服务的卖家用户才初始化sids，shops
			$config_arr = array ();
			//if ((XT_IS_MULTI == 'true')) { //多店铺
			$rs = DR('xintao/userShop.getByUserId', '', XT_USER_ID);
			$shops = $rs['rst'];
			if (!empty ($shops)) {
				$sids = array ();
				$nicks = array ();
				$cids = array ();
				foreach ($shops as $key) {
					$sids[] = '[' . $key['sid'] . ']';
					$nicks[] = '[' . $key['nick'] . ']';
					$cids[] = '[' . $key['cid'] . ']';
				}
				$config_arr = array (
					'XT_SIDS' => implode(',', $sids),
					'XT_SHOPS' => implode(',', $nicks),
					'XT_CIDS' => implode(',', $cids)
				);
			}
			//}
			//elseif (XT_IS_SINGLE == 'true' && !empty ($shop)) { //单店铺
			//	$config_arr = array (
			//		'XT_SIDS' => '[' . $shop['sid'] . ']',
			//		'XT_SHOPS' => '[' . $shop['nick'] . ']',
			//		'XT_CIDS' => '[' . $shop['cid'] . ']'
			//	);
			//} else { //其他版本，清空
			//	$config_arr = array (
			//		'XT_SIDS' => '',
			//		'XT_SHOPS' => '',
			//		'XT_CIDS' => ''
			//	);
			//}
			if (!empty ($config_arr)) {
				F('xintao.update_config_file', $config_arr, XT_USER_ID); //更新SID	
			}

			//系统初始个性化（分卖家版，淘客版）
			//初始化所有系统表
			if (XT_IS_INIT == 'false' && XT_IS_WEIBO == 'true') { //仅初始化公用
				if (XT_IS_MULTI == 'true') {
					F('xintao.create_tables', 'multi', XT_USER_ID, XT_USER_NICK); //需定制个性化
					//处理网站首页配置
					//数据库
					DS('mgr/adminCom.saveAdminByUserId', '', array (
						'def_mod' => 'products'
					), XT_USER_ID);
					//配置
					F('xintao.update_config_file', array (
						'R_DEF_MOD' => 'products'
					), XT_USER_ID); //更新def_mod
				}
				elseif (XT_IS_SINGLE == 'true') { //卖家版
					F('xintao.create_tables', 'single', XT_USER_ID, XT_USER_NICK); //需定制个性化
				}
				elseif (XT_IS_TAOKE == 'true') { //淘客版
					F('xintao.create_tables', 'taoke', XT_USER_ID, XT_USER_NICK); //需定制个性化	
				}
				elseif (XT_IS_VANCL == 'true') { //凡客版
					F('xintao.create_tables', 'vancl', XT_USER_ID, XT_USER_NICK); //需定制个性化
				}
				//TODO 其他版本
			}
		}
		F('xintao.update_config_file', array (
			'XT_CLIENT_IP' => F('get_client_ip')
		), XT_USER_ID); //更新SID
		USER :: set('isInit', true);
		$yingxiao = DS('mgr/xintao/cronCom.getYingxiao', '', XT_USER_ID);
		F('autoCron.initYingxiao', $yingxiao); //初始化营销
		APP :: ajaxRst('初始化完成');
	}
}