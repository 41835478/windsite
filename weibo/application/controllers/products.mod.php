<?php


/**************************************************
*  Created:  2010-06-08
*
*  fxy060608
*
*  @Xintao 
*  @Author fxy <fxy060608@gmail.com>
*
***************************************************/

class products_mod {
	var $uInfo = false;

	function products_mod() {
		// Cunstructor Here
	}

	/**
	 * 商品
	 */
	function default_action() {
		///初始化参数
		$mod = array ();
		$cat = array ();
		$cats = array (); //分类数组
		$total_results = 0; //返回结果数
		$items = array ();
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
		elseif (!empty ($search) && strpos($search, '-------------------------------') !== 0) { //如果搜索参数存在
			$mod['param'] = F('taobao.taobao_convert_search', $search); //根据URL参数查询,转换search参数
		} else { //默认配置
			//补充默认参数列表
			$mod['param'] = F('taobao.taobao_default_search', array ());
		}
		$mod['param']['nicks'] = str_replace(array (
			'[',
			']'
		), array (
			'',
			''
		), XT_SHOPS); //使用当前站点的店铺集合
		$mod['param']['show_num'] = 40;
		$params = $mod['param'];
		//print_r($mod);
		//第二步
		$params['fields'] = 'num_iid,title,nick,pic_url,cid,price,type,delist_time,post_fee,location,score,volume,has_discount,num,is_prepay,promoted_service,ww_status,list_time';
		$rst = array ();
		if (!empty ($params['nicks'])) {
			$rst = F('top.itemsSearch', 107, '站内店铺商品搜索', $params, true);
		}
		if (!empty ($rst)) { //如果返回结果不为空
			$total_results = $rst['total_results'];
			$itemSearch = $this->_generateItemSearch($rst);
			$items = $this->_generateItemSearchItems($itemSearch);
			$cats = $itemSearch['item_categories']['item_category'];
			//第三步查找分类（SEO）
			if (1 == count($cats)) { //如果只有一个分类，则查询属性
				$cat = F('top.itemcatsGet', 107, '淘宝分类模块', $cats[0]['category_id']);
			} else {
				if (!empty ($mod['param']['cid'])) {
					$cat = F('top.itemcatsGet', 107, '淘宝分类模块', $mod['param']['cid']);
				}
			}
		}
		TPL :: assign('mod', $mod);
		TPL :: assign('total_results', $total_results);
		TPL :: assign('list', $items);
		TPL :: assign('cats', $cats);
		TPL :: assign('cat', $cat);
		TPL :: display('xintao/products');
	}
	/**
	 * 商品弹出
	 */
	function itemBox() {
		///初始化参数
		$cat = array ();
		$cats = array (); //分类数组
		$items = array ();
		$total_results = 0; //返回结果数
		$params = array ();
		$params['nicks'] = str_replace(array (
			'[',
			']'
		), array (
			'',
			''
		), XT_SHOPS); //使用当前站点的店铺集合
		$params['q'] = urldecode(V('g:q', ''));
		$params['cid'] = V('g:cid', '');
		$params['order_by'] = V('g:order_by', '');
		$params['page_no'] = V('g:page_no', 1);
		$params['start_price'] = V('g:start_price', '');
		$params['end_price'] = V('g:end_price', '');
		$params['show_num'] = 40;
		$params['fields'] = 'num_iid,title,nick,pic_url,cid,price,type,delist_time,post_fee,location,score,volume,has_discount,num,is_prepay,promoted_service,ww_status,list_time';
		$rst = array ();
		if (!empty ($params['nicks'])) {
			$rst = F('top.itemsSearch', 107, '站内店铺商品搜索', $params);
		}
		if (!empty ($rst)) { //如果返回结果不为空
			$total_results = $rst['total_results'];
			if ($total_results > 0) {
				$itemSearch = $this->_generateItemSearch($rst);
				$items = $this->_generateItemSearchItems($itemSearch);
				$cats = $itemSearch['item_categories']['item_category'];
			}
			//第三步查找分类（SEO）暂不显示分类
			if (1 == count($cats)) { //如果只有一个分类，则查询属性
				//$cat = F('top.itemcatsGet', -999, '淘宝分类模块', $cats[0]['category_id']);
			} else {
				if (!empty ($params['cid'])) {
					//$cat = F('top.itemcatsGet', -999, '淘宝分类模块', $params['cid']);
				}
			}
		}
		$editHtm = TPL :: module('xintao/products_box', array (
			'total_results' => $total_results,
			'list' => $items,
			'cats' => $cats,
			'cat' => $cat,
			'params' => $params
		), FALSE, FALSE);
		APP :: ajaxRst($editHtm);
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