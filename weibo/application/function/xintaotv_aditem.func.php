<?php
include_once ('simple_html_dom.php');
function xintaotv_aditem() {
	$html = file_get_html('http://top.taobao.com/interface_v2.php?pid=mm_13667242_2648971_9638779&type=x&f=html&ie=utf8&from=taoke&unid=&name=%E4%BB%8A%E6%97%A5%E5%85%B3%E6%B3%A8%E9%A3%99%E5%8D%87&trtp=1&up=true&goodsFilter=b2c&sw=950&sh=1080&sn=20&rn=5&pn=14&ls=4&rs=4&bgc=FFFFFF&bc=D9D9D9&fc=404040&tc=404040&cat_ids=TR_FS%2CTR_MY%2CTR_SP%2CTR_JJ%2CTR_ZH%2CTR_WT');
	$J_Tit = $html->find('#J_Tit li');
	$J_Cnt = $html->find('#J_Cnt ol');
	if (!empty ($J_Tit) && !empty ($J_Cnt) && count($J_Cnt) == count($J_Tit)) {
		for ($i = 0; $i < count($J_Tit); $i++) {
			$li = $J_Tit[$i];
			$cat = $li->getAttribute('data-cat');
			$lis = $J_Cnt[$i]->find('li');
			$array = array ();
			if (!empty ($cat) && !empty ($lis)) {
				for ($j = 0; $j < 20; $j++) {
					$li = $lis[$j];
					$img = $li->find('div.pic img', 0);
					$title = $li->find('a.title', 0);
					$price = $li->find('span.price em', 0);
					$volume = $li->find('span.sales', 0);
					if ($img && $title && $price && $volume) {
						$item = array ();
						$item['title'] = iconv("gbk", "utf-8//IGNORE", $title->getAttribute('title'));
						$item['price'] = $price->plaintext;
						$item['volume'] = str_replace(array (
							'本月销售：',
							'件'
						), array (
							'',
							''
						), iconv("gbk", "utf-8//IGNORE", $volume->plaintext));
						$item['pic_url'] = $img->src;
						$item['click_url'] = $title->href;
						$_item = DS('xintao/adItem.getById', '', $cat, $j +1);
						if (empty ($_item)) {
							$item['id'] = ($j +1);
							$item['cat'] = $cat;
							DS('xintao/adItem.save', '', $cat, $item);
						} else {
							DS('xintao/adItem.save', '', $cat, $item, ($j +1));
						}
					}

				}
			}
		}
		CACHE :: set(TB_CACHE_TV_KEY_PRE . 'TopItem4', null);
		CACHE :: set(TB_CACHE_TV_KEY_PRE . 'TopItem5', null);
		CACHE :: set(TB_CACHE_TV_KEY_PRE . 'TopItem20', null);
	}
}