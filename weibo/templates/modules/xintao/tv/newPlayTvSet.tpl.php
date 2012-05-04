<?php


/**
 * 视频专辑展现
 * @version $Id$
 */
if (!defined('IN_APPLICATION')) {
	exit ('ACCESS DENIED!');
}
?>

	<?php


if (isset ($pagination) && !empty ($pagination)) {
?>
	
		    	<?php


	$videos = $pagination['resultList'];
	if ($cat != 2 && $cat != 16) { //不是电视剧,动漫则反转
		$videos = array_reverse($videos);
	}
	elseif (($cat == 2 || $cat == 16) && $tvSets > count($videos)) {
		$videos = array_reverse($videos);
	}
	$count = 0;
	$isBoke = isset ($isBoke) && $isBoke ? true : false;
	$vid = $isBoke ? V('g:bid') : V('g:vid');
	$chunks = array_chunk($videos, 20);
	$height = ($cat == 2 || $cat == 16 ? '76' : '270');
	echo '<div class="ks-clear">';
	echo '<div class="fi_btn fi_prev" style="height:' . $height . 'px"><a href="javascript:void(0)" hidefocus="true"></a></div>';
	echo '<div style="position:relative;float:left;width:632px;overflow:hidden;height:' . $height . 'px">';
	echo '<div class="ks-switchable-content pList' . ($cat == 2 || $cat == 16 ? '' : 'A') . '" id="playContH">';
	$currentIndex = 0;
	foreach ($chunks as $chunk) {
		echo '<div>';
		if ($count > 0) {
			//echo '<textarea class="ks-datalazyload-custom hidden" width="632px">';
		}
		echo '<ul>';
		foreach ($chunk as $video) {
			$url = '';
			$_vid = 0;
			if ($isBoke) { //播客
				$_vid = $video['vid'];
				$url = URL('video', array (
					'bid' => $video['vid']
				));
			} else { //非播客
				$_vid = isset ($video['tv_ver_id']) ? $video['tv_ver_id'] : $video['tvVerId'];
				$url = URL('video', array (
					'vid' => isset ($video['tv_ver_id']) ? $video['tv_ver_id'] : $video['tvVerId']
				));
			}
			$now = '';
			if ($vid == $_vid) {
				$now = ' class="now"';
				$currentIndex = $count;
			}
			$_tvName = isset ($video['tv_name']) ? $video['tv_name'] : $video['tvName'];
			$_videoOrder = isset ($video['video_order']) ? $video['video_order'] : $video['videoOrder'];
			if ($cat == 2 || $cat == 16) { //电视剧或动漫
				echo '<li' . $now . '><a href="' . $url . '" target="_self" title="' . $_tvName . '">第' . $_videoOrder . '集</a></li>';
			} else { //其他
				echo '<li' . $now . '><a href="' . $url . '" target="_self" title="' . $_tvName . '">' . $_tvName . '</a></li>';
			}

		}
		echo '</ul>';
		if ($count > 0) {
			//echo '</textarea>';
		}
		echo '</div>';
		$count++;
	}
	echo '</div>';
	echo '</div>';
	echo '<div class="fi_btn fi_next" style="height:' . $height . 'px"><a href="javascript:void(0)" hidefocus="true"></a></div>';
	echo '</div>';
	echo '<div class="ks-clear" align="center" style="padding:10px 0px;"><ul class="ks-switchable-nav ks-clear" style="width:630px;">';
	for ($i = 0; $i < $count; $i++) {
		echo '<li ' . ($currentIndex == $i ? 'class="ks-active"' : '') . '><span>' . ($i +1) . '</span></li>';
	}
	echo '</ul></div>';
?>
	<?php } ?>