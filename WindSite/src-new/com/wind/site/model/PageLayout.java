package com.wind.site.model;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

/**
 * 页面BD内布局
 * 
 * @author fxy
 * 
 */
@Entity
@DiscriminatorValue("B")
public class PageLayout extends Layout {

	private static final long serialVersionUID = 1L;

}
