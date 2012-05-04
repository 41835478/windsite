package com.wind.site.model;

import java.io.Serializable;

import javax.persistence.Embeddable;

/**
 * 容器内容主键
 * 
 * @author fxy
 * 
 */
@Embeddable
public class PageRegionPK implements Serializable {

	private static final long serialVersionUID = 1L;
	/**
	 * 容器<br/>
	 * main-wrap<br/>
	 * col-sub<br/>
	 * col-extra<br/>
	 */
	private String region;
	/**
	 * 所属布局
	 */
	private String layout;

	/**
	 * @return the region
	 */
	public String getRegion() {
		return region;
	}

	/**
	 * @param region
	 *            the region to set
	 */
	public void setRegion(String region) {
		this.region = region;
	}

	/**
	 * @return the layout
	 */
	public String getLayout() {
		return layout;
	}

	/**
	 * @param layout
	 *            the layout to set
	 */
	public void setLayout(String layout) {
		this.layout = layout;
	}

	@Override
	public boolean equals(Object obj) {
		if (obj instanceof PageRegionPK) {
			PageRegionPK pk = (PageRegionPK) obj;
			if (this.region.equals(pk.getRegion())
					&& this.layout.equals(pk.getLayout())) {
				return true;
			}
		}
		return false;
	}

	@Override
	public int hashCode() {
		return this.region.hashCode() + this.layout.hashCode();
	}
}
