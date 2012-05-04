package com.wind.site.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

/**
 * 返利版站长微博设置
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_weibo_sysconfig")
public class WeiboSysConfig implements Serializable {

	private static final long serialVersionUID = 1L;
	/**
	 * 站点标识
	 */
	@Id
	private String site_id;
	/**
	 * 站长标识
	 */
	private String user_id;
	/**
	 * 站长昵称
	 */
	private String nick;
	/**
	 * Rewrite设置 0.不开启 1.开启
	 */
	private String rewrite_enable = "0";// 1
	/**
	 * logo图标
	 */
	private String logo = "";// 1
	/**
	 * 登录方式 1.仅使用新浪帐号直接登录 2.仅使用原有站点帐号登录 3. 使用新浪帐号与原有站点帐号并存方式登录
	 */
	private String login_way = "2";// 1
	/**
	 * 网站第三方统计代码
	 */
	@Lob
	private String third_code = "";// 1
	/**
	 * 网站备案信息代码
	 */
	private String site_record = "";// 京ICP备10035914号 1
	/**
	 * 网站地址图标
	 */
	private String address_icon = "";// 1
	/**
	 * 页首链接
	 */
	@Lob
	private String head_link = "[]";// {"1":{"link_name":"\u65b0\u6dd8\u7f51","link_address":"http:\/\/www.xintaonet.com"},"2":{"link_name":"\u65b0\u6dd8\u5bb6\u56ed","link_address":"http:\/\/home.xintaonet.com"}}
	/**
	 * 用户资料下方广告位链接
	 */
	@Lob
	private String profile_link = "[]";// {"1":{"link_name":"\u65b0\u6dd8\u7f51","link_address":"http:\/\/www.xintaonet.com"},"2":{"link_name":"\u65b0\u6dd8\u5bb6\u56ed","link_address":"http:\/\/home.xintaonet.com"}}
	// 1
	/**
	 * 页尾链接
	 */
	@Lob
	private String foot_link = "[]";// [] 1
	/**
	 * 认证设置
	 */
	private String authen_enable = "";// 0 1
	/**
	 * 认证大图标
	 */
	private String authen_big_icon = "var/data/logo/big_auth_icon.png";// var/data/logo/big_auth_icon.png
	/**
	 * 认证小图标
	 */
	// 1
	private String authen_small_icon = "var/data/logo/small_auth_icon.png";// var/data/logo/small_auth_icon.png
	// 1
	/**
	 * 默认皮肤设置
	 */
	private String skin_default = "6";// 1
	/**
	 * header广告代码
	 */
	@Lob
	private String ad_header = "";// 1
	/**
	 * 登录引导自动关注开关
	 */
	private String guide_auto_follow = "1";// 1 1
	/**
	 * footer广告代码
	 */
	@Lob
	private String ad_footer = "";// <a href="http://x.weibo.com"
	// target="_blank"><img
	// src="var/upload/footer_ad.png"></a> 1
	/**
	 * 用户首页聚焦位:标题
	 */
	private String title = "";// 今天您网购返利了吗？ 2
	/**
	 * 用户首页聚焦位:文本
	 */
	@Lob
	private String text = "";// 欢迎大家分享购物返利心得 2
	private String bg_pic = "";// 2
	/**
	 * 用户首页聚焦位：操作设置（1：发布微博，2：跳转到其他页面）
	 */
	private String oper = "1";// 2
	/**
	 * 用户首页聚焦位:话题
	 */
	private String topic = "";// 购物返利 2
	/**
	 * 用户首页聚焦位:跳转链接
	 */
	private String link = "";// 2
	/**
	 * 用户首页聚焦位:按钮标题
	 */
	private String btnTitle = "";// 发布微博 2
	/**
	 * 自动关注的用户列表ID
	 */
	private String guide_auto_follow_id = "3";// 1
	/**
	 * 认证小图标标题
	 */
	private String authen_small_icon_title = "";// 1
	/**
	 * 网站名称
	 */
	private String site_name = "";// 购物微博 1
	/**
	 * 站点描述
	 */
	@Lob
	private String site_info = "";//
	/**
	 * wb_version
	 */
	private String wb_version = "1.1.0";// 1
	/**
	 * app_key
	 */
	private String app_key = "3812233997";// 1
	/**
	 * app_secret
	 */
	private String app_secret = "b79fe224dbed1917b323d464ecf11c94";// 1
	/**
	 * 新浪微博用户标识
	 */
	private String sina_uid;
	/**
	 * DiscuzX用户标识
	 */
	private String site_uid;
	/**
	 * 内置站长微博用户昵称
	 */
	private String nickname;
	/**
	 * 站长内置TOKEN
	 */
	private String user_oauth_token;
	/**
	 * 站长内置SECRET
	 */
	private String user_oauth_token_secret;

	/**
	 * @return the site_id
	 */
	public String getSite_id() {
		return site_id;
	}

	/**
	 * @param siteId
	 *            the site_id to set
	 */
	public void setSite_id(String siteId) {
		site_id = siteId;
	}

	/**
	 * @return the user_id
	 */
	public String getUser_id() {
		return user_id;
	}

	/**
	 * @param userId
	 *            the user_id to set
	 */
	public void setUser_id(String userId) {
		user_id = userId;
	}

	/**
	 * @return the nick
	 */
	public String getNick() {
		return nick;
	}

	/**
	 * @param nick
	 *            the nick to set
	 */
	public void setNick(String nick) {
		this.nick = nick;
	}

	/**
	 * @return the rewrite_enable
	 */
	public String getRewrite_enable() {
		return rewrite_enable;
	}

	/**
	 * @param rewriteEnable
	 *            the rewrite_enable to set
	 */
	public void setRewrite_enable(String rewriteEnable) {
		rewrite_enable = rewriteEnable;
	}

	/**
	 * @return the logo
	 */
	public String getLogo() {
		return logo;
	}

	/**
	 * @param logo
	 *            the logo to set
	 */
	public void setLogo(String logo) {
		this.logo = logo;
	}

	/**
	 * @return the login_way
	 */
	public String getLogin_way() {
		return login_way;
	}

	/**
	 * @param loginWay
	 *            the login_way to set
	 */
	public void setLogin_way(String loginWay) {
		login_way = loginWay;
	}

	/**
	 * @return the third_code
	 */
	public String getThird_code() {
		return third_code;
	}

	/**
	 * @param thirdCode
	 *            the third_code to set
	 */
	public void setThird_code(String thirdCode) {
		third_code = thirdCode;
	}

	/**
	 * @return the site_record
	 */
	public String getSite_record() {
		return site_record;
	}

	/**
	 * @param siteRecord
	 *            the site_record to set
	 */
	public void setSite_record(String siteRecord) {
		site_record = siteRecord;
	}

	/**
	 * @return the address_icon
	 */
	public String getAddress_icon() {
		return address_icon;
	}

	/**
	 * @param addressIcon
	 *            the address_icon to set
	 */
	public void setAddress_icon(String addressIcon) {
		address_icon = addressIcon;
	}

	/**
	 * @return the head_link
	 */
	public String getHead_link() {
		return head_link;
	}

	/**
	 * @param headLink
	 *            the head_link to set
	 */
	public void setHead_link(String headLink) {
		head_link = headLink;
	}

	/**
	 * @return the foot_link
	 */
	public String getFoot_link() {
		return foot_link;
	}

	/**
	 * @param footLink
	 *            the foot_link to set
	 */
	public void setFoot_link(String footLink) {
		foot_link = footLink;
	}

	/**
	 * @return the authen_enable
	 */
	public String getAuthen_enable() {
		return authen_enable;
	}

	/**
	 * @param authenEnable
	 *            the authen_enable to set
	 */
	public void setAuthen_enable(String authenEnable) {
		authen_enable = authenEnable;
	}

	/**
	 * @return the authen_big_icon
	 */
	public String getAuthen_big_icon() {
		return authen_big_icon;
	}

	/**
	 * @param authenBigIcon
	 *            the authen_big_icon to set
	 */
	public void setAuthen_big_icon(String authenBigIcon) {
		authen_big_icon = authenBigIcon;
	}

	/**
	 * @return the authen_small_icon
	 */
	public String getAuthen_small_icon() {
		return authen_small_icon;
	}

	/**
	 * @param authenSmallIcon
	 *            the authen_small_icon to set
	 */
	public void setAuthen_small_icon(String authenSmallIcon) {
		authen_small_icon = authenSmallIcon;
	}

	/**
	 * @return the skin_default
	 */
	public String getSkin_default() {
		return skin_default;
	}

	/**
	 * @param skinDefault
	 *            the skin_default to set
	 */
	public void setSkin_default(String skinDefault) {
		skin_default = skinDefault;
	}

	/**
	 * @return the ad_header
	 */
	public String getAd_header() {
		return ad_header;
	}

	/**
	 * @param adHeader
	 *            the ad_header to set
	 */
	public void setAd_header(String adHeader) {
		ad_header = adHeader;
	}

	/**
	 * @return the guide_auto_follow
	 */
	public String getGuide_auto_follow() {
		return guide_auto_follow;
	}

	/**
	 * @param guideAutoFollow
	 *            the guide_auto_follow to set
	 */
	public void setGuide_auto_follow(String guideAutoFollow) {
		guide_auto_follow = guideAutoFollow;
	}

	/**
	 * @return the ad_footer
	 */
	public String getAd_footer() {
		return ad_footer;
	}

	/**
	 * @param adFooter
	 *            the ad_footer to set
	 */
	public void setAd_footer(String adFooter) {
		ad_footer = adFooter;
	}

	/**
	 * @return the title
	 */
	public String getTitle() {
		return title;
	}

	/**
	 * @param title
	 *            the title to set
	 */
	public void setTitle(String title) {
		this.title = title;
	}

	/**
	 * @return the text
	 */
	public String getText() {
		return text;
	}

	/**
	 * @param text
	 *            the text to set
	 */
	public void setText(String text) {
		this.text = text;
	}

	/**
	 * @return the bg_pic
	 */
	public String getBg_pic() {
		return bg_pic;
	}

	/**
	 * @param bgPic
	 *            the bg_pic to set
	 */
	public void setBg_pic(String bgPic) {
		bg_pic = bgPic;
	}

	/**
	 * @return the oper
	 */
	public String getOper() {
		return oper;
	}

	/**
	 * @param oper
	 *            the oper to set
	 */
	public void setOper(String oper) {
		this.oper = oper;
	}

	/**
	 * @return the topic
	 */
	public String getTopic() {
		return topic;
	}

	/**
	 * @param topic
	 *            the topic to set
	 */
	public void setTopic(String topic) {
		this.topic = topic;
	}

	/**
	 * @return the link
	 */
	public String getLink() {
		return link;
	}

	/**
	 * @param link
	 *            the link to set
	 */
	public void setLink(String link) {
		this.link = link;
	}

	/**
	 * @return the btnTitle
	 */
	public String getBtnTitle() {
		return btnTitle;
	}

	/**
	 * @param btnTitle
	 *            the btnTitle to set
	 */
	public void setBtnTitle(String btnTitle) {
		this.btnTitle = btnTitle;
	}

	/**
	 * @return the guide_auto_follow_id
	 */
	public String getGuide_auto_follow_id() {
		return guide_auto_follow_id;
	}

	/**
	 * @param guideAutoFollowId
	 *            the guide_auto_follow_id to set
	 */
	public void setGuide_auto_follow_id(String guideAutoFollowId) {
		guide_auto_follow_id = guideAutoFollowId;
	}

	/**
	 * @return the authen_small_icon_title
	 */
	public String getAuthen_small_icon_title() {
		return authen_small_icon_title;
	}

	/**
	 * @param authenSmallIconTitle
	 *            the authen_small_icon_title to set
	 */
	public void setAuthen_small_icon_title(String authenSmallIconTitle) {
		authen_small_icon_title = authenSmallIconTitle;
	}

	/**
	 * @return the site_name
	 */
	public String getSite_name() {
		return site_name;
	}

	/**
	 * @param siteName
	 *            the site_name to set
	 */
	public void setSite_name(String siteName) {
		site_name = siteName;
	}

	/**
	 * @return the wb_version
	 */
	public String getWb_version() {
		return wb_version;
	}

	/**
	 * @param wbVersion
	 *            the wb_version to set
	 */
	public void setWb_version(String wbVersion) {
		wb_version = wbVersion;
	}

	/**
	 * @return the app_key
	 */
	public String getApp_key() {
		return app_key;
	}

	/**
	 * @param appKey
	 *            the app_key to set
	 */
	public void setApp_key(String appKey) {
		app_key = appKey;
	}

	/**
	 * @return the app_secret
	 */
	public String getApp_secret() {
		return app_secret;
	}

	/**
	 * @param appSecret
	 *            the app_secret to set
	 */
	public void setApp_secret(String appSecret) {
		app_secret = appSecret;
	}

	public void setSite_info(String site_info) {
		this.site_info = site_info;
	}

	public String getSite_info() {
		return site_info;
	}

	public void setProfile_link(String profile_link) {
		this.profile_link = profile_link;
	}

	public String getProfile_link() {
		return profile_link;
	}

	public void setUser_oauth_token(String user_oauth_token) {
		this.user_oauth_token = user_oauth_token;
	}

	public String getUser_oauth_token() {
		return user_oauth_token;
	}

	public void setUser_oauth_token_secret(String user_oauth_token_secret) {
		this.user_oauth_token_secret = user_oauth_token_secret;
	}

	public String getUser_oauth_token_secret() {
		return user_oauth_token_secret;
	}

	public void setSina_uid(String sina_uid) {
		this.sina_uid = sina_uid;
	}

	public String getSina_uid() {
		return sina_uid;
	}

	public void setSite_uid(String site_uid) {
		this.site_uid = site_uid;
	}

	public String getSite_uid() {
		return site_uid;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getNickname() {
		return nickname;
	}

}
