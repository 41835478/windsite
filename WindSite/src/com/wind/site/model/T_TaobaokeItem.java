package com.wind.site.model;

import javax.persistence.Entity;
import javax.persistence.Table;

import org.apache.commons.lang.StringUtils;
import org.hibernate.search.annotations.Indexed;

/**
 * 淘宝客商品数据模型
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "t_item")
@Indexed(index = "t_item")
public class T_TaobaokeItem extends T_TaobaoItem {

	private static final long serialVersionUID = -2199582251818683351L;

	// 新淘内部结构
	private String gid;// 推广组ID

	private Boolean isRss = false;// 是否已订阅

	/**
	 * @return the gid
	 */
	public String getGid() {
		return gid;
	}

	/**
	 * @param gid
	 *            the gid to set
	 */
	public void setGid(String gid) {
		this.gid = gid;
	}

	/**
	 * @return the isRss
	 */
	public Boolean getIsRss() {
		return isRss;
	}

	/**
	 * @param isRss
	 *            the isRss to set
	 */
	public void setIsRss(Boolean isRss) {
		this.isRss = isRss;
	}

	@Override
	public boolean equals(Object obj) {
		if (obj == null) {
			return false;
		}
		if (this == obj)
			return true;
		if (!(obj instanceof T_TaobaokeItem))
			return false;
		T_TaobaokeItem item = (T_TaobaokeItem) obj;
		if (item.getIid().equals(this.getIid())) {// 商品ID相等
			if (item.getGid() == this.getGid()) {// 推广组ID相等
				return true;
			}
		}
		return false;
	}

	@Override
	public int hashCode() {
		if (StringUtils.isNotEmpty(this.getIid()) && this.getGid() != null)
			return this.getIid().hashCode() + this.getGid().hashCode();
		else
			return super.hashCode();
	}
}
