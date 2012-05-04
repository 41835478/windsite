<?php
include_once ('simple_html_dom.php');
function get_sohu_tv_cover() {
	set_time_limit(3600); //设置总执行时间限制，预期不可超过2分钟。
	for ($i = 1; $i < 54; $i++) {
		_get_sohu_tv_cover($i);
	}
	get_sohu_tv_covers();
	F('get_xintaotv_juqing.syn_juqing_tvsets');
	F('get_xintaotv_juqing.syn_juqing_title');

}
function _get_sohu_tv_cover($p) {
	$html = file_get_html('http://so.tv.sohu.com/list_p12_p2_p3_p4-1_p5_p6_p73_p80_p9-1_p10' . $p . '_p11.html');
	$list = $html->find('div#videoData .vTxt  h4 a');
	$db = APP :: ADP('db');
	if ($list && !empty ($list)) {
		$count = 0;
		foreach ($list as $li) {
			$href = $li->href;
			//if (strpos($href, 'http://tv.sohu.com/s', 0) === 0) {
			$htmlTxt = F('http_get_contents', $href);
			preg_match("'var\s+PLAYLIST_ID=\"([0-9]+)\";'si", $htmlTxt, $match);
			if ($match) {
				$sql = 'SELECT count(*) FROM xwb_xttv_covers WHERE sid=' . $match[1];
				$count = $db->getOne($sql);
				if ($count == 0) {
					$sql = 'INSERT INTO xwb_xttv_covers(`sid`,`title`,`href`) VALUES(' . $match[1] . ',"' . trim(mb_convert_encoding($li->plaintext, 'UTF-8', 'GBK')) . '","' . $href . '")';
					$rst = $db->execute($sql);
					$count++;
				}
			} else {
				continue;
			}
			//	}
		}
		echo 'page[' . $p . ']=>' . $count . ',';
	}
	$html->clear();
}
function get_sohu_tv_covers() {
	set_time_limit(1200); //设置总执行时间限制，预期不可超过2分钟。
	$db = APP :: ADP('db');
	$sql = 'SELECT * FROM xwb_xttv_covers WHERE cover is null AND isSyn=0';
	$rst = $db->query($sql);
	echo count($rst);
	$count = 0;
	$array = array ();
	foreach ($rst as $rs) {
		$xml = F('http_get_contents', $rs['href']);
		$html = new simple_html_dom();
		$html->load($xml);
		$focus = $html->find('#picFocus', 0);
		if ($focus) {
			$img = $focus->find('img', 0);
			if ($img) {
				//echo $img->src;
				$sql = 'UPDATE xwb_xttv_covers SET `cover`= "' . trim($img->src) . '",`isSyn`=1 WHERE sid=' . $rs['sid'];
				$rst = $db->execute($sql);
			} else {
				preg_match("'src=\"([^<]*)\"'si", $focus, $match);
				if ($match) {
					$array[$rs['href']] = $match[1];
					$sql = 'UPDATE xwb_xttv_covers SET `cover`= "' . trim($match[1]) . '",`isSyn`=1 WHERE sid=' . $rs['sid'];
					$rst = $db->execute($sql);
				} else {
					$array[$rs['href']] = '';
				}
			}
		} else {
			echo $rs['href'] . '，';
			$sql = 'UPDATE xwb_xttv_covers SET `isSyn`=1 WHERE sid=' . $rs['sid'];
			$rst = $db->execute($sql);
		}
		$html->clear();
	}
	print_r($array);
}