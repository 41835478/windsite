package com.wind.site.model;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 新淘网限制
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_limit")
public class Limit extends IDModel {

	private static final long serialVersionUID = 1L;
	/**
	 * 布局数量
	 */
	private Integer layouts = 2;
	/**
	 * 模块数量
	 */
	private Integer modules = 12;
	/**
	 * 页头模块数量
	 */
	private Integer headers = 1;
	/**
	 * 页面限额
	 */
	private Integer pages = 5;

	/**
	 * 收藏店铺限额
	 */
	private Integer shops = 10;
	/**
	 * 推广组限额
	 */
	private Integer groups = 10;
	/**
	 * 自定义组件限额
	 */
	private Integer widgets = 15;
	/**
	 * 自定义组件收藏限额
	 */
	private Integer favWidgets = 20;
	/**
	 * 阵地收藏数
	 */
	private Integer favForums = 100;

	/**
	 * 首页广告计划数
	 */
	private Integer indexAds = 5;
	/**
	 * 日志广告计划数
	 */
	private Integer blogAds = 5;
	/**
	 * 首页广告投放数量
	 */
	private Integer indexAdsSites = 50;
	/**
	 * 日志广告投放数量
	 */
	private Integer blogAdsSites = 10;
	/**
	 * 用户
	 */
	private String user_id;

	/**
	 * @return the indexAds
	 */
	public Integer getIndexAds() {
		return indexAds;
	}

	/**
	 * @param indexAds
	 *            the indexAds to set
	 */
	public void setIndexAds(Integer indexAds) {
		this.indexAds = indexAds;
	}

	/**
	 * @return the blogAds
	 */
	public Integer getBlogAds() {
		return blogAds;
	}

	/**
	 * @param blogAds
	 *            the blogAds to set
	 */
	public void setBlogAds(Integer blogAds) {
		this.blogAds = blogAds;
	}

	/**
	 * @return the indexAdsSites
	 */
	public Integer getIndexAdsSites() {
		return indexAdsSites;
	}

	/**
	 * @param indexAdsSites
	 *            the indexAdsSites to set
	 */
	public void setIndexAdsSites(Integer indexAdsSites) {
		this.indexAdsSites = indexAdsSites;
	}

	/**
	 * @return the blogAdsSites
	 */
	public Integer getBlogAdsSites() {
		return blogAdsSites;
	}

	/**
	 * @param blogAdsSites
	 *            the blogAdsSites to set
	 */
	public void setBlogAdsSites(Integer blogAdsSites) {
		this.blogAdsSites = blogAdsSites;
	}

	public void setPages(Integer pages) {
		this.pages = pages;
	}

	public Integer getPages() {
		return pages;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public String getUser_id() {
		return user_id;
	}

	public void setShops(Integer shops) {
		this.shops = shops;
	}

	public Integer getShops() {
		return shops;
	}

	public void setGroups(Integer groups) {
		this.groups = groups;
	}

	public Integer getGroups() {
		return groups;
	}

	public void setWidgets(Integer widgets) {
		this.widgets = widgets;
	}

	public Integer getWidgets() {
		return widgets;
	}

	public void setFavWidgets(Integer favWidgets) {
		this.favWidgets = favWidgets;
	}

	public Integer getFavWidgets() {
		return favWidgets;
	}

	public void setFavForums(Integer favForums) {
		this.favForums = favForums;
	}

	public Integer getFavForums() {
		return favForums;
	}

	public void setLayouts(Integer layouts) {
		this.layouts = layouts;
	}

	public Integer getLayouts() {
		return layouts;
	}

	public void setModules(Integer modules) {
		this.modules = modules;
	}

	public Integer getModules() {
		return modules;
	}

	public void setHeaders(Integer headers) {
		this.headers = headers;
	}

	public Integer getHeaders() {
		return headers;
	}

}
