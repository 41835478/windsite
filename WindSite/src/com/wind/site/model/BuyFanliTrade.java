package com.wind.site.model;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

/**
 * 购买返利
 * 
 * @author fxy
 * 
 */
@Entity
@DiscriminatorValue("BUY")
public class BuyFanliTrade extends FanliTrade {

	private static final long serialVersionUID = 1L;

}
