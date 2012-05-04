<div class="shop-b2c-mall">
	<div class="hd" <#if 'false'==isHd>style="display:none;"</#if>><h3><span>${title}</span></h3></div>
	<div class="bd">
		<#if data??&&data?size!=0>
		<ul>
		<#list data as m>
		<#assign title=m.title?replace('CPS|ROI|CPA|CPC','','ir')>
		<li><a href="/ymall-${m.b2cId}.html" target="_blank"><img src="${m.logo}" width="120px" height="60px" alt="${title}" title="${title}"/></a><span class="b2c-fl">最高返利：<strong>${m.topRate}</strong></span></li>
		</#list>
		</ul>
		</#if>
	</div>
</div>