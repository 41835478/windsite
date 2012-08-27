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

class map_mod {
	var $weibo = null;
	function map_mod() {
		$this->weibo = APP :: N('weibo');
	}

	function oauthCallback() {
		$code = V('g:code','');
		$state = V('g:state','');
		print_r($code);
		echo ',';
		print_r($state);
		if (!empty ($code) && !empty ($state)) {
			header('Location:' . $state . '&code=' . $code);
		}
		exit;
	}
	function getOAthor2() {
		$weibo = APP :: N('weibo');
		$db = APP :: ADP('db');
		$sql = "select sina_uid,user_id,access_token,token_secret,appKey,appSecret from xwb_admin  WHERE `sina_uid` is not null AND `sina_uid` !='' AND `access_token` !='' AND `v2_access_token` is null  ORDER BY `id`;";
		$result = (($db->query($sql)));
		$count = 0;
		foreach ($result as $user) {
			$appKey = WB_DEFAULT_AKEY;
			$appSecret = WB_DEFAULT_SKEY;
			if (!empty ($user['appKey']) && !empty ($user['appSecret'])) {
				$appKey = $user['appKey'];
				$appSecret = $user['appSecret'];
			}
			$weibo->consumer = new OAuthConsumer($appKey, $appSecret); //指定新浪appKey
			$weibo->setToken(3, $user['access_token'], $user['token_secret']); //指定帐户授权
			$ret = $weibo->getOAuth2();
			if (isset ($ret['rst']) && isset ($ret['rst']['access_token'])) { //暂不处理过期时间
				$config_arr = array (
					'V2_ACCESS_TOKEN' => $ret['rst']['access_token']
				);
				F('xintao.update_config_file', $config_arr, $user['user_id']); //更新
				DS('mgr/adminCom.saveAdminByUserId', '', array (
					'v2_access_token' => $ret['rst']['access_token']
				), $user['user_id']);
			} else {
				F('xintao.update_config_file', array (
					'SYSTEM_SINA_UID' => '',
					'SYSTEM_SINA_USERNICK' => '',
					'WB_USER_OAUTH_TOKEN' => '',
					'WB_USER_OAUTH_TOKEN_SECRET' => ''
				), $user['user_id']);
				//更新管理员关联新浪微博数据库
				DS('mgr/adminCom.saveAdminByUserId', '', array (
					'sina_uid' => '',
					'nickname' => '',
					'access_token' => '',
					'token_secret' => ''
				), $user['user_id']);
				$count++;
			}
		}
		echo 'total:' . count($result) . ',' . 'no:' . $count;
	}

