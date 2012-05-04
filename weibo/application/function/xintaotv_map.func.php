<?php


//include_once ('simple_html_dom.php');

function create_map($type, $isForce = false) {
	$content = '';
	if (!$isForce) {
		$content = CACHE :: get(TB_CACHE_TV_KEY_PRE . 'Map_' . $type);
	}
	if (empty ($content)) {
		$cats = array (
			'movie' => 1,
			'teleplay' => 2
		);
		$indexs = array (
			'0-9',
			'A',
			'B',
			'C',
			'D',
			'E',
			'F',
			'G',
			'H',
			'I',
			'J',
			'K',
			'L',
			'M',
			'N',
			'O',
			'P',
			'Q',
			'R',
			'S',
			'T',
			'U',
			'V',
			'W',
			'X',
			'Y',
			'Z'
		);

		if (!empty ($cats[$type])) {
			$result = array ();
			$db = APP :: ADP('db');
			foreach ($indexs as $index) {
				$sql = 'SELECT vid,sid,tv_name FROM xwb_xt_tv WHERE cat=' . $cats[$type] . ' AND tvType=1 AND pinyin="' . $index . '" ORDER BY tv_name';
				$result[$index] = $db->query($sql);
			}
			$content = TPL :: module('xintao/tv/map', array (
				'type' => $type,
				'result' => $result
			), false);
			CACHE :: set(TB_CACHE_TV_KEY_PRE . 'Map_' . $type, $content);
		}
	}
	return $content;
}

function convert_pinyin_first_char() {
	$db = APP :: ADP('db');
	$sql = 'SELECT vid,tv_name FROM xwb_xt_tv WHERE (cat=2 OR cat=1) AND tvType=1 AND pinyin is null';
	$rst = $db->query($sql);
	if (!empty ($rst)) {
		$array = array ();
		foreach ($rst as $rs) {
			$p = F('pinyin_first_char', $rs['tv_name']);
			if (!empty ($p)) {
				$p = substr($p, 0, 1);
				if (is_numeric($p)) {
					$p = '0-9';
				}
				$array[$p] = $rs['tv_name'];
				if (in_array($p, array (
						'0-9',
						'A',
						'B',
						'C',
						'D',
						'E',
						'F',
						'G',
						'H',
						'I',
						'J',
						'K',
						'L',
						'M',
						'N',
						'O',
						'P',
						'Q',
						'R',
						'S',
						'T',
						'U',
						'V',
						'W',
						'X',
						'Y',
						'Z'
					))) {
					$sql = 'UPDATE xwb_xt_tv SET pinyin="' . $p . '" WHERE vid=' . $rs['vid'];
					$rst = $db->execute($sql);
				} else {
					$sql = 'UPDATE xwb_xt_tv SET pinyin="other" WHERE vid=' . $rs['vid'];
					$rst = $db->execute($sql);
				}
			}
		}
		F('xintaotv_map.create_map', 'movie', true);
		F('xintaotv_map.create_map', 'teleplay', true);
	} else {

	}
	print_r($array);
}
function syn_map_tv($type) {
	//$html = file_get_html('http://tv.sohu.com/tvall/');
	$xml = F('http_get_contents', 'http://tv.sohu.com/' . ($type == 'movie' ? 'movieall' : 'tvall') . '/'); //file_get_html('http://tv.sohu.com/tvall/');
	$html = new simple_html_dom();
	$html->load($xml);
	$dl = $html->find('dl', 0);
	$array = array ();
	$db = APP :: ADP('db');
	if ($dl) {
		$dt = $dl->find('dt');
		$dd = $dl->find('dd');
		$length = count($dt);
		for ($i = 0; $i < $length; $i++) {
			$list = array ();
			$t = $dt[$i]->plaintext;
			$d = $dd[$i];
			foreach ($d->find('a') as $a) {
				$teleplay = array ();
				$teleplay['title'] = trim(mb_convert_encoding($a->plaintext, 'UTF-8', 'GBK'));
				$teleplay['url'] = $a->href;
				$teleplay['cat'] = $t;
				$list[] = $teleplay;
				$sql = 'REPLACE xwb_xttv_map_' . $type . '(`url`,`title`,`cat`) VALUES("' . $teleplay['url'] . '","' . $teleplay['title'] . '","' . $t . '")';
				$rst = $db->execute($sql);
			}
			$array[$t] = count($list);
		}
	}
	print_r($array);
}

function syn_map_tv_id($type) {
	$db = APP :: ADP('db');
	$sql = 'SELECT url FROM xwb_xttv_map_' . $type . ' WHERE vid is null AND sid is null';
	$rst = $db->query($sql);
	if (!empty ($rst)) {
		foreach ($rst as $rs) {
			$sid = '';
			$vid = '';
			$htmlTxt = F('http_get_contents', $rs['url']);
			preg_match("'var\s+PLAYLIST_ID=\"([0-9]+)\";'si", $htmlTxt, $match);
			if ($match) {
				$sid = $match[1];
			}
			preg_match("'var\s+vid=[\"]([0-9]+)[\"];'si", $htmlTxt, $match);
			if ($match) {
				$vid = $match[1];
			}
			$key = array ();
			if (!empty ($sid)) {
				$key[] = '`sid`=' . $sid;
			}
			if (!empty ($vid)) {
				$key[] = '`vid`=' . $vid;
			}
			if (!empty ($key)) {
				$sql = 'UPDATE xwb_xttv_map_' . $type . ' SET ' . implode(',', $key) . ' WHERE url="' . $rs['url'] . '"';
				$rst = $db->execute($sql);
			}
		}
	}
}
function syn_map_tv_sid($type) {
	$db = APP :: ADP('db');
	$sql = 'SELECT url,vid FROM xwb_xttv_map_' . $type . ' WHERE vid is not null AND sid is null';
	$rst = $db->query($sql);
	if (!empty ($rst)) {
		foreach ($rst as $rs) {
			$video = F('tv.getSetInfoByVid', -999, '视频信息', $rs['vid']);
			if (!empty ($video)) {
				$sql = 'UPDATE xwb_xttv_map_' . $type . ' SET sid=' . $video['sid'] . ' WHERE url="' . $rs['url'] . '"';
				$rst = $db->execute($sql);
			}
		}
	}
}