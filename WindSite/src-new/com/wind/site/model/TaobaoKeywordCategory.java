package com.wind.site.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * 关键词分类
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "t_keyword_cat")
public class TaobaoKeywordCategory implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String cid;

	private String name;

	private Long parent;
	/**
	 * 子分类集合
	 */
	@Transient
	private List<TaobaoKeywordCategory> cats;

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
	 * @return the cid
	 */
	public String getCid() {
		return cid;
	}

	/**
	 * @param cid
	 *            the cid to set
	 */
	public void setCid(String cid) {
		this.cid = cid;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name
	 *            the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the parent
	 */
	public Long getParent() {
		return parent;
	}

	/**
	 * @param parent
	 *            the parent to set
	 */
	public void setParent(Long parent) {
		this.parent = parent;
	}

	public void setCats(List<TaobaoKeywordCategory> cats) {
		this.cats = cats;
	}

	public List<TaobaoKeywordCategory> getCats() {
		return cats;
	}

}
