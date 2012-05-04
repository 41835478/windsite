package com.wind.site.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "t_poster_channel")
public class T_PosterChannel implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	private Long id;// String 否 123456 频道ID号。
	private String wapurl;// String 否 http://poster.wap.taobao.com/digital.htm
	// 手机画报对应频道页的链接

	private String name;// String 否 abc 频道名称。
	private String cn_name;// String 否 中文名 频道的中文名称。
	@Column(length = 500)
	private String description;// String 否 说明 频道的说明。
	private String url;// String 否 http://www.taobao.com/XXXXXX 淘宝频道链接地址。

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
	 * @return the wapurl
	 */
	public String getWapurl() {
		return wapurl;
	}

	/**
	 * @param wapurl
	 *            the wapurl to set
	 */
	public void setWapurl(String wapurl) {
		this.wapurl = wapurl;
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
	 * @return the cn_name
	 */
	public String getCn_name() {
		return cn_name;
	}

	/**
	 * @param cnName
	 *            the cn_name to set
	 */
	public void setCn_name(String cnName) {
		cn_name = cnName;
	}

	/**
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * @param description
	 *            the description to set
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * @return the url
	 */
	public String getUrl() {
		return url;
	}

	/**
	 * @param url
	 *            the url to set
	 */
	public void setUrl(String url) {
		this.url = url;
	}

}
