<?php


# Initialise common code
$preIP = dirname(__FILE__) . '/../modules/sotv';

# Initialize config
require_once ("$preIP/includes/SoDefine.php");

# Initialize SOHU util
require_once ("$preIP/includes/SoUtil.php");

# Initialize connect
require_once ("$preIP/includes/SoConnect.php");

# Initialize SOHU client
require_once ("$preIP/includes/SoClient.com.php");

/**
 * 每日更新
 */
function tvUpdate($cat, $page_no = 1, $tvType = 2) {

	//根据分类，最新排序查找最新的
	$pagination = search(-999, '每日更新', F('taobao.tv_default_search', array (
		'c' => $cat,
		'o' => 3,
		'tvType' => $tvType,
		'page_no' => $page_no
	)), false);
	$isContinue = true;
	if (!empty ($pagination)) { //不为空
		$resultList = $pagination['resultList'];
		if (count($resultList) > 0) { //如果不为空
			foreach ($resultList as $video) { //迭代更新
				if (isset ($video['vid']) && $video['vid'] > 0) {
					$v = DS('xintao/tv.getByVid', '', $video['vid']);
					if (!empty ($v)) {
						$isContinue = false;
						continue;
					}
					DS('xintao/tv.save', '', array (
						'vid' => $video['vid'],
						'sid' => isset ($video['sid']) ? $video['sid'] : null,
						'tv_name' => isset ($video['tv_name']) ? $video['tv_name'] : null,
						'sub_title' => isset ($video['sub_title']) ? $video['sub_title'] : null,
						'main_actor' => isset ($video['main_actor']) ? $video['main_actor'] : null,
						'director' => isset ($video['director']) ? $video['director'] : null,
						'tip' => isset ($video['tip']) ? $video['tip'] : null,
						'tv_desc' => isset ($video['tv_desc']) ? utf8Substr($video['tv_desc'], 0, 80) : null,
						'video_big_pic' => isset ($video['video_big_pic']) ? $video['video_big_pic'] : null,
						'cat' => $cat,
						'tvType' => $tvType,
						'nums' => 0
					));
				}
			}
			if ($isContinue && $page_no < 10) { //递归更新
				tvUpdate($cat, $page_no +1, $tvType);
			}
		}
	}
	echo $cat . '【' . $page_no . '】';
}
function getRecommend($id = -999, $title = '未知模块', $api, $isCache = true) {
	return TV('sotv/includes/SoClient.getRecommend', $isCache ? ('g0/' . CACHE_24) : '', $api);
}
function getFocus($id = -999, $title = '未知模块', $api, $isCache = true) {
	return TV('sotv/includes/SoClient.getFocus', $isCache ? ('g0/' . CACHE_2) : '', $api);
}
/**
 * 播客分类热推
 */
function getVideo($id = -999, $title = '未知模块', $vid, $isAjax = false) {
	return TV('sotv/includes/SoClient.getVideo', 'g0/' . CACHE_24, $vid);
}
/**
 * 排行榜
 */
function getTop($id = -999, $title = '未知模块', $api) {
	return TV('sotv/includes/SoClient.getTop', 'g0/' . CACHE_24, $api);
}
function getAllViewsTop($id = -999, $title = '未知模块', $api) {
	return array (
		'daily' => getTop($id, $title, $api . 'daily'),
		'weekly' => getTop($id, $title, $api . 'weekly'),
		'all' => getTop($id, $title, $api . 'all')
	);
}
function getAllScoreTop($id = -999, $title = '未知模块', $api) {
	return array (
		'perfect' => getTop($id, $title, $api . 'perfect'),
		'good' => getTop($id, $title, $api . 'good'),
		'common' => getTop($id, $title, $api . 'common'),
		'poor' => getTop($id, $title, $api . 'poor')
	);
}
/**
 * 播客分类热推
 */
function getBokeTop($id = -999, $title = '未知模块', $cat, $isAjax = false) {
	return TV('sotv/includes/SoClient.getBokeTop', 'g0/' . CACHE_24, $cat);
}
/**
 * 根据VID播客视频信息
 */
function getBokeVideoInfoByBid($id = -999, $title = '未知模块', $bid, $isAjax = false) {
	return TV('sotv/includes/SoClient.getBokeVideoInfoByBid', 'g0/' . CACHE_24X7, $bid);
}
/**
 * 根据SID获得专辑
 */
