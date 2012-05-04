<div align=center style="width:140px;"><h2 class="recommend-h2" style="width:140px;">推荐画报</h2></div>
<ul id="poster-recommended">
<#if posters??&&posters?size!=0>
<#list posters as p>
<#assign pic=p.coverUrls>
<#if p.coverUrls?contains(',')><#assign pic=p.coverUrls?split(',')[0]></#if>
<li><div class="poster-pic-box thumb-wrap"><a href="/huabao/${p.id}.html"><img alt="${p.title}" src="${pic}_120x120.jpg"></a></div><span><a href="/huabao/${p.id}.html">${p.shortTitle}</a></span></li>
<#if (p_index==4)><#break></#if>
</#list></#if>
</ul>