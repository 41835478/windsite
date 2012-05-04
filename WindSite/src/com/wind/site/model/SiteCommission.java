package com.wind.site.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 返利设置
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_site_commission")
public class SiteCommission implements Serializable {

	private static final long serialVersionUID = 1L;
	/**
	 * 站点ID
	 */
	@Id
	private String site_id;
	/**
	 * 站长会员ID
	 */
	private String user_id;
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
	 * 站长昵称
	 */
	private String nick;
	/**
	 * 是否启用首页广告
	 */
	private Boolean isAd;

	/**
	 * 百度统计
	 */
	private String baiduTongJi;
	/**
	 * 返利比例
	 */
	private Integer commissionRate;
	/**
	 * 推广比例
	 */
	private Integer adCommissionRate;
	/**
	 * 提现最低金额
	 */
	private Integer commissionLimit;
	/**
	 * 注册送金额
	 */
	private Integer registeCash;
	/**
	 * 特约合作代码
	 */
	@Column(length = 500)
	private String alimamaScript;
	/**
	 * 公告
	 */
	@Column(length = 2000)
	private String bulletin;
	/**
	 * 声明文章ID
	 */
	private Integer statement;
	/**
	 * 是否启用返利
	 */
	private Boolean isValid;
	/**
	 * 是否启用登录提示
	 */
	private Boolean isLogin = false;
	/**
	 * 搜索页面默认视图
	 */
	private String searchView;
	/**
	 * 搜索页面是否显示搜索框
	 */
	private Boolean searchBox = true;

	private String ico;

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
	 * @return the commissionRate
	 */
	public Integer getCommissionRate() {
		return commissionRate;
	}

	/**
	 * @param commissionRate
	 *            the commissionRate to set
	 */
	public void setCommissionRate(Integer commissionRate) {
		this.commissionRate = commissionRate;
	}

	/**
	 * @return the adCommissionRate
	 */
	public Integer getAdCommissionRate() {
		return adCommissionRate;
	}

	/**
	 * @param adCommissionRate
	 *            the adCommissionRate to set
	 */
	public void setAdCommissionRate(Integer adCommissionRate) {
		this.adCommissionRate = adCommissionRate;
	}

	/**
	 * @return the commissionLimit
	 */
	public Integer getCommissionLimit() {
		return commissionLimit;
	}

	/**
	 * @param commissionLimit
	 *            the commissionLimit to set
	 */
	public void setCommissionLimit(Integer commissionLimit) {
		this.commissionLimit = commissionLimit;
	}

	/**
	 * @return the registeCash
	 */
	public Integer getRegisteCash() {
		return registeCash;
	}

	/**
	 * @param registeCash
	 *            the registeCash to set
	 */
	public void setRegisteCash(Integer registeCash) {
		this.registeCash = registeCash;
	}

	/**
	 * @return the alimamaScript
	 */
	public String getAlimamaScript() {
		return alimamaScript;
	}

	/**
	 * @param alimamaScript
	 *            the alimamaScript to set
	 */
	public void setAlimamaScript(String alimamaScript) {
		this.alimamaScript = alimamaScript;
	}

	public void setIsValid(Boolean isValid) {
		this.isValid = isValid;
	}

	public Boolean getIsValid() {
		return isValid;
	}

	public void setStatement(Integer statement) {
		this.statement = statement;
	}

	public Integer getStatement() {
		return statement;
	}

	public void setBulletin(String bulletin) {
		this.bulletin = bulletin;
	}

	public String getBulletin() {
		return bulletin;
	}

	/**
	 * @return the baiduTongJi
	 */
	public String getBaiduTongJi() {
		return baiduTongJi;
	}

	/**
	 * @param baiduTongJi
	 *            the baiduTongJi to set
	 */
	public void setBaiduTongJi(String baiduTongJi) {
		this.baiduTongJi = baiduTongJi;
	}

	public void setIsLogin(Boolean isLogin) {
		this.isLogin = isLogin;
	}

	public Boolean getIsLogin() {
		return isLogin;
	}

	public void setIco(String ico) {
		this.ico = ico;
	}

	public String getIco() {
		return ico;
	}

	public void setSearchView(String searchView) {
		this.searchView = searchView;
	}

	public String getSearchView() {
		return searchView;
	}

	public void setIsAd(Boolean isAd) {
		this.isAd = isAd;
	}

	public Boolean getIsAd() {
		return isAd;
	}

	public void setYiqifa_username(String yiqifa_username) {
		this.yiqifa_username = yiqifa_username;
	}

	public String getYiqifa_username() {
		return yiqifa_username;
	}

	public void setYiqifa_sid(String yiqifa_sid) {
		this.yiqifa_sid = yiqifa_sid;
	}

	public String getYiqifa_sid() {
		return yiqifa_sid;
	}

	public void setYiqifa_secret(String yiqifa_secret) {
		this.yiqifa_secret = yiqifa_secret;
	}

	public String getYiqifa_secret() {
		return yiqifa_secret;
	}

	public void setSearchBox(Boolean searchBox) {
		this.searchBox = searchBox;
	}

	public Boolean getSearchBox() {
		return searchBox;
	}

	public void setSina_appkey(String sina_appkey) {
		this.sina_appkey = sina_appkey;
	}

	public String getSina_appkey() {
		return sina_appkey;
	}

	public void setTaobao_appkey(String taobao_appkey) {
		this.taobao_appkey = taobao_appkey;
	}

	public String getTaobao_appkey() {
		return taobao_appkey;
	}

	public void setQq_appkey(String qq_appkey) {
		this.qq_appkey = qq_appkey;
	}

	public String getQq_appkey() {
		return qq_appkey;
	}

	/**
	 * @return the sina_appsecret
	 */
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

	public String getUyan() {
		return uyan;
	}

}
