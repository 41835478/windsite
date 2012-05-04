<div class="shop-category">
	<div class="hd" <#if 'false'==isHd>style="display:none;"</#if>><h3><span>${title}</span></h3></div>
	<div class="bd">
		<ul id="J_Cats" class="cats J_TWidget">
			<#if data??&&data?size!=0>
			<#list data as d>
			<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=${d.cid}" target="_blank">${d.cname}</a></li></ul></li>
			</#list>
			</#if>
		</ul>
	</div>
</div>