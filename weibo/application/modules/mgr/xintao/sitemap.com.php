<?php


/**
 * 画报数据存储对象
 *
 *  @create 2010/11/6 23:35
 *  @author fxy <fxy060608@gmail.com>
 */
class sitemap {

	/**
	 * 数据库操作对象
	 */
	var $db;

	/**
	 * 构造函数，初始化内部使用的对象
	 *
	 */
	function sitemap() {
		$this->db = APP :: ADP('db');
		$db = & $this->db;
	}

	function getByUserId($USER_ID = '') {
		if (!$USER_ID) {
			$USER_ID = XT_USER_ID;
		}
		$db = APP :: ADP('db');
		$sql = 'SELECT * FROM ' . $db->getTable(T_XT_SITEMAP) . ' WHERE `user_id`=' . $USER_ID;
		return RST($db->getRow($sql));
	}

	/**
	 * 保存数据
	 *
	 * @param $data array 配置内容,如array('title' => 'xxx', 'text' => 'aaaaaa');
	 * @return boolean
	 *
	 */
	function save($data, $id) {
		if (!empty ($data) && is_array($data)) {
			$this->_cleanCache();
			$db = & $this->db;
			$db->setTable(T_XT_SITEMAP);
			return RST($db->save($data, $id, '', 'user_id'));
		} else {
			return RST(false, $errno = 1210000, $err = 'Parameter can not be empty');
		}
	}
	/*
	 * 清除缓存
	 */
	function _cleanCache() {
		DD('mgr/xintao/sitemap.getByUserId');
	}
	/**
	* 卖家站点地图
	* 
	*/
	function seller($nick) {
		///第一步：查找符合限制数量的店铺商品
		///第二步：重新生成sitemap
		set_time_limit(180); //设置总执行时间限制，预期不可超过5分钟。最大请求50次
		$items = array ();
		$this->_seller($items, $nick, 1);
		///静态化
		$editHtm = TPL :: module('xintao/sitemap_baidu', array (
			'items' => $items
		), FALSE, FALSE);
		return RST($editHtm);
	}
	/**
	 * 卖家地图
	 */
	function _seller(& $ids = array (), $nick, $page_no, $limit = null) {
		$rst = F('top.itemsSearch', -999, '站点地图', array (
			'nicks' => $nick,
			'fields' => 'num_iid,title,list_time',
			'page_no' => $page_no,
			'show_num' => 200,
			'order_by' => 'delist_time:asc'
		), true);
		if ($rst) {
			if (isset ($rst['total_results']) && isset ($rst['item_search']) && isset ($rst['item_search']['items']) && isset ($rst['item_search']['items']['item'])) {
				if ($limit == null) {
					$total_results = $rst['total_results'];
					if ($total_results > 5000) {
						$total_results = 5000;
					}
					$limit = ceil($total_results / 200);
				}
				$items = $rst['item_search']['items']['item'];
				foreach ($items as $item) {
					$ids[] = array (
						'id' => $item['num_iid'],
						'title' => $item['title'],
						'list_time' => $item['list_time']
					);
				}
				//echo '第【' . $page_no . '】页,共【' . $limit . '】页:';
			}
		}
		if ($limit != null && $page_no < $limit && $page_no < 25) {
			$this->_seller($ids, $nick, $page_no +1, $limit);
		}
	}
}