<?php
$isNoFollow = '';
$_URI = F('get_request_url');
if (!in_array($_URI, array (
		'/',
		'/movie',
		'/teleplay',
		'/zongyi',
		'/comic',
		'/music',
		'/discount',
		'/brand',
		'/yule',
		'/news',
		'/boke',
		'/education'
	))) {
	$isNoFollow = ' rel="nofollow" ';
}
?>
<link type="text/css" rel="stylesheet" <?php echo $isNoFollow?> href="http://www.xintaotv.com/css/default/xintaotv.css?v=20120205" />
<script type="text/javascript" src="http://www.xintaotv.com/js/xintao/xintaotv.js?v=20120209"></script>
<script type="text/javascript" src="http://a.tbcdn.cn/apps/stargate/ac/js/proxy.js?t=<?php echo date("Ymd"); ?>"></script>
<?php if(!isset($channel)||empty($channel)){$channel='movie';}?>
<div class="navBar" style="margin-bottom:0px;">
	<div class="tv-area">
		<ul id="navMain">
			<li<?php echo $channel=='teleplay'?'  class="active"':'';?>><em><a <?php echo $isNoFollow?> href="/teleplay">电视剧</a></em></li>
			<li<?php echo $channel=='movie'?'  class="active"':'';?>><em><a <?php echo $isNoFollow?> href="/movie">电影</a></em></li>
			<li<?php echo $channel=='zongyi'?'  class="active"':'';?>><em><a <?php echo $isNoFollow?> href="/zongyi">综艺</a></em></li>
			<li<?php echo $channel=='comic'?'  class="active"':'';?>><em><a <?php echo $isNoFollow?> href="/comic">动漫</a></em></li>
			<li<?php echo $channel=='music'?'  class="active"':'';?>><em><a <?php echo $isNoFollow?> href="/music">音乐</a></em></li>
			<li<?php echo $channel=='discount'?'  class="active"':'';?> style="position:relative;"><em><a <?php echo $isNoFollow?> href="/discount">每日5折</a></em><img alt="hot" src="http://www.xintaotv.com/css/default/xintao/xintaotv/hot.png" width="20" height="14" style="top: -15px;right: -12px;position: absolute;z-index: 8;"></li>
			<li<?php echo $channel=='brand'?'  class="active"':'';?> style="position:relative;"><em><a title="品牌特价包邮" <?php echo $isNoFollow?> href="/brand">特价包邮</a></em><img alt="hot" src="http://www.xintaotv.com/css/default/xintao/xintaotv/new.png" width="20" height="14" style="top: -15px;right: -12px;position: absolute;z-index: 8;"></li>
			<!--<li<?php echo $channel=='zongyi'?'  class="active"':'';?>><em><a href="/zongyi">爆单淘</a></em></li>
			<li<?php echo $channel=='zongyi'?'  class="active"':'';?>><em><a href="/zongyi">皇冠淘</a></em></li>-->
		</ul>
		<p id="navSub">
			<strong><a <?php echo $isNoFollow?> href="/video.search/search--13--------------------1-40">娱乐<img alt="hot" src="http://www.xintaotv.com/css/default/xintao/xintaotv/hot.png" width="20" height="14"></a></strong>
			<span class="mg">|</span>
			<strong><a <?php echo $isNoFollow?> href="/video.search/search--1300--------------------1-40">新闻</a></strong>
			<a <?php echo $isNoFollow?> href="/video.search/search--21--------------------1-40">教育</a>
			<span class="mg">|</span>
			<strong><a <?php echo $isNoFollow?> href="/video.search/search--9001--------------------1-40">播客</a></strong>
			<span class="mg">|</span>
			<strong><a <?php echo $isNoFollow?> href="/video.top">排行</a></strong>
		</p>
	</div>
