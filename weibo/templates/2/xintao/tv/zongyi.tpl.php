<?php
if (!defined('IN_APPLICATION')) {
	exit ('ACCESS DENIED!');
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>综艺频道 - 新淘高清视频</title>
<meta name="title" content="新淘综艺频道 - 新淘高清视频">
<meta name="keywords" content="综艺，综艺节目，综艺在线，综艺视频，新淘综艺">
<meta name="description" content="新淘高清影视综艺频道有最全最火爆的综艺节目：明星访谈，真人选秀，征婚交友，K歌竞技，港台综艺等类别，已经录入正版综艺节目200多档。">
<?php TPL::plugin('include/css_link');?>
<?php TPL::plugin('include/js_link');?>
<script src="http://a.tbcdn.cn/s/kissy/1.2.0/kissy-min.js"></script>
<style type="text/css">
.fi_movie .fi_jb{width:92px;height:92px;position:absolute;top:0;left:138px;background:url("http://www.xintaotv.com/css/default/xintao/xintaotv/zy-p.png") no-repeat;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,sizingMethod=crop,src="http://www.xintaotv.com/css/default/xintao/xintaotv/zy-p.png");_background:none;}
</style>
</head>

<body id="sotv">
	<div id="wrap">
		<div class="wrap-in">
			<?php TPL::plugin('include/xintaoTvHeader',array('channel'=>'zongyi')); ?>
			<div id="container">
				<div class="blank12H"></div>
				<?php Xpipe :: pagelet('xintaoTv.focus','zongyi');?>
				<div class="blank12H"></div>
				<?php Xpipe :: pagelet('xintaoTv.topItem',5);?>
				<div class="extra" style="width:700px;">
					<div class="blank12H"></div>
					<?php


