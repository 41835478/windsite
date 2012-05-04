package com.wind.site.model;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

/**
 * 页面详情
 * 
 * @author fxy
 * 
 */
@Entity
@DiscriminatorValue("D")
public class PageDetailLayout extends Layout {
	private static final long serialVersionUID = 1L;
}
