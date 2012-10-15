<?php


/**
 * 通用：商品(0,1,2,3,[4,5,8],9,10,11)店铺(6,[7])中括号内为卖家服务的商品或店铺推广(即非自己)
 * 笑话：笑话(100-200,免费的100,101)，画报(200-300)，影视(300-400)，淘客商品(500-600,免费的500,501)
 */
function autoCron($index = -1) {
	$weibo = array ();
	$xiaohuaChecked = array ();
	$posterChecked = array ();
	$tvChecked = array ();
	$shareChecked = array ();
	$yingxiao = DS('mgr/xintao/cronCom.getYingxiao', '', XT_USER_ID);
	initYingxiao($yingxiao);
	if (!empty ($yingxiao)) { //存在，则取出配置
		$metadata = $yingxiao['metadata'];
		if (!empty ($metadata)) {
			$metadata = json_decode($yingxiao['metadata'], true);
			if (isset ($metadata['xiaohua'])) {
				$xiaohuaChecked = $metadata['xiaohua'];
			}
			if (XT_IS_WEIBO == 'true' && XT_FREE_DATELINE == '' && isset ($metadata['poster'])) {
				$posterChecked = $metadata['poster'];
			}
			if (XT_IS_WEIBO == 'true' && XT_FREE_DATELINE == '' && isset ($metadata['tv'])) {
				$tvChecked = $metadata['tv'];
			}
			if (XT_IS_WEIBO == 'true' && XT_FREE_DATELINE == '' && isset ($metadata['share'])) {
				$shareChecked = $metadata['share'];
			}
		}
	}
	if (empty ($xiaohuaChecked) && empty ($posterChecked) && empty ($tvChecked) && empty ($shareChecked)) { //如果均未设置，则返回
		return;
	}
	$WEIBO_TYPE = '';
	if ($index == -1) {
		return;
	}
	elseif (in_array($index, array (
		6,
		7
	))) { //店铺
		if (XT_USER_NICK == 'jping2')
			exit ('jping2 no shop');
		//exit;
		$isYXSelf = true;
		if (XT_IS_SELLER == 'true') {
			$isYXSelf = true;
		} else {
			$isYXSelf = ($index == 6 ? true : false);
		}
		$weibo = autoCronUserShop($isYXSelf);
		$WEIBO_TYPE = 'SHOP';
	}
	elseif ($index < 12 && $index >= 0) { //商品
		$isYXSelf = true;
		if (XT_IS_SELLER == 'true') {
			$isYXSelf = true;
		} else {
			$isYXSelf = (in_array($index, array (
				4,
				5,
				8
			)) ? false : true);
		}
		$weibo = autoCronUserItem($isYXSelf);
		$WEIBO_TYPE = 'ITEM';
	}
	elseif ($index >= 500) { //淘客商品
		$weibo = autoCronTaokeItem();
		$WEIBO_TYPE = 'TAOKE_ITEM';
	}
	elseif (XT_IS_WEIBO == 'true' && XT_FREE_DATELINE == '' && $index >= 400) { //分享
		if (!empty ($shareChecked)) {
			$weibo = autoCronShare($shareChecked, $index);
			$WEIBO_TYPE = 'SHARE';
		}
	}
	elseif (XT_IS_WEIBO == 'true' && XT_FREE_DATELINE == '' && $index >= 300) { //影视
		if (!empty ($tvChecked)) {
			$weibo = autoCronTv($tvChecked, $index);
			$WEIBO_TYPE = 'TV';
		}
	}
	elseif (XT_IS_WEIBO == 'true' && XT_FREE_DATELINE == '' && $index >= 200) { //画报
		if (!empty ($posterChecked)) {
			$weibo = autoCronPoster($posterChecked, $index);
			$WEIBO_TYPE = 'POSTER';
		}
	}
	elseif ($index >= 100) { //笑话
		if (!empty ($xiaohuaChecked)) {
			$weibo = autoCronXiaohua($xiaohuaChecked, $index);
			$WEIBO_TYPE = 'XIAOHUA';
		}
	} else {
		return;
	}
	print_r($weibo);
	if (!empty ($weibo)) {
		if ($WEIBO_TYPE == 'SHOP') { //店铺
			if (!empty ($weibo['user_id']) && !empty ($weibo['text'])) {
				sinaWeibo($WEIBO_TYPE, $weibo['sid'] . '-' . $weibo['user_id'], XT_USER_ID, WB_AKEY, WB_SKEY, V2_ACCESS_TOKEN, V2_REFRESH_TOKEN, $weibo['text'], $weibo['pic_url'], $weibo);
			}
		}
		elseif ($WEIBO_TYPE == 'ITEM') { //商品
			if (!empty ($weibo['user_id']) && !empty ($weibo['text'])) {
				sinaWeibo($WEIBO_TYPE, $weibo['nid'] . '-' . $weibo['user_id'], XT_USER_ID, WB_AKEY, WB_SKEY, V2_ACCESS_TOKEN, V2_REFRESH_TOKEN, $weibo['text'], $weibo['pic_url'], $weibo);
			}
		}
		elseif ($WEIBO_TYPE == 'TAOKE_ITEM') { //淘客商品
			if (!empty ($weibo['user_id']) && !empty ($weibo['text'])) {
				sinaWeibo($WEIBO_TYPE, $weibo['nid'], XT_USER_ID, WB_AKEY, WB_SKEY, V2_ACCESS_TOKEN, V2_REFRESH_TOKEN, $weibo['text'], $weibo['pic_url'], $weibo);
			}
		}
		elseif ($WEIBO_TYPE == 'SHARE') { //分享
			if (!empty ($weibo['id']) && !empty ($weibo['text'])) {
				sinaWeibo($WEIBO_TYPE, $weibo['id'], XT_USER_ID, WB_AKEY, WB_SKEY, V2_ACCESS_TOKEN, V2_REFRESH_TOKEN, $weibo['text'], $weibo['pic_url'], $weibo);
			}
		} else { //其他
			if (isset ($weibo['id']) && !empty ($weibo['id']) && !empty ($weibo['text'])) {
				//自动营销
				sinaWeibo($WEIBO_TYPE, $weibo['id'], XT_USER_ID, WB_AKEY, WB_SKEY, V2_ACCESS_TOKEN, V2_REFRESH_TOKEN, $weibo['text'], $weibo['pic_url']);
			}
		}
	}

}