	function clearApp() {
		F('account_proxy.clearApp');
	}
	function test() {
		Xpipe :: usePipe(false);
		TPL :: display('xintao/yingxiaoTest');
	}
	function rebuildConfig() {
		$userId = V('g:userId');
		if (!empty ($userId) && is_numeric($userId)) {
			F('fix.fixConfig', $userId);
		}
	}
	function synTvBrand() {
		if ('www.xintaowang.com' == $_SERVER['SERVER_NAME']) {
			F('get_brand.get_brand_item');
		}
	}
	function synTvMap() {
		if ('www.xintaowang.com' == $_SERVER['SERVER_NAME']) {
			F('xintaotv_map.convert_pinyin_first_char');
		}
	}
	function synDiscount() {
		if ('www.xintaowang.com' == $_SERVER['SERVER_NAME']) {
			F('get_dianpu_discount');
		}
	}
	function synTvCovers() {
		if ('www.xintaowang.com' == $_SERVER['SERVER_NAME']) {
			F('get_sohu_tv_cover');
		}

	}
	function synSetList() {
		if ('www.xintaowang.com' == $_SERVER['SERVER_NAME']) {
			$sid = V('g:sid');
			$tvSets = V('g:tvSets');
			$cat = V('g:cat');
			print_r(F('tv.getSetList', -999, '未知模块', array (
				'sid' => $sid,
				'page' => 1,
				'pageSize' => 1000,
				'cat' => $cat,
				'tvSets' => $tvSets
			), true, true)); //刷新剧集列表
		}

	}
	function synTvJuqing() {
		if ('www.xintaowang.com' == $_SERVER['SERVER_NAME']) {
			$sid = V('g:sid');
			$isJuqing = V('g:isJuqing');
			if (isset ($sid) && !empty ($sid)) {
				$db = APP :: ADP('db');
				$sql = 'SELECT href FROM xwb_xttv_covers where sid=' . $sid;
				$rst = $db->getOne($sql);
				if (!empty ($rst)) {
					F('get_xintaotv_juqing.get_juqing_one', $sid, $rst);
					F('get_xintaotv_juqing.syn_juqing_isJuqing');
					F('get_xintaotv_juqing.get_xintaotv_juqings', $sid, true);
					print_r(CACHE :: get(TB_CACHE_TV_KEY_PRE . 'Juqings_' . $sid));
				}
			}
			elseif (isset ($isJuqing) && $isJuqing) {
				F('get_xintaotv_juqing.syn_juqing_isJuqing');
			} else {
				F('get_xintaotv_juqing.get_juqing_all');
				F('get_xintaotv_juqing.syn_juqing_isJuqing');
			}

			F('tv.getSetList', -999, '未知模块', array (
				'sid' => 1004638,
				'page' => 1,
				'pageSize' => 1000,
				'cat' => 2,
				'tvSets' => 60
			), true, true); //刷新剧集列表
		}
	}
	function synTopItem() {
		if ('www.xintaowang.com' == $_SERVER['SERVER_NAME']) {
			set_time_limit(1200); //设置总执行时间限制，预期不可超过2分钟。
			F('xintaotv_aditem');
		}

	}
	function synTaokeItem() {
		if ('www.xintaowang.com' == $_SERVER['SERVER_NAME']) {
			set_time_limit(1200); //设置总执行时间限制，预期不可超过2分钟。
			F('taoke_item.synTaokeItem');
		}
	}
	function synWowTaokeItem() {
		if ('www.xintaowang.com' == $_SERVER['SERVER_NAME']) {
			set_time_limit(1200); //设置总执行时间限制，预期不可超过2分钟。
			F('taoke_item.synWowTaokeItem');
		}
	}
	function synWow() {
		if ('www.xintaowang.com' == $_SERVER['SERVER_NAME']) {
			ignore_user_abort(); //即使Client断开(如关掉浏览器)，PHP脚本也可以继续执行
			set_time_limit(2400); //设置总执行时间限制，预期不可超过40分钟
			F('wow.synWow', 1);
			F('wow.synWow', 2);
			F('wow.synWow', 3);
			F('wow.synWow', 4);
			F('wow.synWowTaokeItem');
		}
	}
	function synWeiboType() {
		if ('www.xintaowang.com' == $_SERVER['SERVER_NAME']) {
			$db = APP :: ADP('db');
			for ($i = 0; $i < 10; $i++) { //查找10个分表中每个表的微博数量
				$sql = 'SELECT id,weibo FROM ' . $db->getPrefix() . T_WEIBO_COPY . '_' . $i . ' WHERE weibo like \'%http://t.cn/%\' and type=0 order by addtime desc';
				$result = $db->query($sql);
				if (!empty ($result)) {
					$rss = array_chunk($result, 20);
					foreach ($rss as $rs) {
						$rows = array ();
						$strs = array ();
						foreach ($rs as $row) {
							$matches = array ();
							preg_match("/http:\/\/t.cn\/([0-9a-zA-Z]+)/", $row['weibo'], $matches);
							if (count($matches) == 2) {
								$strs[] = $matches[1];
								$rows[$matches[1]] = $row['id'];
							}
						}
						if (count($strs) > 0)
							F('syn_weibo_type', $rows, $i, $db, implode(',', array_unique($strs)));
					}
				}
			}
		}
		exit ('完成');
	}
	function cacheFolder() {
		$type = V('g:type', 0);
		$key = V('g:key', '');
		if (!$key) {
			echo '未指定KEY';
			exit;
		}
		$c = & CACHE :: instance();
		if ($type == 0) {
			print_r($c->_getSavePath(TB_CACHE_KEY_PRE . $key));
		}
		elseif ($type == 1) { //商品ID
			$key = dsMgr :: _creCacheID(array (
				$key
			));
			echo TB_CACHE_KEY_PRE . 'top/TopClient.itemDescGet' . ' ' . $key;
			print_r($c->_getSavePath('tbCache_others_top\/TopClient.itemDescGet 7e11b75850fafa6030850422e9020fbc -'));

		}
	}

