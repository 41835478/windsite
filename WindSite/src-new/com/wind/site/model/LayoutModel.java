package com.wind.site.model;

import java.io.Serializable;

/**
 * 布局小模型
 * 
 * @author fxy
 * 
 */
public class LayoutModel implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;

	private String layout;

	private RegionModel main;
	private RegionModel sub;
	private RegionModel extra;

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
	 * @return the main
	 */
	public RegionModel getMain() {
		return main;
	}

	/**
	 * @param main
	 *            the main to set
	 */
	public void setMain(RegionModel main) {
		this.main = main;
	}

	/**
	 * @return the sub
	 */
	public RegionModel getSub() {
		return sub;
	}

	/**
	 * @param sub
	 *            the sub to set
	 */
	public void setSub(RegionModel sub) {
		this.sub = sub;
	}

	/**
	 * @return the extra
	 */
	public RegionModel getExtra() {
		return extra;
	}

	/**
	 * @param extra
	 *            the extra to set
	 */
	public void setExtra(RegionModel extra) {
		this.extra = extra;
	}

	public void setLayout(String layout) {
		this.layout = layout;
	}

	public String getLayout() {
		return layout;
	}

}