function initYingxiao($yingxiao = array ()) {
	if (empty ($yingxiao)) { //不存在，则自动生成
		$xhS = V('-:xiaohua');
		$xhR = array_rand($xhS, 5);
		//5个笑话随机分类
		$xiaohua = array (
			$xhS[$xhR[0]]['id'],
			$xhS[$xhR[1]]['id'],
			$xhS[$xhR[2]]['id'],
			$xhS[$xhR[3]]['id'],
			$xhS[$xhR[4]]['id']
		);
		$poster = array ();
		$tv = array ();
		$taoke = array ();
		$crons = array (
			'xiaohua' => 2,
			'poster' => 0,
			'tv' => 0,
			'taokeItem' => 2
		);
		if (XT_IS_WEIBO == 'true' && XT_FREE_DATELINE == '') { //正是订购用户
			$pS = V('-:poster');
			$tvS = V('-:sotv');
			$pR = array_rand($pS, 5);
			$tvR = array_rand($tvS, 5);
			//5个画报随机
			$poster = array (
				$pS[$pR[0]]['id'],
				$pS[$pR[1]]['id'],
				$pS[$pR[2]]['id'],
				$pS[$pR[3]]['id'],
				$pS[$pR[4]]['id']
			);
			//5个视频随机
			$tv = array (
				$tvS[$tvR[0]]['id'],
				$tvS[$tvR[1]]['id'],
				$tvS[$tvR[2]]['id'],
				$tvS[$tvR[3]]['id'],
				$tvS[$tvR[4]]['id']
			);
			$crons['taokeItem'] = 8;
			$crons['xiaohua'] = 8;
			$crons['poster'] = 8;
			$crons['tv'] = 8;
		}
		$taoke = array (
			'shop',
			'item'
		);
		DS('mgr/xintao/cronCom.saveYingxiao', '', array (
			'user_id' => XT_USER_ID,
			'metadata' => json_encode(array (
				'xiaohua' => $xiaohua,
				'poster' => $poster,
				'tv' => $tv,
				'taoke' => $taoke
			)),
			'crons' => json_encode($crons)
		));
	} else {
		if (empty ($yingxiao['crons'])) {
			$crons = array (
				'xiaohua' => 2,
				'poster' => 0,
				'tv' => 0,
				'taokeItem' => 2
			);
			if (XT_IS_WEIBO == 'true' && XT_FREE_DATELINE == '') { //正是订购用户
				$crons['taokeItem'] = 8;
				$crons['xiaohua'] = 8;
				$crons['poster'] = 8;
				$crons['tv'] = 8;
			}
			DS('mgr/xintao/cronCom.saveYingxiao', '', array (
				'crons' => json_encode($crons)
			), XT_USER_ID);
		}
	}
}
function testAutoCronUserShop() {
	$weibo = autoCronUserShop();
	print_r($weibo);
	if (!empty ($weibo['user_id']) && !empty ($weibo['text'])) {
		sinaWeibo('SHOP', $weibo['sid'], XT_USER_ID, WB_AKEY, WB_SKEY, V2_ACCESS_TOKEN, V2_REFRESH_TOKEN, $weibo['text'], $weibo['pic_url']);
	}
}
function autoCronTaokeItem() {
	$user_id = '';
	$nid = '';
	$nick = '';
	$text = '';
	$pic_url = '';
	$item = array ();
	$item = DS('xintao/taokeItem.getItem');
	if (empty ($item)) {
		return array ();
	}
	if (!empty ($item)) {
		$user_id = $item['user_id'];
		$nid = $item['nid'];
		$nick = $item['nick'];
		$link = 'http://' . XT_DEFAULT_DOMAIN . '/go/nid-' . $nid . '?v=' . rand(); //淘客商品
		$WEIBO_TOPIC = APP :: N('tools/mstring')->randString(6);
		//		try {
		//			DR('xweibo/xwb.setToken', '', 2);
		//			$hours = DR('xweibo/xwb.getTrendsHourly', 'g2/300', false, 0);
		//			if ($hours['errno'] != 0) {
		//				$hours['rst']['trends'] = array ();
		//			}
		//			$TOPICS = current($hours['rst']['trends']);
		//			if (!empty ($TOPICS)) {
		//				$WEIBO_TOPIC = $TOPICS[array_rand($TOPICS, 1)]['name'];
		//			}
		//		} catch (Exception $e) {
		//
		//		}
		$text = str_replace(array (
			'DATE',
			'TITLE',
			'PRICE',
			'NICKNAME',
			'LINK'
		), array (
			date('Y-m-d'),
			$item['title'],
			$item['price'],
			'',
			$link
		), 'DATE' . ':TITLE,￥PRICE元,详情:LINKNICKNAME' . ($WEIBO_TOPIC != '' ? ('。' . $WEIBO_TOPIC . '') : ''));
		$pic_url = !empty ($item['pic_url']) ? $item['pic_url'] : '';
	}
	return array (
		'user_id' => $user_id,
		'nid' => $nid,
		'nick' => $nick,
		'text' => $text,
		'pic_url' => $pic_url
	);
}
/**
 * 商品营销
 */
