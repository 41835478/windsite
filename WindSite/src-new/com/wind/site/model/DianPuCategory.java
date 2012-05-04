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
 * 店铺
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_dianpu_cat")
public class DianPuCategory implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String name;
	private String title;
	private Long parent;
	@Transient
	private List<DianPu> shops;
	@Transient
	private DianPuCategory parentCat;

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

	public void setShops(List<DianPu> shops) {
		this.shops = shops;
	}

	public List<DianPu> getShops() {
		return shops;
	}

	public void setParentCat(DianPuCategory parentCat) {
		this.parentCat = parentCat;
	}

	public DianPuCategory getParentCat() {
		return parentCat;
	}

}