	function index() {
		TPL :: display('xintao/index');
	}

	/**
	 * 同步商品营销
	 */
	function synItem() {
		if (XT_USER_ID != '') {
			if (XT_IS_SELLER == 'true' && XT_IS_ITEMCLOSED == 'true') {
				$db = APP :: ADP('db');
				$db->execute('UPDATE ' . $db->getTable(T_ADMIN) . ' SET item_status=1 WHERE user_id=' . XT_USER_ID); //更新状态
				return;
			}
			set_time_limit(120); //设置总执行时间限制，预期不可超过2分钟。
			F('user_item.synUserItem');
		}
	}
	/**
	 * 自动发微博
	 */
	function autoCron() {
		//需考虑版本，（如免费版，不能使用画报，视频）
		if (SYSTEM_SINA_UID != '' && WB_USER_OAUTH_TOKEN != '' && WB_USER_OAUTH_TOKEN_SECRET != '') {
			set_time_limit(120); //设置总执行时间限制，预期不可超过2分钟。
			//			$cache_name = 'autoCron_today_record_' . XT_USER_ID . '_';
			//			$record = CACHE :: get($cache_name);
			//			if (!$record) {
			//				$record = array ();
			//			}
			//exit('临时停止自动营销');
			$index = V('p:index', -1);
			if ($index == -1) {
				$index = V('g:index', -1);
			}
			echo 'index:' . $index . '=========';
			F('autoCron.autoCron', $index);
		} else {
			exit (XT_USER_NICK . ':' . XT_SITE_DOMAIN . '站点未绑定新浪微博');
		}

	}
	/**
	 * 更新每天画报信息（为发微博准备内容）
	 */
	function posterUpdate() {
		if ('www.xintaowang.com' == $_SERVER['SERVER_NAME']) {
			ignore_user_abort(); //忽略客户端请求中断
			set_time_limit(1800); //设置总执行时间限制，预期不可超过30分钟。
			$poster = V('-:poster');
			print_r($poster);
			if (!empty ($poster)) {
				foreach ($poster as $p) {
					F('top.posterUpdate', $p['id'], 1);
				}
			}
		}
		exit ('退出');
	}
	/**
	 * 更新每天影视信息（为发微博准备内容,因为搜狐API限制，每分钟最多100次请求，故每次仅更新单个分类，由参数指定）
	 */
	function tvUpdate() {
		if ('www.xintaowang.com' == $_SERVER['SERVER_NAME']) {
			ignore_user_abort(); //忽略客户端请求中断
			set_time_limit(300); //设置总执行时间限制，预期不可超过5分钟。
			$sotv = V('-:sotv/' . V('g:cat', 0));
			$tvType = V('g:tvType', 2);
			print_r($sotv);
			echo 'tvType:' . $tvType . '=======';
			if (!empty ($sotv)) {
				if (in_array($sotv['id'], array (
						1,
						2
					))) { //电影，电视剧同时更新正片，非正片
					F('tv.tvUpdate', $sotv['id'], 1, 1);
					F('tv.tvUpdate', $sotv['id'], 1, 3);
				} else {
					F('tv.tvUpdate', $sotv['id'], 1, $tvType);
				}
			}
		}
		exit ('退出');
	}

