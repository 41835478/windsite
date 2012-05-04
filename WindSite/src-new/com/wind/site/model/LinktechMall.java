package com.wind.site.model;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

/**
 * 领克特商城
 * 
 * @author fxy
 * 
 */
@Entity
@DiscriminatorValue("L")
public class LinktechMall extends B2CMall {

	private static final long serialVersionUID = 1L;

}
