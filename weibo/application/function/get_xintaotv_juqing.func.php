<?php
include_once ('simple_html_dom.php');
function get_xintaotv_juqing($vid, $isForce = false) {

}
function get_xintaotv_juqings($sid, $isForce = false) {
	$juqings = array ();
	if (!$isForce) {
		$juqings = CACHE :: get(TB_CACHE_TV_KEY_PRE . 'Juqings_' . $sid);
	}
	if (empty ($juqings)) {
		$juqings['sid'] = $sid;
		$juqings['juqing'] = array ();
		$juqings['juqing'][0] = array ();
		$set = DS('xintao/xtTvCover.getBySidAll', $isForce ? '' : ('g0/' . CACHE_24), $sid);
		if (!empty ($set)) {
			if ($set['isJuqing'] != 0) { //完整剧情|部分剧情
				$db = APP :: ADP('db');
				$sql = 'SELECT vid,sortOrder,content FROM xwb_xttv_juqing where sid=' . $sid . ' ORDER BY sortOrder';
				$rst = $db->query($sql);
				$juqings['juqing'][0] = array ();
				foreach ($rst as $rs) {
					$juqings['juqing'][$rs['sortOrder']] = $rs;
				}
			}
		}
		CACHE :: set(TB_CACHE_TV_KEY_PRE . 'Juqings_' . $sid, $juqings);
	}
	return $juqings;
}
function get_juqing_all() {
	set_time_limit(3600); //设置总执行时间限制，预期不可超过2分钟。
	$db = APP :: ADP('db');
	$sql = 'SELECT * FROM xwb_xttv_covers where isJuqing<>1';
	$rst = $db->query($sql);
	if (!empty ($rst)) {
		foreach ($rst as $rs) {
			get_juqing_one($rs['sid'], $rs['href'], $rs['tvSets']);
		}
	}
}

function get_juqing_one($sid, $url, $tvSets = -1) {
	$xml = F('http_get_contents', $url);
	preg_match("'vids=\"([0-9|,]+)\";'si", $xml, $match);
	$vids = '';
	if ($match) {
		$vids = $match[1];
	}
	$isRefresh = false;
	$vids = explode(',', $vids);
	if (!empty ($vids)) {
		$html = new simple_html_dom();
		$html->load($xml);
		$list = $html->find('div#ablum2 div.listJs');
		if ($list && !empty ($list) && count($list) > 1) {
			$db = APP :: ADP('db');
			for ($i = 1; $i < count($list); $i++) {
				$js = $list[$i];
				$text = trim(mb_convert_encoding($js->find('div.bti h3', 0)->plaintext, 'UTF-8', 'GBK'));
				preg_match("'第([0-9]+)集'si", $text, $match);
				if ($match) {
					$index = $match[1];
					$li = $js->find('div.wz', 0);
					if (isset ($vids[$index -1]) && !empty ($vids[$index -1])) {
						$vid = $vids[$index -1];
						$sql = 'SELECT count(*) FROM xwb_xttv_juqing WHERE vid=' . $vid;
						$count = $db->getOne($sql);
						if ($count == 0 && $vid > 0) {
							$isRefresh = true;
							$sql = 'INSERT INTO xwb_xttv_juqing(`vid`,`sid`,`sortOrder`,`content`) VALUES(' . $vid . ',' . $sid . ',' . ($index) . ',"' . trim(mb_convert_encoding($li->plaintext, 'UTF-8', 'GBK')) . '")';
							$rst = $db->execute($sql);
						}
					}
				}
			}
			if ($isRefresh) {
				get_xintaotv_juqings($sid, true);
				F('tv.getSetList', -999, '未知模块', array (
					'sid' => $sid,
					'page' => 1,
					'pageSize' => 1000,
					'cat' => 2,
					'tvSets' => $tvSets
				), true, true); //刷新剧集列表
			}
		} else {
			print_r(array (
				'sid' => $sid,
				'url' => $url
			));
		}
		$html->clear();
	}

}
function syn_juqing_title() {
	set_time_limit(3600); //设置总执行时间限制，预期不可超过2分钟。
	$db = APP :: ADP('db');
	$sql = 'SELECT distinct(sid) FROM xwb_xttv_juqing where title is null';
	$rst = $db->query($sql);
	if (!empty ($rst)) {
		foreach ($rst as $rs) {
			$sql = 'SELECT title FROM xwb_xttv_covers where sid=' . $rs['sid'];
			$title = $db->getOne($sql);
			$sql = 'UPDATE xwb_xttv_juqing SET title="' . $title . '" WHERE sid=' . $rs['sid'];
			$db->execute($sql);
		}
	}
}

function syn_juqing_tvsets() {
	set_time_limit(3600); //设置总执行时间限制，预期不可超过2分钟。
	$db = APP :: ADP('db');
	$sql = 'SELECT sid FROM xwb_xttv_covers WHERE tvSets is null';
	$rst = $db->query($sql);
	if (!empty ($rst)) {
		foreach ($rst as $rs) {
			$video = F('tv.getSetInfo', -999, '剧集', $rs['sid']);
			if (!empty ($video)) {
				$sql = 'UPDATE xwb_xttv_covers SET tvSets="' . $video['tvSets'] . '" WHERE sid=' . $rs['sid'];
				$db->execute($sql);
			}
		}
	}
}

function syn_juqing_isJuqing() {
	set_time_limit(3600); //设置总执行时间限制，预期不可超过2分钟。
	$db = APP :: ADP('db');
	$sql = 'SELECT sid,tvSets,title FROM xwb_xttv_covers WHERE isJuqing<>1';
	$rst = $db->query($sql);
	$array = array ();
	if (!empty ($rst)) {
		foreach ($rst as $rs) {
			$sql = 'SELECT count(*) FROM xwb_xttv_juqing where sid=' . $rs['sid'];
			$count = $db->getOne($sql);
			$array[] = array (
				'title' => $rs['title'],
				'tvSets' => $rs['tvSets'],
				'juqing' => $count
			);
			if ($count == $rs['tvSets']) {
				$sql = 'UPDATE xwb_xttv_covers SET isJuqing=1 WHERE sid=' . $rs['sid'];
				$db->execute($sql);
			}
			elseif ($count > 1) {
				$sql = 'UPDATE xwb_xttv_covers SET isJuqing=2 WHERE sid=' . $rs['sid'];
				$db->execute($sql);
			}
			elseif ($count == 0) {
				$sql = 'UPDATE xwb_xttv_covers SET isJuqing=0 WHERE sid=' . $rs['sid'];
				$db->execute($sql);
			}
		}
	}
	print_r($array);
}