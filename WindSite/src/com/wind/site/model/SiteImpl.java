package com.wind.site.model;

import java.util.List;
import java.util.Map;

import javax.persistence.Entity;
import javax.persistence.EntityResult;
import javax.persistence.FieldResult;
import javax.persistence.Id;
import javax.persistence.NamedNativeQueries;
import javax.persistence.NamedNativeQuery;
import javax.persistence.SqlResultSetMapping;
import javax.persistence.Transient;

import com.wind.site.util.WindSiteRestUtil;

/**
 * 站点基础类(查询组装用)
 * 
 * @author fxy
 * 
 */

@Entity
@SqlResultSetMapping(name = "siteImpl", entities = { @EntityResult(entityClass = SiteImpl.class, fields = {
		@FieldResult(name = "sid", column = "sid"),
		@FieldResult(name = "user_id", column = "user_id"),
		@FieldResult(name = "appType", column = "appType"),
		@FieldResult(name = "nick", column = "nick"),
		@FieldResult(name = "pid", column = "pid"),
		@FieldResult(name = "siteTitle", column = "siteTitle"),
		@FieldResult(name = "analyticsType", column = "analyticsType"),
		@FieldResult(name = "laid", column = "laid"),
		@FieldResult(name = "lid", column = "lid"),
		@FieldResult(name = "gid", column = "gid"),
		@FieldResult(name = "www", column = "www"),
		@FieldResult(name = "weibo", column = "weibo"),
		@FieldResult(name = "discuzx", column = "discuzx"),
		@FieldResult(name = "versionNo", column = "versionNo"),
		@FieldResult(name = "domainName", column = "domainName") }) })
@NamedNativeQueries( {
		@NamedNativeQuery(name = "findSiteImplNativeSQL", query = "select u.appType as appType,u.nick as nick,s.domainName as domainName,u.pid as pid,s.id as sid,s.title as siteTitle,s.www as www,s.weibo as weibo,s.discuzx as discuzx,s.analyticsType as analyticsType,s.laid as laid,s.lid as lid,s.gid as gid,u.user_id as user_id,usb.versionNo as versionNo from  w_site as s left join w_user as u on s.user_id=u.user_id left join t_usersubscribe as usb on s.user_id=usb.user_id", resultSetMapping = "siteImpl"),
		@NamedNativeQuery(name = "findSiteImplByUserIdNativeSQL", query = "select u.appType as appType,u.nick as nick,s.domainName as domainName,u.pid as pid,s.id as sid,s.title as siteTitle,s.www as www,s.weibo as weibo,s.discuzx as discuzx,s.analyticsType as analyticsType,s.laid as laid,s.lid as lid,s.gid as gid,u.user_id as user_id,usb.versionNo as versionNo from  w_site as s left join w_user as u on s.user_id=u.user_id left join t_usersubscribe as usb on s.user_id=usb.user_id where  s.user_id=:user_id", resultSetMapping = "siteImpl") })
public class SiteImpl {
	private String sid;
	private String user_id;
	private String nick;
	private String pid;
	private String siteTitle;
	private String analyticsType;
	private String laid;
	private String lid;
	private String gid;
	private String domainName;
	private String www;
	private String weibo;
	private String discuzx;
	private Float versionNo;
	private String appType;

	private String site_ico;

	private String site_skin;

	private String site_theme;

	private String site_isLogin;
	/**
	 * 详情页布局
	 */
	private String site_detailLayout;
	/**
	 * 搜索页布局
	 */
	private String site_searchLayout;
	/**
	 * 搜索页结果默认显示视图
	 */
	private String site_searchView;
	/**
	 * 搜索页结果是否显示搜索框
	 */
	private String site_searchBox;
	/**
	 * 亿起发用户名
	 */
	private String yiqifa_username;
	/**
	 * 亿起发网站编号
	 */
	private String yiqifa_sid;
	/**
	 * 亿起发密钥
	 */
	private String yiqifa_secret;
	/**
	 * 是否显示广告
	 */
	private Boolean isAd = true;

	private Map<String, List<Map<String, Object>>> ads;

	private String bulletin;

	private Integer statement;

	private String baiduTongJi;

