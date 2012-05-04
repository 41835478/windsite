<div class="shop-dianpu-cat">
<div class="hd" <#if 'false'==isHd>style="display:none;"</#if>><h3><span>${title}</span></h3></div>
<div class="bd">
<#if SITEIMPL.versionNo==1>
<div>您当前使用的是新淘网普及版(免费)，无法使用淘店铺分类模块，请删除此模块，或者升级为淘客返利版（月租型）或卖家版</div>
<#else>
<#if data??&&data?size!=0>
<ul>
<#list data as d>
<#assign root=d.root cats=d.cats>
<li class="dianpu-${root.name}"><h3><a href="/dianpu/${root.name}.html" target="_blank" title="${root.title}">${root.title}</a></h3><div><#if cats??&&cats?size!=0><#list cats as c><a href="/dianpu/${root.name}/${c.name}.html" target="_blank" title="${c.title}">${c.title}</a></#list></#if></div></li>
</#list>
</ul>
</#if>
</#if>
</div>
</div>