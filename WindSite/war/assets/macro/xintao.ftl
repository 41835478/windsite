<#macro xintaonav navselected='taoke'>
<style>
#topnav, #topnav .guid, #topnav .guid li.selected, #topnav .guid li.selected a{background: transparent url(http://static.xintaonet.com/assets/images/myxintao_v3_bg.gif) no-repeat scroll 2000px 2000px;}
#topnav{border-bottom:3px solid #8AB78A;background-position: 100% -222px;background-repeat: repeat-x;border-bottom: ;margin: 5px 0px 10px;position: relative;}
#topnav .guid{background-color: white;background-position: 0px -251px;height: 28px;width: 600px;}#topnav .guid li{float: left;height: 27px;line-height: 27px;padding-bottom: 1px;position: relative;}
#topnav .guid li.selected{background-position: 0px 0px;background-repeat: repeat-x;border: none;color: white;}#topnav .guid li a{color: #404040;display: block;font-weight: bold;padding: 0px 15px;}#topnav .guid li.selected a{background-position: 100% -50px;background-repeat: no-repeat;border: none;}#topnav .guid li.selected a, #topnav .guid li.selected span{color: white;}
</style>
<div id="topnav">
<ul class="guid">
    <li<#if navselected=='taoke'> class="selected"</#if>><a href="/router/member/sitemanager"><span>我是淘客</span></a></li>
    <li<#if navselected=='seller'> class="selected"</#if>><#if (USER.usb??&&(USER.usb.versionNo<3))&&('admin'!=USER.role)><#else><a href="/router/member/sellermanager"><span>我是卖家</span></a></#if><img style="position:absolute;right:-5px;top:-10px;" src="/designer/assets/images/new.gif"/></li>
	<li<#if navselected=='top'> class="selected"</#if>><a href="/router/member/topmanager"><span>排行榜</span></a></li>
    <li><a href="/router/site/loginuc?redirect=http://home.xintaonet.com" target="_blank"><span>新淘家园</span></a></li>
    <!--<li><a href="/router/site/loginuc?redirect=http://forum.xintaonet.com" target="_blank"><span>新淘论坛</span></a></li>-->
    <li><a href="/router/site/view/support" target="_blank"><span style="color:red;">帮助中心</span></a></li>
</ul>
</div>
<#if USER??&&USER.usb??>
	<#if (USER.usb.versionNo==1)>
		<div style="height:30px;line-height:14px;">版本提示：您当前使用的为新淘网_淘客普及版（未付费），建议您升级更高版本</div>
	<#elseif (USER.usb.versionNo==1.5)>
		<div style="height:30px;line-height:14px;">版本提示：您当前使用的为新淘网_淘客分成版(分成型)，您还可以选择订购月租型新淘网_普及版，返利版，卖家版[<a href="http://fuwu.taobao.com/service/service.htm?service_id=300" style="color:red;font-weight:bold;" target="_blank">版本升级帮助</a>]</div>
	<#elseif (USER.usb.versionNo==1.6)>
		<div style="height:30px;line-height:14px;">版本提示：您当前使用的为新淘网_淘客普及版（付费），您还可以升级为返利版或卖家版</div>
	<#elseif USER.usb.versionNo==2>
		<div style="height:30px;line-height:14px;">版本提示：您当前使用的为新淘网_淘客返利版，如果您是淘宝卖家，您还可以选择升级新淘网_卖家版[<a href="http://fuwu.taobao.com/service/service.htm?service_id=300" style="color:red;font-weight:bold;" target="_blank">版本升级帮助</a>]</div>
	<#elseif (USER.usb.versionNo==3)>
		<div style="height:30px;line-height:14px;">版本提示：您当前使用的为新淘网_卖家版</div>	
	</#if>
