<?php


/**************************************************
*  Created:  2010-06-08
*
*  框架初始化文件
*
*  @Xweibo (C)1996-2099 SINA Inc.
*  @Author xionghui <xionghui1@staff.sina.com.cn>
*
***************************************************/
///新浪默认应用密钥
define('WB_DEFAULT_AKEY', '3812233997');
/// 微博 SECRET_KEY
define('WB_DEFAULT_SKEY', 'b79fe224dbed1917b323d464ecf11c94');

///腾讯微博
//define('WB_QQ_DEFAULT_AKEY', '801004541');
//define('WB_QQ_DEFAULT_SKEY', '336d2468ae6a7834d93d410b8cd7b4d8');
//define('WB_QQ_DEFAULT_AKEY', '801090485');
//define('WB_QQ_DEFAULT_SKEY', '6bd1444ebbd343c9073b98d12a1d2a52');
define('WB_QQ_DEFAULT_AKEY', '801093533');
define('WB_QQ_DEFAULT_SKEY', 'e411f7bbb4d6302fa54674a1280e3c4b');

///腾讯微博
define('WB_SOHU_DEFAULT_AKEY', 'HUG1V3WfjXeZuuXiLEUJ');
define('WB_SOHU_DEFAULT_SKEY', '^U!kl1gNtb7Lml*L#ds$JQgu%6Hlqm6JkX$u(d**');

///腾讯微博
define('WB_WY_DEFAULT_AKEY', 'SpgW49M9w0G6J8TG');
define('WB_WY_DEFAULT_SKEY', 'RXRd5cOFwwz2tMPxQL7S3krq2TxfH5Js');

///通用登录应用密钥（登录接口使用）
define('TB_LOGIN_APP_KEY', '12378141');
define('TB_LOGIN_APP_SECRET', 'eb69061c2e1c46a64f4acc691932fca4');
///淘宝沙箱应用密钥
define('TB_APP_KEY_0', '12321683');
define('TB_APP_SECRET_0', 'sandboxe4faff204a334a6e6e79ef597');
///淘宝应用密钥
define('TB_APP_KEY_1', '12321683');
define('TB_APP_SECRET_1', 'b1348afe4faff204a334a6e6e79ef597');
///TODO 上线后更换应用收费代码
define('TB_ARTICLE_CODE_1', 'ts-14975');

define('TB_XTTV_APP_KEY', '12480044');
define('TB_XTTV_APP_SECRET', 'fd2a3c5a40e77b071a15886c105a5e62');
define('TB_XTTV_CONTAINER', 'http://container.open.taobao.com/container?appkey=' . TB_XTTV_APP_KEY . '&encode=utf-8');

