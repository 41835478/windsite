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
include_once ('xintaoTv.abs.php');
class video_mod extends xintaoTv {

	function video_mod() {
		parent :: action();
	}
	function default_action() {
		$vid = V('g:vid', 0);
		$bid = V('g:bid', 0);
		$sid = V('g:sid', 0);
		$video = array ();
		$vData = array ();
		if ($sid > 0 && is_numeric($sid)) { //专辑
			$video = F('tv.getSetInfo', -999, '剧集', $sid);
			if (empty ($video)) {
				F('err404', '当前视频专辑不存在');
			}
			TPL :: assign('sid', $sid);
			TPL :: assign('video', $video);
			TPL :: display('xintao/tv/newSet');
		} else { //视频
			if ($vid > 0 && is_numeric($vid)) { //非播客
				$video = F('tv.getSetInfoByVid', -999, '视频信息', $vid);
				$vData = F('tv.getVideo', -999, '视频信息', $vid);
				TPL :: assign('isBoke', false);
			}
			elseif ($bid > 0 && is_numeric($bid)) { //播客
				$video = F('tv.getBokeVideoInfoByBid', -999, '视频信息', $bid);
				TPL :: assign('isBoke', true);
			}
			if (empty ($video)) {
				F('err404', '当前视频不存在');
			}
			TPL :: assign('sid', isset ($video['sid']) ? $video['sid'] : 0);
			TPL :: assign('video', $video);
			TPL :: assign('vData', $vData);
			TPL :: display('xintao/tv/newPlay');
		}
	}
	function top() {
		$c = V('g:c', '');
		$tops = array (
			'movie' => '电影排行榜',
			'teleplay' => '电视剧排行榜',
			'comic' => '动漫排行榜',
			'zongyi' => '综艺排行榜',
			'korea' => '韩剧排行榜',
			'real' => '纪录片排行榜',
			'education' => '公开课排行榜',
			'clip' => '片花排行榜',
			'music' => '音乐排行榜',
			'tvprogram' => '电视节目排行榜',
			'mvscore' => '电影评分排行榜',
			'tvscore' => '电视剧评分排行榜',
			'comicscore' => '动漫评分排行榜',
			'realscore' => '纪录片评分排行榜',
			'daymore' => '上榜天数最多',
			'rankhigh' => '上榜排名最高'
		);
		$topTitle = '';
		if ($c != '' && isset ($tops[$c]) && !empty ($tops[$c])) {
			$topTitle = $tops[$c];
		}
		if ($topTitle == '') {
			$c = '';
			$topTitle = '全部排行榜';
		}
		TPL :: assign('c', $c);
		TPL :: assign('topTitle', $topTitle);
		TPL :: display('xintao/tv/viewTop50');
	}
	function movie() {
		TPL :: assign('cName', '电影');
		TPL :: assign('type', 'movie');
		TPL :: assign('more', URL('video.search', array (
			'c' => 1,
			'o' => 3,
			'tvType' => 1
		)));
		TPL :: display('xintao/tv/newMap');
	}
	function teleplay() {
		TPL :: assign('cName', '电视剧');
		TPL :: assign('type', 'teleplay');
		TPL :: assign('more', URL('video.search', array (
			'c' => 2,
			'o' => 3,
			'tvType' => 1
		)));
		TPL :: display('xintao/tv/newMap');
	}

	/**
	 * 搜狐视频
	 */
	function search() {
		$mod = array ();
		$search = V('g:search', '');
		$key = V('g:key', '');
		$c = V('g:c', '');
		$g = V('g');
		if (!empty ($key)) {
			$mod['param'] = F('taobao.tv_default_search', array (
				'key' => $key
			));
			//仅查询关键词
		}
		elseif (!empty ($c)) {
			$mod['param'] = F('taobao.tv_default_search', array (
				'c' => $c
			)); //仅查询分类
		}
		elseif (!empty ($search) && strpos($search, '----------------------') !== 0) { //如果搜索参数存在
			$array = explode('-', $search);
			if (count($array) >= 23) {
				if (empty ($array[1])) { //如果未指定频道
					header('HTTP/1.1 301 Moved Permanently');
					header('Location:http://www.xintaotv.com/video.search/search-' . implode('-', array_values(F('taobao.tv_default_search', array (
						'c' => 1,
						'page_no' => $array[21]
					)))));
					exit;
				}
				if (empty ($array[21])) { //如果未指定页码
					header('HTTP/1.1 301 Moved Permanently');
					header('Location:http://www.xintaotv.com/video.search/search-' . implode('-', array_values(F('taobao.tv_default_search', array (
						'c' => $array[1],
						'page_no' => 1
					)))));
					exit;
				}
			}
			$mod['param'] = F('taobao.tv_convert_search', $search); //根据URL参数查询,转换search参数

		} else { //默认配置
			//取模块配置
			$pm = APP :: N('pageManager');
			$manager = $pm->getPageManager(9000);
			$mod['param'] = json_decode($manager['param'], TRUE);
			///需根据不同来源过滤启用不同参数列表（合法参数未必存在，需甄别，另外show_size配置merge至url参数中）
			$mod['param'] = F('taobao.tv_default_search', array (
				'c' => $mod['param']['c'],
				'o' => $mod['param']['o']
			));
		}
		$c = $mod['param']['c'];
		$cats = F('tv.getCategory', 200, '影视分类搜索', $c);
		$params = $mod['param'];
		// 执行搜索
		$pagination = F('tv.search', 200, '影视搜索', $mod['param']);
		if ($c == 2) {
			if (isset ($pagination['resultList']) && count($pagination['resultList']) == 1) {
				$sid = $pagination['resultList'][0]['sid'];
				if (!empty ($sid)) {
					header("Location:http://www.xintaotv.com/video/sid-" . $sid);
					exit;
				}
			}
		}
		TPL :: assign('mod', $mod);
		TPL :: assign('cats', $cats);
		TPL :: assign('pagination', $pagination);
		TPL :: display('xintao/tv/newSearch');
	}
	function set() {
		$sid = V('g:sid', 0);
		if ($sid > 0 && is_numeric($sid)) { //专辑
			header('HTTP/1.1 301 Moved Permanently');
			header('Location:http://www.xintaotv.com/video/sid-' . $sid);
		}
		exit;
		//		$sid = V('g:sid', 0);
		//		$video = array ();
		//		if ($sid > 0 && is_numeric($sid)) {
		//			$video = F('tv.getSetInfo', -999, '剧集', $sid);
		//		}
		//		if (empty ($video)) {
		//			F('err404', '当前视频专辑不存在');
		//		}
		//		TPL :: assign('sid', $sid);
		//		TPL :: assign('video', $video);
		//		TPL :: display('xintao/tv/newSet');
	}
}