<?php
include (P_ADMIN_MODULES . '/action.abs.php');
class wowMgr_mod extends action {

	function wowMgr_mod() {
		parent :: action();
	}
	function synWowUserItem() {
		if (XT_IS_SELLER == 'true' && XT_FREE_DATELINE == '') {
			$db = APP :: ADP('db');
			$sql = 'SELECT count(*) FROM ' . $db->getTable(T_XT_WOW_USER_ITEM) . ' WHERE `user_id`=' . XT_USER_ID;
			$count = $db->getOne($sql);
			if ($count == 0) { //如果尚未同步该店铺商品
				ignore_user_abort(); //即使Client断开(如关掉浏览器)，PHP脚本也可以继续执行
				set_time_limit(300); //设置总执行时间限制，预期不限时。
				F('user_item.synWowUserItem');
				exit ('200');
			} else {
				exit ('202');
			}
		}
		exit ('201');
	}
	function userItemList() {
		$sites = DS('mgr/adminCom.getAdminsByDomain', 'g0/' . CACHE_1);
		TPL :: assign('sites', $sites);
		$this->_display('xintao/wow/userItemList');
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
			$nids = $db->query('SELECT nid FROM ' . $db->getTable(T_XT_WOW_TAOKE_ITEM) . ' WHERE user_id=' . XT_USER_ID);
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
		$cats = array ();
		if (XT_IS_WEIBO == 'true' && XT_FREE_DATELINE == '') {
			$cats = DS('mgr/xintao/wow.getTaokeItemCat');
		}
		TPL :: assign('cat', V('g:id', 902));
		TPL :: assign('cats', $cats);
		$this->_display('xintao/wow/taokeItemList');
	}
	function userItem() {
		$pager = APP :: N('pager');
		$page = (int) V('g:page', 1);
		$each = (int) V('g:each', 20);
		$offset = ($page -1) * $each;

		$taobaoke_items = array ();
		$total_results = 0;
		$taobaoke_items = DS('mgr/xintao/wow.getWowUserItemList', '', $offset, $each);
		$total_results = DS('mgr/xintao/wow.getWowUserItemCount');
		$page_param = array (
			'currentPage' => $page,
			'pageSize' => $each,
			'recordCount' => $total_results,
			'linkNumber' => 10
		);
		$pager->setParam($page_param);
		$editHtm = TPL :: module('xintao/wow/userItemList', array (
			'total_results' => $total_results,
			'list' => $taobaoke_items,
			'pager' => $pager->makePage()
		), FALSE, FALSE);
		APP :: ajaxRst($editHtm);
	}
	function taokeItem() {
		$pager = APP :: N('pager');
		$page = (int) V('g:page', 1);
		$each = (int) V('g:each', 20);
		$offset = ($page -1) * $each;

		$taobaoke_items = array ();
		$total_results = 0;
		$cat = V('g:cat', '');
		$isValid = V('g:isValid', '');
		$taobaoke_items = DS('mgr/xintao/wow.getWowTaokeItemList', '', $cat, $isValid, $offset, $each);
		$total_results = DS('mgr/xintao/wow.getWowTaokeItemCount');
		$page_param = array (
			'currentPage' => $page,
			'pageSize' => $each,
			'recordCount' => $total_results,
			'linkNumber' => 10
		);
		$pager->setParam($page_param);
		$editHtm = TPL :: module('xintao/wow/taokeItemList', array (
			'total_results' => $total_results,
			'list' => $taobaoke_items,
			'pager' => $pager->makePage()
		), FALSE, FALSE);
		APP :: ajaxRst($editHtm);
	}
	function addWowTaokeItem() {
		$num_iid = V('p:nid');
		if ($num_iid > 0) {
			$count = DS('mgr/xintao/wow.getTaokeItemCount', '', $num_iid);
			if ($count > 0) {
				exit ('{"state":"201"}');
			}
			$count = DS('mgr/xintao/wow.getTaokeItemsCount', '', V('p:cat', 902));
			if ($count >= 200) {
				exit ('{"state":"203"}');
			}
			DS('mgr/xintao/wow.saveTaokeItem', '', array (
				'nid' => $num_iid,
				'title' => V('p:title'),
				'price' => V('p:price'),
				'nick' => V('p:nick'),
				'pic_url' => V('p:pic_url'),
				'commission' => V('p:commission'),
				'volume' => V('p:volume'),
				'nums' => 0,
				'cat' => V('p:cat', 902),
				'user_id' => XT_USER_ID,
				'addtime' => time()
			));
			DS('mgr/xintao/wow.saveTaokeItemCat', '', array (
				'nums' => $count +1
			), V('p:cat', 902));
			exit ('{"state":"200"}');
		}
		exit ('{"state":"202"}');
	}
	function deleteWowTaokeItem() {
		$num_iids = V('p:num_iids');
		if ($num_iids) {
			DS('mgr/xintao/wow.deleteTaokeItems', '', $num_iids);
			DS('mgr/xintao/wow.saveTaokeItemCat', '', array (
				'nums' => DS('mgr/xintao/wow.getTaokeItemsCount', '', V('p:cat', 902))
			), V('p:cat', 902));
		}
		exit ('{"state":"200"}');
	}
	/**
	 * 批量更新
	 */
	function updateTaokeItemCatSort() {
		$data = V('p:data');

		if (!is_array($data) || empty ($data)) {
			$this->_error('参数错误！', URL('mgr/xintao/wowMgr.itemCatList'));
		}

		foreach ($data as $id => $aSort) {
			$aSort['sortOrder'] = intval($aSort['sortOrder']);
			$aSort['isValid'] = isset ($aSort['isValid']) ? 1 : 0;
			DS('mgr/xintao/wow.saveTaokeItemCat', FALSE, $aSort, $id);
		}
		$this->_succ('更新成功！', URL('mgr/xintao/wowMgr.itemCatList'));
	}
	function synWowTaokeItemCat() {
		ignore_user_abort(); //即使Client断开(如关掉浏览器)，PHP脚本也可以继续执行
		set_time_limit(300); //设置总执行时间限制，预期不可超过5分钟
		F('taobao_cat.updateWowTaokeCat');
		F('wow.synWowDetails');
		exit ('{"state":"200"}');
	}
	function itemCatList() {
		$cats = array ();
		if (XT_IS_WEIBO == 'true' && XT_FREE_DATELINE == '') {
			$cats = DS('mgr/xintao/wow.getTaokeItemCat');
			if (empty ($cats)) { //新增
				$sortOrder = 0;
				for ($i = 902; $i < 908; $i++) {
					DS('mgr/xintao/wow.saveTaokeItemCat', '', array (
						'id' => $i,
						'title' => '',
						'sortOrder' => $sortOrder,
						'user_id' => XT_USER_ID,
						'nums' => 0
					));
					$sortOrder++;
				}
				$cats = DS('mgr/xintao/wow.getTaokeItemCat');
			}
		}
		TPL :: assign('list', $cats);
		$this->_display('xintao/wow/taokeItemCatList');
	}
}