function autoCronUserItem($isSelf) {
	$user_id = '';
	$nid = '';
	$nick = '';
	$text = '';
	$pic_url = '';
	$nickname = '';
	$qq_nickname = '';
	$sh_nickname = '';
	$wy_nickname = '';
	$item = array ();
	if (XT_IS_SELLER != 'true' && XT_IS_TAOKE == 'true') { //如果是淘客服务
		$isSelf = false;
	}
	if ($isSelf) { //如果是自己
		if (XT_SID != '') { //如果是卖家且位于0，1，2，则推广自己的商品
			$item = DS('xintao/userItem.getByUserId', '', XT_USER_ID);
		}
	}
	if (empty ($item)) {
		$item = _getRandomItem();
	}

	if (!empty ($item)) {
		$user_id = $item['user_id'];
		$nid = $item['nid'];
		$nick = $item['nick'];
		$link = 'http://' . XT_DEFAULT_DOMAIN . '/go/nid-' . $nid . '?v=' . rand(); //淘客商品
		if (!empty ($item['nickname'])) {
			$nickname = '，@' . $item['nickname'];
		}
		if (!empty ($item['qq_nickname'])) {
			$qq_nickname = '，@' . $item['qq_nickname'];
		}
		if (!empty ($item['sh_nickname'])) {
			$sh_nickname = '，@' . $item['sh_nickname'];
		}
		if (!empty ($item['wy_nickname'])) {
			$wy_nickname = '，@' . $item['wy_nickname'];
		}
		$WEIBO_TOPIC = APP :: N('tools/mstring')->randString(6);
		;
		//		try {
		//			DR('xweibo/xwb.setToken', '', 2);
		//			$hours = DR('xweibo/xwb.getTrendsHourly', 'g2/300', false, 0);
		//			if ($hours['errno'] != 0) {
		//				$hours['rst']['trends'] = array ();
		//			}
		//			$TOPICS = current($hours['rst']['trends']);
		//			if (!empty ($TOPICS)) {
		//				$WEIBO_TOPIC = $TOPICS[array_rand($TOPICS, 1)]['name'];
		//			}
		//		} catch (Exception $e) {
		//
		//		}

		$text = str_replace(array (
			'DATE',
			'TITLE',
			'PRICE',
			'NICKNAME',
			'LINK'
		), array (
			date('Y-m-d'),
			$item['title'],
			$item['price'],
			$nickname,
			$link
		), 'DATE' . ':TITLE,￥PRICE元,详情:LINKNICKNAME。(' . F('wkey', $user_id) . ')' . ($WEIBO_TOPIC != '' ? (',' . $WEIBO_TOPIC . '') : ''));
		$pic_url = !empty ($item['pic_url']) ? $item['pic_url'] : '';
	}
	return array (
		'user_id' => $user_id,
		'nid' => $nid,
		'nick' => $nick,
		'text' => $text,
		'pic_url' => $pic_url,
		'sina' => $nickname,
		'qq' => $qq_nickname,
		'sh' => $sh_nickname,
		'wy' => $wy_nickname
	);
}
function _getRandomItem() {
	$item = array ();
	$shop = DS('xintao/userShop.getItemBySellerAndUrl'); //获得排序后的要推广的店铺
	if (!empty ($shop)) { //如果要推广的店铺存在，则查找该店铺下的排序商品
		$item = DS('xintao/userItem.getItemBySellerAndUrl', '', $shop['user_id']);
		if (empty ($item)) { //如果当前站长没有挑选商品，也自动加1
			DS('mgr/xintao/cronCom.updateYingxiaoItemNums', '', $shop['user_id']); //递加每日商品营销数量
		}
	}
	if (empty ($item)) { //如果为空再尝试两次
		$item = DS('xintao/userItem.getRandomItem');
		if (empty ($item)) {
			$item = DS('xintao/userItem.getRandomItem');
		}
	}
	return $item;
}
/**
 * 店铺营销
 */
