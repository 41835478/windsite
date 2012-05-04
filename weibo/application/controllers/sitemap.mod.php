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
class sitemap_mod {

	function sitemap_mod() {

	}

	function default_action() {
		if (XT_IS_SELLER == 'true' && XT_SHOPS != '') { //卖家
			$this->product();
		} else { //淘客
			$this->cat();
		}
	}
	//类目地图
	function cat() {
		$sitemap = DS('mgr/xintao/sitemap.getByUserId', 'g0', XT_USER_ID);
		if (!empty ($sitemap['cids'])) {
			TPL :: assign('cats', array_slice(F('top.itemcatsGet', -999, '分类地图', $sitemap['cids'], true), 0, 100));
		}
		TPL :: assign('type', 'cids');
		TPL :: display('xintao/sitemap/cats');
	}
	//关键词地图
	function keyword() {
		$sitemap = DS('mgr/xintao/sitemap.getByUserId', 'g0', XT_USER_ID);
		if (!empty ($sitemap['keywords'])) {
			TPL :: assign('keywords', json_decode($sitemap['keywords'], true));
		}
		TPL :: assign('type', 'keywords');
		TPL :: display('xintao/sitemap/keywords');
	}
	//产品地图
	function product() {
		$sitemap = DS('mgr/xintao/sitemap.getByUserId', 'g0', XT_USER_ID);
		$params = array ();
		if (!empty ($sitemap['products'])) {
			$params = json_decode($sitemap['products'], true);
		}
		$page = V('g:page_no', 1);
		$params['nicks'] = str_replace(array (
			'[',
			']'
		), array (
			'',
			''
		), XT_SHOPS); //使用当前站点的店铺集合
		$params['show_num'] = 40;
		$params['page_no'] = $page;
		$params['fields'] = 'num_iid,title';
		$rst = array ();
		$items = array ();
		$total_results = 0;
		if (XT_IS_SELLER == 'true' && !empty ($params['nicks'])) {
			$rst = F('top.itemsSearch', -999, '官方店铺地图商品搜索', $params, true);
		}
		if (!empty ($rst)) { //如果返回结果不为空
			$total_results = $rst['total_results'];
			$items = $rst['item_search']['items']['item'];
		}
		TPL :: assign('total_results', $total_results);
		TPL :: assign('products', $items);
		TPL :: assign('type', 'products');
		TPL :: display('xintao/sitemap/products');
	}
	//商品地图
	function item() {
		$sitemap = DS('mgr/xintao/sitemap.getByUserId', 'g0', XT_USER_ID);
		$params = array ();
		if (!empty ($sitemap['items'])) {
			$params = json_decode($sitemap['items'], true);
		}
		$page = V('g:page_no', 1);
		if ($page > 100) {
			$page = 100;
		}
		$items = array ();
		$total_results = 0;
		if (isset ($params['keyword']) && isset ($params['cid']) && (!empty ($params['keyword']) || !empty ($params['cid']))) {
			$params['show_num'] = 40;
			$params['page_no'] = $page;
			$ret = F('top.taobaokeItemsGet', -999, '商品地图搜索', F('taobao.taobaoke_default_search', $params), true);
			$rst = $ret['rst'];
			if ($rst) {
				$total_results = $rst['total_results'];
				$items = $rst['taobaoke_items']['taobaoke_item'];
			}
		}
		TPL :: assign('total_results', $total_results);
		TPL :: assign('items', $items);
		TPL :: assign('type', 'items');
		TPL :: display('xintao/sitemap/items');
	}
	//画报地图
	function poster() {
		$sitemap = DS('mgr/xintao/sitemap.getByUserId', 'g0', XT_USER_ID);
		$params = array ();
		if (!empty ($sitemap['posters'])) {
			$params = json_decode($sitemap['posters'], true);
		}
		$page = V('g:page_no', 1);
		if ($page > 100) {
			$page = 100;
		}
		$posters = array ();
		if (isset ($params['key_word']) && isset ($params['channel_ids']) && (!empty ($params['key_word']) || !empty ($params['channel_ids']))) {
			$params['show_num'] = 20;
			$params['page_no'] = $page;
			$posters = F('top.posterPostersSearch', -999, '淘画报地图搜索', $params);
		}
		TPL :: assign('posters', $posters);
		TPL :: assign('type', 'posters');
		TPL :: display('xintao/sitemap/posters');
	}
	//影视地图
	function tv() {
		$sitemap = DS('mgr/xintao/sitemap.getByUserId', 'g0', XT_USER_ID);
		$params = array ();
		if (!empty ($sitemap['tvs'])) {
			$params = json_decode($sitemap['tvs'], true);
		}
		$page = V('g:page_no', 1);
		if ($page > 100) {
			$page = 100;
		}
		$posters = array ();
		$pagination = array (
			'count' => 0,
			'resultList' => array ()
		);
		if (isset ($params['c']) && isset ($params['o']) && (!empty ($params['c']) || !empty ($params['o']))) {
			$params['show_num'] = 40;
			$params['page_no'] = $page;
			$pagination = F('tv.search', -999, '影视地图搜索', $params);
		}
		TPL :: assign('total_results', $pagination['count']);
		TPL :: assign('tvs', $pagination['resultList']);
		TPL :: assign('type', 'tvs');
		TPL :: display('xintao/sitemap/tvs');
	}
	//影视地图
	function shop() {
		$sitemap = DS('mgr/xintao/sitemap.getByUserId', 'g0', XT_USER_ID);
		$params = array ();
		if (!empty ($sitemap['shops'])) {
			$params = json_decode($sitemap['shops'], true);
		}
		TPL :: assign('shops', DS('xintao/userShop.getShopBySeller', 'g0/' . CACHE_24));
		TPL :: assign('type', 'shops');
		TPL :: display('xintao/sitemap/shops');
	}

}