<?php
if (!defined('IN_APPLICATION')) {
	exit ('ACCESS DENIED!');
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>电影频道 - 新淘高清视频</title>
<meta name="title" content="新淘电影频道 - 新淘高清视频">
<meta name="keywords" content="电影，最新电影，高清电影，电影在线观看，新淘电影">
<meta name="description" content="新淘高清影视电影频道，提供正版高清电影在线观看，包括各类最新最热华语电影、好莱坞电影、日韩电影和欧洲电影。">
<?php TPL::plugin('include/css_link');?>
<?php TPL::plugin('include/js_link');?>
<script src="http://a.tbcdn.cn/s/kissy/1.2.0/kissy-min.js"></script>
<style type="text/css">
.fi_movie .fi_jb{width:92px;height:92px;position:absolute;top:0;left:138px;background:url("http://www.xintaotv.com/css/default/xintao/xintaotv/movie-p.png") no-repeat;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,sizingMethod=crop,src="http://www.xintaotv.com/css/default/xintao/xintaotv/movie-p.png");_background:none;}
</style>
</head>

<body id="sotv">
	<div id="wrap">
		<div class="wrap-in">
			<?php TPL::plugin('include/xintaoTvHeader',array('channel'=>'movie')); ?>
			<div id="container">
				<div class="blank12H"></div>
				<?php Xpipe :: pagelet('xintaoTv.focus','movie');?>
				<div class="blank12H"></div>
				<?php Xpipe :: pagelet('xintaoTv.topItem',5);?>
				<div class="extra" style="width:700px;">
					<div class="blank12H"></div>
					<?php


