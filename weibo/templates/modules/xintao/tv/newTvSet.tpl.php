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
	<div class="d1 clear"></div>
	<div id="list_asc" class="palist">
		<div class="d2">
			<?php if(!$isBoke){?>
			<ul id="la">
				<li style="width:300px;text-align:left;">
					<span id="J_TvSetTip">
					<?php if(isset($tvSets)&&!empty($tvSets)){?>共<?php echo $tvSets;?>集<?php if($tvSets>$pagination['count']){echo ',更新至'.$pagination['count'].'集';}else{echo '全';}?><?php }else{?>
					共<?php echo $pagination['count'];?>集全
					<?php }?>	
					</span>
				</li>
			</ul>
			<?php }?>
			<a id="getdesc" class="a1 color3 hidden" style="cursor:pointer;" onClick="$('#allist .similarLists li').reverseOrder();">更改排序</a>
		</div>
		<div class="similarLists pp ppc" id="similarLists">
		     
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
	$chunks = array_chunk($videos, 20);
	foreach ($chunks as $chunk) {
		if ($count > 0) {
			echo '<textarea class="ks-datalazyload invisible" height="1050px" width="656px">';
		}
		echo '<ul>';
		foreach ($chunk as $video) {
			if ($isBoke) { //播客
				$url = URL('video', array (
					'bid' => $video['vid']
				));
				$title = $video['tv_name'];
				$pic = ($video['cutCoverURL']);
				echo '<li><a  href="' . $url . '"><span class="label"><code class="ch"></code></span>';
				echo '<img height="90" width="120" alt="' . $title . '" src="' . $pic . '"></a>';
				echo '<span><strong><a  href="' . $url . '">' . $title . '</a> </strong><em>时长：' . F('tv.getTimes', $video['videoLength']) . '</em></span>';
			} else { //非播客
				$url = URL('video', array (
					'vid' => isset ($video['tv_ver_id']) ? $video['tv_ver_id'] : $video['tvVerId']
				));
				$title = isset ($video['tv_name']) ? $video['tv_name'] : $video['tvName'];
				$pic = isset ($video['video_big_pic']) ? $video['video_big_pic'] : $video['videoImage'];
				echo '<li><a  href="' . $url . '"><span class="label"><code class="ch"></code></span>';
				echo '<img height="90" width="120" alt="' . $title . '" src="' . $pic . '"></a>';
				echo '<span><strong><a  href="' . $url . '">' . $title . '</a> </strong><em>时长：' . F('tv.getTimes', isset ($video['time_length']) ? $video['time_length'] : $video['timeLength']) . '</em></span>';
			}
		}
		echo '</ul>';
		if ($count > 0) {
			echo '</textarea>';
		}
		$count++;
	}
?>
			
		</div>
	</div>
	<div class="blank12H"></div>
	<?php } ?>