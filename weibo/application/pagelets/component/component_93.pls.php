<?php
require_once dirname(__FILE__) . '/component_abstract.pls.php';
/**
 * 画报详情
 * @author fxy
 * @version $Id: component_93.pls.php
 *
 */
class component_93_pls extends component_abstract_pls {

	function run($mod) {
		parent :: run($mod);
		$id = V('g:id');
		$poster = array ();
		$pics = array ();
		$items = array ();
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
					//第二步：获取画报商品详情
					//$items = F('top.posterPosterGoodsinfoGet', 93, '淘画报详情', $id);
					//第三步：转换画报商品为推广(TODO:数量受限，每次仅能转换40个)
					//					if (!empty ($items)) {
					//						$numIids = '';
					//						$i=0;
					//						foreach ($items as $row) {
					//							$numIids .= $row['auction_id'] . ',';
					//							$i++;
					//							if($i==40)break;
					//						}
					//						if ($numIids != '') {
					//							$taobaokeItems = F('top.taobaokeItemsConvert', 93, '淘画报商品转换', $numIids);
					//							$extra = array ();
					//							if (!empty ($taobaokeItems)) {
					//								foreach ($taobaokeItems as $row) {
					//									$extra[$row['num_iid']] = $row;
					//								}
					//							}
					//							foreach ($items as $row) { //追加至商品详情
					//								$numIid = $row['auction_id'];
					//								if (array_key_exists($numIid, $extra)) {
					//									$row['extra'] = $extra[$numIid];
					//								} else {
					//									$row['extra'] = array ();
					//								}
					//							}
					//						}
					//					}
					$channel = F('top.posterChannelGet', 93, '淘画报详情', $poster['channel_id']);
				}
			}
		}

		TPL :: module('xintao/poster', array (
			'mod' => $mod,
			'poster' => $poster,
			'pics' => $pics,
			'items' => $items,
			'channel' => $channel,
			'cats' => $cats
		));
		return array (
			'posterId' => $id
		);
	}
}