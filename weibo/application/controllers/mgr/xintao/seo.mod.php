<?php
include (P_ADMIN_MODULES . '/action.abs.php');
class seo_mod extends action {
	function seo_mod() {
		parent :: action();
	}
	//SEO
	function default_action() {
		$id = V('g:id');
		$seo = array ();
		if (is_numeric($id)) {
			$seo = DS('xintao/seo.getById', '', $id);
			if (empty ($seo)) { //不存在，则新增
				//根据ID判断是否是内置
				$page = V('-:sys_pages/' . $id);
				if (!empty ($page)) {
					$seo = array (
						'title' => $page['page_name'],
						'page_id' => $page['page_id'],
						'keyword' => $page['keyword'],
						'description' => $page['description']
					);
				} else { //自定义

				}
				DS('xintao/seo.save', '', $seo);
			}
			TPL :: assign('seo', $seo);
			TPL :: display('mgr/xintao/seo', '', 0, false);
		} else {
			$this->_error('页面编号错误');
		}
	}
	/**
	 * 更新SEO
	 */
	function update() {
		$id = trim(V('p:page_id'));
		if (is_numeric($id)) {
			$rs = DR('xintao/seo.save', '', array (
				'title' => trim(V('p:title')),
				'keyword' => trim(V('p:keyword')),
				'description' => trim(V('p:description'))
			), $id);
			$url = URL('mgr/xintao/seo.default_action', array (
				'id' => $id
			));
			$this->_succ('操作已成功', $url);
		} else {
			$this->_error('页面编号错误');
		}
	}
}