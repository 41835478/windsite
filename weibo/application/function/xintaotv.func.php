<?php
function xtv_main_actor($c, $main_actor, $target = '') {
	$result = array ();
	if (isset ($main_actor) && !empty ($main_actor)) {
		$actors = explode(';', $main_actor);
		if (!empty ($actors)) {
			foreach ($actors as $actor) {
				$result[] = '<a href="javascript:xtvSearch_Key(' . $c . ',\'' . urlencode($actor) . '\',\'' . $target . '\')">' . $actor . '</a>';
			}
		}
	}
	return implode('/', $result);
}
function replaceShare($str) {
	return str_replace(array (
		'"',
		'\''
	), array (
		'“',
		'‘'
	), $str);
}
function getHistories($userId) {
	$history = array ();
	$history = CACHE :: get(TB_CACHE_TV_KEY_PRE . 'History_' . $userId);
	if (!$history) {
		$history = DS('mgr/xintao/tvHistory.getTvHistories', '', $userId);
		CACHE :: set(TB_CACHE_TV_KEY_PRE . 'History_' . $userId, $history);
	}
	return $history;
}
/**
	 * 远程抓取综艺
	 */
function getRemoteFocus($type) {
	$html = F('http_get_contents', 'http://tv.sohu.com/' . $type . '/');
	preg_match("'//<\!\[CDATA\[(.*)//\]\]>'si", $html, $match);
	if ($match) {
		$match[1] = iconv("gbk", "utf-8//IGNORE", $match[1]);
		preg_match("'data\s+:\s+(.*)\]'si", $match[1], $match);
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
		$zongyi = (json_decode($text, true));
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
/**
 * 获得完整表名
 */
function getTableSuffix($table, $userId) {
	return $table . '_' . (substr($userId, strlen($userId) - 1));
}