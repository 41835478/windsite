package com.wind.site.env;

import java.util.HashMap;
import java.util.Map;

/**
 * 淘宝环境
 * 
 * @author fxy
 * 
 */
public class TaobaoEnv {
	/**
	 * 商城推广输入串
	 */
	private String malls_outer_code;
	/**
	 * 商品推广输入串
	 */
	private String items_outer_code;
	/**
	 * 类目推广输入串
	 */
	private String cats_outer_code;
	/**
	 * 店铺推广输入串
	 */
	private String shops_outer_code;
	/**
	 * 关键词推广输入串
	 */
	private String keywords_outer_code;
	/**
	 * 淘宝TOP APP KEY
	 */
	private String appKey;
	/**
	 * 淘宝TOP secret
	 */
	private String secret;
	/**
	 * 分成应用TOP APP KEY
	 */
	private String fcAppKey;
	/**
	 * 分成应用TOP secret
	 */
	private String fcSecret;
	/**
	 * 是否启用沙箱环境
	 */
	private Boolean isSandbox;
	/**
	 * 沙箱容器
	 */
	private String sandboxContainer;
	/**
	 * 沙箱REST地址
	 */
	private String sandboxUrl;
	/**
	 * 正式环境
	 */
	private String taobaoContainer;
	/**
	 * 正式REST地址
	 */
	private String taobaoUrl;
	/**
	 * 是否在审核中
	 */
	private Boolean isAudit = false;
	// /**
	// * 当前容器
	// */
	// private String container;
	// /**
	// * 当前REST地址
	// */
	// private String url;
	/**
	 * API列表
	 */
	private Map<String, Integer> API = new HashMap<String, Integer>();

	public String getAppKey() {
		return appKey;
	}

	public void setAppKey(String appKey) {
		this.appKey = appKey;
	}

	public String getSecret() {
		return secret;
	}

	public void setSecret(String secret) {
		this.secret = secret;
	}

	public void setIsSandbox(Boolean isSandbox) {
		this.isSandbox = isSandbox;
	}

	public void setSandboxContainer(String sandboxContainer) {
		this.sandboxContainer = sandboxContainer;
	}

	public void setSandboxUrl(String sandboxUrl) {
		this.sandboxUrl = sandboxUrl;
	}

	public void setTaobaoContainer(String taobaoContainer) {
		this.taobaoContainer = taobaoContainer;
	}

	public void setTaobaoUrl(String taobaoUrl) {
		this.taobaoUrl = taobaoUrl;
	}

	public String getContainer() {
		return (this.isSandbox ? this.sandboxContainer : this.taobaoContainer)
				+ "?appkey=" + this.appKey;
	}

	public String getFcContainer() {
		return (this.isSandbox ? this.sandboxContainer : this.taobaoContainer)
				+ "?appkey=" + this.fcAppKey;
	}

	public String getUrl() {
		return this.isSandbox ? this.sandboxUrl : this.taobaoUrl;

	}

	public void setAPI(Map<String, Integer> aPI) {
		API = aPI;
	}

	public Map<String, Integer> getAPI() {
		return API;
	}

	public void setItems_outer_code(String items_outer_code) {
		this.items_outer_code = items_outer_code;
	}

	public String getItems_outer_code() {
		if (null == EnvManager.getMember()) {
			return items_outer_code;
		}
		return "xtfl" + EnvManager.getMember().getId();
	}

	public void setCats_outer_code(String cats_outer_code) {
		this.cats_outer_code = cats_outer_code;
	}

	public String getCats_outer_code() {
		if (null == EnvManager.getMember()) {
			return cats_outer_code;
		}
		return "xtfl" + EnvManager.getMember().getId();
	}

	public void setShops_outer_code(String shops_outer_code) {
		this.shops_outer_code = shops_outer_code;
	}

	public String getShops_outer_code() {
		if (null == EnvManager.getMember()) {
			return shops_outer_code;
		}
		return "xtfl" + EnvManager.getMember().getId();
	}

	public void setKeywords_outer_code(String keywords_outer_code) {
		this.keywords_outer_code = keywords_outer_code;
	}

	public String getKeywords_outer_code() {
		if (null == EnvManager.getMember()) {
			return keywords_outer_code;
		}
		return "xtfl" + EnvManager.getMember().getId();
	}

	public void setIsAudit(Boolean isAudit) {
		this.isAudit = isAudit;
	}

	public Boolean getIsAudit() {
		return isAudit;
	}

	public void setFcAppKey(String fcAppKey) {
		this.fcAppKey = fcAppKey;
	}

	public String getFcAppKey() {
		return fcAppKey;
	}

	public void setFcSecret(String fcSecret) {
		this.fcSecret = fcSecret;
	}

	public String getFcSecret() {
		return fcSecret;
	}

	public void setMalls_outer_code(String malls_outer_code) {
		this.malls_outer_code = malls_outer_code;
	}

	public String getMalls_outer_code() {
		if (null == EnvManager.getMember()) {
			return malls_outer_code;
		}
		return "xtfl" + EnvManager.getMember().getId();
	}

}