define('XT_FREE_BETA', 'true');
define('XT_SPIDER_NO_LIMIT', '/products,/poster,/shop,/item,/fiting,/vancl,/tv,/xiaohua,/pub,/ta,/wow');
///搜狐视频
define('SOTV_CONSUMER_KEY', 'a93a1b2d669a1529ff2312b2865f7956');
define('SOTV_CONSUMER_SECRET', 'nVBAx0QFx52E5hTXuMrlQIpRmbEvWiyZ');
define('SOTV_OAUTH_CALLBACK', 'http://open.tv.sohu.com/SDK/sotv4php/includes/callback.php');
define('XT_DOMAIN', 'xintaowang.com');
///统计密钥
define('XT_PIWIK_TOKEN', '7b5032253da51988db274fd11d9c9d1e');
define('XT_PIWIK_REST_URL', 'http://track.xintaowang.com/?module=API&language=zh-cn&format=JSON&token_auth=' . XT_PIWIK_TOKEN);
//是否沙箱
define('XT_IS_SANDBOX', 'false');
define('XT_LAZYLOAD_PIC', 'http://www.xintaowang.com/css/default/xintao/lazy.gif');
define('XT_LOADING_PIC', 'http://www.xintaowang.com/css/default/xintao/loading.gif');
//后台管理员登录淘宝回调
define('TB_CALLBACK', 'http://www.xintaowang.com/admin.php?m=mgr/admin.topCallback');
//前台淘宝会员登录淘宝回调
define('TB_LOGIN_CALLBACK', 'http://www.xintaowang.com/account.loginTB');
include_once 'function/xintao.func.php';
$XT_DOMAINS = include_once (dirname(__FILE__) . '/../xintao/domains.php'); //独立域名绑定
$userId = '';
preg_match('/t([0-9]+)\.xintaowang\.com/', $_SERVER['SERVER_NAME'], $matchs);
if (count($matchs) == 2) {
	$userId = $matchs[1];
} else {
	if (array_key_exists($_SERVER['SERVER_NAME'], $XT_DOMAINS)) { //如果存在该域名绑定
		if (!is_numeric($XT_DOMAINS[$_SERVER['SERVER_NAME']])) {
			header('HTTP/1.1 301 Moved Permanently');
			header('Location:http://' . $XT_DOMAINS[$_SERVER['SERVER_NAME']] . $_SERVER['REQUEST_URI']);
			exit;
		} else {
			$userId = $XT_DOMAINS[$_SERVER['SERVER_NAME']];
		}
	} else {
		xintao_error('您的站点[' . $_SERVER['SERVER_NAME'] . ']域名绑定尚未审核通过<br/>请联系客服QQ：153647646!');
	}
}
$CONFIG_FILE = get_config_array_path($userId);
if (file_exists($CONFIG_FILE)) { //微博站长是否配置了个人微博信息(数组模式)
	$CONFIG_ARRAY = include_once $CONFIG_FILE;
	///默认首页
	if ($_SERVER['SERVER_NAME'] == 'www.xintaotv.com') {
		define('R_DEF_MOD', 'movie');
	} else {
		define('R_DEF_MOD', isset ($CONFIG_ARRAY['R_DEF_MOD']) ? $CONFIG_ARRAY['R_DEF_MOD'] : 'pub');
	}

	///淘宝，新淘相关配置
	define('XT_IS_INIT', isset ($CONFIG_ARRAY['XT_IS_INIT']) ? $CONFIG_ARRAY['XT_IS_INIT'] : 'false');
	define('XT_USER_ID', isset ($CONFIG_ARRAY['XT_USER_ID']) ? $CONFIG_ARRAY['XT_USER_ID'] : '');
	define('XT_USER_NICK', isset ($CONFIG_ARRAY['XT_USER_NICK']) ? $CONFIG_ARRAY['XT_USER_NICK'] : '');
	define('XT_USER_PID', isset ($CONFIG_ARRAY['XT_USER_PID']) ? $CONFIG_ARRAY['XT_USER_PID'] : '');
	define('XT_USER_SPID', isset ($CONFIG_ARRAY['XT_USER_SPID']) ? $CONFIG_ARRAY['XT_USER_SPID'] : '');
	define('XT_VANCL_NICK', isset ($CONFIG_ARRAY['XT_VANCL_NICK']) ? $CONFIG_ARRAY['XT_VANCL_NICK'] : '');
	define('XT_SITE_DOMAIN', isset ($CONFIG_ARRAY['XT_SITE_DOMAIN']) ? $CONFIG_ARRAY['XT_SITE_DOMAIN'] : '');
	///统计标识
	define('XT_PIWIK_ID', isset ($CONFIG_ARRAY['XT_PIWIK_ID']) ? $CONFIG_ARRAY['XT_PIWIK_ID'] : '');
	define('XT_IS_DIRECT', isset ($CONFIG_ARRAY['XT_IS_DIRECT']) ? $CONFIG_ARRAY['XT_IS_DIRECT'] : 'true');
	///查看商品，店铺时是否提示登录
	define('XT_IS_LOGIN', isset ($CONFIG_ARRAY['XT_IS_LOGIN']) ? $CONFIG_ARRAY['XT_IS_LOGIN'] : 'false');
	///查看商品，店铺时是否提示发微博
	define('XT_IS_POST', isset ($CONFIG_ARRAY['XT_IS_POST']) ? $CONFIG_ARRAY['XT_IS_POST'] : 'false');
	///服务项目
	define('XT_APPSTORE', isset ($CONFIG_ARRAY['XT_APPSTORE']) ? $CONFIG_ARRAY['XT_APPSTORE'] : '');

	///腾讯微博
	define('WB_QQ_AKEY', isset ($CONFIG_ARRAY['WB_QQ_AKEY']) && !empty ($CONFIG_ARRAY['WB_QQ_AKEY']) ? $CONFIG_ARRAY['WB_QQ_AKEY'] : WB_QQ_DEFAULT_AKEY);
	define('WB_QQ_SKEY', isset ($CONFIG_ARRAY['WB_QQ_SKEY']) && !empty ($CONFIG_ARRAY['WB_QQ_SKEY']) ? $CONFIG_ARRAY['WB_QQ_SKEY'] : WB_QQ_DEFAULT_SKEY);
	/// 内置设置的token
	define('WB_QQ_UID', isset ($CONFIG_ARRAY['WB_QQ_UID']) ? $CONFIG_ARRAY['WB_QQ_UID'] : '');
	define('WB_QQ_NAME', isset ($CONFIG_ARRAY['WB_QQ_NAME']) ? $CONFIG_ARRAY['WB_QQ_NAME'] : '');
	define('WB_QQ_NICK', isset ($CONFIG_ARRAY['WB_QQ_NICK']) ? $CONFIG_ARRAY['WB_QQ_NICK'] : '');
	define('WB_QQ_USER_OAUTH_TOKEN', isset ($CONFIG_ARRAY['WB_QQ_USER_OAUTH_TOKEN']) ? $CONFIG_ARRAY['WB_QQ_USER_OAUTH_TOKEN'] : '');
	define('WB_QQ_USER_OAUTH_TOKEN_SECRET', isset ($CONFIG_ARRAY['WB_QQ_USER_OAUTH_TOKEN_SECRET']) ? $CONFIG_ARRAY['WB_QQ_USER_OAUTH_TOKEN_SECRET'] : '');
	///搜狐微博
	define('WB_SOHU_AKEY', isset ($CONFIG_ARRAY['WB_SOHU_AKEY']) && !empty ($CONFIG_ARRAY['WB_SOHU_AKEY']) ? $CONFIG_ARRAY['WB_SOHU_AKEY'] : WB_SOHU_DEFAULT_AKEY);
	define('WB_SOHU_SKEY', isset ($CONFIG_ARRAY['WB_SOHU_SKEY']) && !empty ($CONFIG_ARRAY['WB_SOHU_SKEY']) ? $CONFIG_ARRAY['WB_SOHU_SKEY'] : WB_SOHU_DEFAULT_SKEY);
	/// 内置设置的token
	define('WB_SOHU_UID', isset ($CONFIG_ARRAY['WB_SOHU_UID']) ? $CONFIG_ARRAY['WB_SOHU_UID'] : '');
	define('WB_SOHU_NAME', isset ($CONFIG_ARRAY['WB_SOHU_NAME']) ? $CONFIG_ARRAY['WB_SOHU_NAME'] : '');
	define('WB_SOHU_NICK', isset ($CONFIG_ARRAY['WB_SOHU_NICK']) ? $CONFIG_ARRAY['WB_SOHU_NICK'] : '');
	define('WB_SOHU_USER_OAUTH_TOKEN', isset ($CONFIG_ARRAY['WB_SOHU_USER_OAUTH_TOKEN']) ? $CONFIG_ARRAY['WB_SOHU_USER_OAUTH_TOKEN'] : '');
	define('WB_SOHU_USER_OAUTH_TOKEN_SECRET', isset ($CONFIG_ARRAY['WB_SOHU_USER_OAUTH_TOKEN_SECRET']) ? $CONFIG_ARRAY['WB_SOHU_USER_OAUTH_TOKEN_SECRET'] : '');
	///网易微博
	define('WB_WY_AKEY', isset ($CONFIG_ARRAY['WB_WY_AKEY']) && !empty ($CONFIG_ARRAY['WB_WY_AKEY']) ? $CONFIG_ARRAY['WB_WY_AKEY'] : WB_WY_DEFAULT_AKEY);
	define('WB_WY_SKEY', isset ($CONFIG_ARRAY['WB_WY_SKEY']) && !empty ($CONFIG_ARRAY['WB_WY_SKEY']) ? $CONFIG_ARRAY['WB_WY_SKEY'] : WB_WY_DEFAULT_SKEY);
	/// 内置设置的token
	define('WB_WY_UID', isset ($CONFIG_ARRAY['WB_WY_UID']) ? $CONFIG_ARRAY['WB_WY_UID'] : '');
	define('WB_WY_NAME', isset ($CONFIG_ARRAY['WB_WY_NAME']) ? $CONFIG_ARRAY['WB_WY_NAME'] : '');
	define('WB_WY_NICK', isset ($CONFIG_ARRAY['WB_WY_NICK']) ? $CONFIG_ARRAY['WB_WY_NICK'] : '');
	define('WB_WY_USER_OAUTH_TOKEN', isset ($CONFIG_ARRAY['WB_WY_USER_OAUTH_TOKEN']) ? $CONFIG_ARRAY['WB_WY_USER_OAUTH_TOKEN'] : '');
	define('WB_WY_USER_OAUTH_TOKEN_SECRET', isset ($CONFIG_ARRAY['WB_WY_USER_OAUTH_TOKEN_SECRET']) ? $CONFIG_ARRAY['WB_WY_USER_OAUTH_TOKEN_SECRET'] : '');

	/// 微博
	define('WB_AKEY', isset ($CONFIG_ARRAY['WB_AKEY']) && !empty ($CONFIG_ARRAY['WB_AKEY']) ? $CONFIG_ARRAY['WB_AKEY'] : WB_DEFAULT_AKEY);
	/// 微博 SECRET_KEY
	define('WB_SKEY', isset ($CONFIG_ARRAY['WB_SKEY']) && !empty ($CONFIG_ARRAY['WB_SKEY']) ? $CONFIG_ARRAY['WB_SKEY'] : WB_DEFAULT_SKEY);
	/// 官方微博功能中创建list使用的ID
	define('SYSTEM_SINA_UID', isset ($CONFIG_ARRAY['SYSTEM_SINA_UID']) ? $CONFIG_ARRAY['SYSTEM_SINA_UID'] : '');
	define('SYSTEM_SINA_USERNICK', isset ($CONFIG_ARRAY['SYSTEM_SINA_USERNICK']) ? $CONFIG_ARRAY['SYSTEM_SINA_USERNICK'] : '');

	/// 内置设置的token
	define('WB_USER_OAUTH_TOKEN', isset ($CONFIG_ARRAY['WB_USER_OAUTH_TOKEN']) ? $CONFIG_ARRAY['WB_USER_OAUTH_TOKEN'] : '');
	define('WB_USER_OAUTH_TOKEN_SECRET', isset ($CONFIG_ARRAY['WB_USER_OAUTH_TOKEN_SECRET']) ? $CONFIG_ARRAY['WB_USER_OAUTH_TOKEN_SECRET'] : '');

	/// 安装时的站长个人信息
	define('WB_USER_SITENAME', isset ($CONFIG_ARRAY['WB_USER_SITENAME']) ? $CONFIG_ARRAY['WB_USER_SITENAME'] : '');
	define('WB_USER_SITEINFO', isset ($CONFIG_ARRAY['WB_USER_SITEINFO']) ? $CONFIG_ARRAY['WB_USER_SITEINFO'] : '');
	define('WB_USER_NAME', isset ($CONFIG_ARRAY['WB_USER_NAME']) ? $CONFIG_ARRAY['WB_USER_NAME'] : '');
	define('WB_USER_EMAIL', isset ($CONFIG_ARRAY['WB_USER_EMAIL']) ? $CONFIG_ARRAY['WB_USER_EMAIL'] : '');
	define('WB_USER_QQ', isset ($CONFIG_ARRAY['WB_USER_QQ']) ? $CONFIG_ARRAY['WB_USER_QQ'] : '');
	define('WB_USER_MSN', isset ($CONFIG_ARRAY['WB_USER_MSN']) ? $CONFIG_ARRAY['WB_USER_MSN'] : '');
	define('WB_USER_TEL', isset ($CONFIG_ARRAY['WB_USER_TEL']) ? $CONFIG_ARRAY['WB_USER_TEL'] : '');

	define('XT_FREE_DATELINE', isset ($CONFIG_ARRAY['XT_FREE_DATELINE']) ? $CONFIG_ARRAY['XT_FREE_DATELINE'] : '');
	define('XT_APPSTORE_DATELINE', isset ($CONFIG_ARRAY['XT_APPSTORE_DATELINE']) ? $CONFIG_ARRAY['XT_APPSTORE_DATELINE'] : 'false');
	define('XT_TVAD_IS_SELLER', isset ($CONFIG_ARRAY['XT_TVAD_IS_SELLER']) ? $CONFIG_ARRAY['XT_TVAD_IS_SELLER'] : 'true');
	define('XT_SID', isset ($CONFIG_ARRAY['XT_SID']) ? $CONFIG_ARRAY['XT_SID'] : '');
	define('XT_IS_ICP', isset ($CONFIG_ARRAY['XT_IS_ICP']) ? $CONFIG_ARRAY['XT_IS_ICP'] : '');
	define('XT_IS_SIMPLE', isset ($CONFIG_ARRAY['XT_IS_SIMPLE']) ? $CONFIG_ARRAY['XT_IS_SIMPLE'] : 'true');
	define('XT_CLIENT_IP', isset ($CONFIG_ARRAY['XT_CLIENT_IP']) ? $CONFIG_ARRAY['XT_CLIENT_IP'] : '54.248.108.253');
	define('XT_DEF_SHARE_MOD', isset ($CONFIG_ARRAY['XT_DEF_SHARE_MOD']) ? $CONFIG_ARRAY['XT_DEF_SHARE_MOD'] : 'lady');
	define('XT_DEF_SHARE_SUB', isset ($CONFIG_ARRAY['XT_DEF_SHARE_SUB']) ? $CONFIG_ARRAY['XT_DEF_SHARE_SUB'] : '102');
	define('XT_IS_TAOKE_SHOP', isset ($CONFIG_ARRAY['XT_IS_TAOKE_SHOP']) ? $CONFIG_ARRAY['XT_IS_TAOKE_SHOP'] : 'false');
	define('XT_IS_CLOSED', isset ($CONFIG_ARRAY['XT_IS_CLOSED']) ? $CONFIG_ARRAY['XT_IS_CLOSED'] : 'false');
	define('XT_YINGXIAO_SELF', isset ($CONFIG_ARRAY['XT_YINGXIAO_SELF']) ? $CONFIG_ARRAY['XT_YINGXIAO_SELF'] : 'false');
	define('XT_IS_ITEMCLOSED', isset ($CONFIG_ARRAY['XT_IS_ITEMCLOSED']) ? $CONFIG_ARRAY['XT_IS_ITEMCLOSED'] : 'false');
	

} else {
	$CONFIG_FILE = get_config_path($userId);
	if (file_exists($CONFIG_FILE)) { //微博站长是否配置了个人微博信息
		require_once $CONFIG_FILE;
	} else {
		xintao_error('需订购增值服务');
	}
}

