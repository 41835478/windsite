<?php


/**
 * 单分类查询
 */
function getCat($id = -999, $title = '未知模块', $cid = 0) {
	$ret = VANCL('xintao/vancl.getCat', 'g0/' . CACHE_24, $cid);
	if ($ret['errno']) {
		P_ERROR(L('pls__top__apiError', 'vancl.getCat', $ret['err'], $ret['errno']), $id, $title);
		return;
	}
	return $ret['rst'];
}
/**
 * 根据CID查询产品数量
 */
function getProductsNum($id = -999, $title = '未知模块', $q, $parentCid = 0, $cat = 'cat1', $isspecial = 0, $sprice = 0, $eprice = 0) {
	$ret = VANCL('xintao/vancl.getProductsNum', 'g0/' . CACHE_24, $q, $parentCid, $cat, $isspecial, $sprice, $eprice);
	if ($ret['errno']) {
		P_ERROR(L('pls__top__apiError', 'vancl.getCat', $ret['err'], $ret['errno']), $id, $title);
		return;
	}
	return $ret['rst'];
}
/**
 * 凡客商品搜索
 */
function getProducts($id = -999, $title = '未知模块', $q, $parentCid = 0, $cat = 'cat1', $isspecial = 0, $sortOrder = 0, $sprice = 0, $eprice = 0, $offset = 0, $each = 1) {
	$ret = VANCL('xintao/vancl.getProducts', 'g0/' . CACHE_24, $q, $parentCid, $cat, $isspecial, $sortOrder, $sprice, $eprice, $offset, $each);
	if ($ret['errno']) {
		P_ERROR(L('pls__top__apiError', 'vancl.getCat', $ret['err'], $ret['errno']), $id, $title);
		return;
	}
	return $ret['rst'];
}
/**
 * 获得凡客分类
 */
function getCats($id = -999, $title = '未知模块', $parentCid = 0) {
	$ret = VANCL('xintao/vancl.getCats', 'g0/' . CACHE_24, $parentCid);
	if ($ret['errno']) {
		P_ERROR(L('pls__top__apiError', 'vancl.getCats', $ret['err'], $ret['errno']), $id, $title);
		return;
	}
	return $ret['rst'];
}
/**
 * 解析同步凡客商品库
 */
function parseVancl() {
	$reader = new XMLReader();
	$reader->open(dirname(__FILE__) . '/../../xintao/install/vancl/onsale_products_20110713.xml.hx1');
	//TODO 目前由java端完成解析入库更新任务
	//	while ($reader->read()) {
	//		if ($reader->nodeType == XMLReader :: TEXT) { //判断node类型  
	//			
	//		}
	//	}
	$reader->close();
}
?>