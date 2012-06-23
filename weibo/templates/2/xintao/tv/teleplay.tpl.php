<?php
if (!defined('IN_APPLICATION')) {
	exit ('ACCESS DENIED!');
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>电视剧频道 - 新淘高清视频</title>
<meta name="title" content="新淘电影频道 - 新淘高清视频">
<meta name="keywords" content="电视剧，最新电视剧，高清电视剧，电视剧在线观看，新淘电视剧">
<meta name="description" content="新淘高清影视电视剧频道，免费提供正版高清电视剧在线观看，同步播出各类最新最热港台电视剧、内地电视剧、欧美电视剧和日韩电视剧。">
<?php TPL::plugin('include/css_link');?>
<?php TPL::plugin('include/js_link');?>
<script src="http://a.tbcdn.cn/s/kissy/1.2.0/kissy-min.js"></script>
<style type="text/css">
.fi_movie .fi_jb{width:92px;height:92px;position:absolute;top:0;left:138px;background:url("http://static.xintaowang.com/css/default/xintao/xintaotv/tv-p.png") no-repeat;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,sizingMethod=crop,src="http://static.xintaowang.com/css/default/xintao/xintaotv/tv-p.png");_background:none;}
</style>
</head>

<body id="sotv">
	<div id="wrap">
		<div class="wrap-in">
			<?php TPL::plugin('include/xintaoTvHeader',array('channel'=>'teleplay')); ?>
			<div id="container">
				<div class="blank12H"></div>
				<?php Xpipe :: pagelet('xintaoTv.focus','teleplay');?>
				<div class="blank12H"></div>
				<?php Xpipe :: pagelet('xintaoTv.topItem',5);?>
				<div class="extra" style="width:700px;">
					<div class="blank12H"></div>
					<?php


