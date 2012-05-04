package com.wind.site.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 商品缓存日志
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_cache_item")
public class ItemCacheLog implements Serializable {

	private static final long serialVersionUID = 1L;
	/**
	 * numIid
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

	public void setTotalHits(Long totalHits) {
		this.totalHits = totalHits;
	}

	public Long getTotalHits() {
		return totalHits;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(Object obj) {
		ItemCacheLog log = (ItemCacheLog) obj;
		if (log.getId().intValue() == this.getId().intValue()) {
			return true;
		}
		return false;
	}

	@Override
	public int hashCode() {
		return id.hashCode();
	}

}
