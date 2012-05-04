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
class wow_mod {

	function wow_mod() {

	}

	function default_action() {
		$sub = V('g:sub', '');
		if ($sub == '') {
			$sub = XT_DEF_SHARE_SUB;
		}
		switch (XT_DEF_SHARE_MOD) {
			case 'lady' :
				$this->lady($sub);
				break;
			case 'man' :
				$this->man($sub);
				break;
			case 'life' :
				$this->life($sub);
				break;
			case 'idea' :
				$this->idea($sub);
				break;
			case 'shop' :
				$this->shop($sub);
				break;
			case 'item' :
				$this->item($sub);
				break;
		}

	}
	function item($sub = 0) {
		$sub = V('g:sub', $sub);
		$page = V('g:page_no', 1);
		$result = TB('xintao/wow.getWowTaokeItemList', ('g0/' . CACHE_24), $sub, ($page -1) * 40, 40);
		TPL :: assign('items', $result['items']);
		TPL :: assign('total_results', $result['count']);
		TPL :: assign('page', $page);
		TPL :: assign('cat', 'item');
		TPL :: assign('catName', '最In推荐');
		TPL :: assign('subs', F('wow.wowTaokeItemCats'));
		TPL :: assign('sub', $sub == 0 ? '' : $sub);
		TPL :: assign('subName', $sub == 0 ? '' : F('wow.wowTaokeItemCatName', $sub));
		TPL :: display('xintao/shareShopItems');
	}
	function shop($sub = 0) {
		$sub = V('g:sub', $sub);
		$page = V('g:page_no', 1);
		$subName = '';
		if ($sub > 0) { //商品集合
			$rs = TB('xintao/wow.getWowShop', ('g0/' . CACHE_24), $sub);
			if (empty ($rs['rst'])) { //如果店铺不满足，则跳转到店铺列表
				header("Location:http://" . XT_SITE_DOMAIN . "/wow.shop");
				exit;
			}
			$rs = $rs['rst'];
			$result = TB('xintao/wow.getWowUserItems', ('g0/' . CACHE_24), $sub, ($page -1) * 40, 40);
			TPL :: assign('items', $result['items']);
			TPL :: assign('total_results', $result['count']);
			TPL :: assign('page', $page);
			TPL :: assign('cat', 'shop');
			TPL :: assign('catName', '合作商家');
			TPL :: assign('subs', array (
				$sub => array (
					'title' => $rs['title'],
					'ico' => ''
				)
			));
			TPL :: assign('sub', $sub);
			TPL :: assign('subName', $rs['title']);
			TPL :: display('xintao/shareShopItems');
		} else { //店铺集合
			$result = TB('xintao/wow.getWowShops', ('g0/' . CACHE_1));
			TPL :: assign('items', $result['rst']);
			TPL :: assign('page', $page);
			TPL :: assign('cat', 'shop');
			TPL :: assign('catName', '合作商家');
			TPL :: assign('subs', array ());
			TPL :: assign('sub', $sub == 0 ? '' : $sub);
			TPL :: assign('subName', $subName);
			TPL :: display('xintao/shareShop');
		}

	}
	function lady($sub = 0) {
		$sub = V('g:sub', $sub);
		$page = V('g:page_no', 1);
		$result = TB('xintao/wow.getWowTaokeItem', ('g0/' . CACHE_24), 1, $sub, 40, ($page -1) * 40);
		TPL :: assign('items', $result['items']);
		TPL :: assign('total_results', $result['count']);
		TPL :: assign('page', $page);
		TPL :: assign('cat', 'lady');
		TPL :: assign('catName', '女人');
		TPL :: assign('subs', V('-:wow/1/sub'));
		TPL :: assign('sub', $sub == 0 ? '' : $sub);
		TPL :: assign('subName', $sub == 0 ? '' : V('-:wow/1/sub/' . $sub . '/title', ''));
		TPL :: display('xintao/share');
	}
	function man($sub = 0) {
		$sub = V('g:sub', $sub);
		$page = V('g:page_no', 1);
		$result = TB('xintao/wow.getWowTaokeItem', ('g0/' . CACHE_24), 2, $sub, 40, ($page -1) * 40);
		TPL :: assign('items', $result['items']);
		TPL :: assign('total_results', $result['count']);
		TPL :: assign('page', $page);
		TPL :: assign('cat', 'man');
		TPL :: assign('catName', '男人');
		TPL :: assign('subs', V('-:wow/2/sub'));
		TPL :: assign('sub', $sub == 0 ? '' : $sub);
		TPL :: assign('subName', $sub == 0 ? '' : V('-:wow/2/sub/' . $sub . '/title', ''));
		TPL :: display('xintao/share');
	}
	function life($sub = 0) {
		$sub = V('g:sub', $sub);
		$page = V('g:page_no', 1);
		$result = TB('xintao/wow.getWowTaokeItem', ('g0/' . CACHE_24), 3, $sub, 40, ($page -1) * 40);
		TPL :: assign('items', $result['items']);
		TPL :: assign('total_results', $result['count']);
		TPL :: assign('page', $page);
		TPL :: assign('cat', 'life');
		TPL :: assign('catName', '生活');
		TPL :: assign('subs', V('-:wow/3/sub'));
		TPL :: assign('sub', $sub == 0 ? '' : $sub);
		TPL :: assign('subName', $sub == 0 ? '' : V('-:wow/3/sub/' . $sub . '/title', ''));
		TPL :: display('xintao/share');
	}
	function idea($sub = 0) {
		$sub = V('g:sub', $sub);
		$page = V('g:page_no', 1);
		$result = TB('xintao/wow.getWowTaokeItem', ('g0/' . CACHE_24), 4, $sub, 40, ($page -1) * 40);
		TPL :: assign('items', $result['items']);
		TPL :: assign('total_results', $result['count']);
		TPL :: assign('page', $page);
		TPL :: assign('cat', 'idea');
		TPL :: assign('catName', '创意');
		TPL :: assign('subs', V('-:wow/4/sub'));
		TPL :: assign('sub', $sub == 0 ? '' : $sub);
		TPL :: assign('subName', $sub == 0 ? '' : V('-:wow/4/sub/' . $sub . '/title', ''));
		TPL :: display('xintao/share');
	}

}