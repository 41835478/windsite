package com.wind.site.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 主题与主题关系
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "t_page_skin")
public class PageThemeSkin implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private Long skin;

	private Long theme;

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
	 * @return the skin
	 */
	public Long getSkin() {
		return skin;
	}

	/**
	 * @param skin
	 *            the skin to set
	 */
	public void setSkin(Long skin) {
		this.skin = skin;
	}

	/**
	 * @return the theme
	 */
	public Long getTheme() {
		return theme;
	}

	/**
	 * @param theme
	 *            the theme to set
	 */
	public void setTheme(Long theme) {
		this.theme = theme;
	}

}
