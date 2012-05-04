<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>域名审核 - 审核管理 - 新淘管理</title>
<link href="<?php echo W_BASE_URL;?>css/admin/admin.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/jquery.min.js"></script>
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/admin/admin_lib.js"></script>
<script src="<?php echo W_BASE_URL;?>js/admin-all.js"></script>
<style>.table td{height:30px;}</style>
<?php
echo '123';
/**
	 * 远程抓取综艺
	 */
function getRemoteFocus($type) {
	$html = "//<![CDATA[jQuery('#mFocus1').ImgSlide({loop : true,timeout : 15e3,data : 布莱克-莱弗利莉顿.梅斯特//]]>"; //F('http_get_contents', 'http://tv.sohu.com/' . $type . '/');
	preg_match("'//<\!\[CDATA\[(.*)//\]\]>'si", $html, $match);
	print_r($match);
	exit;
	if ($match) {
		$match[1] = iconv("gbk", "utf-8//IGNORE", $match[1]);
		print_r($match[1]);
		preg_match("'data\s+:\s+(.*)\]'si", $match[1], $match);
		print_r($match);
		$text = str_replace(array (
			'p:"',
			'p1:"',
			'l:"',
			't:"',
			't_:"',
			't1:"',
			'mtype:[{"',
			'mtype:["',
			'mdirector:[{"',
			'mdirector:["',
			'mactor:[{"',
			'mactor:["'
		), array (
			'"p":"',
			'"p1":"',
			'"l":"',
			'"t":"',
			'"t_":"',
			'"t1":"',
			'"mtype":[{"',
			'"mtype":["',
			'"mdirector":[{"',
			'"mdirector":["',
			'"mactor":[{"',
			'"mactor":["'
		), $match[1] . ']');
		echo $text;
		$zongyi = (json_decode($text, true));
		print_r($zongyi);
		$result = array ();
		if (!empty ($zongyi)) {
			foreach ($zongyi as $z) { //查询每一个的VID
				if (!empty ($z['l'])) {
					try {
						$html = F('http_get_contents', $z['l']);
						preg_match("'var\s+vid=\"([0-9]+)\";'si", $html, $match);
						if ($match) {
							$z['vid'] = $match[1];
						} else {
							continue;
						}
						if (!isset ($z['mtype'])) {
							continue;
						}
						if (!is_array($z['mtype'][0])) {
							$z['mtype'] = array_slice($z['mtype'], 1, count($z['mtype']) - 1);
						}
						if (!is_array($z['mdirector'][0])) {
							$z['mdirector'] = array_slice($z['mdirector'], 1, count($z['mdirector']) - 1);
						}
						if (!is_array($z['mactor'][0])) {
							$z['mactor'] = array_slice($z['mactor'], 1, count($z['mactor']) - 1);
						}
						$result[] = $z;
					} catch (Exception $e) {
					}
				}
			}
		}
		return array_slice($result, 0, 6);
	}
}
//F('get_taobao_cat.get_taobao_cat_item');		
//print_r(getRemoteFocus('teleplay'));

