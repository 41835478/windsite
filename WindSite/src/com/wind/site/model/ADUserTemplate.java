package com.wind.site.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 首页广告计划表
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_ad_usertemplate")
public class ADUserTemplate extends ADTemplate {

	private static final long serialVersionUID = 1L;
	@Id
	private String tid;
	/**
	 * 页面UV
	 */
	private Long uv;

	public void setTid(String tid) {
		this.tid = tid;
	}

	public String getTid() {
		return tid;
	}

	public void setUv(Long uv) {
		this.uv = uv;
	}

	public Long getUv() {
		return uv;
	}

}
