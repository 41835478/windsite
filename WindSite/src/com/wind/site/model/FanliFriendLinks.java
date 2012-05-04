package com.wind.site.model;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

/**
 * 友情链接
 * 
 * @author fxy
 * 
 */
@Entity
@DiscriminatorValue("F")
public class FanliFriendLinks extends FanliLinks {

	private static final long serialVersionUID = 1L;

}
