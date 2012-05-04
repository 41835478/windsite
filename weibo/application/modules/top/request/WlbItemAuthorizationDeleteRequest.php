<?php
/**
 * TOP API: taobao.wlb.item.authorization.delete request
 * 
 * @author auto create
 * @since 1.0, 2011-08-26 17:15:55
 */
class WlbItemAuthorizationDeleteRequest
{
	/** 
	 * 授权关系ID
	 **/
	private $authorizeId;
	
	private $apiParas = array();
	
	public function setAuthorizeId($authorizeId)
	{
		$this->authorizeId = $authorizeId;
		$this->apiParas["authorize_id"] = $authorizeId;
	}

	public function getAuthorizeId()
	{
		return $this->authorizeId;
	}

	public function getApiMethodName()
	{
		return "taobao.wlb.item.authorization.delete";
	}
	
	public function getApiParas()
	{
		return $this->apiParas;
	}
	
	public function check()
	{
		
		RequestCheckUtil::checkNotNull($this->authorizeId,"authorizeId");
	}
}
