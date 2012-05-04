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
require_once dirname(__FILE__) . '/../function/PiwikTracker.php';
PiwikTracker :: $URL = 'http://track.xintaowang.com/';
class go_mod {

	function go_mod() {

	}

	function default_action() {
		Xpipe :: usePipe(false);
		$sid = V('g:sid', -1);
		$nid = V('g:nid', -1);
		$numiid = V('g:numiid', -1);
		$shopid = V('g:shopid', -1);
		$shopnick = V('g:shopnick', '');
		$cid = V('g:cid', '');
		$q = V('g:q', '');
		if (!empty ($shopnick) && $sid <= 0) { //店铺卖家昵称
			$shop = F('top.shopGet', -999, '店铺详情', array (
				'nick' => $shopnick
			), true);
			if ($shop) {
				$sid = $shop['sid'];
			}
		}
		if (!empty ($cid) && $cid > 0) {
			$clickurl = F('top.taobaokeCaturlGet', -999, '未知模块', array (
				'cid' => $cid
			), true, false);
			if (XT_IS_WEIBO == 'true' && XT_PIWIK_ID != '') {
				//				$piwikTracker = new PiwikTracker(XT_PIWIK_ID);
				//				$piwikTracker->setTokenAuth(XT_PIWIK_TOKEN);
				//				$piwikTracker->setIp(F('get_client_ip'));
				//				if ($_SERVER['HTTP_REFERER'])
				//					$piwikTracker->setUrlReferrer($_SERVER['HTTP_REFERER']);
				//				$piwikTracker->setUrl($url = 'http://' . XT_SITE_DOMAIN . '/go/cid-' . $cid);
				//				$piwikTracker->doTrackPageView('有效推广：淘宝分类[' . $cid . ']');
			}
			if (!empty ($clickurl)) {
				header('Location:' . $clickurl);
			} else {
				header('Location:http://s.click.taobao.com/t_9?p=' . XT_USER_PID . '&l=http%3A%2F%2Fmall.taobao.com%2F&eventid=101766');
			}
		}
		if (!empty ($q)) {
			$clickurl = F('top.taobaokelisturlGet', -999, '未知模块', $q, true, false);
			if (XT_IS_WEIBO == 'true' && XT_PIWIK_ID != '') {
				//				$piwikTracker = new PiwikTracker(XT_PIWIK_ID);
				//				$piwikTracker->setTokenAuth(XT_PIWIK_TOKEN);
				//				$piwikTracker->setIp(F('get_client_ip'));
				//				if ($_SERVER['HTTP_REFERER'])
				//					$piwikTracker->setUrlReferrer($_SERVER['HTTP_REFERER']);
				//				$piwikTracker->setUrl($url = 'http://' . XT_SITE_DOMAIN . '/go/q-' . $q);
				//				$piwikTracker->doTrackPageView('有效推广：' . $q);
			}
			if (!empty ($clickurl)) {
				header('Location:' . $clickurl);
			} else {
				header('Location:http://s.click.taobao.com/t_9?p=' . XT_USER_PID . '&l=http%3A%2F%2Fmall.taobao.com%2F&eventid=101766');
			}

		}
		if ($sid != -1 && $sid > 0) { //淘客店铺
			$shop = array ();
			$click_url = "http://shop" . $sid . ".taobao.com";
			if (APP :: F('is_mobile') === false) {
				$taokeShops = F('top.taobaokeShopsConvert', -999, '未知模块', array (
					'sids' => $sid
				), true, false);
				if (!empty ($taokeShops) && count($taokeShops) == 1) {
					$shop = $taokeShops[0];
					$click_url = $shop['click_url'];
					if ($_SERVER['SERVER_NAME'] != 'www.xintaotv.com' && XT_IS_WEIBO == 'true' && XT_PIWIK_ID != '') {
						//						$piwikTracker = new PiwikTracker(XT_PIWIK_ID);
						//						$piwikTracker->setTokenAuth(XT_PIWIK_TOKEN);
						//						$piwikTracker->setIp(F('get_client_ip'));
						//						if ($_SERVER['HTTP_REFERER'])
						//							$piwikTracker->setUrlReferrer($_SERVER['HTTP_REFERER']);
						//						$piwikTracker->setUrl($url = 'http://' . XT_SITE_DOMAIN . '/go/sid-' . $sid);
						//						$piwikTracker->doTrackPageView('有效推广：' . $shop['shop_title']);
					}
				}
			}
			if ($_SERVER['SERVER_NAME'] == 'www.xintaotv.com') {
				header('Location:' . $click_url);
				exit;
			}
			TPL :: assign('shop', $shop);
			TPL :: assign('click_url', $click_url);
			TPL :: display('xintao/goShop');
		}
		elseif ($shopid != -1 && $shopid > 0) { //普通店铺
			$shop = array ();
			$click_url = "http://shop" . $shopid . ".taobao.com";
			TPL :: assign('shop', $shop);
			TPL :: assign('click_url', $click_url);
			TPL :: display('xintao/goShop');
		}
		elseif ($nid != -1 && $nid > 0) { //淘客商品
			$item = array ();
			$click_url = "http://item.taobao.com/item.htm?id=" . $nid;
			if (APP :: F('is_mobile') === false) {
				$ret = F('top.taobaokeItemsDetailGet', 108, '商品详情', array (
					'fields' => 'num_iid,title,nick,price,click_url,shop_click_url,seller_credit_score',
					'num_iids' => $nid
				), false); //淘客
				if ($ret['rst']) {
					if (($ret['rst']['total_results'] == 1)) {
						$items = $ret['rst']['taobaoke_item_details']['taobaoke_item_detail'];
						if ($items) {
							$detail = $items[0];
							$item = $detail['item'];
							//print_r($detail);
							//print_r($item);
							if (!empty ($detail['click_url'])) {
								$click_url = $detail['click_url'];
							}
							if (XT_IS_WEIBO == 'true' && XT_PIWIK_ID != '') {
								//							$piwikTracker = new PiwikTracker(XT_PIWIK_ID);
								//							$piwikTracker->setTokenAuth(XT_PIWIK_TOKEN);
								//							$piwikTracker->setIp(F('get_client_ip'));
								//							if ($_SERVER['HTTP_REFERER'])
								//								$piwikTracker->setUrlReferrer($_SERVER['HTTP_REFERER']);
								//							$piwikTracker->setUrl($url = 'http://' . XT_SITE_DOMAIN . '/go/nid-' . $nid);
								//							$piwikTracker->doTrackPageView('有效推广：' . $item['title'] . '[' . $item['price'] . ']');
							}
						}
					}
				}
			}
			TPL :: assign('numiid', $nid);
			TPL :: assign('item', $item);
			TPL :: assign('click_url', $click_url);
			TPL :: display('xintao/goItem');
		}
		elseif ($numiid != -1 && $numiid > 0) { //普通商品
			$click_url = "http://item.taobao.com/item.htm?id=" . $numiid;
			TPL :: assign('numiid', $numiid);
			TPL :: assign('item', array ());
			TPL :: assign('click_url', $click_url);
			TPL :: display('xintao/goItem');
		}
	}
}