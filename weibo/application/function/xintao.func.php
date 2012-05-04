<?php


/**
 * 是否是百度，Google蜘蛛
 */
function is_crawler() {
	static $isCrawler = false;
	$agent = strtolower($_SERVER['HTTP_USER_AGENT']);
	if (!empty ($agent)) {
		$spiderSite = array (
			"baiduspider",
			"googlebot",
			"Baiduspider",
			"Googlebot"
		);
		foreach ($spiderSite as $val) {
			if (strpos($agent, $val) !== false) {
				$isCrawler = true;
				break;
			}
		}
	}
	if ($isCrawler) { //如果是百度和谷歌
		//不需要pagelets的功能
		$taokes = explode(',', XT_SPIDER_NO_LIMIT);
		if ($_SERVER['REQUEST_URI'] == '/' || $_SERVER['REQUEST_URI'] == '') { //首页仍需抓取
			return true;
		}
		foreach ($taokes as $val) { //如果不是微博功能，则设置为抓取
			if (strpos($_SERVER['REQUEST_URI'], $val) !== false) {
				return true;
				break;
			}
		}
		//单条微博，他人微博的其他页面(如粉丝，关注等)不再支持爬取（节省API流量）//TODO 暂不控制APP  WB_AKEY == WB_DEFAULT_AKEY || 
		if (WB_AKEY == WB_DEFAULT_AKEY || (XT_SITE_DOMAIN == 't' . XT_USER_ID . '.xintaowang.com' || XT_SITE_DOMAIN == '')) { //目前仅对绑定了独立域名的站点开放蜘蛛爬取
			return false;
		} else {
			return true;
		}
	}
	return false;
}

/**
 * 同步站点卖家服务店铺的推广链接
 */
function synUserShopClickUrl() {
	$shops = DS('xintao/userShop.getShopBySeller');
	if (!empty ($shops)) {
		foreach ($shops as $shop) {
			try {
				$taokeShops = F('top.taobaokeShopsConvert', -999, '未知模块', array (
					'sids' => $shop['sid']
				), true, false);
				if (!empty ($taokeShops) && count($taokeShops) == 1) {
					$rs = DR('xintao/userShop.saveByUserId', '', array (
						'click_url' => $taokeShops[0]['click_url']
					), $shop['sid'], $shop['user_id']);
				} else { //清空
					$rs = DR('xintao/userShop.saveByUserId', '', array (
						'click_url' => null
					), $shop['sid'], $shop['user_id']);
				}
			} catch (Exception $e) {

			}
		}
	}
}
/**
 * 同步站点内会员版本信息
 */
