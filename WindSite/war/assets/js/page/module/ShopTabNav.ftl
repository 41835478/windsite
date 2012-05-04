<div class="shop-tab-nav">
<div class="hd" style="display:none;"><h3><span>${title}</span></h3></div>
<div class="bd no-border" style="margin-bottom:5px;">
<div class="tab-nav-${color}">
<#if cats??&&''!=cats>
<div class="tab-nav">
<ul class="nav">
	<li class="J_TabNav item" cat="index"><a class="dib" href="http://<#if SITEIMPL.www??>${SITEIMPL.www}<#else>${SITEIMPL.domainName}.xintaonet.com</#if>" target="_blank">首页</a></li>
	<#if cats?contains('shuma')><li class="J_TabNav item" cat="shuma"><b class="dib"></b><a class="dib">数码</a></li></#if>
	<#if cats?contains('jiadian')><li class="J_TabNav item" cat="jiadian"><b class="dib"></b><a class="dib">家电</a></li></#if>
	<#if cats?contains('nvzhuang')><li class="J_TabNav item" cat="nvzhuang"><b class="dib"></b><a class="dib">女装</a></li></#if>
	<#if cats?contains('nanzhuang')><li class="J_TabNav item" cat="nanzhuang"><b class="dib"></b><a class="dib">男装</a></li></#if>
	<#if cats?contains('nvxie')><li class="J_TabNav item" cat="nvxie"><b class="dib"></b><a class="dib">女鞋</a></li></#if>
	<#if cats?contains('nanxie')><li class="J_TabNav item" cat="nanxie"><b class="dib"></b><a class="dib">男鞋</a></li></#if>
	<#if cats?contains('yundongxiefu')><li class="J_TabNav item" cat="yundongxiefu"><b class="dib"></b><a class="dib">运动鞋服</a></li></#if>
	<#if cats?contains('yundonghuwai')><li class="J_TabNav item" cat="yundonghuwai"><b class="dib"></b><a class="dib">运动户外</a></li></#if>
	<#if cats?contains('meirong')><li class="J_TabNav item" cat="meirong"><b class="dib"></b><a class="dib">美容</a></li></#if>
	<#if cats?contains('neiyi')><li class="J_TabNav item" cat="neiyi"><b class="dib"></b><a class="dib">内衣</a></li></#if>
	<#if cats?contains('xiangbao')><li class="J_TabNav item" cat="xiangbao"><b class="dib"></b><a class="dib">箱包</a></li></#if>
	<#if cats?contains('fushipeijian')><li class="J_TabNav item" cat="fushipeijian"><b class="dib"></b><a class="dib">服饰配件</a></li></#if>
	<#if cats?contains('shipin')><li class="J_TabNav item" cat="shipin"><b class="dib"></b><a class="dib">饰品</a></li></#if>
	<#if cats?contains('zhubao')><li class="J_TabNav item" cat="zhubao"><b class="dib"></b><a class="dib">珠宝</a></li></#if>
	<#if cats?contains('shoubiao')><li class="J_TabNav item" cat="shoubiao"><b class="dib"></b><a class="dib">手表</a></li></#if>
	<#if cats?contains('muying')><li class="J_TabNav item" cat="muying"><b class="dib"></b><a class="dib">母婴</a></li></#if>
	<#if cats?contains('jiaju')><li class="J_TabNav item" cat="jiaju"><b class="dib"></b><a class="dib">家居</a></li></#if>
	<#if cats?contains('riyong')><li class="J_TabNav item" cat="riyong"><b class="dib"></b><a class="dib">日用</a></li></#if>
	<#if cats?contains('food')><li class="J_TabNav item" cat="food"><b class="dib"></b><a class="dib">食品</a></li></#if>
	<#if cats?contains('jiankang')><li class="J_TabNav item" cat="jiankang"><b class="dib"></b><a class="dib">健康</a></li></#if>
	<#if cats?contains('qiche')><li class="J_TabNav item" cat="qiche"><b class="dib"></b><a class="dib">汽车</a></li></#if>
	<#if cats?contains('wanju')><li class="J_TabNav item" cat="wanju"><b class="dib"></b><a class="dib">玩具</a></li></#if>
</ul>
<ul class="cross-chl">
	<#if (SITEIMPL.versionNo>=2)>
	<li><a href="/dianpu.html" target="_blank">淘店铺</a></li>
	<li><a href="/ymall.html" target="_blank">返利商城</a></li>
	<li><a href="/huabao/index.html" target="_blank">导购画报</a></li>
	<#else>
	<li><a href="/dianpu.html" target="_blank">精选淘店铺</a></li>
	<li><a href="/huabao/index.html" target="_blank">情景导购画报</a></li>
	</#if>
</ul>
</div>
<#if data??&&data?size!=0>
<div id="J_SubMenuPopup_index" class="J_MenuSub sub-menu-popup sub-menu-popup-${color}">
	<div class="s-l" style="width:900px">
	<#list data as d><#if d_index%6==0><dl style="width:146px;"></#if><dd style="width:145px;"><a href="${d.url}" target="_blank">${d.title}</a></dd><#if d_index%6==5||!d_has_next></dl></#if></#list>
	</div>
</div>
</#if>
<#assign catArray=cats?split(',')>
<#list catArray as d>
<div id="J_SubMenuPopup_${d}" class="J_MenuSub sub-menu-popup sub-menu-popup-${color}">
<#include  "//module/nav_${d}.html" parse=false encoding="utf8">	
</div>
</#list>
</#if>
</div>
</div>
</div>