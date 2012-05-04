package com.wind.site.module.spider;

import java.io.Serializable;
import java.util.List;

/**
 * 淘宝商城首页楼层模型
 * 
 * @author fxy
 * 
 */
public class MallIndexFloor implements Serializable {

	private static final long serialVersionUID = 1L;

	private String title;

	private Integer sortOrder;

	private List<String> words;

	private MallIndexFloorLeft floorLeft;

	private MallIndexFloorMiddle floorMiddle;

	private MallIndexFloorRight floorRight;

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
	public MallIndexFloorLeft getFloorLeft() {
		return floorLeft;
	}

	/**
	 * @param floorLeft
	 *            the floorLeft to set
	 */
	public void setFloorLeft(MallIndexFloorLeft floorLeft) {
		this.floorLeft = floorLeft;
	}

	public void setFloorMiddle(MallIndexFloorMiddle floorMiddle) {
		this.floorMiddle = floorMiddle;
	}

	public MallIndexFloorMiddle getFloorMiddle() {
		return floorMiddle;
	}

	public void setFloorRight(MallIndexFloorRight floorRight) {
		this.floorRight = floorRight;
	}

	public MallIndexFloorRight getFloorRight() {
		return floorRight;
	}

	/**
	 * @return the words
	 */
	public List<String> getWords() {
		return words;
	}

	/**
	 * @param words
	 *            the words to set
	 */
	public void setWords(List<String> words) {
		this.words = words;
	}

}
