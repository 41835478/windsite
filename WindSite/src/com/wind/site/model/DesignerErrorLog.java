package com.wind.site.model;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 设计器出错日志
 * 
 * @author fxy
 * 
 */
@Entity
@Table(name = "w_designer_error_log")
public class DesignerErrorLog extends Log {
	private static final long serialVersionUID = 1L;

}
