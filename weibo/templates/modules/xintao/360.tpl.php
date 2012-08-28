<style>
.radar{float:left;position:relative;width:126px;height:109px;}
.radar .skan-num{margin-left:0px;position:absolute;top:0px;right:0px;}
.health0 .radar{background:url(http://static.xintaowang.com/css/default/xintao/360/Radar0.png) no-repeat;_background:url(http://static.xintaowang.com/css/default/xintao/360/Radar0_ie6.png) no-repeat;}
.health60 .radar{background:url(http://static.xintaowang.com/css/default/xintao/360/Radar60.png) no-repeat;_background:url(http://static.xintaowang.com/css/default/xintao/360/Radar60_ie6.png) no-repeat;}
.health90 .radar{background:url(http://static.xintaowang.com/css/default/xintao/360/Radar90.png) no-repeat;_background:url(http://static.xintaowang.com/css/default/xintao/360/Radar90_ie6.png) no-repeat;}
.health100 .radar{background:url(http://static.xintaowang.com/css/default/xintao/360/Radar100.png) no-repeat;_background:url(http://static.xintaowang.com/css/default/xintao/360/Radar100_ie6.png) no-repeat;}
.skan-num{margin-left:20px;width:50px;height:109px;background:url(http://static.xintaowang.com/css/default/xintao/360/SkanBack_Number.png) no-repeat;_background:url(http://static.xintaowang.com/css/default/xintao/360/SkanBack_Number_ie6.png) no-repeat;}.skan-num-1{background-position:0px 0px;}.skan-num-2{background-position:-47px 0px;}.skan-num-3{background-position:-94px 0px;}.skan-num-4{background-position:-141px 0px;}.skan-num-5{background-position:-188px 0px;}.skan-num-6{background-position:-235px 0px;}.skan-num-7{background-position:-282px 0px;}.skan-num-8{background-position:-329px 0px;}.skan-num-9{background-position:-376px 0px;}.skan-num-10{background-position:-423px 0px;}.skan-num-11{background-position:-470px 0px;}.skan-num-12{background-position:-517px 0px;}.skan-num-13{background-position:-564px 0px;}.skan-num-14{background-position:-611px 0px;}.skan-num-15{background-position:-658px 0px;}.skan-num-16{background-position:-705px 0px;}.skan-num-17{background-position:-752px 0px;}.skan-num-18{background-position:-799px 0px;}.skan-num-19{background-position:-846px 0px;}	
.skan-score{float:left;margin-left:20px;width:290px;}.skan-score em{font-size:32px;font-style: italic;font-weight:bolder;}.health0 .skan-score em,.health-required strong{color:red;}.health60 .skan-score em{color:#F3890D;}.health90 .skan-score em,.health-recommend strong{color:#047BC2;}.health100 .skan-score em,.health-optimized strong{color:#22940C;}
.health-header{margin-bottom:10px;}.health-header strong{font-size:14px;}.health-header span{color:#666;font-size:12px;}
.health-profile{margin-bottom:15px;}.health-required,.health-recommend,.health-optimized{margin-bottom:5px;}
/*.health-required li.false{background:url(http://static.xintaowang.com/css/default/xintao/360/danger.png) no-repeat;_background:url(http://static.xintaowang.com/css/default/xintao/360/danger_ie6.png) no-repeat;}
.health-recommend li.false{background:url(http://static.xintaowang.com/css/default/xintao/360/suggest.png) no-repeat;_background:url(http://static.xintaowang.com/css/default/xintao/360/suggest_ie6.png) no-repeat;}
.health-optimized li.false{background:url(http://static.xintaowang.com/css/default/xintao/360/warning.png) no-repeat;_background:url(http://static.xintaowang.com/css/default/xintao/360/warning_ie6.png) no-repeat;}
*/
	
.health-required li.false,.health-recommend li.false,.health-optimized li.false{background:url(http://static.xintaowang.com/css/default/xintao/360/fail.png) no-repeat;_background:url(http://static.xintaowang.com/css/default/xintao/360/fail_ie6.png) no-repeat;}
.health-optimized li.danger{background:url(http://static.xintaowang.com/css/default/xintao/360/danger.png) no-repeat;_background:url(http://static.xintaowang.com/css/default/xintao/360/danger_ie6.png) no-repeat;}	
	
.health-status{zoom:1;margin-bottom:15px;}.skan-main,.skan-left,.skan-right{float: left;zoom: 1;}.skan-main{width: 100%;}
.skan-middle{zoom: 1;margin:0px 70px 0px 55px;height:109px;background:url(http://static.xintaowang.com/css/default/xintao/360/SkanBack_Min.png) repeat-x;_background:url(http://static.xintaowang.com/css/default/xintao/360/SkanBack_Min_ie6.png) repeat-x;}
.skan-left{width:55px;margin-left: -100%;height:109px;background:url(http://static.xintaowang.com/css/default/xintao/360/SkanBack_Left.png) no-repeat;_background:url(http://static.xintaowang.com/css/default/xintao/360/SkanBack_Left_ie6.png) no-repeat;}
.skan-right{width:70px;margin-left: -70px;height:109px;background:url(http://static.xintaowang.com/css/default/xintao/360/SkanBack_Right.png) no-repeat;_background:url(http://static.xintaowang.com/css/default/xintao/360/SkanBack_Right_ie6.png) no-repeat;}
.health::after,.health-main::after,.skan-middle::after,.skan-left::after,.skan-right::after { content:'\20'; display:block; height:0; clear:both; }
.skan-radar{width:102px;height:109px;background:url(http://static.xintaowang.com/css/default/xintao/360/Radio.png) no-repeat;_background:url(http://static.xintaowang.com/css/default/xintao/360/Radio_ie6.png) no-repeat;}
.health0 .skan-radar{background-position:0px 0px;}.health60 .skan-radar{background-position:-102px 0px;}.health90 .skan-radar{background-position:-204px 0px;}.health100 .skan-radar{background-position:-306px 0px}
.health-status .skan-score{margin:0px;padding-left:55px;padding-top:2px;}


.health-result{padding:5px;}.health-result li{width:180px;float:left;margin-bottom:10px;margin-right:15px;padding-left:20px;}
.health-result li.true{background:url(http://static.xintaowang.com/css/default/xintao/360/safeico.png) no-repeat;_background:url(http://static.xintaowang.com/css/default/xintao/360/safeico_ie6.png) no-repeat;}
.health-result li.true span{color:#f60}	
.health-category{zoom: 1;margin-bottom:5px;}.health-category-header{float: left;width:88px;padding-left:10px;}.health-category ul{float:left;width:440px;}
a.health-home{cursor:pointer;display:block;width:98px;height:38px;float:right;margin-top:30px;background:url(http://static.xintaowang.com/css/default/xintao/360/home.png) no-repeat;_background:url(http://static.xintaowang.com/css/default/xintao/360/home_ie6.png) no-repeat;}
a.health-home:hover{background-position:-98px 0px;}
.health-yingxiao{width:242px;height:64px;position:relative;}
.health-yingxiao-closed{background:url(http://static.xintaowang.com/css/default/xintao/360/yingxiao_closed.png) no-repeat;_background:url(http://static.xintaowang.com/css/default/xintao/360/yingxiao_closed_ie6.png) no-repeat;}
.health-yingxiao-opened{background:url(http://static.xintaowang.com/css/default/xintao/360/yingxiao_opened.png) no-repeat;_background:url(http://static.xintaowang.com/css/default/xintao/360/yingxiao_opened_ie6.png) no-repeat;}	
a.health-yingxiao-open{position:absolute;right:8px;top:18px;display:block;width:48px;height:26px;background:url(http://static.xintaowang.com/css/default/xintao/360/TitleButton.png) no-repeat;_background:url(http://static.xintaowang.com/css/default/xintao/360/TitleButton_ie6.png) no-repeat;}
a.health-yingxiao-open:hover{background-position:-48px 0px;}
a.health-yingxiao-close{position:absolute;right:8px;top:18px;display:block;width:48px;height:26px;background:url(http://static.xintaowang.com/css/default/xintao/360/TitleButtonClose.png) no-repeat;_background:url(http://static.xintaowang.com/css/default/xintao/360/TitleButtonClose_ie6.png) no-repeat;}
a.health-yingxiao-close:hover{background-position:-96px 0px;}

a.health-yingxiao-go{position:absolute;top:4px;left:5px;width:54px;height:55px;display:block;}
.health-yingxiao-closed	a.health-yingxiao-go{background:url(http://static.xintaowang.com/css/default/xintao/360/state_danger.png) no-repeat -486px 0px;_background:url(http://static.xintaowang.com/css/default/xintao/360/state_danger_ie6.png) no-repeat -486px 0px;}
.health-yingxiao-opened	a.health-yingxiao-go{background:url(http://static.xintaowang.com/css/default/xintao/360/state_safe.png) no-repeat -486px 0px;_background:url(http://static.xintaowang.com/css/default/xintao/360/state_safe_ie6.png) no-repeat -486px 0px;}
.health-yingxiao-opened	a.health-yingxiao-open{display:none;}
.health-yingxiao-detail{margin-top:20px;zoom:1}
.health-yingxiao-detail li.yingxiao-item{margin-bottom:10px;padding-left:50px;zoom:1}
.health-yingxiao-detail li.item-opened{background:url(http://static.xintaowang.com/css/default/xintao/360/item_opened.png) no-repeat top left;_background:url(http://static.xintaowang.com/css/default/xintao/360/item_opened_ie6.png) no-repeat top left;}
.health-yingxiao-detail li.item-closed{background:url(http://static.xintaowang.com/css/default/xintao/360/item_closed.png) no-repeat top left;_background:url(http://static.xintaowang.com/css/default/xintao/360/item_closed_ie6.png) no-repeat top left;}
.health-yingxiao-detail span{color:#666;}
.health-yingxiao-detail .item-opened strong{color:#3e752a;}
.health-yingxiao-detail .item-closed strong,.health-yingxiao-detail .item-closed em{color:#a22f2f;}	
.health-side h3{margin-top:10px;padding:5px 0px;border-bottom:1px solid #666;font-size:14px;}
.yingxiao-item a{float:right;}
.health-site ul{float:left;margin-top:10px}.health-site li{margin-bottom: 10px;}
.health-site li span{color: #F60;margin-left: 3px;}
</style>
<?php
$nums = F('user_item.getPreYingxiaoNums');
$sitemap = DS('mgr/xintao/sitemap.getByUserId', 'g0', XT_USER_ID);
$h_weibo = false;
$h_sina = false;
$h_qq = false;
$h_sh = false;
$h_wy = false;
$h_seller = false;
$h_taoke = false;
$h_domain = false;
$h_icp = false;
$h_open_sina = false;
$h_open_qq = false;
$h_open_sh = false;
$h_open_wy = false;

$h_map_products = isset ($sitemap['products']) && !empty ($sitemap['products']) ? true : false;
$h_map_cids = isset ($sitemap['cids']) && !empty ($sitemap['cids']) ? true : false;
$h_map_items = isset ($sitemap['items']) && !empty ($sitemap['items']) ? true : false;
$h_map_shops = isset ($sitemap['shops']) && !empty ($sitemap['shops']) ? true : false;
$h_map_posters = isset ($sitemap['posters']) && !empty ($sitemap['posters']) ? true : false;
$h_map_tvs = isset ($sitemap['tvs']) && !empty ($sitemap['tvs']) ? true : false;
$h_map_keywords = isset ($sitemap['keywords']) && !empty ($sitemap['keywords']) ? true : false;
$h_map_weibos = isset ($sitemap['weibos']) && !empty ($sitemap['weibos']) ? true : false;
$h_proxy = 0;

$SCORE = 0;
$TOTAL = 16;
$COUNT = 0;
$HEALTH = 0;
$HEALTH_NUMS = 0;

//计算分数
if (SYSTEM_SINA_UID > 0 && V2_ACCESS_TOKEN != '') { //新浪微博
	$h_sina = true;
	$SCORE = $SCORE +10;
	$COUNT++;
}
if (WB_QQ_USER_OAUTH_TOKEN != '' && WB_QQ_USER_OAUTH_TOKEN_SECRET != '') { //腾讯微博
	$h_qq = true;
	$SCORE = $SCORE +10;
	$COUNT++;
}
if (WB_SOHU_UID != '' && WB_SOHU_USER_OAUTH_TOKEN != '' && WB_SOHU_USER_OAUTH_TOKEN_SECRET != '') { //搜狐微博
	$h_sh = true;
	$SCORE = $SCORE +10;
	$COUNT++;
}
if (WB_WY_UID != '' && WB_WY_USER_OAUTH_TOKEN != '' && WB_WY_USER_OAUTH_TOKEN_SECRET != '') { //网易微博
	$h_wy = true;
	$SCORE = $SCORE +10;
	$COUNT++;
}
if (WB_AKEY != WB_DEFAULT_AKEY) {
	$h_open_sina = true;
	$SCORE = $SCORE +4;
	$COUNT++;
}
if (WB_QQ_AKEY != WB_QQ_DEFAULT_AKEY) {
	$h_open_qq = true;
	$SCORE = $SCORE +4;
	$COUNT++;
}
if (XT_IS_WEIBO == 'true' && XT_FREE_DATELINE == '') {
	$h_weibo = true;
	if (XT_IS_MULTI == 'true') {
		$h_seller = true;
		$SCORE = $SCORE +30;
		$COUNT++;
	}
	if (XT_IS_TAOKE == 'true') {
		$h_taoke = true;
		if (!$h_seller) {
			$SCORE = $SCORE +30;
			$TOTAL = $TOTAL -1;
		}
		$COUNT++;
	}
	if (XT_SITE_DOMAIN != 't' . XT_USER_ID . '.xintaowang.com') {
		$h_domain = true;
		$SCORE = $SCORE +5;
		$COUNT++;
	}
	//if (XT_IS_ICP == 'true') {
	//	$h_icp = true;
	//	$SCORE = $SCORE +2;
	//	$COUNT++;
	//}
	//代理帐号
	$proxys = DS('accountProxy.getList');
	$h_proxy = count($proxys);
	if ($h_proxy >= 3) {
		$SCORE = $SCORE +3;
		$COUNT++;
	}
	elseif ($h_proxy = 2) {
		$SCORE = $SCORE +2;
		$COUNT++;
	}
	elseif ($h_proxy = 1) {
		$SCORE = $SCORE +1;
		$COUNT++;
	}
	
	//	if (WB_SOHU_AKEY != WB_SOHU_DEFAULT_AKEY) {
	//		$h_open_sh = true;
	//		$SCORE = $SCORE +2;
	//		$COUNT++;
	//	}
	//	if (WB_WY_AKEY != WB_WY_DEFAULT_AKEY) {
	//		$h_open_wy = true;
	//		$SCORE = $SCORE +2;
	//		$COUNT++;
	//	}

	//地图
	if (!(!$h_seller && $h_taoke)) { //如果不是淘客服务
		if ($h_map_products) {
			$SCORE = $SCORE +2;
			$COUNT++;
		}
		if ($h_map_cids) {
			$SCORE = $SCORE +3;
			$COUNT++;
		}
	} else { //如果是淘客服务（无需检测官方店铺，积分加入分类地图）
		if ($h_map_cids) {
			$SCORE = $SCORE +5;
			$COUNT++;
		}
	}
	if ($h_map_items) {
		$SCORE = $SCORE +3;
		$COUNT++;
	}
	if ($h_map_posters) {
		$SCORE = $SCORE +2;
		$COUNT++;
	}
	if ($h_map_tvs) {
		$SCORE = $SCORE +2;
		$COUNT++;
	}
	if ($h_map_keywords) {
		$SCORE = $SCORE +2;
		$COUNT++;
	}

}
if ($SCORE >= 100) {
	$SCORE = 100;
	$HEALTH = 100;
	$HEALTH_NUMS = 19;
}
elseif ($SCORE >= 90) {
	$HEALTH = 90;
	if ($SCORE >= 95) {
		$HEALTH_NUMS = 18;
	} else {
		$HEALTH_NUMS = 17;
	}
}
elseif ($SCORE >= 60) {
	$HEALTH = 60;
	if ($SCORE >= 84) {
		$HEALTH_NUMS = 16;
	}
	elseif ($SCORE >= 78) {
		$HEALTH_NUMS = 15;
	}
	elseif ($SCORE >= 72) {
		$HEALTH_NUMS = 14;
	}
	elseif ($SCORE >= 66) {
		$HEALTH_NUMS = 13;
	} else {
		$HEALTH_NUMS = 12;
	}
} else {
	$HEALTH = 0;
	if ($SCORE >= 55) {
		$HEALTH_NUMS = 11;
	}
	elseif ($SCORE >= 50) {
		$HEALTH_NUMS = 10;
	}
	elseif ($SCORE >= 45) {
		$HEALTH_NUMS = 9;
	}
	elseif ($SCORE >= 40) {
		$HEALTH_NUMS = 8;
	}
	elseif ($SCORE >= 35) {
		$HEALTH_NUMS = 7;
	}
	elseif ($SCORE >= 30) {
		$HEALTH_NUMS = 6;
	}
	elseif ($SCORE >= 25) {
		$HEALTH_NUMS = 5;
	}
	elseif ($SCORE >= 20) {
		$HEALTH_NUMS = 4;
	}
	elseif ($SCORE >= 15) {
		$HEALTH_NUMS = 3;
	}
	elseif ($SCORE >= 10) {
		$HEALTH_NUMS = 2;
	} else {
		$HEALTH_NUMS = 1;
	}
}
?>
<div style="width:930px">
<div class="health health<?php echo $HEALTH;?>">
	<div class="health-main">
		<div class="health-status ks-clear">
			<div class="skan-main">
				<div class="skan-middle">
					<div class="skan-score">
						<ul>
							<li><strong style="font-size:18px;color:#666;">微购体检得分&nbsp;:&nbsp;</strong><em style="" class="score"><?php echo $SCORE;?></em></li>
							<li><?php if($COUNT==$TOTAL){echo '<span style="color:#22940C;">您的微购很健康，请继续保持！</span>';}else{?><span style="color:#666;">共体检了&nbsp;<span style="color:#F3890D"><?php echo $TOTAL;?></span>&nbsp;项，其中&nbsp;<span style="color:#F3890D;background:url(http://static.xintaowang.com/css/default/xintao/360/fail.png) no-repeat;_background:url(http://static.xintaowang.com/css/default/xintao/360/fail_ie6.png) no-repeat;padding-left:16px"><?php echo $TOTAL-$COUNT;?></span>&nbsp;项有问题</span><?php }?></li>
							<li><span style="color:#666;"><strong style="color:red;font-size:16px;"><?php echo F('yingxiao.getWeiboAccount');?></strong>名淘客为淘宝卖家带来<strong style="color:red;font-size:16px;"><?php echo F('yingxiao.getWeiboYingxiao');?></strong>次营销</span></li>
						</ul>
						
					</div>
					<a <?php echo XT_IS_WEIBO=='true'?(' target="_blank" href="http://'.XT_SITE_DOMAIN.'"'):'href="#" rel="e:openAppstore"';?> class="health-home"></a>
				</div>
			</div>
			<div class="skan-left"><div class="skan-radar"></div></div>
			<div class="skan-right" style="position:relative;">
				<?php echo '<a href="#" rel="e:openAppstore" style="position:absolute;top:38px;left:5px;color:#f60;font-weight:bold;">'.(XT_IS_WEIBO=='true'&&XT_FREE_DATELINE==''?'续订':'升级').'</a>';?>
				<div class="skan-num skan-num-<?php echo $HEALTH_NUMS;?>"></div>
			</div>
		</div>
<?php
$wKey = F('wkey', XT_USER_ID);
$isTaoke = XT_IS_MULTI=='false'&&XT_IS_TAOKE=='true';
$isDetail = !$isTaoke&&XT_SID!='';
?>		
		<div class="health-result">
			<div class="health-required ks-clear">
				<div class="health-header">
					<strong>必选项目</strong>　-　<span>建议<a href="#" rel="e:activeApp">设置平台(免费)</a>后绑定<?php echo XT_IS_MULTI=='false'&&XT_SID!=''?'(仅自己推广,<a href="#" rel="e:openAppstore">订购卖家服务</a>:淘客自动协助推广)':''?><?php if(XT_IS_WEIBO=='true'){echo '，<strong style="font-size:14px;">客服QQ:153647646</strong>';}?></span>
				</div>
				<div class="health-category ks-clear">
					<div class="health-category-header">微博绑定:</div>
					<ul class="ks-clear">
						<?php


if ($h_sina) {
	echo '<li class="true"><a href="http://weibo.com/' . SYSTEM_SINA_UID . '" target="_blank">新浪微博</a>【<span>已绑定</span>'.($isDetail?(',<a href="http://s.weibo.com/weibo/'.(urlencode(SYSTEM_SINA_USERNICK)).'" target="_blank">商品</a>,<a href="http://s.weibo.com/weibo/'.(urlencode(SYSTEM_SINA_USERNICK)).'" target="_blank">店铺</a>'):'').'】</li>';
} else {
	echo '<li class="false">新浪微博【<a href="#" rel="e:bindList">绑定</a>】【<a href="http://weibo.com/" target="_blank">帐号</a>】</li>';
}
if ($h_qq) {
	echo '<li class="true"><a href="http://t.qq.com/' . WB_QQ_NAME . '" target="_blank">腾讯微博</a>【<span>已绑定</span>'.($isDetail?(',<a href="http://t.qq.com/search/index.php?sort=0&k='.($wKey).'" target="_blank">商品</a>,<a href="http://t.qq.com/search/index.php?sort=0&k='.($wKey).'" target="_blank">店铺</a>'):'').'】</li>';
} else {
	echo '<li class="false">腾讯微博【<a href="#" rel="e:bindList">绑定</a>】【<a href="http://t.qq.com/" target="_blank">帐号</a>】</li>';
}
if ($h_sh) {
	echo '<li class="true"><a href="http://t.sohu.com/u/' . WB_SOHU_UID . '" target="_blank">搜狐微博</a>【<span>已绑定</span>'.($isDetail?(',<a href="http://t.sohu.com/twsearch/twSearch?key='.(urlencode(mb_convert_encoding(($wKey),'GBK','UTF-8'))).'" target="_blank">商品</a>,<a href="http://t.sohu.com/twsearch/twSearch?key='.(urlencode(mb_convert_encoding(($wKey),'GBK','UTF-8'))).'" target="_blank">店铺</a>'):'').'】</li>';
} else {
	echo '<li class="false">搜狐微博【<a href="#" rel="e:bindList">绑定</a>】【<a href="http://t.sohu.com/" target="_blank">帐号</a>】</li>';
}
if ($h_wy) {
	echo '<li class="true"><a href="http://t.163.com/' . WB_WY_NICK . '" target="_blank">网易微博</a>【<span>已绑定</span>'.($isDetail?(',<a href="http://t.163.com/tag/'.(urlencode($wKey)).'" target="_blank">商品</a>,<a href="http://t.163.com/tag/'.(urlencode($wKey)).'" target="_blank">店铺</a>'):'').'】</li>';
} else {
	echo '<li class="false">网易微博【<a href="#" rel="e:bindList">绑定</a>】【<a href="http://t.163.com/" target="_blank">帐号</a>】</li>';
}
?>
					</ul>
				</div>	
			</div>
			<div class="health-recommend ks-clear">
				<div class="health-header">
					<strong>推荐项目</strong>　-　<span>推荐完成，将提高您的店铺，商品<strong style="color:red;font-size:16px;">20倍</strong>营销速度与范围</span>
				</div>
				<div class="health-category ks-clear">
					<div class="health-category-header">增值服务:</div>
					<ul class="ks-clear">
						<?php


if ($h_seller) {
	echo '<li class="true" style="color:red">卖家服务【<a href="#" rel="e:openAppstore">续订</a>】<br><span style="color:#666">(适合淘宝卖家)</span></li>';
} else {
	echo '<li class="false" style="color:red">卖家服务【<a href="#" rel="e:openAppstore">订购</a>】<br><span style="color:#666">(适合淘宝卖家)</span></li>';
}
if ($h_taoke) {
	if ($h_seller) {
		echo '<li class="true" style="color:red">淘客服务【<span>已包含</span>】<br><span style="color:#666">(适合淘宝客)</span></li>';
	} else {
		echo '<li class="true" style="color:red">淘客服务【<a href="#" rel="e:openAppstore">续订</a>】<br><span style="color:#666">(适合淘宝客)</span></li>';
	}
} else {
	echo '<li class="false" style="color:red">淘客服务【<a href="#" rel="e:openAppstore">订购</a>】【<a href="http://taoke.xintaowang.com" target="_blank">站点演示</a>】<br><span style="color:#666">(适合淘宝客)</span></li>';
}
?>
					</ul>
				</div>	
			</div>
			<div class="health-optimized ks-clear">
				<div class="health-header">
					<strong>优化项目</strong>　-　<span>建议完成，可大幅提高您的站点收录，如商品，店铺，画报，影视，微博等内容</span>
				</div>
				<div class="health-category ks-clear">
					<div class="health-category-header">独立域名:</div>
					<ul class="ks-clear">
						<?php


if ($h_domain) {
	echo '<li class="true">绑定域名【<span>已绑定</span>】' . (XT_USER_NICK == 'fxy060608' ? '<a href="#" rel="e:binddomain">测试绑定</a>' : '') . '</li>';
} else {
	echo '<li class="false">绑定域名【<a href="#" rel="e:binddomain">绑定</a>】</li>';
}
//if ($h_icp) {
//	echo '<li class="true">ICP备案【<span>已认证</span>】</li>';
//} else {
//	echo '<li class="false">ICP备案【<a href="#" ' . ($h_domain ? 'rel="e:icpConfirm"' : 'onclick="alert(\'必须先绑定域名，才能申请ICP认证\');return false;"') . '>认证</a>】</li>';
//}
?>
					</ul>
				</div>	
				<div class="health-category ks-clear">
					<div class="health-category-header">平台设置:</div>
					<ul class="ks-clear">
						<?php


if ($h_open_sina) {
	echo '<li class="true">新浪平台【<span>已设置</span>】</li>';
} else {
	echo '<li class="false">新浪平台【<a href="#" rel="e:activeApp">设置</a>】</li>';
}
if ($h_open_qq) {
	echo '<li class="true">腾讯平台【<span>已设置</span>】</li>';
} else {
	echo '<li class="false">腾讯平台【<a href="#" rel="e:activeApp">设置</a>】</li>';
}
?>	
						<li>搜狐平台【即将开放】</li>
						<li>网易平台【即将开放】</li>
					</ul>
				</div>
				<div class="health-category ks-clear">
					<div class="health-category-header">代理帐号:</div>
					<ul class="ks-clear">
						<?php


if ($h_proxy > 0) {
	echo '<li class="' . ($h_proxy >= 3 ? 'true' : 'danger') . '" title="推荐3个以上">新浪代理【<span>已' . $h_proxy . '个</span>】【<a href="#" rel="e:proxy">设置</a>】</li>';
} else {
	echo '<li class="false">新浪代理【<a href="#" rel="e:proxy">设置</a>】</li>';
}
?>	
					</ul>
				</div>
				
<?php if(XT_IS_SIMPLE=='false'){?>				
				<div class="health-category ks-clear">
					<div class="health-category-header">站点地图:</div>
					<ul class="ks-clear">
						<?php


if ($h_seller) {
	echo '<li class="true">官方店铺【<a href="#" rel="e:sitemapSet">设置</a>】【<a href="http://' . XT_SITE_DOMAIN . '/sitemap" target="_blank">详情</a>】</li>';
} else {
	if ($h_taoke) {
		echo '<li class="true">官方店铺【卖家服务】</li>';
	} else {
		echo '<li class="false">官方店铺【卖家服务】</li>';
	}
}
if ($h_map_cids) {
	echo '<li class="true">分类地图【<a href="#" rel="e:sitemapSet">设置</a>】【<a href="http://' . XT_SITE_DOMAIN . '/sitemap' . ($h_seller ? '.cat' : '') . '" target="_blank">详情</a>】</li>';
} else {
	echo '<li class="false">分类地图【<a href="#" rel="e:sitemapSet">设置</a>】</li>';
}
if ($h_map_items) {
	echo '<li class="true">商品地图【<a href="#" rel="e:sitemapSet">设置</a>】【<a href="http://' . XT_SITE_DOMAIN . '/sitemap.item" target="_blank">详情</a>】</li>';
} else {
	echo '<li class="false">商品地图【<a href="#" rel="e:sitemapSet">设置</a>】</li>';
}
echo '<li>店铺地图【即将开放】</li>';
if ($h_map_posters) {
	echo '<li class="true">画报地图【<a href="#" rel="e:sitemapSet">设置</a>】【<a href="http://' . XT_SITE_DOMAIN . '/sitemap.poster" target="_blank">详情</a>】</li>';
} else {
	echo '<li class="false">画报地图【<a href="#" rel="e:sitemapSet">设置</a>】</li>';
}
if ($h_map_tvs) {
	echo '<li class="true">影视地图【<a href="#" rel="e:sitemapSet">设置</a>】【<a href="http://' . XT_SITE_DOMAIN . '/sitemap.tv" target="_blank">详情</a>】</li>';
} else {
	echo '<li class="false">影视地图【<a href="#" rel="e:sitemapSet">设置</a>】</li>';
}
if ($h_map_keywords) {
	echo '<li class="true">关键词地图【<a href="#" rel="e:sitemapSet">设置</a>】【<a href="http://' . XT_SITE_DOMAIN . '/sitemap.keyword" target="_blank">详情</a>】</li>';
} else {
	echo '<li class="false">关键词地图【<a href="#" rel="e:sitemapSet">设置</a>】</li>';
}
?>
						<li>微博地图【即将开放】</li>
					</ul>
				</div>
<?php }?>					
			</div>
		</div>
	</div>
	<div class="health-side">
		<div class="health-yingxiao health-yingxiao-<?php echo $h_sina?'opened':'closed';?>">
			<a class="health-yingxiao-go" href="#" rel="e:autoCron"></a>
			<?php echo ($h_sina?'<a class="health-yingxiao-open" href="#" rel="e:bindList"></a>':'');?>
		</div>
		<ul class="health-yingxiao-detail">
			<?php if($h_seller){?>
			<li class="yingxiao-item item-opened">
				<ul>
					<li><strong>商品营销</strong>(每日<strong style="color:red;"><?php echo ($nums['item']+10)?>x4</strong>条/天)<a href="#" rel="e:yingxiaoItem">详情</a></li>
					<li><span>微购淘客会员正在推广您的商品</span></li>
				</ul>
			</li>
			<li class="yingxiao-item item-opened">
				<ul>
					<li><strong>店铺营销</strong>(每日<strong style="color:red;"><?php echo ($nums['shop']+2)?>x4</strong>条/天)<a href="#" rel="e:yingxiaoShop">详情</a></li>
					<li><span>微购淘客会员正在推广您的店铺</span></li>
				</ul>
			</li>
			<?php }elseif($h_sina){?>
			<li class="yingxiao-item item-closed">
				<ul>
					<li><strong>商品营销:</strong><em>未完全开启(仅自己推广10条/天)</em><a href="#" rel="e:yingxiaoItem">详情</a></li>
					<li><span><a href="#" rel="e:openAppstore" style="float:none;">订购卖家服务</a>后,微购淘客会员推广<strong style="color:red;"><?php echo ($nums['item']+10)?>x4</strong>条/天</span></li>
				</ul>
			</li>
			<li class="yingxiao-item item-closed">
				<ul>
					<li><strong>店铺营销:</strong><em>未完全开启(仅自己推广2条/天)</em><a href="#" rel="e:yingxiaoShop">详情</a></li>
					<li><span><a href="#" rel="e:openAppstore" style="float:none;">订购卖家服务</a>后,微购淘客会员推广<strong style="color:red;"><?php echo ($nums['shop']+2)?>x4</strong>条/天</span></li>
				</ul>
			</li>
			<?php	}else{?>
			<li class="yingxiao-item item-closed">
				<ul>
					<li><strong>商品营销:</strong><em>未开启</em><a href="#" rel="e:yingxiaoItem">详情</a></li>
					<li><span>绑定新浪微博后，自动开启</span></li>
				</ul>
			</li>
			<li class="yingxiao-item item-closed">
				<ul>
					<li><strong>店铺营销:</strong><em>未开启</em><a href="#" rel="e:yingxiaoShop">详情</a></li>
					<li><span>绑定新浪微博后，自动开启</span></li>
				</ul>
			</li>	
			<?php	}?>
			
		</ul>
		<?php if(isset($counts)){?>
		<h3>基本信息(<a href="#rank-section">排行榜</a>)</h3>
		<div class="health-site ks-clear">
			<ul style="margin-right:10px;">
				<?php echo (isset($counts['shop'])?('<li>店铺营销:<span>'.$counts['shop'].'</span></li>'):'');?>
				<li>总微博数:<span><?php echo $counts['wb'];?></span></li>
				<li style="margin-bottom:0px;">总用户数:<span><?php echo XT_IS_WEIBO=='true'?$counts['user']:'增值服务';?></span></li>
			</ul>
			<ul style="">
				<?php echo (isset($counts['item'])?('<li>商品营销:<span>'.$counts['item'].'</span></li>'):'');?>
				<li>今日微博数:<span><?php echo $counts['t_wb'];?></span></li>
				<li style="margin-bottom:0px;">今日用户数:<span><?php echo XT_IS_WEIBO=='true'?$counts['t_user']:'增值服务';?></span></li>
			</ul>
		</div>
		<?php }?>
		<h3>更新日志</h3>
		<ul style="margin-top:10px;">
			<li>
				2012-8-28：<br/>
				因新浪微博开放平台调整，我们已将新浪API升级为V2版本,请配置了自己APP平台的站长,进入新浪微博开放平台(http://open.weibo.com)--我的应用--应用信息--高级信息--OAuth2.0授权设置:<br/>
				<strong style="color:red">授权回调地址:http://你的域名/map.oauthCallback</strong><br>
				<strong style="color:red">取消授权回调地址:http://你的域名/map.cancelOauthCallback</strong><br>
				2012-8-23：<br/>
				微购升级服务器同时搬迁至香港，如果部分用户无法访问，请重启自己的路由器测试！已绑定独立域名且未使用cname(别名)指向www.xintaowang.com的站长，请尽快解除A记录解析，同时换成cname解析<br/>
			</li>
		</ul>
	</div>
	<div class="ks-clear"></div>
</div>
</div>

<script>

Xwb.use("action").reg("closeAutoCron",function(e){
  	Xwb.ui.MsgBox.alert('取消自动营销', '请进入自动营销中,取消您不允许的平台自动营销', function() {
			}, 'null', 'tips');
  },{na:true});
Xwb.use("action").reg("icpConfirm",function(e){
  	Xwb.ui.MsgBox.alert('备案认证', '如果您的域名已备案，请联系客服QQ：153647646申请域名备案认证', function() {
			}, 'null', 'tips');
  },{na:true});
<?php if(!$h_weibo){?>
$(function(){
	$('.health-optimized a').click(function(){
		openAppstore();
		return false;
	});
})
<?php }?>
</script>