	/**
	 * 查询自动发微博用户列表
	 */
	function autoCrons() {
		$admins = array ();
		if ('www.xintaowang.com' == $_SERVER['SERVER_NAME']) {
			$switch = CACHE :: get(TB_CACHE_KEY_PRE . 'autoCronsSwitch');
			if ($switch == 'completed') { //是否开启了自动微博
				//return;
			}
			$admins = DS('mgr/adminCom.getAdminsByAutoCrons');
			CACHE :: set(TB_CACHE_KEY_PRE . 'autoCronsSwitch', 'completed', (CACHE_24 - 300)); //24小时
		}
		exit (json_encode($admins));
	}
	/**
	 * 查询并执行微博任务
	 */
	function autoCronAdmin() {
		$admins = DS('mgr/xintao/cronCom.getWeiboCrons');
		if (!empty ($admins)) {
			ignore_user_abort(); //即使Client断开(如关掉浏览器)，PHP脚本也可以继续执行
			set_time_limit(0); //设置总执行时间限制，预期不可超过2分钟。
			foreach ($admins as $admin) {
				//写入缓存
				CACHE :: set(TB_CACHE_KEY_PRE . 'autoCronsWeibo_' . $admin['id'], $admin, (CACHE_24)); //24小时
				print_r(F('http_get_contents', 'http://t' . $admin['user_id'] . '.xintaowang.com/map.autoCronWeibo?id=' . $admin['id']));
			}
		}
	}
	/**
	 * 自动发微博(附属平台)
	 */
	function autoCronWeibo() {
		$id = V('g:id', '');
		if (empty ($id)) {
			exit ('微博编号不能为空');
		}
		//需考虑版本，（如免费版，不能使用画报，视频）
		if (SYSTEM_SINA_UID != '' && WB_USER_OAUTH_TOKEN != '' && WB_USER_OAUTH_TOKEN_SECRET != '') {
			$admin = CACHE :: get(TB_CACHE_KEY_PRE . 'autoCronsWeibo_' . $id);
			//获取后删除缓存文件
			CACHE :: delete(TB_CACHE_KEY_PRE . 'autoCronsWeibo_' . $id);
			if (!empty ($admin)) {
				set_time_limit(120); //设置总执行时间限制，预期不可超过2分钟。
				F('autoCronWeibo.autoCronWeibo', $admin);
			}
		} else {
			exit (XT_USER_NICK . ':' . XT_SITE_DOMAIN . '站点未绑定新浪微博');
		}

	}

	/**
	 * 同步营销商品,店铺库的类目
	 */
	function synCatAdmin() {
		if ('www.xintaowang.com' == $_SERVER['SERVER_NAME']) {
			set_time_limit(0); //设置总执行时间限制，预期不限时。
			F('taobao_cat.updateCat');
		}
	}

	function synItemAdminItemStatus() {
		if ('www.xintaowang.com' == $_SERVER['SERVER_NAME']) {
			ignore_user_abort(); //即使Client断开(如关掉浏览器)，PHP脚本也可以继续执行
			set_time_limit(2000); //设置总执行时间限制，预期不限时。
			$db = APP :: ADP('db');
			$db->execute('UPDATE ' . $db->getTable(T_ADMIN) . ' SET item_status=0 WHERE group_id !=0');
		}
	}
	/**
	 * 同步当前站点（版本号，店铺营销，商品营销）
	 */
	function synItemAdmin() {
		if ('www.xintaowang.com' == $_SERVER['SERVER_NAME']) {
			$index = V('g:index', '');
			if ($index >= 0 && $index < 10) {
				ignore_user_abort(); //即使Client断开(如关掉浏览器)，PHP脚本也可以继续执行
				set_time_limit(2000); //设置总执行时间限制，预期不限时。
				F('user_item.synItemAdmin', $index); //同步所有站点的商品	
			}
		}
	}
	/**
	 * 同步卖家商品分享站点
	 */
	function synWowUserItemAdmin() {
		if ('www.xintaowang.com' == $_SERVER['SERVER_NAME']) {
			ignore_user_abort(); //即使Client断开(如关掉浏览器)，PHP脚本也可以继续执行
			set_time_limit(2000); //设置总执行时间限制，预期不限时。
			$db = APP :: ADP('db');
			$rs = $db->query('SELECT user_id FROM xwb_admin WHERE group_id=7');
			if (!empty ($rs)) {
				foreach ($rs as $row) {
					print_r(F('http_get_contents', 'http://t' . $row['user_id'] . '.xintaowang.com/map.synWowUserItem'));
				}
			}
		}
	}
	function synWowUserItem() {
		ignore_user_abort(); //即使Client断开(如关掉浏览器)，PHP脚本也可以继续执行
		set_time_limit(300); //设置总执行时间限制，预期不限时。
		//F('user_item.synWowUserItem');
	}
	function synWowDetails() {
		if ('www.xintaowang.com' == $_SERVER['SERVER_NAME']) {
			ignore_user_abort(); //即使Client断开(如关掉浏览器)，PHP脚本也可以继续执行
			set_time_limit(1800); //设置总执行时间限制，预期不限时。
			F('wow.synWowDetails');
		}
	}
	function synWowUserItemDetails() {
		if ('www.xintaowang.com' == $_SERVER['SERVER_NAME']) {
			ignore_user_abort(); //即使Client断开(如关掉浏览器)，PHP脚本也可以继续执行
			set_time_limit(7200); //设置总执行时间限制，预期不限时。
			F('wow.synWowUserItemDetails');
		}
	}
	/**
	 * 目前不知何种原因，部分加入淘宝客的商家没有转换他们的淘宝客商品库，故增加该定时事件来修订结果
	 */
	function synItemAdminFixed() {
		if ('www.xintaowang.com' == $_SERVER['SERVER_NAME']) {
			set_time_limit(0); //设置总执行时间限制，预期不限时。
			$db = APP :: ADP('db');
			$rsts = $db->query('select `user_id`,`nick` from ' . $db->getTable(T_XT_USER_SHOP) . ' where `isseller`=1  and `click_url` !=\'\' and `isItems`=0');
			if (!empty ($rsts)) {
				foreach ($rsts as $admin) {
					print_r(F('http_get_contents', 'http://t' . $admin['user_id'] . '.xintaowang.com/map.synItem'));
				}
			}
		}
	}

