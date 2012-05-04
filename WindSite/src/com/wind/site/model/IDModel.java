package com.wind.site.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import org.hibernate.annotations.GenericGenerator;

/**
 * 主键
 * 
 * @author fxy
 * 
 */
@MappedSuperclass
public class IDModel implements Serializable {

	private static final long serialVersionUID = 4812642848666280261L;
	@Id
	@Column(length = 32)
	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name = "system-uuid", strategy = "uuid")
	protected String id;

	public void setId(String id) {
		this.id = id;
	}

	public String getId() {
		return id;
	}
}
