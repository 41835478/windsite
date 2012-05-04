<?php
function syn_weibo_type($rows, $index, $db, $urls) {
	$ret = DR('xweibo/xwb.shortUrlBatchInfo', false, $urls);
	if (!empty ($ret['errno'])) {
		print_r($ret);
		exit;
	}
	$ret = $ret['rst'];
	if ($ret) {
		$result = array ();
		$json = array ();
		$types = array ();
		foreach ($ret as $var) {
			$matches = array ();
			preg_match("/^http:\/\/t.cn\/(.*)/", $var['url_short'], $matches);
			$url_short_id = $matches[1];
			$url = $var['url_long'];
			$type = 6;
			if (stripos($url, '/poster/')) {
				$type = 3;
			}
			elseif (stripos($url, '/xiaohua/')) {
				$type = 4;
			}
			elseif (stripos($url, '/tv/')) {
				$type = 5;
			}
			elseif (stripos($url, '/item/id-')) {
				$type = 2;
			} else {
				preg_match("/^http:\/\/shop[0-9]+.taobao.com/", $url, $matches); //淘宝店铺
				if (count($matches) == 1) {
					$type = 1;
				}
				preg_match("/^http:\/\/item.taobao.com/", $url, $matches); //淘宝商品
				if (count($matches) == 1) {
					$type = 2;
				}

			}
			$types[$url] = $type;
			if ($type > 0) {
				$db->execute('UPDATE ' . $db->getPrefix() . T_WEIBO_COPY . '_' . $index . ' SET type=' . $type . ' WHERE id=' . $rows[$url_short_id]);
			}
		}
		echo ('表【' . $index . '】');
		print_r($types);
	}
}