Xpipe :: pagelet('xintaoTv.gridVideos', array (
	'channel' => 'teleplay',
	'titlePic' => 't_tt05.png',
	'moreUrl' => '/video.search/search--2-1--%E5%86%85%E5%9C%B0-----------------1-40',
	'tv' => array (
		'c' => 2,
		'o' => 3,
		'area' => '内地',
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
	'channel' => 'teleplay',
	'titlePic' => 't_tt06.png',
	'moreUrl' => '/video.search/search--2-1--%E6%B8%AF%E5%89%A7-----------------1-40',
	'tv' => array (
		'c' => 2,
		'o' => 3,
		'area' => '港剧',
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
	'channel' => 'teleplay',
	'titlePic' => 't_tt07.png',
	'moreUrl' => '/video.search/search--2-1--%E5%8F%B0%E5%89%A7-----------------1-40',
	'tv' => array (
		'c' => 2,
		'o' => 3,
		'area' => '台剧',

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
	'channel' => 'teleplay',
	'titlePic' => 't_tt08.png',
	'moreUrl' => '/video.search/search--2-1--%E7%BE%8E%E5%89%A7-----------------1-40',
	'tv' => array (
		'c' => 2,
		'o' => 3,
		'area' => '美剧',
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
	'channel' => 'teleplay',
	'titlePic' => 't_tt11.png',
	'moreUrl' => '/video.search/search--2-1--%E9%9F%A9%E5%89%A7-----------------1-40',
	'tv' => array (
		'c' => 2,
		'o' => 3,
		'area' => '韩剧',
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
                    		<div id="willShow" class="blockRA bordB clear">
                    		<style>.list12 li {background-position: 0 6px;padding: 5px 0 5px 15px;font-size: 12px;line-height: 16px;}</style>
								<h2><span>美剧同步热播</span></h2>
								<div class="list12" style="margin-left:8px;">
									<ul>
										<li><a title="高智商极客：谢耳朵">生活大爆炸</a>：第<a href="/video/sid-1005271" rel="e:xtv,na">5</a>，<a href="/video/sid-5400" rel="e:xtv,na">4</a>，<a href="/video/sid-5256" rel="e:xtv,na">3</a>，<a href="/video/sid-5255" rel="e:xtv,na">2</a>，<a href="/video/sid-5254" rel="e:xtv,na">1</a>季</li>
										<li><a title="斯皮尔伯格电视版《阿凡达》">泰若星球</a>：<a href="/video/sid-1005270" rel="e:xtv,na">第1季</a>，<a href="/video/sid-1005635" rel="e:xtv,na">第1季(无字幕)</a></li>
										<li><a title="女特工： Maggie-Q">尼基塔(新版)</a>：<a href="/video/sid-1005207" rel="e:xtv,na">第2季</a>，<a href="/video/sid-5343" rel="e:xtv,na">第1季</a></li>
										<li><a title="绯闻女孩Gossip girl">绯闻女孩</a>：第<a href="/video/sid-1005129" rel="e:xtv,na">5</a>，<a href="/video/sid-5355" rel="e:xtv,na">4</a>，<a href="/video/sid-3287" rel="e:xtv,na">3</a>，<a href="/video/sid-3282" rel="e:xtv,na">2</a>，<a href="/video/sid-3281" rel="e:xtv,na">1</a>季</li>
										<li><a title="反高潮的闷骚腔调">广告狂人</a>：第<a href="/video/sid-1006590" rel="e:xtv,na">4</a>，<a href="/video/sid-1006589" rel="e:xtv,na">3</a>，<a href="/video/sid-1006591" rel="e:xtv,na">2</a>，<a href="/video/sid-1006081" rel="e:xtv,na">1</a>季</li>
										<li><a title="当单身独妈难，当单身毒妈更难">单身毒妈</a>：第<a href="/video/sid-1006648" rel="e:xtv,na">6</a>，<a href="/video/sid-1006647" rel="e:xtv,na">5</a>，<a href="/video/sid-1006626" rel="e:xtv,na">4</a>，<a href="/video/sid-1006625" rel="e:xtv,na">3</a>，<a href="/video/sid-1006624" rel="e:xtv,na">2</a>，<a href="/video/sid-1006079" rel="e:xtv,na">1</a>季</li>
										<li><a title="6号特工逃离乌托邦幻境" href="/video/sid-1008354" rel="e:xtv,na">囚徒(AMC新版全集)</a>：<a title="6号特工逃离乌托邦幻境" href="/video/sid-1008354" rel="e:xtv,na">6号特工逃离乌托邦幻境</a></li>
									</ul>
								</div>
							</div>
                    		<div class="blank12H"></div>
        						<?php Xpipe :: pagelet('xintaoTv.viewsTop10',array('api'=>'teleplay/top/views/','title'=>'观看最多排行榜'));?>
        					<div class="blank12H"></div>	
        					<div class="dDox bordB clear" id="theTVCategory">
								<div class="mvRank clear">
									<h2><span>电视剧分类</span></h2>
								</div>
								<div class="tvCls clear">
									<div class="list clear">
										<h3>按地区|</h3>
										<ul>
											<li><a href="/video.search/search--2-1--%E5%86%85%E5%9C%B0-----------------1-40">内地</a></li>
											<li><a href="/video.search/search--2-1--%E6%B8%AF%E5%89%A7-----------------1-40">港剧</a></li>
											<li><a href="/video.search/search--2-1--%E5%8F%B0%E5%89%A7-----------------1-40">台剧</a></li>
											<li><a href="/video.search/search--2-1--%E9%9F%A9%E5%89%A7-----------------1-40">韩剧</a></li>
											<li style="width:42px;"><a href="/video.search/search--2-1--%E7%BE%8E%E5%89%A7-----------------1-40">美剧</a></li>
											<li><a href="/video.search/search--2-1--%E5%85%B6%E4%BB%96-----------------1-40">其他</a></li>
										</ul>
									</div>
									<div class="line"></div>
									<div class="list clear">
										<h3>按类型|</h3>
										<ul>
											<li><a href="/video.search/search--2-1-%E5%81%B6%E5%83%8F%E5%89%A7------------------1-40">偶像剧</a></li>
											<li><a href="/video.search/search--2-1-%E5%AE%B6%E5%BA%AD%E4%BC%A6%E7%90%86%E5%89%A7------------------1-40">伦理剧</a></li>
											<li><a href="/video.search/search--2-1-%E5%8E%86%E5%8F%B2%E5%89%A7------------------1-40">历史剧</a></li>
											<li><a href="/video.search/search--2-1-%E5%B9%B4%E4%BB%A3%E5%89%A7------------------1-40">年代剧</a></li>
											<li style="width:42px;"><a href="/video.search/search--2-1-%E8%A8%80%E6%83%85%E5%89%A7------------------1-40">言情剧</a></li>
											<li><a href="/video.search/search--2-1-%E6%AD%A6%E4%BE%A0%E5%89%A7------------------1-40">武侠剧</a></li>
											<li><a href="/video.search/search--2-1-%E5%8F%A4%E8%A3%85%E5%89%A7------------------1-40">古装剧</a></li>
											<li><a href="/video.search/search--2-1-%E9%83%BD%E5%B8%82%E5%89%A7------------------1-40">都市剧</a></li>
											<li><a href="/video.search/search--2-1-%E5%86%9C%E6%9D%91%E5%89%A7------------------1-40">农村剧</a></li>
											<li style="width:42px;"><a href="/video.search/search--2-1-%E5%86%9B%E4%BA%8B%E6%88%98%E4%BA%89%E5%89%A7------------------1-40">战争剧</a></li>
											<li><a href="/video.search/search--2-1-%E6%82%AC%E7%96%91%E5%89%A7------------------1-40">悬疑剧</a></li>
											<li><a href="/video.search/search--2-1-%E8%B0%8D%E6%88%98%E5%89%A7------------------1-40">谍战剧</a></li>
											<li><a href="/video.search/search--2-1-%E5%A5%87%E5%B9%BB%E7%A7%91%E5%B9%BB%E5%89%A7------------------1-40">科幻剧</a></li>
											<li><a href="/video.search/search--2-1-%E5%8A%A8%E4%BD%9C%E5%89%A7------------------1-40">动作剧</a></li>
										</ul>
									</div>
									<div class="line"></div>
									<div class="list clear">
										<h3>按明星|</h3>
										<ul>
											<li><a href="<?php echo URL('video.search',array('c'=>2,'key'=>urlencode('王志文')))?>">王志文</a></li>
											<li><a href="<?php echo URL('video.search',array('c'=>2,'key'=>urlencode('李幼斌')))?>">李幼斌</a></li>
											<li><a href="<?php echo URL('video.search',array('c'=>2,'key'=>urlencode('黄志忠')))?>">黄志忠</a></li>
											<li><a href="<?php echo URL('video.search',array('c'=>2,'key'=>urlencode('张嘉译')))?>">张嘉译</a></li>
											<li style="width:42px;"><a href="<?php echo URL('video.search',array('c'=>2,'key'=>urlencode('潘粤明')))?>">潘粤明</a></li>
											<li><a href="<?php echo URL('video.search',array('c'=>2,'key'=>urlencode('冯绍峰')))?>">冯绍峰</a></li>
											<li><a href="<?php echo URL('video.search',array('c'=>2,'key'=>urlencode('贾乃亮')))?>">贾乃亮</a></li>
											<li><a href="<?php echo URL('video.search',array('c'=>2,'key'=>urlencode('何晟铭')))?>">何晟铭</a></li>
											<li><a href="<?php echo URL('video.search',array('c'=>2,'key'=>urlencode('佟大为')))?>">佟大为</a></li>
											<li style="width:42px;"><a href="<?php echo URL('video.search',array('c'=>2,'key'=>urlencode('蒋雯丽')))?>">蒋雯丽</a></li>
											<li><a href="<?php echo URL('video.search',array('c'=>2,'key'=>urlencode('刘涛')))?>">刘 涛</a></li>
											<li><a href="<?php echo URL('video.search',array('c'=>2,'key'=>urlencode('马苏')))?>">马 苏</a></li>
											<li><a href="<?php echo URL('video.search',array('c'=>2,'key'=>urlencode('海清')))?>">海 清</a></li>
											<li><a href="<?php echo URL('video.search',array('c'=>2,'key'=>urlencode('杨幂')))?>">杨 幂</a></li>
											<li style="width:42px;"><a href="<?php echo URL('video.search',array('c'=>2,'key'=>urlencode('董璇')))?>">董 璇</a></li>
										</ul>
									</div>
									<div class="line"></div>
									<div class="list clear c4">
										<h3>按年份|</h3>
										<ul>
											<li><a href="/video.search/search--2-1---2011---------------3-1-40">2011</a></li>
											<li><a href="/video.search/search--2-1---2010---------------3-1-40">2010</a></li>
											<li><a href="/video.search/search--2-1---2009---------------3-1-40">2009</a></li>
											<li><a href="/video.search/search--2-1---2008---------------3-1-40">2008</a></li>
											<li style="width:42px;"><a href="/video.search/search--2-1---2007---------------3-1-40">2007</a></li>
											<li><a href="/video.search/search--2-1---2006---------------3-1-40">2006</a></li>
											<li><a href="/video.search/search--2-1---2005---------------3-1-40">2005</a></li>
											<li><a href="/video.search/search--2-1---2004---------------3-1-40">2004</a></li>
											<li><a href="/video.search/search--2-1---2003---------------3-1-40">2003</a></li>
											<li style="width:42px;"><a href="/video.search/search--2-1---2002---------------3-1-40">2002</a></li>
											<li><a href="/video.search/search--2-1---2001---------------3-1-40">2001</a></li>
											<li><a href="/video.search/search--2-1---2000---------------3-1-40">2000</a></li>
											<li><a href="/video.search/search--2-1---1999---------------3-1-40">1999</a></li>
											<li><a href="/video.search/search--2-1---1998---------------3-1-40">1998</a></li>
											<li style="width:42px;"><a href="/video.search/search--2-1---1997---------------3-1-40">1997</a></li>
										</ul>
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
