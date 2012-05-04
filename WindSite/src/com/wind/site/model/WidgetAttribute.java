package com.wind.site.model;

/**
 * 组件属性
 * 
 * @author fxy
 * 
 */

public class WidgetAttribute {

	private static final long serialVersionUID = 5839792620759332498L;

	/**
	 * 属性中文名
	 */
	private String title;
	/**
	 * 描述
	 */
	private String description;

	/**
	 * 属性类型<br/>
	 * a-s:<a class="a-s" href="地址"><span>标题</span></a><br/>
	 * l-a-s:<li class="l-a-s"><a href="地址"><span>标题</span></a></li><br/>
	 * d-a-i:<div class="d-a-i"><a href="地址"><img src="图片地址"/></a></div><br/>
	 * l-d-a-i:<li class="l-d-a-s"><div ><a href="地址"><img
	 * src="图片地址"/></a></div></li><br/>
	 */
	private String type;

	/**
	 * 点击地址
	 */
	private String clickUrl;
	/**
	 * 图片地址
	 */
	private String picUrl;
	/**
	 * 价格
	 */
	private String price;
	/**
	 * 销量
	 */
	private String volume;
	/**
	 * 卖家
	 */
	private String seller;
	/**
	 * 卖家信用
	 */
	private String level;

	/**
	 * @return the title
	 */
	public String getTitle() {
		return title;
	}

	/**
	 * @return the volume
	 */
	public String getVolume() {
		return volume;
	}

	/**
	 * @param volume
	 *            the volume to set
	 */
	public void setVolume(String volume) {
		this.volume = volume;
	}

	/**
	 * @return the seller
	 */
	public String getSeller() {
		return seller;
	}

	/**
	 * @param seller
	 *            the seller to set
	 */
	public void setSeller(String seller) {
		this.seller = seller;
	}

	/**
	 * @return the level
	 */
	public String getLevel() {
		return level;
	}

	/**
	 * @param level
	 *            the level to set
	 */
	public void setLevel(String level) {
		this.level = level;
	}

	/**
	 * @param title
	 *            the title to set
	 */
	public void setTitle(String title) {
		this.title = title;
	}

	/**
	 * @return the type
	 */
	public String getType() {
		return type;
	}

	/**
	 * @param type
	 *            the type to set
	 */
	public void setType(String type) {
		this.type = type;
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

	public void setDescription(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getPrice() {
		return price;
	}

}
