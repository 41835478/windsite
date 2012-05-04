<?php


/**
 * 获得站点所有页面列表
 */
function get_pages_select() {
	$pageList = DR('PageModule.getPagelistByType');
	$pages = array ();
	foreach ($pageList as $key => $page) {
		$page['check'] = F('xintao.check_page', $page['page_id']);
		$pages[] = $page;
	}
	return $pages;
}
/**
 * 获得站点所有内置页面列表
 */
function native() {
	$natives = V('-:sys_pages');
	$pages = array ();
	foreach ($natives as $key => $page) {
		$page['check'] = F('xintao.check_page', $page['page_id']);
		$pages[] = $page;
	}
	return $pages;
}
?>