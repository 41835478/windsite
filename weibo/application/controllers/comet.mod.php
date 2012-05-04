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

class comet_mod {
	var $weibo = null;
	var $mString = null;
	function comet_mod() {
		$this->weibo = APP :: N('weibo');
		$this->mString = APP :: N('tools/mstring');
	}

	/**
	 * 接收主动通知
	 */
	function default_action() {
		///TODO 需考虑未开通微博功能，方案：访问www.xintaowang.com。根据用户ID来查询appkey，secret，token等，微博模板等

		$message = V('p:message');
		$USER_ID = V('p:user_id');
		if (empty ($message) || empty ($USER_ID)) { //TODO 限制同一个商品每天仅发布两条，记录发微博日志
			exit ('message或user_id为空');
		}
		$msg = array ();
		$appKey = WB_DEFAULT_AKEY;
		$appSecret = WB_DEFAULT_SKEY;
		$token = '';
		$token_secret = '';
		$tSession = '';
		$text = '';
		$pic_url = '';
		$itemTitle = '';
		$itemPrice = '';
		$itemNumIid = '';
		$itemUrl = '';
		$id = 0;
		///步骤：第一步：读取指定用户的微博绑定信息，xwb_admin,第二步：解析主动通知内容，生成微博相关参数（可能需要过滤重复的微博）,第三步:发布微博
		//第一步：
		$rs = DR('mgr/adminCom.getAdminByUserId', '', $USER_ID);
		if ($rs['rst']) { //查找token和token_secret
			$admin = $rs['rst'];
			if (!$admin['access_token'] || !$admin['token_secret']) {
				exit ('access_token或token_secret为空');
			} else { //设置当前用户的token
				if (!empty ($admin['appKey']) && !empty ($admin['appSecret'])) {
					$appKey = $admin['appKey'];
					$appSecret = $admin['appSecret'];
				}
				$token = $admin['access_token'];
				$token_secret = $admin['token_secret'];
				$tSession = $admin['tb_session'];
				//TODO 根据GROUP_ID判断是否开通微博
				$itemUrl = $admin['group_id'] >= 5 ? 'http://' . $admin['domain'] . '/item-' : 'http://item.taobao.com/item.htm?id=';

			}
		} else {
			exit ('没有找到当前用户');
		}
		$msg = json_decode($message, true);
		if (isset ($msg['notify_trade'])) { //交易
			$trade = $msg['notify_trade'];
			//根据交易TID获取交易详情：（orders.title, orders.pic_path, orders.price, orders.num, orders.num_iid）
			//TODO 生成微博内容
			if ($trade['status'] == 'TradeSuccess') {
				$id = 2;
			}
			elseif ($trade['status'] == 'TradeRated') { //暂不处理好评（似乎暂时没办法确认是不是好评）
				exit ('traderated');
			} else {
				exit ('交易通知不匹配');
			}
			if (empty ($tSession)) { //如果没有淘宝授权
				exit ('淘宝SESSION为空');
			}
			$text = $this->getWeiboText($id, $USER_ID); //模板内容
			if (empty ($text)) { //为空则返回
				exit ('模板内容为空');
			}
			//查询订单详情
			$tRet = TB('top/TopClient.tradeGet', '', array (
				'tid' => $trade['tid'],
				'session' => $tSession
			));
			if ($tRet['rst']) {
				if (isset ($tRet['rst']['trade']) && isset ($tRet['rst']['trade']['orders']) && isset ($tRet['rst']['trade']['orders']['order'])) {
					$orders = $tRet['rst']['trade']['orders']['order'];
					if (!empty ($orders)) {
						$order = $orders[0]; //第一个订单
						$itemTitle = $order['title'];
						$itemPrice = $order['price'];
						$pic_url = $order['pic_path'];
						$itemNumIid = $order['num_iid'];
					} else {
						exit ('订单内容为空');
					}
				} else {
					exit ('订单内容为空');
				}
			} else {
				exit ('订单内容为空');
			}
		}
		elseif (isset ($msg['notify_item'])) { //商品
			//根据商品NUM_IID获取商品详情：（num_iid,price,title,pic_url）
			$item = $msg['notify_item'];
			if ($item['status'] == 'ItemUpshelf') { //上架
				$id = 1;
			}
			elseif ($item['status' == 'ItemRecommendAdd']) { //橱窗推荐
				$id = 100;
			} else {
				exit ('商品状态不匹配');
			}
			$text = $this->getWeiboText($id, $USER_ID); //模板内容
			if (empty ($text)) { //为空则返回
				exit ('模板内容为空');
			}
			$tRet = TB('top/TopClient.itemGet', 'g0/' . CACHE_24, array (
				'num_iid' => $item['num_iid'],
				'fields' => 'num_iid,title,price,pic_url'
			));
			//查询当前商品详情
			if ($tRet['rst']) {
				if (isset ($tRet['rst']['item'])) { //生成微博内容参数
					$tItem = $tRet['rst']['item'];
					$itemTitle = $tItem['title'];
					$itemPrice = $tItem['price'];
					$pic_url = $tItem['pic_url'];
					$itemNumIid = $tItem['num_iid'];
				} else {
					exit ('商品内容为空');
				}
			} else {
				exit ('商品内容为空');
			}
		} else {
			exit ('通知不匹配');
		}
		if ($text) {
			$text = str_replace(array (
				'[宝贝标题]',
				'[宝贝价格]',
				'[宝贝链接]'
			), array (
				$itemTitle,
				$itemPrice,
				 ($itemUrl . $itemNumIid) //需要根据服务项目，来自动生成链接，比如：非微博站长，直接使用淘宝链接，如果是微博站长，则使用自己的推广链接

	
			), $text);
			//发送新浪微博
			if ($token && $token_secret) { //如果已授权
				$this->sinaWeibo($id, $USER_ID, $appKey, $appSecret, $token, $token_secret, $text, $pic_url);
			}
			//TODO 其他微博平台
			exit ('成功');
		}

	}
	function getWeiboText($id, $USER_ID) {
		if ($id > 0) {
			$ret = DR('mgr/xintao/cronCom.getAutoCron', 0, $USER_ID);
			if ($ret['rst']) {
				foreach ($ret['rst'] as $row) {
					if ($row['id'] == $id && $row['isValid']) { //匹配并启用
						return $row['metadata'] . '。【' . $this->mString->randString(10) . '】';
					}
				}
			}
		}
		return '';
	}
	/**
	 * 发送新浪微博
	 */
	function sinaWeibo($CRON_ID, $USER_ID, $appKey, $appSecret, $token, $token_secret, $text, $pic_url) {
		$result = array ();
		$this->weibo->consumer = new OAuthConsumer($appKey, $appSecret); //指定新浪appKey
		$this->weibo->setToken(3, $token, $token_secret); //指定帐户授权
		if ($pic_url) { //有图
			$result = $this->weibo->uploadUrlText($text, '', $pic_url);
		} else { //无图
			$result = $this->weibo->update($text);
		}
		//print_r($result);
		//TODO 需判断授权是否正确，错误的话，则清空授权码
		if (!empty ($result) && isset ($result['rst']) && isset ($result['rst']['id']) && !empty ($result['rst']['id'])) { //成功
			DR('mgr/xintao/cronCom.updateAutoCronNums', 0, $CRON_ID);
			//backup
			$this->_backupWeibo($result['rst'], $USER_ID);
			//记录日志
		}
	}
	/**
	 * 微博备份（仅新浪）
	 */
	function _backupWeibo($result, $USER_ID) {
		$db = APP :: ADP('db');

		$db->setTable('weibo_copy');
		$data_weibo = array ();
		$data_weibo['id'] = $result['id'];
		$data_weibo['weibo'] = $result['text'];
		$data_weibo['uid'] = $result['user']['id'];
		$data_weibo['nickname'] = $result['user']['screen_name'];
		$data_weibo['addtime'] = APP_LOCAL_TIMESTAMP;
		$data_weibo['pic'] = isset ($result['thumbnail_pic']) ? $result['thumbnail_pic'] : '';
		$data_weibo['disabled'] = 0;
		$data_weibo['user_id'] = $USER_ID;
		print_r($data_weibo);
		$db->save($data_weibo);
	}
}