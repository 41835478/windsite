package com.wind.site.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * 推广组数据结构
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_itemgroup")
public class ItemGroup extends TimestampModel {
	private static final long serialVersionUID = 6159348253663220760L;

	/**
	 * 名称
	 */
	private String name;

	/**
	 * 用户ID
	 */
	private String user_id;
	/**
	 * 商品数量
	 */
	@Transient
	private Integer count = 0;
	/**
	 * 商品列表
	 */
	@Transient
	private List<T_TaobaokeItem> items;

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
	 * @return the count
	 */
	public Integer getCount() {
		return count;
	}

	/**
	 * @param count
	 *            the count to set
	 */
	public void setCount(Integer count) {
		this.count = count;
	}

	@Override
	public boolean equals(Object obj) {
		if (obj == null) {
			return false;
		}
		if (this == obj)
			return true;
		if (!(obj instanceof ItemGroup))
			return false;
		ItemGroup group = (ItemGroup) obj;
		return group.getId() == this.getId();
	}

	@Override
	public int hashCode() {
		if (this.getId() != null)
			return this.getId().hashCode();
		else
			return super.hashCode();
	}

	public void setItems(List<T_TaobaokeItem> items) {
		this.items = items;
	}

	public List<T_TaobaokeItem> getItems() {
		return items;
	}

}
