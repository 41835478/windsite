<#if relates??&&relates?size!=0>
<#list relates as d>
<#assign pic=d.cover_urls>
<#if d.cover_urls?contains(',')><#assign pic=d.cover_urls?split(',')[1]></#if>
<li><div class="item"><div class="pic"><a target="_blank" href="/huabao/${d.id}.html" title="${d.title}"><img src="${pic}_250x250.jpg" alt="${d.title}"></a></div><div class="desc"><a target="_blank" href="/huabao/${d.id}.html" class="permalink">${d.title}</a></div></div></li>
</#list>
</#if>	