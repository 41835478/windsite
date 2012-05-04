package com.wind.site.model;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

/**
 * 亿起发B2C分类
 * 
 * @author fxy
 * 
 */
@Entity
@DiscriminatorValue("Y")
public class YiqifaCategory extends B2CCategory {

	private static final long serialVersionUID = 1L;

}
