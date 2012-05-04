<?php
if (!defined('IN_APPLICATION')) {
	exit ('ACCESS DENIED!');
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>动漫频道 - 新淘高清视频</title>
<meta name="title" content="新淘动漫频道 - 新淘高清视频">
<meta name="keywords" content="动漫，国产动画，日韩动画，欧美动画，热门动画，新淘动漫">
<meta name="description" content="新淘高清影视动漫频道包含各类最新最热国产动画、日韩动画、欧美动画、搞笑动画、冒险动画、童话动画、动作动画和原创动画。">
<?php TPL::plugin('include/css_link');?>
<?php TPL::plugin('include/js_link');?>
<script src="http://a.tbcdn.cn/s/kissy/1.2.0/kissy-min.js"></script>
<style type="text/css">
.fi_movie .fi_jb{width:92px;height:92px;position:absolute;top:0;left:138px;background:url("http://www.xintaotv.com/css/default/xintao/xintaotv/comic-p.png") no-repeat;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,sizingMethod=crop,src="http://www.xintaotv.com/css/default/xintao/xintaotv/comic-p.png");_background:none;}
</style>
</head>

<body id="sotv">
	<div id="wrap">
		<div class="wrap-in">
			<?php TPL::plugin('include/xintaoTvHeader',array('channel'=>'comic')); ?>
			<div id="container">
				<div class="blank12H"></div>
				<?php Xpipe :: pagelet('xintaoTv.focus','comic');?>
				<div class="blank12H"></div>
				<?php Xpipe :: pagelet('xintaoTv.topItem',5);?>
				<div class="extra" style="width:700px;">
					<div class="blank12H"></div>
					<?php


Xpipe :: pagelet('xintaoTv.gridVideos', array (
	'channel' => 'comic',
	'titlePic' => 'c_tt05.gif',
	'moreUrl' => '/video.search/search--16--%E6%90%9E%E7%AC%91------------------1-40',
	'tv' => array (
		'c' => 16,
		'o' => 3,
		'cat' => '搞笑',
		'tvType' => -1,
		'page_no' => 1,
		'show_num' => 10,
		'fee' => 2
	)
));
?>
					<div class="blank12H"></div>
					<?php


Xpipe :: pagelet('xintaoTv.gridVideos', array (
	'channel' => 'comic',
	'titlePic' => 'c_tt06.gif',
	'moreUrl' => '/video.search/search--16--%E5%86%92%E9%99%A9------------------1-40',
	'tv' => array (
		'c' => 16,
		'o' => 3,
		'cat' => '冒险',
		'tvType' => -1,
		'page_no' => 1,
		'show_num' => 10,
		'fee' => 2
	)
));
?>
					<div class="blank12H"></div>
					<?php


Xpipe :: pagelet('xintaoTv.gridVideos', array (
	'channel' => 'comic',
	'titlePic' => 'c_tt10.gif',
	'moreUrl' => '/video.search/search--16--%E7%AB%A5%E8%AF%9D------------------1-40',
	'tv' => array (
		'c' => 16,
		'o' => 3,
		'cat' => '童话',
		'tvType' => -1,
		'page_no' => 1,
		'show_num' => 10,
		'fee' => 2
	)
));
?>
					<div class="blank12H"></div>
					<?php


