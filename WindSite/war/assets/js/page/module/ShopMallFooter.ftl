<div class="shop-mall-footer">
	<div class="hd" <#if 'false'==isHd>style="display:none;"</#if>><h3><span>${title}</span></h3></div>
	<div class="bd">
	<#if isDesigner>
	<#assign objectConstructor = "freemarker.template.utility.ObjectConstructor"?new()  file = objectConstructor("java.io.File", htmlPath+"/htdocs/zone/module/shopMallFooter.html")>
	<#if file.exists()><#include  "//module/shopMallFooter.html" parse=false encoding="utf8"><#else>当前模块内容为空，请稍候再试</#if>
	<#else><!--#include virtual="/zone/module/shopMallFooter.html"--></#if>
	</div>
</div>