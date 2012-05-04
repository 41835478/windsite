package com.wind.site.model;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

/**
 * 亿起发商城
 * 
 * @author fxy
 * 
 */
@Entity
@DiscriminatorValue("Y")
public class YiqifaMall extends B2CMall {

	private static final long serialVersionUID = 1L;

}
