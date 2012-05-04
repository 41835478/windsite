<?php
require_once dirname(__FILE__) . '/component_abstract.pls.php';
/**
 * 站内店铺商品搜索
 * @author fxy060608
 * @version $Id: component_107.pls.php
 *
 */
class component_107_pls extends component_abstract_pls {

	function run($mod) {
		parent :: run($mod);
		///初始化参数
		$cats = array (); //分类数组
		$total_results = 0; //返回结果数
		//第一步：初始化URL中的参数列表
		//第二步：根据条件查询商品NUM_IID
		//第三步：根据返回的类别生成搜索区（分类|属性）【此步骤交由通道完成】
		//第一步
		///模块可配置参数列表:q,cid,nicks,order_by,is_cod,post_free,is_mall,has_discount,start_price,end_price
		$search = V('g:search', '');
		$q = V('g:q', '');
		$cid = V('g:cid', '');
		$g = V('g');
		if (!empty ($q)) {
			$mod['param'] = F('taobao.taobao_default_search', array (
				'q' => $q
			));
			//仅查询关键词
		}
		elseif (!empty ($cid)) {
			$mod['param'] = F('taobao.taobao_default_search', array (
				'cid' => $cid
			)); //仅查询分类
		}
		elseif (!empty ($search) && strpos($search, '------------------------------') !== 0) { //如果搜索参数存在
			//echo $search;exit;
			$mod['param'] = F('taobao.taobao_convert_search', $search); //根据URL参数查询,转换search参数
		} else { //默认配置
			///TODO 需根据不同来源过滤启用不同参数列表（合法参数未必存在，需甄别，另外show_size配置merge至url参数中）
			$mod['param'] = F('taobao.taobao_default_search', array (
				'order_by' => $mod['param']['order_by']
			));
			//补充默认参数列表
		}
		$mod['param']['nicks'] = str_replace(']', '', str_replace('[', '', XT_SHOPS)); //使用当前站点的店铺集合
		$mod['param']['show_num']=18;
		$params = $mod['param'];
		//第二步
		$params['fields'] = 'num_iid,title,nick,pic_url,cid,price,type,delist_time,post_fee,location,score,volume,has_discount,num,is_prepay,promoted_service,ww_status,list_time';
		$rst = F('top.itemsSearch', 107, '站内店铺商品搜索', $params);
		if (!empty ($rst)) { //如果返回结果不为空
			$total_results = $rst['total_results'];
			$itemSearch = $this->_generateItemSearch($rst);
			$items = $this->_generateItemSearchItems($itemSearch);
			$cats = $itemSearch['item_categories']['item_category'];
		}
		TPL :: module('xintao/products', array (
			'mod' => $mod,
			'total_results' => $total_results,
			'list' => $items,
			'cats' => $cats
		));

	}
	/**
	 * @param array $rst 本组件内生成的商品搜索结果rst数组资源
	 * @return array
	 */
	function _generateItemSearchItems($rst) {
		if (array_key_exists('items', $rst)) {
			return $rst['items']['item'];
		}
		return array ();
	}
	/**
	 *
	 * @param array $rst 本组件内生成的商品搜索结果rst数组资源
	 * @return array
	 */
	function _generateItemSearch($rst) {
		if (array_key_exists('item_search', $rst)) {
			return $rst['item_search'];
		}
		return array ();
	}
}