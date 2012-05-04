<?php
require_once dirname(__FILE__) . '/component_abstract.pls.php';
/**
 * 商品详情
 * @author fxy060608
 * @version $Id: component_108.pls.php
 *
 */
class component_108_pls extends component_abstract_pls {

	function run($mod) {
		parent :: run($mod);
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
				$shops = explode(',', XT_SHOPS);
				$sids = explode(',', XT_SIDS);
				if (in_array('[' . $item['nick'] . ']', $shops)) { //如果是站内商品
					//站内商品，不需要转换淘宝客，但需查找商品的店铺SID
					$index = array_keys($shops, '[' . $item['nick'] . ']');
					if ($index && isset ($sids[$index[0]])) {

						$item['sid'] = str_replace(array (
							'[',
							']'
						), array (
							'',
							''
						), $sids[$index[0]]);
					}
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
						$items = F('top.taobaokeItemsConvert', 108, '商品详情', $numIid, 'click_url,shop_click_url,volume,seller_credit_score', true); //淘客
						if (!empty ($items)) {
							$detail = $items[0];
							if ($detail) {
								$item['click_url'] = $detail['click_url'];
								$item['shop_click_url'] = $detail['shop_click_url'];
								$item['seller_credit_score'] = $detail['seller_credit_score'];
								$item['volume'] = $detail['volume'];

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
		TPL :: module('xintao/item', array (
			'mod' => $mod,
			'cat' => $cat,
			'item' => $item,
			'items' => $items
		));

	}
}