package com.wind.site.model;

import java.io.Serializable;

import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;

/**
 * 页面广告模型
 * 
 * @author fxy
 * 
 */
@MappedSuperclass
public class ADTemplate implements Serializable {

	private static final long serialVersionUID = 3545723234061286357L;
	/**
	 * 广告位所属会员昵称
	 */
	private String nick;
	/**
	 * 广告位所属会员
	 */
	private String user_id;
	/**
	 * 自主广告位
	 */
	private String cads;
	/**
	 * 系统广告位
	 */
	private String sads;
	/**
	 * 自主广告位数量
	 */
	private Integer cadsCount;
	/**
	 * 是否还可系统投放
	 */
	private Boolean isValid;
	/**
	 * 投放类别
	 */
	private String cid;
	/**
	 * 所属类型（系统推荐，淘客自主）
	 */
	@Transient
	private String type;

	/**
	 * 广告位位置
	 */
	private Integer layout;

	/**
	 * @return the cads
	 */
	public String getCads() {
		return cads;
	}

	/**
	 * @param cads
	 *            the cads to set
	 */
	public void setCads(String cads) {
		this.cads = cads;
	}

	/**
	 * @return the sads
	 */
	public String getSads() {
		return sads;
	}

	/**
	 * @param sads
	 *            the sads to set
	 */
	public void setSads(String sads) {
		this.sads = sads;
	}

	/**
	 * @return the layout
	 */
	public Integer getLayout() {
		return layout;
	}

	/**
	 * @param layout
	 *            the layout to set
	 */
	public void setLayout(Integer layout) {
		this.layout = layout;
	}

	public void setCadsCount(Integer cadsCount) {
		this.cadsCount = cadsCount;
	}

	public Integer getCadsCount() {
		return cadsCount;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getType() {
		return type;
	}

	public void setNick(String nick) {
		this.nick = nick;
	}

	public String getNick() {
		return nick;
	}

	public void setIsValid(Boolean isValid) {
		this.isValid = isValid;
	}

	public Boolean getIsValid() {
		return isValid;
	}

	public void setCid(String cid) {
		this.cid = cid;
	}

	public String getCid() {
		return cid;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public String getUser_id() {
		return user_id;
	}

}
