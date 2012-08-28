<?php
define('ROOT_PATH', dirname(__FILE__) . '/../../../../');
//设置include_path 到 OpenSDK目录
require_once 'OpenSDK/Tencent/Weibo.php';
require_once 'OpenSDK/Sohu/Weibo.php';
require_once 'OpenSDK/163/Weibo.php';
OpenSDK_Tencent_Weibo :: init(WB_QQ_AKEY, WB_QQ_SKEY);
OpenSDK_Sohu_Weibo :: init(WB_SOHU_AKEY, WB_SOHU_SKEY);
OpenSDK_163_Weibo :: init(WB_WY_AKEY, WB_WY_SKEY);
include_once (P_CLASS . '/saetv2.ex.class.php');
class active_admin_mod {
	function active_admin_mod() {
		//		$rs = "";
		//		//判断用户是否登录
		//		if (!USER :: isUserLogin()) {
		//			$app_secret = urldecode(trim(V('g:app_secret', '')));
		//			$app_key = urldecode(trim(V('g:app_key', '')));
		//			$toUrl = URL('account.sinaLogin', 'cb=login&active=1&loginCallBack=' . urlencode(URL('mgr/active_admin.active', 'app_key=' . $app_key . '&app_secret=' . $app_secret, 'admin.php')), 'index.php');
		//			APP :: redirect($toUrl, 3);
		//		}
		//
		//		//判断是否有管理员
		//		$rs = DR('mgr/adminCom.getAdminByUid');
		//		if (WB_USER_OAUTH_TOKEN && WB_USER_OAUTH_TOKEN_SECRET && $rs['rst']) {
		//			APP :: redirect(URL('mgr/admin.login', '', 'admin.php'), 3);
		//		}
	}

