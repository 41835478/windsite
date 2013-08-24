package com.taobao.api.domain;

import com.taobao.api.TaobaoObject;
import com.taobao.api.internal.mapping.ApiField;

/**
 * 淘宝客返利授权
 *
 * @author auto create
 * @since 1.0, null
 */
public class TaobaokeAuthorize extends TaobaoObject {

	private static final long serialVersionUID = 6657213419439394238L;

	/**
	 * 输入参数，nick或seller_id或num_iid
	 */
	@ApiField("param")
	private String param;

	/**
	 * 卖家是否同意返利.true:同意返利,false:拒绝返利
	 */
	@ApiField("rebate")
	private Boolean rebate;

	public String getParam() {
		return this.param;
	}
	public void setParam(String param) {
		this.param = param;
	}

	public Boolean getRebate() {
		return this.rebate;
	}
	public void setRebate(Boolean rebate) {
		this.rebate = rebate;
	}

}
