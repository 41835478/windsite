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

class posters_mod {
	var $uInfo = false;

	function posters_mod() {
		// Cunstructor Here
	}

	/**
	 * 画报
	 */
	function default_action() {
		$mod = array ();
		$search = V('g:search', '');
		$q = V('g:key_word', '');
		$cid = V('g:channel_ids', '');
		$cat = array ();
		if (!empty ($q)) {
			$mod['param'] = F('taobao.poster_default_search', array (
				'key_word' => $q
			));
			//仅查询关键词
		}
		elseif (!empty ($cid)) {
			$mod['param'] = F('taobao.poster_default_search', array (
				'channel_ids' => $cid
			)); //仅查询分类
		}
		elseif (!empty ($search) && strpos($search, '-------------1-20-') !== 0) { //如果搜索参数存在
			$mod['param'] = F('taobao.poster_convert_search', $search); //根据URL参数查询,转换search参数
		} else { //默认配置
			$pm = APP :: N('pageManager');
			$manager = $pm->getPageManager(9997);
			if (isset ($manager['param']))
				$mod['param'] = json_decode($manager['param'], TRUE);
			else
				$mod['param'] = array ();
			$mod['param'] = F('taobao.poster_default_search', $mod['param']);
		}
		$params = $mod['param']; //参数列表
		//执行画报搜索
		$posterList = F('top.posterPostersSearch', 99, '淘画报搜索', $params);
		if (!empty ($params['channel_ids'])) {
			$ids = explode(',', $params['channel_ids']);
			if (count($ids) == 1) {
				$cat = F('top.posterChannelGet', 99, '淘画报单频道查询', $ids[0]);
			}
		}
		TPL :: assign('mod', $mod);
		TPL :: assign('cat', $cat);
		TPL :: assign('cats', F('top.posterChannelsGet'));
		TPL :: assign('list', $posterList);
		TPL :: display('xintao/posters');
	}
	function itemBox() {
		$cat = array ();
		$params = F('taobao.poster_default_search', array (
			'key_word' => urldecode(V('g:key_word', '')),
			'channel_ids' => V('g:channel_ids', ''),
			'show_num' => 20,
			'page_no' => V('g:page_no', 1)
		));
		$posterList = F('top.posterPostersSearch', -999, '淘画报搜索', $params);
		if (!empty ($cid)) {
			$ids = explode(',', $params['channel_ids']);
			if (count($ids) == 1) {
				$cat = F('top.posterChannelGet', -999, '淘画报单频道查询', $ids[0]);
			}
		}
		$editHtm = TPL :: module('xintao/posters_box', array (
			'list' => $posterList,
			'params' => $params,
			'cats' => F('top.posterChannelsGet'),
			'cat' => $cat
		), FALSE, FALSE);
		APP :: ajaxRst($editHtm);
	}
}