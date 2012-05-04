package com.wind.site.model;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

/**
 * 搜索页面布局
 * 
 * @author fxy
 * 
 */
@Entity
@DiscriminatorValue("S")
public class PageSearchLayout extends Layout {
	private static final long serialVersionUID = 1L;
}