function synAppstore() {
	$admins = DS('mgr/adminCom.getAdmins');
	$results = array ();
	foreach ($admins as $admin) {
		try {
			$nick = $admin['user_nick'];
			$userId = $admin['user_id'];
			if (empty ($nick)) { //测试帐号
				continue;
			}
			$appstore = array ();
			$FREE_DATELINE = '';
			$APPSTORE_DATELINE = '';
			$ISCLOSED = false;
			//第一步：临时授权（是指系统可自由赠送使用服务及时间）
			$betas = V('-:beta');
			if (in_array($nick, array_keys($betas))) { //临时授权
				$beta = $betas[$nick];
				if ((!empty ($beta['dateline']) && time() < strtotime($beta['dateline'])) || $beta['dateline'] == '') {
					$appstore = $beta['appstore'];
					$APPSTORE_DATELINE = $beta['dateline'];
				}
			}
			//第二步：真实订购（真实付费使用的）
			if (empty ($appstore)) { //真实订购
				$codes = F('top.vasSubscribeGet', -999, '登录模块', array (
					'nick' => $nick,
					'article_code' => TB_ARTICLE_CODE_1,
					'app_key' => TB_APP_KEY_1,
					'app_secret' => TB_APP_SECRET_1
				), true);
				if ($codes == 9999 || $codes == 6001) { //如果该API出现错误，则停止该站长的同步
					continue;
				}
				if (!empty ($codes)) {
					foreach ($codes as $key) {
						$data = array ();
						$data[0] = $key['item_code'];
						$data[1] = $key['deadline'];
						$data[2] = $userId;
						$codesRs = DR('mgr/adminCom.saveAppstoreById', '', $data); //更新订购的服务项目
						$appstore[] = '[' . $key['item_code'] . ']';
					}
					$APPSTORE_DATELINE = F('getAppstoreDateline', $codes);
				}
			}
			//第三步：免费授权（是指为了吸引用户，提供3天的免费使用）
			if (count($appstore) == 1 && $appstore[0] == XT_APPSTORE_FREE) { //如果该用户仅订购了免费服务，提供3天的免费服务
				$free_ret = DR('xintao/free.getById', '', $userId);
				if (!$free_ret['rst']) { //还没有免费期，则新增(系统同步时不需要考虑新增)
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
			if (count($appstore) == 0) {
				$ISCLOSED = true;
			}
			if (!in_array(XT_APPSTORE_FREE, $appstore)) {
				$appstore[] = XT_APPSTORE_FREE;
			}
			$config_arr = array (
				'XT_APPSTORE' => implode(',', $appstore),
				'XT_FREE_DATELINE' => $FREE_DATELINE,
				'XT_APPSTORE_DATELINE' => $APPSTORE_DATELINE
			);
			//			if (!in_array(XT_APPSTORE_SELLER_MULTI, $appstore)) { //如果不是卖家版(目前仅判断多店铺)
			//				$config_arr['XT_SIDS'] = '';
			//				$config_arr['XT_SHOPS'] = '';
			//				$config_arr['XT_CIDS'] = '';
			//			}
			F('xintao.update_config_file', $config_arr, $userId); //更新
			$GROUP_ID = 4;
			if ($FREE_DATELINE != '') { //体验版
				$GROUP_ID = 3;
			}
			elseif (in_array(XT_APPSTORE_SELLER_MULTI, $appstore)) { //卖家
				$GROUP_ID = 7;
			}
			elseif (in_array(XT_APPSTORE_TAOKE, $appstore)) { //淘客
				$GROUP_ID = 5;
			}
			DS('mgr/adminCom.saveAdminByUserId', '', array (
				'group_id' => $ISCLOSED ? 0 : $GROUP_ID
			), $userId);
			if ($GROUP_ID == 7) { //如果不是卖家服务,则清空推广链接和店铺为卖家服务的标识
				DS('xintao/userShop.setIsSeller', '', 1, $userId);
			} else { //是卖家服务，则标识店铺为卖家服务
				DS('xintao/userShop.setIsSeller', '', 0, $userId);
			}
			$result = array ();
			$result['user_id'] = $userId;
			$result['user_nick'] = $nick;
			$result['appstore'] = $appstore;
			$result['free_dateling'] = $FREE_DATELINE;
			$results[] = $result;
		} catch (Exception $e) {
		}
	}
	synUserShopClickUrl();
	//print_r($results);
}
/**
 * 获得淘宝客推广站点
 */
function getTaokeSites() {
	$cache = CACHE :: get(TB_CACHE_KEY_PRE . 'taoke_sites');
	if (empty ($cache)) {
		try {
			$cache = array ();
			$result = json_decode(F('http_get_contents', 'http://www.xintaonet.com/router/site/adsite/search'), true);
			if (!empty ($result)) {
				$cache['sites'] = $result;
				$cache['count'] = count($result);
				CACHE :: set(TB_CACHE_KEY_PRE . 'taoke_sites', $cache, CACHE_24);
			}
		} catch (Exception $e) {
			$cache['sites'] = array ();
			$cache['count'] = 0;
		}
	}
	return $cache;
}
/**
 * 根据站内店铺昵称获取站内店铺SID
 */
function getSiteSidByNick($nick) {
	$shops = explode(',', XT_SHOPS);
	$sids = explode(',', XT_SIDS);
	$index = array_keys($shops, '[' . $nick . ']');
	if (isset ($sids[$index[0]])) {
		return str_replace(array (
			'[',
			']'
		), array (
			'',
			''
		), $sids[$index[0]]);
	}
	return '';
}
/**
 * 是否是站内店铺（根据SID）
 */
function isSiteShopById($sid) {
	return in_array('[' . $sid . ']', explode(',', XT_SIDS));
}
/**
 * 是否是站内店铺（根据NICK）
 */
function isSiteShopByNick($nick) {
	return in_array('[' . $nick . ']', explode(',', XT_SHOPS));
}
/**
 * 识别当前页面在当前站点是否可用
 */
function check_page($page_id) {
	$checks = V('-:check_pages');
	if (isset ($checks[$page_id])) {
		$xt_appstores = explode(',', XT_APPSTORE);
		$appstores = $checks[$page_id];
		foreach ($appstores as $appstore) {
			if (in_array($appstore, $xt_appstores)) { //已订购服务，则true，否则false
				return true;
			}
		}
		return false;
	}
	return true;
}
/**
 * 检查当前指定的服务项目是否已被订购
 */
function check_appstore($appstores) {
	if (!is_array($appstores)) {
		$appstores = array (
			$appstores
		);
	}
	$apps = explode(',', XT_APPSTORE);
	foreach ($appstores as $appstore) {
		if (in_array($appstore, $apps)) {
			return true;
		}
	}
	return false;
}

/**
 * 输出错误信息
 */
function xintao_error($msg) {
	ob_clean();
	if (!defined('W_BASE_URL')) {
		define('W_BASE_URL', '/');
	}
	//extract($args, EXTR_SKIP);//展开参数
	include_once dirname(__FILE__) . '/../../templates/mgr/xintao/e501.tpl.php';
	exit;
}
/**
 * 是否可访问
 * @param array
 */
function check_versionno() {
	$nowRoute = APP :: getRequestRoute();
	if (APP :: _isIgnorePreDo(explode(',', XT_FUNCS_FRONT))) { //是否属于收费功能
		if (!APP :: _isIgnorePreDo(explode(',', XT_SITE_FUNCS_FRONT))) { //是否已订购
			xintao_error('需订购增值服务');
		}
	}
}
/**
 * 检查app的真确性
 *
 * @param unknown_type
 * @return unknown
 */
function check_app($app_key, $app_secret, & $http_res) {
	global $_LANG;
	define('XWEIBO_ACCESS', true);
	include_once dirname(__FILE__) . "/../../install/libs/oauth.class.php";
	if (xwb_function_exists('fsockopen')) {
		include_once dirname(__FILE__) . "/../../install/libs/fsockopen.php";
		if (!ini_get('allow_url_fopen')) {
			exit ('fsockopen' . $_LANG['advice_fsockopen']);
			//show_msg('fsockopen'.$_LANG['advice_fsockopen']);
		}
	} else
		if (xwb_function_exists('curl', array (
				'init',
				'exec'
			))) {
			dirname(__FILE__) . "/../../install/libs/curl_http.php";
		}
	$http = new Http_Client();
	$http_res = $http;
	$url = 'http://api.t.sina.com.cn/oauth/request_token';
	$sha1_method = new OAuthSignatureMethod_HMAC_SHA1();
	$consumer = new OAuthConsumer($app_key, $app_secret);
	$request = OAuthRequest :: from_consumer_and_token($consumer, null, 'GET', $url, null);
	$request->sign_request($sha1_method, $consumer, null);
	$http_url = $request->to_url();
	$http->setUrl($http_url);
	$result = $http->request();
	$code = $http->getState();
	if ($code != '200') {
		return false;
	}
	return true;
}
/**
 * 检查方法是否可用
 *
 * @param string $func 函数名或扩展模块名
 * @param array $ext 扩展模块，具体的函数扩展名，可以多个
 *
 * @return bool
 */
function xwb_function_exists($func, $ext = false) {
	/// 获取被禁用的方法
	$disable_functions = ini_get('disable_functions');
	$result = true;
	if ($ext) {
		foreach ($ext as $var) {
			$func_name = $func . '_' . $var;
			if (strpos($disable_functions, $func) !== false || !function_exists($func_name)) {
				$result = false;
			}
		}
	} else {
		if (strpos($disable_functions, $func) !== false || !function_exists($func)) {
			$result = false;
		}
	}

	return $result;
}
/**
 * 保存更新独立域名
 */
function set_domain_config($domain) {
	$XT_DOMAINS = include (dirname(__FILE__) . '/../../xintao/domains.php');
	$XT_DOMAINS[$domain['domain']] = $domain['user_id']; //加入

	$vDataStr = var_export($XT_DOMAINS, true);
	$formatData = "<?php\n" .
	"//微博系统，独立域名绑定配置\n" .
	"//Created: " . date("M j, Y, G:i") . "\n" .
	"return " . $vDataStr . ";\n" .
	"?>";
	return IO :: write(dirname(__FILE__) . '/../../xintao/domains.php', $formatData);

}
/**
 * 保存更新补偿
 */
function set_buchang_config($domain) {
	$BUCHANG = include (dirname(__FILE__) . '/../../xintao/buchang.php');
	//删除当前补偿
	$keys = array_keys($BUCHANG);
	$count = 0;
	$nick = $domain['nick'];
	foreach ($keys as $key) {
		if ($key == $nick) {
			break;
		}
		$count++;
	}
	if ($count < (count($BUCHANG))) {
		array_splice($BUCHANG, $count, 1); //移除当前元素
	} else {
		return false;
	}
	$vDataStr = var_export($BUCHANG, true);
	$formatData = "<?php\n" .
	"//新淘网补偿\n" .
	"//Created: " . date("M j, Y, G:i") . "\n" .
	"return " . $vDataStr . ";\n" .
	"?>";
	return IO :: write(dirname(__FILE__) . '/../../xintao/buchang.php', $formatData);

}
/**
 * 保存更新补偿
 */
function set_betas_config($nick, $beta) {
	$BETAS = include (dirname(__FILE__) . '/../../xintao/betas.php');
	//增加临时授权
	$BETAS[$nick] = $beta; //加入

	$vDataStr = var_export($BETAS, true);
	$formatData = "<?php\n" .
	"//临时授权\n" .
	"//Created: " . date("M j, Y, G:i") . "\n" .
	"return " . $vDataStr . ";\n" .
	"?>";
	return IO :: write(dirname(__FILE__) . '/../../xintao/betas.php', $formatData);

}
/**
* 更新一个或者多个配置项 
* 可更新的配置项的名字与　值都必须用　'　做字符串定界
* 
* @param mixed $s	配置文件的内容
* @param mixed $k	配置项　或者　项=>值　关联数组
* @param mixed $v	如果 $k　为配置项　此值则为　新的配置值
* @return mixed	返回新的配置内容
* 
*/

function set_array_value($s, $k, $v = '') {
	if (is_array($k)) {
		foreach ($k as $kk => $vv) {
			$p = "#'" . preg_quote($kk) . "'\s*=>\s*'.*?'#sm";
			$s = preg_replace($p, "'" . $kk . "' => \\1'" . addslashes($vv) . "'", $s);
		}
		return $s;
	} else {
		$p = "#'" . preg_quote($k) . "'\s*=>\s*'.*?'#sm";
		return preg_replace($p, "'" . $k . "' => \\1'" . addslashes($v) . "'", $s);
	}
}
function init_sys($USER_ID, $USER_NICK, $db_host = DB_HOST, $db_user = DB_USER, $db_passwd = DB_PASSWD, $db_name = DB_NAME, $db_prefix = DB_PREFIX) {
	global $_LANG;
	$link = db_resource($db_host, $db_user, $db_passwd, $db_name);
	$sign = true;
	$skin = rand(1, 11);
	$data = array (
		"INSERT INTO `xwb_sys_config_" . (substr($USER_ID, strlen($USER_ID) - 1)) . "` VALUES ('rewrite_enable','1',1,USER_ID),('logo','',1,USER_ID),('login_way','1',1,USER_ID),('third_code','',1,USER_ID),('site_record','',1,USER_ID),('address_icon','',1,USER_ID),('head_link','',1,USER_ID),('foot_link','',1,USER_ID),('authen_type','3',1,USER_ID),('authen_big_icon','img/logo/big_auth_icon.png',1,USER_ID),('authen_small_icon','img/logo/small_auth_icon.png',1,USER_ID),('skin_default','SKIN',1,USER_ID),('ad_header','',1,USER_ID),('guide_auto_follow','1',1,USER_ID),('ad_footer','',1,USER_ID),('title','USER_NICK',2,USER_ID),('text','新版微博系统更新了大量功能，在原有体系基础上，提供了丰富的运营手段，帮助广大站长利用新浪微博的平台，架设属于自己网站的微博系统。',2,USER_ID),('bg_pic','',2,USER_ID),('oper','2',2,USER_ID),('topic','',2,USER_ID),('link','http://www.xintaowang.com',2,USER_ID),('btnTitle','了解更多',2,USER_ID),('guide_auto_follow_id','3',1,USER_ID),('authen_small_icon_title','我的站点认证',1,USER_ID),('ad_setting','',1,USER_ID),('microInterview_setting','',1,USER_ID),('wb_page_type','2',1,USER_ID),('wb_header_model','1',1,USER_ID),('wb_header_htmlcode','',1,USER_ID),('api_checking','',1,USER_ID),('xwb_discuz_url','',1,USER_ID),('xwb_discuz_enable','',1,USER_ID),('use_person_domain','0',1,USER_ID),('site_short_link','',1,USER_ID),('microLive_setting','',1,USER_ID),('default_use_custom','0',1,USER_ID),('open_user_local_relationship','0',1,USER_ID),('xwb_strategy','',1,USER_ID),('sysLoginModel','0',1,USER_ID),('xwb_login_group_id',84,1,USER_ID),('site_name','USER_NICK',1,USER_ID),('wb_version','2.2',1,USER_ID),('app_key', '3812233997',1,USER_ID),('app_secret', 'b79fe224dbed1917b323d464ecf11c94',1,USER_ID),('db_prefix', 'xwb_',1,USER_ID),('wb_lang_type','zh_cn',1,USER_ID),('celeb_banner','',1,USER_ID)",
		"INSERT INTO `xwb_admin`(`id`,`add_time`,`is_root`,`group_id`,`user_id`,`domain`,`user_nick`,`def_mod`,`is_expire`) VALUES ('3','1311032223', '0', 4, USER_ID, 'tUSER_ID.xintaowang.com','USER_NICK','pub',0);"
	);
	foreach ($data as $sql) {
		$sql = str_replace(array (
			'USER_ID',
			'USER_NICK',
			'SKIN'
		), array (
			$USER_ID,
			$USER_NICK,
			$skin
		), $sql);
		$sign = mysql_query($sql, $link);
		if (!$sign) {
			/// 错误日志
			install_log('sql: ' . $sql . " \r\nerrno: " . mysql_errno($link) . " \r\nerror: " . mysql_error($link));
		}
	}
	mysql_close($link);
	if (!$sign) {
		show_msg($_LANG['tables_create_error']);
	}
}
/**
 * 初始化新用户数据
 *
 * @param unknown_type
 * @return unknown
 */
function create_tables($VERSION, $USER_ID, $USER_NICK, $WB_AKEY = WB_DEFAULT_AKEY, $WB_SKEY = WB_DEFAULT_SKEY, $db_structure = 'structure', $lang_type = 'zh_cn', $db_host = DB_HOST, $db_user = DB_USER, $db_passwd = DB_PASSWD, $db_name = DB_NAME, $db_prefix = DB_PREFIX) {
	global $_LANG;
	$lang_type = 'zh_cn';
	$data_sql = $db_structure . '_' . $lang_type . '.5.sql'; //前缀（安装或升级）+语言（默认zh_cn）+版本号(目前三个版本号：4.淘客返利版|新淘卖家版，5独立卖家版)
	$fp = fopen(dirname(__FILE__) . '/../../xintao/install/data/' . $data_sql, 'r');
	$sql_items = fread($fp, filesize(dirname(__FILE__) . '/../../xintao/install/data/' . $data_sql));
	fclose($fp);

	/// 删除SQL行注释
	$sql_items = preg_replace('/^\s*(?:--|#).*/m', '', $sql_items);
	/// 删除SQL块注释
	$sql_items = preg_replace('/^\s*\/\*.*?\*\//ms', '', $sql_items);
	/// 代替表前缀
	$keywords = 'CREATE\s+TABLE(?:\s+IF\s+NOT\s+EXISTS)?|' . 'DROP\s+TABLE(?:\s+IF\s+EXISTS)?|' . 'ALTER\s+TABLE|' . 'UPDATE|' . 'REPLACE\s+INTO|' . 'DELETE\s+FROM|' . 'INSERT\s+INTO|' . 'LOCK\s+TABLES';
	$pattern = '/(' . $keywords . ')(\s*)`?' . 'xwb_' . '(\w+)`?(\s*)/i';
	$replacement = '\1\2`' . $db_prefix . '\3`\4';
	$sql_items = preg_replace($pattern, $replacement, $sql_items);

	$pattern = '/(UPDATE.*?WHERE)(\s*)`?' . 'xwb_' . '(\w+)`?(\s*\.)/i';
	$replacement = '\1\2`' . $db_prefix . '\3`\4';
	$sql_items = preg_replace($pattern, $replacement, $sql_items);

	$sql_items = str_replace("\r", '', $sql_items);
	$query_items = explode(";\n", $sql_items);
	//根据不同版本，增加不同个性化配置
	if ($VERSION == 'single' || $VERSION == 'multi') { //卖家
		//第一步：page_manager(模块表),不同版本有不同模块(目前仅在微博广场的页面主体添加单店铺，我的首页[含我的微博，我的消息，我的收藏]的侧边栏添加单店铺)
		$query_items[] = "INSERT INTO `xwb_page_manager_SUFFIX` VALUES (1, 106, '单店铺(含商品)', 1, 1, 1, 9995, 0, '{\"nick\":\"USER_NICK\",\"isCredit\":\"1\",\"isVolume\":\"1\",\"order_by\":\"popularity:desc\"}', USER_ID),(2, 110, '单店铺', 2, 0, 1, 9994, 0, '{\"nick\":\"USER_NICK\",\"isCredit\":\"1\",\"isVolume\":\"1\"}', USER_ID)";
		//第二步：导航条
		//卖家版公用
		$query_items[] = "INSERT INTO `xwb_nav` VALUES (500,'官方店铺',0,1,2,990,0,'',2,0,USER_ID)";
		//卖家版（含淘客）
		if ($VERSION == 'multi') {
			$query_items[] = "INSERT INTO `xwb_nav` VALUES (800,'影视频道',0,1,2,800,1,'',2,0,USER_ID),(499,'淘宝购物',0,1,3,998,0,'',2,0,USER_ID),(498,'导购画报',0,1,4,999,0,'',2,0,USER_ID)";
		}
	}
	elseif ($VERSION == 'taoke' || $VERSION == 'vancl') { //淘客
		//第二步：导航条
		if ($VERSION == 'taoke') {
			$query_items[] = "INSERT INTO `xwb_nav` VALUES (800,'影视频道',0,1,2,800,1,'',2,0,USER_ID),(499,'淘宝购物',0,1,3,998,0,'',2,0,USER_ID),(498,'导购画报',0,1,4,999,0,'',2,0,USER_ID)";
		}
		elseif ($VERSION == 'vancl') {
			$query_items[] = "INSERT INTO `xwb_nav` VALUES (494,'凡客诚品',0,1,6,997,0,'',2,0,USER_ID)";
		}
	}
	//装修微博广场，我的首页
	$query_items[] = "INSERT INTO `xwb_page_manager_SUFFIX` VALUES (1, 3, '用户推荐', 2, 6, 1, 8, 0, '{\"group_id\":\"84\",\"show_num\":\"3\"}',USER_ID),(2, 3, '推荐用户', 2, 3, 1, 9, 0, '{\"group_id\":\"84\"}',USER_ID),(2, 6, '话题推荐列表', 2, 4, 1, 10, 0, '{\"topic_get\":\"1\",\"topics\":[],\"topic_id\":0,\"tid\":[\"\"]}',USER_ID),(2, 7, '猜你喜欢', 2, 2, 1, 11, 0, '{\"show_num\":\"10\"}',USER_ID),(1, 14, '本站最新微博', 1, 2, 1, 363, 0, '{\"show_num\":\"10\"}',USER_ID),(1, 9, '随便看看', 1, 4, 1, 425, 0, '{\"show_num\":\"3\",\"source\":\"0\"}',USER_ID),(1, 7, '可能感兴趣', 2, 7, 1, 424, 0, '{\"show_num\":\"10\"}',USER_ID),(1, 15, '最新用户', 2, 4, 1, 423, 0, '{\"show_num\":\"10\"}',USER_ID),(1, 8, '同城微博', 1, 3, 1, 410, 0, '{\"source\":\"0\",\"page_type\":\"0\",\"show_num\":\"15\"}',USER_ID),(1, 16, '微博发布框', 1, 0, 1, 411, 0, '[]',USER_ID)";
	$tvAdsPic = array (
		'T1mIGzXottXXXXXXXX-190-300.png',
		'T15qauXoJzXXXXXXXX-190-300.png',
		'T1whuwXnVwXXXXXXXX-190-300.png',
		'T1dOiyXhdQXXXXXXXX-190-300.png',
		'T1lTCxXfNhXXXXXXXX-190-300.png',
		'T1BKqzXh0CXXXXXXXX-190-300.png'
	);
	$rands = array_rand($tvAdsPic, 2);
	//装修影视频道
	$query_items[] = "INSERT INTO `xwb_page_manager_SUFFIX` VALUES (800, 200, '影视搜索', 3, 0, 1, 9000, 1, '{\"c\":\"1\",\"o\":\"\"}',USER_ID),(801, 102, '淘宝客推广', 4, 0, 1, 9001, 1, '{\"source\":\"4\",\"pid\":\"\",\"sizecode\":\"\",\"width\":\"\",\"height\":\"\",\"type\":\"\",\"titlecolor\":\"0000FF\",\"descolor\":\"000000\",\"bgcolor\":\"FFFFFF\",\"bordercolor\":\"E6E6E6\",\"linkcolor\":\"008000\",\"bottomcolor\":\"FFFFFF\",\"anglesize\":\"0\",\"bgpic\":\"0\",\"icon\":\"0\",\"ad_client\":\"\",\"ad_slot\":\"\",\"ad_width\":\"\",\"ad_height\":\"\",\"cpro_id\":\"\",\"flash-url\":\"\",\"flash-width\":\"\",\"flash-height\":\"\",\"image-src\":\"http:\/\/www.xintaowang.com\/css\/default\/xintao\/taobao\/" . $tvAdsPic[$rands[0]] . "\",\"image-url\":\"\/items\",\"image-width\":\"175\",\"image-height\":\"300\",\"image-alt\":\"淘宝购物\",\"text-title\":\"\",\"text-link\":\"\",\"text-size\":\"16\"}',USER_ID),(801, 102, '淘宝客推广', 5, 0, 1, 9002, 1, '{\"source\":\"4\",\"pid\":\"\",\"sizecode\":\"\",\"width\":\"\",\"height\":\"\",\"type\":\"\",\"titlecolor\":\"0000FF\",\"descolor\":\"000000\",\"bgcolor\":\"FFFFFF\",\"bordercolor\":\"E6E6E6\",\"linkcolor\":\"008000\",\"bottomcolor\":\"FFFFFF\",\"anglesize\":\"0\",\"bgpic\":\"0\",\"icon\":\"0\",\"ad_client\":\"\",\"ad_slot\":\"\",\"ad_width\":\"\",\"ad_height\":\"\",\"cpro_id\":\"\",\"flash-url\":\"\",\"flash-width\":\"\",\"flash-height\":\"\",\"image-src\":\"http:\/\/www.xintaowang.com\/css\/default\/xintao\/taobao\/" . $tvAdsPic[$rands[1]] . "\",\"image-url\":\"\/items\",\"image-width\":\"175\",\"image-height\":\"300\",\"image-alt\":\"淘宝购物\",\"text-title\":\"\",\"text-link\":\"\",\"text-size\":\"16\"}',USER_ID)";
	$link = db_resource($db_host, $db_user, $db_passwd, $db_name);
	$sign = true;
	foreach ($query_items as $var) {
		$var = trim($var);
		if (empty ($var)) {
			continue;
		}
		$var = str_replace(array (
			'USER_ID',
			'USER_NICK',
			'SUFFIX'
		), array (
			$USER_ID,
			$USER_NICK,
			 (substr($USER_ID, strlen($USER_ID) - 1)) //分表后缀

	
		), $var); //fixed 替换用户标识
		$sign = mysql_query($var, $link);
		if (!$sign) {
			/// 错误日志
			install_log('sql: ' . $var . " \r\nerrno: " . mysql_errno($link) . " \r\nerror: " . mysql_error($link));
		}
	}

	mysql_close($link);
	if (!$sign) {
		show_msg($_LANG['tables_create_error']);
	} else {
		$config_arr = array (
			'XT_IS_INIT' => 'true'
		);
		update_config_file($config_arr, $USER_ID); //标识已初始化
	}
}
function get_config_path($USER_ID) {
	if ($USER_ID != 'www.xintaowang.com') {
		$len = strlen($USER_ID) - 2;
		$ID_PREV = substr($USER_ID, $len);
		if (!is_dir(dirname(__FILE__) . '/../../xintao/sites/' . $ID_PREV)) { //如果父目录不存在
			mkdir(dirname(__FILE__) . '/../../xintao/sites/' . $ID_PREV);
		}
		return dirname(__FILE__) . '/../../xintao/sites/' . $ID_PREV . '/' . $USER_ID . '.php';
	} else {
		return dirname(__FILE__) . '/../../xintao/www.xintaowang.com.php';
	}
}
function get_config_array_path($USER_ID) {
	$len = strlen($USER_ID) - 2;
	$ID_PREV = substr($USER_ID, $len);
	if (!is_dir(dirname(__FILE__) . '/../../xintao/sites/' . $ID_PREV)) { //如果父目录不存在
		mkdir(dirname(__FILE__) . '/../../xintao/sites/' . $ID_PREV);
	}
	return dirname(__FILE__) . '/../../xintao/sites/' . $ID_PREV . '/' . $USER_ID . '_array.php';
}
/**
 * 创建配置文件（数组模式）
 */
function set_config_array($USER_ID, $config_array = array ()) {
	global $_LANG;
	$CONFIG_FILE = get_config_array_path($USER_ID);
	if (!copy(dirname(__FILE__) . '/../../xintao/config_array.php', $CONFIG_FILE)) {
		echo '系统初始化出错，请联系客服QQ：153647646';
		exit;
	}
	/// 写配置文件
	$XT_CONFIG = include ($CONFIG_FILE);
	$config_keys = array_keys($config_array);
	foreach ($config_keys as $key) {
		$XT_CONFIG[$key] = $config_array[$key]; //新增或修改
	}
	$vDataStr = var_export($XT_CONFIG, true);
	$formatData = "<?php\n" .
	"//站长微博系统配置文件\n" .
	"//Created: " . date("M j, Y, G:i") . "\n" .
	"return " . $vDataStr . ";\n" .
	"?>";
	return IO :: write($CONFIG_FILE, $formatData);
}

/**
 * 修改user_config配置文件
 *
 * @param array $value
 * 
 * @return 
 */
function update_config_array($values, $USER_ID = '') {
	if ($USER_ID == '') {
		$USER_ID = XT_USER_ID;
	}
	$CONFIG_FILE = get_config_array_path($USER_ID);
	/// 写配置文件
	$XT_CONFIG = include ($CONFIG_FILE);
	$config_keys = array_keys($values);
	foreach ($config_keys as $key) {
		$XT_CONFIG[$key] = $values[$key]; //新增或修改
	}
	$vDataStr = var_export($XT_CONFIG, true);
	$formatData = "<?php\n" .
	"//站长微博系统配置文件\n" .
	"//Created: " . date("M j, Y, G:i") . "\n" .
	"return " . $vDataStr . ";\n" .
	"?>";
	return IO :: write($CONFIG_FILE, $formatData);
}
/**
 * 创建配置文件
 *
 * @param unknown_type
 * @return unknown
 */
function set_config_file($USER_ID, $config_array = array ()) {
	set_config_array($USER_ID, $config_array);
	//	global $_LANG;
	//	$CONFIG_FILE = get_config_path($USER_ID);
	//	if (!copy(dirname(__FILE__) . '/../../xintao/config.php', $CONFIG_FILE)) {
	//		echo '系统初始化出错，请联系客服QQ：153647646';
	//		exit;
	//	}
	//	/// 写配置文件
	//	$fp = fopen($CONFIG_FILE, 'r');
	//	if ($fp == false) {
	//		show_msg($_LANG['create_config_error']);
	//	} else {
	//		$config_content = fread($fp, filesize($CONFIG_FILE));
	//		$config_file = setDefineValue($config_content, $config_array);
	//		fclose($fp);
	//	}
	//	$fp = fopen($CONFIG_FILE, 'w');
	//	if (fwrite($fp, $config_file) === false) {
	//		show_msg($_LANG['write_config_error']);
	//	}
	//	fclose($fp);
}

/**
 * 修改user_config配置文件
 *
 * @param array $value
 * 
 * @return 
 */
function update_config_file($values, $USER_ID = '') {
	update_config_array($values, $USER_ID);
	//	global $_LANG;
	//	if ($USER_ID == '') {
	//		$USER_ID = XT_USER_ID;
	//	}
	//
	//	$CONFIG_FILE = get_config_path($USER_ID);
	//
	//	/// 写配置文件
	//	$fp = fopen($CONFIG_FILE, 'r');
	//	if ($fp == false) {
	//		show_msg($_LANG['create_config_error']);
	//	} else {
	//		$config_content = fread($fp, filesize($CONFIG_FILE));
	//		$config_file = setDefineValue($config_content, $values);
	//		fclose($fp);
	//	}
	//	$fp = fopen($CONFIG_FILE, 'w');
	//	if (fwrite($fp, $config_file) === false) {
	//		show_msg($_LANG['write_config_error']);
	//	}
	//	fclose($fp);
}

/**
 * 替换配置选的值
 *
 *
 */
function setDefineValue($s, $k, $v = '') {
	if (is_array($k)) {
		foreach ($k as $kk => $vv) {
			$p = "#define\s*\(\s*'" . preg_quote($kk) . "'\s*,(\s*)'.*?'\s*\)\s*;#sm";
			$s = preg_replace($p, "define('" . $kk . "',\\1'" . $vv . "');", $s);
		}
		return $s;
	} else {
		$p = "#define\s*\(\s*'" . preg_quote($k) . "'\s*,(\s*)'.*?'\s*\)\s*;#sm";
		return preg_replace($p, "define('" . $k . "',\\1'" . $v . "');", $s);
	}
}
/**
 * 创建数据库资源
 *
 * @param unknown_type
 * @return unknown
 */
function db_resource($db_host = null, $db_user = null, $db_passwd = null, $db_name = null, $ajax = false) {
	global $_LANG;
	$link = @ mysql_connect($db_host, $db_user, $db_passwd);
	if (!$link) {
		/// 错误日志
		install_log("sql: \r\nerrno: " . mysql_errno() . " \r\nerror: " . mysql_error());
		if ($ajax) {
			die($_LANG['database_connect_error']);
		}
		show_msg($_LANG['database_connect_error'], 'index.php?step=3');
	}
	if (!mysql_select_db($db_name, $link)) {
		if ($ajax) {
			return '-1';
			//die($_LANG['database_exists_error']);
		}
		show_msg($_LANG['database_exists_error']);
	}
	mysql_query('SET NAMES ' . DB_CHARSET, $link);
	return $link;
}
/**
 * 写错误日志
 *
 *
 */
function install_log($msg) {
	global $_LANG;

	$file_log = dirname(__FILE__) . '/../../xintao/install/data/log.php';
	$msg = sprintf("[%s]:\t%s\r\n", date("Y-m-d H:i:s"), $msg);
	if (!file_exists($file_log)) {
		$define_string = 'if(!defined("XWEIBO_ACCESS")) { exit("NOT ACCESS"); }';
		$msg = "<?php  " . $define_string . " ?> \r\n\r\n" . $msg;
	}
	$fp = fopen($file_log, 'ab');
	if ($fp === false) {
		show_msg($_LANG['create_log_error']);
	}
	flock($fp, LOCK_EX);
	if (fwrite($fp, $msg) === false) {
		show_msg($_LANG['write_log_error']);
	}
	flock($fp, LOCK_UN);
	@ fclose($fp);
}

/**
 * 错误提示信息
 *
 * @param unknown_type
 * @return unknown
 */
function show_msg($msg, $type = 1) {
	global $_LANG;
	//include 'templates/error.php';
	//include dirname(__FILE__) . '/../../install/templates/error.php';
	exit;
}