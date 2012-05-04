package com.wind.site.model;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 阿里妈妈频道推广
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "m_channel")
public class Channel extends OrderTimestampModel {

	private static final long serialVersionUID = 1L;
	private String name;
	private String value;
	private String clickUrl;
	private Integer eventId;
	private String pic;
	private String bigPic;
	private Integer height;

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
	 * @return the value
	 */
	public String getValue() {
		return value;
	}

	/**
	 * @param value
	 *            the value to set
	 */
	public void setValue(String value) {
		this.value = value;
	}

	/**
	 * @return the pic
	 */
	public String getPic() {
		return pic;
	}

	/**
	 * @param pic
	 *            the pic to set
	 */
	public void setPic(String pic) {
		this.pic = pic;
	}

	/**
	 * @return the bigPic
	 */
	public String getBigPic() {
		return bigPic;
	}

	/**
	 * @param bigPic
	 *            the bigPic to set
	 */
	public void setBigPic(String bigPic) {
		this.bigPic = bigPic;
	}

	/**
	 * @return the height
	 */
	public Integer getHeight() {
		return height;
	}

	/**
	 * @param height
	 *            the height to set
	 */
	public void setHeight(Integer height) {
		this.height = height;
	}

	public void setClickUrl(String clickUrl) {
		this.clickUrl = clickUrl;
	}

	public String getClickUrl() {
		return clickUrl;
	}

	public void setEventId(Integer eventId) {
		this.eventId = eventId;
	}

	public Integer getEventId() {
		return eventId;
	}

}
