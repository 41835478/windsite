<?php


/**
 * 页面SEO
 * 
 */
function web_page_seo($page_id, $keys = array (), $values = array (), $pre = false, $suf = false) {
	$seo = DS('xintao/seo.getById', 'g0', $page_id);
	if (!$seo) { //未个性化设置，则取系统默认
		$data = V('-:sys_pages/' . $page_id);
		if ($data) {
			$seo = array (
				'title' => $data['page_name'],
				'keyword' => $data['keyword'],
				'description' => $data['description']
			);
		}
	}
	$site = F('escape',V('-:sysConfig/site_name'));;
	$preStr = $pre === false ? V('-:tpl/title/_pre') : $pre . ' - ';
	$sufStr = $suf === false ? V('-:tpl/title/_suf') : ' - ' . $suf;
	if ($seo) { //替换
		if ($seo['description']) {
			$seo['description'] = str_replace(array_merge(array (
				'[站点名称]',
				'[页面标题]'
			), $keys), array_merge(array (
				$site,
				$seo['title']
			), $values), $seo['description']);
		}
		echo "<title>" . $preStr . $seo['title'] . " - " . $site . $sufStr . "</title>\n";
		echo "<meta name=\"keywords\" content=\"" . $seo['keyword'] . "\" />\n";
		echo "<meta name=\"description\" content=\"" . $seo['description'] . "\" />\n";
	} else {
		echo F('web_page_title', false, false, $pre, $suf) . "\n";
	}
}
/**
 * 标题打乱（默认缓存1个月）
 */
function title($title) {
	return $title;
	//return DS('xintao/seo.title', 'g0/' . CACHE_24X30, $title);
}