</#if>
</#macro>
<!--我是淘客-->
<#macro taokebd bdselected='site-proflie' group=0>
<style>
.taoke-bd{background-color:white;border:1px solid #8AB78A;}.menu-box{background:#FDFEFF;margin-top:-1px;overflow:hidden;padding:0;}.menu-box::after{clear:both;content:' ';display:block;height:0;}.taoke-bd{-webkit-box-shadow:#E9E9E9 2px 2px 3px;padding:0;zoom:1;}.taoke-bar{background-color:white;border:1px solid #8AB78A;cursor:pointer;height:28px;line-height:28px;margin:0;padding:0;position:relative;width:100%;}
.taoke-bar span,.taoke-bar-grey span{color:#404040;background:#F0F5F9 url(http://static.xintaonet.com/assets/images/myxintao_v3_bg.gif) repeat-x scroll 0 -100px;display:block;font-size:12px;font-weight:bold;line-height:26px;margin:1px;padding-left:22px;}.taoke-bar button.menu-open,.taoke-bar button.menu-close{background:url(http://static.xintaonet.com/assets/images/myxintao_v3_bg.gif) no-repeat scroll 2000px 2000px;border:0;cursor:pointer;height:10px;left:6px;overflow:hidden;overflow-x:hidden;overflow-y:hidden;position:absolute;text-indent:-999em;top:9px;width:10px;}
.taoke-bar button.menu-close{background-position:0 -200px;}select,input,button,textarea{font:normal normal normal 100%/ normal Tahoma,Helvetica,Arial,sans-serif;}.menu-box .group{clear:both;margin:6px 5px 10px;}.menu-box .group li{clear:both;float:left;padding:3px 0;width:100%;}.menu-box a{color:#414141;}
.group li a,.group li span a{padding-left:18px;}.group li ul li a{display:block;padding-left:30px;}.menu-box .group li a,.menu-box .group li span a,.menu-box .group li ul li a{background:transparent url(http://static.xintaonet.com/assets/images/myxintao_v3_bg.gif) no-repeat scroll 2000px 2000px;display:block;font-size:12px;height:20px;font-size:12px;line-height:20px;}
.group li a:hover,.group li span a:hover,.group li ul li a:hover{background-color:#DEE7ED;background-position:-200px -150px;}.group li ul li{padding:6px 0 0;}.group li span{height:20px;display:block;font-size:12px;line-height:20px;}.group li.fold-open span a{background-position:0 -150px;}.group li.fold-open span a:hover{background-color:#498CD0;background-position:-200px -150px;}
.group li.selected a,.group li ul li.selected a,.group li.selected span,.group li.selected span a{background-color:#5DAE40;background-position:0 -150px;color:white;}.taoke-bar button.menu-open{background-position:-20px -200px;}.group li.selected ul li a{color:#414141;}.guide-dialog .steps div{display:none;}
.guide-dialog h2{color:#46A600;font-family:'Microsoft YaHei';font-size:18px;font-weight:bold;}.guide-dialog .steps div.current{display:block;}.steps dl{line-height:20px;padding-bottom:15px;clear:both;color:#555;}.new_guide_c{margin-top:15px;padding-left:2em;}.new_guide_c dt{font-family:'Microsoft YaHei';font-size:16px;font-weight:bold;margin-bottom:6px;}
.new_guide_c dd{color:#777;}.guide-dialog p{margin-top:10px;}.a-r{text-align:right;}.guide-dialog .inp_btn2{margin:0 10px 0 4px;background:#DEEFFA;border:1px solid #4294D0;color:#555;cursor:pointer;font-size:12px;height:25px;padding:4px 6px;}.guide-dialog .guide-button-disable{background:gray;}a.guide-a{color:#014D7F;font-weight:700px;text-decoration:underline;}
a.guide-a:hover{color:#f60;}.guide-dialog ol.step li span{display:-moz-inline-box;display:inline-block;* zoom:1;* display:inline;vertical-align:middle;line-height:100%;text-align:left;font-size:12px;}.guide-dialog ol.step{width:100%;margin-bottom:20px;overflow:hidden;}.guide-dialog ol.step li,.guide-dialog ol.step li span{background-image:url('/assets/min/images/bg-step.png');background-repeat:no-repeat;text-align:center;}
.guide-dialog ol.step li{width:207px;height:29px;line-height:29px;padding-left:20px;float:left;overflow:hidden;text-align:center;position:relative;background-position:right -108px;border:none;color:#605F5F;}.guide-dialog ol.step li span{width:100%;font-size:14px;line-height:27px;line-height:29px;display:block;position:absolute;left:-17px;background-position:0 -108px;text-indent:17px;}
.guide-dialog ol.step li.finished{background-position:-4px -108px;}.guide-dialog ol.step li.finished span{left:0;background-position:0 -108px;}.guide-dialog ol.step li.current{height:29px;background-position:right -51px;border:none;}.guide-dialog ol.step li.current span{background-position:17px -51px;font-weight:bold;color:#AB4400;}
.guide-dialog ol.step li.last{border-right:1px #DBDBDB solid;background-position:right -406px;}.guide-dialog ol.step li.last span{background:none;left:0;}.guide-dialog ol.step li.last-current{height:29px;background-position:right -166px;border:none;border-right:1px solid #ffab0a;}.guide-dialog ol.step li.last-current span{background-position:15px -166px;font-weight:bold;color:#AB4400;left:-15px;}
.guide-dialog ol.step-three li{width:190px;}.guide-dialog ol.step-four li{width:140px;}.guide-dialog ol.step-two li{width:280px;}
</style>
<script>
$(function(){
	$('.taoke-bar').click(function(){
		var button=$(this).find('button');
		if(button.hasClass('menu-close')){
			button.removeClass('menu-close').addClass('menu-open');
			$(this).parent().find('.group:first').hide();
		}else{
			button.removeClass('menu-open').addClass('menu-close');
			$(this).parent().find('.group:first').show();
		}
	});
	$('a.function-guide').click(function(e){
		openGuideDialog($(this).attr('did'),$(this).attr('durl'));
		e.preventDefault();
		return false;
	});
	$('a.J_UnvalidVersionNo').click(function(){
		loadVersionInfo('高级功能');
	});
});
function loadVersionInfo(msg) {
	$('#J_VersionNoBox').remove();
	var strs = [
			'<div id="J_VersionNoBox" title="升级提示" style="display:none;position:relative;"><div class="help_info" align="left" style="position:relative;"><h3>选择升级或订购下列任意一个版本，即可使用<strong style="color:red;font-size:14px;font-weight:700;">',
			msg,
			'</strong></h3><p><ul><li>升级淘客返利版（月租型）[<a target="_blank" href="http://fuwu.taobao.com/service/service.htm?service_id=300" style="color:red;font-weight:700;">升级</a>]</li><li>升级卖家版[<a target="_blank" href="http://fuwu.taobao.com/service/service.htm?service_id=300" style="color:red;font-weight:700;">升级</a>]</li></ul></p><h3>提示：升级或订购后，需退出重新登录才可以生效</h3></div></div>']
	$('body').append(strs.join(''));
	$('#J_VersionNoBox').dialog({
				bgiframe : true,
				autoOpen : true,
				width : 550,
				height : 230,
				zIndex : 1000,
				modal : true
			});// 显示
}
</script>
<div class="taoke-bd">
<div class="menu-box"> 
<h3 class="taoke-bar"><span style="position:relative;">淘客建站<a class="function-guide" did="taoke-guide-dialog" durl="/site/step/taokeGuide.html" style="position:absolute;right:0px;color:red;font-size:12px;">向导</a></span><button class="<#if (1<group)>menu-open<#else>menu-close</#if>">-</button></h3> 
<ul class="group" <#if (1<group)>style="display:none;"</#if>>
<li style="position:relative;"><span><a  href="/router/member/page/manager" target="_blank">淘站装修</a><img style="position:absolute;right:0px;top:0px;" src="/designer/assets/images/new.gif"/></span></li>
<li<#if bdselected=='site-versions'> class="selected"</#if> style="position:relative;"><span><a  href="/router/member/versions">版本说明</a><img style="position:absolute;right:0px;top:0px;" src="/designer/assets/images/new.gif"/></span></li>
<li class="fold-open"><span><a  href="javascript:void(0);">淘站管理</a></span>									
	<ul style=""> 
		<li<#if bdselected=='site-proflie'> class="selected"</#if>><a href="/router/member/sitemanager/profile">基本信息</a></li>
		<li<#if bdselected=='site-domain'> class="selected"</#if>><a href="/router/member/sitemanager/domain">域名管理</a></li>
		<!--<li<#if bdselected=='site-template'> class="selected"</#if>><a href="/router/member/sitemanager/templates">(旧)页面管理</a></li>-->
		<!--<li style="position:relative;"<#if bdselected=='site-indexAds'> class="selected"</#if>><a href="/router/member/sitemanager/indexAds">首页广告</a></li>
		<li style="position:relative;"<#if bdselected=='site-blogAds'> class="selected"</#if>><a href="/router/member/sitemanager/blogAds">文章广告</a></li>
		<li<#if bdselected=='site-coolsite'> class="selected"</#if>><a href="/router/member/sitemanager/coolsite">酷站展示</a></li>--> 
		<li<#if bdselected=='site-analytics'> class="selected"</#if>><a href="/router/member/sitemanager/analytics">第三方统计</a></li> 
	</ul>
</li>
<#if (USER.usb.versionNo>=1.5)>
<li<#if bdselected=='site-links'> class="selected"</#if>><span><a href="/router/member/puji/links">友情链接</a></span></li>
<li<#if bdselected=='site-class'> class="selected"</#if>><span><a href="/router/member/puji/class">文章管理</a></span></li>
<#else>
<li><span><a class="J_UnvalidVersionNo" v="1.6">友情链接</a></span></li>
<li><span><a class="J_UnvalidVersionNo" v="1.6">文章管理</a></span></li>
</#if>
<li<#if bdselected=='site-shopgroups'> class="selected"</#if> style="position:relative;"><span><a href="/router/member/sitemanager/shops">我的店铺收藏</a><img style="position:absolute;right:0px;top:0px;" src="/designer/assets/images/new.gif"/></span></li>
<li<#if bdselected=='site-groups'> class="selected"</#if>><span><a href="/router/member/sitemanager/groups">我的推广组</a></span></li>
<li<#if bdselected=='site-kefu'> class="selected"</#if> style="position:relative;"><span><a href="/router/member/sitemanager/kefu">在线客服</a></span></li>
<li<#if bdselected=='site-share'> class="selected"</#if> style="position:relative;"><span><a href="/router/member/sitemanager/share">分享与收藏</a></span><img style="position:absolute;right:0px;top:0px;" src="/designer/assets/images/new.gif"/></li>
<!--<li><span><a href="/router/member/widget/my" target="_blank">自定义组件库</a></span></li>-->
<li<#if bdselected=='site-doctor'> class="selected"</#if>><span><a href="/router/member/sitemanager/doctor">淘站卫士</a></span></li>
</ul> 
</div>
<#if (USER.usb.versionNo>=2)>
<div class="menu-box"> 
<h3 class="taoke-bar"><span style="position:relative;">返利管理<a class="function-guide" did="fanli-guide-dialog" durl="/site/step/fanliGuide.html" style="position:absolute;right:0px;color:red;font-size:12px;">向导</a></span><button class="<#if (2<group)>menu-open<#else>menu-close</#if>">-</button></h3> 
<ul class="group" <#if (2<group)>style="display:none;"</#if>>
	<li<#if bdselected=='fanli-profile'> class="selected"</#if>><span><a href="/router/member/fl/profile">基本设置</a></span></li>
	<li<#if bdselected=='fanli-mall'> class="selected"</#if> style="position:relative;"><span><a href="/router/member/fl/mall/profile">商城设置</a></span><img style="position:absolute;right:0px;top:0px;" src="/designer/assets/images/new.gif"/></li>
	<li style="position:relative;"><span><a href="/router/member/fl/mall/yiqifa" target="_blank">商城管理</a></span><img style="position:absolute;right:0px;top:0px;" src="/designer/assets/images/new.gif"/></li>
	<!--<li<#if bdselected=='fanli-sitemap'> class="selected"</#if> style="position:relative;"><span><a href="/router/member/fl/sitemap">站点地图</a></span><img style="position:absolute;right:0px;top:0px;" src="/designer/assets/images/new.gif"/></li>-->
	<li<#if bdselected=='fanli-ad'> class="selected"</#if> style="position:relative;"><span><a href="/router/member/fl/ad">广告设置</a></span><img style="position:absolute;right:0px;top:0px;" src="/designer/assets/images/new.gif"/></li>
	<li<#if bdselected=='fanli-meta'> class="selected"</#if>><span><a href="/router/member/fl/meta">站长认证</a></span></li>
	<li<#if bdselected=='fanli-members'> class="selected"</#if>><span><a href="/router/member/fl/members">会员管理</a></span></li>
	<li<#if bdselected=='fanli-report'> class="selected"</#if>><span><a href="/router/member/fl/report">淘宝交易</a></span></li>
	<li<#if bdselected=='fanli-mallReport'> class="selected"</#if> style="position:relative;"><span><a href="/router/member/fl/mall/report">商城交易</a></span><img style="position:absolute;right:0px;top:0px;" src="/designer/assets/images/new.gif"/></li>
	<li<#if bdselected=='fanli-trade'> class="selected"</#if>><span><a href="/router/member/fl/trade">返利管理</a></span></li>
</ul>
</div>
<#else>
<div class="menu-box">
<h3 class="taoke-bar"><span style="position:relative;">返利管理</span><button class="<#if (2<group)>menu-open<#else>menu-close</#if>">-</button></h3> 
<ul class="group" <#if (2<group)>style="display:none;"</#if>>
	<li><span><a class="J_UnvalidVersionNo" v="2">基本设置</a></span></li>
	<li><span><a class="J_UnvalidVersionNo" v="2">商城设置</a></span></li>
	<li><span><a class="J_UnvalidVersionNo" v="2">商城管理</a></span></li>
	<li><span><a class="J_UnvalidVersionNo" v="2">广告设置</a></span></li>
	<li><span><a class="J_UnvalidVersionNo" v="2">站长认证</a></span></li>
	<li><span><a class="J_UnvalidVersionNo" v="2">会员管理</a></span></li>
	<li><span><a class="J_UnvalidVersionNo" v="2">淘宝交易</a></span></li>
	<li><span><a class="J_UnvalidVersionNo" v="2">商城交易</a></span></li>
	<li><span><a class="J_UnvalidVersionNo" v="2">返利管理</a></span></li>
</ul>
</div>

</#if>
<div class="menu-box"> 
<h3 class="taoke-bar"><span>淘客推广</span><button class="<#if (3<group)>menu-open<#else>menu-close</#if>">-</button></h3> 
<ul class="group" <#if (3<group)>style="display:none;"</#if>>
	<!--<li<#if bdselected=='taoke-links'> class="selected"</#if>><span><a href="/router/member/links">淘客自助推广</a></span></li>-->
	<li<#if bdselected=='taoke-convert'> class="selected"</#if>><span><a href="/router/member/links/convert">链接转换工具</a></span></li>
	<li<#if bdselected=='taoke-shops'> class="selected"</#if> style="position:relative;"><span><a href="/router/member/links/shops">高级店铺查询</a><img style="position:absolute;right:0px;top:0px;" src="/designer/assets/images/new.gif"/></span></li>
	<li<#if bdselected=='taoke-items'> class="selected"</#if>><span><a href="/router/member/links/items">高级商品查询</a></span></li>
	<li<#if bdselected=='taoke-blogs'> class="selected"</#if>><span><a href="/router/member/links/blogs">博客软文搜索</a></span></li>
</ul>
</div>
<!--<div class="menu-box"> 
<h3 class="taoke-bar"><span>推广统计</span><button class="<#if (4<group)>menu-open<#else>menu-close</#if>">-</button></h3> 
<ul class="group" <#if (4<group)>style="display:none;"</#if>>
    <li<#if bdselected=='analytics-profile'> class="selected"</#if>><span><a href="/router/member/analyticsmanager">综合报告</a></span></li>
    <li<#if bdselected=='analytics-last'> class="selected"</#if>><span><a href="/router/member/analyticsmanager/lastvisit">最近访客</a></span></li>
    <li<#if bdselected=='analytics-hour'> class="selected"</#if>><span><a href="/router/member/analyticsmanager/hour">时段分析</a></span></li>
    <li<#if bdselected=='analytics-day'> class="selected"</#if>><span><a href="/router/member/analyticsmanager/day">每日分析</a></span></li>
    <li<#if bdselected=='analytics-advanced'> class="selected"</#if>><span><a href="/router/member/analyticsmanager/advanced">高级统计</a></span></li>
</ul>
</div>-->
<div class="menu-box" id="cs"> 
<h3 class="taoke-bar"><span>收入报表</span><button class="<#if (5<group)>menu-open<#else>menu-close</#if>">-</button></h3> 
	<ul class="group" <#if (5<group)>style="display:none;"</#if>>
        <li<#if bdselected=='income-report'> class="selected"</#if>><span><a href="/router/member/sitemanager/report">收入查询</a></span></li>
    </ul> 
</div>
<div class="menu-box"> 
<h3 class="taoke-bar"><span>友情链接</span><button class="menu-close">-</button></h3> 
<ul class="group">
    <li><span><a href="/router/site/loginuc?redirect=http://home.xintaonet.com" target="_blank">新淘家园</a></span></li>
    <!--<li><span><a href="/router/site/loginuc?redirect=http://forum.xintaonet.com" target="_blank">新淘论坛</a></span></li>-->
</ul> 
</div>
</div>
</#macro>
<!--我是卖家-->
<#macro sellerbd bdselected='analytics-profile'>
<style>
.taoke-bd{background-color:white;border:1px solid #8AB78A;}.menu-box{background:#FDFEFF;margin-top:-1px;overflow:hidden;padding:0;}.menu-box::after{clear:both;content:' ';display:block;height:0;}.taoke-bd{-webkit-box-shadow:#E9E9E9 2px 2px 3px;padding:0;zoom:1;}.taoke-bar{background-color:white;border:1px solid #8AB78A;cursor:pointer;height:28px;line-height:28px;margin:0;padding:0;position:relative;width:100%;}
.taoke-bar span,.taoke-bar-grey span{color:#404040;background:#F0F5F9 url(http://static.xintaonet.com/assets/images/myxintao_v3_bg.gif) repeat-x scroll 0 -100px;display:block;font-size:12px;font-weight:bold;line-height:26px;margin:1px;padding-left:22px;}.taoke-bar button.menu-open,.taoke-bar button.menu-close{background:url(http://static.xintaonet.com/assets/images/myxintao_v3_bg.gif) no-repeat scroll 2000px 2000px;border:0;cursor:pointer;height:10px;left:6px;overflow:hidden;overflow-x:hidden;overflow-y:hidden;position:absolute;text-indent:-999em;top:9px;width:10px;}
.taoke-bar button.menu-close{background-position:0 -200px;}select,input,button,textarea{font:normal normal normal 100%/ normal Tahoma,Helvetica,Arial,sans-serif;}.menu-box .group{clear:both;margin:6px 5px 10px;}.menu-box .group li{clear:both;float:left;padding:3px 0;width:100%;}.menu-box a{color:#414141;}
.group li a,.group li span a{padding-left:18px;}.group li ul li a{display:block;padding-left:30px;}.menu-box .group li a,.menu-box .group li span a,.menu-box .group li ul li a{background:transparent url(http://static.xintaonet.com/assets/images/myxintao_v3_bg.gif) no-repeat scroll 2000px 2000px;display:block;font-size:12px;height:20px;font-size:12px;line-height:20px;}
.group li a:hover,.group li span a:hover,.group li ul li a:hover{background-color:#DEE7ED;background-position:-200px -150px;}.group li ul li{padding:6px 0 0;}.group li span{height:20px;display:block;font-size:12px;line-height:20px;}.group li.fold-open span a{background-position:0 -150px;}.group li.fold-open span a:hover{background-color:#498CD0;background-position:-200px -150px;}
.group li.selected a,.group li ul li.selected a,.group li.selected span,.group li.selected span a{background-color:#5DAE40;background-position:0 -150px;color:white;}.taoke-bar button.menu-open{background-position:-20px -200px;}.group li.selected ul li a{color:#414141;}.guide-dialog .steps div{display:none;}
.guide-dialog h2{color:#46A600;font-family:'Microsoft YaHei';font-size:18px;font-weight:bold;}.guide-dialog .steps div.current{display:block;}.steps dl{line-height:20px;padding-bottom:15px;clear:both;color:#555;}.new_guide_c{margin-top:15px;padding-left:2em;}.new_guide_c dt{font-family:'Microsoft YaHei';font-size:16px;font-weight:bold;margin-bottom:6px;}
.new_guide_c dd{color:#777;}.guide-dialog p{margin-top:10px;}.a-r{text-align:right;}.guide-dialog .inp_btn2{margin:0 10px 0 4px;background:#DEEFFA;border:1px solid #4294D0;color:#555;cursor:pointer;font-size:12px;height:25px;padding:4px 6px;}.guide-dialog .guide-button-disable{background:gray;}a.guide-a{color:#014D7F;font-weight:700px;text-decoration:underline;}
a.guide-a:hover{color:#f60;}.guide-dialog ol.step li span{display:-moz-inline-box;display:inline-block;* zoom:1;* display:inline;vertical-align:middle;line-height:100%;text-align:left;font-size:12px;}.guide-dialog ol.step{width:100%;margin-bottom:20px;overflow:hidden;}.guide-dialog ol.step li,.guide-dialog ol.step li span{background-image:url('/assets/min/images/bg-step.png');background-repeat:no-repeat;text-align:center;}
.guide-dialog ol.step li{width:207px;height:29px;line-height:29px;padding-left:20px;float:left;overflow:hidden;text-align:center;position:relative;background-position:right -108px;border:none;color:#605F5F;}.guide-dialog ol.step li span{width:100%;font-size:14px;line-height:27px;line-height:29px;display:block;position:absolute;left:-17px;background-position:0 -108px;text-indent:17px;}
.guide-dialog ol.step li.finished{background-position:-4px -108px;}.guide-dialog ol.step li.finished span{left:0;background-position:0 -108px;}.guide-dialog ol.step li.current{height:29px;background-position:right -51px;border:none;}.guide-dialog ol.step li.current span{background-position:17px -51px;font-weight:bold;color:#AB4400;}
.guide-dialog ol.step li.last{border-right:1px #DBDBDB solid;background-position:right -406px;}.guide-dialog ol.step li.last span{background:none;left:0;}.guide-dialog ol.step li.last-current{height:29px;background-position:right -166px;border:none;border-right:1px solid #ffab0a;}.guide-dialog ol.step li.last-current span{background-position:15px -166px;font-weight:bold;color:#AB4400;left:-15px;}
.guide-dialog ol.step-three li{width:190px;}.guide-dialog ol.step-four li{width:140px;}.guide-dialog ol.step-two li{width:280px;}
</style>
<script>
$(function(){
	$('.taoke-bar').click(function(){
		var button=$(this).find('button');
		if(button.hasClass('menu-close')){
			button.removeClass('menu-close').addClass('menu-open');
			$(this).parent().find('.group:first').hide();
		}else{
			button.removeClass('menu-open').addClass('menu-close');
			$(this).parent().find('.group:first').show();
		}
	});
	$('a.function-guide').click(function(e){
		openGuideDialog($(this).attr('did'),$(this).attr('durl'));
		e.preventDefault();
		return false;
	});
});
</script>
<div class="taoke-bd">
<div class="menu-box"> 
<h3 class="taoke-bar"><span>淘客管理</span><button class="menu-close">-</button></h3> 
<ul class="group">
<li<#if bdselected=='seller-taoke'> class="selected"</#if>><span><a href="/router/member/sellermanager/taoke">我要找淘客</a></span></li>
<!--<li<#if bdselected=='seller-groups'> class="selected"</#if>><span><a href="/router/member/sellermanager/group">单品类淘客</a></span></li>
<li<#if bdselected=='seller-shops'> class="selected"</#if>><span><a href="/router/member/sellermanager/shop">店铺类淘客</a></span></li>
<li<#if bdselected=='seller-widgets'> class="selected"</#if>><span><a href="/router/member/sellermanager/widget">组件类淘客</a></span></li>-->
</ul> 
</div>
<div class="menu-box"> 
<h3 class="taoke-bar"><span style="position:relative;">广告管理<a class="function-guide" did="seller-guide-dialog" durl="/site/step/sellerGuide.html" style="position:absolute;right:0px;color:red;font-size:12px;">向导</a></span><button class="menu-close">-</button></h3> 
<ul class="group">
<li<#if bdselected=='ads-index'> class="selected"</#if>><span><a href="/router/member/selleradsmanager/plan/index">首页广告计划</a></span></li>
<li<#if bdselected=='ads-blog'> class="selected"</#if>><span><a href="/router/member/selleradsmanager/plan/blog">文章广告计划</a></span></li>
</ul> 
</div>
<div class="menu-box"> 
<h3 class="taoke-bar"><span>推广统计</span><button class="menu-close">-</button></h3> 
<ul class="group">
	<li<#if bdselected=='admodule-site'> class="selected"</#if> style="position:relative;"><span><a href="/router/member/sellerads/adsite">独立站点推广</a></span><img style="position:absolute;right:0px;top:0px;" src="/designer/assets/images/new.gif"/></li>
	<!--<li<#if bdselected=='admodule-item'> class="selected"</#if> style="position:relative;"><span><a href="/router/member/sellerads/admodule">淘客商品推广</a></span><img style="position:absolute;right:0px;top:0px;" src="/designer/assets/images/new.gif"/></li>-->
    <li<#if bdselected=='analytics-profile'> class="selected"</#if>><span><a href="/router/member/analyticsmanager/seller">综合报告</a></span></li>
    <li<#if bdselected=='analytics-last'> class="selected"</#if>><span><a href="/router/member/analyticsmanager/seller/lastvisit">最近访客</a></span></li>
    <li<#if bdselected=='analytics-hour'> class="selected"</#if>><span><a href="/router/member/analyticsmanager/seller/hour">时段分析</a></span></li>
    <li<#if bdselected=='analytics-day'> class="selected"</#if>><span><a href="/router/member/analyticsmanager/seller/day">每日分析</a></span></li>
    <li<#if bdselected=='analytics-advanced'> class="selected"</#if>><span><a href="/router/member/analyticsmanager/seller/advanced">高级统计</a></span></li>
</ul>
</div>
<div class="menu-box"> 
<h3 class="taoke-bar"><span>友情链接</span><button class="menu-close">-</button></h3> 
<ul class="group">
    <li><span><a href="/router/site/loginuc?redirect=http://home.xintaonet.com" target="_blank">新淘家园</a></span></li>
    <li><span><a href="/router/site/loginuc?redirect=http://forum.xintaonet.com" target="_blank">新淘论坛</a></span></li>
</ul> 
</div>
</div>
</#macro>
<!--新淘排行榜-->
<#macro topbd bdselected='top-pv'>
<style>
.taoke-bd{background-color: white;border: 1px solid #8AB78A;}.menu-box{background: #FDFEFF;margin-top: -1px;overflow: hidden;padding: 0px;}.menu-box::after{clear: both;content: ' ';display: block;height: 0px;}.taoke-bd{-webkit-box-shadow: #E9E9E9 2px 2px 3px;padding: 0px;zoom: 1;}
.taoke-bar{background-color: white;border: 1px solid #8AB78A;cursor: pointer;height: 28px;line-height: 28px;margin: 0px;padding: 0px;position: relative;width: 100%;}
.taoke-bar span, .taoke-bar-grey span{color:#404040;background: #F0F5F9 url(http://static.xintaonet.com/assets/images/myxintao_v3_bg.gif) repeat-x scroll 0px -100px;display: block;font-size: 12px;font-weight: bold;line-height: 26px;margin: 1px;padding-left: 22px;}
.taoke-bar button.menu-open,.taoke-bar button.menu-close{background: url(http://static.xintaonet.com/assets/images/myxintao_v3_bg.gif) no-repeat scroll 2000px 2000px;border:0px;cursor: pointer;height: 10px;left: 6px;overflow: hidden;overflow-x: hidden;overflow-y: hidden;position: absolute;text-indent: -999em;top: 9px;width: 10px;}
.taoke-bar button.menu-close{background-position: 0px -200px;}select, input, button, textarea{font: normal normal normal 100%/normal Tahoma, Helvetica, Arial, sans-serif;}
.menu-box .group{clear: both;margin: 6px 5px 10px;}.menu-box .group li{clear: both;float: left;padding: 3px 0px;width: 100%;}.menu-box a{color: #414141;}.group li a,.group li span a{padding-left: 18px;}.group li ul li a{display: block;padding-left: 30px;}
.menu-box .group li a, .menu-box .group li span a, .menu-box .group li ul li a{background: transparent url(http://static.xintaonet.com/assets/images/myxintao_v3_bg.gif) no-repeat scroll 2000px 2000px;display: block;font-size: 12px;height: 20px;font-size: 12px;line-height: 20px;}
.group li a:hover,.group li span a:hover,.group li ul li a:hover{background-color: #DEE7ED;background-position: -200px -150px;}.group li ul li{padding: 6px 0px 0px;}
.group li span{height:20px;display:block;font-size: 12px;line-height: 20px;}.group li.fold-open span a{background-position: 0px -150px;}.group li.fold-open span a:hover{background-color: #498CD0;background-position: -200px -150px}
.group li.selected a,.group li ul li.selected a,.group li.selected span,.group li.selected span a{background-color: #5DAE40;background-position: 0px -150px;color: white;}
.taoke-bar button.menu-open{background-position: -20px -200px;}.group li.selected ul li a{color: #414141;}
</style>
<script>
$(function(){
	$('.taoke-bar').click(function(){
		var button=$(this).find('button');
		if(button.hasClass('menu-close')){
			button.removeClass('menu-close').addClass('menu-open');
			$(this).parent().find('.group:first').hide();
		}else{
			button.removeClass('menu-open').addClass('menu-close');
			$(this).parent().find('.group:first').show();
		}
	});
});
</script>
<div class="taoke-bd">
<div class="menu-box"> 
<h3 class="taoke-bar"><span>淘客排行榜</span><button class="menu-close">-</button></h3> 
<ul class="group">
<li<#if bdselected=='top-pv'> class="selected"</#if>><span><a href="/router/member/topmanager">推广点击排行榜</a></span></li>
</ul> 
</div>
<div class="menu-box"> 
<h3 class="taoke-bar"><span>友情链接</span><button class="menu-close">-</button></h3> 
<ul class="group">
    <li><span><a href="/router/site/loginuc?redirect=http://home.xintaonet.com" target="_blank">新淘家园</a></span></li>
    <li><span><a href="/router/site/loginuc?redirect=http://forum.xintaonet.com" target="_blank">新淘论坛</a></span></li>
</ul> 
</div>
</div>
</#macro>
<!--淘客模板页面-->
<#macro taoketemplate navselected='taoke' bdselected='site-proflie' group=0>
<table width=100% cellspacing="0" cellpadding="0">
<tr>
<td colspan=2>
<@xt.xintaonav navselected>
</@xt.xintaonav>
</td></tr>
<tr><td valign=top width=150px>
<@xt.taokebd  bdselected group>
</@xt.taokebd>
</td>
<td valign=top>
<div id="rightContent" style="width:768px;position:relative;">
<#if (bdselected?starts_with('analytics-'))><@ws.info><span style="color:red;">新淘网统计于8月15日正式启动【目前只支持推广组类组件和自定义类组件的推广统计,统计延迟约为1个小时】，建议查看2010年8月15日后的统计数据</span></@ws.info><br/></#if>
<#nested>
</div>	
</td></tr>
</table>
<#include "/site/template/footer.ftl">
</#macro>
<!--淘客微博管理模板页面-->
<#macro weibotemplate navselected='taoke' bdselected='site-proflie' group=0>
<table width=100% cellspacing="0" cellpadding="0">
<tr>
<td colspan=2>
<@xt.xintaonav navselected>
</@xt.xintaonav>
</td></tr>
<tr><td valign=top width=150px>
<@xt.taokebd  bdselected group>
</@xt.taokebd>
</td>
<td valign=top>
<div id="rightContent" style="width:768px;position:relative;">
<#assign site = USER.sites[0]>
<#if site.www??&&''!=site>
<script src="/assets/min/js/weibo.min.js?v=${dateVersion()}" type="text/javascript"></script>
<link rel="stylesheet" href="http://static.xintaonet.com/assets/min/css/fanli.css?v=${dateVersion()}" type="text/css"/>
<#if wdh??&&1==wdh.status><@ws.info><#if config.app_key=='4288004032'>您目前微博站点使用的是系统分配的App Key和App Secret，建议您使用自己的App Key和App Secret，参考<a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=4550" target="_blank">帮助</a><#elseif ''==config.user_oauth_token||'44676b08ec75042f00b2b15fe75bda49'==config.user_oauth_token>您使用了自己的App Key，但是尚未设置微博站点的管理员，请进入平台设置，设置自己微博站点的管理员用户<#else>您的购物微博地址是:<a href="http://${site.weibo}" target="_blank">${config.site_name}</a></#if></@ws.info><#else><@ws.info><span style="line-height:17px;"><span style="color:red;">请确认您已经在域名服务商那里配置主机名：t.独立域名   CNAME(别名):www.xintaonet.com.<br/>您的微博站点尚未审核通过，通过后，将可以正常访问。</span><br/>举例:假如独立域名为www.lovezippo.com，则配置t.lovezippo.com指向www.xintaonet.com</span></@ws.info></#if>
<#nested>
<#else>
您尚未绑定顶级域名，暂时无法使用微博管理功能。我是淘客--->淘客建站--->域名管理--->绑定顶级域名
</#if>
</div>	
</td></tr>
</table>
<#include "/site/template/footer.ftl">
</#macro>
<!--卖家模板页面-->
<#macro sellertemplate navselected='seller' bdselected='analytics-profile'>
<table width=100% cellspacing="0" cellpadding="0">
<tr>
<td colspan=2>
<@xt.xintaonav navselected>
</@xt.xintaonav>
</td></tr>
<tr><td valign=top width=150px>
<@xt.sellerbd  bdselected>
</@xt.sellerbd>
</td>
<td valign=top>
<div id="rightContent" style="width:768px;position:relative;">
<#if (bdselected?starts_with('analytics-'))><@ws.info><span style="color:red;">新淘网统计于8月15日开始正式启动【我是卖家下的统计可以查看您的淘宝店铺及商品在新淘网的被推广详情】，建议查看2010年8月15日后的统计数据</span></@ws.info></#if>
<#nested>
</div>	
</td></tr>
</table>
<#include "/site/template/footer.ftl">
</#macro>
<!--排行榜模板页面-->
<#macro toptemplate navselected='top' bdselected='top-pv'>
<table width=100% cellspacing="0" cellpadding="0">
<tr>
<td colspan=2>
<@xt.xintaonav navselected>
</@xt.xintaonav>
</td></tr>
<tr><td valign=top width=150px>
<@xt.topbd  bdselected>
</@xt.topbd>
</td>
<td valign=top>
<div id="rightContent" style="width:768px;">
<#if (bdselected?starts_with('top-'))><@ws.info><span style="color:red;">排行榜列出的为2010年8月15日后的统计数据【推广点击是指真实的点击商品，店铺，频道，推广，搜索等各种推广，并不等同于PV】</span></@ws.info></#if>
<#nested>
</div>	
</td></tr>
</table>
<#include "/site/template/footer.ftl">
</#macro>
<!--返利模板页面-->
<#macro fanlitemplate>
<table width=100% cellspacing="0" cellpadding="0"><tr><td valign=top><#nested></td></tr></table>
<@ws.siteFooter>
</@ws.siteFooter>
</#macro>
<!--新手步骤页面-->
<#macro steptemplate navselected='taoke'>
<table width=100% cellspacing="0" cellpadding="0">
<tr>
<td>
<@xt.xintaonav navselected>
</@xt.xintaonav>
</td></tr>
<tr><td valign=top>
<#nested>
</td></tr>
</table>
<#include "/site/template/footer.ftl">
</#macro>