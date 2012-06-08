<?php


/**
 * 画报搜索
 * @version $Id$
 */
if (!defined('IN_APPLICATION')) {
	exit ('ACCESS DENIED!');
}
$show_size = 'small';
$pic_jpg = '_120x120.jpg';
$row_size = 5;
//分页
$pager = APP :: N('TaobaoPager', 0, 15, $params['page_no']);
?>
<?php if(count($cats)>0){?>
<div class="selectarea" style="width:760px;">
    <div class="typearea">
	    <div class="selectareali" row="1" style="background:none;">
	        <span class="blank5"></span>
	        <div class="selectareaRight">
	            <ul id="J_FilterChannel">
	            <?php


foreach ($cats as $row) {
	echo '<li style="width:55px;"><a href="#" data-cid="' . $row['id'] . '">' . $row['channel_name'] . '</a></li>';
}
?>
	            </ul>
	        </div>
	        <span class="blank5"></span>
	    </div>
    </div>
</div>
<?php }?>
<div id="J_PosterSearch" class="box" style="width:760px;">
	<div class="shop-display">
	    <div class="hd hidden"><h3><?php echo F('escape', $mod['title']);?></h3></div>
	    <div class="bd">
	    			<?php


if (!empty ($list)) {
	$count = 0;
	$length = count($list);
	foreach ($list as $row) {
		$title = F('escape', $row['title']);
		$url = URL('poster', array (
			'id' => $row['id']
		));
		if ($count % $row_size == 0) {
			echo '<div class="grid ' . $show_size . ' posters"><ul class="shop-list">';
		}
		$covers = explode(',', $row['cover_pic_url']);
		$pic = XT_LAZYLOAD_PIC;
		$picUrl = '';
		if (count($covers) == 1) {
			$picUrl = $covers[0];
			$pic = $picUrl . $pic_jpg;
		} else {
			$picUrl = $covers[count($covers) - 1];
			$pic = $picUrl . $pic_jpg;
		}

		$buttons = '<div class="ks-clear"><a class="addfollow-btn item-share" rel="e:tbs,h:' . $row['id'] . ',t:' . $title . ',u:' . base64_encode($picUrl) . '" href="#"><span class="plus">+</span>分享</a><a class="addfollow-btn item-fav hidden" rel="e:tbf,h:' . $row['id'] . '" href="#"><span class="plus">+</span>收藏</a></div>';
		if ($count % $row_size == ($row_size -1) || $count == $length -1) {
			echo '<li style="margin-right:0px;"><div class="item"><div class="pic"><a href="' . $url . '" title="' . $title . '" target="_blank"><img src="' . $pic . '" alt="' . $title . '" title="' . $title . '"/></a></div>' . $buttons . '<div class="desc"><a href="' . $url . '" target="_blank">' . $title . '</a></div><div class="sales-amount">点击数<em>' . $row['hits'] . '</em>次</div></div></li>';
			echo '</ul></div>';
		} else {
			echo '<li><div class="item"><div class="pic"><a href="' . $url . '" title="' . $title . '" target="_blank"><img src="' . $pic . '" alt="' . $title . '" title="' . $title . '"/></a></div>' . $buttons . '<div class="desc"><a href="' . $url . '" target="_blank">' . $title . '</a></div><div class="sales-amount">点击数<em>' . $row['hits'] . '</em>次</div></div></li>';
		}
		$count++;
	}
} else {
	echo '<div class="noresult" style="padding:10px 0px;"><p>抱歉！没有找到相关的画报，请更换搜索条件后重试</p></div>';
}
?>
	    </div>
	</div>
	<div class="ks-clear"></div>  
</div>
<div class="list-footer" style="padding-bottom:20px;"><div class="page">
<?php


if ((int) $params['page_no'] > 1) {
	echo '<a href="#" data-page="' . ((int) $params['page_no'] - 1) . '" class="btn-s1"><span>上一页</span></a>';
}

if (!empty ($list) && count($list) == $params['show_num']) {
	echo '<a href="#" data-page="' . ((int) $params['page_no'] + 1) . '" class="btn-s1"><span>下一页</span></a>';
}
?>
</div></div>