function autoCronUserShop($isSelf) {
	$shop = array ();
	$isTaoke = true;
	if (XT_IS_SELLER != 'true' && XT_IS_TAOKE == 'true') { //如果是淘客服务
		$isSelf = false;
	}
	if ($isSelf) { //如果是自己
		if (XT_SID != '') {
			$shops = DS('xintao/userShop.getByUserId', '', XT_USER_ID);
			if (!empty ($shops)) {
				$shop = $shops[array_rand($shops, 1)]; //随机取一个
				print_r($shop);
				if (!empty ($shop))
					$isTaoke = false;
			}
		}
	}
	if (empty ($shop)) {
		$shop = DS('xintao/userShop.getShopBySellerAndUrl');
	}
	$user_id = '';
	$sid = '';
	$nick = '';
	$text = '';
	$pic_url = '';
	$nickname = '';
	$qq_nickname = '';
	$sh_nickname = '';
	$wy_nickname = '';
	if (!empty ($shop)) {
		$user_id = $shop['user_id'];
		$sid = $shop['sid'];
		$nick = $shop['nick'];
		if (!empty ($shop['pic_path'])) {
			$pic_url = 'http://logo.taobao.com/shop-logo' . $shop['pic_path'];
		}
		$nickname = '';
		if (!empty ($shop['nickname'])) {
			$nickname = '，@' . $shop['nickname'];
		}
		if (!empty ($item['qq_nickname'])) {
			$qq_nickname = '，@' . $item['qq_nickname'];
		}
		if (!empty ($item['sh_nickname'])) {
			$sh_nickname = '，@' . $item['sh_nickname'];
		}
		if (!empty ($item['wy_nickname'])) {
			$wy_nickname = '，@' . $item['wy_nickname'];
		}
		$remark = '';
		if (!empty ($shop['remark'])) {
			$remark = $shop['remark'] . '，';
		}
		$WEIBO_TOPIC = APP :: N('tools/mstring')->randString(6);
		;
		//		try {
		//			DR('xweibo/xwb.setToken', '', 2);
		//			$hours = DR('xweibo/xwb.getTrendsHourly', 'g2/300', false, 0);
		//			if ($hours['errno'] != 0) {
		//				$hours['rst']['trends'] = array ();
		//			}
		//			$TOPICS = current($hours['rst']['trends']);
		//			if (!empty ($TOPICS)) {
		//				$WEIBO_TOPIC = $TOPICS[array_rand($TOPICS, 1)]['name'];
		//			}
		//		} catch (Exception $e) {
		//
		//		}
		$text = str_replace(array (
			'DATE',
			'TITLE',
			'NICKNAME',
			'LINK',
			'REMARK'
		), array (
			date('Y-m-d'),
			$shop['title'] . '，',
			$nickname,
			'http://' . XT_DEFAULT_DOMAIN . '/go/sid-' . $shop['sid'] . '?v=' . rand(),
			$remark
		), 'DATE' . ':TITLEREMARK详情:LINKNICKNAME。(' . F('wkey', $user_id) . ')' . ($WEIBO_TOPIC != '' ? (',' . $WEIBO_TOPIC . '') : ''));

	}
	return array (
		'user_id' => $user_id,
		'sid' => $sid,
		'nick' => $nick,
		'text' => $text,
		'pic_url' => $pic_url,
		'sina' => $nickname,
		'qq' => $qq_nickname,
		'sh' => $sh_nickname,
		'wy' => $wy_nickname
	);
}
/**
 * 发布一条随机商品分享微博
 */
function autoCronShare($checked, $index = 0) {
	$text = '';
	$pic_url = '';
	//取出一条随机微博
	$cat = array_rand($checked, 1);
	$share = DS('xintao/wow.getRandomShare', '', $cat, implode(',', $checked[$cat]));
	$id = '';
	if (!empty ($share)) {
		//准备要发布的微博
		$cName = '';
		$channel1 = V('-:wow/' . $cat . '/title');
		$channel2 = V('-:wow/' . $cat . '/sub/' . $share['cat'] . '/title');
		if (!empty ($channel1) && !empty ($channel2)) {
			$cName = '#' . $channel1 . $channel2 . '# ';
		}
		$id = $share['nid'];

		$SHARE_WEIBO = 'DATE' . (!empty ($cName) ? ($cName . '会员分享') : '#会员分享#') . ':【ARCHIVE】购买后说:WEIBO,详情:LINK。';
		//默认笑话链接
		$link = 'http://' . XT_DEFAULT_DOMAIN . URL('go', array (
			'nid' => $id . '?v=' . rand()
		));
		$text = str_replace(array (
			'DATE',
			'ARCHIVE',
			'TITLE',
			'PRICE',
			'WEIBO',
			'LINK'
		), array (
			date('Y-m-d'),
			$share['archive'],
			$share['title'],
			$share['price'],
			$share['weibo'],
			$link
		), $SHARE_WEIBO);
		$pic_url = !empty ($share['pic_url']) ? $share['pic_url'] : '';
	}
	return array (
		'id' => $id,
		'text' => $text,
		'pic_url' => $pic_url,
		'cat' => $cat
	);
}
/**
 * 发布一条随机笑话微博
 */
function autoCronXiaohua($checked, $index = 0) {
	$text = '';
	//取出一条随机微博
	$xiaohua = DS('mgr/xintao/cronCom.getRandomXiaohua', '', $checked, XT_IS_WEIBO == 'true' ? false : true);
	$id = '';
	if (!empty ($xiaohua)) {
		//准备要发布的微博
		$cName = '';
		$channel = V('-:xiaohua/' . $xiaohua['type']);
		if (!empty ($channel)) {
			$cName = '#' . $channel['title'] . '# ：';
		}
		$id = $xiaohua['id'];
		$xiaohua['content'] = str_replace_limit($xiaohua['title'], '', $xiaohua['content'], 1);
		if (XT_IS_WEIBO == 'true') { //增值服务微博
			$XIAOHUA_WEIBO = 'TOPIC【TITLE】:CONTENT...,更多内容:LINK';
			//默认笑话链接
			$link = 'http://' . XT_SITE_DOMAIN . URL('xiaohua', array (
				'id' => $xiaohua['id']
			));
			if ($xiaohua['cSize'] <= 300 && XT_SID != '') { //如果笑话内容小于300，且当前用户有店铺，则变为店铺链接
				if (XT_IS_SELLER == 'false' && XT_IS_TAOKE == 'true') { //非淘客服务
				} else {
					$link = ('http://shop' . XT_SID . '.taobao.com?v=' . rand());
				}
			}
			$text = str_replace(array (
				'TOPIC',
				'TITLE',
				'CONTENT',
				'LINK'
			), array (
				$cName,
				$xiaohua['title'],
				$xiaohua['cSize'] > 300 ? F('tv.utf8Substr', $xiaohua['content'], 0, 100) : $xiaohua['content'],
				$link
			), $XIAOHUA_WEIBO);
		} else { //非增值服务微博
			$XIAOHUA_WEIBO = 'TOPIC【TITLE】:CONTENT';
			$text = str_replace(array (
				'TOPIC',
				'TITLE',
				'CONTENT'
			), array (
				$cName,
				$xiaohua['title'],
				$xiaohua['content'] . (((XT_SID != '' && rand(10, 100) % 2 == 0)) ? ('http://shop' . XT_SID . '.taobao.com?v=' . rand()) : '')
			), $XIAOHUA_WEIBO);
		}
	}
	return array (
		'id' => $id,
		'text' => $text,
		'pic_url' => ''
	);
}
/**
 * 发布一条随机画报微博
 */
