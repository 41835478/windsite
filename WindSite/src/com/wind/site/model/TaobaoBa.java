package com.wind.site.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "t_taobaoba")
public class TaobaoBa implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	private Integer id;
	/**
	 * 淘吧名称
	 */
	private String name;
	/**
	 * 帖子数
	 */
	private Integer threads;
	/**
	 * 淘吧LOGO
	 */
	private String logo;

	/**
	 * @return the id
	 */
	public Integer getId() {
		return id;
	}

	/**
	 * @param id
	 *            the id to set
	 */
	public void setId(Integer id) {
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
	 * @return the threads
	 */
	public Integer getThreads() {
		return threads;
	}

	/**
	 * @param threads
	 *            the threads to set
	 */
	public void setThreads(Integer threads) {
		this.threads = threads;
	}

	/**
	 * @return the logo
	 */
	public String getLogo() {
		return logo;
	}

	/**
	 * @param logo
	 *            the logo to set
	 */
	public void setLogo(String logo) {
		this.logo = logo;
	}

}