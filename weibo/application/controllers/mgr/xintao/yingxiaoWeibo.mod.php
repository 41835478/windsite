<?php
include (P_ADMIN_MODULES . '/action.abs.php');
class yingxiaoWeibo_mod extends action {

	function yingxiaoWeibo_mod() {
		parent :: action();
	}
	/**
	 * 商品弹出
	 */
	function userItemBox() {
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
		$params['order_by'] = V('g:order_by', 'volume:desc');
		if (empty ($params['order_by'])) {
			$params['order_by'] = 'volume:desc';
		}
		$params['page_no'] = V('g:page_no', 1);
		$params['show_num'] = 40;
		$params['fields'] = 'num_iid,title,nick,pic_url,cid,price,type,delist_time,post_fee,location,score,volume,has_discount,num,is_prepay,promoted_service,ww_status,list_time';
		$rst = array ();
		$added = array ();
		if (!empty ($params['nicks'])) {
			$rst = F('top.itemsSearch', 107, '站内店铺商品搜索', $params, true, false);
		}
		if (!empty ($rst)) { //如果返回结果不为空
			$total_results = $rst['total_results'];
			if ($total_results > 0) {
				$items = $rst['item_search']['items']['item'];
				$db = APP :: ADP('db');
				$nids = $db->query('SELECT nid FROM ' . $db->getTable(T_XT_USER_ITEM) . ' WHERE user_id=' . XT_USER_ID);
				if (!empty ($nids)) {
					foreach ($nids as $nid) {
						$added[] = $nid['nid'];
					}
				}
			}
		}
		$editHtm = TPL :: module('xintao/products_box', array (
			'total_results' => $total_results,
			'list' => $items,
			'params' => $params,
			'nids' => $added,
			'isBack' => true
		), FALSE, FALSE);
		APP :: ajaxRst($editHtm);
	}
	/**
	 * 卖家商品营销微博
	 */
	function userItemWeiboList() {

		$pager = APP :: N('pager');
		$page = (int) V('g:page', 1);
		$each = (int) V('g:each', 15);
		$offset = ($page -1) * $each;
		$data = array ();
		$pageCount = 0;
		if (XT_SID != '') {
			$data = DR('mgr/xintao/yingxiaoWeiboCom.getItemWeibo', '', $each, $offset, false);
			$pageCount = DS('mgr/xintao/yingxiaoWeiboCom.getItemCount');
		}
		$page_param = array (
			'currentPage' => $page,
			'pageSize' => $each,
			'recordCount' => $pageCount,
			'linkNumber' => 10
		);
		$pager->setParam($page_param);
		$editHtm = TPL :: module('xintao/userItemWeibo', array (
			'total_results' => $pageCount,
			'list' => $data,
			'pager' => $pager->makePage()
		), FALSE, FALSE);
		APP :: ajaxRst($editHtm);
	}
	function addYingxiaoUserItem() {
		$num_iid = V('p:nid');
		if ($num_iid > 0) {
			$count = DS('xintao/userItem.getItemCount', '', $num_iid);
			if ($count > 0) {
				exit ('{"state":"201"}');
			}
			$count = DS('xintao/userItem.getItemsCount', '', 1);
			if ($count >= 40) {
				exit ('{"state":"203"}');
			}
			DS('xintao/userItem.save', '', array (
				'nid' => $num_iid,
				'title' => V('p:title'),
				'price' => V('p:price'),
				'nick' => V('p:nick'),
				'pic_url' => V('p:pic_url'),
				'click_url' => '',
				'commission' => '',
				'commission_num' => 0,
				'item_location' => '',
				'volume' => V('p:volume'),
				'isSeller' => 1,
				'nickname' => SYSTEM_SINA_USERNICK,
				'qq_nickname' => WB_QQ_NAME,
				'sh_nickname' => WB_SOHU_NICK,
				'wy_nickname' => WB_WY_NAME,
				'nums' => 0,
				'user_id' => XT_USER_ID,
				'cid' => V('p:cid'),
				'type' => 1,
				'nums' => 0
			));
			exit ('{"state":"200"}');
		}
		exit ('{"state":"202"}');
	}
	/**
	 * 商品弹出
	 */
	function taokeItemBox() {
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
		$added = array ();
		if ($rst) {
			$total_results = $rst['total_results'];
			$taobaoke_items = $rst['taobaoke_items']['taobaoke_item'];
			$db = APP :: ADP('db');
			$nids = $db->query('SELECT nid FROM ' . $db->getTable(T_XT_TAOKE_ITEM) . ' WHERE user_id=' . XT_USER_ID);
			if (!empty ($nids)) {
				foreach ($nids as $nid) {
					$added[] = $nid['nid'];
				}
			}
		}
		$editHtm = TPL :: module('xintao/items_box', array (
			'total_results' => $total_results,
			'list' => $taobaoke_items,
			'params' => $params,
			'nids' => $added,
			'isTaoke' => true
		), FALSE, FALSE);
		APP :: ajaxRst($editHtm);

	}
	function taokeItemList() {
		$items = DS('xintao/taokeItem.getItems');
		TPL :: assign('list', $items);
		TPL :: display('mgr/xintao/taoke/yingxiaoTaokeItem', '', 0, false);
	}
	/**
	 * 淘宝客商品营销微博
	 */
	function taokeItemWeiboList() {
		$pager = APP :: N('pager');
		$page = (int) V('g:page', 1);
		$each = (int) V('g:each', 15);
		$offset = ($page -1) * $each;

		$taobaoke_items = array ();
		$total_results = 0;
		$taobaoke_items = DR('xintao/taokeItem.getTaokeItemWeibo', '', $each, $offset);
		$total_results = DS('xintao/taokeItem.getCount');
		$page_param = array (
			'currentPage' => $page,
			'pageSize' => $each,
			'recordCount' => $total_results,
			'linkNumber' => 10
		);
		$pager->setParam($page_param);
		$editHtm = TPL :: module('xintao/taokeItemWeibo', array (
			'total_results' => $total_results,
			'list' => $taobaoke_items,
			'pager' => $pager->makePage()
		), FALSE, FALSE);
		APP :: ajaxRst($editHtm);
	}

