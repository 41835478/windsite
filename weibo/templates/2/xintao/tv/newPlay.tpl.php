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
$catName = '首页';
$catId = 1;
$tvName = '未知视频';
$fee = 0;
if (in_array(V('g:vid'), array (
		485746
	))) {
	F('err404', '当前视频已被删除');
}
if (isset ($video) && !empty ($video)) {
	if (!$isBoke) {
		$cName = $video['tv_cont_cats'];
		$catId = $video['tv_category_id'];
		if (isset ($vData) && isset ($vData['data'])) {
			if (isset ($vData['data']['tv_name']))
				$tvName = $vData['data']['tv_name'];
			if (isset ($vData['fee']))
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
		echo '<meta name="description" content="' . $cName . '《' . $tvName . '》在线高清播放:' . htmlentities(F('tv.utf8Substr', $video['tv_desc'], 0, 200), ENT_COMPAT, 'UTF-8') . '">';

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
<script src="http://a.tbcdn.cn/s/kissy/1.2.0/kissy-min.js"></script>
<link href="http://www.xintaowang.com/css/default/tv.css?v=1" rel="stylesheet" type="text/css" />
<link href="http://www.xintaowang.com/css/default/xintao/sotv/dianshiju.css" rel="stylesheet" type="text/css" />
<link href="http://www.xintaowang.com/css/default/xintao/sotv/play.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
var VID='<?php echo $isBoke ? V('g:bid') : V('g:vid');?>',SID='<?php echo isset ($sid) ? $sid : $video['sid'];?>';
</script>
</head>

<body id="sotv">
	<div id="wrap">
		<div class="wrap-in">
			<?php TPL::plugin('include/xintaoTvHeader',array('channel'=> $isBoke?'boke':V('-:sotv/'.$video['tv_category_id'].'/name'))); ?>
			<div id="container">
				<div id="location" class="area">
					<div class="left" style="width:100%;">
						<div class="adB"></div>
       					<h1 xmlns:v="http://rdf.data-vocabulary.org/#">
		                    	<?php
		$shareJson = array (
			"title" => F('xintaotv.replaceShare', $tvName),
			"linkurl" => ('http://www.xintaotv.com/video/' . ($isBoke ? ('bid-' . V('g:bid')) : ('vid-' . V('g:vid')))),
			//"linkurl" => ('http://yingyong.taobao.com/show.htm?app_id=211001&m=video&' . ($isBoke ? ('bid=' . V('g:bid')) : ('vid=' . V('g:vid')))),
	"comment" => F('xintaotv.replaceShare', $isBoke ? $tvName : F('tv.utf8Substr', $video['tv_desc'], 0, 130) . '...'),
			"itempic" => ($isBoke ? $video['cutCoverURL'] : $video['video_big_pic']),
			"props" => array (
				"description" => F('xintaotv.replaceShare', '新淘高清视频：《' . $tvName . '》在线观看')
			)
		);
		//echo json_encode($shareJson);
?>       					
       						<span>
       							<em id="clsNameA" typeof="v:Breadcrumb"><a href="<?php echo URL('video.search',array('c'=>$catId));?>" target="_self" rel="v:url" property="v:title"><?php echo $isBoke?'播客':$catName;?></a></em> > 
       							<?php


if (!$isBoke) {
	$sid = isset ($sid) ? $sid : $video['sid'];
	$cat = isset ($video['tv_category_id']) && !empty ($video['tv_category_id']) ? $video['tv_category_id'] : 1;
	if ($sid > 0 && ($cat == 2 || $cat == 16)) {
		echo '<em typeof="v:Breadcrumb"><a href="/video/sid-' . $sid . '" rel="v:url" property="v:title">' . $video['tv_name'] . '全集</a></em> > ';
	}
}
?>
       							<em id="specialID"  typeof="v:Breadcrumb"><a href="/video/<?php echo $isBoke?'bid-'.V('g:bid'):'vid-'.V('g:vid');?>" rel="v:url" property="v:title"><?php echo $tvName;?></a></em>
       							<?php echo ($fee==1?'(预览模式,即将开通付费观看完整模式)':'');?>
       						</span>
       						<input type="hidden" id="J_ShareParam" value='{"client_id":"0"}'><a href="#" onclick="shareItem(this); return false;" data-shareparam='<?php echo json_encode($shareJson);?>' style="color:#0094C8;">分享给好友</a>
       						<script>
							function shareItem(item){
								TS.require('Share', '2.0', function() {
								var ts = new TS.Share(item);
								ts.show('');
								});
							}
							</script>
							<script src="http://a.tbcdn.cn/apps/snstaoshare/widget/ts/ts-min.js"></script>
       					</h1>
    				</div>
					<div class="right" style="width:0px;"></div>
				</div>
				<div class="fullVideo">
					<div id="video" class="area">
<?php


$vid = $isBoke ? V('g:bid') : V('g:vid');
if (isset ($video) && !empty ($video) && isset ($vid) && !empty ($vid)) {
	if (!$isBoke) { //非播客
?>						<div class="right" style="position:relative;width: 300px;height: 500px; float:right" align="center">
							<?php

		Xpipe :: pagelet('xintaoTv.topItem', 4);
?>
						</div>
						<div id="dragDiv" style="width: 630px; height: 495px; margin:0px;">
							<div id="rRightDown"></div>
							<div id="sohuplayer">
								<object width=630 height=495>
								   <param name="movie"  value="http://share.vrs.sohu.com/<?php echo $vid;?>/v.swf&skinNum=2&topBar=0&showRecommend=0&autoplay=true&api_key=<?php echo SOTV_CONSUMER_KEY;?>"></param>
								   <param name="allowFullScreen" value="true"></param>
								   <param name="allowscriptaccess" value="always"></param>
								   <param name="wmode" value="Transparent"></param>
								   <embed flashvars="autoplay=true" width=630 height=495 wmode="Transparent" 
								   allowfullscreen="true" allowscriptaccess="always" quality="high" 
								   src="http://share.vrs.sohu.com/<?php echo $vid;?>/v.swf&skinNum=2&topBar=0&showRecommend=0&autoplay=true&api_key=<?php echo SOTV_CONSUMER_KEY;?>" 
								   type="application/x-shockwave-flash" />
								   </embed>
								</object>
							</div>
						</div>	
								<?php


	} else {
?>
						<div class="right" style="position:relative;width: 300px;height: 500px; float:right" align="center">
							<?php

		Xpipe :: pagelet('xintaoTv.topItem', 4);
?>

						</div>
						<div id="dragDiv" style="width: 630px; height: 495px; margin:0px;">
							<div id="rRightDown"></div>
							<div id="sohuplayer">
								<embed height="495" width="630" wmode="opaque" 
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
				<div class="blank12H"></div>
    			<?php TPL::module('xintao/tv/ads/ad950x88');?>
				<div class="blank12H"></div>
				<div class="extra"  style="width:680px;">
					<div class="blockLA bord ks-clear" id="blockA" style="width:676px;">
			        	<div class="tab1 ks-clear">
			        	    <a name="pllist_full"> </a>
			            	<ul>
			                    <li class="tk1 active"><a><?php echo $isBoke?'最新上传':'剧集列表'?></a></li>
			            	</ul>
			        	</div>
						<div class="tab1line"></div>
						<div class="tab1cont ks-clear" id="allist" style="display: block; ">
						<?php


		if ($isBoke) {
			$cat = isset ($video['categoriesId']) && !empty ($video['categoriesId']) ? $video['categoriesId'] : 2;
			if (!empty ($cat)) {
				$bokes = V('-:bokes/' . $cat);
				if (!empty ($bokes))
					Xpipe :: pagelet('xintaoTv.tvBokeCategory', array (
						'tv' => array (
							'c' => 9001,
							'o' => 3,
							'cat' => $bokes['title'],
							'tvType' => -1,
							'page_no' => 1,
							'show_num' => 20
						)
					));
			}
		} else {
			$sid = isset ($sid) ? $sid : $video['sid'];
			$cat = isset ($video['tv_category_id']) && !empty ($video['tv_category_id']) ? $video['tv_category_id'] : 1;
			if (!empty ($sid) && $sid > 1 && !empty ($cat)) {
				Xpipe :: pagelet('xintaoTv.playSet', $video);
			}
		}
?>							<div class="blank12H ks-clear"></div>
						</div>
					</div>
				</div>
				<div class="content" style="margin-left: 680px;">
					<div class="main">
						<?php if(!$isBoke){?>
                    	<div class="blockRA bord ks-clear" style="width:258px;float:right">
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
	    				<?php }?>
					</div>
				</div>
				<div class="blank12H"></div>
				<?php

?>


			</div>
			
			<!-- 尾部 开始 -->
			<?php TPL::module('xintaoTvFooter');?>
			<!-- 尾部 结束 -->
		</div>
	</div>
	<?php TPL::module('gotop');?>
</body>
<?php $tvId=USER :: tvId();if (!empty($tvId)&&isset ($video) && !empty ($video)) {?>
<script type="text/javascript">
$(function(){
	setInterval(function(){$.post('/xintaotv.buildconnection');},1000*60*10);
	$.post('/xintaotv.history',{'title':'<?php echo $tvName;?>',<?php echo V('g:vid')?('\'vid\':'.V('g:vid')):(V('g:bid')?('\'bid\':'.V('g:bid')):'');?>});
});
</script>
<?php }?>
</html>