<div class="shop-tab-nav">
<div class="hd" style="display:none;"><h3><span>${title}</span></h3></div>
<div class="bd no-border" style="margin-bottom:5px;">
<div class="tab-nav-${color}">
<#if data??&&data?size!=0>
<div class="tab-nav">
<ul class="nav">
	<#list data as c><li class="J_TabNav item" cat="${c.id}"><#if c_index!=0><b class="dib"></b></#if><a class="dib">${c.title}</a></li></#list>
</ul>
<ul class="cross-chl">
	<li><a href="/dianpu.html" target="_blank">淘店铺</a></li>
	<li><a href="/ymall.html" target="_blank">返利商城</a></li>
	<li><a href="/huabao/index.html" target="_blank">导购画报</a></li>
</ul>
</div>
<#assign catArray=cats?split(',')>
<#assign objectConstructor = "freemarker.template.utility.ObjectConstructor"?new()>
<#list catArray as d>
<div id="J_MallSubMenuPopup_${d}" class="J_MallSub sub-menu-popup sub-menu-popup-${color}">
<#include  "//ymall/cats/tabnav_${d}.html" parse=false encoding="utf8">
</div>
</#list>
</#if>
</div>
</div>
</div>