<?php


//设置include_path 到 OpenSDK目录
require_once 'OpenSDK/Tencent/Weibo.php';
OpenSDK_Tencent_Weibo :: init(WB_QQ_AKEY, WB_QQ_SKEY);
/**
 * 设置当前授权
 */
function getAccessToken() {
	OpenSDK_Tencent_Weibo :: init(WB_QQ_AKEY, WB_QQ_SKEY);
	if (WB_QQ_USER_OAUTH_TOKEN != '' && WB_QQ_USER_OAUTH_TOKEN_SECRET != '') {
		//OpenSDK_Tencent_Weibo :: getOAuth()->setTokenSecret(WB_QQ_USER_OAUTH_TOKEN_SECRET);
		OpenSDK_Tencent_Weibo :: setParam(OpenSDK_Tencent_Weibo :: ACCESS_TOKEN, WB_QQ_USER_OAUTH_TOKEN);
		OpenSDK_Tencent_Weibo :: setParam(OpenSDK_Tencent_Weibo :: OAUTH_TOKEN_SECRET, WB_QQ_USER_OAUTH_TOKEN_SECRET);
		return true;
	}
	return false;
}
/**
 * QQ发布微博
 */
function add($weibo = '', $ip = '127.0.0.1') {
	if ($weibo == '') {
		return 0;
	}
	if (!getAccessToken()) {
		return 0;
	}
	$call_result = OpenSDK_Tencent_Weibo :: call('t/add', array (
		'content' => $weibo,
		'clientip' => XT_CLIENT_IP
	), 'POST');
	if ($call_result) {
		if ($call_result['ret'] == 0 && isset ($call_result['data']) && isset ($call_result['data']['id'])) {
			return $call_result['data']['id'];
		} else {
			LOGSTR('qq', "[" . date("Y-m-d H:i:s") . "-" . $_SERVER["SERVER_ADDR"] . "-" . XT_USER_ID . "-add]:" . json_encode($call_result));
			if ($call_result['ret'] == 3) { //验证签名失败
				if (in_array($call_result['errcode'], array (
						1,
						3
					))) { //errcode=1 无效TOKEN,被吊销, errcode=4 access_token超时,errcode=3 access_token不存在
					F('account_proxy.clear_qq', XT_USER_ID);
				}
			}
		}
	}

	return 0;
}
/**
 * QQ发布图片微博
 */
function add_pic($weibo = '', $ip = '127.0.0.1', $pic = '') {
	if ($weibo == '' || $pic == '') {
		return 0;
	}
	if (!getAccessToken()) {
		return 0;
	}
	$call_result = OpenSDK_Tencent_Weibo :: call('t/add_pic', array (
		'content' => $weibo,
		'clientip' => XT_CLIENT_IP
	), 'POST', array (
		'pic' => $pic
	));
	if ($call_result) {
		if ($call_result['ret'] == 0 && isset ($call_result['data']) && isset ($call_result['data']['id'])) {
			return $call_result['data']['id'];
		} else {
			LOGSTR('qq', "[" . date("Y-m-d H:i:s") . "-" . $_SERVER["SERVER_ADDR"] . "-" . XT_USER_ID . "-add_pic]:" . json_encode($call_result));
			if ($call_result['ret'] == 3) { //验证签名失败
				if (in_array($call_result['errcode'], array (
						1,
						3
					))) { //errcode=1 无效TOKEN,被吊销, errcode=4 access_token超时,errcode=3 access_token不存在
					F('account_proxy.clear_qq', XT_USER_ID);
				}
			}
		}
	}

	return 0;
}