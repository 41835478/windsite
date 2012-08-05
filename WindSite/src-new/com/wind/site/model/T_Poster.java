package com.wind.site.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 新版本画报
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "t_poster")
public class T_Poster implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	private Long id;// String 否 123456 画报ID。
	private Date created;// Date 否 2000-01-01 00:00:00 创建时间。
	private Date modified;// Date 否 2000-01-01 00:00:00 修改时间。

	private String title;// String 否 图片标题 图片标题。
	private String short_title;// String 否 图片短标题 图片短标题。
	@Column(length = 500)
	private String tags;// String 否 tag1,tag2 画报相关标签，由逗号(',')分开，最多5个。
	private Integer weight;// Number 否 5 权重。-1 至 10 。10为最高。
	private String cover_urls;// String否http://www.taobao.com/XXXXXX封面路径。由逗号(',')分开，最多2个
	private Long hits;// Number 否 100 画报的点击总数。
	private Long channel_id;// String 否 123456 画报所属频道id。
	private Boolean isSuccess;// 是否成功抓取
	private Boolean isPic;// 是否已抓取图片

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
	 * @return the created
	 */
	public Date getCreated() {
		return created;
	}

	/**
	 * @param created
	 *            the created to set
	 */
	public void setCreated(Date created) {
		this.created = created;
	}

	/**
	 * @return the modified
	 */
	public Date getModified() {
		return modified;
	}

	/**
	 * @param modified
	 *            the modified to set
	 */
	public void setModified(Date modified) {
		this.modified = modified;
	}

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
	 * @return the short_title
	 */
	public String getShort_title() {
		return short_title;
	}

	/**
	 * @param shortTitle
	 *            the short_title to set
	 */
	public void setShort_title(String shortTitle) {
		short_title = shortTitle;
	}

	/**
	 * @return the tags
	 */
	public String getTags() {
		return tags;
	}

	/**
	 * @param tags
	 *            the tags to set
	 */
	public void setTags(String tags) {
		this.tags = tags;
	}

	/**
	 * @return the weight
	 */
	public Integer getWeight() {
		return weight;
	}

	/**
	 * @param weight
	 *            the weight to set
	 */
	public void setWeight(Integer weight) {
		this.weight = weight;
	}

	/**
	 * @return the cover_urls
	 */
	public String getCover_urls() {
		return cover_urls;
	}

	/**
	 * @param coverUrls
	 *            the cover_urls to set
	 */
	public void setCover_urls(String coverUrls) {
		cover_urls = coverUrls;
	}

	/**
	 * @return the hits
	 */
	public Long getHits() {
		return hits;
	}

	/**
	 * @param hits
	 *            the hits to set
	 */
	public void setHits(Long hits) {
		this.hits = hits;
	}

	/**
	 * @return the channel_id
	 */
	public Long getChannel_id() {
		return channel_id;
	}

	/**
	 * @param channelId
	 *            the channel_id to set
	 */
	public void setChannel_id(Long channelId) {
		channel_id = channelId;
	}

	/**
	 * @return the isSuccess
	 */
	public Boolean getIsSuccess() {
		return isSuccess;
	}

	/**
	 * @param isSuccess
	 *            the isSuccess to set
	 */
	public void setIsSuccess(Boolean isSuccess) {
		this.isSuccess = isSuccess;
	}

	public void setIsPic(Boolean isPic) {
		this.isPic = isPic;
	}

	public Boolean getIsPic() {
		return isPic;
	}

}
