package com.wind.site.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 新版本微博系统配置
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_weibo21_sysconfig")
public class NewWeiboSysConfig implements Serializable {

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

	private String logo;

	private String login_way;

	private String third_code;

	private String site_record;

	private String address_icon;

	private String head_link;

	private String foot_link;

	private String authen_type;

	private String authen_big_icon;

	private String authen_small_icon;

	private String skin_default;

	private String ad_header;

	private String guide_auto_follow;

	private String ad_footer;

	private String title;

	private String text;

	private String bg_pic;

	private String oper;

	private String topic;

	private String link;

	private String btnTitle;

	private String guide_auto_follow_id;

	private String authen_small_icon_title;

	private String ad_setting;

	private String microInterview_setting;

	private String wb_page_type;

	private String wb_header_model;

	private String wb_header_htmlcode;

	private String api_checking;

	private String xwb_discuz_url;

	private String xwb_discuz_enable;

	private String use_persion_domain;

	private String site_short_link;

	private String microLive_setting;

	private String default_use_custom;

	private String open_user_local_relationship;

	private String xwb_strategy;

	private String sysLoginModel;

	private String xwb_login_group_id;

	private String site_name;

	private String wb_version;

	private String app_key;

	private String app_secret;

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
	 * @return the authen_type
	 */
	public String getAuthen_type() {
		return authen_type;
	}