Xpipe :: pagelet('xintaoTv.gridVideos', array (
	'channel' => 'zongyi',
	'titlePic' => 'z_tt03.gif',
	'moreUrl' => '/video.search/search--7-1--%E5%86%85%E5%9C%B0----------------3-1-40',
	'tv' => array (
		'c' => 7,
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
	'channel' => 'zongyi',
	'titlePic' => 'z_tt14.gif',
	'moreUrl' => '/video.search/search--7-1--%E6%B8%AF%E5%8F%B0----------------3-1-40',
	'tv' => array (
		'c' => 7,
		'o' => 3,
		'area' => '港台',
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
	'channel' => 'zongyi',
	'titlePic' => 'z_tt05.gif',
	'moreUrl' => '/video.search/search--7-1-%E8%AE%BF%E8%B0%88-----------------3-1-40',
	'tv' => array (
		'c' => 7,
		'o' => 3,
		'cat' => '访谈',
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
	'channel' => 'zongyi',
	'titlePic' => 'z_tt06.gif',
	'moreUrl' => '/video.search/search--7-1-%E9%80%89%E7%A7%80-----------------3-1-40',
	'tv' => array (
		'c' => 7,
		'o' => 3,
		'cat' => '选秀',
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
	'channel' => 'zongyi',
	'titlePic' => 'z_tt07.gif',
	'moreUrl' => '/video.search/search--7-1-%E6%83%85%E6%84%9F%E4%BA%A4%E5%8F%8B-----------------3-1-40',
	'tv' => array (
		'c' => 7,
		'o' => 3,
		'cat' => '情感交友',
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
        						<?php Xpipe :: pagelet('xintaoTv.viewsTop10',array('api'=>'zongyi/top/views/','title'=>'观看最多排行榜'));?>
        					<div class="blank12H"></div>
        					<div class="dDox bordB clear">
								<h2><span>综艺节目分类</span></h2>
								<div class="tvCls clear">
									<div class="list clear">
										<h3><em class="color1">按时尚养生|</em></h3>
										<?php $TMP_ZONGYI = URL('video.search',array('c'=>7,'o'=>3,'key'=>'ZONGYI'));?>
										<p>
											<a href="<?php echo str_replace('ZONGYI',urlencode('健康大智慧'),$TMP_ZONGYI)?>" >健康大智慧 </a>&nbsp;&nbsp;
											<a href="<?php echo str_replace('ZONGYI',urlencode('快乐生活一点通'),$TMP_ZONGYI)?>" >快乐生活一点通</a>&nbsp;&nbsp;
											<a href="<?php echo str_replace('ZONGYI',urlencode('第一时尚'),$TMP_ZONGYI)?>" >第一时尚</a>
											<a href="<?php echo str_replace('ZONGYI',urlencode('美丽俏佳人'),$TMP_ZONGYI)?>" >美丽俏佳人</a>&nbsp;&nbsp;
										</p>
									</div>
									<div class="line"></div>
									<div class="list clear">
										<h3><em class="color1">按歌舞曲艺| </em></h3>
										<p>
											<a href="<?php echo str_replace('ZONGYI',urlencode('梦想合唱团'),$TMP_ZONGYI)?>" >梦想合唱团 </a>
											<a href="<?php echo str_replace('ZONGYI',urlencode('花儿朵朵'),$TMP_ZONGYI)?>" >花儿朵朵</a> 
											<a href="<?php echo str_replace('ZONGYI',urlencode('笑动2011'),$TMP_ZONGYI)?>" >笑动2011</a>
											<a href="<?php echo str_replace('ZONGYI',urlencode('舞动奇迹'),$TMP_ZONGYI)?>" >舞动奇迹</a> 
											<a href="<?php echo str_replace('ZONGYI',urlencode('开心100'),$TMP_ZONGYI)?>" >开心100</a> 
											<a href="<?php echo str_replace('ZONGYI',urlencode('快乐女声'),$TMP_ZONGYI)?>" >快乐女声</a> 
											<a href="<?php echo str_replace('ZONGYI',urlencode('中国达人秀'),$TMP_ZONGYI)?>" >中国达人秀</a> 
											<a href="<?php echo str_replace('ZONGYI',urlencode('快乐蓝天下'),$TMP_ZONGYI)?>" >快乐蓝天下</a> 
											<a href="<?php echo str_replace('ZONGYI',urlencode('我爱记歌词'),$TMP_ZONGYI)?>" >我爱记歌词</a> &nbsp; 
											<a href="<?php echo str_replace('ZONGYI',urlencode('星夜故事秀'),$TMP_ZONGYI)?>" >星夜故事秀</a> &nbsp; 
											<a href="<?php echo str_replace('ZONGYI',urlencode('本山快乐营'),$TMP_ZONGYI)?>" >本山快乐营</a>
											<a href="<?php echo str_replace('ZONGYI',urlencode('挑战麦克风'),$TMP_ZONGYI)?>" >挑战麦克风</a> 
											<a href="<?php echo str_replace('ZONGYI',urlencode('给力星期天'),$TMP_ZONGYI)?>" >给力星期天</a> 
											<a href="<?php echo str_replace('ZONGYI',urlencode('梦想合唱团'),$TMP_ZONGYI)?>" >梦想合唱团</a>
										</p>
									</div>
									<div class="line"></div>
									<div class="list clear">
										<h3><em class="color1">按真人秀| </em></h3>
										<a href="<?php echo str_replace('ZONGYI',urlencode('爱情连连看'),$TMP_ZONGYI)?>" >爱情连连看</a> 
										<a href="<?php echo str_replace('ZONGYI',urlencode('非诚勿扰'),$TMP_ZONGYI)?>" >非诚勿扰</a> 
										<a href="<?php echo str_replace('ZONGYI',urlencode('非你莫属'),$TMP_ZONGYI)?>" >非你莫属</a> 
										<a href="<?php echo str_replace('ZONGYI',urlencode('婚姻保卫战'),$TMP_ZONGYI)?>" >婚姻保卫战</a>
										<a href="<?php echo str_replace('ZONGYI',urlencode('天下达人秀'),$TMP_ZONGYI)?>" >天下达人秀</a> 
										<a href="<?php echo str_replace('ZONGYI',urlencode('欢喜冤家'),$TMP_ZONGYI)?>" >欢喜冤家</a> 
										<a href="<?php echo str_replace('ZONGYI',urlencode('幸福魔方'),$TMP_ZONGYI)?>" >幸福魔方</a>
										<a href="<?php echo str_replace('ZONGYI',urlencode('百里挑一'),$TMP_ZONGYI)?>" >百里挑一</a>
										<a href="<?php echo str_replace('ZONGYI',urlencode('周日我最大'),$TMP_ZONGYI)?>" >周日我最大</a> 
										<a href="<?php echo str_replace('ZONGYI',urlencode('幸福来敲门'),$TMP_ZONGYI)?>" >幸福来敲门</a> 
										<a href="<?php echo str_replace('ZONGYI',urlencode('称心如意'),$TMP_ZONGYI)?>" >称心如意</a>
										<a href="<?php echo str_replace('ZONGYI',urlencode('王者归来'),$TMP_ZONGYI)?>" >王者归来</a>
										<a href="<?php echo str_replace('ZONGYI',urlencode('职来职往'),$TMP_ZONGYI)?>" >职来职往</a> 
										<a href="<?php echo str_replace('ZONGYI',urlencode('中华达人'),$TMP_ZONGYI)?>" >中华达人</a> 
										<a href="<?php echo str_replace('ZONGYI',urlencode('相亲齐上阵'),$TMP_ZONGYI)?>" >相亲齐上阵</a>
										<a href="<?php echo str_replace('ZONGYI',urlencode('男女有别'),$TMP_ZONGYI)?>" >男女有别</a>
										<a href="<?php echo str_replace('ZONGYI',urlencode('精诚所至'),$TMP_ZONGYI)?>" >精诚所至</a> 
										<a href="<?php echo str_replace('ZONGYI',urlencode('武林风'),$TMP_ZONGYI)?>" >武林风</a> 
										<a href="<?php echo str_replace('ZONGYI',urlencode('生活广角'),$TMP_ZONGYI)?>" >生活广角</a> 
										<a href="<?php echo str_replace('ZONGYI',urlencode('大城小事'),$TMP_ZONGYI)?>" >大城小事</a> 
										<a href="<?php echo str_replace('ZONGYI',urlencode('选择'),$TMP_ZONGYI)?>" >选择</a>
										<a href="<?php echo str_replace('ZONGYI',urlencode('人间'),$TMP_ZONGYI)?>" >人间</a> 
										<a href="<?php echo str_replace('ZONGYI',urlencode('老公看你的'),$TMP_ZONGYI)?>" >老公看你的</a> 
										<a href="<?php echo str_replace('ZONGYI',urlencode('我爱男子汉'),$TMP_ZONGYI)?>" >我爱男子汉</a>
										<a href="<?php echo str_replace('ZONGYI',urlencode('向上吧少年'),$TMP_ZONGYI)?>" >向上吧少年</a>
									</div>
									<div class="line"></div>
									<div class="list clear">
										<h3><em class="color1">按脱口秀| </em></h3>
										<p>
											<a href="<?php echo str_replace('ZONGYI',urlencode('说出你的故事'),$TMP_ZONGYI)?>" >说出你的故事</a> 
											<a href="<?php echo str_replace('ZONGYI',urlencode('王牌大贱谍'),$TMP_ZONGYI)?>" >王牌大贱谍</a> 
											<a href="<?php echo str_replace('ZONGYI',urlencode('沈春华Liveshow'),$TMP_ZONGYI)?>" >沈春华Liveshow</a> 
											<a href="<?php echo str_replace('ZONGYI',urlencode('非常静距离'),$TMP_ZONGYI)?>" >非常静距离</a> 
											<a href="<?php echo str_replace('ZONGYI',urlencode('神州音话'),$TMP_ZONGYI)?>" >神州音话</a> 
											<a href="<?php echo str_replace('ZONGYI',urlencode('今夜有戏'),$TMP_ZONGYI)?>" >今夜有戏</a> 
											<a href="<?php echo str_replace('ZONGYI',urlencode('天下女人'),$TMP_ZONGYI)?>" >天下女人</a>
											<a href="<?php echo str_replace('ZONGYI',urlencode('影视风云路'),$TMP_ZONGYI)?>" >影视风云路</a> 
											<a href="<?php echo str_replace('ZONGYI',urlencode('Lady呱呱'),$TMP_ZONGYI)?>" >Lady呱呱</a> 
											<a href="<?php echo str_replace('ZONGYI',urlencode('国光帮帮忙'),$TMP_ZONGYI)?>" >国光帮帮忙</a>
											<a href="<?php echo str_replace('ZONGYI',urlencode('SS小燕之夜'),$TMP_ZONGYI)?>" >SS小燕之夜</a> 
											<a href="<?php echo str_replace('ZONGYI',urlencode('康熙来了'),$TMP_ZONGYI)?>" >康熙来了</a> 
											<a href="<?php echo str_replace('ZONGYI',urlencode('麻辣天后宫'),$TMP_ZONGYI)?>" >麻辣天后宫</a>
											<a href="<?php echo str_replace('ZONGYI',urlencode('收藏秀'),$TMP_ZONGYI)?>" >收藏秀</a>
											<a href="<?php echo str_replace('ZONGYI',urlencode('光荣绽放'),$TMP_ZONGYI)?>" >光荣绽放</a>&nbsp;&nbsp;
											<a href="<?php echo str_replace('ZONGYI',urlencode('最佳现场'),$TMP_ZONGYI)?>" >最佳现场</a>&nbsp;&nbsp;
											<a href="<?php echo str_replace('ZONGYI',urlencode('可凡倾听'),$TMP_ZONGYI)?>" >可凡倾听</a> 
											<a href="<?php echo str_replace('ZONGYI',urlencode('非常接触'),$TMP_ZONGYI)?>" >非常接触</a>
											<a href="<?php echo str_replace('ZONGYI',urlencode('非常网络'),$TMP_ZONGYI)?>" >非常网络</a>&nbsp;&nbsp;
											<a href="<?php echo str_replace('ZONGYI',urlencode('非常夫妻'),$TMP_ZONGYI)?>" >非常夫妻</a>&nbsp;&nbsp; 
											<a href="<?php echo str_replace('ZONGYI',urlencode('非常父母'),$TMP_ZONGYI)?>" >非常父母</a>&nbsp;&nbsp;
											<a href="<?php echo str_replace('ZONGYI',urlencode('非常向上'),$TMP_ZONGYI)?>" >非常向上</a>
											<a href="<?php echo str_replace('ZONGYI',urlencode('背后的故事'),$TMP_ZONGYI)?>" >背后的故事</a> 
											<a href="<?php echo str_replace('ZONGYI',urlencode('王刚讲故事'),$TMP_ZONGYI)?>" >王刚讲故事</a> 
											<a href="<?php echo str_replace('ZONGYI',urlencode('超级访问'),$TMP_ZONGYI)?>" >超级访问</a>
											<a href="<?php echo str_replace('ZONGYI',urlencode('爱笑会议室'),$TMP_ZONGYI)?>" >爱笑会议室</a>
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
