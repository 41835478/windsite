package com.wind.site.model;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

/**
 * 领克特
 * 
 * @author fxy
 * 
 */
@Entity
@DiscriminatorValue("L")
public class LinktechCategory extends B2CCategory {
	private static final long serialVersionUID = 1L;

}
