<div class="shop-mall-newfloor no-border">
<div class="hd" <#if 'false'==isHd>style="display:none;"</#if>><h3><span>${title}</span></h3></div>
<div class="bd" data-lazy="false">
<#if !(SITEIMPL.versionNo>1.5)>
<div>您当前使用的是新淘网淘宝客分成版，无法使用商城推广模块，请删除此模块，或者升级为淘客返利版（月租型）或卖家版</div>
<#else>
<#if SITEIMPL.versionNo==1>
<div>您当前使用的是新淘网淘宝客普及版(免费)，无法使用商城推广模块，请删除此模块，或者升级为淘客返利版（月租型）或卖家版</div>
<#else>
<#if bd??&&''!=bd>${bd}<#else>该分类模块内容为空</#if>
</#if>
</#if>
</div>
</div>