define('XT_DEFAULT_DOMAIN', 't' . XT_USER_ID . '.xintaowang.com');
///TODO 设置有效的服务

///收费标识
//免费版
define('XT_APPSTORE_FREE', '[ts-14975-1]');
//单店铺版(暂不开放)
define('XT_APPSTORE_SELLER_SINGLE', '[appstore-10911-2]');
//多店铺版(含淘宝客功能)预计50元
define('XT_APPSTORE_SELLER_MULTI', '[ts-14975-4]');
//淘客服务预计25元
define('XT_APPSTORE_TAOKE', '[ts-14975-5]');
//凡客服务预计15元(审核通过后开放)
define('XT_APPSTORE_VANCL', '[appstore-10911-5]');
//收费的前台功能
define('XT_FUNCS_SINGLE', 'products.,items.,item.,posters.,poster.,fiting.,tv.,tv/*,xiaohua.'); //单店铺，仅站内店铺，商品详情
define('XT_FUNCS_MULTI', 'products.,items.,item.,posters.,poster.,fiting.,tv.,tv/*,xiaohua.'); //多店铺，站内店铺，淘宝客相关
define('XT_FUNCS_TAOKE', 'items.,item.,posters.,poster.,fiting.,tv.,tv/*,xiaohua.'); //淘客
define('XT_FUNCS_VANCL', 'vancls.,vancl,xiaohua.'); //凡客
//前台收费功能列表
define('XT_FUNCS_FRONT', implode(',', array_unique(explode(',', XT_FUNCS_SINGLE . ',' . XT_FUNCS_MULTI . ',' . XT_FUNCS_TAOKE . ',' . XT_FUNCS_VANCL))));
$FUNCS_TEMP = array ();
if (check_appstore(explode(',', XT_APPSTORE_SELLER_SINGLE))) { //卖家单店铺
	define('XT_IS_SINGLE', 'true');
	$FUNCS_TEMP = array_merge($FUNCS_TEMP, explode(',', XT_FUNCS_SINGLE));
} else {
	define('XT_IS_SINGLE', 'false');
}
if (check_appstore(explode(',', XT_APPSTORE_SELLER_MULTI))) { //卖家多店铺
	define('XT_IS_MULTI', 'true');
	$FUNCS_TEMP = array_merge($FUNCS_TEMP, explode(',', XT_FUNCS_MULTI));
} else {
	define('XT_IS_MULTI', 'false');
}
if (check_appstore(explode(',', XT_APPSTORE_TAOKE)) || XT_IS_MULTI == 'true') { //淘客服务
	define('XT_IS_TAOKE', 'true');
	$FUNCS_TEMP = array_merge($FUNCS_TEMP, explode(',', XT_FUNCS_TAOKE));
} else {
	define('XT_IS_TAOKE', 'false');
}
if (check_appstore(explode(',', XT_APPSTORE_VANCL))) { //凡客服务
	define('XT_IS_VANCL', 'true');
	$FUNCS_TEMP = array_merge($FUNCS_TEMP, explode(',', XT_FUNCS_VANCL));
} else {
	define('XT_IS_VANCL', 'false');
}
if (XT_IS_SINGLE == 'true' || XT_IS_MULTI == 'true' || XT_IS_TAOKE == 'true' || XT_IS_VANCL == 'true') {
	define('XT_IS_WEIBO', 'true');
} else {
	define('XT_IS_WEIBO', 'false');
}
if ((XT_IS_SINGLE == 'true' || XT_IS_MULTI == 'true') && (XT_SIDS != '' || XT_SID != '')) {
	define('XT_IS_SELLER', 'true');
} else {
	define('XT_IS_SELLER', 'false');
}

