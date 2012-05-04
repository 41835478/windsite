package com.wind.site.model;

import java.io.Serializable;
import java.util.List;

/**
 * 页面小模型
 * 
 * @author fxy
 * 
 */
public class PageModel implements Serializable {

	private static final long serialVersionUID = 1L;
	/**
	 * 页头
	 */
	private List<LayoutModel> hd;
	/**
	 * 内容区
	 */
	private List<LayoutModel> bd;
	/**
	 * 页尾
	 */
	private List<LayoutModel> ft;

	/**
	 * @return the hd
	 */
	public List<LayoutModel> getHd() {
		return hd;
	}

	/**
	 * @param hd
	 *            the hd to set
	 */
	public void setHd(List<LayoutModel> hd) {
		this.hd = hd;
	}

	/**
	 * @return the bd
	 */
	public List<LayoutModel> getBd() {
		return bd;
	}

	/**
	 * @param bd
	 *            the bd to set
	 */
	public void setBd(List<LayoutModel> bd) {
		this.bd = bd;
	}

	/**
	 * @return the ft
	 */
	public List<LayoutModel> getFt() {
		return ft;
	}

	/**
	 * @param ft
	 *            the ft to set
	 */
	public void setFt(List<LayoutModel> ft) {
		this.ft = ft;
	}

}
