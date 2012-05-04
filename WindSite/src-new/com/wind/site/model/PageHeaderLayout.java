package com.wind.site.model;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

/**
 * 页面页头布局
 * 
 * @author fxy
 * 
 */
@Entity
@DiscriminatorValue("H")
public class PageHeaderLayout extends Layout {
	private static final long serialVersionUID = 1L;

}