///站内店铺
if (isset ($CONFIG_ARRAY['XT_SIDS']) && !empty ($CONFIG_ARRAY['XT_SIDS'])) {
	define('XT_SIDS', $CONFIG_ARRAY['XT_SIDS']);
	define('XT_SHOPS', $CONFIG_ARRAY['XT_SHOPS']);
	define('XT_CIDS', $CONFIG_ARRAY['XT_CIDS']);
}
elseif (XT_IS_SELLER == 'true' && XT_SID != '') {
	define('XT_SIDS', '[' . XT_SID . ']');
	define('XT_SHOPS', '[' . XT_USER_NICK . ']');
	define('XT_CIDS', '');
} else {
	define('XT_SIDS', '');
	define('XT_SHOPS', '');
	define('XT_CIDS', '');
}

///当前站点拥有的前台收费功能
define('XT_SITE_FUNCS_FRONT', implode(',', array_unique($FUNCS_TEMP)));

///TODO 处理过期的应用，阻止访问

///
if (XT_IS_SANDBOX == 'true') { //沙箱
	define('TB_APP_KEY_2', TB_APP_KEY_0);
	define('TB_APP_SECRET_2', TB_APP_SECRET_0);
	define('TB_ARTICLE_CODE_2', 'appstore-10911');
} else { //正式
	define('TB_APP_KEY_2', '12034285');
	define('TB_APP_SECRET_2', '2c18a03c14736c62a0b70804618f8c45');
	define('TB_ARTICLE_CODE_2', 'appstore-10911');
}

