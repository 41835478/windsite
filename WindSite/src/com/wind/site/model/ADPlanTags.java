package com.wind.site.model;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "w_ad_plans_tags")
public class ADPlanTags extends IDModel {

	private static final long serialVersionUID = 1L;
	/**
	 * 计划ID
	 */
	private String pid;
	/**
	 * 标签ID
	 */
	private String tid;

	/**
	 * @return the pid
	 */
	public String getPid() {
		return pid;
	}

	/**
	 * @param pid
	 *            the pid to set
	 */
	public void setPid(String pid) {
		this.pid = pid;
	}

	/**
	 * @return the tid
	 */
	public String getTid() {
		return tid;
	}

	/**
	 * @param tid
	 *            the tid to set
	 */
	public void setTid(String tid) {
		this.tid = tid;
	}

}
