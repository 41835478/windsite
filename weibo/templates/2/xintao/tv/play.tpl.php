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


$site = F('escape',V('-:sysConfig/site_name'));
$catName = '首页';
$catId = 1;
$tvName = '未知视频';
$fee = 0;
if(in_array(V('g:vid'),array(485746))){
	F('err404','当前视频已被删除');
}
if (isset ($video) && !empty ($video)) {
	if (!$isBoke) {
		$cName = $video['tv_cont_cats'];
		$catId = $video['tv_category_id'];
		if (isset ($vData) && isset ($vData['data'])) {
			if(isset ($vData['data']['tv_name']))
			$tvName = $vData['data']['tv_name'];
			if(isset ($vData['fee']))
			$fee = $vData['fee'];
		} else {
			$tvName = $video['tv_name'];
		}
		$sotv = array ();
		if (isset ($video['tv_category_id'])) {
			$sotv = V('-:sotv/' . $video['tv_category_id']);
		}
		if (!empty ($sotv)) {
			$cName = $sotv['title'];
			$catName = $cName;
		}
		echo '<title>' . $tvName . '-高清视频在线播放-' . $cName . '-' . $site . '</title>';
		echo '<meta name="title" content="' . $tvName . '-高清视频在线播放-' . $cName . '-' . $site . '">';
		echo '<meta name="keywords" content="' . $video['tv_cont_cats'] . ',' . $tvName . ',' . $video['main_actor'] . ',' . $site . '">';
		echo '<meta name="description" content="' . $site . $cName . '频道为您提供' . $tvName . '的最全，最新，最热的相关视频及评论">';
		
	} else {
		$cName = $video['title'];
		$catName = '播客';
		$catId = 9001;
		$tvName = $cName;
		echo '<title>' . $cName . '-在线播放-播客频道-' . $site . '</title>';
		echo '<meta name="title" content="' . $cName . '-在线播放-播客频道-' . $site . '">';
		echo '<meta name="keywords" content="' . $cName . ',' . $site . '">';
		echo '<meta name="description" content="' . $site . '播客频道为您提供:' . $cName . '的最全，最新，最热的相关视频及评论">';
		
	}

} else {
	echo $isBoke ? '<title>播客频道-' . $site . '</title>' : '<title>影视频道-' . $site . '</title>';
}
?>
<?php TPL::plugin('include/css_link');?>
<?php TPL::plugin('include/js_link');?>
<script src="<?php echo W_BASE_URL;?>js/xintao/reverseorder/jquery.reverseorder.packed.js"></script>
<link href="http://www.xintaowang.com/css/default/tv.css?v=1" rel="stylesheet" type="text/css" />
<link href="http://www.xintaowang.com/css/default/xintao/sotv/dianshiju.css" rel="stylesheet" type="text/css" />
<link href="http://www.xintaowang.com/css/default/xintao/sotv/play.css" rel="stylesheet" type="text/css" />
</head>

<body id="sotv">
	<div id="wrap">
		<div class="wrap-in">
			<?php TPL::plugin('include/header'); ?>
			
			<div id="container">
				<div id="location" class="area">
					<div class="left" style="width:100%;">
						<div class="adB"></div>
       					<span <?php echo $isBoke?'style="margin-left:260px;"':'style="margin-left:180px;"';?>><em id="clsNameA"><a href="<?php echo URL('tv.search',array('c'=>$catId));?>" target="_self"><?php echo $catName;?></a></em>：<em id="specialID" rel=""><?php echo $tvName.($fee==1?'(预览模式,即将开通付费观看完整模式)':'');?></em></span>
    				</div>
					<div class="right" style="width:0px;"></div>
				</div>
				<div class="fullVideo">
					<div id="video" class="area">
<?php