function autoCronPoster($checked, $index = 0) {
	$weibo = array ();
	//取出一条随机微博
	$poster = DS('mgr/xintao/cronCom.getRandomPoster', '', $checked);
	if (!empty ($poster)) {
		//准备要发布的微博
		if (XT_IS_WEIBO == 'true') { //增值服务微博
			$cName = '';
			$channel = V('-:poster/' . $poster['channel_id']);
			if (!empty ($channel)) {
				$cName = '#' . $channel['title'] . '# ：';
			}
			$WEIBO_TOPIC = '';
			//			try {
			//				DR('xweibo/xwb.setToken', '', 2);
			//				$hours = DR('xweibo/xwb.getTrendsHourly', 'g2/300', false, 0);
			//				if ($hours['errno'] != 0) {
			//					$hours['rst']['trends'] = array ();
			//				}
			//				$TOPICS = current($hours['rst']['trends']);
			//				if (!empty ($TOPICS)) {
			//					$WEIBO_TOPIC = $TOPICS[array_rand($TOPICS, 1)]['name'];
			//				}
			//			} catch (Exception $e) {
			//
			//			}
			$weibo['id'] = $poster['id'];
			$XIAOHUA_WEIBO = 'TOPIC【TITLE】,详情:LINK' . ($WEIBO_TOPIC != '' ? ('。#' . $WEIBO_TOPIC . '#') : '');
			$weibo['text'] = str_replace(array (
				'TOPIC',
				'TITLE',
				'LINK'
			), array (
				$cName,
				$poster['title'],
				'http://' . XT_SITE_DOMAIN . URL('poster', array (
					'id' => $poster['id']
				))
			), $XIAOHUA_WEIBO);
			if (isset ($poster['cover_pic_url']) && !empty ($poster['cover_pic_url'])) {
				$covers = explode(',', $poster['cover_pic_url']);
				if (count($covers) >= 2) {
					$weibo['pic_url'] = $covers[1];
				}
				elseif (count($covers) == 1) {
					$weibo['pic_url'] = $covers[0];
				} else {
					$weibo['pic_url'] = '';
				}
			} else {
				$weibo['pic_url'] = '';
			}
		}
	}
	return $weibo;
}
/**
 * 发布一条随机视频微博
 */
function autoCronTv($checked, $index = 0) {
	$weibo = array ();
	//取出一条随机微博
	$tv = DS('mgr/xintao/cronCom.getRandomTv', '', $checked);
	if (!empty ($tv)) {
		//准备要发布的微博
		if (XT_IS_WEIBO == 'true') { //增值服务微博
			//需要根据不同频道发布不同内容，如：电影正片，电视剧正片，动漫，综艺，音乐带#话题#内容：
			$sotv = V('-:sotv/' . $tv['cat']);
			if (!empty ($sotv)) {
				$XIAOHUA_WEIBO = 'TOPICTITLE:DESC，详情:LINK';
				//话题
				$topic = '';
				//标题
				$title = $tv['tv_name'];
				//描述
				$desc = (isset ($tv['tv_desc']) && !empty ($tv['tv_desc'])) ? (F('tv.utf8Substr', $tv['tv_desc'], 0, 60) . '...') : '';
				//链接(需要替换为独立域名)
				$link = 'http://' . XT_SITE_DOMAIN . F('tv.getPlayLink', isset ($tv['sid']) ? $tv['sid'] : -1, isset ($tv['vid']) ? $tv['vid'] : -1, -1);
				switch ($sotv['id']) {
					case '1' : //电影（正片则以电影名作为话题）
					case '2' : //电视剧（正片则以剧名作为话题）
						if (isset ($tv['tvType']) && !empty ($tv['tvType'])) {
							if ($tv['tvType'] == 1) {
								$topic = '#' . $title . '# ';
								$title = '';
							}
						}
						if ($topic == '') {
							$title = str_replace(array (
								'《',
								'》'
							), array (
								'#',
								'# '
							), $title);
						}
						break;
					case '7' : //综艺（以节目名作为话题）
						$topic = '';
						$title = str_replace(array (
							'《',
							'》'
						), array (
							'#',
							'# '
						), $title);
						break;
					case '16' : //动漫（以剧名作为话题）
						$topic = '#' . $title . '# ';
						$title = '';
						break;
					case '24' : //音乐（以歌星作为话题）
						if (isset ($tv['main_actor']) && !empty ($tv['main_actor'])) {
							$main_actors = array_slice(explode(';', $tv['main_actor']), 0, 2); //最多取两个
							$topic = '';
							foreach ($main_actors as $actor) {
								$topic .= '#' . $actor . '# ,';
							}
						} else {
							$topic = '';
						}
						break;
					default :
						$topic = '';
				}

				$weibo['text'] = str_replace(array (
					'TOPIC',
					'TITLE',
					'DESC',
					'LINK'
				), array (
					$topic,
					$title,
					$desc,
					$link
				), $XIAOHUA_WEIBO);
				$weibo['pic_url'] = isset ($tv['video_big_pic']) && !empty ($tv['video_big_pic']) ? $tv['video_big_pic'] : '';
				$weibo['id'] = $tv['vid'];
			}

		}
	}
	return $weibo;
}
/**
	 * 发送新浪微博
	 */