//print_r(F('xintao.synAppstore'));
//$admins = array (
//	array (
//		'user_nick' => '你好的世界',
//		'user_id' => '268165332'
//	)
//);
//$results = array ();
//foreach ($admins as $admin) {
//	try {
//		$nick = $admin['user_nick'];
//		$userId = $admin['user_id'];
//		if (empty ($nick)) { //测试帐号
//			continue;
//		}
//		$appstore = array ();
//		$FREE_DATELINE = '';
//		$APPSTORE_DATELINE = '';
//		$ISCLOSED = false;
//		//第一步：临时授权（是指系统可自由赠送使用服务及时间）
//		$betas = V('-:beta');
//		if (in_array($nick, array_keys($betas))) { //临时授权
//			$beta = $betas[$nick];
//			if ((!empty ($beta['dateline']) && time() < strtotime($beta['dateline'])) || $beta['dateline'] == '') {
//				$appstore = $beta['appstore'];
//				$APPSTORE_DATELINE = $beta['dateline'];
//			}
//		}
//		//第二步：真实订购（真实付费使用的）
//		if (empty ($appstore)) { //真实订购
//			$codes = F('top.vasSubscribeGet', -999, '登录模块', array (
//				'nick' => $nick,
//				'article_code' => TB_ARTICLE_CODE_1,
//				'app_key' => TB_APP_KEY_1,
//				'app_secret' => TB_APP_SECRET_1
//			), true);
//			if (!empty ($codes)) {
//				foreach ($codes as $key) {
//					$data = array ();
//					$data[0] = $key['item_code'];
//					$data[1] = $key['deadline'];
//					$data[2] = $userId;
//					$codesRs = DR('mgr/adminCom.saveAppstoreById', '', $data); //更新订购的服务项目
//					$appstore[] = '[' . $key['item_code'] . ']';
//				}
//				$APPSTORE_DATELINE = F('getAppstoreDateline', $codes);
//			}
//		}
//		//第三步：免费授权（是指为了吸引用户，提供3天的免费使用）
//		if (count($appstore) == 1 && $appstore[0] == XT_APPSTORE_FREE) { //如果该用户仅订购了免费服务，提供3天的免费服务
//			$free_ret = DR('xintao/free.getById', '', $userId);
//			if (!$free_ret['rst']) { //还没有免费期，则新增(系统同步时不需要考虑新增)
//			} else { //已有免费期，则判断是否在免费期间
//				$free = $free_ret['rst'];
//				if (time() < strtotime($free['dateline'])) { //在期间
//					$FREE_DATELINE = $free['dateline'];
//					$APPSTORE_DATELINE = $free['dateline'];
//					//设置可免费使用的服务项目（卖家用户提供卖家服务，淘客用户提供淘客服务）
//					$appstore[] = $free['appstore']; //设置免费试用的服务项目
//				} else { //已过期，则不处理
//
//				}
//			}
//		}
//		if (count($appstore) == 0) {
//			$ISCLOSED = true;
//		}
//		if (!in_array(XT_APPSTORE_FREE, $appstore)) {
//			$appstore[] = XT_APPSTORE_FREE;
//		}
//		$config_arr = array (
//			'XT_APPSTORE' => implode(',', $appstore),
//			'XT_FREE_DATELINE' => $FREE_DATELINE,
//			'XT_APPSTORE_DATELINE' => $APPSTORE_DATELINE
//		);
//		//			if (!in_array(XT_APPSTORE_SELLER_MULTI, $appstore)) { //如果不是卖家版(目前仅判断多店铺)
//		//				$config_arr['XT_SIDS'] = '';
//		//				$config_arr['XT_SHOPS'] = '';
//		//				$config_arr['XT_CIDS'] = '';
//		//			}
//		F('xintao.update_config_file', $config_arr, $userId); //更新
//		$GROUP_ID = 4;
//		if ($FREE_DATELINE != '') { //体验版
//			$GROUP_ID = 3;
//		}
//		elseif (in_array(XT_APPSTORE_SELLER_MULTI, $appstore)) { //卖家
//			$GROUP_ID = 7;
//		}
//		elseif (in_array(XT_APPSTORE_TAOKE, $appstore)) { //淘客
//			$GROUP_ID = 5;
//		}
//		DS('mgr/adminCom.saveAdminByUserId', '', array (
//			'group_id' => $ISCLOSED ? 0 : $GROUP_ID
//		), $userId);
//		if ($GROUP_ID == 7) { //如果不是卖家服务,则清空推广链接和店铺为卖家服务的标识
//			DS('xintao/userShop.setIsSeller', '', 1, $userId);
//		} else { //是卖家服务，则标识店铺为卖家服务
//			DS('xintao/userShop.setIsSeller', '', 0, $userId);
//		}
//		$result = array ();
//		$result['user_id'] = $userId;
//		$result['user_nick'] = $nick;
//		$result['appstore'] = $appstore;
//		$result['free_dateling'] = $FREE_DATELINE;
//		$results[] = $result;
//	} catch (Exception $e) {
//	}
//}
//print_r($results);
//print_r(F('get_xintaotv_last_shops'));
//F('get_brand.get_brand_item');
//print_r(getRemoteFocus('real'));
//print_r(getRemoteFocus('music'));
//print_r(getRemoteFocus('movie'));
//print_r(getRemoteFocus('teleplay'));
//print_r(getRemoteFocus('zongyi'));
//print_r(getRemoteFocus('comic'));
//print_r(CACHE :: get(TB_CACHE_TV_KEY_PRE . 'movieFocus'));
//print_r(CACHE :: get(TB_CACHE_TV_KEY_PRE . 'comicFocus'));
//CACHE :: set(TB_CACHE_TV_KEY_PRE .'comicFocus', getRemoteFocus('comic'), CACHE_2);
echo '456';
?>
</head>
<body class="main-body">
	<div class="path"><p>当前位置：审核管理<span>&gt;</span>域名审核</p></div>
    <div class="main-cont">
        <h3 class="title">域名审核列表</h3>
		<div class="set-area">
			<?php Xpipe :: pagelet('xintaoTv.focus','comic');?>
        	<table class="table" cellpadding="0" style="width:420px" cellspacing="0" border="0">
            	<colgroup>
						<col class="w140"/>
    					<col class="w140" />
    					<col class="w140" />
    					<col class="w140" />
    			</colgroup>
                <thead class="tb-tit-bg">
  					<tr>
    					<th><div class="th-gap">列1</div></th>
    					<th><div class="th-gap">列2</div></th>
                        <th><div class="th-gap">列3</div></th>
                        <th><div class="th-gap">列4</div></th>
  					</tr>
                </thead>
				<tfoot class="tb-tit-bg"><tr><td colspan="4"><div class="pre-next"></div></td></tr></tfoot>
                <tbody>
                	<tr><td></td><td></td><td></td><td></td></tr>
                	<tr><td></td><td></td><td colspan=2 align=center>colspan=2</td></tr>
                	<tr><td></td><td rowspan=2 align=center>rolspan=2</td><td></td><td></td></tr>
                	<tr><td></td><td></td><td></td></tr>
                </tbody>
			</table>
    	</div>
</div>
</body>
</html>
