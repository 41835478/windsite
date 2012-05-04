<?php


/**
 * 卖家站点地图
 * 
 */
function seller($nick) {
	$ret = TB('mgr/xintao/sitemap.seller', 'g0/' . CACHE_24, $nick);
	if ($ret['rst']) {
		///静态化
		print_r($ret['rst']);
	}

}