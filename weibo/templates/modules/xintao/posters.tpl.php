<?php


/**
 * 画报搜索
 * @version $Id$
 */
if (!defined('IN_APPLICATION')) {
	exit ('ACCESS DENIED!');
}
$pic_jpg = '_160x160.jpg';
$params = $mod['param'];
$queryStr = $params;
$show_size = $queryStr['show_size'];
$row_size = 4;
if ('big' == $show_size) {
	$pic_jpg = '_250x250.jpg';
	$row_size = 3;
}
elseif ('small' == $show_size) {
	$pic_jpg = '_120x120.jpg';
	$row_size = 5;
}
//分页
$pager = APP :: N('TaobaoPager', 0, 20, $queryStr['page_no']);
?>
<!-- 搜索 开始 -->
<?php Xpipe::pagelet('common.xtSearchMod',array('keyword'=>$queryStr['key_word'])); ?>
<!-- 搜索 结束 -->
<div class="search-nav"><ul class="crumbs" id="J_VanclCrumbs"><li class="list-item" data-id="0"><a href="<?php echo URL('posters',array('key_word'=>$queryStr['key_word'],'date'=>$queryStr['date'],'show_size'=>$queryStr['show_size']))?>">所有频道</a></li>
<?php if($cat){echo '<li>' . $cat['channel_name'] . '</li>';}?>
</ul><div class="blank0"></div></div>
<?php if(count($cats)>0){?>
<div class="selectarea" style="border-top-width:0px;">
    <div class="typearea">
	    <div class="selectareali" row="1" style="background:none;">
	        <span class="blank5"></span>
	        <div class="selectareaRight">
	            <ul>
	            <?php


$urlTemp = URL('posters', array (
	'channel_ids' => 'CID',
	'show_size' => $queryStr['show_size']
));
foreach ($cats as $row) {
	$url = str_replace('CID', $row['id'], $urlTemp);
	echo '<li style="width:55px;"><a href="' . $url . '">' . $row['channel_name'] . '</a></li>';
}
?>
	            </ul>
	        </div>
	        <span class="blank5"></span>
	    </div>
	    <div class="selectareali" row="1" style="display:none;background:none;padding-left:60px;">
	        <span class="blank5"></span>
	        <div class="selectareaLeft" style="margin-left:-60px;width:60px;">时间:</div>
	        <div class="selectareaRight" style="width:640px;">
	            <ul>
	            <li><a href="<?php echo URL('posters')?>">不限</a></li><li><a href="<?php echo URL('posters',array('date'=>'today'))?>">今天</a></li><li><a href="<?php echo URL('posters',array('date'=>'yesterday'))?>">昨天</a></li><li><a href="<?php echo URL('posters',array('date'=>'week'))?>">最近一周</a></li><li><a href="<?php echo URL('posters',array('date'=>'month'))?>">最近一月</a></li>
	            </ul>
	        </div>
	        <span class="blank5"></span>
	    </div>
    </div>
</div>
<?php }?>
<div id="J_PosterSearch" class="box">
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
		if (count($covers) == 1) {
			$pic = base64_encode($covers[0] . $pic_jpg);
		} else {
			$pic = base64_encode($covers[count($covers) - 1] . $pic_jpg);
		}
		if ($count % $row_size == ($row_size -1) || $count == $length -1) {
			echo '<li style="margin-right:0px;"><div class="item"><div class="pic"><a href="' . $url . '" title="' . $title . '" target="_blank"><img src="' . XT_LAZYLOAD_PIC . '" data-original="' . $pic . '" alt="' . $title . '" title="' . $title . '"/></a></div><div class="desc"><a href="' . $url . '" target="_blank">' . $title . '</a></div><div class="sales-amount">点击数<em>' . $row['hits'] . '</em>次</div></div></li>';
			echo '</ul></div>';
		} else {
			echo '<li><div class="item"><div class="pic"><a href="' . $url . '" title="' . $title . '" target="_blank"><img src="' . XT_LAZYLOAD_PIC . '" data-original="' . $pic . '" alt="' . $title . '" title="' . $title . '"/></a></div><div class="desc"><a href="' . $url . '" target="_blank">' . $title . '</a></div><div class="sales-amount">点击数<em>' . $row['hits'] . '</em>次</div></div></li>';
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
<div class="list-footer"><div class="page">
<?php


if ((int) $queryStr['page_no'] > 1) {
	echo '<a href="' . URL('posters', array_merge($queryStr, array (
		'page_no' => ((int) $queryStr['page_no'] - 1)
	))) . '" class="btn-s1"><span>上一页</span></a>';
}

if (!empty ($list) && count($list) == $queryStr['show_num']) {
	echo '<a href="' . URL('posters', array_merge($queryStr, array (
		'page_no' => ((int) $queryStr['page_no'] + 1)
	))) . '" class="btn-s1"><span>下一页</span></a>';
}
?>
</div></div>