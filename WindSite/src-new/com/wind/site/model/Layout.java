package com.wind.site.model;

import java.io.Serializable;

import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "w_page_layout")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type", discriminatorType = DiscriminatorType.STRING)
@DiscriminatorValue("L")
public class Layout implements Serializable {
	private static final long serialVersionUID = 1L;
	/**
	 * 单栏950
	 */
	public static final String M = "grid-m";
	/**
	 * 两栏190+750
	 */
	public static final String S5M0 = "grid-s5m0";
	/**
	 * 两栏750+190
	 */
	public static final String M0S5 = "grid-m0s5";
	/**
	 * 三栏190+550+190
	 */
	public static final String S5M0E5 = "grid-s5m0e5";
	/**
	 * 三栏550+190+190
	 */
	public static final String M0S5E5 = "grid-m0s5e5";
	/**
	 * 三栏190+190+550
	 */
	public static final String S5E5M0 = "grid-s5e5m0";
	/**
	 * 三栏310+310+310
	 */
	public static final String S310M0E310 = "grid-s310m0e310";
	/**
	 * 布局标识
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	/**
	 * 父容器标识(链表指针)
	 */
	private Long parent;
	/**
	 * 布局<br/>
	 * m[950]<br/>
	 * s5m0[190+750]<br/>
	 * m0s5[750+190]<br/>
	 * s5m0e5[190+550+190]<br/>
	 * m0s5e5[550+190+190]<br/>
	 * s5e5m0[190+190+550]<br/>
	 */
	private String layout;
	/**
	 * 所属页面
	 */
	private String page;
	/**
	 * 所属会员
	 */
	private String user_id;
	/**
	 * 所属站点
	 */
	private String site_id;
	/**
	 * 所属会员昵称
	 */
	private String nick;
	/**
	 * 主内容区
	 */
	@Transient
	private PageRegion main;
	/**
	 * 副内容区
	 */
	@Transient
	private PageRegion sub;
	/**
	 * 附属内容区
	 */
	@Transient
	private PageRegion extra;

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

	/**
	 * @return the page
	 */
	public String getPage() {
		return page;
	}

	/**
	 * @param page
	 *            the page to set
	 */
	public void setPage(String page) {
		this.page = page;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public String getUser_id() {
		return user_id;
	}

	public void setSite_id(String site_id) {
		this.site_id = site_id;
	}

	public String getSite_id() {
		return site_id;
	}

	public void setNick(String nick) {
		this.nick = nick;
	}

	public String getNick() {
		return nick;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getId() {
		return id;
	}

	public void setParent(Long parent) {
		this.parent = parent;
	}

	public Long getParent() {
		return parent;
	}

	public void setMain(PageRegion main) {
		this.main = main;
	}

	public PageRegion getMain() {
		return main;
	}

	public void setSub(PageRegion sub) {
		this.sub = sub;
	}

	public PageRegion getSub() {
		return sub;
	}

	public void setExtra(PageRegion extra) {
		this.extra = extra;
	}

	public PageRegion getExtra() {
		return extra;
	}
}