Xpipe :: pagelet('xintaoTv.gridVideos', array (
	'channel' => 'movie',
	'titlePic' => 'tt05.gif',
	'moreUrl' => '/video.search/search--1-1--%E5%8D%8E%E8%AF%AD-----------------1-40',
	'tv' => array (
		'c' => 1,
		'o' => 3,
		'area' => '华语',
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
	'channel' => 'movie',
	'titlePic' => 'tt04.gif',
	'moreUrl' => '/video.search/search--1-1--%E5%A5%BD%E8%8E%B1%E5%9D%9E-----------------1-40',
	'tv' => array (
		'c' => 1,
		'o' => 3,
		'area' => '好莱坞',
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
	'channel' => 'movie',
	'titlePic' => 'tt03.gif',
	'moreUrl' => '/video.search/search--1-1--%E9%9F%A9%E5%9B%BD-----------------1-40',
	'tv' => array (
		'c' => 1,
		'o' => 3,
		'area' => '韩国',
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
	'channel' => 'movie',
	'titlePic' => 'tt10.gif',
	'moreUrl' => '/video.search/search--1-1--%E6%97%A5%E6%9C%AC-----------------1-40',
	'tv' => array (
		'c' => 1,
		'o' => 3,
		'area' => '日本',
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
	'channel' => 'movie',
	'titlePic' => 'tt02.gif',
	'moreUrl' => '/video.search/search--1-1--%E6%AC%A7%E6%B4%B2-----------------1-40',
	'tv' => array (
		'c' => 1,
		'o' => 3,
		'area' => '欧洲',
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
								<h2><span>狂野女孩</span></h2>
								<div class="list12" style="margin-left:8px;">
									<ul>
										<li><a href="/video/vid-574611">狂野女孩第1集</a></li>
										<li><a href="/video/vid-574617">狂野女孩第2集</a></li>
										<li><a href="/video/vid-574625">狂野女孩第3集</a></li>
										<li><a href="/video/vid-574631">狂野女孩第4集</a></li>
										<li><a href="/video/vid-574637">狂野女孩第5集</a></li>
									</ul>
								</div>
							</div>
							<div class="blank12H"></div>
                    		<div id="willShow" class="blockRA bordB clear">
								<h2><span>狂野女孩之寻找美国最热辣女孩</span></h2>
								<div class="list12" style="margin-left:8px;">
									<ul>
										<li><a href="/video/vid-561163">狂野女孩之寻找美国最热辣女孩：夜店激情</a></li>
										<li><a href="/video/vid-561171">狂野女孩之寻找美国最热辣女孩：HOT排行榜</a></li>
										<li><a href="/video/vid-561167">狂野女孩之寻找美国最热辣女孩：比基尼海选</a></li>
										<li><a href="/video/vid-561376">狂野女孩之寻找美国最热辣女孩：美胸大作战</a></li>
										<li><a href="/video/vid-557795">狂野女孩之寻找美国最热辣女孩：火辣沙滩秀</a></li>
									</ul>
								</div>
							</div>
                    		<div class="blank12H"></div>
        						<?php Xpipe :: pagelet('xintaoTv.viewsTop10',array('api'=>'movie/top/views/','title'=>'观看最多排行榜'));?>
        					<div class="blank12H"></div>	
        					<div class="dDox bordB clear" id="theMovieKind">
								<div class="mvRank clear">
									<h2><span>电影分类</span></h2>
								</div>
								<div class="tvCls clear">
									<div class="list clear">
										<h3>按地区|</h3>
										<ul>
											<li><a href="/video.search/search--1-1--%E5%8D%8E%E8%AF%AD-----------------1-40">华语</a></li>
											<li><a href="/video.search/search--1-1--%E5%A5%BD%E8%8E%B1%E5%9D%9E-----------------1-40">好莱坞</a></li>
											<li><a href="/video.search/search--1-1--%E6%AC%A7%E6%B4%B2-----------------1-40">欧洲</a></li>
											<li><a href="/video.search/search--1-1--%E9%9F%A9%E5%9B%BD-----------------1-40">韩国</a></li>
											<li style="width:40px;"><a href="/video.search/search--1-1--%E5%85%B6%E4%BB%96-----------------1-40">其他</a></li>
										</ul>
									</div>
									<div class="line"></div>
									<div class="list clear">
										<h3>按类型|</h3>
										<ul>
											<li><a href="/video.search/search--1-1-%E7%88%B1%E6%83%85%E7%89%87------------------1-40">爱情片</a></li>
											<li><a href="/video.search/search--1-1-%E5%8A%A8%E4%BD%9C%E7%89%87------------------1-40">动作片</a></li>
											<li><a href="/video.search/search--1-1-%E5%96%9C%E5%89%A7%E7%89%87------------------1-40">喜剧片</a></li>
											<li><a href="/video.search/search--1-1-%E7%A7%91%E5%B9%BB%E7%89%87------------------1-40">科幻片</a></li>
											<li style="width:40px;"><a href="/video.search/search--1-1-%E6%81%90%E6%80%96%E7%89%87------------------1-40">恐怖片</a></li>
											<li><a href="/video.search/search--1-1-%E9%A3%8E%E6%9C%88%E7%89%87------------------1-40">风月片</a></li>
											<li><a href="/video.search/search--1-1-%E5%89%A7%E6%83%85%E7%89%87------------------1-40">剧情片</a></li>
											<li><a href="/video.search/search--1-1-%E9%9F%B3%E4%B9%90%E7%89%87------------------1-40">歌舞片</a></li>
											<li><a href="/video.search/search--1-1-%E6%88%98%E4%BA%89%E7%89%87------------------1-40">战争片</a></li>
										</ul>
									</div>
									<div class="line"></div>
									<div class="list clear">
										<h3>按明星|</h3>
										<ul>
											<li><a href="<?php echo URL('video.search',array('key'=>urlencode('刘烨')))?>">刘 烨</a></li>
											<li><a href="<?php echo URL('video.search',array('key'=>urlencode('舒淇')))?>">舒 淇</a></li>
											<li><a href="<?php echo URL('video.search',array('key'=>urlencode('章子怡')))?>">章子怡</a></li>
											<li><a href="<?php echo URL('video.search',array('key'=>urlencode('郭富城')))?>">郭富城</a></li>
											<li style="width:42px;"><a href="<?php echo URL('video.search',array('key'=>urlencode('范冰冰')))?>">范冰冰</a></li>
											<li><a href="<?php echo URL('video.search',array('key'=>urlencode('巩俐')))?>">巩 俐</a></li>
											<li><a href="<?php echo URL('video.search',array('key'=>urlencode('周星驰')))?>">周星驰</a></li>
											<li><a href="<?php echo URL('video.search',array('key'=>urlencode('刘德华')))?>">刘德华</a></li>
											<li><a href="<?php echo URL('video.search',array('key'=>urlencode('周润发')))?>">周润发</a></li>
											<li style="width:42px;"><a href="<?php echo URL('video.search',array('key'=>urlencode('刘嘉玲')))?>">刘嘉玲</a></li>
											<li><a href="<?php echo URL('video.search',array('key'=>urlencode('梁朝伟')))?>">梁朝伟</a></li>
											<li><a href="<?php echo URL('video.search',array('key'=>urlencode('谢霆锋')))?>">谢霆锋</a></li>
											<li><a href="<?php echo URL('video.search',array('key'=>urlencode('张曼玉')))?>">张曼玉</a></li>
											<li><a href="<?php echo URL('video.search',array('key'=>urlencode('张柏芝')))?>">张柏芝</a></li>
											<li style="width:42px;"><a href="<?php echo URL('video.search',array('key'=>urlencode('古天乐')))?>">古天乐</a></li>
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
