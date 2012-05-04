package com.wind.site.model;

import javax.persistence.Basic;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Lob;
import javax.persistence.Table;

/**
 * 页头设计
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_page_header")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type", discriminatorType = DiscriminatorType.STRING)
@DiscriminatorValue("H")
public class Header extends TimestampModel {

	private static final long serialVersionUID = 1L;

	/**
	 * 模板内容
	 */
	@Lob
	@Basic(fetch = FetchType.LAZY)
	private String content;

	public void setContent(String content) {
		this.content = content;
	}

	public String getContent() {
		return content;
	}
}