	function bindList() {
		$rs = DR('mgr/adminCom.getAdminByUserId', '', XT_USER_ID);
		TPL :: assign('admin', $rs['rst']);
		$this->_display('bindList');
	}
	function bindWY() {
		$oauthCbUrl = W_BASE_HTTP . URL('mgr/xintao/active_admin.bindWYCallback');
		$request_token = OpenSDK_163_Weibo :: getRequestToken($oauthCbUrl);
		$oauthUrl = OpenSDK_163_Weibo :: getAuthorizeURL($request_token, $oauthCbUrl);

		APP :: redirect($oauthUrl, 3);
	}
	// 绑定腾讯微博回调（更新Admin以及更新配置）
	function bindWYCallback() {
		$rt = OpenSDK_163_Weibo :: getAccessToken();
		if ($rt && isset ($rt['oauth_token']) && isset ($rt['oauth_token_secret'])) {
			$data = OpenSDK_163_Weibo :: call('users/show');
			F('xintao.update_config_file', array (
				'WB_WY_UID' => $data['id'],
				'WB_WY_NAME' => $data['name'],
				'WB_WY_NICK' => $data['screen_name'],
				'WB_WY_USER_OAUTH_TOKEN' => $rt['oauth_token'],
				'WB_WY_USER_OAUTH_TOKEN_SECRET' => $rt['oauth_token_secret']
			), XT_USER_ID);
			//更新管理员关联新浪微博数据库
			DS('mgr/adminCom.saveAdminByUserId', '', array (
				'wy_uid' => $data['id'],
				'wy_name' => $data['name'],
				'wy_nick' => $data['screen_name'],
				'wy_access_token' => $rt['oauth_token'],
				'wy_token_secret' => $rt['oauth_token_secret']
			), XT_USER_ID);
			DS('xintao/userShop.setNickName', '', $data['name'], XT_USER_ID, 'wy_');
			DS('xintao/userItem.setNickName', '', $data['name'], XT_USER_ID, 'wy_');
			APP :: tips(array (
				'msg' => '绑定成功',
				'tpl' => 'mgr/success',
				'timeout' => 3,
				'location' => URL('mgr/xintao/active_admin.bindList'),
				'baseskin' => false
			));
		} else {
			die('oauth_verifier error!');
		}
		exit;
	}
	function bindSohu() {
		$oauthCbUrl = W_BASE_HTTP . URL('mgr/xintao/active_admin.bindSohuCallback');
		$request_token = OpenSDK_Sohu_Weibo :: getRequestToken();
		$oauthUrl = OpenSDK_Sohu_Weibo :: getAuthorizeURL($request_token, $oauthCbUrl);

		APP :: redirect($oauthUrl, 3);
	}
	// 绑定腾讯微博回调（更新Admin以及更新配置）
	function bindSohuCallback() {
		$rt = OpenSDK_Sohu_Weibo :: getAccessToken($_GET['oauth_verifier']);
		if ($rt && isset ($rt['oauth_token']) && isset ($rt['oauth_token_secret'])) {
			$data = OpenSDK_Sohu_Weibo :: call('users/show');
			F('xintao.update_config_file', array (
				'WB_SOHU_UID' => $data['id'],
				'WB_SOHU_NAME' => $data['name'],
				'WB_SOHU_NICK' => $data['screen_name'],
				'WB_SOHU_USER_OAUTH_TOKEN' => $rt['oauth_token'],
				'WB_SOHU_USER_OAUTH_TOKEN_SECRET' => $rt['oauth_token_secret']
			), XT_USER_ID);
			//更新管理员关联新浪微博数据库
			DS('mgr/adminCom.saveAdminByUserId', '', array (
				'sh_uid' => $data['id'],
				'sh_name' => $data['name'],
				'sh_nick' => $data['screen_name'],
				'sh_access_token' => $rt['oauth_token'],
				'sh_token_secret' => $rt['oauth_token_secret']
			), XT_USER_ID);
			DS('xintao/userShop.setNickName', '', $data['screen_name'], XT_USER_ID, 'sh_');
			DS('xintao/userItem.setNickName', '', $data['screen_name'], XT_USER_ID, 'sh_');
			APP :: tips(array (
				'msg' => '绑定成功',
				'tpl' => 'mgr/success',
				'timeout' => 3,
				'location' => URL('mgr/xintao/active_admin.bindList'),
				'baseskin' => false
			));
		} else {
			die('oauth_verifier error!');
		}
		exit;
	}
	function bindQQ() {
		$oauthCbUrl = W_BASE_HTTP . URL('mgr/xintao/active_admin.bindQQCallback');
		$request_token = OpenSDK_Tencent_Weibo :: getRequestToken($oauthCbUrl);
		$oauthUrl = OpenSDK_Tencent_Weibo :: getAuthorizeURL($request_token);

		APP :: redirect($oauthUrl, 3);
	}
	// 绑定腾讯微博回调（更新Admin以及更新配置）
	function bindQQCallback() {
		$rt = OpenSDK_Tencent_Weibo :: getAccessToken($_GET['oauth_verifier']);
		if ($rt && isset ($rt['oauth_token']) && isset ($rt['oauth_token_secret'])) {
			$uinfo = OpenSDK_Tencent_Weibo :: call('user/info');
			$data = $uinfo['data'];
			F('xintao.update_config_file', array (
				'WB_QQ_UID' => $data['uid'],
				'WB_QQ_NAME' => $data['name'],
				'WB_QQ_NICK' => $data['nick'],
				'WB_QQ_USER_OAUTH_TOKEN' => $rt['oauth_token'],
				'WB_QQ_USER_OAUTH_TOKEN_SECRET' => $rt['oauth_token_secret']
			), XT_USER_ID);
			//更新管理员关联新浪微博数据库
			DS('mgr/adminCom.saveAdminByUserId', '', array (
				'qq_uid' => $data['uid'],
				'qq_name' => $data['name'],
				'qq_nick' => $data['nick'],
				'qq_access_token' => $rt['oauth_token'],
				'qq_token_secret' => $rt['oauth_token_secret']
			), XT_USER_ID);
			DS('xintao/userShop.setNickName', '', $data['name'], XT_USER_ID, 'qq_');
			DS('xintao/userItem.setNickName', '', $data['name'], XT_USER_ID, 'qq_');
			APP :: tips(array (
				'msg' => '绑定成功',
				'tpl' => 'mgr/success',
				'timeout' => 3,
				'location' => URL('mgr/xintao/active_admin.bindList'),
				'baseskin' => false
			));
		} else {
			die('oauth_verifier error!');
		}
		exit;
	}
	/**
	 * 绑定新浪微博
	 */
	function bindSina() {
		$callback = W_BASE_HTTP . URL('mgr/xintao/active_admin.bindSinaCallback&forcelogin=true');
		$callback = str_replace('http://','',$callback);
		$oauthUrl = DS('xweibo/xwb.getTokenAuthorizeURL', '', WB_CALLBACK_URL, $callback);
		header('Location:' . $oauthUrl.'&forcelogin=true');
	}

