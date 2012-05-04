package com.wind.site.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 店铺缓存日志
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_cache_shopcat")
public class ShopCatCacheLog implements Serializable {

	private static final long serialVersionUID = 1L;
	/**
	 * cid
	 */
	@Id
	private Long id;

	/**
	 * 今日点击数
	 */
	private Long hits;
	/**
	 * 总点击数
	 */
	private Long totalHits;
	/**
	 * 静态化时间
	 */
	private Date deploy;

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
	 * @return the hits
	 */
	public Long getHits() {
		return hits;
	}

	/**
	 * @param hits
	 *            the hits to set
	 */
	public void setHits(Long hits) {
		this.hits = hits;
	}

	/**
	 * @return the totalHits
	 */
	public Long getTotalHits() {
		return totalHits;
	}

	/**
	 * @param totalHits
	 *            the totalHits to set
	 */
	public void setTotalHits(Long totalHits) {
		this.totalHits = totalHits;
	}

	/**
	 * @return the deploy
	 */
	public Date getDeploy() {
		return deploy;
	}

	/**
	 * @param deploy
	 *            the deploy to set
	 */
	public void setDeploy(Date deploy) {
		this.deploy = deploy;
	}

}