/// 淘宝数据组件的缓存KEY前缀
define('TB_CACHE_KEY_PRE', 'tbCache_others_');
/// 搜狐视频数据组件的缓存KEY前缀
define('TB_CACHE_TV_KEY_PRE', 'tbCache_tv_');
/// 淘宝商品数据组件的缓存KEY前缀
define('TB_CACHE_ITEMS_KEY_PRE', 'tbCache_items_');
define('TB_CACHE_ITEM_KEY_PRE', 'tbCache_item_');
/// 淘宝店铺数据组件的缓存KEY前缀
define('TB_CACHE_SHOPS_KEY_PRE', 'tbCache_shops_');
define('TB_CACHE_SHOP_KEY_PRE', 'tbCache_shop_');
/// 淘宝店铺数据组件的缓存KEY前缀
define('TB_CACHE_POSTERS_KEY_PRE', 'tbCache_posters_');
define('TB_CACHE_POSTER_KEY_PRE', 'tbCache_poster_');
/// 凡客数据组件的缓存KEY前缀
define('TB_CACHE_VANCLS_KEY_PRE', 'tbCache_vancls_');
define('TB_CACHE_VANCL_KEY_PRE', 'tbCache_vancl_');

/// 缓存组的KEY前缀
define('GROUP_CACHE_KEY_PRE', 'gCacheKey_' . XT_USER_ID . '_');
/// 数据组件的缓存KEY前缀
define('COM_CACHE_KEY_PRE', 'comCache_' . XT_USER_ID . '_');
/// cache下标定义 屏蔽回复
define('CACHE_DISABLED_COMMENT', 'disabled_comment');
/// cache下标定义  屏蔽微博
define('CACHE_DISABLED_WEIBO', 'disabled_weibo');
/// cache下标定义 昵称关键字
define('CACHE_DISABLED_NICK_KEYWORD', 'disabled_nick_keyword');
/// cache下标定义 内容关键字
define('CACHE_DISABLED_CONTENT_KEYWORD', 'disabled_content_keyword');
/// cache下标定义 通过认证的用户
define('CACHE_USER_VERIFY', 'user_verify_' . XT_USER_ID . '_');
/// cache下标前缀定义 @me,评论,粉丝未读数
define('CACHE_UNREAD_COUNTER', 'unread_counter_');
/// cache下标,用户后台配置缓存
define('CACHE_SYS_CONFIG', 'sys_config_' . XT_USER_ID . '_');
/// cache下标,用户自定义配置缓存
define('CACHE_USER_CONFIG', 'user_config_' . XT_USER_ID . '_');
/// 组件配置信息缓存
define('CACHE_COMPONENT_CFG', 'component_cfg_' . XT_USER_ID . '_');
/// 站点LOGO文件名
define('WB_LOGO_DEFAULT_NAME', 'img/logo.png');
define('WB_LOGO_WAP_DEFAULT_NAME', 'img/logo_wap.png');
define('WB_LOGO_OUTPUT_DEFAULT_NAME', 'img/logo_output.png');
define('WB_LOGO_FILE_NAME', '/data/logo/' . XT_USER_ID . '/logo_upload.png');
define('WB_LOGO_WAP_FILE_NAME', '/data/logo/' . XT_USER_ID . '/logo_upload_wap.png');
define('WB_LOGO_OUTPUT_FILE_NAME', '/data/logo/' . XT_USER_ID . '/logo_upload_output.png');
define('WB_LOGO_PREVIEW_FILE_NAME', '/data/logo/' . XT_USER_ID . '/logo_previews.png');
/// 站点地址栏文件名
define('WB_ICON_DEFAULT_NAME', 'img/logo/default_icon.png');
define('WB_ICON_FILE_NAME', '/data/logo/' . XT_USER_ID . '/icon_upload.png');
define('WB_ICON_PREVIEW_FILE_NAME', '/data/logo/' . XT_USER_ID . '/icon_previews.png');
/// 网站认证大图标
define('AUTH_BIG_ICON_DEFAULT_NAME', 'img/logo/default_v1.png');
define('AUTH_BIG_ICON_FILE_NAME', '/data/logo/' . XT_USER_ID . '/big_auth_icon_upload.png');
define('AUTH_BIG_ICON_PREVIEW_FILE_NAME', '/data/logo/' . XT_USER_ID . '/big_auth_icon_previews.png');
/// 网站认证小图标
define('AUTH_SMALL_ICON_DEFAULT_NAME', 'img/logo/default_v2.png');
define('AUTH_SMALL_ICON_FILE_NAME', '/data/logo/' . XT_USER_ID . '/small_auth_icon_upload.png');
define('AUTH_SMALL_ICON_PREVIEW_FILE_NAME', '/data/logo/' . XT_USER_ID . '/small_auth_icon_previews.png');

