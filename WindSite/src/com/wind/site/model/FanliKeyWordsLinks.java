package com.wind.site.model;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

/**
 * 
 * 文章关键词
 * 
 * @author fxy
 * 
 */
@Entity
@DiscriminatorValue("K")
public class FanliKeyWordsLinks extends FanliLinks {
	private static final long serialVersionUID = 1L;
}