function sinaWeibo($TYPE, $ID, $USER_ID, $appKey, $appSecret, $token, $refresh_token, $text, $pic_url, $extra = array ()) {
	$CRON = array (
		'user_id' => XT_USER_ID,
		'type' => $TYPE,
		'weibo' => $text,
		'pic' => $pic_url
	);
	print_r($CRON);
	$result = array ();
	if (!empty ($token)) {
		echo '发布新浪微博';
		$weibo = APP :: N('weibo');
		$weibo->setApp($appKey, $appSecret);
		$weibo->setToken(3, $token, $refresh_token); //指定帐户授权
		//TODO 等申请高级接口upload_url_text后再取消注释
		//if ($appKey != WB_DEFAULT_AKEY) { //TODO 暂时屏蔽微购的新浪发布
		if (isset ($pic_url) && !empty ($pic_url)) { //有图
			$result = $weibo->upload($text, $pic_url);
			if (in_array($result['errno'], array (
					'1020100'
				))) { //40009[1020100]:Error: system error, does multipart has image?
				//如果发布带图微博失败，则发布不带图微博
				$result = $weibo->update($text);
			}
		} else { //无图
			$result = $weibo->update($text);
		}
		//}	
	}

	print_r($result);
	if (in_array($result['errno'], array (
			'1040001',
			'1040008'
		))) { //40313[1040001]:Error: invalid weibo user!.40072[1040008]:Error: accessor was revoked!
		//清空当前用户的帐号授权
		F('xintao.update_config_file', array (
			'SYSTEM_SINA_UID' => '',
			'SYSTEM_SINA_USERNICK' => '',
			'V2_ACCESS_TOKEN' => '',
			'V2_REFRESH_TOKEN' => '',
			'WB_USER_OAUTH_TOKEN' => '',
			'WB_USER_OAUTH_TOKEN_SECRET' => ''
		), $USER_ID);
		//更新管理员关联新浪微博数据库
		DS('mgr/adminCom.saveAdminByUserId', '', array (
			'sina_uid' => '',
			'nickname' => '',
			'v2_access_token' => '',
			'v2_refresh_token' => '',
			'access_token' => '',
			'token_secret' => ''
		), $USER_ID);
	}
	//TODO 需判断授权是否正确，错误的话，则清空授权码
	if (!empty ($result) && isset ($result['rst']) && isset ($result['rst']['id']) && !empty ($result['rst']['id'])) { //成功
		echo '发布成功：' . $TYPE;
		//TODO 腾讯微博
		$qqId = 0;
		try {
			if (WB_QQ_USER_OAUTH_TOKEN != '') {
				$qqText = '';
				if (!empty ($extra) && isset ($extra['qq']) && !empty ($extra['qq'])) { //替换腾讯微博昵称
					$qqText = str_replace($extra['sina'], $extra['qq'], $text);
				} else {
					$qqText = $text;
				}
				if (isset ($pic_url) && !empty ($pic_url)) {
					$qqId = F('qq.add_pic', $qqText, '199.119.138.67', $pic_url);
				} else {
					$qqId = F('qq.add', $qqText, '199.119.138.67');
				}
				echo 'QQ：(' . $qqId . ')';
			}
		} catch (Exception $e) {

		}

		echo ('CRON:');
		print_r($CRON);
		if (!empty ($extra)) {
			if (isset ($extra['sina']) && !empty ($extra['sina'])) {
				$CRON['sina'] = $extra['sina'];
			}
			if (isset ($extra['qq']) && !empty ($extra['qq'])) {
				$CRON['qq'] = $extra['qq'];
			}
			if (isset ($extra['sh']) && !empty ($extra['sh'])) {
				$CRON['sh'] = $extra['sh'];
			}
			if (isset ($extra['wy']) && !empty ($extra['wy'])) {
				$CRON['wy'] = $extra['wy'];
			}
		}
		$WEIBO_TYPE = 0;
		try {
			switch ($TYPE) {
				case 'XIAOHUA' :
					DR('mgr/xintao/cronCom.updateXiaohuaNums', '', $ID);
					$WEIBO_TYPE = 4;
					break;
				case 'POSTER' :
					DR('mgr/xintao/cronCom.updatePosterNums', '', $ID);
					$WEIBO_TYPE = 3;
					break;
				case 'TV' :
					DR('mgr/xintao/cronCom.updateTvNums', '', $ID);
					$WEIBO_TYPE = 5;
					break;
				case 'SHARE' : //商品分享
					DR('xintao/wow.updateShareItemNums', '', $extra['cat'], $ID);
					$WEIBO_TYPE = 7;
					break;
				case 'SHOP' : //店铺推广（记录）
					$ids = explode('-', $ID); //0是店铺ID，1是该店铺所属于的用户ID
					DR('mgr/xintao/cronCom.updateUserShopNums', '', $ids[0], $qqId > 0);
					$WEIBO_TYPE = 1;
					$CRON['sid'] = $ids[0];
					$CRON['userid'] = $ids[1];
					_backupShopWeibo($result['rst'], $USER_ID, $ids[1], $ids[0], $qqId);
					//TODO 记录店铺推广日志
					break;
				case 'ITEM' : //商品推广（记录）
					$ids = explode('-', $ID); //0是商品ID，1是该商品所属于的用户ID
					DR('mgr/xintao/cronCom.updateUserItemNums', '', $ids[0], $ids[1], $qqId > 0);
					$WEIBO_TYPE = 2;
					$CRON['nid'] = $ids[0];
					$CRON['userid'] = $ids[1];
					_backupItemWeibo($result['rst'], $USER_ID, $ids[1], $ids[0], $qqId);
					//TODO 记录商品推广日志
					break;
				case 'TAOKE_ITEM' : //淘宝客自主商品推广（记录）
					DR('mgr/xintao/cronCom.updateTaokeItemNums', '', $ID);
					$WEIBO_TYPE = 2;
					$CRON['nid'] = $ID;
					_backupTaokeItemWeibo($result['rst'], $USER_ID, $ID, $qqId);
					//TODO 记录商品推广日志
					break;
			}
		} catch (Exception $e) {
			print_r($e);
		}
		//backup
		echo '开始备份';
		_backupWeibo($result['rst'], $USER_ID, $CRON, $WEIBO_TYPE);
		if ($result['rst']['text'] == '此微博已被删除。') { //记录被删除的微博，为后续排查关键词做准备
			$sid = 0;
			$nid = 0;
			$userid = 0;
			$data = array (
				'id' => $result['rst']['id'],
				'weibo' => $text,
				'user_id' => $USER_ID
			);
			if ($TYPE == 'SHOP') {
				$data['sid'] = $ID;
				$sid = $ID;
			}
			elseif ($TYPE == 'ITEM') {
				$ids = explode('-', $ID); //0是商品ID，1是该商品所属于的用户ID
				$data['nid'] = $ids[0];
				$data['userid'] = $ids[1];
			}

			DS('mgr/xintao/yingxiaoWeiboCom.saveDelete', '', $data);
		}
		//记录日志
	} else { //新浪未成功（其他平台照常，qq，sh，wy）
		try {
			if (WB_QQ_USER_OAUTH_TOKEN != '') {
				$qqText = '';
				if (!empty ($extra) && isset ($extra['qq']) && !empty ($extra['qq'])) { //替换腾讯微博昵称
					$qqText = str_replace($extra['sina'], $extra['qq'], $text);
				} else {
					$qqText = $text;
				}
				if (isset ($pic_url) && !empty ($pic_url)) {
					$qqId = F('qq.add_pic', $qqText, '199.119.138.67', $pic_url);
				} else {
					$qqId = F('qq.add', $qqText, '199.119.138.67');
				}
				echo 'QQ：(' . $qqId . ')';
			}
			F('autoCronWeibo.autoCronWeibo', array (
				'weibo' => $text,
				'pic' => $pic_url
			), false); //发布其他两个平台，且不保存
			$WEIBO_TYPE = 0;
			switch ($TYPE) {
				case 'XIAOHUA' :
					DR('mgr/xintao/cronCom.updateXiaohuaNums', '', $ID);
					break;
				case 'POSTER' :
					DR('mgr/xintao/cronCom.updatePosterNums', '', $ID);
					break;
				case 'TV' :
					DR('mgr/xintao/cronCom.updateTvNums', '', $ID);
					break;
				case 'SHARE' : //商品分享
					DR('xintao/wow.updateShareItemNums', '', $extra['cat'], $ID);
					break;
				case 'SHOP' : //店铺推广（记录）
					$ids = explode('-', $ID); //0是店铺ID，1是该店铺所属于的用户ID
					DR('mgr/xintao/cronCom.updateUserShopNums', '', $ids[0], $qqId > 0);
					DS('mgr/xintao/cronCom.updateYingxiaoShopNums', '', $ids[1]); //递加每日店铺营销数量
					break;
				case 'ITEM' : //商品推广（记录）
					$ids = explode('-', $ID); //0是商品ID，1是该商品所属于的用户ID
					DR('mgr/xintao/cronCom.updateUserItemNums', '', $ids[0], $ids[1], $qqId > 0);
					DS('mgr/xintao/cronCom.updateYingxiaoItemNums', '', $ids[1]); //递加每日商品营销数量
					break;
				case 'TAOKE_ITEM' : //淘宝客自主商品推广（记录）
					DR('mgr/xintao/cronCom.updateTaokeItemNums', '', $ID);
					break;
			}

		} catch (Exception $e) {

		}
	}
}
/**
 * 微博备份（仅新浪）
 */
