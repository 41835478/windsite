package com.wind.site.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 画报商品
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "t_huabao_item")
public class HuabaoItem implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	private Integer id;
	private Integer picId;// 图片ID
	private Long itemId;// : 7048662391,
	private Integer x;// : 75,
	private Integer y;// : 387,
	private Integer width;// : 200,
	private Integer height;// : 200,
	private String itemTitle;// :
	// '\u94C6\u9489\u673A\u8F66\u5305\u659C\u630E\u5305\u897F\u74DC\u7EA2',
	private String itemPic;// :
	// 'http://img01.taobaocdn.com/bao/uploaded/i1/T1jCXIXihlXXXHifM8_100423.jpg_100x100.jpg',
	private String itemLink;// :
	// 'http://s.click.taobao.com/t_1?i=r7NKT3xPuiqzBw%3D%3D&p=mm_12140908_0_0&n=11',
	private String itemDesc;// :
	// '\u94C6\u9489\u673A\u8F66\u5305\u659C\u630E\u5305\u897F\u74DC\u7EA2',
	private String itemPrice;// : '159.0',
	private String P4PKeyword;// :

	@Override
	public String toString() {
		String result = "{";
		result += "id:" + id + ",";
		result += "picId:" + picId + ",";
		result += "itemId:" + itemId + ",";
		result += "x:" + x + ",";
		result += "y:" + y + ",";
		result += "width:" + width + ",";
		result += "height:" + height + ",";
		result += "itemTitle:'" + itemTitle + "',";
		result += "itemPic:'" + itemPic + "',";
		result += "itemLink:'" + itemLink + "',";
		result += "itemDesc:'" + itemDesc + "',";
		result += "itemPrice:'" + itemPrice + "',";
		result += "P4PKeyword:'" + P4PKeyword + "'";
		result += "}";
		return result;
	}

	/**
	 * @return the id
	 */
	public Integer getId() {
		return id;
	}

	/**
	 * @param id
	 *            the id to set
	 */
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * @return the itemId
	 */
	public Long getItemId() {
		return itemId;
	}

	/**
	 * @param itemId
	 *            the itemId to set
	 */
	public void setItemId(Long itemId) {
		this.itemId = itemId;
	}

	/**
	 * @return the x
	 */
	public Integer getX() {
		return x;
	}

	/**
	 * @param x
	 *            the x to set
	 */
	public void setX(Integer x) {
		this.x = x;
	}

	/**
	 * @return the y
	 */
	public Integer getY() {
		return y;
	}

	/**
	 * @param y
	 *            the y to set
	 */
	public void setY(Integer y) {
		this.y = y;
	}

	/**
	 * @return the width
	 */
	public Integer getWidth() {
		return width;
	}

	/**
	 * @param width
	 *            the width to set
	 */
	public void setWidth(Integer width) {
		this.width = width;
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

	/**
	 * @return the itemTitle
	 */
	public String getItemTitle() {
		return itemTitle;
	}

	/**
	 * @param itemTitle
	 *            the itemTitle to set
	 */
	public void setItemTitle(String itemTitle) {
		this.itemTitle = itemTitle;
	}

	/**
	 * @return the itemPic
	 */
	public String getItemPic() {
		return itemPic;
	}

	/**
	 * @param itemPic
	 *            the itemPic to set
	 */
	public void setItemPic(String itemPic) {
		this.itemPic = itemPic;
	}

	/**
	 * @return the itemLink
	 */
	public String getItemLink() {
		return itemLink;
	}

	/**
	 * @param itemLink
	 *            the itemLink to set
	 */
	public void setItemLink(String itemLink) {
		this.itemLink = itemLink;
	}

	/**
	 * @return the itemDesc
	 */
	public String getItemDesc() {
		return itemDesc;
	}

	/**
	 * @param itemDesc
	 *            the itemDesc to set
	 */
	public void setItemDesc(String itemDesc) {
		this.itemDesc = itemDesc;
	}

	/**
	 * @return the itemPrice
	 */
	public String getItemPrice() {
		return itemPrice;
	}

	/**
	 * @param itemPrice
	 *            the itemPrice to set
	 */
	public void setItemPrice(String itemPrice) {
		this.itemPrice = itemPrice;
	}

	/**
	 * @return the p4PKeyword
	 */
	public String getP4PKeyword() {
		return P4PKeyword;
	}

	/**
	 * @param p4pKeyword
	 *            the p4PKeyword to set
	 */
	public void setP4PKeyword(String p4pKeyword) {
		P4PKeyword = p4pKeyword;
	}

	/**
	 * @return the picId
	 */
	public Integer getPicId() {
		return picId;
	}

	/**
	 * @param picId
	 *            the picId to set
	 */
	public void setPicId(Integer picId) {
		this.picId = picId;
	}

}
