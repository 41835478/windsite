package com.wind.site.model;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

/**
 * 系统投放
 * 
 * @author fxy
 * 
 */
@Entity
@DiscriminatorValue("S")
public class ADBlogSystem extends ADBlog {

	private static final long serialVersionUID = 1L;

}