	// 绑定新浪微博回调（更新Admin以及更新配置）
	function bindSinaCallback() {
		$o = new SaeTOAuthV2(WB_AKEY, WB_SKEY);
		$code = V('r:code', '');
		$token = array ();
		if (!empty ($code)) {
			$keys = array ();
			$keys['code'] = $code;
			$keys['redirect_uri'] = WB_CALLBACK_URL;
			try {
				$token = $o->getAccessToken('code', $keys);
			} catch (OAuthException $e) {
			}
		}

		$isTimer = SYSTEM_SINA_UID == '' ? true : false;

		if (!empty ($token)) {
			$c = new SaeTClientV2(WB_AKEY, WB_SKEY, $token['access_token']);
			$user_message = $c->show_user_by_id($token['uid']); //根据ID获取用户等基本信息
			F('xintao.update_config_file', array (
				'SYSTEM_SINA_UID' => $token['uid'],
				'SYSTEM_SINA_USERNICK' => $user_message['screen_name'],
				'V2_ACCESS_TOKEN' => $token['access_token']
			), XT_USER_ID);
			//更新管理员关联新浪微博数据库
			DS('mgr/adminCom.saveAdminByUserId', '', array (
				'sina_uid' => $token['uid'],
				'nickname' => $user_message['screen_name'],
				'v2_access_token' => $token['access_token']
			), XT_USER_ID);

			//更新当前管理员SESSION
			//		USER :: setOAuthKey($last_key, true);

			USER :: uid($token['uid']);
			USER :: set('sina_uid', $token['uid']);
			USER :: set('screen_name', $user_message['screen_name']);
			USER :: set('description', $user_message['description']);
			USER :: set('user_max_notice_time', APP_LOCAL_TIMESTAMP);

			//是否需要初始化用户组（如强制关注，首次登陆关注，首页用户推荐）
			if (XT_IS_WEIBO == 'true') { //如果开通了微博系统，免费版不初始化
				$ret = DR('mgr/userRecommendCom.getUserById', '', 3);
				if (!$ret['rst']) {
					DR('mgr/userRecommendCom.addUser', '', $data = array (
						'group_id' => 3,
						'uid' => $token['uid'],
						'nickname' => $user_message['screen_name'],
						'remark' => $user_message['screen_name']
					));
				}
				$ret = DR('mgr/userRecommendCom.getUserById', '', 83);
				if (!$ret['rst']) {
					DR('mgr/userRecommendCom.addUser', '', $data = array (
						'group_id' => 83,
						'uid' => $token['uid'],
						'nickname' => $user_message['screen_name'],
						'remark' => $user_message['screen_name']
					));
				}
				$ret = DR('mgr/userRecommendCom.getUserById', '', 84);
				if (!$ret['rst']) {
					DR('mgr/userRecommendCom.addUser', '', $data = array (
						'group_id' => 84,
						'uid' => $token['uid'],
						'nickname' => $user_message['screen_name'],
						'remark' => $user_message['screen_name']
					));
				}
			}
			DS('xintao/userShop.setNickName', '', $user_message['screen_name'], XT_USER_ID);
			DS('xintao/userItem.setNickName', '', $user_message['screen_name'], XT_USER_ID);
			if ($isTimer) {
				F('http_get_contents', 'http://www.xintaonet.com/router/site/adsite/timer?user_id=' . XT_USER_ID . '&group_id=6');
			}
			echo '<html><head><script type="text/javascript">window.opener && window.opener.authoritySuccess();</script></head><body>success!</body></html>';
		}
		exit;
	}

