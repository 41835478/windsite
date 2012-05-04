<?php
if (!defined('IN_APPLICATION')) {
	exit ('ACCESS DENIED!');
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<?php


$site = '新淘高清视频';
$params = $mod['param'];
$titleCats = '';
if (isset ($params['o']) && !empty ($params['o'])) {
	if ($params['o'] == 1) {
		$titleCats .= '总播放最多';
	}
	if ($params['o'] == 3) {
		$titleCats .= '最新发布';
	}
	if ($params['o'] == 4) {
		$titleCats .= '评分最高';
	}
	if ($params['o'] == 5) {
		$titleCats .= '日播放最多';
	}
	if ($params['o'] == 7) {
		$titleCats .= '周播放最多';
	}
}
if (isset ($params['year']) && !empty ($params['year'])) {
	$titleCats .= $params['year'];
}
if (isset ($params['area']) && !empty ($params['area'])) {
	$titleCats .= $params['area'];
}
if (isset ($params['age']) && !empty ($params['age'])) {
	$titleCats .= $params['age'];
}
if (isset ($params['cs']) && !empty ($params['cs'])) {
	$titleCats .= $params['cs'];
}
if (isset ($params['cat']) && !empty ($params['cat'])) {
	$titleCats .= $params['cat'];
}
if (isset ($params['tvType']) && !empty ($params['tvType'])) {
	if ($params['tvType'] == 1) {
		$titleCats .= '正片';
	}
	elseif ($params['tvType'] == 3) {
		$titleCats .= '非正片';
	} else {
		$titleCats .= '全部';
	}
}
if (!empty ($params['key'])) {
	echo '<title>' . ($params['page_no'] > 1 ? ('第' . $params['page_no'] . '页 - ') : '') . $params['key'] . (!empty ($cats['name']) ? (' - ' . $cats['name']) : '') . ' - ' . $site . '</title>';
	echo '<meta name="title" content="' . ($params['page_no'] > 1 ? ('第' . $params['page_no'] . '页 - ') : '') . $params['key'] . ' - ' . $site . '">';
	echo '<meta name="keywords" content="' . $params['key'] . ',' . $site . '">';
	echo '<meta name="description" content="' . $site . '为您提供' . $params['key'] . ($params['page_no'] > 1 ? ('第' . $params['page_no'] . '页') : '') . '最新，最热的相关' . (!empty ($cats['name']) ? $cats['name'] : '视频') . '及评论">';

}
elseif (!empty ($cats['name'])) {
	echo '<title>' . ($params['page_no'] > 1 ? ('第' . $params['page_no'] . '页 - ') : '') . ($titleCats != '' ? $titleCats : '') . $cats['name'] . ' - ' . $site . '</title>';
	echo '<meta name="title" content="' . ($params['page_no'] > 1 ? ('第' . $params['page_no'] . '页 - ') : '') . $cats['name'] . ' - ' . $site . '">';
	echo '<meta name="keywords" content="' . $cats['name'] . ',' . $site . '">';
	echo '<meta name="description" content="' . $site . '为您提供' . $cats['name'] . '频道' . $titleCats . ($params['page_no'] > 1 ? ('第' . $params['page_no'] . '页') : '') . '最新，最热的相关' . $cats['name'] . '及评论">';
} else {
	echo '<title>影视搜索结果页 - ' . $site . '</title>';
}
?>
<?php TPL::plugin('include/css_link');?>
<?php TPL::plugin('include/js_link');?>
<link href="http://www.xintaowang.com/css/default/tv.css" rel="stylesheet" type="text/css" />
</head>
<body id="sotv">
	<div id="wrap">
		<div class="wrap-in">
			<?php TPL::plugin('include/xintaoTvHeader',array('channel'=> V('-:sotv/'.$params['c'].'/name'),'key'=>$params['key'])); ?>
			<div id="container">
				<div class="blank12H"></div>
				<div class="extra">
					<!-- 站点导航 开始 -->
					<div class="indexMenu bord ks-clear">
						<h2><span>分类检索</span></h2>
						<ul>
							<?php


$sotvs = V('-:sotv');
foreach ($sotvs as $sotv) {
	echo '<li ' . ($params['c'] == $sotv['id'] ? 'class="now"' : '') . '><a href="' . URL('video.search', array (
		'c' => $sotv['id']
	)) . '">' . $sotv['title'] . '</a></li>';
}
?>
						</ul>
					</div>
					<!-- 站点导航 结束 -->
				</div>
				<div class="content">
					<div class="main">
                    	<div class="main-bd" style="margin-top:0px;">
                    <?php


if (!empty ($cats['name'])) {
?>
		<div class="seleRe bord ks-clear">
			<div class="l"><?php echo $cats['name']; ?></div>
			<div class="c">
				<div class="ca ll"></div>			
				<div class="cb ll"><ul></ul></div>
				<div class="cc ll">共有 <span> <?php echo $pagination['count'];?> </span> 个符合条件的视频</div>
			</div>
		</div>
<?php


}
?>
                    	<?php Xpipe :: pagelet('xintaoTv.tvSearchCat',array('cats'=>$cats,'queryStr'=>$mod['param']));?>
                    	<?php


if ($pagination != null) {
	$pager = APP :: N('TaobaoPager', $pagination['count'], 40, $params['page_no']);
?>		
		<div class="menuC">
			<div class="l">
				<?php


	$orderUrl = array_filter($params);
	$orderUrl['o'] = 'ORDER';
	$orderUrl = URL('video.search', $orderUrl);
?>
				<ul>
					<li <?php echo $params['o']==''?'class="libg"':'';?>><a rel="nofollow" href="<?php echo str_replace('ORDER','',$orderUrl);?>">相关程度</a></li>
					<?php if($params['c']!=9001){?>
					<li <?php echo $params['o']==5?'class="libg"':'';?>><a rel="nofollow" href="<?php echo str_replace('ORDER','5',$orderUrl);?>">日播放最多</a></li>
					<li <?php echo $params['o']==7?'class="libg"':'';?>><a rel="nofollow" href="<?php echo str_replace('ORDER','7',$orderUrl);?>">周播放最多</a></li>
					<?php }?>
					<li <?php echo $params['o']==1?'class="libg"':'';?>><a rel="nofollow" href="<?php echo str_replace('ORDER','1',$orderUrl);?>">总播放最多</a></li>
					<li <?php echo $params['o']==3?'class="libg"':'';?>><a rel="nofollow" href="<?php echo str_replace('ORDER','3',$orderUrl);?>">最新发布</a></li>
					<?php if($params['c']!=9001&&$params['c']!=1300&&$params['c']!=1301){?>
					<li <?php echo $params['o']==4?'class="libg"':'';?>><a rel="nofollow" href="<?php echo str_replace('ORDER','4',$orderUrl);?>">评分最高</a></li>
					<?php }?>
					<li class="pagination" style="width:200px;height: 25px;padding: 0px;background:none;"><?php echo $pager->show('video.search', $params, 'top');?></li>
				</ul>
			</div>
			<div class="taglist">
			</div>
		</div>
				
		<div class="jsonPP ks-clear" id="videoData">
		<?php


	$columnIndex = 0;
	foreach ($pagination['resultList'] as $vIndex => $video) {
		$url = F('tv.getNewPlayLink', isset ($video['sid']) ? $video['sid'] : -1, isset ($video['vid']) ? $video['vid'] : -1, isset ($video['cid']) ? $video['cid'] : -1);
		if ($columnIndex % 4 == 0) {
			echo "<div class=\"vData ks-clear\">";
		}
?>					
			<div class="vInfo">
				<div class="vPic">
					<a href="<?php echo $url;?>" >
						<img src="<?php echo $video['video_big_pic']?$video['video_big_pic']:'http://js1.my.tv.sohu.com.cn/ppp/mv/styles/index/images/default/default.jpg';?>" width="120" alt="" />
					</a>
					<div class="label"><i></i><em><?php echo $video['tip'];?></em></div>
<?php


		// 是否付费视频
		if (isset ($video['fee']) && $video['fee'] == 1) {
			echo "<span class=\"payPos\"></span>";
		}
?>
							<!--
							<span class="cq_ico"></span>
							-->
						</div>				
						<div class="vTxt">
							<h4>
							<a href="<?php echo $url;?>" ><?php echo $video['tv_name'];?></a></h4>		
							
							<?php echo !empty($video['main_actor'])?("<p>主演：".F('xintaotv.xtv_main_actor',$params['c'],$video['main_actor'],'')."</p>"):"";?>
							<?php


		if (isset ($video['cid']) && $video['cid'] == 16) {
			// 动漫
			echo !empty ($video['director']) ? ("<p>年龄：" . $video['director'] . "</p>") : "";
		} else
			if (isset ($video['cid']) && $video['cid'] == 9001) {
				// 播客
				echo !empty ($video['tv_source']) ? ("<p>播主：" . $video['tv_source'] . "</p>") : "";
			} else
				echo !empty ($video['director']) ? ("<p>导演：" . $video['director'] . "</p>") : "";
?>
							<p>总播放：<em><?php echo $video['tv_play_count'];?>次</em></p>
						</div>
					</div>						
<?php


		if (++ $columnIndex % 4 == 0) {
			echo "</div>";
		}
	}
	// 补齐</div>
	if ($columnIndex > 0 && $columnIndex % 4 != 0) {
		echo "</div>";
	}
?>
		</div>
		<div class="jumpB ks-clear">
<?php


	//echo SoUtil :: getPageTag($page, $pagination->count, $pageUrl . "&page=#pg#", $pageSize, true, true);
?>	
		</div>
<div class="pagination" style="width:700px;" align="center">
<div class="page-bottom" style="width:450px;">
<?php echo $pager->show('video.search', $params, 'bottom');?>
<div class="ks-clear"></div>
</div>
</div>
<?php


} // End of pagination 
?>
                        </div>
					</div>
				</div>
			<?php TPL::module('xintao/tv/ads/ad950x88');?>	
			</div>
			<!-- 尾部 开始 -->
			<?php TPL::module('xintaoTvFooter');?>
			<!-- 尾部 结束 -->
		</div>
	</div>
	<?php TPL::module('gotop');?>
</body>
<script>
(function(X, $) {
	if($('#J_TVSearchInput').attr('data-tips'))
		$('#J_TVSearchInput').focusText('搜索'+$('#J_TVSearchInput').attr('data-tips'));
})(Xwb, $);			
</script>	
</html>
