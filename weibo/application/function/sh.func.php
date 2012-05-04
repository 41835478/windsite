<?php


//设置include_path 到 OpenSDK目录
require_once 'OpenSDK/Sohu/Weibo.php';
OpenSDK_Sohu_Weibo :: init(WB_SOHU_AKEY, WB_SOHU_SKEY);
/**
 * 设置当前授权
 */
function getShAccessToken() {
	OpenSDK_Sohu_Weibo :: init(WB_SOHU_AKEY, WB_SOHU_SKEY);
	if (WB_SOHU_USER_OAUTH_TOKEN != '' && WB_SOHU_USER_OAUTH_TOKEN_SECRET != '') {
		OpenSDK_Sohu_Weibo :: setParam(OpenSDK_Sohu_Weibo :: ACCESS_TOKEN, WB_SOHU_USER_OAUTH_TOKEN);
		OpenSDK_Sohu_Weibo :: setParam(OpenSDK_Sohu_Weibo :: OAUTH_TOKEN_SECRET, WB_SOHU_USER_OAUTH_TOKEN_SECRET);
		return true;
	}
	return false;
}
/**
 * 搜狐发布微博
 */
function sh_add($weibo = '') {
	if ($weibo == '') {
		return 0;
	}
	if (!getShAccessToken()) {
		return 0;
	}
	$call_result = OpenSDK_Sohu_Weibo :: call('statuses/update', array (
		'status' => urlencode($weibo)
	), 'POST');
	if ($call_result && isset ($call_result['id'])) {
		return $call_result['id'];
	} else {
		LOGSTR('sh', "[" . date("Y-m-d H:i:s") . "-" . $_SERVER["SERVER_ADDR"] . "-" . XT_USER_ID . "-add]:" . json_encode($call_result));
		if ($call_result && isset ($call_result['code'])) { //验证签名失败
			if (in_array($call_result['code'], array (
					403
				))) { //"code":403,"error":"POST request is forbidden for this user"
				F('account_proxy.clear_sh', XT_USER_ID);
			}
		}
	}
	return 0;
}
/**
 * 搜狐发布图片微博
 */
function sh_add_pic($weibo = '', $pic = '') {
	if ($weibo == '' || $pic == '') {
		return 0;
	}
	if (!getShAccessToken()) {
		return 0;
	}
	$call_result = OpenSDK_Sohu_Weibo :: call('statuses/upload', array (
		'status' => urlencode($weibo)
	), 'POST', array (
		'pic' => $pic
	));
	if ($call_result && isset ($call_result['id'])) {
		return $call_result['id'];
	} else {
		LOGSTR('sh', "[" . date("Y-m-d H:i:s") . "-" . $_SERVER["SERVER_ADDR"] . "-" . XT_USER_ID . "-add_pic]:" . json_encode($call_result));
		if ($call_result && isset ($call_result['code'])) { //验证签名失败
			if (in_array($call_result['code'], array (
					403
				))) { //"code":403,"error":"POST request is forbidden for this user"
				F('account_proxy.clear_sh', XT_USER_ID);
			}
		}
	}
	return 0;
}