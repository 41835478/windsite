<?php
function clearApp() {
	F('xintao.update_config_file', array (
		'WB_AKEY' => '',
		'WB_SKEY' => '',
		'SYSTEM_SINA_UID' => '',
		'SYSTEM_SINA_USERNICK' => '',
		'WB_USER_OAUTH_TOKEN' => '',
		'WB_USER_OAUTH_TOKEN' => ''
	), XT_USER_ID);
	//更新管理员关联新浪微博数据库
	DS('mgr/adminCom.saveAdminByUserId', '', array (
		'appKey' => '',
		'appSecret' => '',
		'sina_uid' => '',
		'nickname' => '',
		'access_token' => '',
		'token_secret' => ''
	), XT_USER_ID);
	//清空站点会员的授权信息
	DS('mgr/userCom.refreshUserTokens', '', XT_USER_ID);
	//删除所有代理帐号
	DS('accountProxy.delAccountByUserId', '', XT_USER_ID);
}
function clear($token = '', $secret = '', $USER_ID = '') {
	if (!empty ($token) && !empty ($secret) && !empty ($USER_ID)) {
		if ($token == WB_USER_OAUTH_TOKEN && $secret == WB_USER_OAUTH_TOKEN_SECRET) {
			//清空当前用户的帐号授权
			F('xintao.update_config_file', array (
				'SYSTEM_SINA_UID' => '',
				'SYSTEM_SINA_USERNICK' => '',
				'WB_USER_OAUTH_TOKEN' => '',
				'WB_USER_OAUTH_TOKEN_SECRET' => ''
			), $USER_ID);
			//更新管理员关联新浪微博数据库
			DS('mgr/adminCom.saveAdminByUserId', '', array (
				'sina_uid' => '',
				'nickname' => '',
				'access_token' => '',
				'token_secret' => ''
			), $USER_ID);

		} else {
			DS('accountProxy.clearByTokenAndSecret', '', $token, $secret);
		}
	}
}
function clear_qq($USER_ID = '') {
	if (!empty ($USER_ID)) {
		F('xintao.update_config_file', array (
			'WB_QQ_UID' => '',
			'WB_QQ_NAME' => '',
			'WB_QQ_NICK' => '',
			'WB_QQ_USER_OAUTH_TOKEN' => '',
			'WB_QQ_USER_OAUTH_TOKEN_SECRET' => ''
		), $USER_ID);
		//更新管理员关联新浪微博数据库
		DS('mgr/adminCom.saveAdminByUserId', '', array (
			'qq_uid' => '',
			'qq_name' => '',
			'qq_nick' => '',
			'qq_access_token' => '',
			'qq_token_secret' => ''
		), $USER_ID);
	}
}
function clear_sh($USER_ID = '') {
	if (!empty ($USER_ID)) {
		F('xintao.update_config_file', array (
			'WB_SOHU_UID' => '',
			'WB_SOHU_NAME' => '',
			'WB_SOHU_NICK' => '',
			'WB_SOHU_USER_OAUTH_TOKEN' => '',
			'WB_SOHU_USER_OAUTH_TOKEN_SECRET' => ''
		), $USER_ID);
		//更新管理员关联新浪微博数据库
		DS('mgr/adminCom.saveAdminByUserId', '', array (
			'sh_uid' => '',
			'sh_name' => '',
			'sh_nick' => '',
			'sh_access_token' => '',
			'sh_token_secret' => ''
		), $USER_ID);
	}
}
function clear_wy($USER_ID = '') {
	if (!empty ($USER_ID)) {
		F('xintao.update_config_file', array (
			'WB_WY_UID' => '',
			'WB_WY_NAME' => '',
			'WB_WY_NICK' => '',
			'WB_WY_USER_OAUTH_TOKEN' => '',
			'WB_WY_USER_OAUTH_TOKEN_SECRET' => ''
		), $USER_ID);
		//更新管理员关联新浪微博数据库
		DS('mgr/adminCom.saveAdminByUserId', '', array (
			'wy_uid' => '',
			'wy_name' => '',
			'wy_nick' => '',
			'wy_access_token' => '',
			'wy_token_secret' => ''
		), $USER_ID);
	}
}