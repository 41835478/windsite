<?php
include (P_ADMIN_MODULES . '/action.abs.php');
function merge_cats($category, $cat) {
	if ($category['category_id'] == $cat['cid']) {
		$cat['count'] = $category['count'];
	}
	return $cat;
}
class sitemap_mod extends action {
	var $SITEMAPS = "";

	function sitemap_mod() {
		parent :: action();
	}

	function default_action() {
		$sitemaps = DS('mgr/xintao/sitemap.getByUserId');
		if (!$sitemaps || count($sitemaps) == 0) { //如果未初始化，则插入
			DS('mgr/xintao/sitemap.save', '', array (
				'user_id' => XT_USER_ID
			));
			$sitemaps = DS('mgr/xintao/sitemap.getByUserId');
		}
		TPL :: assign('sitemap', $sitemaps);
		TPL :: display('mgr/xintao/sitemap', '', 0, false);
	}
	/**
	 * 更新站点地图配置
	 */
	function update() {
		$type = V('p:type', '');
		$sitemap = DS('mgr/xintao/sitemap.getByUserId');
		if (!$sitemap || count($sitemap) == 0) { //如果未初始化，则插入
			DS('mgr/xintao/sitemap.save', '', array (
				'user_id' => XT_USER_ID
			));
			$sitemap = DS('mgr/xintao/sitemap.getByUserId');
		}
		$pmParam = array ();
		$url = URL('mgr/xintao/sitemap.default_action');
		if (in_array($type, array (
				'items',
				'posters',
				'tvs',
				'products'
			))) { //商品地图,画报地图
			$data = array ();
			$param = (array) (V('p:param'));
			if (!empty ($sitemap[$type]) && is_array($param)) {
				$pmParam = json_decode($sitemap[$type], TRUE);
				$pmParam = is_array($pmParam) ? $pmParam : array ();
			}
			$data[$type] = json_encode(array_merge($pmParam, $param)); //将传递的参数merge到原配置中
			DS('mgr/xintao/sitemap.save', '', $data, XT_USER_ID); //更新
			$url = URL('mgr/xintao/sitemap.default_action', array (
				'tab' => $type
			));
		}
		elseif ($type == 'keywords') {
			$param = (array) (V('p:keyword'));
			$param = array_filter($param);
			$data[$type] = json_encode($param); //将传递的参数merge到原配置中
			DS('mgr/xintao/sitemap.save', '', $data, XT_USER_ID); //更新
			$url = URL('mgr/xintao/sitemap.default_action', array (
				'tab' => $type
			));
		}
		$this->_succ('操作已成功', $url);
	}
	function cids() {
		$cids = V('p:cids', '');
		if ($cids != '') {
			APP :: ajaxRst(array_slice(F('top.itemcatsGet', -999, '分类地图', $cids, true, false), 0, 100));
		}
		APP :: ajaxRst('');
	}
	function saveCids() {
		$cids = V('p:cids', '');
		DS('mgr/xintao/sitemap.save', '', array (
			'cids' => $cids
		), XT_USER_ID);
		APP :: ajaxRst('操作成功');
	}
	function getChildcids() {
		$cid = V('g:cid', '');
		if ($cid != '') {
			APP :: ajaxRst(F('top.itemcatsGetByCid', -999, '分类地图', $cid, true, false));
		}
		APP :: ajaxRst('');
	}
	function keywordsUpload() {
		if ($this->_isPost()) {
			$xls = $_FILES["keywords_xls"];
			if ($xls["error"] > 0) {
				APP :: ajaxRst($xls["error"], 8888, '上传发生错误，请重试');
			} else {
				if ($xls['size'] > 500 * 1024) {
					$state = '上传关键词的大小不能超过500K';
					break;
				}
				require_once 'application/function/reader.php';
				$data = new Spreadsheet_Excel_Reader();
				$data->setOutputEncoding('UTF-8');
				$data->read($xls["tmp_name"]);
				$keywords = array ();
				for ($i = 2; $i <= $data->sheets[0]['numRows']; $i++) {
					$keywords[] = $data->sheets[0]['cells'][$i][1];
					if ($i == 101) {
						break;
					}
				}
				$param = array_filter($keywords);
				$result = array ();
				$result['keywords'] = json_encode($keywords); //将传递的参数merge到原配置中
				DS('mgr/xintao/sitemap.save', '', $result, XT_USER_ID); //更新

			}
		}
		$this->_succ('操作已成功', URL('mgr/xintao/sitemap.default_action', array (
			'tab' => 'keywords'
		)));
	}
	function seller_sitemap() {
		F('sitemap.seller', '柠檬绿茶');
	}
}