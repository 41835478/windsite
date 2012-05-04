<#setting url_escaping_charset='UTF-8'>
<#if floor??>
<#assign left=floor.floorLeft>
<#if left??&&left.style??&&left.logos??&&left.logos?size==16>
<ul class="logo-list ks-clear" style="${left.style}">
<#list left.logos as m>
<li><a href="/search?q=${m?url}" title="${m}" target="_blank"></a></li>
</#list>
</ul>
</#if>
</#if>