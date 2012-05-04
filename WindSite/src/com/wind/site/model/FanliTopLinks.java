package com.wind.site.model;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

/**
 * 顶部链接
 * 
 * @author fxy
 * 
 */
@Entity
@DiscriminatorValue("T")
public class FanliTopLinks extends FanliLinks {
	private static final long serialVersionUID = 1L;
}
