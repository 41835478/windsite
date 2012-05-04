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
$cName = '';
$tvName = '';
$sid = isset ($sid) ? $sid : $video['sid'];
if (isset ($video) && !empty ($video)) {
	$cName = $video['tv_cont_cats'];
	$tvName = $video['tv_name'];
	$sotv = array ();
	if (isset ($video['tv_category_id'])) {
		$sotv = V('-:sotv/' . $video['tv_category_id']);
	}
	if (!empty ($sotv)) {
		$cName = $sotv['title'];
	}
	echo '<title>' . $video['tv_name'] . '全集' . (isset ($video['tvSets']) ? ('(1-' . $video['tvSets'] . '全)') : '') . '-' . $cName . '-' . $site . '</title>';
	echo '<meta name="title" content="' . $video['tv_name'] . '-' . $cName . '-' . $site . '">';
	echo '<meta name="keywords" content="' . $video['tv_cont_cats'] . ',' . $video['tv_name'] . ',' . $video['main_actor'] . ',' . $site . '">';
	echo '<meta name="description" content="' . $cName . '《' . $video['tv_name'] . '》' . (isset ($video['tvSets']) ? ('(1-' . $video['tvSets'] . '全)') : '') . '剧集,分集剧情介绍列表:' . htmlentities(F('tv.utf8Substr',$video['tv_desc'],0,200),ENT_COMPAT,'UTF-8') . '">';

} else {
	echo '<title>影视频道-' . $site . '</title>';
}
?>
<?php TPL::plugin('include/css_link');?>
<?php TPL::plugin('include/js_link');?>
<script src="http://a.tbcdn.cn/s/kissy/1.2.0/kissy-min.js"></script>
<link href="http://www.xintaowang.com/css/default/tv.css" rel="stylesheet" type="text/css" />
<link href="http://www.xintaowang.com/css/default/xintao/sotv/dianshiju.css" rel="stylesheet" type="text/css" />
</head>

<body id="sotv">
	<div id="wrap">
		<div class="wrap-in">
			<?php TPL::plugin('include/xintaoTvHeader',array('channel'=> V('-:sotv/'.$video['tv_category_id'].'/name'))); ?>
			<div id="container">
				<div id="location" class="area">
					<div class="left" style="width:100%;">
						<div class="adB"></div>
       					<h1 xmlns:v="http://rdf.data-vocabulary.org/#">
       						<span>
       							<em id="clsNameA" typeof="v:Breadcrumb"><a rel="v:url" property="v:title" href="<?php echo URL('video.search',array('c'=>$video['tv_category_id']));?>" target="_self"><?php echo $cName;?></a></em> > 
       							<em id="specialID" style="color:black;" typeof="v:Breadcrumb"><a rel="v:url" property="v:title" href="/video/sid-<?php echo V('g:sid');?>"><?php echo $video['tv_name'];?>全集</a></em>
       						</span>
       					</h1>
    				</div>
					<div class="right" style="width:0px;"></div>
				</div>
				<?php


$cover = '';
if (isset ($video['tv_category_id']) && $video['tv_category_id'] == 2) {
	$cover = DS('xintao/xtTvCover.getBySid', 'g0/' . CACHE_24X30, $sid);
}
if (!empty ($cover)) {
?>
				<div class="blank12H"></div>
				<div id="picFocusout" class="area">
	        		<a class="aall" id="hisPlay" style="display: inline; "></a>
    				<div id="picFocus" class="area"><a><img border="0" width="950px" height="242px" alt="<?php echo '《'.$video['tv_name'].'》,'.$video['tv_name'].','.$cName.$video['tv_name'].','.$video['tv_name'].'下载,'.$video['tv_name'].'主演,'.$video['main_actor'];?>" src="<?php echo $cover;?>"></a></div>
    			</div>
    			<?php }?>
    			<div class="blank12H"></div>
    			<?php TPL::module('xintao/tv/ads/ad950x88');?>
				<div class="blank12H"></div>
				<div class="extra" style="width:680px;">
					<div class="blockLA bord ks-clear" id="blockA" style="width:676px;">
			        	<div class="tab1 ks-clear">
			        	    <a name="pllist_full"> </a>
			            	<ul>
			                    <li class="tk1 active" onclick="$(this).addClass('active').siblings().removeClass('active');$('#J_TVJuqing').hide();$('#allist').show();"><a>剧集列表</a></li>
			                    <li class="tk2" onclick="$(this).addClass('active').siblings().removeClass('active');$('#allist').hide();$('#J_TVJuqing').show();"><a>剧情介绍</a></li>
			                    <!--<li class="tk1"><a>剧集列表</a></li>
			                    <li class="tk2"><a>片 花</a></li>
			                    <li class="tk4"><a>相 关</a></li>
			                    <li class="tk5"><a>影 评</a></li>
			                    <li class="tk6" onclick="$(this).addClass('active').siblings().removeClass('active');$('#allist').hide();$('#J_TVTopic').show();"><a>评 论</a></li>-->
			            	</ul>
			        	</div>
						<div class="tab1line"></div>
						<div class="tab1cont" id="J_TVJuqing">
					    	<div id="ablum2" class="ks-clear">
					    		<?php
	$cat = isset ($video['tv_category_id']) && !empty ($video['tv_category_id']) ? $video['tv_category_id'] : 1;
	Xpipe :: pagelet('xintaoTv.tvJuqings', array (
		'sid' => $sid,
		'video' => $video,
		'cat' => $cat,
		'tvName' => $tvName
	));
?>
					    	</div>
					    </div>
						<div class="tab1cont" id="allist" style="display: block; ">
    					<?php


	
	if (!empty ($sid) && !empty ($cat)) {
		Xpipe :: pagelet('xintaoTv.tvSet', array (
			'sid' => $sid,
			'cat' => $cat,
			'tvSets' => isset ($video['tvSets']) ? $video['tvSets'] : 10000
		));
	}
?>						</div>
					</div>
				</div>
				<div class="content" style="margin-left: 680px;">
					<div class="main">
                		<div class="blockRA bord ks-clear" style="width:258px;float:right;">
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
				</div>
			</div>
			<!-- 尾部 开始 -->
			<?php TPL::module('xintaoTvFooter');?>
			<!-- 尾部 结束 -->
		</div>
	</div>
	<?php TPL::module('gotop');?>
</body>
</html>
