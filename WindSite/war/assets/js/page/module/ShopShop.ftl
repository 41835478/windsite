<div class="shop-shop cmsview-list-line no-border">
	<div class="hd" <#if 'false'==isHd>style="display:none;"</#if>><h3><span>${title}</span></h3></div>
	<div class="bd">
		<#if '0'!=showtype>
		<ul class="cvl-img">
		<#if data??&&data?size!=0>
		<#list data as d>
		<li <#if d_index%2==1>class="split"</#if>>
			<#if '2'==showtype&&d.pic??&&''!=d.pic><img src="${d.pic?replace('http://home.xintaonet.com/attachment/','attachment/')?replace('attachment/','http://home.xintaonet.com/attachment/')?replace('http://home.xintaonet.com/attachment/','attachment/')?replace('attachment/','http://home.xintaonet.com/attachment/')}"></#if>
			<h3><a href="/tblogs/${d.classid}/${d.blogid}.html" target="_blank">${d.subject}</a></h3>
			<p>${d.message}</p>
		</li>
		</#list>
		</#if>
		</ul>
		<#else>
		<ul class="cvl-line">
			<#if data??&&data?size!=0>
			<#list data as d><li <#if d_index%2==1>class="split"</#if>><h3><a href="/tblogs/${d.classid}/${d.blogid}.html" target="_blank">${d.subject}<#if 'true'==isdate>&nbsp;&nbsp;${d.dateline}</#if></a></h3><#if 'true'==isMsg><div class="desc">${d.message}</div></#if></li></#list>
			</#if>
		</ul>
		</#if>
		<#if cid??&&''!=cid><p class="more"><a href="/tblogs/${cid}.html" target="_blank">更多...</a></p></#if>
	</div>
</div>		