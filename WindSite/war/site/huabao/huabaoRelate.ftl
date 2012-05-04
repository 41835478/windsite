<ul class="poster-list-image clearfix">
<#if relateHbs??&&relateHbs?size!=0><#list relateHbs as h>
<li><div class="poster-pic-box thumb-wrap"><div class="wrap"><a href="/huabao/${h.id}.html"><img src="${h.cover}" alt="${h.name}"></a></div></div><span><a href="/huabao/${h.id}.html">${h.shortName}</a></span></li>
</#list><#else>未找到相关画报</#if>
</ul>