	/**
	 * 自动粉
	 */
	function autoFansAdmin() {
		$autoFans = array ();
		if ('www.xintaowang.com' == $_SERVER['SERVER_NAME']) {
			try {

				$switch = CACHE :: get(TB_CACHE_KEY_PRE . 'autoFansSwitch');
				if ($switch == 'completed') { //是否开启了自动关注
					return;
				}
				ignore_user_abort(); //即使Client断开(如关掉浏览器)，PHP脚本也可以继续执行
				set_time_limit(1800); //设置总执行时间限制，预期不可超过30分钟。

				$db = APP :: ADP('db');
				for ($i = 0; $i < 10; $i++) {
					$sql = 'UPDATE ' . $db->getPrefix() . T_XT_USER_ITEM . '_' . ($i) . ' SET `today_nums`=0';
					$db->execute($sql);
					$sql = 'UPDATE ' . $db->getPrefix() . T_XT_TAOKE_ITEM . '_' . ($i) . ' SET `today_nums`=0';
					$db->execute($sql);
				}

				//处理版本号
				print_r(F('xintao.synAppstore'));
				//设置（每天店铺营销，商品营销预估数量[根据昨日]）缓存
				F('user_item.updatePreYingxiaoNums');
				DS('mgr/xintao/cronCom.resetYingxiaoNums'); //重置每日营销数量
				F('yingxiao.resetYingxiaoTop10'); //重置每日营销排行榜
				//				$admins = DS('mgr/adminCom.getAdminsByGroupAndAutoFans', '');
				//				foreach ($admins as $admin) {
				//					$autoFan = array ();
				//					$autoFan['user_id'] = $admin['user_id'];
				//					$autoFan['user_nick'] = $admin['user_nick'];
				//					$autoFan['user_nick'] = $admin['nickname'];
				//					F('http_get_contents', 'http://t' . $admin['user_id'] . '.xintaowang.com/map.autoFans');
				//					$autoFans[] = $autoFan;
				//				}
				CACHE :: set(TB_CACHE_KEY_PRE . 'autoFansSwitch', 'completed', (CACHE_24 - 3601 * 6)); //24小时
			} catch (Exception $e) {
			}
		}
		print_r($autoFans);
	}
	/**
	 * 粉丝自动关注
	 */
	function autoFans() {
		if (XT_IS_WEIBO != 'true') {
			return false;
		}
		$AUTO_FANS_LIMIT = 2; //目前每天自动粉2个
		//第一步：取出已绑定新浪的管理员ID列表
		//第二步：查询当前站长管理员的粉丝ID列表
		//第三步：两个ID列表取差集
		//第四步：根据差集随机取出指定数量ID列表
		//第五步：指定ID进行粉丝关注
		$cache = CACHE :: get(TB_CACHE_KEY_PRE . 'autoFans');
		if (!$cache || empty ($cache['ids']) || empty ($cache['users'])) {
			$sina_uids = array ();
			$ids = DS('mgr/adminCom.getAdminsSinaUidByAutoFans');
			if ($ids) {
				foreach ($ids as $id) {
					$sina_uids[] = $id['sina_uid'];
				}
			}
			$cache['ids'] = $sina_uids;
			$sina_users = array ();
			$users = DS('mgr/adminCom.getAdminsByAutoFans');
			if ($users) {
				foreach ($users as $user) {
					$sina_users[$user['sina_uid']] = $user;
				}
			}
			$cache['users'] = $sina_users;
			CACHE :: set(TB_CACHE_KEY_PRE . 'autoFans', $cache, CACHE_24); //缓存24小时
		}
		$ids = $cache['ids'];
		$users = $cache['users'];
		echo count($ids) . ',';
		echo count($users) . ',';
		$fids = DR('xweibo/xwb.getFriendIds', '', SYSTEM_SINA_UID, null, null, -1, 5000);
		$fids = $fids['rst']['ids'];
		$fids[] = SYSTEM_SINA_UID;
		if ($fids) {
			$diffIds = array_diff($ids, $fids);
			if (count($diffIds) > $AUTO_FANS_LIMIT) {
				$autoFansIndexs = array_rand($diffIds, $AUTO_FANS_LIMIT);
				if ($autoFansIndexs) {
					foreach ($autoFansIndexs as $index) {
						$user = $users[$diffIds[$index]];
						if ($user) {
							echo 'nick[' . $user['nickname'] . ']:';
							$access_token = $user['access_token'];
							$token_secret = $user['token_secret'];
							if ($access_token && $token_secret) {
								$appKey = $user['appKey'] ? $user['appKey'] : WB_DEFAULT_AKEY;
								$appSecret = $user['appSecret'] ? $user['appSecret'] : WB_DEFAULT_SKEY;
								$this->weibo->consumer = new OAuthConsumer($appKey, $appSecret); //指定新浪appKey
								$this->weibo->setToken(3, $access_token, $token_secret); //指定帐户授权
								print_r($this->weibo->createFriendship(SYSTEM_SINA_UID));
							}
						}
					}
				}
			}
		}
	}
	/**
	 * 升级
	 */
	function upgrade() {
		$config = array ();
		if (WB_QQ_AKEY == '801004541' || WB_QQ_AKEY == '801093533' || WB_QQ_AKEY == '801090485') {
			$config['WB_QQ_AKEY'] = '';
			$config['WB_QQ_SKEY'] = '';
			$config['WB_QQ_NAME'] = '';
			$config['WB_QQ_NICK'] = '';
			$config['WB_QQ_USER_OAUTH_TOKEN'] = '';
			$config['WB_QQ_USER_OAUTH_TOKEN_SECRET'] = '';

		}
		if (WB_AKEY == WB_DEFAULT_AKEY) {
			$config['WB_AKEY'] = '';
			$config['WB_SKEY'] = '';
		}
		if (WB_WY_AKEY == WB_WY_DEFAULT_AKEY) {
			$config['WB_WY_AKEY'] = '';
			$config['WB_WY_SKEY'] = '';
		}
		if (WB_SOHU_AKEY == WB_SOHU_DEFAULT_AKEY) {
			$config['WB_SOHU_AKEY'] = '';
			$config['WB_SOHU_SKEY'] = '';
		}
		if (!empty ($config)) {
			F('xintao.update_config_file', $config, XT_USER_ID); //更新
		}
		print_r(DS('mgr/adminCom.saveAdminByUserId', '', array (
			'xt_version' => 4
		), XT_USER_ID));
	}

	function baidu() {
		header('Content-Type: text/xml');
		if (XT_IS_SELLER == 'true') {
			F('sitemap.seller', str_replace(array (
				'[',
				']'
			), array (
				'',
				''
			), XT_SHOPS));
		} else {
			echo TPL :: module('xintao/sitemap_baidu', array (), FALSE, FALSE);
		}
	}
}