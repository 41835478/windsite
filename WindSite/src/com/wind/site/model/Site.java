package com.wind.site.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * 站点
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_site")
public class Site extends TimestampModel {

	private static final long serialVersionUID = 1743907171465232080L;
	/**
	 * 网站名
	 */
	private String title;
	/**
	 * 用户ID
	 */
	private String user_id;

	/**
	 * 域名
	 */
	private String domainName;
	/**
	 * 顶级域名
	 */
	private String www;
	/**
	 * 微博
	 */
	private String weibo;
	/**
	 * 社区
	 */
	private String discuzx;
	/**
	 * Google Analytics (分析) 标识 ID
	 */
	private String gid;
	/**
	 * 量子恒道 标识ID
	 */
	private String lid;
	/**
	 * 51啦 标识ID
	 */

	private String laid;
	/**
	 * 默认统计类型
	 */
	private String analyticsType;
	/**
	 * 站点状态<br/>
	 * 0:未发布 1:已发布
	 */
	private Integer status = 0;
	/**
	 * 站点描述
	 */
	@Column(length = 500)
	private String description;
	/**
	 * 站点关键词
	 */
	@Column(length = 500)
	private String metadata;
	/**
	 * RSS地址
	 */
	@Column(length = 500)
	private String rss;
	/**
	 * 店铺类别
	 */
	private String cid;
	/**
	 * 站点模板
	 */
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "site_id")
	private List<UserTemplate> templates;
	/**
	 * 返利设置
	 */
	@Transient
	private SiteCommission commission;
	/**
	 * 当前站点PV
	 */
	private Long pv;
	/**
	 * 当前站点UV
	 */
	private Long uv;

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
	 * @return the user_id
	 */
	public String getUser_id() {
		return user_id;
	}

	/**
	 * @param userId
	 *            the user_id to set
	 */
	public void setUser_id(String userId) {
		user_id = userId;
	}

	/**
	 * @return the domainName
	 */
	public String getDomainName() {
		return domainName;
	}

	/**
	 * @param domainName
	 *            the domainName to set
	 */
	public void setDomainName(String domainName) {
		this.domainName = domainName;
	}

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

	@Override
	public boolean equals(Object obj) {
		if (obj == null) {
			return false;
		}
		if (this == obj)
			return true;
		if (!(obj instanceof Site))
			return false;
		Site site = (Site) obj;
		return site.getId() == this.getId();
	}

	@Override
	public int hashCode() {
		if (this.getId() != null)
			return this.getId().hashCode();
		else
			return super.hashCode();
	}

	/**
	 * @return the templates
	 */
	public List<UserTemplate> getTemplates() {
		return templates;
	}

	/**
	 * @param templates
	 *            the templates to set
	 */
	public void setTemplates(List<UserTemplate> templates) {
		this.templates = templates;
	}

	public void setLid(String lid) {
		this.lid = lid;
	}

	public String getLid() {
		return lid;
	}

	public void setLaid(String laid) {
		this.laid = laid;
	}

	public String getLaid() {
		return laid;
	}

	public void setAnalyticsType(String analyticsType) {
		this.analyticsType = analyticsType;
	}

	public String getAnalyticsType() {
		return analyticsType;
	}

	/**
	 * @return the status
	 */
	public Integer getStatus() {
		return status;
	}

	/**
	 * @param status
	 *            the status to set
	 */
	public void setStatus(Integer status) {
		this.status = status;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

	public void setMetadata(String metadata) {
		this.metadata = metadata;
	}

	public String getMetadata() {
		return metadata;
	}

	public void setRss(String rss) {
		this.rss = rss;
	}

	public String getRss() {
		return rss;
	}

	public void setCid(String cid) {
		this.cid = cid;
	}

	public String getCid() {
		return cid;
	}

	public void setWww(String www) {
		this.www = www;
	}

	public String getWww() {
		return www;
	}

	public void setPv(Long pv) {
		this.pv = pv;
	}

	public Long getPv() {
		return pv;
	}

	public void setUv(Long uv) {
		this.uv = uv;
	}

	public Long getUv() {
		return uv;
	}

	public void setCommission(SiteCommission commission) {
		this.commission = commission;
	}

	public SiteCommission getCommission() {
		return commission;
	}

	public void setWeibo(String weibo) {
		this.weibo = weibo;
	}

	public String getWeibo() {
		return weibo;
	}

	public void setDiscuzx(String discuzx) {
		this.discuzx = discuzx;
	}

	public String getDiscuzx() {
		return discuzx;
	}

}
