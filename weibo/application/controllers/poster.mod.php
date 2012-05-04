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

class poster_mod {
	var $uInfo = false;

	function poster_mod() {
		// Cunstructor Here
	}

	/**
	 * 画报
	 */
	function default_action() {
		$id = V('g:id');
		$poster = array ();
		$pics = array ();
		$items = array ();
		$channel = array ();
		$cats = F('top.posterChannelsGet');
		if (isset ($id)) {
			if (is_numeric($id)) {
				//第一步：获取画报详情
				$rst = F('top.posterPosterdetailGet', 93, '淘画报详情', $id);
				if (array_key_exists('poster', $rst)) {
					$poster = $rst['poster'];
				}
				if (array_key_exists('poster_pics', $rst)) {
					$pics = $rst['poster_pics']['huabao_picture'];
				}
				if (!empty ($poster)) {
					$channel = F('top.posterChannelGet', 93, '淘画报详情', $poster['channel_id']);
				}
			}
		}
		TPL :: assign('poster', $poster);
		TPL :: assign('pics', $pics);
		TPL :: assign('items', $items);
		TPL :: assign('channel', $channel);
		TPL :: assign('cats', $cats);
		TPL :: display('xintao/poster');
	}
}