</div>
<?php if($channel=='brand'){?>
<link href="http://static.xintaowang.com/css/default/brand.css" rel="stylesheet" type="text/css" />
<div style="background:url(http://www.xintaotv.com/css/default/xintao/xintaotv/T1Dn5uXeJIXXXXXXXX-950-46.png) no-repeat;width:948px;height:46px;border: 1px solid #D9D9D9;margin:20px auto 0px;position:relative;"><a title="返回品牌特价首页" <?php echo $isNoFollow?> href="/brand" style="display:block;width:125px;height:48px;position:absolute;top:0;left:0;"></a></div>
<?php }else{?>
<?php if(!in_array($channel,array('movie','teleplay','zongyi','real','yule','comic','education','music','news','health','boke'))){$channel='movie';} ?>
<div id="logoBar" class="tv-area" style="height:50px;">
	<div class="logo l">
		<div class="tvAd l"><a><img alt="" src="http://www.xintaotv.com/css/default/xintao/xintaotv/<?php echo $channel?>.gif" width="128" height="50"></a></div>
	</div>
	<div class="search l" sizset="24" sizcache="1">
		<form id="sform" method="GET" name="sform" autocomplete="off" onsubmit="return newTvSearch();">
			<input type="hidden" id="J_TVSearchC" name="c" value="<?php $C_CHANNEL=array('movie'=>1,'teleplay'=>2,'zongyi'=>7,'real'=>8,'yule'=>13,'comic'=>16,'education'=>21,'music'=>24,'news'=>1300,'health'=>1301,'boke'=>9001);echo $C_CHANNEL[$channel]?>">
			<input id="J_TVSearchInput" class="tx" value="<?php echo isset($key)&&!empty($key)?$key:'';?>" name="key">
			<input id="searchbtn" class="btn" value="搜索" onclick="newTvSearch();" type="button">
		</form>
		<p class="text" style="display:none"><a class="color1" href="" ></a></p>
	</div>
	<div class="infos r" style="padding-top:8px;">
		<?php if(USER::isTvLogin()){?>
		<div id="gNavLoginBox" class="login" style="margin-top:-15px;display:none"><span class="color2">你好：<a id="gNavUserName"><?php echo USER::tvNick();?></a></span>  <span class="num" style="display:none;"></span><span class="color1"></span></div>	
		<div class="lnk">
			<a class="aUpload" style="background:none;width:0px;padding-right: 14px;text-decoration: none;">　</a>
			<a id="gHistoryBt" class="aHistory" href="#">播放记录</a>
			<div id="videoHis" class="vHis" style="display:none">
				<div class="vHisCont">
					<div class="record-box" style="position:relative;">
						<div class="record-tit cf"><em>当前登录帐号:<a><?php echo USER::tvNick();?></a></em><i><a id="showClearHis" href="javascript:void(0)">清空</a></i></div>
						<div class="record-bd">
							<?php $histories = F('xintaotv.getHistories',USER::tvId());?>
							<ul>
								<?php if(!empty($histories)){foreach($histories as $h){?>
								<li><a data-id="<?php echo $h['id']?>" class="icon-cls" style="display: block; " href="javascript:void(0)">关闭</a><p><a  href="/video/<?php echo $h['vid']?('vid-'.$h['vid']):('bid-'.$h['bid'])?>"><?php echo htmlspecialchars($h['title']);?></a></p></li>
								<?php }}else{echo '<li class="lastnl" style="border-bottom:medium none;">您目前还没有观看过视频节目！</li>';}?>
							</ul>
						</div>
						<div class="record-ft"></div>
					</div>
				</div>
			</div>
		</div>
		<?php }else{?>
		<div class="lnk">
			<a rel="nofollow" href="<?php echo TB_XTTV_CONTAINER;?>" style="padding-left:20px;margin-left:30px;background:url(http://static.xintaowang.com/css/default/xintao/xintaotv/taobao_n.png) no-repeat;">淘宝帐号登录</a>
		</div>
		<?php }?>	
	</div>
</div>
<?php $lastShops=F('get_xintaotv_last_shops');if(isset($lastShops)&&!empty($lastShops)){?>
<p style="font-size:12px;width:950px;height:15px;margin-bottom:6px;overflow:hidden;"><span>掌柜来访：</span>
	<?php foreach($lastShops as $shop){echo '<a rel="nofollow" href="/go/sid-'.$shop['sid'].'" target="_blank">'.F('tv.utf8Substr',$shop['title'],0,10).'</a>　　';}?>
</p>
<?php }?>
<div class="tv-area navPdSub <?php echo in_array($channel,array('movie','teleplay','zongyi','comic','music'))?'':'hidden';?>">
<div id="navPdSub">
<?php if($channel=='movie'){?>
<ul class="l">
	<li><a <?php echo $isNoFollow?> href="/movie" style="color: red"><strong>电影首页</strong></a></li>
	|
	<li><a <?php echo $isNoFollow?> href="/video.search/search--1-1------------------3-1-40">最新</a> |</li>
	<li><a <?php echo $isNoFollow?> href="/video.search/search--1-1------------------5-1-40">最热</a> |</li>
	<li><a <?php echo $isNoFollow?> href="/video.search/search--1-1--%E5%8D%8E%E8%AF%AD-----------------1-40">华语</a> |</li>
	<li><a <?php echo $isNoFollow?> href="/video.search/search--1-1--%E5%A5%BD%E8%8E%B1%E5%9D%9E-----------------1-40">好莱坞</a> |</li>
	<li><a <?php echo $isNoFollow?> href="/video.search/search--1-1--%E6%AC%A7%E6%B4%B2-----------------1-40">欧洲</a> |</li>
	<li><a <?php echo $isNoFollow?> href="/video.search/search--1-1--%E6%97%A5%E6%9C%AC-----------------1-40">日本</a> |</li>
	<li><a <?php echo $isNoFollow?> href="/video.search/search--1-1--%E9%9F%A9%E5%9B%BD-----------------1-40">韩国</a> |</li>
	<li><a <?php echo $isNoFollow?> href="/video.movie">电影大全</a> |</li>
	<li><a <?php echo $isNoFollow?> href="/video.top/c-movie">电影排行榜</a> |</li>
</ul>
<p class="pr r hidden"></p>

<?php }elseif($channel=='teleplay'){?>
<ul class="l">
	<li><a <?php echo $isNoFollow?> href="/teleplay" style="color: red"><strong>电视剧首页</strong></a></li>
	|
	<li><a <?php echo $isNoFollow?> href="/video/sid-1004638" style="color:#DD0D0B;">乡村爱情5</a> |</li>
	<li><a <?php echo $isNoFollow?> href="/video/sid-1007904" style="color:#DD0D0B;">如意</a> |</li>
	<li><a <?php echo $isNoFollow?> href="/video/sid-1008075" style="color:#DD0D0B;">新西游记</a> |</li>
	<li><a <?php echo $isNoFollow?> href="/video.search/search--2-1------------------3-1-40">最新</a> |</li>
	<li><a <?php echo $isNoFollow?> href="/video.search/search--2-1------------------5-1-40">最热</a> |</li>
	<li><a <?php echo $isNoFollow?> href="/video.search/search--2-1--%E5%86%85%E5%9C%B0-----------------1-40">内地</a> |</li>
	<li><a <?php echo $isNoFollow?> href="/video.search/search--2-1--%E6%B8%AF%E5%89%A7-----------------1-40">港剧</a> |</li>
	<li><a <?php echo $isNoFollow?> href="/video.search/search--2-1--%E5%8F%B0%E5%89%A7-----------------1-40">台剧</a> |</li>
	<li><a <?php echo $isNoFollow?> href="/video.search/search--2-1--%E7%BE%8E%E5%89%A7-----------------1-40">美剧</a> |</li>
	<li><a <?php echo $isNoFollow?> href="/video.search/search--2-1--%E9%9F%A9%E5%89%A7-----------------1-40">韩剧</a> |</li>
	<li><a <?php echo $isNoFollow?> href="/video.search/search--2-1--%E6%B3%B0%E5%89%A7-----------------1-40">泰剧</a> |</li>
	<li><a <?php echo $isNoFollow?> href="/video.teleplay">电视剧大全</a> |</li>
	<li><a <?php echo $isNoFollow?> href="/video.top/c-teleplay">电视剧排行榜</a> |</li>
</ul>

<?php }elseif($channel=='zongyi'){?>
	<ul class="l">
		<li class="color1"><a <?php echo $isNoFollow?> href="/zongyi"><strong>综艺首页</strong></a></li>
		<li><a <?php echo $isNoFollow?> href="<?php echo URL('video.search',array('c'=>7,'o'=>3,'key'=>urlencode('康熙来了')))?>">康熙来了</a> |</li>
		<li><a <?php echo $isNoFollow?> href="<?php echo URL('video.search',array('c'=>7,'o'=>3,'key'=>urlencode('非诚勿扰')))?>">非诚勿扰</a> |</li>
		<li><a <?php echo $isNoFollow?> href="<?php echo URL('video.search',array('c'=>7,'o'=>3,'key'=>urlencode('非常静距离')))?>">非常静距离</a> |</li>
		<li><a <?php echo $isNoFollow?> href="<?php echo URL('video.search',array('c'=>7,'o'=>3,'key'=>urlencode('快乐大本营')))?>">快乐大本营</a> |</li>
		<li><a <?php echo $isNoFollow?> href="<?php echo URL('video.search',array('c'=>7,'o'=>3,'key'=>urlencode('说出你的故事')))?>">说出你的故事</a> |</li>
		<li><a <?php echo $isNoFollow?> href="<?php echo URL('video.search',array('c'=>7,'o'=>3,'key'=>urlencode('天天向上')))?>">天天向上</a> |</li>
		<li><a <?php echo $isNoFollow?> href="/video.search/search--7-------------------3-1-40">最新</a> |</li>
		<li><a <?php echo $isNoFollow?> href="/video.search/search--7-------------------5-1-40">最热</a> |</li>
		<li><a <?php echo $isNoFollow?> href="/video.top/c-zongyi">综艺排行榜</a> |</li>
	</ul>	
<?php }elseif($channel=='comic'){?>
	<ul class="l">
		<li class="color1"><a <?php echo $isNoFollow?> href="/comic"><strong>动漫首页</strong></a></li>
		<li><a <?php echo $isNoFollow?> href="/video.search/search--16-------------------3-1-40">最新</a> |</li>
		<li><a <?php echo $isNoFollow?> href="/video.search/search--16-------------------5-1-40">最热</a> |</li>
		<li><a <?php echo $isNoFollow?> href="/video.search/search--16--%E9%AD%94%E5%B9%BB------------------1-40">魔幻</a> |</li>
		<li><a <?php echo $isNoFollow?> href="/video.search/search--16--%E7%9B%8A%E6%99%BA------------------1-40">益智</a> |</li>
		<li><a <?php echo $isNoFollow?> href="/video.search/search--16--%E5%8A%A8%E4%BD%9C------------------1-40">动作</a> |</li>
		<li><a <?php echo $isNoFollow?> href="/video.search/search--16--%E6%90%9E%E7%AC%91------------------1-40">搞笑</a> |</li>
		<li><a <?php echo $isNoFollow?> href="/video.search/search--16--%E5%86%92%E9%99%A9------------------1-40">冒险</a> |</li>
		<li><a <?php echo $isNoFollow?> href="/video.search/search--16--%E7%AB%A5%E8%AF%9D------------------1-40">童话</a> |</li>
		<li><a <?php echo $isNoFollow?> href="/video.top/c-comic">动漫排行榜</a> |</li>
	</ul>
<?php }elseif($channel=='music'){?>
	<ul class="l">
		<li class="color1"><a <?php echo $isNoFollow?> href="/music"><strong>音乐首页</strong></a></li>
		<li><a <?php echo $isNoFollow?> href="/video.search/search--24-----MV--------------3-1-40">MV</a> |</li>
		<li><a <?php echo $isNoFollow?> href="/video.search/search--24-----%E6%BC%94%E5%94%B1%E4%BC%9A--------------3-1-40">演唱会</a> |</li>
		<li><a <?php echo $isNoFollow?> href="/video.search/search--24-----%E9%A2%81%E5%A5%96%E7%A4%BC--------------3-1-40">颁奖礼</a> | </li>
		<li><a <?php echo $isNoFollow?> href="/video.search/search--24-----%E7%BA%AA%E5%BD%95%E7%89%87--------------3-1-40">纪录片</a> |</li>
		<li><a <?php echo $isNoFollow?> href="/video.search/search--24------%E7%94%B7%E6%AD%8C%E6%89%8B-------------3-1-40">男歌手</a> | </li>
		<li><a <?php echo $isNoFollow?> href="/video.search/search--24------%E5%A5%B3%E6%AD%8C%E6%89%8B-------------3-1-40">女歌手</a> | </li>
		<li><a <?php echo $isNoFollow?> href="/video.search/search--24------%E7%BB%84%E5%90%88-------------3-1-40">组合</a> | </li>
		<li><a <?php echo $isNoFollow?> href="/video.search/search--24------%E4%B9%90%E9%98%9F-------------3-1-40">乐队</a> | </li>
		<li><a <?php echo $isNoFollow?> href="/video.top/c-music">音乐排行榜</a> |</li>
	</ul>
<?php }?>	
</div>
</div>
<?php TPL::module('xintao/tv/ads/adHeader');?>
<?php }?>