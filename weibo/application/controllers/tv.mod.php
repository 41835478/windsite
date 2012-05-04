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

class tv_mod {

	function tv_mod() {

	}
	function default_action() {
		$vid = V('g:vid', 0);
		$bid = V('g:bid', 0);
		$video = array();
		$vData = array();
		if ($vid > 0 && is_numeric($vid)) {
			$video = F('tv.getSetInfoByVid', -999, '视频信息', $vid);
			$vData = F('tv.getVideo', -999, '视频信息', $vid);
			TPL :: assign('isBoke', false);
		}
		elseif ($bid > 0 && is_numeric($bid)) {
			$video = F('tv.getBokeVideoInfoByBid', -999, '视频信息', $bid);
			TPL :: assign('isBoke', true);
		}

		TPL :: assign('sid', isset ($video['sid']) ? $video['sid'] : 0);
		TPL :: assign('video', $video);
		TPL :: assign('vData', $vData);
		TPL :: display('xintao/tv/play');
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
		elseif (!empty ($search) && strpos($search, '---------------------') !== 0) { //如果搜索参数存在
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
		TPL :: assign('mod', $mod);
		TPL :: assign('cats', $cats);
		TPL :: assign('pagination', $pagination);
		TPL :: display('xintao/tv/search');
	}
	function set() {
		$sid = V('g:sid', 0);
		$video = array ();
		if ($sid > 0 && is_numeric($sid)) {
			$video = F('tv.getSetInfo', -999, '剧集', $sid);
		}
		TPL :: assign('sid', $sid);
		TPL :: assign('video', $video);
		TPL :: display('xintao/tv/set');
	}
}