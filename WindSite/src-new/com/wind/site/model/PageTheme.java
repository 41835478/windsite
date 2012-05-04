package com.wind.site.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 主题
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "t_page_theme")
public class PageTheme implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	private Long id;
	/**
	 * 当前主题使用的系统颜色皮肤
	 */
	private String skin = "";

	private String title;

	private String designer;

	private String price;

	private String version;

	private String tags;

	private String pic;

	private Boolean isValid = false;

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
	 * @return the designer
	 */
	public String getDesigner() {
		return designer;
	}

	/**
	 * @param designer
	 *            the designer to set
	 */
	public void setDesigner(String designer) {
		this.designer = designer;
	}

	/**
	 * @return the price
	 */
	public String getPrice() {
		return price;
	}

	/**
	 * @param price
	 *            the price to set
	 */
	public void setPrice(String price) {
		this.price = price;
	}

	/**
	 * @return the version
	 */
	public String getVersion() {
		return version;
	}

	/**
	 * @param version
	 *            the version to set
	 */
	public void setVersion(String version) {
		this.version = version;
	}

	/**
	 * @return the tags
	 */
	public String getTags() {
		return tags;
	}

	/**
	 * @param tags
	 *            the tags to set
	 */
	public void setTags(String tags) {
		this.tags = tags;
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

	public void setId(Long id) {
		this.id = id;
	}

	public Long getId() {
		return id;
	}

	public void setIsValid(Boolean isValid) {
		this.isValid = isValid;
	}

	public Boolean getIsValid() {
		return isValid;
	}

	public void setSkin(String skin) {
		this.skin = skin;
	}

	public String getSkin() {
		return skin;
	}

}
