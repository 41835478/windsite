<?php


/**************************************************
*  Created:  2010-06-08
*
*  fxy060608
*
*  @Xintao 
*  @Author fxy <fxy060608@gmail.com>
*
***************************************************/

class taobaoUser_mod {
	var $uInfo = false;

	function taobaoUser_mod() {
		if (!USER :: isTaobaoLogin()) { //未登录淘宝，需登录
			APP :: redirect(TB_CONTAINER, 3);
		}
	}
	/**
	 * 关注掌柜说
	 */
	function followAdd() {
		//TODO 看看平台是否计算该API错误率，否则，需先调用check
		$shop_owner_id = V('p:shop_owner_id');
		$session = USER :: get('taobao_session'); //当前用户淘宝SESSION
		if (empty ($shop_owner_id)) {
			APP :: ajaxRst('', 11000, '未指定要关注的掌柜');
		}
		if (empty ($session)) {
			APP :: ajaxRst('', 11000, '您尚未登录淘宝');
		}
		$ret = F('top.jianghuFanFollow', -999, '关注掌柜说', array (
			'shop_owner_id' => $shop_owner_id,
			'session' => $session
		), true);
		if ($ret['errno']) {

			if (strstr($ret['err'], 'isv.repeat-follow')) { //已关注的话，目前提示关注成功
				APP :: ajaxRst('您已经关注该掌柜');
			}
			APP :: ajaxRst('', $ret['errno'], $ret['err']);
		}
		$rst = $ret['rst'];
		if ($rst['follow_result']) {
			APP :: ajaxRst('关注成功');
		} else {
			APP :: ajaxRst('', $shop_owner_id, '关注失败');
		}
	}
	/**
	 * 添加收藏夹
	 */
	function favoriteAdd() {
		$item_numid = V('p:item_numid');
		$collect_type = V('p:collect_type');
		if (empty ($item_numid)) {
			APP :: ajaxRst('', 11000, '未指定收藏对象');
		}
		if (empty ($collect_type)) {
			APP :: ajaxRst('', 11000, '未指定收藏类型');
		}
		$ret = F('top.favoriteAdd', -999, '添加收藏夹', array (
			'item_numid' => $item_numid,
			'collect_type' => $collect_type,
			'session' => USER :: get('taobao_session')
		));
		if ($ret['errno']) {
			if (strstr($ret['err'], 'isv.add-service-erroris:already_collect')) { //已收藏的话，目前提示收藏成功
				APP :: ajaxRst('您已经收藏该' . ($collect_type == 'SHOP' ? '店铺' : '商品'));
			}
			APP :: ajaxRst('', $ret['errno'], $ret['err']);
		}
		$rst = $ret['rst'];
		if ($rst['success']) {
			APP :: ajaxRst('添加收藏成功');
		} else {
			APP :: ajaxRst('', $item_numid, '添加收藏失败');
		}
	}
}