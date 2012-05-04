package com.wind.site.model;

import java.io.Serializable;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * 广告
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_fanli_ad")
public class AD implements Serializable {

	public static final String BLOG_RIGHT = "br";
	public static final String HUABAO_TOP = "ht";

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String title;

	private String pageType;

	private String adType;
	@Column(length = 1000)
	private String adMeta;

	private Boolean isValid;

	private String user_id;

	private String site_id;

	private String nick;
	@Transient
	private Map<String, String> code;

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
	 * @return the pageType
	 */
	public String getPageType() {
		return pageType;
	}

	/**
	 * @param pageType
	 *            the pageType to set
	 */
	public void setPageType(String pageType) {
		this.pageType = pageType;
	}

	/**
	 * @return the adType
	 */
	public String getAdType() {
		return adType;
	}

	/**
	 * @param adType
	 *            the adType to set
	 */
	public void setAdType(String adType) {
		this.adType = adType;
	}

	/**
	 * @return the adMeta
	 */
	public String getAdMeta() {
		return adMeta;
	}

	/**
	 * @param adMeta
	 *            the adMeta to set
	 */
	public void setAdMeta(String adMeta) {
		this.adMeta = adMeta;
	}

	/**
	 * @return the isValid
	 */
	public Boolean getIsValid() {
		return isValid;
	}

	/**
	 * @param isValid
	 *            the isValid to set
	 */
	public void setIsValid(Boolean isValid) {
		this.isValid = isValid;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public String getUser_id() {
		return user_id;
	}

	public void setSite_id(String site_id) {
		this.site_id = site_id;
	}

	public String getSite_id() {
		return site_id;
	}

	public void setNick(String nick) {
		this.nick = nick;
	}

	public String getNick() {
		return nick;
	}

	public void setCode(Map<String, String> code) {
		this.code = code;
	}

	public Map<String, String> getCode() {
		return code;
	}

}
