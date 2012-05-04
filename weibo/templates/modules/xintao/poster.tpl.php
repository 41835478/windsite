<?php


/**
 * 画报详情展现
 * @version $Id$
 */
if (!defined('IN_APPLICATION')) {
	exit ('ACCESS DENIED!');
}
?>
<!-- 搜索 开始 -->
<?php

?>


<!-- 搜索 结束 -->
<div class="search-nav"><ul class="crumbs" id="J_VanclCrumbs"><li class="list-item" data-id="0"><a href="<?php echo URL('posters',array('channel_ids'=>''))?>">所有频道</a></li><?php if (!empty($channel)) {echo '<li><a href="'.URL('posters',array('channel_ids'=>$channel['id'])).'">' . $channel['channel_name'] . '</a></li>';}?><li><?php if(!empty($poster)){echo $poster['title'];}?></li></ul><div class="blank0"></div></div>
<?php if(count($cats)>0){?>
<div class="selectarea" style="border-top-width:0px;">
    <div class="typearea">
	    <div class="selectareali" row="1" style="background:none;">
	        <span class="blank5"></span>
	        <div class="selectareaRight">
	            <ul>
	            <?php


$urlTemp = URL('posters', array (
	'channel_ids' => 'CID'
));
foreach ($cats as $row) {
	$url = str_replace('CID', $row['id'], $urlTemp);
	echo '<li style="width:60px;"><a href="' . $url . '">' . $row['channel_name'] . '</a></li>';
}
?>
	            </ul>
	        </div>
	        <span class="blank5"></span>
	    </div>
    </div>
</div>
<?php }?>
<?php if(!empty($poster)){?>
<div id="J_Poster" class="poster-detail">
<div class="poster_path" style="margin-top:20px;">
	<h2><?php echo $poster['title']?></h2>
	<span>(<span class="current-page" id="J_CurrentPage">1</span>/<span id="J_TotalPage"><?php echo count($pics);?></span>)</span>
	<p class="poster-tools hidden">
		<a href="#" class="J_AddFavor add-favor">收藏</a>
		<a href="#" hidefocus="true" class="J_ToggleSkin lighten">关灯</a>
		<a href="http://huabao.taobao.com/life/a-395650.htm" target="_blank" class="list">全部</a>
	</p>
</div>
<div class="poster-goods">
	<h4 style="display: none; ">本图片包含商品</h4>
	<div id="J_PosterRelatedGoods" class="related-goods-list" style="display: none;"></div>
	<div class="ks-clear"></div>
</div>
<!--图片描述-->
<div class="poster-title" style="padding-top:5px;background: #F1F1F1;">
  	<p id="J_DescRgn" class="description" style="display: block;margin-bottom:0px;"></p>
</div>
<!--暂时不启用：相关宝贝-->
<div class="related-goods ks-clear" style="background: #F1F1F1;padding-top:10px;display: none; ">
	<a class="related-goodslink" id="J_RelatedGoodsLink" target="_blank" href="#">相关宝贝</a>
</div>
<!-- poster 主体区域开始 -->
<div class="poster-container">
	<div class="poster-tags">
		<span>标签:</span>
		<span id="J_PosterTag">
			<?php echo $poster['tag'];?>
		</span>
	</div>
	<div class="poster-box J_PosterImageArea">
        <div class="image-wrapper J_ImageWrap" style="position:relative;"><img <?php if (!empty ($pics)) {echo 'src="'.$pics[0]['pic_url'].'_620x10000.jpg"';}?> style="display:none;"/><span id="J_PosterImageLoading" style="background:url(<?php echo XT_LOADING_PIC?>) no-repeat;width:32px;height:32px;position:absolute;top:100px;left:294px;"></span></div>
    </div>
    <div class="poster-sidebar">
		<!--<div class="poster-prev pic s60"><span>上一图集</span><a href="http://huabao.taobao.com/life/d-395651.htm#poster-detail" class="J_LocateToPrevPoster"><img src="http://img04.taobaocdn.com/poster_pic/i4/T1TjOeXatDXXaH.X6X.JPEG_81x65.jpg" alt="上一图集" width="60" /></a></div>-->
		<div class="poster-thumb J_PosterThumb">
			<a hidefocus="true" class="prev-thumb" id="J_ThumbScrollPrev" href="#">上一页</a>
				<div class="poster-thumb-list" style="position: relative;">
					<ul class="J_ThumbContent thumb-content" style="position: absolute;">
						<?php


if (!empty ($pics)) {
	$i = 0;
	echo '<li class="thumb-first-notice" data-thumbItemIndex="-1"></li>';
	foreach ($pics as $pic) {
		echo '<li data-thumbitemindex="' . ($i++) . '" class="J_ThumbItems"><div class="pic s60"><a><img data-picid="' . $pic['pic_id'] . '" data-original="' . base64_encode($pic['pic_url']) . '" src="' . XT_LAZYLOAD_PIC . '" alt="' . htmlspecialchars($pic['pic_note']) . '"></a></div></li>';
	}
	echo '<li class="thumb-last-notice" data-thumbItemIndex="'.count($pics).'"></li>';
}
?>
					</ul>
					<b id="J_ThumbCurrent" class="thumbCurrent" style="position: absolute; top: 76px; "><b></b></b>
                </div>
			<a hidefocus="true" class="next-thumb" id="J_ThumbScrollNext" href="#">下一页</a>
		</div>
		<!--<div class="poster-next pic s60"><a href="http://huabao.taobao.com/life/d-395638.htm#poster-detail" class="J_LocateToNextPoster"><img src="http://img04.taobaocdn.com/poster_pic/i4/T1JkaeXdFBXXaH.X6X.JPEG_81x65.jpg" alt="下一图集" width="60" /></a><span>下一图集</span></div>-->
	</div>
	<div class="ks-clear"></div>
</div>
<!-- poster 主体区域结束 -->
<div class="ks-clear"></div>
</div>
<?php Xpipe :: pagelet('xintao.posterMarkerData', $poster); ?>
<?php }else{echo '<div class="msg24"><p class="error" style="height:22px;">对不起，您浏览的画报可能已被删除、重命名或暂时不可用。</p></div>';}?>