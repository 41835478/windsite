<?php


/**
 * 获取微薄列表的广告列表（目前支持商品，不排除淘宝客方面支持店铺）
 */
function feedlist() {
	$items = array ();
	if (XT_IS_SELLER == 'true' && XT_SHOPS != '') {
		$params = array ();
		$params['nicks'] = str_replace(array (
			'[',
			']'
		), array (
			'',
			''
		), XT_SHOPS); //使用当前站点的店铺集合
		$params['page_no'] = 1;
		$params['show_num'] = 40;
		//第二步
		$params['fields'] = 'num_iid,title,nick,pic_url,cid,price,type,delist_time,post_fee,location,score,volume,has_discount,num,is_prepay,promoted_service,ww_status,list_time';
		$rst = F('top.itemsSearch', 999, '微薄列表商品广告位', $params, true);
		if (!empty ($rst)) { //如果返回结果不为空
			$total_results = $rst['total_results'];
			if ($total_results > 0) {
				$items = $rst['item_search']['items']['item'];
			}
		}
	}
	return $items;
}