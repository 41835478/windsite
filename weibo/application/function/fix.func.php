<?php
function fixConfig($userId) {
	$rs = DR('mgr/adminCom.getAdminByUserId', '', $userId);
	if ($rs['rst']) {
		$ret = $rs['rst'];
		if (in_array($ret['user_nick'], array (
				'oqoq2oqoq2',
				'星空下约定1314',
				'kqysg'
			))) {
			exit ('已退款用户，不予登录');
		}
		if (in_array($ret['user_nick'], array (
				'alansll2011',
				'笨耗子2010',
				'colortt',
				'果粉果嫩婴儿奶粉屋'
			))) {
			exit ('无效用户，不予登录，详情咨询客服QQ：153647646');
		}
		$appstore = array ();
		$FREE_DATELINE = '';
		$APPSTORE_DATELINE = '';
		//第一步：临时授权（是指系统可自由赠送使用服务及时间）
		$betas = V('-:beta');
		if (in_array($ret['user_nick'], array_keys($betas))) { //临时授权
			$beta = $betas[$ret['user_nick']];
			if ((!empty ($beta['dateline']) && time() < strtotime($beta['dateline'])) || $beta['dateline'] == '') {
				$appstore = $beta['appstore'];
				$APPSTORE_DATELINE = $beta['dateline'];
			}
		}
		//第二步：真实订购（真实付费使用的）
		if (empty ($appstore)) { //真实订购
			$codes = F('top.vasSubscribeGet', -999, '登录模块', array (
				'nick' => $ret['user_nick'],
				'article_code' => TB_ARTICLE_CODE_1,
				'app_key' => TB_APP_KEY_1,
				'app_secret' => TB_APP_SECRET_1
			), true);
			if (!empty ($codes)) {
				foreach ($codes as $key) {
					$data = array ();
					$data[0] = $key['item_code'];
					$data[1] = $key['deadline'];
					$data[2] = $ret['user_id'];
					$codesRs = DR('mgr/adminCom.saveAppstoreById', '', $data); //更新订购的服务项目
					$appstore[] = '[' . $key['item_code'] . ']';
					if ($APPSTORE_DATELINE == '') {
						if ($key['item_code'] == 'ts-14975-4') { //先卖家
							$APPSTORE_DATELINE = $key['deadline'];
						}
						elseif ($key['item_code'] == 'ts-14975-5') { //再淘客
							$APPSTORE_DATELINE = $key['deadline'];
						}
						elseif ($key['item_code'] == 'ts-14975-1') { //最后免费
							$APPSTORE_DATELINE = $key['deadline'];
						}
					}
				}
				$APPSTORE_DATELINE = F('getAppstoreDateline', $codes);
			} else {
			}
		}
		//第三步：免费授权（是指为了吸引用户，提供3天的免费使用）
		if (count($appstore) == 1 && $appstore[0] == XT_APPSTORE_FREE) { //如果该用户仅订购了免费服务，提供3天的免费服务
			$free_ret = DR('xintao/free.getById', '', $ret['user_id']);
			if (!$free_ret['rst']) { //还没有免费期，则新增

			} else { //已有免费期，则判断是否在免费期间
				$free = $free_ret['rst'];
				if (time() < strtotime($free['dateline'])) { //在期间
					$FREE_DATELINE = $free['dateline'];
					$APPSTORE_DATELINE = $free['dateline'];
					//设置可免费使用的服务项目（卖家用户提供卖家服务，淘客用户提供淘客服务）
					$appstore[] = $free['appstore']; //设置免费试用的服务项目
				} else { //已过期，则不处理

				}
			}
		}
		if (!in_array(XT_APPSTORE_FREE, $appstore)) {
			$appstore[] = XT_APPSTORE_FREE;
		}

		$sid = '';
		$shops = '';
		if (!empty ($ret['sid']) && is_numeric($ret['sid'])) {
			$sid = '[' . $ret['sid'] . ']';
			$shops = '[' . $ret['user_nick'] . ']';
		}
		$config_array = array (
			'R_DEF_MOD' => $ret['def_mod'],
			'XT_IS_INIT' => 'true',
			'XT_USER_ID' => $ret['user_id'],
			'XT_USER_NICK' => $ret['user_nick'],
			'XT_USER_PID' => $ret['pid'],
			'XT_USER_SPID' => str_replace('mm_', '', str_replace('_0_0', '', $ret['pid'])),
			'XT_VANCL_NICK' => '',
			'XT_SITE_DOMAIN' => $ret['domain'],
			'XT_PIWIK_ID' => '',
			'XT_IS_DIRECT' => 'true',
			'XT_IS_LOGIN' => 'false',
			'XT_IS_POST' => 'false',
			'XT_SIDS' => $sid,
			'XT_SHOPS' => $shops,
			'XT_CIDS' => '',
			'XT_APPSTORE' => implode(',', $appstore),
			'WB_QQ_AKEY' => $ret['qq_appKey'],
			'WB_QQ_SKEY' => $ret['qq_appSecret'],
			'WB_QQ_UID' => $ret['qq_uid'],
			'WB_QQ_NAME' => $ret['qq_name'],
			'WB_QQ_NICK' => $ret['qq_nick'],
			'WB_QQ_USER_OAUTH_TOKEN' => $ret['qq_access_token'],
			'WB_QQ_USER_OAUTH_TOKEN_SECRET' => $ret['qq_token_secret'],
			'WB_SOHU_AKEY' => $ret['sh_appKey'],
			'WB_SOHU_SKEY' => $ret['sh_appSecret'],
			'WB_SOHU_UID' => $ret['sh_uid'],
			'WB_SOHU_NAME' => $ret['sh_name'],
			'WB_SOHU_NICK' => $ret['sh_nick'],
			'WB_SOHU_USER_OAUTH_TOKEN' => $ret['sh_access_token'],
			'WB_SOHU_USER_OAUTH_TOKEN_SECRET' => $ret['sh_token_secret'],
			'WB_WY_AKEY' => $ret['wy_appKey'],
			'WB_WY_SKEY' => $ret['wy_appSecret'],
			'WB_WY_UID' => $ret['wy_uid'],
			'WB_WY_NAME' => $ret['wy_name'],
			'WB_WY_NICK' => $ret['wy_nick'],
			'WB_WY_USER_OAUTH_TOKEN' => $ret['wy_access_token'],
			'WB_WY_USER_OAUTH_TOKEN_SECRET' => $ret['wy_token_secret'],
			'WB_AKEY' => $ret['appKey'],
			'WB_SKEY' => $ret['appSecret'],
			'SYSTEM_SINA_UID' => $ret['sina_uid'],
			'SYSTEM_SINA_USERNAME' => '',
			'SYSTEM_SINA_USERNICK' => $ret['nickname'],
			'V2_ACCESS_TOKEN' => $ret['v2_access_token'],
			'V2_REFRESH_TOKEN' => $ret['v2_refresh_token'],
			'WB_USER_SITENAME' => '',
			'WB_USER_SITEINFO' => '',
			'WB_USER_NAME' => '',
			'WB_USER_EMAIL' => '',
			'WB_USER_QQ' => '',
			'WB_USER_MSN' => '',
			'WB_USER_TEL' => '',
			'XT_FREE_DATELINE' => $FREE_DATELINE,
			'XT_TVAD_IS_SELLER' => 'false',
			'XT_SID' => $sid,
			'XT_IS_SIMPLE' => 'true',
			'XT_IS_ICP' => 'false',
			'XT_APPSTORE_DATELINE' => $APPSTORE_DATELINE,
			'XT_CLIENT_IP' => '',
			'XT_DEF_SHARE_MOD' => 'lady',
			'XT_DEF_SHARE_SUB' => '102',
			'XT_IS_TAOKE_SHOP' => 'false',
			'XT_IS_ITEMCLOSED' => 'false'
		);
		//IO :: rm(F('xintao.get_config_array_path', $ret['user_id'])); //删除现有
		F('xintao.set_config_file', $ret['user_id'], $config_array); //更新
		print_r($config_array);
	}
}