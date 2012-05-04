<?php


/**
 * // the following strings are valid JavaScript but not valid JSON

// the name and value must be enclosed in double quotes
// single quotes are not valid 
$bad_json = "{ 'bar': 'baz' }";
json_decode($bad_json); // null

// the name must be enclosed in double quotes
$bad_json = '{ bar: "baz" }';
json_decode($bad_json); // null

// trailing commas are not allowed
$bad_json = '{ bar: "baz", }';
json_decode($bad_json); // null
 */

class xintao_pls {
	function tmallCats() {
		TPL :: module('xintao/include/tmallCats');
	}
	/**
	 * 营销微博(商品，店铺，微博)
	 */
	function yingxiaoWeibo($mod, $type = 'weibo') {
		//取缓存
		if (XT_IS_SELLER == 'true') {
			$mod['seller'] = XT_USER_NICK;
		}
		$mod['type'] = $type;
		if ($_SERVER['SERVER_NAME'] == 'www.xintaowang.com') {
			$mod['domain'] = 'www.xintaowang.com';
		}
		$cacheKey = "yingxiaoWeibo#" . md5(serialize($mod));
		$wbListKey = "$cacheKey#wbList";
		$cacheTime = CACHE_1;
		if (ENABLE_CACHE && ($content = CACHE :: get($cacheKey))) {
			echo $content;
			return array (
				'cls' => 'wblist',
				'list' => CACHE :: get($wbListKey)
			);
		}
		switch ($type) {
			case 'weibo' :
				break;
			case 'item' :

				break;
			case 'shop' :
				break;
		}
		$ret = DR('components/pubTimelineBaseApp.get', '', $mod['param']);

		if ($ret['errno']) {
			$this->_error(L('pls__component14__pubTimeline__apiError', $ret['err'], $ret['errno']));
			//$this->_error('components/pubTimelineBaseApp.get返回API错误：'. $ret['err']. '('. $ret['errno']. ')');
			return;
			//如果数据为空，则不输出
		} /*elseif(empty($ret['rst'])){
															 		$this->_error('components/pubTimelineBaseApp.get没有数据');
															 		return;
															 	}elseif(!is_array($ret['rst'])){
															 		$this->_error('components/pubTimelineBaseApp.get返回错误的非数组数据类型或者没有数据');
															 		return;
															 	}*/

		$show_num = isset ($mod['param']['show_num']) ? (int) $mod['param']['show_num'] : 20;

		$wbList = array ();
		if (is_array($ret['rst'])) {
			foreach ($ret['rst'] as $k => $wb) {
				if (isset ($wb['text'])) {
					$wbList[] = $wb;
				}
			}
		}

		if (count($wbList) > $show_num) {
			$wbList = array_slice($wbList, 0, $show_num);
		}

		// 设置缓存
		$content = TPL :: module('component/component_' . $mod['component_id'], array (
			'mod' => $mod,
			'list' => $wbList
		), false);
		$wbList = F('format_weibo', $wbList);
		if (ENABLE_CACHE && $content) {
			CACHE :: set($cacheKey, $content, $cacheTime);
			CACHE :: set($wbListKey, $wbList, $cacheTime);
		}

		echo $content;
		return array (
			'cls' => 'wblist',
			'list' => $wbList
		);
	}
	/**
	 * 搜狐播客分类推荐
	 */
	function tvBokeTop($cat) {
		$pagination = F('tv.getBokeTop', -999, '播客热荐', $cat);
		TPL :: module('xintao/tv/tvSet', array (
			'pagination' => $pagination,
			'cat' => 2,
			'isBoke' => true
		));
	}
	/**
	 * 视频微博专题评论
	 */
	function tvTopic($topic) {
		$params = array ();
		$params['source'] = 0;
		$params['show_num'] = 20;
		$params['topic'] = $topic;
		$params['page'] = 1;
		$params['page_type'] = 0;
		$rs = TV('components/todayTopic.getTopicWB', 'g0/' . CACHE_24, $params);
		if ($rs['errno']) {
			$this->_error(L('pls__component12__todayTopic__apiError'), $rs['err'], $rs['errno']);
			return;
		}
		elseif (!is_array($rs['rst']) || empty ($rs['rst'])) {
			$this->_error(L('pls_component12__todayTopic__dbError'));
			return;
		}
		$content = TPL :: module('component/component_12', array (
			'mod' => array (
				'title' => '"' . $topic . '"相关评论',
				'param' => $params
			),
			'rs' => $rs
		), false);
		$wbList = F('format_weibo', $rs['rst']);
		echo $content;
		return array (
			'cls' => 'wblist',
			'list' => $wbList
		);
	}
	/**
	 * 视频广告位
	 */
	function tvPlayAd($isBoke) {
		if (XT_IS_SELLER == 'true') {
			$shops = str_replace(array (
				'[',
				']'
			), array (
				'',
				''
			), XT_SHOPS);
			$items = array ();
			if ($shops) {
				//TODO 区别来源
				$rst = F('top.itemsSearch', 106, '单店铺推广-商品列表', array (
					'fields' => 'num_iid,title,nick,pic_url,price,volume',
					'nicks' => $shops, //使用当前站点的店铺集合,
	'page_no' => 1,
					'show_num' => 16
				));
				if (!empty ($rst)) { //如果返回结果不为空
					$items = $rst['item_search']['items']['item'];
				}
			}
			TPL :: module('xintao/tv/tvPlayAd', array (
				'list' => $items,
				'isBoke' => $isBoke
			));
		}
	}
	/**
	 * 搜狐剧集列表
	 */
	function tvSet($params) {
		$sid = $params['sid'];
		$cat = $params['cat'];
		$pagination = F('tv.getSetList', -999, '专辑列表', array (
			'sid' => $sid,
			'page' => 1,
			'pageSize' => 1000,
			'cat' => $cat,
			'tvSets' => $params['tvSets']
		));
		TPL :: module('xintao/tv/tvSet', array (
			'pagination' => $pagination,
			'cat' => $cat
		));
	}
	/**
	 * 搜狐视频搜索分类
	 */
	function tvSearchCat($p) {
		$cats = $p['cats'];
		$queryStr = $p['queryStr'];
		if (!empty ($cats['name']) && !empty ($cats['categorys'])) {
			$categroySelectArea = "";
			$categoryName = $cats['name'];
			$categorys = $cats['categorys'];
		}
		// 路径中的分类参数 和 对应的ID
		$paramsSelectValues = Array ();
		if ($categorys != null) {
			$categroySelectArea = "<div class=\"seaKey bord ks-clear\" id=\"seaKey\">";
			foreach ($categorys as $category) {
				$categroySelectArea .= "<ul class=\"ks-clear\"><li><span>" . $category['cateName'] . "</span></li>";
				$sv = $queryStr[$category['cateAlias']];
				$queryStr[$category['cateAlias']] = 'CAT'; //设置临时替换
				$urlTemp = URL('tv.search', array_filter($queryStr)); //过滤空属性，并生成模板URL
				foreach ($category['searchKeys'] as $searchKey => $searchValue) {
					if ($category['cateAlias'] == 'tvType') {
						$searchValue = - $searchValue;
					}
					elseif ($category['cateAlias'] == 'age') {
						$searchValue = str_replace('-', '_', $searchValue);
					}
					$categroySearchUrl = str_replace('CAT', $searchValue, $urlTemp); //替换为当前CID
					$categoryStyle = ""; // 判断哪个属性已经被选中，选中的将会高亮				
					if (isset ($sv) && $sv == $searchValue) {
						$categoryStyle = " class=\"now\"";
						if ($searchKey > 0)
							$paramsSelectValues[$category['cateAlias']] = $category['cateValues'][$searchKey];
					}
					if (empty ($sv) && $searchKey == 0) {
						$categoryStyle = " class=\"now\"";
					}
					$categroySelectArea .= "<li" . $categoryStyle . "><a rel=\"nofollow\" href=\"" . $categroySearchUrl . "\">" . $category['cateValues'][$searchKey] . "</a></li>";
				}
				$queryStr[$category['cateAlias']] = $sv;
				$categroySelectArea .= "</ul>";
			}
			$categroySelectArea .= "</div><div class=\"shLay ks-clear\" id=\"shid\"></div>";
		}
		// 输出分类选择区域
		echo $categroySelectArea;
	}
	function headerSearch() {
		$shop = array ();
		if (XT_IS_SELLER == 'true') {
			$shops = str_replace(array (
				'[',
				']'
			), array (
				'',
				''
			), XT_SHOPS);
			if ($shops) {
				$nicks = explode(',', $shops);
				$nick = array_rand($nicks);
				$shop = F('top.shopGet', -999, '店铺详情', array (
					'nick' => $nicks[$nick]
				), true);
			}
		}
		TPL :: module('xintao/headerSearch', array (
			'shop' => $shop
		));
	}
	/**
	 * 获取画报商品JS的最新数据
	 */
	function posterMarkerData($poster) {
		//比对本地与淘宝服务器的画报修改时间，一致则启用本地缓存，不一致，则重新抓取
		$cache = CACHE :: get(TB_CACHE_POSTER_KEY_PRE . 'marker_' . $poster['id']);
		if (!$cache || $poster['modified_date'] > $cache['modified']) { //如果未缓存，或者修改时间不一致
			try {
				$cache = array ();
				///注意，需要转换编码GBK=>UTF-8
				$html = F('http_get_contents', 'http://huabao.taobao.com/fashion/d-' . $poster['id'] . '.htm');
				preg_match("'<script\s+type=\"text/data\"\s+id=\"J_PosterData\">([^<]*)</script>'si", $html, $match);
				if ($match) {
					$match[1] = iconv("gbk", "utf-8//IGNORE", str_replace('\'', '"', $match[1]));
					$posters = json_encode(json_decode($match[1]));
					$cache['poster'] = $posters ? $posters : '{}'; ////变相压缩JSON代码
				} else {
					$cache['poster'] = '{}';
				}
				preg_match("'<script\s+type=\"text/data\"\s+id=\"J_PosterImageData\">([^<]*)</script>'si", $html, $img_match);
				if ($img_match) {
					$img_match[1] = iconv("gbk", "utf-8//IGNORE", str_replace('\'', '"', $img_match[1]));
					$image = json_encode(json_decode($img_match[1]));
					$cache['image'] = $image ? $image : '{}'; ////变相压缩JSON代码
				} else {
					$cache['image'] = '{}';
				}
				preg_match("'<script\s+type=\"text/data\"\s+id=\"J_PosterMarkerData\">([^<]*)</script>'si", $html, $data_match);
				if ($data_match) {
					$data_match[1] = iconv("gbk", "utf-8//IGNORE", str_replace('\'', '"', $data_match[1]));
					$data = json_encode(json_decode($data_match[1]));
					$cache['marker'] = $data ? $data : '{}'; ////变相压缩JSON代码
				} else {
					$cache['marker'] = '{}';
				}

			} catch (Exception $e) {
				$cache = array ();
				$cache['poster'] = '{}';
				$cache['image'] = '{}';
				$cache['marker'] = '{}';
			}
			$cache['modified'] = $poster['modified_date'];
			CACHE :: set(TB_CACHE_POSTER_KEY_PRE . 'marker_' . $poster['id'], $cache);
		}
		TPL :: module('xintao/mod_marker', array (
			'marker' => $cache['marker'],
			'image' => $cache['image'],
			'poster' => $cache['poster']
		));
	}
	/**
	 * 处理淘宝商品详情（目前主要处理图片链接加密）
	 */
	function convertItemDetail() {
		$numIid = V('g:id');
		$desc = '';
		if ($numIid) {
			$desc = F('top.itemDescGet', -999, '商品描述详情', $numIid);
		}
		TPL :: module('xintao/itemDesc', array (
			'desc' => $desc
		));
	}
	function itemRates($params) {
		$ret = F('top.traderatesSearch', -999, '商品评价', $params);
		$rates = array ();
		if ($ret['rst']) {
			$rates = $ret['rst']['trade_rates']['trade_rate'];
		}
		TPL :: module('xintao/itemRates', array (
			'rates' => $rates
		));
	}
	/**
	 * 店铺详情页的商品列表
	 */
	function itemList($params) {
		$rst = F('top.itemsSearch', -999, '店铺详情页商品列表', $params);
		if (!empty ($rst)) { //如果返回结果不为空
			$total_results = $rst['total_results'];
			$itemSearch = $this->_generateItemSearch($rst);
			$items = $this->_generateItemSearchItems($itemSearch);
		}
		TPL :: module('xintao/itemList', array (
			'items' => $items
		));
	}
	/**
	 * 店铺详情页的同类店铺
	 */
	function shopList($cid) {
		$rst = F('top.taobaokeShopsGet', -999, '店铺详情页同类店铺列表', array (
			'cid' => $cid,
			'start_credit' => '1goldencrown',
			'end_credit' => '5goldencrown'
		));
		$shops = array ();
		if ($rst) {
			$shops = $rst['taobaoke_shops']['taobaoke_shop'];
		}
		TPL :: module('xintao/shopList', array (
			'shops' => $shops
		));
	}
	/**
	 * @param array $rst 本组件内生成的商品搜索结果rst数组资源
	 * @return array
	 */
	function _generateItemSearchItems($rst) {
		if (array_key_exists('items', $rst)) {
			return $rst['items']['item'];
		}
		return array ();
	}
	/**
	 *
	 * @param array $rst 本组件内生成的商品搜索结果rst数组资源
	 * @return array
	 */
	function _generateItemSearch($rst) {
		if (array_key_exists('item_search', $rst)) {
			return $rst['item_search'];
		}
		return array ();
	}
	/**
	 * 输出一个模块错误信息
	 * @param string $msg
	 * @param bool $force 强制输出？否的话受到IS_DEBUG限制
	 */
	function _error($msg = false, $force = false) {
		if (true != $force && (!defined('IS_DEBUG') || !IS_DEBUG)) {
			return null;
		}
		$msg = $msg ? $msg : L('pls__component__abstract__errorMsg');
		$title = isset ($this->mod['title']) ? F('escape', (string) $this->mod['title']) : L('pls__component__abstract__emptyTitle');
		$component_id = isset ($this->mod['component_id']) ? (int) $this->mod['component_id'] : -999;
		LO('pls__component__abstract__apiError', $title, $component_id, $msg);
		//echo "<div class='int-box ico-load-fail'>{$title}（模块ID：{$component_id}）遇到问题：{$msg}</div>";
	}

}