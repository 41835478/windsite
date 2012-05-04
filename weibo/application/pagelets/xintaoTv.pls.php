<?php
class xintaoTv_pls {

	function tvJuqings($tv) {
		$cat = $tv['cat'];
		$video = $tv['video'];
		$tvName = $tv['tvName'];
		$sid = $tv['sid'];
		$html = '';
		$jqs = array ();
		if (!empty ($sid) && $cat == 2) {
			$juqings = F('get_xintaotv_juqing.get_xintaotv_juqings', $sid);
			$jqs = $juqings['juqing'];
		}
		$jqs[0] = array (
			'sortOrder' => 0,
			'content' => $video['tv_desc']
		);
		$count = 0;
		$length = count($jqs);
		$pageCount = 0;
		foreach ($jqs as $jq) {
			if ($count % 16 == 0) {
				$html .= '<div class="pagecont' . ($count > 0 ? ' hidden' : '') . '">';
			}
			$html .= '<div class="listJs"><div class="bti"><h3><span>' . $tvName . '</span>';
			if ($count == 0) {
				$html .= '剧情介绍</h3>';
			} else {
				$html .= '第' . $jq['sortOrder'] . '集分集剧情</h3><a rel="nofollow" href="/video/vid-' . $jq['vid'] . '" class="btns9">观 看</a>';
			}
			$html .= '</div><div class="wz">' . $jq['content'] . '</div></div>';
			if ($count % 16 == 15 || $count == ($length -1)) {
				$html .= '</div>';
				$pageCount++;
			}
			$count++;
		}
		$html .= '<div class="page" id="J_TvJuqingPage"><em>';
		for ($i = 0; $i < $pageCount; $i++) {
			$html .= '<a' . ($i == 0 ? ' class="current"' : '') . '>' . ($i +1) . '</a>';
		}
		$html .= '</em></div>';
		echo $html;
	}
	/**
	 * 广告位
	 */
	function topItem($limit = 5) {
		$topItems = array ();
		$topItems = CACHE :: get(TB_CACHE_TV_KEY_PRE . 'TopItem' . $limit);
		if (!$topItems) {
			$topItems['TR_FS'] = DS('xintao/adItem.getByCat', '', 'TR_FS', $limit);
			$topItems['TR_JJ'] = DS('xintao/adItem.getByCat', '', 'TR_JJ', $limit);
			$topItems['TR_MY'] = DS('xintao/adItem.getByCat', '', 'TR_MY', $limit);
			$topItems['TR_SP'] = DS('xintao/adItem.getByCat', '', 'TR_SP', $limit);
			$topItems['TR_WT'] = DS('xintao/adItem.getByCat', '', 'TR_WT', $limit);
			$topItems['TR_ZH'] = DS('xintao/adItem.getByCat', '', 'TR_ZH', $limit);
			CACHE :: set(TB_CACHE_TV_KEY_PRE . 'TopItem' . $limit, $topItems, CACHE_2);
		}
		if (!empty ($topItems)) {
			TPL :: module('xintao/tv/topItem', array (
				'topItems' => $topItems,
				'limit' => $limit
			));
		} else {
			echo '';
		}
	}
	/**
	 * 搜狐播客分类推荐
	 */
	function tvBokeTop($cat) {
		$pagination = F('tv.getBokeTop', -999, '播客热荐', $cat);
		TPL :: module('xintao/tv/newTvSet', array (
			'pagination' => $pagination,
			'cat' => 2,
			'isBoke' => true
		));
	}
	/**
	 * 搜狐播客分类推荐
	 */
	function tvBokeCategory($params) {
		$pagination = F('tv.search', -999, '最新视频', $params['tv']);
		TPL :: module('xintao/tv/newTvSet', array (
			'pagination' => $pagination,
			'cat' => 2,
			'tvSets' => ''
		));
	}
	function playSet($video) {
		$sid = $video['sid'];
		$cat = $video['tv_category_id'];
		if ($sid > 0) {
			$pagination = F('tv.getSetList', -999, '专辑列表', array (
				'sid' => $sid,
				'page' => 1,
				'pageSize' => 1000,
				'cat' => $cat,
				'tvSets' => isset ($video['tvSets']) ? $video['tvSets'] : ''
			));
			TPL :: module('xintao/tv/newPlayTvSet', array (
				'pagination' => $pagination,
				'cat' => $cat,
				'tvSets' => isset ($video['tvSets']) ? $video['tvSets'] : ''
			));
		}

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
				$urlTemp = URL('video.search', array_filter($queryStr)); //过滤空属性，并生成模板URL
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
		TPL :: module('xintao/tv/newTvSet', array (
			'pagination' => $pagination,
			'cat' => $cat,
			'tvSets' => $params['tvSets']
		));
	}
	function focus($type = 'movie') {
		$videos = array ();
		$videos = CACHE :: get(TB_CACHE_TV_KEY_PRE . $type . 'Focus');
		if (!$videos) {
			$videos = F('xintaotv.getRemoteFocus', $type);
			CACHE :: set(TB_CACHE_TV_KEY_PRE . $type . 'Focus', $videos, CACHE_2);
		}
		if (!empty ($videos)) {
			TPL :: module('xintao/tv/focus', array (
				'videos' => $videos,
				'type' => $type
			));
		} else {
			echo '';
		}

	}
	function recommend($params) {
		$recommends = F('tv.getRecommend', -999, '今日推荐', $params['api']);
		TPL :: module('xintao/tv/grid', array (
			'channel' => $params['channel'],
			'titlePic' => $params['titlePic'],
			'videos' => $recommends
		));
	}
	function gridVideos($params) {
		$lastest = F('tv.search', -999, '最新视频', $params['tv']);
		TPL :: module('xintao/tv/grid', array (
			'channel' => $params['channel'],
			'titlePic' => $params['titlePic'],
			'videos' => $lastest['resultList'],
			'moreUrl' => $params['moreUrl']
		));
	}
	/**
	 * 搜狐电视剧日周月热榜
	 */
	function viewsTop10($params) {
		$all = F('tv.getAllViewsTop', -999, '排行榜', $params['api']);
		$apis = explode('/', $params['api']);
		TPL :: module('xintao/tv/top', array (
			'title' => $params['title'],
			'api' => $params['api'],
			'channel' => $apis[0],
			'data' => array (
				'每日' => $all['daily'],
				'每周' => $all['weekly'],
				'全部' => $all['all']
			)
		));
	}
	/**
	 * 搜狐影视评分榜
	 */
	function movieScoreTop($title) {
		$all = F('tv.getAllScoreTop', -999, '电影评分排行榜', 'movie/top/score/');
		TPL :: module('xintao/tv/top', array (
			'title' => $title,
			'data' => array (
				'完美' => $all['perfect'],
				'很好' => $all['good'],
				'一般' => $all['common'],
				'烂片' => $all['poor']
			)
		));
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