function _backupWeibo($result, $USER_ID, $CRON = '', $TYPE) {
	$db = APP :: ADP('db');

	$data_weibo = array ();
	$data_weibo['id'] = $result['id'];
	$data_weibo['weibo'] = $result['text'];
	$data_weibo['uid'] = $result['user']['id'];
	$data_weibo['nickname'] = $result['user']['screen_name'];
	$data_weibo['addtime'] = APP_LOCAL_TIMESTAMP;
	$data_weibo['pic'] = isset ($result['thumbnail_pic']) ? $result['thumbnail_pic'] : '';
	$data_weibo['disabled'] = 0;
	$data_weibo['user_id'] = $USER_ID;
	$data_weibo['type'] = $TYPE;
	$db->save($data_weibo, '', T_WEIBO_COPY);
	try {
		//其他平台
		if (!empty ($CRON) && (WB_SOHU_USER_OAUTH_TOKEN != '' && WB_SOHU_USER_OAUTH_TOKEN_SECRET != '') || (WB_WY_USER_OAUTH_TOKEN != '' && WB_WY_USER_OAUTH_TOKEN_SECRET != '')) {
			$CRON['id'] = $result['id'];
			$CRON['addtime'] = APP_LOCAL_TIMESTAMP;
			//插入附属平台微博定时计划
			$db = APP :: ADP('db');
			$db->save($CRON, '', T_XT_WEIBO_CRON);
		}
	} catch (Exception $e1) {

	}
	echo '备份完成';
}
/**
 * 店铺推广微博备份（仅新浪）
 */
