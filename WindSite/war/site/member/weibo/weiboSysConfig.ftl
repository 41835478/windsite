<?php


/**
 * 
 * @Project			xintao
 * @Author			fxy060608
 * @Brief			站长微博系统配置文件
 */

///---------------------------------------------------------------------
<#if config??>
/// 微博 APP_KEY
define('WB_AKEY', '${config.app_key}');
/// 微博 SECRET_KEY
define('WB_SKEY', '${config.app_secret}');
/// 内置设置的token
define('WB_USER_OAUTH_TOKEN',			'${config.user_oauth_token}');
define('WB_USER_OAUTH_TOKEN_SECRET',	'${config.user_oauth_token_secret}');
/// 个人信息
define('WB_USER_SITENAME', '<#if ''!=config.site_name>${config.site_name?replace("'","\\'")}</#if>');
define('WB_USER_SITEINFO', '<#if ''!=config.site_info>${config.site_info?replace("'","\\'")}</#if>');
define('WB_USER_NAME', 'fxy060608');
define('WB_USER_EMAIL', 'fxy060608@gmail.com');
define('WB_USER_QQ', '153647646');
define('WB_USER_MSN', 'fxy_060608@hotmail.com');
define('WB_USER_TEL', '15801238654');

///新淘网旗下返利站点微博站长系统配置信息
function getXtFanLiWeiboSysConfig() {
	return array (
		'rewrite_enable' => '${config.rewrite_enable}',
		'logo' => '<#if ''!=config.logo>${config.logo?replace("'","\\'")}</#if>',
		'login_way' => '${config.login_way}',
		'third_code' => '<#if ''!=config.third_code>${config.third_code?replace("'","\\'")}</#if>',
		'site_record' => '<#if ''!=config.site_record>${config.site_record?replace("'","\\'")}</#if>',
		'address_icon' => '<#if ''!=config.address_icon>${config.address_icon?replace("'","\\'")}</#if>',
		'head_link' => '<#if ''!=config.head_link>${config.head_link?replace("'","\\'")}</#if>',
		'foot_link' => '<#if ''!=config.foot_link>${config.foot_link?replace("'","\\'")}</#if>',
		'profile_link' => '<#if ''!=config.profile_link>${config.profile_link?replace("'","\\'")}</#if>',
		'authen_enable' => '${config.authen_enable}',
		'authen_big_icon' => '<#if ''!=config.authen_big_icon>${config.authen_big_icon?replace("'","\\'")}</#if>',
		'authen_small_icon' => '<#if ''!=config.authen_small_icon>${config.authen_small_icon?replace("'","\\'")}</#if>',
		'skin_default' => '${config.skin_default}',
		'ad_header' => '<#if ''!=config.ad_header>${config.ad_header?replace("'","\\'")}</#if>',
		'guide_auto_follow' => '${config.guide_auto_follow}',
		'ad_footer' => '<#if ''!=config.ad_footer>${config.ad_footer?replace("'","\\'")}</#if>',
		'title' => '<#if ''!=config.title>${config.title?replace("'","\\'")}</#if>',
		'text' => '<#if ''!=config.text>${config.text?replace("'","\\'")}</#if>',
		'bg_pic' => '<#if ''!=config.bg_pic>${config.bg_pic?replace("'","\\'")}</#if>',
		'oper' => '${config.oper}',
		'topic' => '<#if ''!=config.topic>${config.topic?replace("'","\\'")}</#if>',
		'link' => '<#if ''!=config.link>${config.link?replace("'","\\'")}</#if>',
		'btnTitle' => '<#if ''!=config.btnTitle>${config.btnTitle?replace("'","\\'")}</#if>',
		'guide_auto_follow_id' => '${config.guide_auto_follow_id}',
		'authen_small_icon_title' => '<#if ''!=config.authen_small_icon_title>${config.authen_small_icon_title?replace("'","\\'")}</#if>',
		'site_name' => '<#if config.site_name>${config.site_name?replace("'","\\'")}</#if>',
		'wb_version' => '${config.wb_version}',
		'app_key' => '${config.app_key}',
		'app_secret' => '${config.app_secret}',
		'user_oauth_token' => '${config.user_oauth_token}',
		'user_oauth_token_secret' => '${config.user_oauth_token_secret}',
		'sina_uid' => '${config.sina_uid}',
		'site_uid' => '${config.site_uid}'
	);
}
</#if>
