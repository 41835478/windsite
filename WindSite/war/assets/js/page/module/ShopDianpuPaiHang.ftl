<div class="shop-dianpu-paihang">
<div class="hd" style="display:none;"><h3><span>${title}</span></h3></div>
<div class="bd" style="margin-bottom:5px;">
<#if (SITEIMPL.versionNo>=2)>
<#assign catArray=cats?split(',')>
<#if isDesigner>
<#assign objectConstructor = "freemarker.template.utility.ObjectConstructor"?new()>
<#list catArray as d>
<#assign file = objectConstructor("java.io.File", htmlPath+"/htdocs/zone/module/dianpuPaiHang_"+d+".html")> 
<#if file.exists()><#include  "//module/dianpuPaiHang_"+d+".html" parse=false encoding="utf8"><#else>当前模块内容为空，请稍候再试</#if>
</#list>
<#else>
<#list catArray as d><!--#include virtual="/zone/module/dianpuPaiHang_${d}.html"--></#list>
</#if>		
<#else>
<div>您当前使用的版本，无法使用店铺排行榜模块，请删除此模块，或者升级为淘客返利版（月租型）或卖家版</div>
</#if>
</div>
</div>