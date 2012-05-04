<?php
include_once ('simple_html_dom.php');
function get_brand() {
	$brands = array (
		'cat-1' => 'fz',
		'cat-2' => 'ny',
		'cat-3' => 'ps',
		'cat-4' => 'xp',
		'cat-5' => 'yt',
		'cat-6' => 'yd',
		'cat-7' => 'xb',
		'cat-8' => 'pj',
		'cat-9' => 'jf',
		'cat-10' => 'jj'
	);
	$xml = F('http_get_contents', 'http://www.tmall.com/go/chn/mall/temai/brands.php');
	$html = new simple_html_dom();
	$html->load($xml);
	$list = $html->find('ul#J_LogosTrigger li');
	if ($list && !empty ($list) && count($list) > 1) {
		$db = APP :: ADP('db');
		for ($i = 0; $i < count($list); $i++) {
			$li = $list[$i];
			$cat = trim($li->getAttribute('class'));
			$cat = $brands[$cat];
			if (isset ($cat) && !empty ($cat)) {
				$a = $li->find('a', 0);
				if ($a) {
					$b = $a->find('.tmsspr-img', 0);
					if ($b) {
						$href = mb_convert_encoding($a->href, 'UTF-8', 'GBK');
						$title = mb_convert_encoding($a->getAttribute('title'), 'UTF-8', 'GBK');
						$logo = $b->getAttribute('style');
						if (!empty ($title) && !empty ($logo)) {
							$sql = 'SELECT count(*) FROM xwb_xttv_brand WHERE name="' . $title . '"';
							$count = $db->getOne($sql);
							if ($count == 0) {
								$sql = 'INSERT INTO xwb_xttv_brand(`name`,`logo`,`cat`,`sortOrder`,`href`) VALUES("' . $title . '","' . $logo . '","' . ($cat) . '",' . $i . ',"' . $href . '")';
								$rst = $db->execute($sql);
							} else {
								$sql = 'UPDATE xwb_xttv_brand SET href="' . $href . '" WHERE name="' . $title . '"';
								$rst = $db->execute($sql);
							}
						}
					}
				}
			}
		}
	}
}
//banner-img
function get_brand_item() {
	set_time_limit(1200); //设置总执行时间限制，预期不可超过2分钟。
	$db = APP :: ADP('db');
	$sql = 'SELECT * FROM xwb_xttv_brand';
	$brands = $db->query($sql);
	$result = array ();
	foreach ($brands as $brand) {
		$xml = F('http_get_contents', mb_convert_encoding($brand['href'], 'GBK', 'UTF-8'));
		$html = new simple_html_dom();
		$html->load($xml);
		$banner = $html->find('div.banner-img img', 0);
		$newBrand = array ();
		if ($banner) {
			$src = $banner->src;
			if ($src != $brand['banner']) {
				$newBrand[] = 'banner="' . $db->escape($src) . '"';
			}
		}
		$description = $html->find('div.logoText p', 0);
		if ($description) {
			$description = mb_convert_encoding($description->plaintext, 'UTF-8', 'GBK');
			if ($description != $brand['description']) {
				$newBrand[] = 'description="' . $db->escape($description) . '"';
			}
		}
		$shopLogo = $html->find('a.shop-logo img', 0);
		if ($shopLogo) {
			$shopLogo = $shopLogo->src;
			if ($shopLogo != $brand['shopLogo']) {
				$newBrand[] = 'shopLogo="' . $db->escape($shopLogo) . '"';
			}
		}
		if (!empty ($newBrand)) {
			$sql = 'UPDATE xwb_xttv_brand SET ' . (implode(',', $newBrand)) . ' WHERE name="' . $brand['name'] . '"';
			$db->execute($sql);
		}

		$lis = $html->find('ul.col-list li');
		$result[$brand['name']] = count($lis);
		if ($lis && !empty ($lis) && count($lis) > 0) {
			$sql = 'DELETE FROM xwb_xttv_brand_item WHERE cat="' . $brand['name'] . '"'; //删除所有旧的商品
			$db->execute($sql);
			$isRefresh = false;
			for ($i = 0; $i < count($lis); $i++) {
				$li = $lis[$i];
				$a = $li->find('a.img', 0);
				if ($a) {
					$href = $a->href;
					$nid = '';
					preg_match("'id=([0-9]+)'si", $href, $match);
					if ($match) {
						$nid = $match[1];
						if (!empty ($nid) && is_numeric($nid)) {
							$volume = '';
							$saled = $a->find('span.saled', 0);
							if (!$saled) {
								$saled = $a->find('span.sell-out', 0);
							}
							if ($saled) {
								$volume = trim(mb_convert_encoding($saled->plaintext, 'UTF-8', 'GBK'));
							}
							$img = $a->find('img.zoom', 0);
							$pic_url = '';
							if ($img) {
								$pic_url = $img->src;
								$desc = $li->find('a.desc', 0);
								if ($desc) {
									$title = trim(mb_convert_encoding($desc->plaintext, 'UTF-8', 'GBK'));
									if (!empty ($title)) {
										$marketPrice = $li->find('.marketPrice', 0);
										if ($marketPrice) {
											$marketPrice = trim(mb_convert_encoding($marketPrice->plaintext, 'UTF-8', 'GBK'));
										} else {
											$marketPrice = '';
										}
										$discountPrice = $li->find('.discountPrice', 0);
										if ($discountPrice) {
											$discountPrice = trim(mb_convert_encoding($discountPrice->plaintext, 'UTF-8', 'GBK'));
										} else {
											$discountPrice = '';
										}
										$sql = 'INSERT INTO xwb_xttv_brand_item(`nid`,`title`,`pic_url`,`marketPrice`,`discountPrice`,`volume`,`sortOrder`,`cat`) VALUES(' . $nid . ',"' . $title . '","' . $pic_url . '","' . $marketPrice . '","' . $discountPrice . '","' . $volume . '",' . $i . ',"' . $brand['name'] . '")';
										$db->execute($sql);
										$isRefresh = true;
									}
								}
							}
						}
					}
				}
			}
			if ($isRefresh) { //更新商品缓存
				F('get_xintaotv_brand', $brand['name'], true);
			}
		}
		$sql = 'UPDATE xwb_xttv_brand SET isSyn=1 WHERE name="' . $brand['name'] . '"';
		$db->execute($sql);
		$html->clear();
	}
	print_r($result);

}