	function synCat() {
		ignore_user_abort(); //即使Client断开(如关掉浏览器)，PHP脚本也可以继续执行
		set_time_limit(300); //设置总执行时间限制，预期不可超过40分钟
		F('taobao_cat.updateCat');
		exit ('{"state":"200"}');
	}
	function synTaokeItem() {
		ignore_user_abort(); //即使Client断开(如关掉浏览器)，PHP脚本也可以继续执行
		set_time_limit(100); //设置总执行时间限制，预期不可超过40分钟
		F('user_item.synUserItemToTaokeItem');
		exit ('{"state":"200"}');
	}

	function deleteYingxiaoUserItem() {
		$num_iids = V('p:num_iids');
		if ($num_iids) {
			DS('xintao/userItem.deleteItems', '', $num_iids);
		}
		exit ('{"state":"200"}');
	}
	function deleteYingxiaoTaokeItem() {
		$num_iids = V('p:num_iids');
		if ($num_iids) {
			DS('xintao/taokeItem.deleteItems', '', $num_iids);
		}
		exit ('{"state":"200"}');
	}
	function addYingxiaoTaokeItem() {
		$num_iid = V('p:nid');
		if ($num_iid > 0) {
			$count = DS('xintao/taokeItem.getItemCount', '', $num_iid);
			if ($count > 0) {
				exit ('{"state":"201"}');
			}
			$count = DS('xintao/taokeItem.getItemsCount');
			if ($count >= 40) {
				exit ('{"state":"203"}');
			}
			DS('xintao/taokeItem.save', '', array (
				'nid' => $num_iid,
				'title' => V('p:title'),
				'price' => V('p:price'),
				'nick' => V('p:nick'),
				'pic_url' => V('p:pic_url'),
				'commission' => V('p:commission'),
				'commission_num' => V('p:commission_num'),
				'item_location' => V('p:item_location'),
				'volume' => V('p:volume'),
				'nums' => 0,
				'user_id' => XT_USER_ID
			));
			exit ('{"state":"200"}');
		}
		exit ('{"state":"202"}');
	}
	/**
		 * 店铺商品列表
		 */
	function itemList() {
		$pager = APP :: N('pager');
		$page = (int) V('g:page', 1);
		$each = (int) V('g:each', 40);
		$offset = ($page -1) * $each;
		$data = array ();
		$pageCount = 0;
		$count = 0;
		if (XT_SID != '') {
			$count = DS('mgr/xintao/yingxiaoWeiboCom.getItemWeiboNum', 'g0/300');
			$data = DS('mgr/xintao/yingxiaoWeiboCom.getUserItem', '', $each, $offset);
			$pageCount = DS('mgr/xintao/yingxiaoWeiboCom.getUserItemCount');
		}
		$page_param = array (
			'currentPage' => $page,
			'pageSize' => $each,
			'recordCount' => $pageCount,
			'linkNumber' => 10
		);
		$pager->setParam($page_param);
		TPL :: assign('count', $count);
		TPL :: assign('list', $data);
		TPL :: assign('pager', $pager->makePage());
		TPL :: assign('offset', $offset);
		TPL :: display('mgr/xintao/yingxiaoItem', '', 0, false);
	}
	/**
	 * 微博列表
	 */
	function shopWeiboList() {
		$pager = APP :: N('pager');
		$page = (int) V('g:page', 1);
		$each = (int) V('g:each', 15);
		$offset = ($page -1) * $each;
		$sids = array ();
		$sidsStr = str_replace(array (
			'[',
			']'
		), array (
			'',
			''
		), XT_SIDS);
		if (!empty ($sidsStr)) {
			$sids = explode(',', $sidsStr);
		}
		$data = array ();
		$pageCount = 0;
		if (!empty ($sids)) {
			$data = DR('mgr/xintao/yingxiaoWeiboCom.getShopWeibo', '', $sids, $each, $offset, false);
			$pageCount = DS('mgr/xintao/yingxiaoWeiboCom.getCount');

		}

		$page_param = array (
			'currentPage' => $page,
			'pageSize' => $each,
			'recordCount' => $pageCount,
			'linkNumber' => 10
		);
		$pager->setParam($page_param);
		TPL :: assign('count', $pageCount);
		TPL :: assign('list', $data);
		TPL :: assign('pager', $pager->makePage());
		TPL :: assign('offset', $offset);
		TPL :: display('mgr/xintao/yingxiaoShopWeibo', '', 0, false);
	}
	/**
	 * 微博列表
	 */
	function itemWeiboList() {
		//		$pager = APP :: N('pager');
		//		$page = (int) V('g:page', 1);
		//		$each = (int) V('g:each', 15);
		//		$offset = ($page -1) * $each;
		//		$data = array ();
		//		$pageCount = 0;
		//		if (XT_SID != '') {
		//			$data = DR('mgr/xintao/yingxiaoWeiboCom.getItemWeibo', '', $each, $offset, false);
		//			$pageCount = DS('mgr/xintao/yingxiaoWeiboCom.getItemCount');
		//		}
		//		$page_param = array (
		//			'currentPage' => $page,
		//			'pageSize' => $each,
		//			'recordCount' => $pageCount,
		//			'linkNumber' => 10
		//		);
		//		$pager->setParam($page_param);
		//		TPL :: assign('count', $pageCount);
		//		TPL :: assign('list', $data);
		//		TPL :: assign('pager', $pager->makePage());
		//		TPL :: assign('offset', $offset);
		TPL :: display('mgr/xintao/yingxiaoItemWeibo', '', 0, false);
	}

}