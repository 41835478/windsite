<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<#assign filePath = user_id?substring(user_id?length-2,user_id?length)>
<!--#if expr="$QUERY_STRING = /ITEMIID=([0-9]+)/" --><!--#set var="ITEMIID" value="$1" --><!--#endif -->
<!--#if expr="$ITEMIID = /[0-9]+([0-9]{3})/" --><!--#set var="ITEMIIDPATH" value="$1" --><!--#endif -->
<meta name="keywords" content="<!--#include virtual="/hitem/$ITEMIIDPATH/$ITEMIID/meta.html"-->">
<meta name="description" content="<!--#include virtual="/hitem/$ITEMIIDPATH/$ITEMIID/meta.html"-->">
<title><!--#include virtual="/hitem/$ITEMIIDPATH/$ITEMIID/meta.html"-->- ${sitetitle}</title>
<!--#include virtual="/zone/${filePath}/${user_id}/pageHtmlHeader.html"-->
<script src="/assets/min/js/page/fanli.min.js?20120103"></script>
<#assign isThird = qq_appkey??||sina_appkey??||taobao_appkey??>
<style>
.apple_overlay {display:none;background-image:url(/assets/min/stylesheets/images/white.png);width:<#if isThird>500<#else>300</#if>px;padding:35px;font-size:11px;}.apple_overlay .close {background-image:url(/assets/min/stylesheets/images/close.png);position:absolute; right:5px; top:5px;cursor:pointer;height:35px;width:35px;}.apple_overlay .field {padding-top: 12px;zoom: 1;}.apple_overlay .field label {display: inline-block;padding-right: 10px;text-align: right;width: 66px;}.apple_overlay .login-text {border: 1px solid #C8C8C8;height: 18px;line-height: 18px;margin-right: 3px;padding: 3px;vertical-align: middle;width: 180px;}
<!--[if lt IE 7]><style>div.apple_overlay {background-image:url(http://static.flowplayer.org/tools/img/overlay/overlay_IE6.gif);color:#fff;}div.apple_overlay div.close {background-image:url(http://static.flowplayer.org/tools/img/overlay/overlay_close_IE6.gif);}</style><![endif]-->
</style>
<div id="J_FanliLoginBox" class="apple_overlay">
	<div class="hd"></div>
	<div class="bd" style="<#if isThird>margin-top:50px;</#if>height:200px">
		<#if isThird>
		<div style="width:300px;float:left;">
			<div style="margin:10px 30px 0 30px; border-bottom:1px solid #E6E6E6; padding-bottom:12px;"><span style="color:#313131; font-size:14px; margin-left:9px;">您尚末登录，购物无法拿到返利!</span></div>
			<div class="field"><label>账户名</label> <input type="text" id="J_Username" class="login-text"></div>
			<div class="field"><label>密　码</label>	<input type="password" id="J_Pwd" class="login-text"></div>
			<div class="field"><span id="J_FanliLoginButton" class="btn btn-ok" style="margin-left:80px;"><input type="button" value="登录"></span>&nbsp;&nbsp;&nbsp;<a href="/router/fanli/registe" id="J_FanliRegiste" style="color:#f30;" target="_blank">注册新会员</a></div>
		</div>
		<div style="width:200px;float:left;">
			<div style="margin:10px 30px 0 30px; border-bottom:1px solid #E6E6E6; padding-bottom:12px;"><span style="color:#313131; font-size:14px; margin-left:9px;">合作网站登录!</span></div>
			<div id="third_login_sina" style="margin-top:15px;margin-left:30px;"></div>
			<div id="third_login_qq" style="margin-left:30px;"></div>
		</div>
		<#else>
			<div style="margin:10px 30px 0 30px; border-bottom:1px solid #E6E6E6; padding-bottom:12px;"><span style="color:#313131; font-size:14px; margin-left:9px;">您尚末登录，购物无法拿到返利!</span></div>
			<div class="field"><label>账户名</label> <input type="text" id="J_Username" class="login-text"></div>
			<div class="field"><label>密　码</label>	<input type="password" id="J_Pwd" class="login-text"></div>
			<div class="field"><span id="J_FanliLoginButton" class="btn btn-ok" style="margin-left:80px;"><input type="button" value="登录"></span>&nbsp;&nbsp;&nbsp;<a href="/router/fanli/registe" id="J_FanliRegiste" style="color:#f30;" target="_blank">注册新会员</a></div>
		</#if>
		<div style="clear:both;margin:22px 30px 0 30px; text-align:right;"><a id="J_FanliLink" style="font-size:14px;" href="#" target="_blank">不要返利，直接购买&gt;&gt;</a></div>
	</div>
</div>
<div class="layout <#if site_detialLayout??&&site_detialLayout!=''>${site_detialLayout}<#else>grid-s5m0</#if> ks-clear">
	<div class="col-main">
		<div class="main-wrap J_TRegion">
			<!--#include virtual="/hitem/$ITEMIIDPATH/$ITEMIID/$ITEMIID.html"-->
		</div>
	</div>
	<div class="col-sub J_TRegion">
		<#if user_id??&&''!=user_id>
		<#assign objectConstructor = "freemarker.template.utility.ObjectConstructor"?new()>
		<#assign filePath = user_id?substring(user_id?length-2,user_id?length)>
		<#assign file = objectConstructor("java.io.File", htmlPath+"/htdocs/zone/"+filePath+"/"+user_id+"/detail.html")> 
		<#if file.exists()>
			<!--#include virtual="/zone/${filePath}/${user_id}/detail.html"-->
		<#else>
		<div name="shopSearch" class="box J_TBox ks-clear">
			<div class="shop-search">
				<div class="hd"><h3><span>搜索淘宝宝贝</span></h3></div>
				<div class="bd">
					<div class="search-form">
						<form name="SearchForm" action="/search" method="get" target="_blank">
							<input type="hidden" name="cid" value="0">
							<ul>
								<li class="keyword"><label for="keyword">关键字：</label><input type="text" size="18" name="q" id="KeywordBox" value="" onfocus="this.select();"></li>
								<li class="price"><label for="price">价格：</label><input id="price1" type="text" name="start_price" class="price J_CheckInput" size="4" value="">到<input id="price2" name="end_price" class="price J_CheckInput" type="text" size="4" value=""></li>
								<li class="submit"><button type="submit" class="button">搜索</button></li>
							</ul>
						</form>
					</div>
				</div>
			</div>
		</div>
		<div name="shopCategory" class="box J_TBox ks-clear">
			<div class="shop-category">
				<div class="hd"><h3><span>商品分类</span></h3></div>
				<div class="bd">
					<ul class="cats">
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=16">女装/女士精品</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=30">男装</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50006843">女鞋</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50010388">运动鞋</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50011740">男鞋/皮鞋/休闲鞋</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50016756">运动服/运动包/颈环配件</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=1625">女士内衣/男士内衣/家居服</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50006842">箱包皮具/热销女包/男包</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50010404">服饰配件/皮带/帽子/围巾</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=11">电脑硬件/显示器/电脑周边</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=1512">手机</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=1101">笔记本电脑</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50041307">网络设备/路由器/网络相关</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=14">数码相机/摄像机/摄影器材</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=1201">MP3/MP4/iPod/录音笔</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=20">电玩/配件/游戏/攻略</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50018908">影音电器</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50018930">厨房电器</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50018957">生活电器</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50008090">3C数码配件市场</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50019321">国货精品手机</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50035182">大家电</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50019142">个人护理/保健/按摩器材</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50019393">闪存卡/U盘/移动存储</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=1801">美容护肤/美体/精油</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50010788">彩妆/香水/美发/工具</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50018121">国货精品/开架化妆品</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=21">居家日用/收纳/礼品</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50035867">厨房/餐饮用具</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50035458">日化/清洁/护理</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50008163">床上用品/靠垫/毛巾/布艺</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=2128">家装饰品/窗帘/地毯</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50008164">家具/家具定制/宜家代购</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=27">装潢/灯具/五金/安防/卫浴</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50002766">零食/坚果/茶叶/特产</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50035978">滋补/生鲜/速食/订餐</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50008825">保健食品</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=35">奶粉/辅食/营养品</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50006004">尿片/洗护/喂哺等用品</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50005998">益智玩具/早教/童车床/出行</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50008165">童装/童鞋/孕妇装</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50010728">运动/瑜伽/健身/球迷用品</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=2203">户外/登山/野营/旅行</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=26">汽车/配件/改装/摩托/自行车</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=33">书籍/杂志/报纸</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=29">宠物/宠物食品及用品</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=34">音乐/影视/明星/音像</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50039094">乐器/吉他/钢琴/配件</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50007218">办公设备/文具/耗材</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50015926">珠宝/钻石/翡翠/黄金</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=1705">饰品/流行首饰/时尚饰品</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50005700">品牌手表/流行手表</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=25">玩具/模型/娃娃/人偶</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=23">古董/邮币/字画/收藏</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=28">ZIPPO/瑞士军刀/眼镜</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50007216">鲜花速递/蛋糕配送/园艺花艺</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50008075">演出/吃喝玩乐折扣券</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50018963">酒店客栈/景点门票/度假旅游</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50032886">网店/网络服务/个性定制/软件</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50035966">成人用品/避孕/计生用品</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50017708">网游装备/游戏币/帐号/代练</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50008907">IP卡/网络电话/手机号码</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=99">网络游戏点卡</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=40">腾讯QQ专区</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50004958">移动/联通/小灵通充值中心</a></li></ul></li>
					</ul>
				</div>
			</div>
		</div>
		</#if>
		</#if>	
	</div>
</div>
<!--#include virtual="/zone/${filePath}/${user_id}/footer.html"-->
<!--#config timefmt="%Y-%m-%d %r"-->
<!--Designer-->
<script type="text/javascript">
var DEBUG=false,ISDESIGNER=false,PID='${pid}',<#if versionNo??>VERSIONNO=${versionNo},<#else>VERSIONNO=1,</#if>WWW='${www}';
$(function(){
	$('#XT_TabBar li').click(function(){
		$(this).addClass('selected').siblings().removeClass('selected');
		var box=$(this).attr('data-box');
		if('XT_DescriptionBox'==box){
			$('#XT_ReviewsBox').hide();
			$('#XT_DescriptionBox').show();
		}else if('XT_ReviewsBox'==box){
			$('#XT_DescriptionBox').hide();
			$('#XT_ReviewsBox').show();
		}
	});
	$('#XT_ItemDetail a[href*="item.taobao.com"]').each(function(){
		var href = $(this).attr('href');
		if(href.indexOf('id=')!=-1||href.indexOf('item_num_id=')!=-1){
			$(this).attr('href','/gitem/'+href.split('id=')[1].split('&')[0]+'.html');
		}
	});
	try{
		var NUMIID='<!--#echo var="ITEMIID" -->';
		if(NUMIID&&'(none)'!=NUMIID){
			var LAST_MODIFIED=new Date('<!--#flastmod virtual="/hitem/$ITEMIIDPATH/$ITEMIID/$ITEMIID.html" -->');
			var CURRENT_DATE=new Date();
			var DAYS = (CURRENT_DATE.getTime() - LAST_MODIFIED.getTime()) / 86400000;
			if(DAYS>=5){
				$.ajax({
						url : '/router/site/synitem/'+NUMIID+'?v=' + Math.random(),
						type : 'GET',
						data : {},
						beforeSend : function(xhr) {
							xhr.setRequestHeader("WindType", "AJAX");// 请求方式
							xhr.setRequestHeader("WindDataType", "HTML");// 请求返回内容类型
						},
						error : function(request, textStatus, errorThrown) {
						},
						success : function(data) {
						}
					});
			}
		}
	}catch(e){
	}
});
</script>
</body>
</html>