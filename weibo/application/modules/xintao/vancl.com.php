<?php
class vancl {
	var $db = null;

	function vancl() {
		$this->db = APP :: ADP('db');
	}
	/**
	 * 根据parentCid获得子分类
	 * @param $page_ids array|int|null 
	 *
	 */
	function getCat($cid = 0) {
		if (!is_numeric($cid)) {
			return RST(false, $errno = 1210002, $err = 'Parameter must be a number');
		}
		$db = $this->db;
		$cid = $db->escape($cid);
		$where = ' WHERE `id` = ' . $cid;
		$sql = 'SELECT * FROM ' . $db->getPrefix() . T_XT_VANCL_CAT . $where;
		return RST($db->getRow($sql));
	}
	/**
	 * 根据parentCid获得子分类
	 * @param $page_ids array|int|null 
	 *
	 */
	function getCats($parentCid = 0) {
		if (!is_numeric($parentCid)) {
			return RST(false, $errno = 1210002, $err = 'Parameter must be a number');
		}
		$db = $this->db;
		$parentCid = $db->escape($parentCid);
		$where = ' WHERE `parentCid` = ' . $parentCid;
		$sql = 'SELECT * FROM ' . $db->getPrefix() . T_XT_VANCL_CAT . $where . ' ORDER BY `nums` desc';
		return RST($db->query($sql));
	}
	/**
	 * 根据cid获得产品数量
	 */
	function getProductsNum($q, $cid = 0, $cat = 'cat1', $isspecial = 0, $sprice = 0, $eprice = 0) {
		if (!is_numeric($cid)) {
			$cid = 0;
		}
		if (!is_numeric($sprice)) {
			$sprice = 0;
		}
		if (!is_numeric($eprice)) {
			$eprice = 0;
		}

		$where = ' WHERE `isValid`=1 ';
		$db = $this->db;
		$q = $db->escape($q);
		$cid = $db->escape($cid);
		$cat = $db->escape($cat);
		if (!empty ($q)) {
			$where .= ' AND `name` like \'%' . $q . '%\'';
		}
		if ($cid != 0) {
			$where .= ' AND ' . $cat . '=' . $cid;
		}
		if ($sprice != 0) {
			$where .= ' AND `currentPrice`*1 >= ' . $sprice;
		}
		if ($eprice != 0) {
			$where .= ' AND `currentPrice`*1 <= ' . $eprice;
		}
		if ($isspecial) {
			$where .= ' AND `isspecial`=1 ';
		}
		$sql = 'SELECT COUNT(*) FROM ' . $db->getPrefix() . T_XT_VANCL_PRODUCT . $where;
		return RST($db->getOne($sql));
	}
	/**
	 * 根据cid获得产品
	 */
	function getProducts($q, $cid = 0, $cat = 'cat1', $isspecial = '', $sortOrder = 0, $sprice = 0, $eprice = 0, $offset = 0, $each = 20) {

		if (!is_numeric($cid)) {
			$cid = 0;
		}
		if (!is_numeric($sortOrder)) {
			$sortOrder = 0;
		}
		if (!is_numeric($offset)) {
			$offset = 0;
		}
		if (!is_numeric($each)) {
			$each = 20;
		}
		if (!is_numeric($sprice)) {
			$sprice = 0;
		}
		if (!is_numeric($eprice)) {
			$eprice = 0;
		}
		$where = ' WHERE `isValid`=1 ';
		$db = $this->db;
		$q = $db->escape($q);
		$cid = $db->escape($cid);
		$cat = $db->escape($cat);
		if (!empty ($q)) {
			$where .= ' AND `name` like \'%' . $q . '%\'';
		}
		if ($cid != 0) {
			$where .= ' AND ' . $cat . '=' . $cid;
		}
		if ($sprice != 0) {
			$where .= ' AND `currentPrice`*1 >= ' . $sprice;
		}
		if ($eprice != 0) {
			$where .= ' AND `currentPrice`*1 <= ' . $eprice;
		}
		if ($isspecial) {
			$where .= ' AND `isspecial`=1 ';
		}
		if ($sortOrder == 3) {
			$where .= ' ORDER BY `currentPrice`*1 asc '; //由低到高
		}
		elseif ($sortOrder == 4) {
			$where .= ' ORDER BY `currentPrice`*1 desc '; //由高到低
		} else {
			$where .= ' ORDER BY `isNew` desc,`productCode`*1 desc '; //默认最新
		}
		$sql = 'SELECT * FROM ' . $db->getPrefix() . T_XT_VANCL_PRODUCT . $where . '  LIMIT ' . $offset . ',' . $each;
		return RST($db->query($sql));
	}
	/**
	 * 一级分类
	 */
	function getProductsCat1($cid = 0, $offset = 0, $each = 1) {
		getProducts($cid, 'cat1', $offset, $each);
	}
	/**
	 * 二级分类
	 */
	function getProductsCat2($cid = 0, $offset = 0, $each = 1) {
		getProducts($cid, 'cat2', $offset, $each);
	}
	/**
	 * 三级分类
	 */
	function getProductsCat3($cid = 0, $offset = 0, $each = 1) {
		getProducts($cid, 'cat3', $offset, $each);
	}
	/**
	 * 四级分类
	 */
	function getProductsCat4($cid = 0, $offset = 0, $each = 1) {
		getProducts($cid, 'cat4', $offset, $each);
	}
	/**
	 * 五级分类
	 */
	function getProductsCat5($cid = 0, $offset = 0, $each = 1) {
		getProducts($cid, 'cat5', $offset, $each);
	}

}