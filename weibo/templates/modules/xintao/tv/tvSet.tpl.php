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
			<ul id="la">
				<li><span>共<?php echo $pagination['count'];?>集</span></li>
			</ul>
			<a id="getdesc" class="a1 color3" style="cursor:pointer;" onClick="$('#allist .similarLists li').reverseOrder();">更改排序</a>
		</div>
		<div class="similarLists pp ppc" id="similarLists">
		    <ul style="display: block; ">  
		    	<?php


	$videos = $pagination['resultList'];
	if ($cat != 2 && $cat != 16) { //不是电视剧,动漫则反转
		$videos = array_reverse($videos);
	}
	$count = 0;
	$isBoke = isset ($isBoke) && $isBoke ? true : false;
	foreach ($videos as $video) {
		if ($isBoke) {//播客
			$url = URL('tv', array (
				'bid' => $video['vid']
			));
			$title = $video['tv_name'];
			$pic = ($video['cutCoverURL']);
			echo '<li ' . ($count > 19 ? 'class="tvmore hidden"' : '') . '><a target="_blank" href="' . $url . '"><span class="label"><code class="ch"></code></span>';
			echo '<img height="90" width="120" alt="' . $title . '" src="' . $pic . '"></a>';
			echo '<span><strong><a target="_blank" href="' . $url . '">' . $title . '</a> </strong><em>时长：' . F('tv.getTimes', $video['videoLength']) . '</em></span>';
		} else {//非播客
			$url = URL('tv', array (
				'vid' => isset ($video['tv_ver_id']) ? $video['tv_ver_id'] : $video['tvVerId']
			));
			$title = isset ($video['tv_name']) ? $video['tv_name'] : $video['tvName'];
			$pic = isset ($video['video_big_pic']) ? $video['video_big_pic'] : $video['videoImage'];
			echo '<li ' . ($count > 19 ? 'class="tvmore hidden"' : '') . '><a target="_blank" href="' . $url . '"><span class="label"><code class="ch"></code></span>';
			echo '<img height="90" width="120" alt="' . $title . '" src="' . $pic . '"></a>';
			echo '<span><strong><a target="_blank" href="' . $url . '">' . $title . '</a> </strong><em>时长：' . F('tv.getTimes', isset ($video['time_length']) ? $video['time_length'] : $video['timeLength']) . '</em></span>';
		}

		$count++;
	}
?>
			</ul>
			<?php if($count>19){?>
			<div style="text-align:center;width:100%;" align="center"><a class="btn-s2" style="cursor:pointer;" onclick="if($(this).find('span').text()=='展开全部'){$('#similarLists .tvmore').removeClass('hidden');$(this).find('span').text('收起内容');}else{$('#similarLists .tvmore').addClass('hidden');$(this).find('span').text('展开全部');}return false;"><span>展开全部</span></a></div>	
			<?php }?>
		</div>
	</div>
	<div class="blank12H"></div>
	<?php } ?>