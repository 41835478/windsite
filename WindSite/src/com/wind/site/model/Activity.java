package com.wind.site.model;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * 阿里妈妈活动
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "m_activity")
public class Activity extends OrderTimestampModel {

	private static final long serialVersionUID = 1L;

	private String title;
	private String clickUrl;
	private String picUrl;
	private String eventId;
	@ManyToOne
	@JoinColumn(name = "type_id")
	private ActivityType type;

	/**
	 * @return the title
	 */
	public String getTitle() {
		return title;
	}

	/**
	 * @param title
	 *            the title to set
	 */
	public void setTitle(String title) {
		this.title = title;
	}

	/**
	 * @return the clickUrl
	 */
	public String getClickUrl() {
		return clickUrl;
	}

	/**
	 * @param clickUrl
	 *            the clickUrl to set
	 */
	public void setClickUrl(String clickUrl) {
		this.clickUrl = clickUrl;
	}

	/**
	 * @return the picUrl
	 */
	public String getPicUrl() {
		return picUrl;
	}

	/**
	 * @param picUrl
	 *            the picUrl to set
	 */
	public void setPicUrl(String picUrl) {
		this.picUrl = picUrl;
	}

	/**
	 * @return the eventId
	 */
	public String getEventId() {
		return eventId;
	}

	/**
	 * @param eventId
	 *            the eventId to set
	 */
	public void setEventId(String eventId) {
		this.eventId = eventId;
	}

	public void setType(ActivityType type) {
		this.type = type;
	}

	public ActivityType getType() {
		return type;
	}

}
