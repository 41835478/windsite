<?php
include (P_ADMIN_MODULES . '/action.abs.php');
class track_mod extends action {
	var $AUTO_CRONS = "";

	function track_mod() {
		parent :: action();
	}

	function getLastVisitsDetails() {
		if (XT_FREE_DATELINE != '') {
			$this->_error('您当前是体验版，不提供访客记录查询');
		}
		$result = F('piwik.getLastVisitsDetails');
		TPL :: assign('list', $result);
		TPL :: display('mgr/xintao/track/lastVisitsDetails', '', 0, false);
	}
	function getItemsSku() {
		if (XT_FREE_DATELINE != '') {
			$this->_error('您当前是体验版，不提供商品访问记录查询');
		}
		TPL :: display('mgr/xintao/track/getItemsSku', '', 0, false);
	}
	function getItemsSkuAjax() {
		$pageNo = V('g:page_no', 1);
		$result = F('piwik.getItemsSku', $pageNo); //获取本年度的商品推广
		$items = array ();
		$error = '';
		if (!empty ($result)) { //不为空，转换为淘宝商品
			if (!isset ($result['result'])) {
				$num_iids = array ();
				foreach ($result as $row) {
					$num_iids[] = $row['label'];
				}
				$ret = F('top.itemsListGet', -999, '商品推广', array (
					'num_iids' => implode(',', $num_iids)
				), true);
				if ($ret['rst']) {
					if (isset ($ret['rst']['items'])) {
						$items_ = $ret['rst']['items']['item'];
						foreach ($result as $row) { //循环合并
							$count = 0;
							foreach ($items_ as $item) {
								if ($row['label'] == $item['num_iid']) {
									$row['title'] = $item['title'];
									$row['price'] = $item['price'];
									$row['nick'] = $item['nick'];
									array_splice($items_, $count, 1); //移除当前元素
								}
								$count++;
							}
							$items[] = $row;
						}
					}
				}
			} else {
				$error = isset ($result['message']) && !empty ($result['message']) ? $result['message'] : '发生未知错误，请重试';
			}
		} else {
			$result = array ();
		}
		$editHtm = TPL :: module('xintao/getItemsSkuAjax', array (
			'list' => $items,
			'page_no' => $pageNo,
			'error' => $error
		), FALSE, FALSE);
		APP :: ajaxRst($editHtm);
	}

}