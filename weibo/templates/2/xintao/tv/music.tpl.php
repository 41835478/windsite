<?php
if (!defined('IN_APPLICATION')) {
	exit ('ACCESS DENIED!');
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>音乐频道 - 新淘高清视频</title>
<meta name="title" content="新淘音乐频道 - 新淘高清视频">
<meta name="keywords" content="高清MV,高清演出,在线MV,高清音乐访谈，演唱会现场，新淘音乐">
<meta name="description" content="新淘高清影视音乐频道包含各类高清MV视频、高清演出视频、在线MV、高清音乐访谈和演唱会现场视频。">
<?php TPL::plugin('include/css_link');?>
<?php TPL::plugin('include/js_link');?>
<script src="http://a.tbcdn.cn/s/kissy/1.2.0/kissy-min.js"></script>
<style type="text/css">
.fi_movie .fi_jb{width:92px;height:92px;position:absolute;top:0;left:138px;background:url("http://www.xintaotv.com/css/default/xintao/xintaotv/music-p.png") no-repeat;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,sizingMethod=crop,src="http://www.xintaotv.com/css/default/xintao/xintaotv/music-p.png");_background:none;}
</style>
</head>

<body id="sotv">
	<div id="wrap">
		<div class="wrap-in">
			<?php TPL::plugin('include/xintaoTvHeader',array('channel'=>'music')); ?>
			<div id="container">
				<div class="blank12H"></div>
				<?php Xpipe :: pagelet('xintaoTv.focus','music');?>
				<div class="blank12H"></div>
				<?php Xpipe :: pagelet('xintaoTv.topItem',5);?>
				<div class="extra" style="width:700px;">
					<div class="blank12H"></div>
					<?php


