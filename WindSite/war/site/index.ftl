<@ws.header>
<meta name="keywords" content="xintaonet,新淘,新淘网,淘宝客,淘客">
<meta name="description" content="新淘网 - 新淘网实现了多种酷炫图片组件封装，向广大淘宝客(淘客)提供一站式的建站方案，大幅度降低建站门槛，会用鼠标就可以拖拽生成独立而漂亮的淘宝推广网站，让更多的普通互联网用户成为专业淘客、推广淘宝、赚取佣金">
<title>新淘网-轻松做淘客</title>
</@ws.header>
<script>
$(function() {
$('#div_lastsites li').hover(
				function() {
					$(this).toggleClass("ui-selecting").siblings().removeClass(
							"ui-selecting");
				}, function() {
					$(this).removeClass("ui-selecting");
				});
$('#div_lastsites ul li[title]').tooltip('#tooltip');
$('.ads-title').click(function(){
	Track('ads-'+$(this).attr('partner'),'进入店铺');
});
$('.ads-desc').click(function(){
	Track('ads-'+$(this).attr('partner'),'进入介绍',$(this).text());
});
$('.ads-tuiguang').click(function(){
	Track('ads-'+$(this).attr('partner'),'推广商品','左旋360首页推广图片');
});
});
</script>
<style>
a.ads-desc{color:red;font-size:10pt;}a.ads-desc:hover{color:#A10000;}
.box .partner-desc{
	background: url(http://static.xintaonet.com/assets/min/images/linkview-li_img.gif) no-repeat 8px
		12px;
	padding-left:20px;
	height: 25px;
	line-height: 24px;
	overflow: hidden;
	text-align: left;
	white-space: nowrap;
	width: 99%;
}
div:after, ul:after, dl:after { content:"."; display:block; clear:both; height:0; visibility:hidden; }
.tooltip{display:none;background:transparent url(http://static.xintaonet.com/assets/images/black_arrow.png);font-size:12px;height:70px;width:160px;padding:25px;padding-top:20px;color:#fff;	}
.ui-selecting {background: #FF7C00;}
.function-li{position:relative;margin-bottom:13px;width:590px;height:80px;background:url(http://static.xintaonet.com/assets/images/functionbg.png) no-repeat;}
.function-li img{margin:10px;float:left;}
.function{float:left;}
.function-title{display:block;color:#FF0000;padding:5px;font-size:12pt;font-weight:bold;}
.function-profile{margin-left:15px;display:block;color:#000000;}
.function-desc{margin-left:15px;margin-top:8px;color:#888888;}
.today li{height:20px;float:left;margin:10px;white-space:nowrap;display: inline;}
.today ul{list-style:none}
.service-mall{background: transparent url(http://static.xintaonet.com/assets/min/images/shops.png) no-repeat scroll 500px 1000px;display: inline-block;height: 16px;margin: 5px 5px 0px 0px;overflow: hidden;vertical-align: text-bottom;width: 16px;zoom: 1;background-position: 100% -190px;margin: 2px 0px 0px 5px;width: 28px;}
#news{width:950px;height:25px;line-height:25px;overflow:hidden}
#news li{height:25px;}
</style>
<div class="content">
	<div class="left">
		<div style="height:150px;margin-bottom:12px;width:590px;">
			<script type="text/javascript">alimama_bm_revision = "3c49574022e4ad6f5ed5fda1ac704ba8ef19d089";alimama_bm_bid = "6845265";alimama_bm_width = 590;alimama_bm_height = 150;alimama_bm_xmlsrc = "http://img.uu1001.cn/x/2010-06-29/18-33/2010-06-29_aea3b9dba448e36b2a049d0c49324e81_0.xml";alimama_bm_link = "http://";alimama_bm_ds = "";alimama_bm_as = "default"</script><script type="text/javascript" src="http://img.uu1001.cn/bmv1.js?v=3c49574022e4ad6f5ed5fda1ac704ba8ef19d089"></script>
		</div>
		<ul style="margin:0px;padding:0px;height:360px;width:590px;list-style:none;">
			<li class="function-li">
				<img src="http://static.xintaonet.com/assets/images/function-site.png">
				<div class="function ui-corner-top  ui-corner-bottom">
					<span class="function-title">淘站建设</span>
					<span class="function-profile">丰富的酷炫图文工具,集成阿里妈妈推广</span>
					<div class="function-desc">通过新淘网设计器，向淘客提供一站式的淘客建站服务。</div>
				</div>
			</li>
			<li class="function-li">
				<img src="http://static.xintaonet.com/assets/images/function-manager.png">
				<div class="function ui-corner-top  ui-corner-bottom">
					<span class="function-title">淘站管理</span>
					<span class="function-profile">基本信息设置 ,SEO优化,多种第三方统计集成</span>
					<div class="function-desc">新淘网集合SEO优化功能以及第三方统计，方便用户随时掌握网站数据。</div>
				</div>
			</li>
			<li class="function-li">
				<img src="http://static.xintaonet.com/assets/images/function-business.png">
				<div class="function ui-corner-top  ui-corner-bottom">
					<span class="function-title">商务平台</span>
					<span class="function-profile">基于淘宝TOP平台,整合阿里妈妈淘客推广</span>
					<div class="function-desc">新淘网完善的CPS解决方案，让模式成功的转化为经济效益。</div>
				</div>
			</li>
			<li class="function-li">
				<img src="http://static.xintaonet.com/assets/images/function-trait.png">
				<div class="function ui-corner-top  ui-corner-bottom">
					<span class="function-title">特色功能</span>
					<span class="function-profile">拖拽式建站操作,淘站检测卫士</span>
					<div class="function-desc">新淘网设计器拖拽操作，会打字就会建设淘站，商品检测，提高转化率。</div>
				</div>
			</li>
		</ul>
	</div>
	<div class="right">
	<div  class="box ui-corner-top" style="height:150px;margin-bottom:10px;">
		<h3 style="font-weight:bold;color:#888888">&nbsp;用户登录:</h3>
		<ul class="login-box" style="list-style:none;">
			<li class="nums">
				<span class="num">01</span><a href="javascript:;">登录淘宝箱,找到新淘网,免费试用</a>
			</li>
			<li class="nums">
				<span class="num">02</span><a href="javascript:;">授权新淘网</a>
			</li>
			<li>
			<table width="100%"><tr><td><a onClick="$('#site-login-dialog').dialog('open');"><img src="http://static.xintaonet.com/assets/images/login-button.gif"></a></td>
			<td align="right">
			<a href="http://plugin.xintaonet.com" target="_blank" style="margin-left:3px;color:#6189b7;font-weight:bold;font-size:11pt;">程序版下载</a>
			</td></tr></table>
			</li>
		</ul>
	</div>
	<div id="div_lastsites" class="box ui-corner-top" style="margin-top:10px;">
		<h3 style="font-weight:bold;color:#888888"><table width="100%"><tr><td align="left">&nbsp;酷站展示:<td><td align="right"><a href="/router/site/coolsites" style="color:#FF0000;font-weight:normal;">更多</a></td></tr></table></h3>
		<#if coolSites??>
		<ul style="list-style:none;margin:0px;padding:0px;padding-left:15px;padding-top:10px;">
		<#list coolSites as s>
			<#assign pic = '/zone/'+(s.user_id?substring((s.user_id?length)-2,(s.user_id?length)))+'/'+s.user_id+'/'+s.user_id>
			<#assign www='http://'+s.site.domainName+'.xintaonet.com'>
			<#if s.site.www??><#assign www='http://'+s.site.www></#if>
			<li title="&lt;span style='color:#E65802'&gt;站点：&lt;/span&gt;&lt;a href='${www}' target='_blank' style='font-weight:bold;color:white;'&gt;${s.site.title}&lt;/a&gt;&lt;br/&gt;&lt;span style='color:#E65802'&gt;简介：&lt;/span&gt;${s.site.description}" >
			<div><a class="site" href="${www}" target="_blank">
				<img src="${pic}_90X80.png" />
				</a>
			</div>
			</li>
		</#list>
		</ul>
		</#if>
	</div>	
</div>
<br/>

<!--<div  class="today box ui-corner-top" style="width:100%;height:200px;margin-top:10px;margin-right:5px;margin-bottom:10px;float:left;">
<h3 style="width:100%;font-weight:bold;color:#888888;background:url(http://static.xintaonet.com/assets/images/bg_box_title.png) repeat-x;">&nbsp;热卖/推荐-<a href="http://s.click.taobao.com/t_8?e=7HZ5x%2BOzd%2BCSt1Aov%2B23rb64Kz7iutHx1KeJ1ajGc00ak2XtaBY%2FWEj9Hvx02COU&c=0ef1cf3ba0572f0c65a858abe1b6b43b&p=13667242&n=19&u=12034285xintao003" onclick="Track('ads-zzwlj321','进入店铺');" target="_blank">魔力俏美人邀您共赢</a>:</h3>
	<table width=100% height=170><tr><td width="590px;">
	<a target="_blank" class="ads-tuiguang" partner="zzwlj321" href="http://taoke.alimama.com/spreader/auction_list.htm?c=&advsort=&mid=1&q=zzwlj321&cat=0&od=1&conts=&conte=&hs=&he=&cs=&ce=&rs=&re=&loc=" target="_blank"><img src="http://static.xintaonet.com/assets/images/activity/zzwlj321_index.gif" alt="" width="590" height="170" style="border:1px solid #DDD;"></a> 
	</td>
	<td width="350px" style="" valign="top">
		<dl style="padding:10px;"> 
		<dt class="partner-desc"><a class="ads-desc" partner="zzwlj321" href="http://taoke.alimama.com/spreader/gen_auction_code.htm?_tb_token_=ee54e59f31d4e&auction_id=2173491317" target="_blank">加速360左旋肉碱 健康减肥 </a></dt>
		<dt class="partner-desc"><a class="ads-desc" partner="zzwlj321" href="http://taoke.alimama.com/spreader/gen_auction_code.htm?_tb_token_=ee54e59f31d4e&auction_id=3710779591" target="_blank">百年育发液 防脱生发克星 </a></dt>
		<dt><a href="http://s.click.taobao.com/t_8?e=7HZ5x%2BOzd%2BCSt1Aov%2B23rb64Kz7iutHx1KeJ1ajGc00ak2XtaBY%2FWEj9Hvx02COU&c=0ef1cf3ba0572f0c65a858abe1b6b43b&p=13667242&n=19&u=12034285xintao003" onclick="Track('ads-zzwlj321','进入店铺');" target="_blank">
		<img src="http://static.xintaonet.com/assets/images/activity/click_shop.jpg" alt="" width="100" height="25" border="0"></a>
		&nbsp;&nbsp;
		<a href="http://taoke.alimama.com/spreader/auction_list.htm?c=&advsort=&mid=1&q=zzwlj321&cat=0&od=1&conts=&conte=&hs=&he=&cs=&ce=&rs=&re=&loc="  target="_blank" onclick="Track('ads-zzwlj321','推广店铺');">
		<img src="http://static.xintaonet.com/assets/images/activity/click_tuiguang.jpg" alt="" width="100" height="25" border="0"></a></dt>
	</dl> 
	</td>
	</tr></table>
</div>-->
<br/>
<div  class="today box ui-corner-top" style="width:100%;height:auto;margin-top:10px;margin-bottom:10px;">
		<h3 style="width:100%;font-weight:bold;color:#888888;background:url(http://static.xintaonet.com/assets/images/bg_box_title.png) repeat-x;">&nbsp;今日新增站点:</h3>
	<ul>
	<li><a href="http://www.smv9.com" target="_blank">.</a><a href="http://www.wrm2.com" target="_blank">.</a><a href="http://www.hpj0.com" target="_blank">.</a><a href="http://www.amm5.com" target="_blank">.</a><a href="http://www.ovb9.com/miniqzbywg.html" target="_blank">.</a></li>
	<#if lastSites??>
	<#list lastSites as s>
			<#assign www='http://'+s.domainName+'.xintaonet.com'>
			<#if s.www??><#assign www='http://'+s.www></#if>
		<li><a href="${www}" target="_blank">${s.title}</a></li>
	</#list>
	</#if>
	</ul>
</div>
<div  class="today box ui-corner-top" style="width:100%;height:100px;margin-top:10px;margin-bottom:10px;">
		<h3 style="width:100%;font-weight:bold;color:#888888;background:url(http://static.xintaonet.com/assets/images/bg_box_title.png) repeat-x;">&nbsp;今日新增会员:</h3>
		<ul>
		<#if lastUsers??>
		<#list lastUsers as u>
			<li><a href="/router/site/details/${u.user_id}" target="_blank">${u.nick}</a></li>
		</#list>
		</#if>
		</ul>
</div>
</div>
<#include "/site/template/footer.ftl">