define('WB_CELEB_PREVIEW_FILE_NAME', '/data/logo/' . XT_USER_ID . '/celeb_previews.png');
define('WB_CELEB_OUTPUT_FILE_NAME', '/data/logo/' . XT_USER_ID . '/celeb_banner.png');
define('WB_SKIN_BGIMG_UPLOAD_DIR', '/data/skinbg/');
/// 名人堂banner图
define('WB_CELEB_BANNER_FILE_NAME', '/data/logo/' . XT_USER_ID . '/celeb_banner.png');

/// TOP	文件的存放目录
define('P_TOP', dirname(__FILE__) . "/modules/top/request");
/// TOP文件扩展名
define('EXT_TOP', "Request.php");

///推广标识
define('OUTER_CODE_ITEMS', "weigou001");
define('OUTER_CODE_CATS', "weigou002");
define('OUTER_CODE_SHOPS', "weigou003");
define('OUTER_CODE_KEYWORDS', "weigou004");
define('OUTER_CODE_MALLS', "weigou005");

///新淘网数据表
define('T_XT_DOMAINS', 'xt_domains');
define('T_XT_BUCHANG', 'xt_buchang');
define('T_XT_TAOKESHOP', 'taokeshop');
define('T_XT_POSTER', 'xt_poster');
define('T_XT_VANCL_CAT', 'xt_vancl_cat');
define('T_XT_VANCL_PRODUCT', 'xt_vancl_product');
define('T_XT_VANCL_PRODUCT_DESC', 'xt_vancl_product_desc');
define('T_XT_VANCL_WASHING', 'xt_vancl_washing');
define('T_XT_APPSTORE', 'xt_appstore');
define('T_XT_TAOBAO_USER', 'xt_taobao_user');
define('T_XT_USER_SHOP', 'xt_user_shop');
define('T_XT_SEO', 'xt_seo');
define('T_XT_CRON', 'xt_cron');
define('T_XT_SITEMAP', 'xt_sitemap');
define('T_XT_FREE', 'xt_free');
define('T_XT_TV', 'xt_tv');
define('T_XT_YINGXIAO', 'xt_yingxiao');
define('T_XT_XIAOHUA', 'xt_xiaohua');
define('T_XT_USER_SHOP_WEIBO', 'xt_user_shop_weibo');
define('T_XT_USER_ITEM', 'xt_user_item');
define('T_XT_USER_ITEM_WEIBO', 'xt_user_item_weibo');
define('T_XT_TAOKE_ITEM', 'xt_taoke_item');
define('T_XT_TAOKE_ITEM_WEIBO', 'xt_taoke_item_weibo');
define('T_XT_WEIBO_CRON', 'xt_weibo_cron');
define('T_XT_WOW_LADY', 'xt_wow_lady');
define('T_XT_WOW_MAN', 'xt_wow_man');
define('T_XT_WOW_LIFE', 'xt_wow_life');
define('T_XT_WOW_IDEA', 'xt_wow_idea');
define('T_XT_WOW_TAOKE_ITEM', 'xt_wow_taoke_item');
define('T_XT_WOW_TAOKE_ITEM_CAT', 'xt_wow_taoke_item_cat');
define('T_XT_WOW_USER_ITEM', 'xt_wow_user_item');