Xpipe :: pagelet('xintaoTv.gridVideos', array (
	'channel' => 'music',
	'titlePic' => 'm_tt05.gif',
	'moreUrl' => '/video.search/search--24-----%E6%BC%94%E5%94%B1%E4%BC%9A--------------3-1-40',
	'tv' => array (
		'c' => 24,
		'o' => 3,
		'cs' => '演唱会',
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
	'channel' => 'music',
	'titlePic' => '29b_929ff182_f14b_2ef1_534b_3dbfedbea88b_1.gif',
	'moreUrl' => '/video.search/search--24---%E5%86%85%E5%9C%B0----------------3-1-40',
	'tv' => array (
		'c' => 24,
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
	'channel' => 'music',
	'titlePic' => '29b_2e2db56d_c0af_666f_bbc8_cff24cf47b47_1.gif',
	'moreUrl' => '/video.search/search--24---%E6%97%A5%E9%9F%A9----------------3-1-40',
	'tv' => array (
		'c' => 24,
		'o' => 3,
		'area' => '日韩',
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
	'channel' => 'music',
	'titlePic' => '29b_abcec211_7d60_7294_e88f_5012d817eb10_1.gif',
	'moreUrl' => '/video.search/search--24---%E6%AC%A7%E7%BE%8E----------------3-1-40',
	'tv' => array (
		'c' => 24,
		'o' => 3,
		'area' => '欧美',
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
        						<?php Xpipe :: pagelet('xintaoTv.viewsTop10',array('api'=>'music/top50/views/','title'=>'观看最多排行榜'));?>
        					<div class="blank12H"></div>
        					<div class="dDox bordB clear">
								<h2><span>音乐分类</span></h2>
								<div class="tvCls clear">
									<div class="list clear">
										<h3>按人物|</h3>
										<div class="list_a clear">
											<div class="l">
												<a href="<?php echo URL('video.search',array('c'=>24,'key'=>urlencode('陈奕迅')))?>"><img class="pbd" height="66" alt="陈奕迅" src="http://i0.itc.cn/20111117/b2e_fea4bda3_3e8e_40d6_f368_2080829e71d4_1.jpg" width="66"></a>
											</div>
											<div class="r">
												<a href="<?php echo URL('video.search',array('c'=>24,'key'=>urlencode('陈奕迅')))?>">陈奕迅</a>
												<a href="<?php echo URL('video.search',array('c'=>24,'key'=>urlencode('曾轶可')))?>">曾轶可</a> 
												<a href="<?php echo URL('video.search',array('c'=>24,'key'=>urlencode('林宥嘉')))?>">林宥嘉</a> 
												<a href="<?php echo URL('video.search',array('c'=>24,'key'=>urlencode('严爵')))?>">严爵</a> <br>
												<a href="<?php echo URL('video.search',array('c'=>24,'key'=>urlencode('李宇春')))?>">李宇春</a> 
												<a href="<?php echo URL('video.search',array('c'=>24,'key'=>urlencode('方大同')))?>">方大同</a> 
												<a href="<?php echo URL('video.search',array('c'=>24,'key'=>urlencode('尚雯婕')))?>">尚雯婕</a> 
												<a href="<?php echo URL('video.search',array('c'=>24,'key'=>urlencode('谢娜')))?>">谢娜</a><br>
												<a href="<?php echo URL('video.search',array('c'=>24,'key'=>urlencode('AKB48')))?>">AKB48</a> 
												<a href="<?php echo URL('video.search',array('c'=>24,'key'=>urlencode('2NE1')))?>">2NE1</a> 
												<a href="<?php echo URL('video.search',array('c'=>24,'key'=>urlencode('f(x)')))?>">f(x)</a> 
												<a href="<?php echo URL('video.search',array('c'=>24,'key'=>urlencode('Lady Gaga')))?>">Lady Gaga</a>
											</div>
										</div>
									</div>
									<div class="line"></div>
									<div class="list clear">
										<h3>按歌手|</h3>
										<p>
											<a href="/video.search/search--24------%E7%94%B7%E6%AD%8C%E6%89%8B-------------3-1-40">男歌手</a> 
											<a href="/video.search/search--24------%E5%A5%B3%E6%AD%8C%E6%89%8B-------------3-1-40">女歌手</a> 
											<a href="/video.search/search--24------%E7%BB%84%E5%90%88-------------3-1-40">组合</a> 
											<a href="/video.search/search--24------%E4%B9%90%E9%98%9F-------------3-1-40">乐队</a> 
											<a href="/video.search/search--24------%E5%85%B6%E4%BB%96-------------3-1-40">其他</a><br>
										</p>
									</div>
									<div class="line"></div>
									<div class="list clear">
										<h3>按地区|</h3>
										<p>
											<a href="/video.search/search--24---%E5%86%85%E5%9C%B0----------------3-1-40">内地</a> 
											<a href="/video.search/search--24---%E6%B8%AF%E5%8F%B0----------------3-1-40">港台</a> 
											<a href="/video.search/search--24---%E6%AC%A7%E7%BE%8E----------------3-1-40">欧美</a> 
											<a href="/video.search/search--24---%E6%97%A5%E9%9F%A9----------------3-1-40">日韩</a> 
											<a href="/video.search/search--24---%E5%85%B6%E4%BB%96----------------3-1-40">其他</a><br>
										</p>
									</div>
									<div class="line"></div>
									<div class="list clear">
										<h3>按语言|</h3>
										<p>
											<a href="/video.search/search--24-------%E6%99%AE%E9%80%9A%E8%AF%9D------------3-1-40">普通话</a> 
											<a href="/video.search/search--24-------%E5%A5%A5%E8%AF%AD------------3-1-40">粤语</a> 
											<a href="/video.search/search--24-------%E8%8B%B1%E8%AF%AD------------3-1-40">英语</a> 
											<a href="/video.search/search--24-------%E6%97%A5%E8%AF%AD------------3-1-40">日语</a> 
											<a href="/video.search/search--24-------%E9%9F%A9%E8%AF%AD------------3-1-40">韩语</a> 
											<a href="/video.search/search--24-------%E5%85%B6%E4%BB%96------------3-1-40">其他</a>
										</p>
									</div>
									<div class="line"></div>
									<div class="list clear">
										<h3>按风格|</h3>
										<p>
											<a href="/video.search/search--24--%E6%B5%81%E8%A1%8C-----------------3-1-40">流行</a>
											<a href="/video.search/search--24--%E6%91%87%E6%BB%9A-----------------3-1-40">摇滚</a> 
											<a href="/video.search/search--24--%E8%AF%B4%E5%94%B1-----------------3-1-40">说唱</a> 
											<a href="/video.search/search--24--%E7%94%B5%E9%9F%B3-----------------3-1-40">电音</a> 
											<a href="/video.search/search--24--%E5%8F%A4%E5%85%B8-----------------3-1-40">古典</a> 
											<a href="/video.search/search--24--%E6%B0%91%E6%AD%8C-----------------3-1-40">民族</a> 
											<a href="/video.search/search--24--%E7%88%B5%E5%A3%AB-----------------3-1-40">爵士</a> 
											<a href="/video.search/search--24--%E9%87%91%E5%B1%9E-----------------3-1-40">金属</a> 
											<a href="/video.search/search--24--%E4%B9%A1%E6%9D%91-----------------3-1-40">乡村</a> 
											<a href="/video.search/search--24--R&B-----------------3-1-40">R&amp;B</a> 
											<a href="/video.search/search--24--%E8%BD%BB%E9%9F%B3%E4%B9%90-----------------3-1-40">轻音乐</a> 
											<a href="/video.search/search--24--%E7%94%B5%E5%BD%B1%E5%8E%9F%E9%9F%B3-----------------3-1-40">影视歌曲</a> 
										</p>
									</div>
									<div class="line"></div>
									<div class="list clear">
										<h3>按类型|</h3>
										<p>
											<a href="/video.search/search--24-----MV--------------3-1-40">MV</a>&nbsp;&nbsp;
											<a href="/video.search/search--24-----%E6%BC%94%E5%94%B1%E4%BC%9A--------------3-1-40">现场</a>&nbsp;&nbsp;
											<a href="/video.search/search--24-----%E7%BA%AA%E5%BD%95%E7%89%87--------------3-1-40">纪录片</a> 
											<a href="/video.search/search--24-----%E9%A2%81%E5%A5%96%E7%A4%BC--------------3-1-40">颁奖礼</a>&nbsp;&nbsp;
											<a href="/video.search/search--24-----%E6%96%B0%E9%97%BB--------------3-1-40">新闻</a>
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
