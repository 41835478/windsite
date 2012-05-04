package com.wind.site.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 文章投放状态
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_ad_blog_status")
public class ADBlogStatus implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	private String id;
	private String cid;
	private Integer ads;
	private Long uv;
	private Boolean isValid;

	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}

	/**
	 * @param id
	 *            the id to set
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * @return the ads
	 */
	public Integer getAds() {
		return ads;
	}

	/**
	 * @param ads
	 *            the ads to set
	 */
	public void setAds(Integer ads) {
		this.ads = ads;
	}

	public void setCid(String cid) {
		this.cid = cid;
	}

	public String getCid() {
		return cid;
	}

	public void setUv(Long uv) {
		this.uv = uv;
	}

	public Long getUv() {
		return uv;
	}

	public void setIsValid(Boolean isValid) {
		this.isValid = isValid;
	}

	public Boolean getIsValid() {
		return isValid;
	}

}
