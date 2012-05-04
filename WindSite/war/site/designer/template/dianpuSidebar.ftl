<#if dianpuCats??&&dianpuCats?size!=0>
<#list dianpuCats as d>
<#assign root=d.root cats=d.cats>
<li class="dianpu-${root.name}"><h3><a href="/dianpu/${root.name}.html" title="${root.title}">${root.title}</a></h3><div><#if cats??&&cats?size!=0><#list cats as c><a href="/dianpu/${root.name}/${c.name}.html" title="${c.title}">${c.title}</a></#list></#if></div></li>
</#list>
</#if>