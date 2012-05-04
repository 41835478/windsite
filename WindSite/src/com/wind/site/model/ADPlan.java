package com.wind.site.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * 推广计划
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_ad_plan")
public class ADPlan extends TimestampModel {

	private static final long serialVersionUID = 1L;
	/**
	 * 计划名称
	 */
	private String name;
	/**
	 * 卖家昵称
	 */
	private String nick;

	/**
	 * 计划所属分类
	 */
	private String cid;
	/**
	 * 所属类型
	 */
	private String type;
	/**
	 * 被投放数量
	 */
	private Integer used;
	/**
	 * 是否默认
	 */
	private Boolean isDefault;
	/**
	 * 是否有效
	 */
	private Boolean isValid;
	/**
	 * 是否成功配置
	 */
	private Boolean isSuccess;
	/**
	 * 计划名称
	 */
	@Column(length = 500)
	private String description;

	@Transient
	private String tags;
	/**
	 * 推广商品集合
	 */
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "planid")
	private List<ADTaobaokeItem> items;
	/**
	 * 默认显示的商品
	 */
	private String itemid;

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name
	 *            the name to set
	 */
	public void setName(String name) {
		this.name = name;
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
	 * @return the cid
	 */
	public String getCid() {
		return cid;
	}

	/**
	 * @param cid
	 *            the cid to set
	 */
	public void setCid(String cid) {
		this.cid = cid;
	}

	/**
	 * @return the isSuccess
	 */
	public Boolean getIsSuccess() {
		return isSuccess;
	}

	/**
	 * @param isSuccess
	 *            the isSuccess to set
	 */
	public void setIsSuccess(Boolean isSuccess) {
		this.isSuccess = isSuccess;
	}

	public void setIsValid(Boolean isValid) {
		this.isValid = isValid;
	}

	public Boolean getIsValid() {
		return isValid;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getType() {
		return type;
	}

	public void setItems(List<ADTaobaokeItem> items) {
		this.items = items;
	}

	public List<ADTaobaokeItem> getItems() {
		return items;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

	public void setUsed(Integer used) {
		this.used = used;
	}

	public Integer getUsed() {
		return used;
	}

	public void setIsDefault(Boolean isDefault) {
		this.isDefault = isDefault;
	}

	public Boolean getIsDefault() {
		return isDefault;
	}

	public void setTags(String tags) {
		this.tags = tags;
	}

	public String getTags() {
		return tags;
	}

	public void setItemid(String itemid) {
		this.itemid = itemid;
	}

	public String getItemid() {
		return itemid;
	}

}
