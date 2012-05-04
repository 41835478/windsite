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

class item_mod {
	var $uInfo = false;

	function item_mod() {
		// Cunstructor Here
	}

	/**
	 * 商品
	 */
	function default_action() {
		$numIid = V('g:id');
		$item = array ();
		$items = array ();
		$cat = array ();
		if ($numIid) {
			$ret = F('top.itemGet', 108, '商品详情', array (
				'num_iid' => $numIid
			));
			if ($ret['rst']) {
				$item = $ret['rst']['item'];
				$item['click_url'] = '';
				$item['shop_click_url'] = '';
				$item['seller_credit_score'] = '';
				$item['volume'] = '';
				$item['sid'] = '';
				if ($item['cid']) {
					$cats = F('top.itemcatsGet', 108, '商品详情', $item['cid']);
					if ($cats) {
						$cat = $cats[0];
					}
				}
				if (F('xintao.isSiteShopByNick', $item['nick'])) { //如果是站内商品
					//站内商品，不需要转换淘宝客，但需查找商品的店铺SID
					$item['sid'] = F('xintao.getSiteSidByNick', $item['nick']);
					if ($cat) {
						$cat['url'] = URL('products', array (
							'cid' => $item['cid']
						));
					}
				} else { //淘客
					if (XT_IS_TAOKE == 'true') {
						if ($cat) {
							$cat['url'] = URL('items', array (
								'cid' => $item['cid']
							));
						}
						$ret = F('top.taobaokeItemsDetailGet', 108, '商品详情', array (
							'fields' => 'click_url,shop_click_url,seller_credit_score',
							'num_iids' => $numIid
						)); //淘客
						if ($ret['rst']) {
							if (($ret['rst']['total_results'] == 1)) {
								$items = $ret['rst']['taobaoke_item_details']['taobaoke_item_detail'];
								if ($items) {
									$detail = $items[0];
									$item['click_url'] = $detail['click_url'];
									$item['shop_click_url'] = $detail['shop_click_url'];
									$item['seller_credit_score'] = $detail['seller_credit_score'];
									$items = array (); //清空	
								}
							}
						}
						if (!$item['click_url']) { //非淘宝客商品，提供同类建议
							$params_ = array (
								'show_num' => 12
							);
							if ($item['cid']) {
								$params_['cid'] = $item['cid'];
								$rst = F('top.taobaokeItemsGet', 108, '商品详情', $params_);
								if ($rst) {
									$items = $rst['taobaoke_items']['taobaoke_item'];
								}
							}
						}
					} else { //无权限
						F('xintao.xintao_error', '当前站点需要订购淘客服务之后，才可以访问非站内店铺的推广商品！');
						exit;
					}
				}
			}
		}
		TPL :: assign('cat', $cat);
		TPL :: assign('item', $item);
		TPL :: assign('items', $items);
		TPL :: display('xintao/item');
	}
}