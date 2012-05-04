package com.wind.site.model;


/**
 * 新淘推广链接
 * 
 * @author fxy
 * 
 */

public class XintaoLink extends OrderTimestampModel {

	private static final long serialVersionUID = 1L;
	/**
	 * 链接地址
	 */
	private String url;
	/**
	 * 链接名称
	 */
	private String name;
	/**
	 * 链接类型 1.商品，2.店铺，3.推广组（推广整个推广组），4.店铺收藏（推广所有收藏的店铺） 1，2目前只提供直接访问淘宝的推广链接
	 * 3，4目前只提供新淘网页面（可选择样式，皮肤/主题）
	 */
	private Integer type;

	/**
	 * 链接值 1.商品时值为num_iid 2.店铺时值为sid 3.推广组时值为gid 4.店铺收藏时值为空
	 */
	private String value;

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
	 * @return the type
	 */
	public Integer getType() {
		return type;
	}

	/**
	 * @param type
	 *            the type to set
	 */
	public void setType(Integer type) {
		this.type = type;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}

}
