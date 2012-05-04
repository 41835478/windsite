package com.wind.site.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 店铺收藏
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_shopfavorite")
public class W_ShopFavorite implements java.io.Serializable {

	private static final long serialVersionUID = -5524392445231049352L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	/**
	 * 店铺分组ID
	 */
	private Long gid;
	/**
	 * 用户ID（店铺卖家的user_id）
	 */
	private Long user_id;

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
	 * @return the gid
	 */
	public Long getGid() {
		return gid;
	}

	/**
	 * @param gid
	 *            the gid to set
	 */
	public void setGid(Long gid) {
		this.gid = gid;
	}

	public void setUser_id(Long user_id) {
		this.user_id = user_id;
	}

	public Long getUser_id() {
		return user_id;
	}

}