function _backupShopWeibo($result, $USER_ID, $userid, $sid, $QQ = '0', $SH = '0', $WY = '0') {
	$db = APP :: ADP('db');

	$data_weibo = array ();
	$data_weibo['id'] = $result['id'];
	$data_weibo['weibo'] = $result['text'];
	$data_weibo['uid'] = $result['user']['id'];
	$data_weibo['nickname'] = $result['user']['screen_name'];
	$data_weibo['addtime'] = APP_LOCAL_TIMESTAMP;
	$data_weibo['pic'] = isset ($result['thumbnail_pic']) ? $result['thumbnail_pic'] : '';
	$data_weibo['disabled'] = 0;
	$data_weibo['user_id'] = $USER_ID;
	$data_weibo['sid'] = $sid;
	$data_weibo['qq_id'] = $QQ;
	$data_weibo['sh_id'] = $SH;
	$data_weibo['wy_id'] = $WY;
	$db->save($data_weibo, '', T_XT_USER_SHOP_WEIBO);
	DS('mgr/xintao/cronCom.updateYingxiaoShopNums', '', $userid); //递加每日店铺营销数量
	echo '备份完成';
}
/**
 * 店铺推广微博备份（仅新浪）
 */
function _backupItemWeibo($result, $USER_ID, $userid, $nid, $QQ = '0', $SH = '0', $WY = '0') {
	$db = APP :: ADP('db');

	$data_weibo = array ();
	$data_weibo['id'] = $result['id'];
	$data_weibo['weibo'] = $result['text'];
	$data_weibo['uid'] = $result['user']['id'];
	$data_weibo['nickname'] = $result['user']['screen_name'];
	$data_weibo['addtime'] = APP_LOCAL_TIMESTAMP;
	$data_weibo['pic'] = isset ($result['thumbnail_pic']) ? $result['thumbnail_pic'] : '';
	$data_weibo['disabled'] = 0;
	$data_weibo['user_id'] = $USER_ID; //当前发微博的用户
	$data_weibo['userid'] = $userid; //商品所属的用户
	$data_weibo['nid'] = $nid; //商品ID
	$data_weibo['qq_id'] = $QQ;
	if ($QQ != '0') {
		$data_weibo['nums'] = 2;
	} else {
		$data_weibo['nums'] = 1;
	}
	$data_weibo['sh_id'] = $SH;
	$data_weibo['wy_id'] = $WY;
	//需要根据商品所属用户的ID来保存到对应分表中
	$keys = array ();
	$values = array ();
	foreach ($data_weibo as $key => $value) {
		$keys[] = '`' . $db->escape($key) . '`';
		$values[] = '"' . $db->escape($value) . '"';
	}
	$sql = 'INSERT INTO ' . $db->getPrefix() . T_XT_USER_ITEM_WEIBO . '_' . (substr($userid, strlen($userid) - 1)) . '(' . implode(',', $keys) . ') VALUES(' . implode(',', $values) . ')';
	$db->execute($sql);
	DS('mgr/xintao/cronCom.updateYingxiaoItemNums', '', $userid); //递加每日商品营销数量
	echo '备份完成';
}
/**
 * 店铺推广微博备份（仅新浪）
 */
function _backupTaokeItemWeibo($result, $USER_ID, $nid, $QQ = '0', $SH = '0', $WY = '0') {
	$db = APP :: ADP('db');
	$data_weibo = array ();
	$data_weibo['id'] = $result['id'];
	$data_weibo['user_id'] = $USER_ID; //当前发微博的用户
	$data_weibo['nid'] = $nid; //商品ID
	$data_weibo['qq_id'] = $QQ;
	$data_weibo['sh_id'] = $SH;
	$data_weibo['wy_id'] = $WY;
	//需要根据商品所属用户的ID来保存到对应分表中
	$keys = array ();
	$values = array ();
	foreach ($data_weibo as $key => $value) {
		$keys[] = '`' . $db->escape($key) . '`';
		$values[] = '"' . $db->escape($value) . '"';
	}
	$sql = 'INSERT INTO ' . $db->getTable(T_XT_TAOKE_ITEM_WEIBO) . '(' . implode(',', $keys) . ') VALUES(' . implode(',', $values) . ')';
	$db->execute($sql);
	echo '备份完成';
}
function str_replace_limit($search, $replace, $subject, $limit = -1) {
	// constructing mask(s)...
	if (is_array($search)) {
		foreach ($search as $k => $v) {
			$search[$k] = '`' . preg_quote($search[$k], '`') . '`';
		}
	} else {
		$search = '`' . preg_quote($search, '`') . '`';
	}
	// replacement
	return preg_replace($search, $replace, $subject, $limit);
}