<@ws.haibaoheader>
<meta name="keywords" content="淘宝店铺,${sitetitle}">
<meta name="description" content="淘宝店铺,${sitetitle}">
<title>淘宝店铺排行榜- ${sitetitle}</title>
</@ws.haibaoheader>
<style>
img{border:0px;}
span.title{color:#00E;overflow: hidden;white-space: nowrap;display: inline-block;cursor: pointer;width:170px;}
li a:hover span.title{color:#F60;}
.order-list .order{float: left;height: 282px;margin: 0px 4px 10px 0px;width: 310px;}
.order-list .order h3{float: left;font-size: 14px;font-weight: 700;height: 24px;line-height: 24px;text-indent: 11px;width: 310px;}
.order-list{width:950px;}
.order-list .order ol{float: left;padding: 5px 0px;width: 280px;}
.order-list .order li{background: url(http://img.alimama.cn/cms/images/1258357261534.gif) no-repeat 0px 0px;}
.order-list .order li{height: 24px;line-height: 24px;list-style-type: none;padding-left: 26px;width: 100%;position:relative;}
.star_com{position:absolute;right:0px;}
.order-list .order li.ol-1{background-position:0 -79px;}.order-list .order li.ol-2{background-position:0 -103px;}.order-list .order li.ol-3{background-position:0 -127px;}.order-list .order li.ol-4{background-position:0 -151px;}.order-list .order li.ol-5{background-position:0 -175px;}.order-list .order li.ol-6{background-position:0 -199px;}.order-list .order li.ol-7{background-position:0 -223px;}.order-list .order li.ol-8{background-position:0 -247px;}.order-list .order li.ol-9{background-position:0 -271px;}.order-list .order li.ol-10{background-position:0 -295px;}
.order-1{border: 1px solid #FEBDD4;}.order-1 h3{background-color: #FEF1F5;border-bottom: 1px solid #FEBDD4;color: #F69;}
.order-2{border: 1px solid #A3DEFE;}.order-2 h3{background-color: #EDFAFF;border-bottom: 1px solid #A3DEFE;color: #31A8F5;}
.order-3{border: 1px solid #B6EC13;}.order-3 h3{background-color: #EEFDC5;border-bottom: 1px solid #B6EC13;color: #7AA200;}
.banner-1{clear: both;margin: 10px auto;width:950px;overflow: hidden;}.banner-1 ul{width: 960px;}.banner-1 li{float: left;margin: 0 10px 10px 0;width: 180px;height: 90px;border: 1px solid #ccc;}.banner-1 li img{width: 180px;height: 90px;}
</style>
<div class="custome-950-8" style="width:950px;">
<#assign spid=(pid?replace('mm_','')?replace('_0_0','')) count=0 h=0>
<div class="custome-box">
	<#if shops??&&shops?size!=0>
	<#assign size=(shops?size-1)>
	<#if (size>89)><#assign size=89></#if>
	<#list shops[0..size] as s>
	<#assign count=(count+1)>
	<#if s_index%30==0><ul class="order-list"><#assign h=(h+1)></#if>
		<#if s_index%10==0><li class="order order-${h}"><h3>淘宝店铺综合Top${s_index+1}-${(s_index+10)}</h3><ol></#if>
		<li class="ol-${count}"><a onClick="_gaq.push(['_trackEvent', 'xt-${pid}', 'shop-d-${s.sid}', '${s.title}']);" href="/tshop/${s.sid}.html"  target="_blank" title="${s.title}"><span class="title">${s.title}</span><span class="star_com"><#if s.sellerCredit??&&''!=s.sellerCredit><img src="http://static.xintaonet.com/assets/min/stylesheets/images/${s.sellerCredit}.gif" style="vertical-align: text-bottom;"/></#if></span></a></li>
		<#if s_index%10==9||!s_has_next></ol></li></#if>
	<#if s_index%30==29||!s_has_next></ul><div style="clear:both"></div></#if>
	<#if count==10><#assign count=0></#if>
	</#list>
	<#if (shops?size>90)>
	<div class="banner-1"><ul>
		<#list shops[90..(shops?size-1)] as s>
			<li><a onClick="_gaq.push(['_trackEvent', 'xt-${pid}', 'shop-d-${s.sid}', '${s.title}']);" href="/tshop/${s.sid}.html" target="_blank" title="${s.title}"><img src="<#if (s.picPath!="")>http://logo.taobao.com/shop-logo/${s.picPath}<#else>http://s.yijia.com/taobao/i/no_shop.gif</#if>" width="180" height="95" border="0" alt="${s.title}" title="${s.title}"></a></li>
		</#list></ul></div>
	</#if>
	</#if>
</div>
</div>
<#include "/site/template/haibaofooter.ftl">