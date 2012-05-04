<?php


//设置include_path 到 OpenSDK目录
require_once 'OpenSDK/163/Weibo.php';
OpenSDK_163_Weibo :: init(WB_WY_AKEY, WB_WY_SKEY);
/**
 * 设置当前授权
 */
function getWyAccessToken() {
	OpenSDK_163_Weibo :: init(WB_WY_AKEY, WB_WY_SKEY);
	if (WB_WY_USER_OAUTH_TOKEN != '' && WB_WY_USER_OAUTH_TOKEN_SECRET != '') {
		OpenSDK_163_Weibo :: setParam(OpenSDK_163_Weibo :: ACCESS_TOKEN, WB_WY_USER_OAUTH_TOKEN);
		OpenSDK_163_Weibo :: setParam(OpenSDK_163_Weibo :: OAUTH_TOKEN_SECRET, WB_WY_USER_OAUTH_TOKEN_SECRET);
		return true;
	}
	return false;
}
/**
 * 网易发布微博
 */
function wy_add($weibo = '') {
	if ($weibo == '') {
		return 0;
	}
	if (!getWyAccessToken()) {
		return 0;
	}
	$call_result = OpenSDK_163_Weibo :: call('statuses/update', array (
		'status' => $weibo
	), 'POST');
	if ($call_result && isset ($call_result['id'])) {
		return $call_result['id'];
	} else {
		LOGSTR('wy', "[" . date("Y-m-d H:i:s") . "-" . $_SERVER["SERVER_ADDR"] . "-" . XT_USER_ID . "-add]:" . json_encode($call_result));
		if ($call_result && isset ($call_result['error_code'])) { //验证签名失败
			if (in_array($call_result['error_code'], array (
					401
				))) { //"error":"oauth_problem=token_invalid HTTP status=401","error_code":"401","message_code":"00401token_invalid"
				F('account_proxy.clear_wy', XT_USER_ID);
			}
		}
	}
	return 0;
}
/**
 * 网易发布图片微博
 */
function wy_add_pic($weibo = '', $pic = '') {
	if ($weibo == '' || $pic == '') {
		return '';
	}
	if (!getWyAccessToken()) {
		return '';
	}
	$call_result = OpenSDK_163_Weibo :: call('statuses/upload', array (), 'POST', array (
		'pic' => $pic
	));
	$pic_url = '';
	if ($call_result && isset ($call_result['upload_image_url'])) {
		$pic_url = $call_result['upload_image_url'];
	}
	$call_result = OpenSDK_163_Weibo :: call('statuses/update', array (
		'status' => $weibo . $pic_url
	), 'POST');
	if ($call_result && isset ($call_result['id'])) {
		return $call_result['id'];
	} else {
		LOGSTR('wy', "[" . date("Y-m-d H:i:s") . "-" . $_SERVER["SERVER_ADDR"] . "-" . XT_USER_ID . "-add_pic]:" . json_encode($call_result));
		if ($call_result && isset ($call_result['error_code'])) { //验证签名失败
			if (in_array($call_result['error_code'], array (
					401
				))) { //"error":"oauth_problem=token_invalid HTTP status=401","error_code":"401","message_code":"00401token_invalid"
				F('account_proxy.clear_wy', XT_USER_ID);
			}
		}
	}
	return 0;
}