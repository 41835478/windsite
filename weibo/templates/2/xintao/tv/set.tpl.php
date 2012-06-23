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


$site = F('escape', V('-:sysConfig/site_name'));
if (isset ($video) && !empty ($video)) {
	$cName = $video['tv_cont_cats'];
	$sotv = array ();
	if (isset ($video['tv_category_id'])) {
		$sotv = V('-:sotv/' . $video['tv_category_id']);
	}
	if (!empty ($sotv)) {
		$cName = $sotv['title'];
	}
	echo '<title>' . $video['tv_name'] . '-' . $cName . '-' . $site . '</title>';
	echo '<meta name="title" content="' . $video['tv_name'] . '-' . $cName . '-' . $site . '">';
	echo '<meta name="keywords" content="' . $video['tv_cont_cats'] . ',' . $video['tv_name'] . ',' . $video['main_actor'] . ',' . $site . '">';
	echo '<meta name="description" content="' . $site . $cName . '频道为您提供:' . $video['tv_name'] . '的最全，最新，最热的相关视频及评论">';

} else {
	echo '<title>影视频道-' . $site . '</title>';
}
?>
<?php TPL::plugin('include/css_link');?>
<?php TPL::plugin('include/js_link');?>
<script src="<?php echo W_BASE_URL;?>js/xintao/reverseorder/jquery.reverseorder.packed.js"></script>
<link href="http://static.xintaowang.com/css/default/tv.css" rel="stylesheet" type="text/css" />
<link href="http://static.xintaowang.com/css/default/xintao/sotv/dianshiju.css" rel="stylesheet" type="text/css" />
</head>

<body id="sotv">
	<div id="wrap">
		<div class="wrap-in">
			<?php TPL::plugin('include/header'); ?>
			<div id="container">
				<div class="extra" style="width:260px;">
					<div class="blockRA bord ks-clear" style="width:256px;">
						<h2><span><?php echo $video['tv_name']?></span></h2>
    					<div class="cont">
							<?php if(isset($video['director'])&&!empty($video['director'])) echo '<p>导演：'.$video['director'].'</p>';?>
    						<?php if(isset($video['main_actor'])&&!empty($video['main_actor'])) echo '<p>主演：'.$video['main_actor'].'</p>';?>
    						<?php if(isset($video['tvSets'])&&!empty($video['tvSets'])) echo '<p>集数：'.$video['tvSets'].'</p>';?>
    						<?php if(isset($video['tv_year'])&&!empty($video['tv_year'])) echo '<p>年份：'.$video['tv_year'].'</p>';?>
    						<?php if(isset($video['area'])&&!empty($video['area'])) echo '<p>地区：'.$video['area'].'</p>';?>
    						<?php if(isset($video['tv_cont_cats'])&&!empty($video['tv_cont_cats'])) echo '<p>类型：'.$video['tv_cont_cats'].'</p>';?>
            				<div class="line1"></div>
            				<div class="d1">
            					<span id="infoL" style="display: none; "><?php echo $video['tv_desc'];?></span>
            					<span id="infoS" style="display: block; "><?php echo F('tv.utf8Substr',$video['tv_desc'],0,200);?>...</span>
            					<span id="infoC" class="shTxt"><a style="cursor:pointer;" onclick="if($(this).text()=='展开全部'){$('#infoS').hide();$('#infoL').show();$(this).text('收起内容');}else{$('#infoL').hide();$('#infoS').show();$(this).text('展开全部')}return flase;">展开全部</a></span>
            				</div>
        				</div>
    				</div>
				</div>
				<div class="content" style="margin-left: 260px;">
					<div class="main">
                    	<div class="main-bd" style="margin-top:0px;">
							<div class="blockLA bord ks-clear" id="blockA" style="width:656px;">
					        	<div class="tab1 ks-clear">
					        	    <a name="pllist_full"> </a>
					            	<ul>
					                    <li class="tk1 active" onclick="$(this).addClass('active').siblings().removeClass('active');$('#J_TVTopic').hide();$('#allist').show();"><a>剧集列表</a></li>
					                    <!--<li class="tk1"><a>剧集列表</a></li>
					                    <li class="tk2"><a>片 花</a></li>
					                    <li class="tk3"><a>剧集介绍</a></li>
					                    <li class="tk4"><a>相 关</a></li>
					                    <li class="tk5"><a>影 评</a></li>-->
					                    <li class="tk6" onclick="$(this).addClass('active').siblings().removeClass('active');$('#allist').hide();$('#J_TVTopic').show();"><a>评 论</a></li>
					            	</ul>
					        	</div>
        						<div class="tab1line"></div>
        						<div class="tab1cont" id="allist" style="display: block; ">
            					<?php


$sid = isset ($sid) ? $sid : $video['sid'];
$cat = isset ($video['tv_category_id']) && !empty ($video['tv_category_id']) ? $video['tv_category_id'] : 1;
if (!empty ($sid) && !empty ($cat)) {
	Xpipe :: pagelet('xintao.tvSet', array (
		'sid' => $sid,
		'cat' => $cat,
		'tvSets' => isset ($video['tvSets']) ? $video['tvSets'] : 10000
	));
}
?>								</div>
							    <div class="tab1cont" id="J_TVTopic" style="display: none; ">
					                <?php if(!empty($video))Xpipe :: pagelet('xintao.tvTopic', $video['tv_name']);?>
							    </div>
							</div>
                        </div>
					</div>
				</div>
			</div>
			<!-- 尾部 开始 -->
			<?php TPL::module('footer');?>
			<!-- 尾部 结束 -->
		</div>
	</div>
	<?php TPL::module('gotop');?>
</body>
</html>