	/**
	 * 返利比例
	 */
	private Integer commissionRate;
	/**
	 * 推广比例
	 */
	private Integer adCommissionRate;

	private String sina_appkey;

	private String sina_appsecret;

	private String taobao_appkey;

	private String taobao_appsecret;

	private String qq_appkey;

	private String qq_appsecret;

	private String uyan;

	/**
	 * @return the user_id
	 */
	@Id
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
	 * @return the pid
	 */
	public String getPid() {
		for (String un : WindSiteRestUtil.UNVALIDS) {
			if (un.equals(this.getNick())) {
				return "mm_13667242_0_0";
			}
		}
		return pid;
	}

	/**
	 * @param pid
	 *            the pid to set
	 */
	public void setPid(String pid) {
		this.pid = pid;
	}

	/**
	 * @return the siteTitle
	 */
	public String getSiteTitle() {
		return siteTitle;
	}

	/**
	 * @param siteTitle
	 *            the siteTitle to set
	 */
	public void setSiteTitle(String siteTitle) {
		this.siteTitle = siteTitle;
	}

	/**
	 * @return the analyticsType
	 */
	public String getAnalyticsType() {
		return analyticsType;
	}

	/**
	 * @param analyticsType
	 *            the analyticsType to set
	 */
	public void setAnalyticsType(String analyticsType) {
		this.analyticsType = analyticsType;
	}

	/**
	 * @return the laid
	 */
	public String getLaid() {
		return laid;
	}

	/**
	 * @param laid
	 *            the laid to set
	 */
	public void setLaid(String laid) {
		this.laid = laid;
	}

	/**
	 * @return the lid
	 */
	public String getLid() {
		return lid;
	}

	/**
	 * @param lid
	 *            the lid to set
	 */
	public void setLid(String lid) {
		this.lid = lid;
	}

	/**
	 * @return the gid
	 */
	public String getGid() {
		return gid;
	}

	/**
	 * @param gid
	 *            the gid to set
	 */
	public void setGid(String gid) {
		this.gid = gid;
	}

	/**
	 * @return the domainName
	 */
	public String getDomainName() {
		return domainName;
	}

	/**
	 * @param domainName
	 *            the domainName to set
	 */
	public void setDomainName(String domainName) {
		this.domainName = domainName;
	}

	public void setSid(String sid) {
		this.sid = sid;
	}

	public String getSid() {
		return sid;
	}

	public void setWww(String www) {
		this.www = www;
	}

	public String getWww() {
		return www;
	}

	/**
	 * @return the versionNo
	 */
	public Float getVersionNo() {
		return versionNo;
	}

	/**
	 * @param versionNo
	 *            the versionNo to set
	 */
	public void setVersionNo(Float versionNo) {
		this.versionNo = versionNo;
	}

	/**
	 * @return the ads
	 */
	@Transient
	public Map<String, List<Map<String, Object>>> getAds() {
		return ads;
	}

	/**
	 * @param ads
	 *            the ads to set
	 */
	public void setAds(Map<String, List<Map<String, Object>>> ads) {
		this.ads = ads;
	}

	public void setBulletin(String bulletin) {
		this.bulletin = bulletin;
	}

	@Transient
	public String getBulletin() {
		return bulletin;
	}

	public void setStatement(Integer statement) {
		this.statement = statement;
	}

	@Transient
	public Integer getStatement() {
		return statement;
	}

	public void setBaiduTongJi(String baiduTongJi) {
		this.baiduTongJi = baiduTongJi;
	}

	@Transient
	public String getBaiduTongJi() {
		return baiduTongJi;
	}

	public void setWeibo(String weibo) {
		this.weibo = weibo;
	}

	public String getWeibo() {
		return weibo;
	}

	public void setDiscuzx(String discuzx) {
		this.discuzx = discuzx;
	}

	public String getDiscuzx() {
		return discuzx;
	}

	public void setSite_skin(String site_skin) {
		this.site_skin = site_skin;
	}

	@Transient
	public String getSite_skin() {
		return site_skin;
	}

	public void setSite_theme(String site_theme) {
		this.site_theme = site_theme;
	}

	@Transient
	public String getSite_theme() {
		return site_theme;
	}

