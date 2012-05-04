package com.wind.site.module.spider.domain;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

public class MallIndexNewFloor implements Serializable {

	private static final long serialVersionUID = 1L;

	private String title;

	private Integer sortOrder;

	private MallIndexNewFloorLeft floorLeft;

	private MallIndexNewFloorMiddle floorMiddle;

	private MallIndexNewFloorRight floorRight;

	private MallIndexNewFloorBottom floorBottom;

	private List<Map<String, String>> brands;

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
	 * @return the sortOrder
	 */
	public Integer getSortOrder() {
		return sortOrder;
	}

	/**
	 * @param sortOrder
	 *            the sortOrder to set
	 */
	public void setSortOrder(Integer sortOrder) {
		this.sortOrder = sortOrder;
	}

	/**
	 * @return the floorLeft
	 */
	public MallIndexNewFloorLeft getFloorLeft() {
		return floorLeft;
	}

	/**
	 * @param floorLeft
	 *            the floorLeft to set
	 */
	public void setFloorLeft(MallIndexNewFloorLeft floorLeft) {
		this.floorLeft = floorLeft;
	}

	/**
	 * @return the floorMiddle
	 */
	public MallIndexNewFloorMiddle getFloorMiddle() {
		return floorMiddle;
	}

	/**
	 * @param floorMiddle
	 *            the floorMiddle to set
	 */
	public void setFloorMiddle(MallIndexNewFloorMiddle floorMiddle) {
		this.floorMiddle = floorMiddle;
	}

	/**
	 * @return the floorRight
	 */
	public MallIndexNewFloorRight getFloorRight() {
		return floorRight;
	}

	/**
	 * @param floorRight
	 *            the floorRight to set
	 */
	public void setFloorRight(MallIndexNewFloorRight floorRight) {
		this.floorRight = floorRight;
	}

	/**
	 * @return the floorBottom
	 */
	public MallIndexNewFloorBottom getFloorBottom() {
		return floorBottom;
	}

	/**
	 * @param floorBottom
	 *            the floorBottom to set
	 */
	public void setFloorBottom(MallIndexNewFloorBottom floorBottom) {
		this.floorBottom = floorBottom;
	}

	/**
	 * @return the brands
	 */
	public List<Map<String, String>> getBrands() {
		return brands;
	}

	/**
	 * @param brands
	 *            the brands to set
	 */
	public void setBrands(List<Map<String, String>> brands) {
		this.brands = brands;
	}

}
