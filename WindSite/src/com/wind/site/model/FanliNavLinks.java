package com.wind.site.model;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

/**
 * 会员导航栏链接
 * 
 * @author fxy
 * 
 */
@Entity
@DiscriminatorValue("N")
public class FanliNavLinks extends FanliLinks {

	private static final long serialVersionUID = 1L;

}
