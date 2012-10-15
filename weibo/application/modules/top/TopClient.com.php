<?php
include ('Inflector.php');
class TopClient {
	//public $appkey = "12034285";

	//public $secretKey = "2c18a03c14736c62a0b70804618f8c45";

	public $appkey = TB_APP_KEY;

	public $secretKey = TB_APP_SECRET;

	public $gatewayUrl = TB_GATEWAY;

	public $format = "json";

	protected $signMethod = "md5";

	protected $apiVersion = "2.0";

	protected $sdkVersion = "top-sdk-php-20110711";

	protected function generateSign($params) {
		ksort($params);

		$stringToBeSigned = $this->secretKey;
		foreach ($params as $k => $v) {
			if ("@" != substr($v, 0, 1)) {
				$stringToBeSigned .= "$k$v";
			}
		}
		unset ($k, $v);
		$stringToBeSigned .= $this->secretKey;

		return strtoupper(md5($stringToBeSigned));
	}

	protected function curl($url, $postFields = null) {
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_FAILONERROR, false);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

		if (is_array($postFields) && 0 < count($postFields)) {
			$postBodyString = "";
			$postMultipart = false;
			foreach ($postFields as $k => $v) {
				if ("@" != substr($v, 0, 1)) //判断是不是文件上传
					{
					$postBodyString .= "$k=" . urlencode($v) . "&";
				} else //文件上传用multipart/form-data，否则用www-form-urlencoded
					{
					$postMultipart = true;
				}
			}
			unset ($k, $v);
			curl_setopt($ch, CURLOPT_POST, true);
			if ($postMultipart) {
				curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);
			} else {
				curl_setopt($ch, CURLOPT_POSTFIELDS, substr($postBodyString, 0, -1));
			}
		}
		$reponse = curl_exec($ch);

		if (curl_errno($ch)) {
			throw new Exception(curl_error($ch), 0);
		} else {
			$httpStatusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
			if (200 !== $httpStatusCode) {
				throw new Exception($reponse, $httpStatusCode);
			}
		}
		curl_close($ch);
		return $reponse;
	}

	protected function logCommunicationError($apiName, $requestUrl, $errorCode, $responseTxt) {
		$localIp = isset ($_SERVER["SERVER_ADDR"]) ? $_SERVER["SERVER_ADDR"] : "CLI";

		$date = date("Y-m-d H:i:s");
		$apiName = $apiName;
		$appkey = $this->appkey;
		$ip = $localIp;
		$os = PHP_OS;
		$sdkVersion = $this->sdkVersion;
		$request = $requestUrl;
		$errorCode = $errorCode;
		$response = str_replace("\n", "", $responseTxt);
		LOGSTR('top', "$sdkVersion-$apiName-$date-$ip-$appkey-$os]:$request|$errorCode|$response");
	}

	public function execute($request, $session = null) {
		//组装系统参数
		$sysParams["app_key"] = $this->appkey;
		$sysParams["v"] = $this->apiVersion;
		$sysParams["format"] = $this->format;
		$sysParams["sign_method"] = $this->signMethod;
		$sysParams["method"] = $request->getApiMethodName();
		$sysParams["timestamp"] = date("Y-m-d H:i:s");
		$sysParams["partner_id"] = $this->sdkVersion;
		if (null != $session) {
			$sysParams["session"] = $session;
		}

		//获取业务参数
		$apiParams = $request->getApiParas();

		//签名
		$sysParams["sign"] = $this->generateSign(array_merge($apiParams, $sysParams));

		//系统参数放入GET请求串

		$requestUrl = $this->gatewayUrl . "?";
		foreach ($sysParams as $sysParamKey => $sysParamValue) {
			$requestUrl .= "$sysParamKey=" . urlencode($sysParamValue) . "&";
		}
		$requestUrl = substr($requestUrl, 0, -1);

		//发起HTTP请求
		try {
			$resp = $this->curl($requestUrl, $apiParams);
		} catch (Exception $e) {
			$this->logCommunicationError($sysParams["method"], $requestUrl, "HTTP_ERROR_" . $e->getCode(), $e->getMessage());
			return false;
		}

		//解析TOP返回结果
		$respWellFormed = false;
		if ("json" == $this->format) {
			$tmp = preg_replace('/\n/', '<br/>', $resp);
			$respObject = json_decode($tmp, true); //增加第二个参数，转化为数组
			if (null !== $respObject) {
				$respWellFormed = true;
				foreach ($respObject as $propKey => $propValue) {
					$respObject = $propValue;
				}
			}
		} else
			if ("xml" == $this->format) {
				$respObject = @ simplexml_load_string($resp);
				if (false !== $respObject) {
					$respWellFormed = true;
				}
			}
		//返回的HTTP文本不是标准JSON或者XML，记下错误日志
		if (false === $respWellFormed && $sysParams["method"] != 'taobao.item.get') {
			$this->logCommunicationError($sysParams["method"], $requestUrl, "HTTP_RESPONSE_NOT_WELL_FORMED", $resp);
			return false;
		}

		//如果TOP返回了错误码，记录到业务错误日志中
		if (isset ($respObject['sub_code'])) {
			$this->logCommunicationError($sysParams["method"], $requestUrl, "", $resp);
			return RST(false, $respObject['code'], $respObject['sub_code'] . '|' . $respObject['sub_msg']);
		}
		elseif (isset ($respObject['code'])) {
			$this->logCommunicationError($sysParams["method"], $requestUrl, "", $resp);
			return RST(false, $respObject['code'], $respObject['msg']);
		}
		return RST($respObject);
	}

	public function exec($paramsArray) {
		if (!isset ($paramsArray["method"])) {
			trigger_error("No api name passed");
		}
		$inflector = new LtInflector;
		$inflector->conf["separator"] = ".";
		$class = ucfirst($inflector->camelize(substr($paramsArray["method"], 7)));
		$requestClassName = $class . "Request";
		$cFile = APP :: _getIncFile($class, 'top');
		require_once ($cFile);
		if (!class_exists($requestClassName)) {
			trigger_error("No such api: " . $paramsArray["method"]);
		}

		$session = isset ($paramsArray["session"]) ? $paramsArray["session"] : null;

		$req = new $requestClassName;
		foreach ($paramsArray as $paraKey => $paraValue) {
			$inflector->conf["separator"] = "_";
			$setterMethodName = $inflector->camelize($paraKey);
			$inflector->conf["separator"] = ".";
			$setterMethodName = "set" . $inflector->camelize($setterMethodName);
			if (method_exists($req, $setterMethodName)) {
				$req-> $setterMethodName ($paraValue);
			}
		}
		return $this->execute($req, $session);
	}
	/**
	 * 用户验证（新淘高清视频）
	 */
	public function newValidateSession($type = 'get') {
		$TopInfo = (object) $_GET;
		//if (!empty ($TopInfo->top_session)) {
		if ($TopInfo->top_appkey != TB_XTTV_APP_KEY) {
			APP :: tips(array (
				'msg' => '应用标识不正确',
				'tpl' => 'mgr/error',
				'baseskin' => false,
				'timeout' => 3,
				'location' => TB_XTTV_CONTAINER
			));
		}
		if (!strcmp($TopInfo->top_sign, base64_encode(md5(TB_XTTV_APP_KEY . $TopInfo->top_parameters . $TopInfo->top_session . TB_XTTV_APP_SECRET, true)))) {
			$encode = 'GBK';
			if (isset ($TopInfo->encode)) {
				$encode = $TopInfo->encode;
			}
			if (function_exists('mb_convert_encoding')) {
				$TopInfo->top_parameters = mb_convert_encoding(base64_decode($TopInfo->top_parameters), 'UTF-8', $encode);
			}
			elseif (function_exists('iconv')) {
				$TopInfo->top_parameters = iconv($encode, 'UTF-8' . "//IGNORE", base64_decode($TopInfo->top_parameters));
			}
			parse_str($TopInfo->top_parameters, $TopInfo->top_parameters);
			$time = (time() * 1000 - $TopInfo->top_parameters['ts']) / 1000 / 60;
			if ($time > 25) {
				APP :: tips(array (
					'msg' => '当前请求已过期，请重新登录',
					'tpl' => 'mgr/error',
					'baseskin' => false,
					'timeout' => 3,
					'location' => TB_XTTV_CONTAINER //指定的应用标识

					
				));
			}
			$TaobaoUser['nick'] = $TopInfo->top_parameters['visitor_nick'];
			$TaobaoUser['userId'] = $TopInfo->top_parameters['visitor_id'];
			if (array_key_exists('pid', $TopInfo->top_parameters) && !empty ($TopInfo->top_parameters['pid'])) {
				$TaobaoUser['pid'] = $TopInfo->top_parameters['pid'];
			} else {
				$TaobaoUser['pid'] = '';
			}
			if (array_key_exists('sid', $TopInfo->top_parameters) && !empty ($TopInfo->top_parameters['sid'])) {
				$TaobaoUser['sid'] = $TopInfo->top_parameters['sid'];
			} else {
				$TaobaoUser['sid'] = '';
			}
			$TaobaoUser['session'] = $TopInfo->top_session;
			$TaobaoUser['param'] = $TopInfo->top_parameters;
			$TaobaoUser['sign'] = $TopInfo->top_sign;
			if (isset ($TopInfo->callback_url))
				$TaobaoUser['callback'] = $TopInfo->callback_url;
			$TaobaoUser['appkey'] = $TopInfo->top_appkey;

			return $TaobaoUser;
		} else {
			return false;
		}
		//		} else {
		//			return false;
		//		}
	}
	/**
	 * 用户验证
	 */
	public function validateSession($type = 'get') {
		$TopInfo = (object) $_GET;
		if (!empty ($TopInfo->top_session)) {
			if ($TopInfo->top_appkey != TB_APP_KEY) {
				APP :: tips(array (
					'msg' => '应用标识不正确',
					'tpl' => 'mgr/error',
					'baseskin' => false,
					'timeout' => 3,
					'location' => TB_CONTAINER
				));
			}

			if (!strcmp($TopInfo->top_sign, base64_encode(md5(TB_APP_KEY . $TopInfo->top_parameters . $TopInfo->top_session . TB_APP_SECRET, true)))) {
				$encode = 'GBK';
				if (isset ($TopInfo->encode)) {
					$encode = $TopInfo->encode;
				}
				if (function_exists('mb_convert_encoding')) {
					$TopInfo->top_parameters = mb_convert_encoding(base64_decode($TopInfo->top_parameters), 'UTF-8', $encode);
				}
				elseif (function_exists('iconv')) {
					$TopInfo->top_parameters = iconv($encode, 'UTF-8' . "//IGNORE", base64_decode($TopInfo->top_parameters));
				}
				parse_str($TopInfo->top_parameters, $TopInfo->top_parameters);
				$time = (time() * 1000 - $TopInfo->top_parameters['ts']) / 1000 / 60;
				if ($time > 25) {
					APP :: tips(array (
						'msg' => '当前请求已过期，请重新登录',
						'tpl' => 'mgr/error',
						'baseskin' => false,
						'timeout' => 3,
						'location' => TB_CONTAINER //指定的应用标识

						
					));
				}
				$TaobaoUser['nick'] = $TopInfo->top_parameters['visitor_nick'];
				$TaobaoUser['userId'] = $TopInfo->top_parameters['visitor_id'];
				if (array_key_exists('pid', $TopInfo->top_parameters) && !empty ($TopInfo->top_parameters['pid'])) {
					$TaobaoUser['pid'] = $TopInfo->top_parameters['pid'];
				} else {
					$TaobaoUser['pid'] = '';
				}
				if (array_key_exists('sid', $TopInfo->top_parameters) && !empty ($TopInfo->top_parameters['sid'])) {
					$TaobaoUser['sid'] = $TopInfo->top_parameters['sid'];
				} else {
					$TaobaoUser['sid'] = '';
				}
				$TaobaoUser['session'] = $TopInfo->top_session;
				$TaobaoUser['param'] = $TopInfo->top_parameters;
				$TaobaoUser['sign'] = $TopInfo->top_sign;
				if (isset ($TopInfo->callback_url))
					$TaobaoUser['callback'] = $TopInfo->callback_url;
				$TaobaoUser['appkey'] = $TopInfo->top_appkey;

				return $TaobaoUser;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
	/**
	 * 添加收藏夹
	 */
	public function favoriteAdd($params) {
		$req_array = array ();
		$req_array['method'] = "taobao.favorite.add";
		if (isset ($params['item_numid']) && '' != $params['item_numid']) {
			$req_array['item_numid'] = $params['item_numid'];
		} else {
			return RST(false, '100000', '未指定收藏对象');
		}
		if (isset ($params['collect_type']) && '' != $params['collect_type']) {
			$req_array['collect_type'] = $params['collect_type'];
		} else {
			return RST(false, '100000', '未指定收藏类型');
		}
		if (isset ($params['shared']) && '' != $params['shared']) {
			$req_array['shared'] = $params['shared'];
		} else {
			$req_array['shared'] = 'true';
		}
		if (isset ($params['session']) && '' != $params['session']) {
			$req_array['session'] = $params['session'];
		} else {
			return RST(false, '100000', '您尚未登录淘宝授权');
		}
		//执行搜索
		$this->appkey = TB_APP_KEY;
		$this->secretKey = TB_APP_SECRET;
		return $this->exec($req_array);
	}
	/**
	 * 关注掌柜说
	 */
	public function jianghuFanFollow($params) {
		$req_array = array ();
		$req_array['method'] = "taobao.jianghu.fan.follow";
		if (isset ($params['shop_owner_id']) && '' != $params['shop_owner_id']) {
			$req_array['shop_owner_id'] = $params['shop_owner_id'];
		} else {
			return RST(false, '100000', '未指定卖要关注的掌柜');
		}
		if (isset ($params['session']) && '' != $params['session']) {
			$req_array['session'] = $params['session'];
		} else {
			return RST(false, '100000', '您尚未绑定淘宝');
		}
		//执行搜索
		$this->appkey = TB_APP_KEY;
		$this->secretKey = TB_APP_SECRET;
		return $this->exec($req_array);
	}
	/**
	 * 查询主动通知
	 */
	public function incrementCustomersGet($params) {
		$req_array = array ();
		$req_array['method'] = "taobao.increment.customers.get";
		if (isset ($params['nicks']) && '' != $params['nicks']) {
			$req_array['nicks'] = $params['nicks'];
		}
		if (isset ($params['page_size']) && '' != $params['page_size']) {
			$req_array['page_size'] = $params['page_size'];
		} else {
			$req_array['page_size'] = 40;
		}
		if (isset ($params['page_no']) && '' != $params['page_no']) {
			$req_array['page_no'] = $params['page_no'];
		} else {
			$req_array['page_no'] = 1;
		}
		//执行搜索
		$this->appkey = TB_APP_KEY;
		$this->secretKey = TB_APP_SECRET;
		return $this->exec($req_array);
	}
	/**
	 * 开通主动通知
	 */
	public function incrementCustomerPermit($session = '') {
		$req_array = array ();
		$req_array['method'] = "taobao.increment.customer.permit";
		if ('' != $session) {
			$req_array['session'] = $session;
		} else {
			return RST(false, '100000', '未指定卖家授权SESSION');
		}
		//执行搜索
		$this->appkey = TB_APP_KEY;
		$this->secretKey = TB_APP_SECRET;
		return $this->exec($req_array);
	}
	/**
	 * 关闭主动通知
	 */
	public function incrementCustomerStop($nick = '') {
		$req_array = array ();
		$req_array['method'] = "taobao.increment.customer.stop";
		if ('' != $nick) {
			$req_array['nick'] = $nick;
		} else {
			return RST(false, '100000', '未指定卖家nick');
		}
		//执行搜索
		$this->appkey = TB_APP_KEY;
		$this->secretKey = TB_APP_SECRET;
		return $this->exec($req_array);
	}
	/**
	 * 店铺类目
	 */
	public function shopcatsListGet() {
		$req_array = array ();
		$req_array['method'] = "taobao.shopcats.list.get";
		$req_array['fields'] = (isset ($params['fields']) && '' != $params['fields']) ? $params['fields'] : "cid,parent_cid,name,is_parent";
		//执行搜索
		$this->appkey = TB_APP_KEY;
		$this->secretKey = TB_APP_SECRET;
		return $this->exec($req_array);
	}
	/**
	 * 批量商品信息查询
	 */
	public function itemsListGet($params) {
		$req_array = array ();
		$req_array['method'] = "taobao.items.list.get";
		$req_array['fields'] = (isset ($params['fields']) && '' != $params['fields']) ? $params['fields'] : "num_iid,title,nick,price";
		if (isset ($params['num_iids']) && '' != $params['num_iids']) {
			$req_array['num_iids'] = $params['num_iids'];
		} else {
			return RST(false, '100000', '未指定商品标识列表');
		}
		//执行搜索
		$this->appkey = TB_APP_KEY;
		$this->secretKey = TB_APP_SECRET;
		return $this->exec($req_array);
	}
	/**
	 * 交易信息查询
	 */
	public function tradeGet($params) {
		$req_array = array ();
		$req_array['method'] = "taobao.trade.get";
		$req_array['fields'] = (isset ($params['fields']) && '' != $params['fields']) ? $params['fields'] : "orders.title,orders.pic_path,orders.price,orders.num,orders.num_iid";
		if (isset ($params['tid']) && '' != $params['tid']) {
			$req_array['tid'] = $params['tid'];
		} else {
			return RST(false, '100000', '未指定交易标识');
		}
		if (isset ($params['session']) && '' != $params['session']) {
			$req_array['session'] = $params['session'];
		} else {
			return RST(false, '100000', '未指定买家授权SESSION');
		}
		//执行搜索
		$this->appkey = TB_APP_KEY;
		$this->secretKey = TB_APP_SECRET;
		return $this->exec($req_array);
	}
	/**
	 * 商品信息查询
	 */
	public function itemGet($params) {
		$req_array = array ();
		$req_array['method'] = "taobao.item.get";
		$req_array['fields'] = (isset ($params['fields']) && '' != $params['fields']) ? $params['fields'] : "num_iid,title,nick,props_name,is_lightning_consignment,cid,props,pic_url,num,delist_time,location,price,post_fee,express_fee,ems_fee,item_imgs,sell_promise";
		if (isset ($params['num_iid']) && '' != $params['num_iid']) {
			$req_array['num_iid'] = $params['num_iid'];
		} else {
			return RST(false, '100000', '未指定商品标识');
		}
		//执行搜索
		$this->appkey = TB_APP_KEY_2;
		$this->secretKey = TB_APP_SECRET_2;
		return $this->exec($req_array);
	}
	/**
	 * 查询评价
	 */
	public function traderatesSearch($params) {
		$req_array = array ();
		$req_array['method'] = "taobao.traderates.search";

		if (isset ($params['num_iid']) && '' != $params['num_iid']) {
			$req_array['num_iid'] = $params['num_iid'];
		} else {
			return RST(false, $errno = 1210002, $err = 'Parameter must be a number');
		}
		if (isset ($params['seller_nick']) && '' != $params['seller_nick']) {
			$req_array['seller_nick'] = $params['seller_nick'];
		} else {
			return RST(false, $errno = 1210002, $err = 'Parameter seller_nick is not exist');
		}
		$req_array['page_no'] = 1;
		$req_array['page_size'] = 40;
		//执行搜索
		$this->appkey = TB_APP_KEY_2;
		$this->secretKey = TB_APP_SECRET_2;
		return $this->exec($req_array);
	}
	/**
	 * 商品描述信息查询（该方法主要是缓存加密后的详情描述，避免每次都要加密）
	 */
	public function itemDescGet($numIid) {
		$req_array = array ();
		$req_array['method'] = "taobao.item.get";
		$req_array['fields'] = "desc";
		if (is_numeric($numIid)) {
			$req_array['num_iid'] = $numIid;
		} else {
			return RST(false, $errno = 1210002, $err = 'Parameter must be a number');
		}
		//执行搜索
		$this->appkey = TB_APP_KEY_2;
		$this->secretKey = TB_APP_SECRET_2;
		$ret = $this->exec($req_array);
		$desc = '';
		if ($ret['rst']) {
			//第一步处理图片加密
			$desc = preg_replace("/src\=[\"\']*([^\>\s]{25,105}\.jpg|gif|png)/ie", "'data-original=\"'.base64_encode('\\1').'\"'", $ret['rst']['item']['desc']);
			//第二步处理商品链接转换（暂时交给前台处理吧，减轻后台压力）
		}
		return $desc;
	}
	/**
	 * 查询淘宝客关键词详细信息
	 */
	public function taobaokelisturlGet($q) {
		$req_array = array ();
		$req_array['method'] = "taobao.taobaoke.listurl.get";
		$req_array['q'] = $q;
		$req_array['outer_code'] = OUTER_CODE_KEYWORDS;
		$req_array['nick'] = XT_IS_CLOSED == 'true' ? 'fxy060608' : XT_USER_NICK;
		//$req_array['pid'] = XT_USER_SPID;
		//执行搜索
		$this->appkey = TB_APP_KEY_2;
		$this->secretKey = TB_APP_SECRET_2;
		return $this->exec($req_array);
	}
	/**
	 * 查询淘宝客推广商品详细信息
	 */
	public function taobaokeItemsDetailGet($params) {
		$req_array = array ();
		$req_array['method'] = "taobao.taobaoke.items.detail.get";
		$req_array['fields'] = (isset ($params['fields']) && '' != $params['fields']) ? $params['fields'] : "click_url,shop_click_url,seller_credit_score";
		if (isset ($params['num_iids']) && '' != $params['num_iids']) {
			$req_array['num_iids'] = $params['num_iids'];
		}
		$req_array['outer_code'] = OUTER_CODE_ITEMS;
		$req_array['nick'] = XT_IS_CLOSED == 'true' ? 'fxy060608' : XT_USER_NICK;
		//$req_array['pid'] = XT_USER_SPID;
		//执行搜索
		$this->appkey = TB_APP_KEY_2;
		$this->secretKey = TB_APP_SECRET_2;
		return $this->exec($req_array);
	}
	/**
	 * 店铺信息查询
	 */
	public function shopGet($params) {
		$req_array = array ();
		$req_array['method'] = "taobao.shop.get";
		$req_array['fields'] = (isset ($params['fields']) && '' != $params['fields']) ? $params['fields'] : "sid,cid,nick,title,pic_path,created,modified,shop_score";
		if (isset ($params['nick']) && '' != $params['nick']) {
			$req_array['nick'] = $params['nick'];
		}
		//执行搜索
		$this->appkey = TB_APP_KEY;
		$this->secretKey = TB_APP_SECRET;
		return $this->exec($req_array);
	}
	/**
	 * 用户信息查询
	 */
	public function userGet($params) {
		$req_array = array ();
		$req_array['method'] = "taobao.user.get";
		$req_array['fields'] = (isset ($params['fields']) && '' != $params['fields']) ? $params['fields'] : "user_id,uid,nick,sex,buyer_credit,seller_credit,created,last_visit,birthday,type,status,alipay_account,alipay_no,avatar,has_shop,email,online_gaming";
		if (isset ($params['nick']) && '' != $params['nick']) {
			$req_array['nick'] = $params['nick'];
		}
		if (isset ($params['session']) && '' != $params['session']) {
			$req_array['session'] = $params['session'];
		}
		//执行搜索
		$this->appkey = TB_APP_KEY;
		$this->secretKey = TB_APP_SECRET;
		return $this->exec($req_array);
	}
	/**
	 * 淘宝客类目推广URL
	 */
	public function taobaokeCaturlGet($params) {
		$req_array = array ();
		$req_array['method'] = "taobao.taobaoke.caturl.get";
		if (isset ($params['q']) && '' != $params['q']) {
			$req_array['q'] = $params['q'];
		}
		if (isset ($params['cid']) && '' != $params['cid']) {
			$req_array['cid'] = $params['cid'];
		}
		$req_array['outer_code'] = OUTER_CODE_CATS;
		$req_array['nick'] = XT_IS_CLOSED == 'true' ? 'fxy060608' : XT_USER_NICK;
		//$req_array['pid'] = XT_USER_SPID;
		//执行搜索
		$this->appkey = TB_APP_KEY_2;
		$this->secretKey = TB_APP_SECRET_2;
		return $this->exec($req_array);
	}
	/**
	 * 收费项目查询
	 */
	public function vasSubscribeGet($params) {
		$req_array = array ();
		$req_array['method'] = "taobao.vas.subscribe.get";
		if (isset ($params['nick']) && '' != $params['nick']) {
			$req_array['nick'] = $params['nick'];
		} else {
			return RST(false, '100000', '未指定会员昵称');
		}
		if (isset ($params['article_code']) && '' != $params['article_code']) {
			$req_array['article_code'] = $params['article_code'];
		} else {
			return RST(false, '100000', '未指定应用收费代码');
		}
		if (isset ($params['app_key']) && '' != $params['app_key']) {
			$this->appkey = $params['app_key'];
		} else {
			return RST(false, '100000', '未指定app_key');
		}
		if (isset ($params['app_secret']) && '' != $params['app_secret']) {
			$this->secretKey = $params['app_secret'];
		} else {
			return RST(false, '100000', '未指定app_secret');
		}
		//执行搜索
		return $this->exec($req_array);
	}
	/**
	 * 淘宝客店铺搜索
	 */
	public function taobaokeShopsGet($params) {
		$req_array = array ();
		$req_array['method'] = "taobao.taobaoke.shops.get";
		$req_array['fields'] = (isset ($params['fields']) && '' != $params['fields']) ? $params['fields'] : "user_id,click_url,shop_title,commission_rate,seller_credit,shop_type,auction_count,total_auction";

		if (isset ($params['cid']) && '' != $params['cid']) {
			$req_array['cid'] = $params['cid'];
		}
		if (isset ($params['start_credit']) && '' != $params['start_credit']) {
			$req_array['start_credit'] = $params['start_credit'];
		}
		if (isset ($params['end_credit']) && '' != $params['end_credit']) {
			$req_array['end_credit'] = $params['end_credit'];
		}
		if (isset ($params['start_commissionrate']) && '' != $params['start_commissionrate']) {
			$req_array['start_commissionrate'] = $params['start_commissionrate'] * 100;
		}
		if (isset ($params['end_commissionrate']) && '' != $params['end_commissionrate']) {
			$req_array['end_commissionrate'] = $params['end_commissionrate'] * 100;
		}
		if (isset ($params['start_auctioncount']) && '' != $params['start_auctioncount']) {
			$req_array['start_auctioncount'] = $params['start_auctioncount'];
		}
		if (isset ($params['end_auctioncount']) && '' != $params['end_auctioncount']) {
			$req_array['end_auctioncount'] = $params['end_auctioncount'];
		}
		if (isset ($params['only_mall']) && '' != $params['only_mall']) {
			$req_array['only_mall'] = $params['only_mall'];
		}
		if (isset ($params['keyword']) && '' != $params['keyword']) {
			$req_array['keyword'] = $params['keyword'];
		}
		if (isset ($params['show_num']) && '' != $params['show_num']) {
			$req_array['page_size'] = $params['show_num'];
		} else {
			$req_array['page_size'] = 5;
		}
		if (isset ($params['page_no']) && '' != $params['page_no']) {
			$req_array['page_no'] = $params['page_no'];
		} else {
			$req_array['page_no'] = 1;
		}

		$req_array['outer_code'] = OUTER_CODE_SHOPS;
		$req_array['nick'] = XT_IS_CLOSED == 'true' ? 'fxy060608' : XT_USER_NICK;
		//$req_array['pid'] = XT_USER_SPID;

		//执行搜索
		$this->appkey = TB_APP_KEY_2;
		$this->secretKey = TB_APP_SECRET_2;
		return $this->exec($req_array);
	}
	/**
	 * 淘画报---获得频道详情
	 */
	public function posterChannelGet($channel_id) {
		//		$req_array = array ();
		//		$req_array['method'] = "taobao.poster.channel.get";
		//		if (isset ($channel_id) && '' != $channel_id) {
		//			$req_array['channel_id'] = $channel_id;
		//		} else {
		//			return RST(false, '100000', '未指定频道标识');
		//		}
		//		//执行搜索
		//		$this->appkey = TB_APP_KEY;
		//		$this->secretKey = TB_APP_SECRET;
		//		return $this->exec($req_array);
		exit ('淘宝不再支持画报');
	}
	/**
	 * 淘画报---获得画报所有频道
	 */
	public function posterChannelsGet() {
		//		$req_array = array ();
		//		$req_array['method'] = "taobao.poster.channels.get";
		//
		//		//执行搜索
		//		$this->appkey = TB_APP_KEY;
		//		$this->secretKey = TB_APP_SECRET;
		//		return $this->exec($req_array);
		exit ('淘宝不再支持画报');
	}
	/**
	 * 淘画报---搜索画报
	 */
	public function posterPostersSearch($params) {
		//		$req_array = array ();
		//		$req_array['method'] = "taobao.poster.posters.search";
		//
		//		if (isset ($params['channel_ids']) && '' != $params['channel_ids']) {
		//			$req_array['channel_ids'] = $params['channel_ids'];
		//		} else {
		//			//默认搜索所有频道
		//			$req_array['channel_ids'] = '1,2,3,4,5,6,7,8,9,10,11,13,14,15,16,17,18,19,20,21';
		//		}
		//		if (isset ($params['key_word']) && '' != $params['key_word']) {
		//			$req_array['key_word'] = $params['key_word'];
		//		}
		//		if (isset ($params['date']) && '' != $params['date']) {
		//			if ('today' == $params['date']) {
		//				$date = date("Y-m-d") . ' 00:00:00';
		//				$req_array['start_date'] = $date;
		//				$req_array['end_date'] = date("Y-m-d", time() + 24 * 60 * 60 * 1) . ' 00:00:00';
		//			}
		//			elseif ('yesterday' == $params['date']) {
		//				$yesterday = date("Y-m-d", time() - 24 * 60 * 60 * 1) . ' 00:00:00';
		//				$req_array['start_date'] = $yesterday;
		//				$req_array['end_date'] = date("Y-m-d") . ' 00:00:00';
		//			}
		//			elseif ('week' == $params['date']) {
		//				$week = date("Y-m-d", time() - 24 * 60 * 60 * 7) . ' 00:00:00';
		//				$req_array['start_date'] = $week;
		//				$req_array['end_date'] = date("Y-m-d", time() + 24 * 60 * 60 * 1) . ' 00:00:00';
		//			}
		//			elseif ('month' == $params['date']) {
		//				$month = date("Y-m-d", time() - 24 * 60 * 60 * 30) . ' 00:00:00';
		//				$req_array['start_date'] = $month;
		//				$req_array['end_date'] = date("Y-m-d", time() + 24 * 60 * 60 * 1) . ' 00:00:00';
		//			}
		//		}
		//		if (isset ($params['show_num']) && '' != $params['show_num']) {
		//			$req_array['page_size'] = $params['show_num'];
		//		} else {
		//			$req_array['page_size'] = 5;
		//		}
		//		if (isset ($params['page_no']) && '' != $params['page_no']) {
		//			$req_array['page_no'] = $params['page_no'];
		//		} else {
		//			$req_array['page_no'] = 1;
		//		}
		//		//执行搜索
		//		$this->appkey = TB_APP_KEY;
		//		$this->secretKey = TB_APP_SECRET;
		//		return $this->exec($req_array);
		exit ('淘宝不再支持画报');
	}
	/**
	 * 取淘画报-指定频道Id的画报列表
	 */
	public function posterPostersGet($params) {
		//		$req_array = array ();
		//		$req_array['method'] = "taobao.poster.posters.get";
		//
		//		if (isset ($params['channel_id']) && '' != $params['channel_id']) {
		//			$req_array['channel_id'] = $params['channel_id'];
		//		} else {
		//			$req_array['channel_id'] = 0;
		//		}
		//
		//		if (isset ($params['show_num']) && '' != $params['show_num']) {
		//			$req_array['page_size'] = $params['show_num'];
		//		} else {
		//			$req_array['page_size'] = 5;
		//		}
		//		if (isset ($params['page_no']) && '' != $params['page_no']) {
		//			$req_array['page_no'] = $params['page_no'];
		//		} else {
		//			$req_array['page_no'] = 1;
		//		}
		//
		//		//执行搜索
		//		$this->appkey = TB_APP_KEY;
		//		$this->secretKey = TB_APP_SECRET;
		//		return $this->exec($req_array);
		exit ('淘宝不再支持画报');
	}
	/**
	 * 取无线画报-指定频道Id的画报列表
	 */
	public function huabaoPostersGet($params) {
		//		$req_array = array ();
		//		$req_array['method'] = "taobao.huabao.posters.get";
		//
		//		if (isset ($params['channel_id']) && '' != $params['channel_id']) {
		//			$req_array['channel_id'] = $params['channel_id'];
		//		} else {
		//			$req_array['channel_id'] = 0;
		//		}
		//
		//		if (isset ($params['show_num']) && '' != $params['show_num']) {
		//			$req_array['page_size'] = $params['show_num'];
		//		} else {
		//			$req_array['page_size'] = 5;
		//		}
		//		if (isset ($params['page_no']) && '' != $params['page_no']) {
		//			$req_array['page_no'] = $params['page_no'];
		//		} else {
		//			$req_array['page_no'] = 1;
		//		}
		//
		//		//执行搜索
		//		$this->appkey = TB_APP_KEY;
		//		$this->secretKey = TB_APP_SECRET;
		//		return $this->exec($req_array);
		exit ('淘宝不再支持画报');
	}
	/**
	 * 获取淘画报-指定画报列表
	 */
	public function posterAppointedpostersGet($params) {
		//		$req_array = array ();
		//		$req_array['method'] = "taobao.poster.appointedposters.get";
		//
		//		if (isset ($params['channel_ids']) && '' != $params['channel_ids']) {
		//			$req_array['channel_ids'] = $params['channel_ids'];
		//		} else {
		//			$req_array['channel_ids'] = 0;
		//		}
		//
		//		if (isset ($params['show_num']) && '' != $params['show_num']) {
		//			$req_array['re_num'] = $params['show_num'];
		//		} else {
		//			$req_array['re_num'] = 5;
		//		}
		//		if (isset ($params['appointed_type']) && '' != $params['appointed_type']) {
		//			$req_array['appointed_type'] = $params['type'];
		//		} else {
		//			$req_array['appointed_type'] = 'HOT';
		//		}
		//
		//		//执行搜索
		//		$this->appkey = TB_APP_KEY;
		//		$this->secretKey = TB_APP_SECRET;
		//		return $this->exec($req_array);
		exit ('淘宝不再支持画报');
	}
	/**
	 * 获取无线画报-指定画报列表
	 */
	public function huabaoSpecialpostersGet($params) {
		//		$req_array = array ();
		//		$req_array['method'] = "taobao.huabao.specialposters.get";
		//
		//		if (isset ($params['channel_ids']) && '' != $params['channel_ids']) {
		//			$req_array['channel_ids'] = $params['channel_ids'];
		//		} else {
		//			$req_array['channel_ids'] = 0;
		//		}
		//
		//		if (isset ($params['show_num']) && '' != $params['show_num']) {
		//			$req_array['number'] = $params['show_num'];
		//		} else {
		//			$req_array['number'] = 5;
		//		}
		//		if (isset ($params['type']) && '' != $params['type']) {
		//			$req_array['type'] = $params['type'];
		//		} else {
		//			$req_array['type'] = 'HOT';
		//		}
		//
		//		//执行搜索
		//		$this->appkey = TB_APP_KEY;
		//		$this->secretKey = TB_APP_SECRET;
		//		return $this->exec($req_array);
		exit ('淘宝不再支持画报');
	}
	/**
	 * 获取淘画报-指定画报
	 */
	public function posterPosterdetailGet($poster_id) {
		//		$req_array = array ();
		//		$req_array['method'] = "taobao.poster.posterdetail.get";
		//
		//		if (isset ($poster_id) && '' != $poster_id) {
		//			if (!is_numeric($poster_id)) {
		//				return RST(false, '1210002', '画报标识格式不正确');
		//			}
		//			$req_array['poster_id'] = $poster_id;
		//		} else {
		//			return RST(false, '100000', '未指定画报标识');
		//		}
		//		//执行搜索
		//		$this->appkey = TB_APP_KEY_2;
		//		$this->secretKey = TB_APP_SECRET_2;
		//		return $this->exec($req_array);
		exit ('淘宝不再支持画报');
	}
	/**
	 * 获取无线画报-指定画报列表
	 */
	public function huabaoPosterGet($params) {
		//		$req_array = array ();
		//		$req_array['method'] = "taobao.huabao.poster.get";
		//
		//		if (isset ($params['poster_id']) && '' != $params['poster_id']) {
		//			$req_array['poster_id'] = $params['poster_id'];
		//		} else {
		//			return RST(false, '100000', '未指定画报标识');
		//		}
		//		//执行搜索
		//		$this->appkey = TB_APP_KEY;
		//		$this->secretKey = TB_APP_SECRET;
		//		return $this->exec($req_array);
		exit ('淘宝不再支持画报');
	}
	/**
	 * 取得淘画报-画报相关商品信息
	 */
	public function posterPosterGoodsinfoGet($poster_id) {
		//		$req_array = array ();
		//		$req_array['method'] = "taobao.poster.postauctions.get";
		//
		//		if (isset ($poster_id) && '' != $poster_id) {
		//			if (!is_numeric($poster_id)) {
		//				return RST(false, '1210002', '画报标识格式不正确');
		//			}
		//			$req_array['poster_id'] = $poster_id;
		//		} else {
		//			return RST(false, '100000', '未指定画报标识');
		//		}
		//		//执行搜索
		//		$this->appkey = TB_APP_KEY;
		//		$this->secretKey = TB_APP_SECRET;
		//		return $this->exec($req_array);
		exit ('淘宝不再支持画报');
	}
	/**
	 * 取得无线画报-画报相关商品信息
	 */
	public function huabaoPosterGoodsinfoGet($poster_id) {
		//		$req_array = array ();
		//		$req_array['method'] = "taobao.huabao.poster.goodsinfo.get";
		//
		//		if (isset ($poster_id) && '' != $poster_id) {
		//			$req_array['poster_id'] = $poster_id;
		//		} else {
		//			return RST(false, '100000', '未指定画报标识');
		//		}
		//		//执行搜索
		//		$this->appkey = TB_APP_KEY;
		//		$this->secretKey = TB_APP_SECRET;
		//		return $this->exec($req_array);
		exit ('淘宝不再支持画报');
	}
	/**
	 * 获取后台供卖家发布商品的标准商品类目
	 */
	public function itemcatsGet($params) {
		$req_array = array ();
		$req_array['method'] = "taobao.itemcats.get";
		$req_array['fields'] = (isset ($params['fields']) && '' != $params['fields']) ? $params['fields'] : "cid,parent_cid,name,is_parent";

		if (isset ($params['cid']) && '' != $params['cid']) {
			$req_array['parent_cid'] = $params['cid'];
		}

		if (isset ($params['cids']) && '' != $params['cids']) {
			$req_array['cids'] = $params['cids'];
		}

		if (isset ($params['datetime']) && '' != $params['datetime']) {
			$req_array['datetime'] = $params['datetime'];
		}

		//执行搜索
		$this->appkey = TB_APP_KEY;
		$this->secretKey = TB_APP_SECRET;
		return $this->exec($req_array);
	}

	/**
	 * 获取标准商品类目属性
	 */
	public function itempropsGet($params) {
		$req_array = array ();
		$req_array['method'] = "taobao.itemprops.get";
		$req_array['fields'] = (isset ($params['fields']) && '' != $params['fields']) ? $params['fields'] : "pid,name,must,multi,prop_values,sort_order";

		if (isset ($params['cid']) && '' != $params['cid']) {
			$req_array['cid'] = $params['cid'];
		} else {
			return RST(false, '100000', '未指定叶子类目标识');
		}

		//暂时没有必要处理其他条件的查询了，

		//执行搜索
		$this->appkey = TB_APP_KEY;
		$this->secretKey = TB_APP_SECRET;
		return $this->exec($req_array);
	}
	/**
	 * 淘宝客店铺转换
	 */
	public function taobaokeShopsConvert($params) {
		$req_array = array ();
		$req_array['method'] = "taobao.taobaoke.shops.convert";
		$req_array['fields'] = (isset ($params['fields']) && '' != $params['fields']) ? $params['fields'] : "user_id,shop_title,click_url,commission_rate,seller_credit,shop_type,total_auction,auction_count";

		if (isset ($params['sids']) && '' != $params['sids']) {
			$req_array['sids'] = $params['sids'];
		} else {
			return RST(false, '100000', '未指定店铺标识');
		}
		$req_array['outer_code'] = OUTER_CODE_SHOPS;
		$req_array['nick'] = XT_IS_CLOSED == 'true' ? 'fxy060608' : XT_USER_NICK;
		//$req_array['pid'] = XT_USER_SPID;
		//执行搜索
		$this->appkey = TB_APP_KEY_2;
		$this->secretKey = TB_APP_SECRET_2;
		return $this->exec($req_array);
	}

	/**
	 * 淘宝客商品转换
	 */
	public function taobaokeItemsConvert($params) {
		$req_array = array ();
		$req_array['method'] = "taobao.taobaoke.items.convert";
		$req_array['fields'] = (isset ($params['fields']) && '' != $params['fields']) ? $params['fields'] : "num_iid,title,nick,pic_url,price,click_url,commission,ommission_rate,commission_num,commission_volume,shop_click_url,seller_credit_score,item_location,volume";

		if (isset ($params['num_iids']) && '' != $params['num_iids']) {
			$req_array['num_iids'] = $params['num_iids'];
		} else {
			return RST(false, '100000', '未指定商品标识');
		}
		if (isset ($params['is_mobile']) && '' != $params['is_mobile']) {
			$req_array['is_mobile'] = $params['is_mobile'];
		}

		$req_array['outer_code'] = OUTER_CODE_ITEMS;
		$req_array['nick'] = XT_IS_CLOSED == 'true' ? 'fxy060608' : XT_USER_NICK;
		//$req_array['pid'] = XT_USER_SPID;
		//执行搜索
		$this->appkey = TB_APP_KEY_2;
		$this->secretKey = TB_APP_SECRET_2;
		return $this->exec($req_array);
	}
	/**
	 * 淘宝客商品搜索
	 */
	public function taobaokeItemsGet($params) {
		$req_array = array ();
		$req_array['method'] = "taobao.taobaoke.items.get";
		$req_array['fields'] = (isset ($params['fields']) && '' != $params['fields']) ? $params['fields'] : "num_iid,title,nick,pic_url,price,click_url,commission,commission_rate,commission_num,commission_volume,shop_click_url,seller_credit_score,item_location,volume";
		if (isset ($params['keyword']) && '' != $params['keyword']) {
			$req_array['keyword'] = $params['keyword'];
		}
		if (isset ($params['cid']) && '' != $params['cid']) {
			$req_array['cid'] = $params['cid'];
		}
		if (isset ($params['start_price']) && '' != $params['start_price']) {
			$req_array['start_price'] = $params['start_price'];
		}
		if (isset ($params['end_price']) && '' != $params['end_price']) {
			$req_array['end_price'] = $params['end_price'];
		}

		if (isset ($params['area']) && '' != $params['area']) {
			$req_array['area'] = $params['area'];
		}
		if (isset ($params['start_credit']) && '' != $params['start_credit']) {
			$req_array['start_credit'] = $params['start_credit'];
		}
		if (isset ($params['end_credit']) && '' != $params['end_credit']) {
			$req_array['end_credit'] = $params['end_credit'];
		}
		if (isset ($params['sort']) && '' != $params['sort']) {
			$req_array['sort'] = $params['sort'];
		}
		if (isset ($params['guarantee']) && '' != $params['guarantee']) {
			$req_array['guarantee'] = $params['guarantee'];
		}
		if (isset ($params['start_commissionRate']) && '' != $params['start_commissionRate']) {
			$req_array['start_commissionRate'] = $params['start_commissionRate'] * 100;
		}

		if (isset ($params['end_commissionRate']) && '' != $params['end_commissionRate']) {
			$req_array['end_commissionRate'] = $params['end_commissionRate'] * 100;
		}
		if (isset ($params['start_commissionNum']) && '' != $params['start_commissionNum']) {
			$req_array['start_commissionNum'] = $params['start_commissionNum'];
		}
		if (isset ($params['end_commissionNum']) && '' != $params['end_commissionNum']) {
			$req_array['end_commissionNum'] = $params['end_commissionNum'];
		}
		if (isset ($params['start_totalnum']) && '' != $params['start_totalnum']) {
			$req_array['start_totalnum'] = $params['start_totalnum'];
		}
		if (isset ($params['end_totalnum']) && '' != $params['end_totalnum']) {
			$req_array['end_totalnum'] = $params['end_totalnum'];
		}

		if (isset ($params['cash_coupon']) && '' != $params['cash_coupon']) {
			$req_array['cash_coupon'] = $params['cash_coupon'];
		}
		if (isset ($params['vip_card']) && '' != $params['vip_card']) {
			$req_array['vip_card'] = $params['vip_card'];
		}
		if (isset ($params['overseas_item']) && '' != $params['overseas_item']) {
			$req_array['overseas_item'] = $params['overseas_item'];
		}
		if (isset ($params['sevendays_return']) && '' != $params['sevendays_return']) {
			$req_array['sevendays_return'] = $params['sevendays_return'];
		}
		if (isset ($params['real_describe']) && '' != $params['real_describe']) {
			$req_array['real_describe'] = $params['real_describe'];
		}
		if (isset ($params['onemonth_repair']) && '' != $params['onemonth_repair']) {
			$req_array['onemonth_repair'] = $params['onemonth_repair'];
		}
		if (isset ($params['cash_ondelivery']) && '' != $params['cash_ondelivery']) {
			$req_array['cash_ondelivery'] = $params['cash_ondelivery'];
		}
		if (isset ($params['mall_item']) && '' != $params['mall_item']) {
			$req_array['mall_item'] = $params['mall_item'];
		}
		if (isset ($params['is_mobile']) && '' != $params['is_mobile']) {
			$req_array['is_mobile'] = $params['is_mobile'];
		}

		if (isset ($params['page_no']) && '' != $params['page_no']) {
			$req_array['page_no'] = $params['page_no'];
		}
		if (isset ($params['show_num']) && '' != $params['show_num']) {
			$req_array['page_size'] = $params['show_num'];
		}
		$req_array['outer_code'] = OUTER_CODE_SHOPS;
		$req_array['nick'] = XT_IS_CLOSED == 'true' ? 'fxy060608' : XT_USER_NICK;
		//$req_array['pid'] = XT_USER_SPID;
		//执行搜索
		$this->appkey = TB_APP_KEY_2;
		$this->secretKey = TB_APP_SECRET_2;
		return $this->exec($req_array);
	}
	/**
	 * 商品搜索
	 */
	public function itemsSearch($params) {
		$req_array = array ();
		$req_array['method'] = "taobao.items.search";
		$req_array['fields'] = (isset ($params['fields']) && '' != $params['fields']) ? $params['fields'] : "num_iid";
		if (isset ($params['q']) && '' != $params['q']) {
			$req_array['q'] = $params['q'];
		}
		if (isset ($params['cid']) && '' != $params['cid']) {
			$req_array['cid'] = $params['cid'];
		}
		if (isset ($params['nicks']) && '' != $params['nicks']) {
			$req_array['nicks'] = $params['nicks'];
		}
		if (isset ($params['props']) && '' != $params['props']) {
			$req_array['props'] = $params['props'];
		}
		if (isset ($params['product_id']) && '' != $params['product_id']) {
			$req_array['product_id'] = $params['product_id'];
		}
		if (isset ($params['order_by']) && '' != $params['order_by']) {
			$req_array['order_by'] = $params['order_by'];
		}
		if (isset ($params['ww_status']) && '' != $params['ww_status']) {
			$req_array['ww_status'] = $params['ww_status'] ? 'true' : '';
		}
		if (isset ($params['post_free']) && '' != $params['post_free']) {
			$req_array['post_free'] = $params['post_free'] ? 'true' : '';
		}
		if (isset ($params['state']) && '' != $params['state']) {
			$req_array['location.state'] = $params['state'];
		}
		if (isset ($params['city']) && '' != $params['city']) {
			$req_array['location.city'] = $params['city'];
		}
		if (isset ($params['is_3D']) && '' != $params['is_3D']) {
			$req_array['is_3D'] = $params['is_3D'];
		}
		if (isset ($params['start_score']) && '' != $params['start_score']) {
			$req_array['start_score'] = $params['start_score'];
		}
		if (isset ($params['end_score']) && '' != $params['end_score']) {
			$req_array['end_score'] = $params['end_score'];
		}
		if (isset ($params['start_volume']) && '' != $params['start_volume']) {
			$req_array['start_volume'] = $params['start_volume'];
		}
		if (isset ($params['end_volume']) && '' != $params['end_volume']) {
			$req_array['end_volume'] = $params['end_volume'];
		}
		if (isset ($params['one_station']) && '' != $params['one_station']) {
			$req_array['one_station'] = $params['one_station'] ? 'true' : '';
		}
		if (isset ($params['is_cod']) && '' != $params['is_cod']) {
			$req_array['is_cod'] = $params['is_cod'] ? 'true' : '';
		}
		if (isset ($params['is_mall']) && '' != $params['is_mall']) {
			$req_array['is_mall'] = $params['is_mall'] ? 'true' : '';
		}
		if (isset ($params['is_prepay']) && '' != $params['is_prepay']) {
			$req_array['is_prepay'] = $params['is_prepay'] ? 'true' : '';
		}
		if (isset ($params['genuine_security']) && '' != $params['genuine_security']) {
			$req_array['genuine_security'] = $params['genuine_security'] ? 'true' : '';
		}
		if (isset ($params['promoted_service']) && '' != $params['promoted_service']) {
			$req_array['promoted_service'] = $params['promoted_service'];
		}
		if (isset ($params['stuff_status']) && '' != $params['stuff_status']) {
			$req_array['stuff_status'] = $params['stuff_status'];
		}
		if (isset ($params['start_price']) && '' != $params['start_price']) {
			$req_array['start_price'] = $params['start_price'];
		}
		if (isset ($params['end_price']) && '' != $params['end_price']) {
			$req_array['end_price'] = $params['end_price'];
		}
		if (isset ($params['page_no']) && '' != $params['page_no']) {
			$req_array['page_no'] = $params['page_no'];
		}
		if (isset ($params['show_num']) && '' != $params['show_num']) {
			$req_array['page_size'] = $params['show_num'];
		}
		if (isset ($params['auction_flag']) && '' != $params['auction_flag']) {
			$req_array['auction_flag'] = $params['auction_flag'];
		}
		if (isset ($params['auto_post']) && '' != $params['auto_post']) {
			$req_array['auto_post'] = $params['auto_post'];
		}
		if (isset ($params['has_discount']) && '' != $params['has_discount']) {
			$req_array['has_discount'] = $params['has_discount'];
		}
		//执行搜索
		$this->appkey = TB_APP_KEY_2;
		$this->secretKey = TB_APP_SECRET_2;
		return $this->exec($req_array);
	}
}