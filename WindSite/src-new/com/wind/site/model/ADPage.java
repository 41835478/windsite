package com.wind.site.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Table;

/**
 * 首页投放
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_ad_page")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type", discriminatorType = DiscriminatorType.STRING)
@DiscriminatorValue("A")
public class ADPage implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	private ADPagePK pk;
	@Column(insertable = false, updatable = false)
	private String type;

	/**
	 * @return the pk
	 */
	public ADPagePK getPk() {
		return pk;
	}

	/**
	 * @param pk
	 *            the pk to set
	 */
	public void setPk(ADPagePK pk) {
		this.pk = pk;
	}

	/**
	 * @return the type
	 */
	public String getType() {
		return type;
	}

	/**
	 * @param type
	 *            the type to set
	 */
	public void setType(String type) {
		this.type = type;
	}

}
