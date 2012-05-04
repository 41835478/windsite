<#assign wwwDomain="">
<#if www??&&''!=www><#assign wwwDomain='http://'+www></#if>
<li class="cat expand" style="padding:0px;">
	<ul class="cat-bd" style="margin:0px;">
		<#if classes??&&classes?size!=0>
		<#list classes as c><li><a href="${wwwDomain}/tblogs/${c.blogClass}.html">${c.title}</a></li></#list>
		</#if>
	</ul>
</li>