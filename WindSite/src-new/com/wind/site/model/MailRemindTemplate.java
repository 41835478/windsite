package com.wind.site.model;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

/**
 * 提醒邮件
 * 
 * @author fxy
 * 
 */
@Entity
@DiscriminatorValue("R")
public class MailRemindTemplate extends MailTemplate {
	private static final long serialVersionUID = 1L;

}
