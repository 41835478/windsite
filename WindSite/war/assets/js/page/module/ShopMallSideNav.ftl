<div class="shop-mall-category">
<div class="hd" <#if 'false'==isHd>style="display:none;"</#if>><h3><span>${title}</span></h3></div>
<div class="bd no-border">
<#if (SITEIMPL.versionNo>=2)>
<#if isDesigner>
<#assign objectConstructor = "freemarker.template.utility.ObjectConstructor"?new()>
<#assign file = objectConstructor("java.io.File", htmlPath+"/htdocs/zone/ymall/shopMallSideNav.html")> 
<#if file.exists()><#include  "//ymall/shopMallSideNav.html" parse=false encoding="utf8"><#else>当前模块内容为空，请稍候再试</#if>
<#else>
<!--#include virtual="/zone/ymall/shopMallSideNav.html"-->
</#if>		
<#else>
<div>您当前使用的版本，无法使用返利商城模块，请删除此模块，或者升级为淘客返利版（月租型）或卖家版</div>
</#if>
</div>
</div>