	function active() {
		if (WB_AKEY != WB_DEFAULT_AKEY) { //站长自定义
			TPL :: assign('app_secret', WB_SKEY);
			TPL :: assign('app_key', WB_AKEY);
		} else { //系统内置
			TPL :: assign('app_secret', '');
			TPL :: assign('app_key', '');
		}
		if (WB_QQ_AKEY != WB_QQ_DEFAULT_AKEY) { //站长自定义
			TPL :: assign('qq_app_secret', WB_QQ_SKEY);
			TPL :: assign('qq_app_key', WB_QQ_AKEY);
		} else { //系统内置
			TPL :: assign('qq_app_secret', '');
			TPL :: assign('qq_app_key', '');
		}

		TPL :: assign('sina_uid', $this->_getUserInfo('sina_uid'));
		TPL :: assign('real_name', $this->_getUserInfo('screen_name'));
		$this->_display('active_admin');
	}
	/**
	 * 保存平台APP
	 */
	function saveApp() {
		$app_key = trim(V('p:appkey', ''));
		$app_secret = trim(V('p:secret', ''));
		if ($app_key == 'default' && $app_secret == 'default') {
			$app_key = WB_DEFAULT_AKEY;
			$app_secret = WB_DEFAULT_SKEY;
		}
		if (!F('xintao.check_app', $app_key, $app_secret)) {
			exit ('{"msg":"您输入的APPKEY,APPKEY SECRET不正确","state":"1001"}');
		}
		if ($app_key != WB_AKEY || $app_secret != WB_SKEY) { //如果App和Secret发生变化，则保存该变化
			//更新user_config数据,同时清空管理员的相关数据
			F('xintao.update_config_file', array (
				'WB_AKEY' => $app_key,
				'WB_SKEY' => $app_secret,
				'SYSTEM_SINA_UID' => '',
				'SYSTEM_SINA_USERNICK' => '',
				'WB_USER_OAUTH_TOKEN' => '',
				'WB_USER_OAUTH_TOKEN' => ''
			), XT_USER_ID);
			//更新管理员关联新浪微博数据库
			DS('mgr/adminCom.saveAdminByUserId', '', array (
				'appKey' => $app_key,
				'appSecret' => $app_secret,
				'sina_uid' => '',
				'nickname' => '',
				'access_token' => '',
				'token_secret' => ''
			), XT_USER_ID);
			//清空站点会员的授权信息
			DS('mgr/userCom.refreshUserTokens', '', XT_USER_ID);
			//删除所有代理帐号
			DS('accountProxy.delAccountByUserId', '', XT_USER_ID);
			//清空当前管理员的新浪相关信息
			USER :: uid(0);
			//USER :: resetInfo();
		}

		exit ('{"state":"200"}');
	}
	/**
	 * 保存腾讯平台APP
	 */
	function saveAppQQ() {
		$app_key = trim(V('p:appkey', ''));
		$app_secret = trim(V('p:secret', ''));
		if ($app_key == 'default' && $app_secret == 'default') {
			$app_key = WB_QQ_DEFAULT_AKEY;
			$app_secret = WB_QQ_DEFAULT_SKEY;
		}
		OpenSDK_Tencent_Weibo :: init($app_key, $app_secret);
		$request_token = OpenSDK_Tencent_Weibo :: getRequestToken();
		if (!$request_token) {
			exit ('{"msg":"您输入的APPKEY,APPKEY SECRET不正确","state":"1001"}');
		}
		if ($app_key != WB_QQ_DEFAULT_AKEY || $app_secret != WB_QQ_DEFAULT_SKEY) { //如果App和Secret发生变化，则保存该变化
			//更新user_config数据,同时清空管理员的相关数据
			F('xintao.update_config_file', array (
				'WB_QQ_AKEY' => $app_key,
				'WB_QQ_SKEY' => $app_secret,
				'WB_QQ_UID' => '',
				'WB_QQ_NAME' => '',
				'WB_QQ_NICK' => '',
				'WB_QQ_USER_OAUTH_TOKEN' => '',
				'WB_QQ_USER_OAUTH_TOKEN_SECRET' => ''
			), XT_USER_ID);
			//更新管理员关联腾讯微博数据库
			DS('mgr/adminCom.saveAdminByUserId', '', array (
				'qq_appKey' => $app_key,
				'qq_appSecret' => $app_secret,
				'qq_uid' => '',
				'qq_name' => '',
				'qq_nick' => '',
				'qq_access_token' => '',
				'qq_token_secret' => ''
			), XT_USER_ID);
		}
		exit ('{"state":"200"}');
	}
	/**
	 * 保存管理员，授权信息
	 */
	function saveActive() {
		$config_file = $date = $rs = "";
		$app_key = trim(V('p:appkey', ''));
		$app_secret = trim(V('p:secret', ''));

		$sina_uid = $this->_getUserInfo('sina_uid');
		$oauth = $this->_getUserInfo('XWB_OAUTH_CONFIRM');

		$oauth_token = $oauth['oauth_token'];
		$oauth_token_secret = $oauth['oauth_token_secret'];
		if ($app_key != WB_AKEY) {
			exit ('{"msg":"您输入的APPKEY不符","state":"1001"}');
		}

		if ($app_secret != WB_SKEY) {
			exit ('{"msg":"您输入的APPKEY SECRET不符","state":"1002"}');
		}

		$data = array (
			'sina_uid' => $this->_getUserInfo('sina_uid'),
			'nickname' => $this->_getUserInfo('screen_name')
		);

		$rs = DR('mgr/adminCom.saveAdminById', '', $data);
		if (strtolower(XWB_SERVER_ENV_TYPE) === 'sae') {
			$config_arr = array (
				'SYSTEM_SINA_UID' => $sina_uid,
				'WB_USER_OAUTH_TOKEN' => $oauth_token,
				'WB_USER_OAUTH_TOKEN_SECRET' => $oauth_token_secret
			);
			$this->sae_set_config($config_arr);
		} else {

			$config_file = IO :: read(get_config_path(XT_USER_ID)); //读取站长配置
			$config_arr = array (
				'SYSTEM_SINA_UID' => $sina_uid,
				'WB_USER_OAUTH_TOKEN' => $oauth_token,
				'WB_USER_OAUTH_TOKEN_SECRET' => $oauth_token_secret
			);

			//更新user_config数据
			$config_file = F('set_define_value', $config_file, $config_arr);
			IO :: write(get_config_path(XT_USER_ID), $config_file); //写入

		}
		//		session_regenerate_id(); //防御Session Fixation
		//		USER :: set('isAdminAccount', 1); // 1为超级管理员
		//		USER :: set('isAdminReport', 1); //设置为上报
		exit ('{"state":"200"}');
	}
	function sae_set_config($data) {
		//$config_file = IO::read(CONFIG_DOMAIN);
		$storage = new SaeStorage();
		$config_file = $storage->read(CONFIG_DOMAIN, md5(CONFIG_DOMAIN));
		$site_base_info = array ();
		parse_str($config_file, $site_base_info);

		$site_base_info['user_name'] = $data['WB_USER_NAME'];
		$site_base_info['user_email'] = $data['WB_USER_EMAIL'];
		$site_base_info['user_qq'] = $data['WB_USER_QQ'];
		$site_base_info['user_msn'] = $data['WB_USER_MSN'];
		$site_base_info['user_tel'] = $data['WB_USER_TEL'];
		$site_base_info['sina_id'] = $data['SYSTEM_SINA_UID'];
		$site_base_info['user_oauth_token'] = $data['WB_USER_OAUTH_TOKEN'];
		$site_base_info['user_oauth_token_secret'] = $data['WB_USER_OAUTH_TOKEN_SECRET'];

		$temp = array ();
		foreach ($site_base_info as $key => $value) {
			$temp[] = $key . '=' . $value;
		}
		$base_info_str = implode('&', $temp);
		//IO::write(CONFIG_DOMAIN,$base_info_str);
		$storage->write(CONFIG_DOMAIN, md5(CONFIG_DOMAIN), $base_info_str);
	}

	/**
	* 得到登录用户信息
	*/
	function _getUserInfo($key = '') {
		return USER :: get($key);
	}

	function _display($tpl) {
		TPL :: display('mgr/xintao/' . $tpl, '', 0, false);
	}

	/*
	 * 激活页面点击换个帐号
	 */
	function changeAccount() {
		$app_secret = urldecode(trim(V('g:app_secret', '')));
		$app_key = urldecode(trim(V('g:app_key', '')));

		USER :: uid(0);
		USER :: resetInfo();
		$toUrl = URL('account.sinaLogin', 'cb=login&active=1&loginCallBack=' . urlencode(URL('mgr/xintao/active_admin.active', 'app_key=' . $app_key . '&app_secret=' . $app_secret, 'admin.php')), 'index.php');
		APP :: redirect($toUrl, 3);
	}
}
?>