	public void setCommissionRate(Integer commissionRate) {
		this.commissionRate = commissionRate;
	}

	@Transient
	public Integer getCommissionRate() {
		return commissionRate;
	}

	public void setAdCommissionRate(Integer adCommissionRate) {
		this.adCommissionRate = adCommissionRate;
	}

	@Transient
	public Integer getAdCommissionRate() {
		return adCommissionRate;
	}

	public void setAppType(String appType) {
		this.appType = appType;
	}

	public String getAppType() {
		return appType;
	}

	public void setSite_isLogin(String site_isLogin) {
		this.site_isLogin = site_isLogin;
	}

	@Transient
	public String getSite_isLogin() {
		return site_isLogin;
	}

	public void setSite_ico(String site_ico) {
		this.site_ico = site_ico;
	}

	@Transient
	public String getSite_ico() {
		return site_ico;
	}

	public void setSite_detailLayout(String site_detailLayout) {
		this.site_detailLayout = site_detailLayout;
	}

	@Transient
	public String getSite_detailLayout() {
		return site_detailLayout;
	}

	public void setSite_searchLayout(String site_searchLayout) {
		this.site_searchLayout = site_searchLayout;
	}

	@Transient
	public String getSite_searchLayout() {
		return site_searchLayout;
	}

	public void setSite_searchView(String site_searchView) {
		this.site_searchView = site_searchView;
	}

	@Transient
	public String getSite_searchView() {
		return site_searchView;
	}

	public void setIsAd(Boolean isAd) {
		this.isAd = isAd;
	}

	@Transient
	public Boolean getIsAd() {
		return isAd;
	}

	public void setYiqifa_username(String yiqifa_username) {
		this.yiqifa_username = yiqifa_username;
	}

	@Transient
	public String getYiqifa_username() {
		return yiqifa_username;
	}

	public void setYiqifa_sid(String yiqifa_sid) {
		this.yiqifa_sid = yiqifa_sid;
	}

	@Transient
	public String getYiqifa_sid() {
		return yiqifa_sid;
	}

	public void setYiqifa_secret(String yiqifa_secret) {
		this.yiqifa_secret = yiqifa_secret;
	}

	@Transient
	public String getYiqifa_secret() {
		return yiqifa_secret;
	}

	public void setSite_searchBox(String site_searchBox) {
		this.site_searchBox = site_searchBox;
	}

	@Transient
	public String getSite_searchBox() {
		return site_searchBox;
	}

	public void setSina_appkey(String sina_appkey) {
		this.sina_appkey = sina_appkey;
	}

	@Transient
	public String getSina_appkey() {
		return sina_appkey;
	}

	public void setTaobao_appkey(String taobao_appkey) {
		this.taobao_appkey = taobao_appkey;
	}

	@Transient
	public String getTaobao_appkey() {
		return taobao_appkey;
	}

	public void setQq_appkey(String qq_appkey) {
		this.qq_appkey = qq_appkey;
	}

	@Transient
	public String getQq_appkey() {
		return qq_appkey;
	}

	/**
	 * @return the sina_appsecret
	 */
	@Transient
	public String getSina_appsecret() {
		return sina_appsecret;
	}

	/**
	 * @param sinaAppsecret
	 *            the sina_appsecret to set
	 */
	public void setSina_appsecret(String sinaAppsecret) {
		sina_appsecret = sinaAppsecret;
	}

	/**
	 * @return the taobao_appsecret
	 */
	@Transient
	public String getTaobao_appsecret() {
		return taobao_appsecret;
	}

	/**
	 * @param taobaoAppsecret
	 *            the taobao_appsecret to set
	 */
	public void setTaobao_appsecret(String taobaoAppsecret) {
		taobao_appsecret = taobaoAppsecret;
	}

	/**
	 * @return the qq_appsecret
	 */
	@Transient
	public String getQq_appsecret() {
		return qq_appsecret;
	}

	/**
	 * @param qqAppsecret
	 *            the qq_appsecret to set
	 */
	public void setQq_appsecret(String qqAppsecret) {
		qq_appsecret = qqAppsecret;
	}

	public void setUyan(String uyan) {
		this.uyan = uyan;
	}

	@Transient
	public String getUyan() {
		return uyan;
	}

}
