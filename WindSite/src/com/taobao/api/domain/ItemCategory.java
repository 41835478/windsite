package com.taobao.api.domain;

import com.taobao.api.TaobaoObject;
import com.taobao.api.internal.mapping.ApiField;

/**
 * ItemCategory Data Structure.
 * 
 * DESC：商品查询分类结果
 * 
 * @author auto create
 * @since 1.0, 2010-04-22 18:56:59.0
 */
public class ItemCategory extends TaobaoObject {

	private static final long serialVersionUID = 3872164949613681414L;

	/**
	 * 分类ID
	 **/
	@ApiField("category_id")
	private Long categoryId;

	/**
	 * 商品数量
	 **/
	@ApiField("count")
	private Long count;
	/**
	 * 修订，加入类目名称
	 */
	private String name;

	public Long getCategoryId() {
		return this.categoryId;
	}

	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}

	public Long getCount() {
		return this.count;
	}

	public void setCount(Long count) {
		this.count = count;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

}