function getSetList($id = -999, $title = '未知模块', $params, $isAjax = false, $isForce = false) {
	$setList = CACHE :: get(TB_CACHE_TV_KEY_PRE . 'SetList_' . $params['sid']);
	if (!$isForce && $setList && !empty ($setList)) { //如果已缓存
		return $setList;
	}
	//不缓存
	$setList = TV('sotv/includes/SoClient.getSetList', '', $params['sid'], $params['page'], $params['pageSize']);
	$cache = CACHE_24;
	if (isset ($params['cat']) && in_array($params['cat'], array (
			2,
			16
		))) { //如果是电视剧，动漫且专辑为全集，则缓存为永久
		if (!empty ($setList)) {
			$tvSets = $params['tvSets'];
			if ($tvSets == $setList['count']) {
				$cache = '';
			}
		}
	}
	if ($cache == '') {
		CACHE :: set(TB_CACHE_TV_KEY_PRE . 'SetList_' . $params['sid'], $setList);
	} else {
		CACHE :: set(TB_CACHE_TV_KEY_PRE . 'SetList_' . $params['sid'], $setList, $cache);
	}
	return $setList;
}
/**
 * 根据专辑SID获得专辑信息
 */
function getSetInfo($id = -999, $title = '未知模块', $sid, $isAjax = false) {
	return TV('sotv/includes/SoClient.getSetInfo', 'g0/' . CACHE_24, $sid);
}
/**
 * 根据视频VID获得剧专辑信息
 */
function getSetInfoByVid($id = -999, $title = '未知模块', $vid, $isAjax = false) {
	return TV('sotv/includes/SoClient.getSetInfoByVid', 'g0/' . CACHE_24, $vid);
}
/**
 * 搜狐搜索视频
 */
function search($id = -999, $title = '未知模块', $params, $isCache = true) {
	$params = array_merge(array (
		'key' => '',
		'c' => '',
		'page' => '',
		'pageSize' => '',
		'page_no' => '',
		'show_num' => '',
		'tvType' => '',
		'area' => '',
		'cs' => '',
		'age' => '',
		'fee' => '',
		'language' => '',
		'o' => '',
		'cat' => '',
		'year' => ''
	), $params);
	return TV('sotv/includes/SoClient.search', ($isCache ? ('g0/' . CACHE_24) : ''), $params['page_no'], $params['show_num'], $params['key'], $params['c'], $params['tvType'], $params['cat'], $params['area'], $params['year'], $params['cs'], str_replace('_', '-', $params['age']), $params['language'], $params['fee'], $params['o']);
}
/**
 * 获得TV分类信息
 */
function getCategory($id = -999, $title = '未知模块', $c, $isAjax = false) {
	$result = array ();
	$categoryName = '';
	$categoryApi = '';
	$categorys = array ();
	if (isset ($c) && !empty ($c)) {
		$sotv = V('-:sotv/' . $c);
		if (!empty ($sotv)) {
			$categoryName = $sotv['title'];
			$categoryApi = $sotv['api'];
		}
	}
	if (!empty ($categoryApi)) {
		$categorys = TV('sotv/includes/SoClient.getCategory', 'g0/' . CACHE_24X7, $categoryApi);
	}
	$result['name'] = $categoryName;
	$result['categorys'] = $categorys;
	return $result;
}
/**
	* 根据 sid vid cid 来计算下一个链接
	*/
function getPlayLink($sid, $vid, $cid = -1) {
	$url = "";
	switch ($cid) {
		case 2 :
		case 16 :
			// "电视剧，动漫";
			if (!empty ($sid) && $sid != -1) {
				$url = URL('tv.set', array (
					'sid' => $sid
				));
			} else {
				$url = URL('tv', array (
					'vid' => $vid
				));
			}
			break;
		case 9001 :
			$url = URL('tv', array (
				'bid' => $vid
			));
			break;
		default :
			// " 等
			$url = URL('tv', array (
				'vid' => $vid
			));
			break;
	}
	return $url;
}
/**
	* 根据 sid vid cid 来计算下一个链接
	*/
function getNewPlayLink($sid, $vid, $cid = -1) {
	$url = "";
	switch ($cid) {
		case 2 :
		case 16 :
			// "电视剧，动漫";
			if (!empty ($sid) && $sid != -1) {
				$url = URL('video', array (
					'sid' => $sid
				));
			} else {
				$url = URL('video', array (
					'vid' => $vid
				));
			}
			break;
		case 9001 :
			$url = URL('video', array (
				'bid' => $vid
			));
			break;
		default :
			// " 等
			$url = URL('video', array (
				'vid' => $vid
			));
			break;
	}
	return $url;
}
//截取utf8字符串
function utf8Substr($str, $from, $len) {
	return preg_replace('#^(?:[\x00-\x7F]|[\xC0-\xFF][\x80-\xBF]+){0,' . $from . '}' .
	'((?:[\x00-\x7F]|[\xC0-\xFF][\x80-\xBF]+){0,' . $len . '}).*#s', '$1', $str);
}
/**
	*  转换时间格式
	* @param seconds 秒
	* @return 分钟
	*/
function getTimes($seconds) {
	$ret = "";
	$mins = floor($seconds / 60);
	if ($mins > 0) {
		$ret = $mins . ":" . ($seconds - ($mins * 60));
	} else {
		$ret = "0:" . $seconds;
	}
	return $ret;
}