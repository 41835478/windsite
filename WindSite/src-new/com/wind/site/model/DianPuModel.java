package com.wind.site.model;

import java.io.Serializable;
import java.util.List;

/**
 * 店铺中间模型
 * 
 * @author fxy
 * 
 */
public class DianPuModel implements Serializable {

	private static final long serialVersionUID = 1L;

	private DianPuCategory root;

	private List<DianPuCategory> cats;

	private List<DianPu> shops;

	/**
	 * @return the root
	 */
	public DianPuCategory getRoot() {
		return root;
	}

	/**
	 * @param root
	 *            the root to set
	 */
	public void setRoot(DianPuCategory root) {
		this.root = root;
	}

	/**
	 * @return the cats
	 */
	public List<DianPuCategory> getCats() {
		return cats;
	}

	/**
	 * @param cats
	 *            the cats to set
	 */
	public void setCats(List<DianPuCategory> cats) {
		this.cats = cats;
	}

	/**
	 * @return the shops
	 */
	public List<DianPu> getShops() {
		return shops;
	}

	/**
	 * @param shops
	 *            the shops to set
	 */
	public void setShops(List<DianPu> shops) {
		this.shops = shops;
	}

}
