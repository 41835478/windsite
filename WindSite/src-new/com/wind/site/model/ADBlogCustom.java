package com.wind.site.model;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

/**
 * 自己投放
 * 
 * @author fxy
 * 
 */
@Entity
@DiscriminatorValue("C")
public class ADBlogCustom extends ADBlog {

	private static final long serialVersionUID = 1L;

}
