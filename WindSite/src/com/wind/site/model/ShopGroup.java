package com.wind.site.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * 店铺收藏分组
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_shopgroup")
public class ShopGroup implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	/**
	 * 分组标题
	 */
	private String name;
	/**
	 * 所属用户
	 */
	private String user_id;
	/**
	 * 店铺数量
	 */
	@Transient
	private Integer count = 0;
	/**
	 * 店铺列表
	 */
	@Transient
	private List<T_TaobaokeShop> shops;

	/**
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * @param id
	 *            the id to set
	 */
	public void setId(Long id) {
		this.id = id;
	}

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

	/**
	 * @return the shops
	 */
	public List<T_TaobaokeShop> getShops() {
		return shops;
	}

	/**
	 * @param shops
	 *            the shops to set
	 */
	public void setShops(List<T_TaobaokeShop> shops) {
		this.shops = shops;
	}

}
