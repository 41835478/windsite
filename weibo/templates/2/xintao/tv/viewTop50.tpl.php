<?php
if (!defined('IN_APPLICATION')) {
	exit ('ACCESS DENIED!');
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><?php echo $topTitle?> - 新淘高清视频</title>
<meta name="title" content="<?php echo $topTitle?> - 新淘高清视频">
<meta name="keywords" content="<?php echo $topTitle?>">
<meta name="description" content="新淘高清视频<?php echo $topTitle?>">
<?php TPL::plugin('include/css_link');?>
<?php TPL::plugin('include/js_link');?>
<link href="http://static.xintaowang.com/css/default/xintaotv_top.css?v=20120131" rel="stylesheet" type="text/css" />
<script type="text/javascript">
var TOP_C='<?php echo $c;?>';
</script>
<script type="text/javascript" src="http://www.xintaotv.com/js/xintao/top.js?v=20120216"></script>
</head>
<body id="sotv">
	<div id="wrap">
		<div class="wrap-in">
			<?php $channel=$c;if($c=='korea'){$channel = 'teleplay';} TPL::plugin('include/xintaoTvHeader',array('channel'=> $channel,'key'=>'')); ?>
			<div class="blank12H"></div>
			<div id="container" class="ks-clear" style="margin-bottom:0px;background:url(http://static.xintaowang.com/css/default/xintao/xintaotv/bg111.gif) repeat-y left;border-top: 1px #f3b6b4 solid">
				<div class="extra" style="width: 160px;">
					<h2 class="top-all-h2"><span><a href="/video.top">全部排行榜</a></span></h2>
					<div class="rankNav clear">
					<h3>观看排行榜</h3>
					<ul>
						<li<?php echo $c=='movie'?' class="now"':'';?>><a href="/video.top/c-movie">电影排行榜</a></li>
						<li<?php echo $c=='teleplay'?' class="now"':'';?>><a href="/video.top/c-teleplay">电视剧排行榜</a></li>
						<li<?php echo $c=='comic'?' class="now"':'';?>><a href="/video.top/c-comic">动漫排行榜</a></li>
						<li<?php echo $c=='zongyi'?' class="now"':'';?>><a href="/video.top/c-zongyi">综艺排行榜</a></li>
						<li<?php echo $c=='korea'?' class="now"':'';?>><a href="/video.top/c-korea">韩剧排行榜</a></li>
						<li<?php echo $c=='real'?' class="now"':'';?>><a href="/video.top/c-real">纪录片排行榜</a></li>
						<li<?php echo $c=='education'?' class="now"':'';?>><a href="/video.top/c-education">公开课排行榜</a></li>
						<!--<li<?php echo $c=='clip'?' class="now"':'';?>><a href="/video.top/c-clip">片花排行榜</a></li>-->
						<li<?php echo $c=='music'?' class="now"':'';?>><a href="/video.top/c-music">音乐排行榜</a></li>
						<!--<li<?php echo $c=='tvprogram'?' class="now"':'';?>><a href="/video.top/c-tvprogram">电视节目排行榜</a></li>-->
					</ul>
					</div>
					<!--<div class="rankNav clear">
					<h3>评分排行榜</h3>
					<ul>
						<li<?php echo $c=='mvscore'?' class="now"':'';?>><a href="/video.top/c-mvscore">电影评分排行榜</a></li>
						<li<?php echo $c=='tvscore'?' class="now"':'';?>><a href="/video.top/c-tvscore">电视剧评分排行榜</a></li>
						<li<?php echo $c=='comicscore'?' class="now"':'';?>><a href="/video.top/c-comicscore">动漫评分排行榜</a></li>
						<li<?php echo $c=='realscore'?' class="now"':'';?>><a href="/video.top/c-realscore">纪录片评分排行榜</a></li>
					</ul>
					</div>
					<div class="rankNav clear">
					<h3>历史趋势榜</h3>
					<ul>
						<li<?php echo $c=='daymore'?' class="now"':'';?>><a href="/video.top/c-daymore">上榜天数最多</a></li>
						<li<?php echo $c=='rankhigh'?' class="now"':'';?>><a href="/video.top/c-rankhigh">上榜排名最高</a></li>
					</ul>
					</div>-->
				</div>
				<div class="content" style="margin-left: 174px;">
					<div class="main">
						<?php TPL::module('xintao/tv/viewTop50_'.$c);?>
					</div>
				</div>
			</div>
			<div class="ks-clear" style="background: url(http://static.xintaowang.com/css/default/xintao/xintaotv/bg021.gif) no-repeat;font-size: 0px;margin: 0 auto;height: 2px;margin-bottom:10px;"></div>
			<!-- 尾部 开始 -->
			<?php TPL::module('xintaoTvFooter');?>
			<!-- 尾部 结束 -->
		</div>
	</div>
	<?php TPL::module('gotop');?>
</body>	
</html>
