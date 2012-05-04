<?php
require_once dirname(__FILE__) . '/component_abstract.pls.php';
/**
 * 画报搜索
 * @author yaoying
 * @version $Id: component_100.pls.php
 *
 */
class component_99_pls extends component_abstract_pls {

	function run($mod) {
		parent :: run($mod);
		$search = V('g:search', '');
		$q = V('g:key_word', '');
		$cid = V('g:channel_ids', '');
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
			//echo $search;exit;
			$mod['param'] = F('taobao.poster_convert_search', $search); //根据URL参数查询,转换search参数
		} else { //默认配置
			$mod['param'] = F('taobao.poster_default_search', $mod['param']);
		}
		$params = $mod['param']; //参数列表
		//执行画报搜索
		$posterList = F('top.posterPostersSearch', 99, '淘画报搜索', $params);
		TPL :: module('xintao/posters', array (
			'mod' => $mod,
			'list' => $posterList
		));
	}
}