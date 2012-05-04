<#setting url_escaping_charset='utf8'> 
<div class="shop-keyword" flash="${flash}">
<div class="hd" <#if 'false'==isHd>style="display:none;"</#if>><h3><span>${title}</span></h3></div>
<div class="bd">
<#if data??>
<#list data?keys as k>
	<#assign value=data[k]>
	<div class="link-panel"><h3>${k}</h3>
	 <ul>
	<#if value??&&value?size!=0>
	<#list value as v><li class="desc"><b class="r${v_index+1}"></b><a href="/search?q=${v.objectName?url}" title="${v.objectName}" target="_blank">${v.objectName}</a></li></#list>
	</#if>
	</ul>
	</div>
</#list>
</#if>
</div>
</div>