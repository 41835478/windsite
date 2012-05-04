package com.wind.site.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 模块中商品推广
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_ad_module_item")
public class ADModuleItem implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	private ADModuleItemPK pk;
	/**
	 * 商品标题
	 */
	private String title;
	/**
	 * 投放地址
	 */
	private String url;
	/**
	 * 所在页面
	 */
	private String page;
	/**
	 * 站长ID
	 */
	private String userId;
	/**
	 * 站长昵称
	 */
	private String nick;
	/**
	 * 卖家昵称
	 */
	private String sellerNick;
	/**
	 * 投放时间
	 */
	private Date adDate;

	public void setPk(ADModuleItemPK pk) {
		this.pk = pk;
	}

	public ADModuleItemPK getPk() {
		return pk;
	}

	/**
	 * @return the url
	 */
	public String getUrl() {
		return url;
	}

	/**
	 * @param url
	 *            the url to set
	 */
	public void setUrl(String url) {
		this.url = url;
	}

	/**
	 * @return the userId
	 */
	public String getUserId() {
		return userId;
	}

	/**
	 * @param userId
	 *            the userId to set
	 */
	public void setUserId(String userId) {
		this.userId = userId;
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

	public void setPage(String page) {
		this.page = page;
	}

	public String getPage() {
		return page;
	}

	public void setAdDate(Date adDate) {
		this.adDate = adDate;
	}

	public Date getAdDate() {
		return adDate;
	}

	public void setSellerNick(String sellerNick) {
		this.sellerNick = sellerNick;
	}

	public String getSellerNick() {
		return sellerNick;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getTitle() {
		return title;
	}

}