//新淘高清视频数据表
define('T_XTTV_USER', 'xttv_user');
define('T_XTTV_PLAY_HISTORY', 'xttv_play_history');
define('T_XTTV_ADITEM', 'xttv_aditem');
define('T_XTTV_COVERS', 'xttv_covers');

define('HDOM_TYPE_ELEMENT', 1);
define('HDOM_TYPE_COMMENT', 2);
define('HDOM_TYPE_TEXT', 3);
define('HDOM_TYPE_ENDTAG', 4);
define('HDOM_TYPE_ROOT', 5);
define('HDOM_TYPE_UNKNOWN', 6);
define('HDOM_QUOTE_DOUBLE', 0);
define('HDOM_QUOTE_SINGLE', 1);
define('HDOM_QUOTE_NO', 3);
define('HDOM_INFO_BEGIN', 0);
define('HDOM_INFO_END', 1);
define('HDOM_INFO_QUOTE', 2);
define('HDOM_INFO_SPACE', 3);
define('HDOM_INFO_TEXT', 4);
define('HDOM_INFO_INNER', 5);
define('HDOM_INFO_OUTER', 6);
define('HDOM_INFO_ENDSPACE', 7);
define('DEFAULT_TARGET_CHARSET', 'UTF-8');
define('DEFAULT_BR_TEXT', "\r\n");

/*
*    判断是否为搜索引擎蜘蛛
*/
//$isCrawler = false;
//$agent = strtolower($_SERVER['HTTP_USER_AGENT']);
//if (!empty ($agent)) {
//	$spiderSite = array (
//		"baiduspider",
//		"googlebot"
//	);
//	foreach ($spiderSite as $val) {
//		if (strpos($agent, $val) !== false) {
//			$isCrawler = true;
//		}
//	}
//}
//此类功能不需要蜘蛛限制
if (is_crawler()) {
	define('XT_ISCRAWLER', TRUE);
} else {
	define('XT_ISCRAWLER', FALSE);
}