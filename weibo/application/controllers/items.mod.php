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

class items_mod {
	var $uInfo = false;

	function items_mod() {
		// Cunstructor Here
	}

	/**
	 * 商品
	 */
	function default_action() {
		$mod = array ();
		$taobaokeItems = array (); //淘客商品数组
		$cat = array ();
		$cats = array (); //分类数组
		$total_results = 0; //返回结果数
		//第一步：初始化URL中的参数列表
		//第二步：根据条件查询商品NUM_IID
		//第三步：根据返回的类别生成搜索区（分类|属性）【此步骤交由通道完成】
		//第四步：根据NUM_IID转换推广商品
		//第五步：如果有排序字段，则排序转换结果
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
			$mod['param'] = F('taobao.taobao_convert_search', $search); //根据URL参数查询,转换search参数
		} else { //默认配置
			//取模块配置
			$pm = APP :: N('pageManager');
			$manager = $pm->getPageManager(10000);
			$mod['param'] = json_decode($manager['param'], TRUE);
			///需根据不同来源过滤启用不同参数列表（合法参数未必存在，需甄别，另外show_size配置merge至url参数中）
			if ($mod['param']['source'] == 2) { //配置为卖家搜索时,仅适用卖家相关搜索条件，其他条件不启用
				$mod['param'] = F('taobao.taobao_default_search', array (
					'nicks' => $mod['param']['nicks'],
					'q' => $mod['param']['q'],
					'order_by' => $mod['param']['order_by'],
					'show_size' => $mod['param']['show_size']
				));
				//补充默认参数列表
			} else { //配置为自动搜索时，关闭卖家昵称条件
				$mod['param']['nicks'] = '';
				$mod['param'] = F('taobao.taobao_default_search', $mod['param']);
			}
			unset ($mod['param']['source']); //取消配置的多余参数
		}
		$params = $mod['param'];
		//第二步
		$rst = F('top.itemsSearch', 97, '商品搜索', $params);
		if (!empty ($rst)) { //如果返回结果不为空
			$total_results = $rst['total_results'];
			$itemSearch = $this->_generateItemSearch($rst);
			$items = $this->_generateItemSearchItems($itemSearch);
			if (!empty ($items)) {
				$numIids = '';
				foreach ($items as $row) {
					$numIids .= $row['num_iid'] . ',';
				}
				//第三步
				$cats = $itemSearch['item_categories']['item_category'];
				//第四步
				$taobaokeItems = F('top.taobaokeItemsConvert', 97, '商品搜索', $numIids);
				//第五步如果指定了排序字段，且是销量或价格排序
				if (array_key_exists('order_by', $params) && ('volume:desc' == $params['order_by'] || 'price:desc' == $params['order_by'] || 'price:asc' == $params['order_by']) && !empty ($taobaokeItems)) {
					foreach ($taobaokeItems as $key => $row) {
						$volume[$key] = $row['volume'];
						$price[$key] = $row['price'];
					}
					if ('volume:desc' == $params['order_by']) { //销量排序
						array_multisort($volume, SORT_DESC, $taobaokeItems);
					}
					elseif ('price:desc' == $params['order_by']) { //价格高到低排序
						array_multisort($price, SORT_DESC, $taobaokeItems);
					}
					elseif ('price:asc' == $params['order_by']) { //价格低到高排序
						array_multisort($price, SORT_ASC, $taobaokeItems);
					}
				}
			}
			//第六步查找分类（SEO）
			if (1 == count($cats)) { //如果只有一个分类，则查询属性
				$cat = F('top.itemcatsGet', 96, '淘宝分类模块', $cats[0]['category_id']);
			} else {
				if (!empty ($mod['param']['cid'])) {
					$cat = F('top.itemcatsGet', 96, '淘宝分类模块', $mod['param']['cid']);
				}
			}
		}
		TPL :: assign('data_type', 'tb_items');
		TPL :: assign('mod', $mod);
		TPL :: assign('total_results', $total_results);
		TPL :: assign('list', $taobaokeItems);
		TPL :: assign('cats', $cats);
		TPL :: assign('cat', $cat);
		TPL :: display('xintao/items');
	}
	/**
	 * 商品弹出
	 */
	function itemBox() {
		$params = V('g');
		$params['show_num'] = 40;
		if ((!isset ($params['keyword']) || empty ($params['keyword'])) && (!isset ($params['cid']) || empty ($params['cid']))) {
			$params['cid'] = 16;
		}
		if (!isset ($params['sort']) || empty ($params['sort'])) {
			$params['sort'] = 'commissionNum_desc';
		}
		if (!isset ($params['page_no']) || empty ($params['page_no'])) {
			$params['page_no'] = 1;
		}
		$total_results = 0;
		$taobaoke_items = array ();
		$params['keyword'] = urldecode($params['keyword']);
		$params = F('taobao.taobaoke_default_search', $params); //填充默认参数
		$ret = F('top.taobaokeItemsGet', -999, '商品搜索', $params, true);
		if ($ret['errno']) {
			APP :: ajaxRst('<div>发生错误:' . $ret['err'] . '</div>');
		}
		$rst = $ret['rst'];
		if ($rst) {
			$total_results = $rst['total_results'];
			$taobaoke_items = $rst['taobaoke_items']['taobaoke_item'];
		}
		$editHtm = TPL :: module('xintao/items_box', array (
			'total_results' => $total_results,
			'list' => $taobaoke_items,
			'params' => $params,
			'isTaoke' => false
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