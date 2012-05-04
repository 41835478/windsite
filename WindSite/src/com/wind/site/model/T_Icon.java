package com.wind.site.model;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 淘江湖用户头像
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "t_icon")
public class T_Icon extends TimestampModel {

	private static final long serialVersionUID = -5880609891287464530L;

	private String icon_24;
	private String icon_40;
	private String icon_60;
	private String icon_120;

	/**
	 * @return the icon_24
	 */
	public String getIcon_24() {
		return icon_24;
	}

	/**
	 * @param icon_24
	 *            the icon_24 to set
	 */
	public void setIcon_24(String icon_24) {
		this.icon_24 = icon_24;
	}

	/**
	 * @return the icon_40
	 */
	public String getIcon_40() {
		return icon_40;
	}

	/**
	 * @param icon_40
	 *            the icon_40 to set
	 */
	public void setIcon_40(String icon_40) {
		this.icon_40 = icon_40;
	}

	/**
	 * @return the icon_60
	 */
	public String getIcon_60() {
		return icon_60;
	}

	/**
	 * @param icon_60
	 *            the icon_60 to set
	 */
	public void setIcon_60(String icon_60) {
		this.icon_60 = icon_60;
	}

	/**
	 * @return the icon_120
	 */
	public String getIcon_120() {
		return icon_120;
	}

	/**
	 * @param icon_120
	 *            the icon_120 to set
	 */
	public void setIcon_120(String icon_120) {
		this.icon_120 = icon_120;
	}
}
