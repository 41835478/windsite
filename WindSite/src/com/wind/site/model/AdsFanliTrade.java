package com.wind.site.model;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

/**
 * 推广返利
 * 
 * @author fxy
 * 
 */
@Entity
@DiscriminatorValue("ADS")
public class AdsFanliTrade extends FanliTrade {

	private static final long serialVersionUID = 1L;

}
