<#assign imgAttr='original'><#if isDesigner><#assign imgAttr='src'></#if>
<div class="shop-brand">
<div class="hd" <#if 'false'==isHd>style="display:none;"</#if>><h3><span>${title}</span></h3></div>
<div class="bd">
<ul>
<#if data??&&data?size!=0><#list data as d><li><a href="/tshop/${d.sid}.html" target="_blank" title="${d.title}"><img ${imgAttr}="${d.picPath}" alt="${d.title}"></a><p class="title"><a href="/tshop/${d.sid}.html" target="_blank" title="${d.title}">${d.title}</a></p></li></#list></#if>
</ul>
<div class="ks-clear"></div>
<#if moreUrl??&&''!=moreUrl><p class="more-items"><a href="${moreUrl}" target="_blank" class="button">查看更多</a></p></#if>
</div>
</div>