Xpipe :: pagelet('xintaoTv.gridVideos', array (
	'channel' => 'comic',
	'titlePic' => 'c_tt07.gif',
	'moreUrl' => '/video.search/search--16--%E5%8A%A8%E4%BD%9C------------------1-40',
	'tv' => array (
		'c' => 16,
		'o' => 3,
		'cat' => '动作',
		'tvType' => -1,
		'page_no' => 1,
		'show_num' => 10,
		'fee' => 2
	)
));
?>

				</div>
				<div class="content" style="margin-left: 720px;">
					<div class="main">
                    	<div class="main-bd right" style="margin:0px;float:none;">
                    		<div class="blank12H"></div>
        						<?php Xpipe :: pagelet('xintaoTv.viewsTop10',array('api'=>'animation/top50/views/','title'=>'观看最多排行榜'));?>
        					<div class="blank12H"></div>
        					<div class="dDox bordB clear">
								<h2><span>动漫分类</span></h2>
								<div class="tvCls clear">
               						<div class="list clear">
                						<h3>按篇幅|</h3>
                						<a href="/video.search/search--16-----%E7%94%B5%E5%BD%B1---------------1-40">动画电影</a>&nbsp;&nbsp;
                						<a href="/video.search/search--16-----%E7%94%B5%E8%A7%86%E5%89%A7---------------1-40">动画剧集</a>&nbsp;&nbsp;
                						<a href="/video.search/search--16-----%E9%A2%84%E5%91%8A%E7%89%87---------------1-40">动画预告片</a>&nbsp;&nbsp;
                						<br>
                						<a href="/video.search/search--16-----%E5%85%B6%E4%BB%96---------------1-40">其他动画</a>
                					</div>
                					<div class="line"></div>
                					<div class="list clear">
                						<h3>按情绪|</h3>
	                					<p>
	                						<a href="/video.search/search--16--%E6%90%9E%E7%AC%91------------------1-40">搞笑</a>&nbsp;&nbsp;
	                						<a href="/video.search/search--16--%E5%89%A7%E6%83%85------------------1-40">剧情</a>&nbsp;&nbsp;
	                						<a href="/video.search/search--16--%E5%86%92%E9%99%A9------------------1-40">冒险</a>&nbsp;&nbsp;
	                						<a href="/video.search/search--16--%E5%8A%A8%E4%BD%9C------------------1-40">动作</a>&nbsp;&nbsp;
	                						<a href="/video.search/search--16--%E9%AD%94%E5%B9%BB------------------1-40">魔幻</a>&nbsp;&nbsp;
	                						<a href="/video.search/search--16--%E5%8A%B1%E5%BF%97------------------1-40">励志</a><br>
											<a href="/video.search/search--16--%E4%BD%93%E8%82%B2------------------1-40">体育</a>&nbsp;&nbsp;
											<a href="/video.search/search--16--%E7%9B%8A%E6%99%BA------------------1-40">益智</a>&nbsp;&nbsp;
											<a href="/video.search/search--16--%E7%AB%A5%E8%AF%9D------------------1-40">童话</a>&nbsp;&nbsp;
											<a href="/video.search/search--16--%E7%9C%9F%E4%BA%BA------------------1-40">真人</a>&nbsp;&nbsp;
											<a href="/video.search/search--16--%E7%A5%9E%E8%AF%9D------------------1-40">神话</a>&nbsp;&nbsp;
											<a href="/video.search/search--16--%E9%9D%92%E6%98%A5------------------1-40">青春</a>
										</p>
									</div>
                					<div class="line"></div>
                					<div class="list clear">
                						<h3>按年龄|</h3>
                						<p>
                							<a href="/video.search/search--16------5%E5%B2%81%E4%BB%A5%E4%B8%8B--------------1-40">5岁以下</a>&nbsp;&nbsp;
                							<a href="/video.search/search--16------5%E5%B2%81-12%E5%B2%81--------------1-40">5岁-12岁</a>&nbsp;&nbsp;
                							<a href="/video.search/search--16------13%E5%B2%81-18%E5%B2%81--------------1-40">13岁-18岁</a>&nbsp;&nbsp;<br>
                							<a href="/video.search/search--16------18%E5%B2%81%E4%BB%A5%E4%B8%8A--------------1-40">18岁以上</a>
                						</p>
                					</div>
            					</div>
							</div>
							<div class="blank12H"></div>
							<script type="text/javascript" charset="UTF-8">
							var aliyun_ads_type=1;
							var aliyun_ads_picWidth=60;
							var aliyun_ads_picHeight=60;
							var aliyun_ads_textColor='#333333';
							var aliyun_ads_priceColor='#FF6600';
							var aliyun_ads_borderColor='#CCCCCC';
							var aliyun_ads_backgroundColor='#FFFFFF';
							var aliyun_ads_popupTextColor='#FFFFFF';
							var aliyun_ads_popupPriceColor='#FF6600';
							var aliyun_ads_popupBorderColor='#666666';
							var aliyun_ads_popupBackgroundColor='#000000';
							var aliyun_ads_width=230;
							var aliyun_ads_height=1370;
							var aliyun_ads_uid='956';
							var aliyun_ads_ad_type='2';
							</script>
							<script type="text/javascript" charset="UTF-8" src="http://ad.aliyun.com/static/js/ad/aliyun_ads.js"></script>
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
