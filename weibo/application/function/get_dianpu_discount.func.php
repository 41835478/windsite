<?php
include_once ('simple_html_dom.php');
function get_dianpu_discount() {
	$cats = array (
		'nvzhuang',
		'jujia',
		'xiangbao',
		'nanxie',
		'nvxie',
		'neiyi',
		'nanzhuang'
	);
	$db = APP :: ADP('db');
	$db->execute('DELETE FROM xwb_xttv_dianpu_discount');
	foreach ($cats as $cat) {
		_get_dianpu_discount($cat, 1);
	}
	$discounts = $db->query('SELECT * FROM xwb_xttv_dianpu_discount');
	if (!empty ($discounts)) {
		CACHE :: set(TB_CACHE_TV_KEY_PRE . 'Discounts', $discounts);
	}
}
function _get_dianpu_discount($cat, $pageNo = 1) {
	$xml = F('http_get_contents', 'http://dianpu.tao123.com/' . $cat . '/discount_list_' . $pageNo . '.php?pid=mm_13667242_0_0');
	$html = new simple_html_dom();
	$html->load($xml);
	$list = $html->find('ul.cg_discount li a');
	if ($list && !empty ($list) && count($list) > 0) {
		$db = APP :: ADP('db');
		foreach ($list as $a) {
			$img = $a->find('img', 0);
			$dl = $a->find('dl', 0);
			$dt = $dl->find('dt', 0);
			$dds = $dl->find('dd');
			if ($img && $dt && $dds && count($dds) == 4) {
				$url = $a->href;
				$pic_url = $img->src;
				$title = trim(mb_convert_encoding($dt->innertext, 'UTF-8', 'GBK'));
				$zhekou = trim(mb_convert_encoding($dds[0]->innertext, 'UTF-8', 'GBK'));
				$description = trim(mb_convert_encoding($dds[1]->innertext, 'UTF-8', 'GBK'));
				$dateline = trim(mb_convert_encoding($dds[2]->innertext, 'UTF-8', 'GBK'));
				$datedesc = trim(mb_convert_encoding($dds[3]->innertext, 'UTF-8', 'GBK'));
				$sql = 'REPLACE xwb_xttv_dianpu_discount(`cat`,`title`,`url`,`pic_url`,`zhekou`,`description`,`dateline`,`datedesc`) VALUES("' . $cat . '","' . $title . '","' . $url . '","' . $pic_url . '","' . $zhekou . '","' . $description . '","' . $dateline . '","' . $datedesc . '")';
				$rst = $db->execute($sql);
			}
		}

		$pages = $html->find('div.paginator a');
		if ($pages && !empty ($pages) && count($pages) > 1) {
			foreach ($pages as $page) {
				$p = $page->plaintext;
				if (is_numeric($p) && $p > $pageNo) {
					_get_dianpu_discount($cat, $p);
				}
			}
		}
	}
	$html->clear();
}