<?php
function addSite($nick, $url) {
	$result = json_decode(F('http_get_contents', XT_PIWIK_REST_URL . '&method=SitesManager.getSitesIdFromSiteUrl&url=' . $url));
	if (empty ($result)) { //判断是否已经有统计网站了,无则新增
		$result = json_decode(F('http_get_contents', XT_PIWIK_REST_URL . '&method=SitesManager.addSite&ecommerce=1&siteName=' . $nick . '&urls=' . $url));
		if (!empty ($result)) {
			F('xintao.update_config_file', array (
				'XT_PIWIK_ID' => '' . $result->value
			), XT_USER_ID); //更新统计
		}
	} else {
		if (XT_PIWIK_ID == '') {
			F('xintao.update_config_file', array (
				'XT_PIWIK_ID' => '' . $result[0]->idsite
			), XT_USER_ID); //更新统计
		}
	}
}
function getLastVisitsDetails() {
	$result = json_decode(F('http_get_contents', XT_PIWIK_REST_URL . '&method=Live.getLastVisitsDetails&idSite=' . XT_PIWIK_ID . '&period=range&date=last30&filter_limit=5'), true);
	if (empty ($result)) {
		return array ();
	}
	return $result;
}
function getItemsSku($pageNo = 1, $filter_limit = 20) {
	$filter_offset = ($pageNo -1 >= 0) ? $pageNo -1 : 0;
	$filter_offset *= $filter_limit;
	$result = json_decode(F('http_get_contents', XT_PIWIK_REST_URL . '&method=Goals.getItemsSku&idSite=' . XT_PIWIK_ID . '&period=month&date=today&filter_offset=' . $filter_offset . '&filter_limit=' . $filter_limit), true);
	if (empty ($result)) {
		$result = array ();
	}
	return $result;
}
function convertReferrer($visit) {
	$type = $visit['referrerType'];
	if ($type == 'search') { //搜索引擎
		echo $visit['referrerName'] . '<br/>关键词：<a href="' . F('escape', $visit['referrerUrl']) . '" target="_blank">' . F('escape', $visit['referrerKeyword']) . '</a>';
	}
	elseif ($type == 'website') {
		echo $visit['referrerTypeName'] . '<br/><a href="' . F('escape', $visit['referrerUrl']) . '" target="_blank">' . F('escape', $visit['referrerName']) . '</a>';
	}
	elseif ($type == 'direct') {
		echo $visit['referrerTypeName'];
	}
	elseif ($type == 'campaign') {
		echo $visit['referrerTypeName'];
	} else {
		echo $visit['referrerTypeName'];
	}
}
?>