	/**
	 * @param authenType
	 *            the authen_type to set
	 */
	public void setAuthen_type(String authenType) {
		authen_type = authenType;
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
	 * @return the ad_setting
	 */
	public String getAd_setting() {
		return ad_setting;
	}

	/**
	 * @param adSetting
	 *            the ad_setting to set
	 */
	public void setAd_setting(String adSetting) {
		ad_setting = adSetting;
	}

	/**
	 * @return the microInterview_setting
	 */
	public String getMicroInterview_setting() {
		return microInterview_setting;
	}

	/**
	 * @param microInterviewSetting
	 *            the microInterview_setting to set
	 */
	public void setMicroInterview_setting(String microInterviewSetting) {
		microInterview_setting = microInterviewSetting;
	}

	/**
	 * @return the wb_page_type
	 */
	public String getWb_page_type() {
		return wb_page_type;
	}

	/**
	 * @param wbPageType
	 *            the wb_page_type to set
	 */
	public void setWb_page_type(String wbPageType) {
		wb_page_type = wbPageType;
	}

	/**
	 * @return the wb_header_model
	 */
	public String getWb_header_model() {
		return wb_header_model;
	}

	/**
	 * @param wbHeaderModel
	 *            the wb_header_model to set
	 */
	public void setWb_header_model(String wbHeaderModel) {
		wb_header_model = wbHeaderModel;
	}

	/**
	 * @return the wb_header_htmlcode
	 */
	public String getWb_header_htmlcode() {
		return wb_header_htmlcode;
	}

	/**
	 * @param wbHeaderHtmlcode
	 *            the wb_header_htmlcode to set
	 */
	public void setWb_header_htmlcode(String wbHeaderHtmlcode) {
		wb_header_htmlcode = wbHeaderHtmlcode;
	}

	/**
	 * @return the api_checking
	 */
	public String getApi_checking() {
		return api_checking;
	}

	/**
	 * @param apiChecking
	 *            the api_checking to set
	 */
	public void setApi_checking(String apiChecking) {
		api_checking = apiChecking;
	}

	/**
	 * @return the xwb_discuz_url
	 */
	public String getXwb_discuz_url() {
		return xwb_discuz_url;
	}

	/**
	 * @param xwbDiscuzUrl
	 *            the xwb_discuz_url to set
	 */
	public void setXwb_discuz_url(String xwbDiscuzUrl) {
		xwb_discuz_url = xwbDiscuzUrl;
	}

	/**
	 * @return the xwb_discuz_enable
	 */
	public String getXwb_discuz_enable() {
		return xwb_discuz_enable;
	}

	/**
	 * @param xwbDiscuzEnable
	 *            the xwb_discuz_enable to set
	 */
	public void setXwb_discuz_enable(String xwbDiscuzEnable) {
		xwb_discuz_enable = xwbDiscuzEnable;
	}

	/**
	 * @return the use_persion_domain
	 */
	public String getUse_persion_domain() {
		return use_persion_domain;
	}

	/**
	 * @param usePersionDomain
	 *            the use_persion_domain to set
	 */
	public void setUse_persion_domain(String usePersionDomain) {
		use_persion_domain = usePersionDomain;
	}

	/**
	 * @return the site_short_link
	 */
	public String getSite_short_link() {
		return site_short_link;
	}

	/**
	 * @param siteShortLink
	 *            the site_short_link to set
	 */
	public void setSite_short_link(String siteShortLink) {
		site_short_link = siteShortLink;
	}

	/**
	 * @return the microLive_setting
	 */
	public String getMicroLive_setting() {
		return microLive_setting;
	}

	/**
	 * @param microLiveSetting
	 *            the microLive_setting to set
	 */
	public void setMicroLive_setting(String microLiveSetting) {
		microLive_setting = microLiveSetting;
	}

	/**
	 * @return the default_use_custom
	 */
	public String getDefault_use_custom() {
		return default_use_custom;
	}

	/**
	 * @param defaultUseCustom
	 *            the default_use_custom to set
	 */
	public void setDefault_use_custom(String defaultUseCustom) {
		default_use_custom = defaultUseCustom;
	}

	/**
	 * @return the open_user_local_relationship
	 */
	public String getOpen_user_local_relationship() {
		return open_user_local_relationship;
	}

	/**
	 * @param openUserLocalRelationship
	 *            the open_user_local_relationship to set
	 */
	public void setOpen_user_local_relationship(String openUserLocalRelationship) {
		open_user_local_relationship = openUserLocalRelationship;
	}

	/**
	 * @return the xwb_strategy
	 */
	public String getXwb_strategy() {
		return xwb_strategy;
	}

	/**
	 * @param xwbStrategy
	 *            the xwb_strategy to set
	 */
	public void setXwb_strategy(String xwbStrategy) {
		xwb_strategy = xwbStrategy;
	}

	/**
	 * @return the sysLoginModel
	 */
	public String getSysLoginModel() {
		return sysLoginModel;
	}

	/**
	 * @param sysLoginModel
	 *            the sysLoginModel to set
	 */
	public void setSysLoginModel(String sysLoginModel) {
		this.sysLoginModel = sysLoginModel;
	}

	/**
	 * @return the xwb_login_group_id
	 */
	public String getXwb_login_group_id() {
		return xwb_login_group_id;
	}

	/**
	 * @param xwbLoginGroupId
	 *            the xwb_login_group_id to set
	 */
	public void setXwb_login_group_id(String xwbLoginGroupId) {
		xwb_login_group_id = xwbLoginGroupId;
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

	/**
	 * @return the sina_uid
	 */
	public String getSina_uid() {
		return sina_uid;
	}

	/**
	 * @param sinaUid
	 *            the sina_uid to set
	 */
	public void setSina_uid(String sinaUid) {
		sina_uid = sinaUid;
	}

	/**
	 * @return the site_uid
	 */
	public String getSite_uid() {
		return site_uid;
	}

	/**
	 * @param siteUid
	 *            the site_uid to set
	 */
	public void setSite_uid(String siteUid) {
		site_uid = siteUid;
	}

	/**
	 * @return the nickname
	 */
	public String getNickname() {
		return nickname;
	}

	/**
	 * @param nickname
	 *            the nickname to set
	 */
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	/**
	 * @return the user_oauth_token
	 */
	public String getUser_oauth_token() {
		return user_oauth_token;
	}

	/**
	 * @param userOauthToken
	 *            the user_oauth_token to set
	 */
	public void setUser_oauth_token(String userOauthToken) {
		user_oauth_token = userOauthToken;
	}

	/**
	 * @return the user_oauth_token_secret
	 */
	public String getUser_oauth_token_secret() {
		return user_oauth_token_secret;
	}

	/**
	 * @param userOauthTokenSecret
	 *            the user_oauth_token_secret to set
	 */
	public void setUser_oauth_token_secret(String userOauthTokenSecret) {
		user_oauth_token_secret = userOauthTokenSecret;
	}

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

}