$vid = $isBoke ? V('g:bid') : V('g:vid');
if (isset ($video) && !empty ($video) && isset ($vid) && !empty ($vid)) {
	if (!$isBoke) { //非播客
		$isAd = true;
		if (XT_IS_SELLER == 'true' && XT_TVAD_IS_SELLER == 'true') {
			Xpipe :: pagelet('xintao.tvPlayAd', false);
			$isAd = false;
		}
		if ($isAd) {
			//查找站长配置
			$pm = APP :: N('pageManager');
			$leftAd = $pm->getPageManager(9001);
			$rightAd = $pm->getPageManager(9002);
			if (!empty ($leftAd) && !empty ($rightAd)) {
				echo '<div class="left" style="left:0px;position:relative;width: 178px;_width:175px; height: 390px; " align="center">';
				Xpipe :: pagelet('component/component_102.run', array (
					'param' => json_decode($leftAd['param'], TRUE),
					'title' => $leftAd['title']
				));
				echo '</div>';
				echo '<div class="right" style="position:relative;width: 178px;_width:175px; height: 390px; float:right" align="center">';
				Xpipe :: pagelet('component/component_102.run', array (
					'param' => json_decode($rightAd['param'], TRUE),
					'title' => $leftAd['title']
				));
				echo '</div>';
			} else {
				if (XT_IS_SELLER == 'true') {
					Xpipe :: pagelet('xintao.tvPlayAd', false);
				} else {
					echo '<div class="left" style="left:0px;position:relative;width: 178px;_width:175px; height: 390px; " align="center"></div>';
					echo '<div class="right" style="position:relative;width: 178px;_width:175px; height: 390px; float:right" align="center"></div>';
				}
			}
		}
?>
						<div id="dragDiv" style="width: 600px; height: 489px; ">
							<div id="rRightDown"></div>
							<div id="sohuplayer">
								<object width=600 height=489>
								   <param name="movie"  value="http://share.vrs.sohu.com/<?php echo $vid;?>/v.swf&skinNum=2&topBar=0&showRecommend=0&autoplay=true&api_key=<?php echo SOTV_CONSUMER_KEY;?>"></param>
								   <param name="allowFullScreen" value="true"></param>
								   <param name="allowscriptaccess" value="always"></param>
								   <param name="wmode" value="Transparent"></param>
								   <embed flashvars="autoplay=true" width=600 height=489 wmode="Transparent" 
								   allowfullscreen="true" allowscriptaccess="always" quality="high" 
								   src="http://share.vrs.sohu.com/<?php echo $vid;?>/v.swf&skinNum=2&topBar=0&showRecommend=0&autoplay=true&api_key=<?php echo SOTV_CONSUMER_KEY;?>" 
								   type="application/x-shockwave-flash" />
								   </embed>
								</object>
							</div>
						</div>	
								<?php


	} else {
		$isAd = true;
		if (XT_IS_SELLER == 'true' && XT_TVAD_IS_SELLER == 'true') {
			Xpipe :: pagelet('xintao.tvPlayAd', true);
			$isAd = false;
		}
		if ($isAd) {
			$pm = APP :: N('pageManager');
			$leftAd = $pm->getPageManager(9001);
			$rightAd = $pm->getPageManager(9002);
			if (!empty ($leftAd) && !empty ($rightAd)) {
				echo '<div class="left" style="left:0px;position:relative;width: 258px;_width:255px; height: 360px; " align="center">';
				Xpipe :: pagelet('component/component_102.run', array (
					'param' => json_decode($leftAd['param'], TRUE),
					'title' => $leftAd['title']
				));
				echo '</div>';
				echo '<div class="right" style="position:relative;width: 258px;_width:255px; height: 360px; float:right" align="center">';
				Xpipe :: pagelet('component/component_102.run', array (
					'param' => json_decode($rightAd['param'], TRUE),
					'title' => $leftAd['title']
				));
				echo '</div>';
			} else {
				if (XT_IS_SELLER == 'true') {
					Xpipe :: pagelet('xintao.tvPlayAd', true);
				} else {
					echo '<div class="left" style="left:0px;position:relative;width: 258px;_width:255px; height: 360px; " align="center"></div>';
					echo '<div class="right" style="position:relative;width: 258px;_width:255px; height: 360px; float:right" align="center"></div>';
				}
			}
		}
?>
						<div id="dragDiv" style="width: 440px; height: 356px; ">
							<div id="rRightDown"></div>
							<div id="sohuplayer">
								<embed height="356" width="440" wmode="opaque" 
									allowscriptaccess="always" allowfullscreen="true" 
									flashvars="autoplay=true" bgcolor="#000000" 
									quality="high" 
									src="http://share.vrs.sohu.com/my/v.swf&skinNum=2&topBar=0&id=<?php echo $vid;?>&startTime0" 
									type="application/x-shockwave-flash" 
									pluginspage="http://www.macromedia.com/go/getflashplayer">
							</div>
						</div>		
<?php }} ?>
						<div class="ks-clear"></div>
					</div>
				</div>
				<?php if(!$isBoke){?>
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
    				<?php

		if (XT_IS_SELLER == 'true') {
			$shops = str_replace(array (
				'[',
				']'
			), array (
				'',
				''
			), XT_SHOPS);
			if ($shops) {
				$nicks = explode(',', $shops);
				$nick = array_rand($nicks);
				echo '<style>.store-side .shop{width:252px;}</style>';
				Xpipe :: pagelet('component/component_110.run', array (
					'param' => array (
						'isVolume' => '1',
						'isCredit' => '1',
						'nick' => $nicks[$nick],
						'order_by' => 'popularity:desc'
					)
				));
			}
		}
?>
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
		if (!empty ($sid) && $sid > 1 && !empty ($cat)) {
			Xpipe :: pagelet('xintao.tvSet', array (
				'sid' => $sid,
				'cat' => $cat
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
			<?php }else{?>
				<div class="extra">
					<?php

		if (XT_IS_SELLER == 'true') {
			$shops = str_replace(array (
				'[',
				']'
			), array (
				'',
				''
			), XT_SHOPS);
			if ($shops) {
				$nicks = explode(',', $shops);
				$nick = array_rand($nicks);
				echo '<style>.store-side .shop{width:203px;}</style>';
				Xpipe :: pagelet('component/component_110.run', array (
					'param' => array (
						'isVolume' => '1',
						'isCredit' => '1',
						'nick' => $nicks[$nick],
						'order_by' => 'popularity:desc'
					)
				));
			}
		}
?>
					<!-- 站点导航 开始 -->
					<div class="indexMenu bord ks-clear">
						<h2><span>分类检索</span></h2>
						<ul>
							<?php

		$sotvs = V('-:sotv');
		foreach ($sotvs as $sotv) {
			echo '<li><a href="' . URL('tv.search', array (
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
							<div class="blockLA bord ks-clear" id="blockA" style="width:708px;">
					        	<div class="tab1 ks-clear">
					        	    <a name="pllist_full"> </a>
					            	<ul>
					                    <li class="tk1 active"><a>同类推荐</a></li>
					                    <!--<li class="tk1"><a>剧集列表</a></li>
					                    <li class="tk2"><a>片 花</a></li>
					                    <li class="tk3"><a>剧集介绍</a></li>
					                    <li class="tk4"><a>相 关</a></li>
					                    <li class="tk5"><a>影 评</a></li>
					                    <li class="tk6" onclick="$(this).addClass('active').siblings().removeClass('active');$('#allist').hide();$('#J_TVTopic').show();"><a>评 论</a></li>-->
					            	</ul>
					        	</div>
        						<div class="tab1line"></div>
        						<div class="tab1cont" id="allist" style="display: block; ">
            					<?php


		$cat = isset ($video['categoriesId']) && !empty ($video['categoriesId']) ? $video['categoriesId'] : 2;
		if (!empty ($cat)) {
			$bokes = V('-:bokes/' . $cat);
			if (!empty ($bokes))
				Xpipe :: pagelet('xintao.tvBokeTop', $bokes['name']);
		}
?>								</div>
							</div>
                        </div>
					</div>
				</div>	
			<?php }?>
			</div>
			<!-- 尾部 开始 -->
			<?php TPL::module('footer');?>
			<!-- 尾部 结束 -->
		</div>
	</div>
	<?php TPL::module('gotop');?>
</body>
</html>