package com.wind.site.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.apache.lucene.analysis.cn.ChineseAnalyzer;
import org.hibernate.search.annotations.Analyzer;
import org.hibernate.search.annotations.DocumentId;
import org.hibernate.search.annotations.Field;
import org.hibernate.search.annotations.Index;
import org.hibernate.search.annotations.Indexed;
import org.hibernate.search.annotations.Store;

/**
 * 画报
 * 
 * @author fxy
 * 
 */

@Entity
@Table(name = "t_huabao")
@Indexed(index = "t_huabao")
public class Huabao implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@DocumentId
	private Integer picId;// : 3997296,

	private String picSrc;// :
	// 'http://img03.taobaocdn.com/poster_pic/i3/T1typMXodgXXaH.X6X.JPEG',
	@Field(name = "picDesc", store = Store.NO, index = Index.TOKENIZED, analyzer = @Analyzer(impl = ChineseAnalyzer.class))
	private String picDesc;
	private String relatedGoodsLink;// : '',
	private Integer nums;
	/**
	 * 图片宽度
	 */
	private Integer width;
	/**
	 * 图片高度
	 */
	private Integer height;

	/**
	 * 专辑ID
	 */
	private Integer hid;
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "picId", referencedColumnName = "picId")
	private List<HuabaoItem> markedItem;

	@Override
	public String toString() {
		String result = "{";
		result += "picId:" + picId + ",";
		result += "picSrc:'" + picSrc + "',";
		result += "picDesc:'" + picDesc + "',";
		result += "relatedGoodsLink:'" + relatedGoodsLink + "',";
		if (markedItem != null) {
			result += "markedItem:[";
			boolean isFirst = true;
			for (HuabaoItem item : markedItem) {
				if (isFirst) {
					isFirst = false;
				} else {
					result += ",";
				}
				result += item.toString();
			}
			result += "]";
		} else {
			result += "markedItem:[]";
		}
		result += "}";
		return result;
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

	/**
	 * @return the picSrc
	 */
	public String getPicSrc() {
		return picSrc;
	}

	/**
	 * @param picSrc
	 *            the picSrc to set
	 */
	public void setPicSrc(String picSrc) {
		this.picSrc = picSrc;
	}

	/**
	 * @return the picDesc
	 */
	public String getPicDesc() {
		return picDesc;
	}

	/**
	 * @param picDesc
	 *            the picDesc to set
	 */
	public void setPicDesc(String picDesc) {
		this.picDesc = picDesc;
	}

	/**
	 * @return the relatedGoodsLink
	 */
	public String getRelatedGoodsLink() {
		return relatedGoodsLink;
	}

	/**
	 * @param relatedGoodsLink
	 *            the relatedGoodsLink to set
	 */
	public void setRelatedGoodsLink(String relatedGoodsLink) {
		this.relatedGoodsLink = relatedGoodsLink;
	}

	public void setMarkedItem(List<HuabaoItem> markedItem) {
		this.markedItem = markedItem;
	}

	public List<HuabaoItem> getMarkedItem() {
		return markedItem;
	}

	public void setHid(Integer hid) {
		this.hid = hid;
	}

	public Integer getHid() {
		return hid;
	}

	public void setNums(Integer nums) {
		this.nums = nums;
	}

	public Integer getNums() {
		return nums;
	}

	public void setWidth(Integer width) {
		this.width = width;
	}

	public Integer getWidth() {
		return width;
	}

	public void setHeight(Integer height) {
		this.height = height;
	}

	public Integer getHeight() {
		return height;
	}

}
