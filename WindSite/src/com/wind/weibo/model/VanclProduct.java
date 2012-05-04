package com.wind.weibo.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "xwb_xt_vancl_product")
public class VanclProduct implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	private String productCode;

	private String name;

	private String photos;

	private String currentPrice;

	private String originalPrice;

	private String specialPrice;

	private Boolean isSpecial;

	private Integer cat1;
	private Integer cat2;
	private Integer cat3;
	private Integer cat4;
	private Integer cat5;

	private Boolean isValid;

	private Boolean isNew;

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
	 * @return the photos
	 */
	public String getPhotos() {
		return photos;
	}

	/**
	 * @param photos
	 *            the photos to set
	 */
	public void setPhotos(String photos) {
		this.photos = photos;
	}

	/**
	 * @return the currentPrice
	 */
	public String getCurrentPrice() {
		return currentPrice;
	}

	/**
	 * @param currentPrice
	 *            the currentPrice to set
	 */
	public void setCurrentPrice(String currentPrice) {
		this.currentPrice = currentPrice;
	}

	/**
	 * @return the originalPrice
	 */
	public String getOriginalPrice() {
		return originalPrice;
	}

	/**
	 * @param originalPrice
	 *            the originalPrice to set
	 */
	public void setOriginalPrice(String originalPrice) {
		this.originalPrice = originalPrice;
	}

	/**
	 * @return the isSpecial
	 */
	public Boolean getIsSpecial() {
		return isSpecial;
	}

	/**
	 * @param isSpecial
	 *            the isSpecial to set
	 */
	public void setIsSpecial(Boolean isSpecial) {
		this.isSpecial = isSpecial;
	}

	/**
	 * @return the cat1
	 */
	public Integer getCat1() {
		return cat1;
	}

	/**
	 * @param cat1
	 *            the cat1 to set
	 */
	public void setCat1(Integer cat1) {
		this.cat1 = cat1;
	}

	/**
	 * @return the cat2
	 */
	public Integer getCat2() {
		return cat2;
	}

	/**
	 * @param cat2
	 *            the cat2 to set
	 */
	public void setCat2(Integer cat2) {
		this.cat2 = cat2;
	}

	/**
	 * @return the cat3
	 */
	public Integer getCat3() {
		return cat3;
	}

	/**
	 * @param cat3
	 *            the cat3 to set
	 */
	public void setCat3(Integer cat3) {
		this.cat3 = cat3;
	}

	/**
	 * @return the cat4
	 */
	public Integer getCat4() {
		return cat4;
	}

	/**
	 * @param cat4
	 *            the cat4 to set
	 */
	public void setCat4(Integer cat4) {
		this.cat4 = cat4;
	}

	/**
	 * @return the cat5
	 */
	public Integer getCat5() {
		return cat5;
	}

	/**
	 * @param cat5
	 *            the cat5 to set
	 */
	public void setCat5(Integer cat5) {
		this.cat5 = cat5;
	}

	public void setIsValid(Boolean isValid) {
		this.isValid = isValid;
	}

	public Boolean getIsValid() {
		return isValid;
	}

	public void setIsNew(Boolean isNew) {
		this.isNew = isNew;
	}

	public Boolean getIsNew() {
		return isNew;
	}

	public void setSpecialPrice(String specialPrice) {
		this.specialPrice = specialPrice;
	}

	public String getSpecialPrice() {
		return specialPrice;
	}

}
