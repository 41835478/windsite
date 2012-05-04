package com.wind.weibo.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "xwb_xt_vancl_product_desc")
public class VanclProductDesc implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	private String productCode;

	private String washing;

	private String color;

	private String photos;

	private String props;

	private String sizes;

	private String description;

	private String sizeTable;

	/**
	 * @return the productCode
	 */
	public String getProductCode() {
		return productCode;
	}

	/**
	 * @param productCode
	 *            the productCode to set
	 */
	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}

	/**
	 * @return the washing
	 */
	public String getWashing() {
		return washing;
	}

	/**
	 * @param washing
	 *            the washing to set
	 */
	public void setWashing(String washing) {
		this.washing = washing;
	}

	/**
	 * @return the color
	 */
	public String getColor() {
		return color;
	}

	/**
	 * @param color
	 *            the color to set
	 */
	public void setColor(String color) {
		this.color = color;
	}

	/**
	 * @return the props
	 */
	public String getProps() {
		return props;
	}

	/**
	 * @param props
	 *            the props to set
	 */
	public void setProps(String props) {
		this.props = props;
	}

	/**
	 * @return the sizes
	 */
	public String getSizes() {
		return sizes;
	}

	/**
	 * @param sizes
	 *            the sizes to set
	 */
	public void setSizes(String sizes) {
		this.sizes = sizes;
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
	 * @return the sizeTable
	 */
	public String getSizeTable() {
		return sizeTable;
	}

	/**
	 * @param sizeTable
	 *            the sizeTable to set
	 */
	public void setSizeTable(String sizeTable) {
		this.sizeTable = sizeTable;
	}

	public void setPhotos(String photos) {
		this.photos = photos;
	}

	public String getPhotos() {
		return photos;
	}

}
