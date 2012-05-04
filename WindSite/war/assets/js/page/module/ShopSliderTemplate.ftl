<div class="shop-slider">
	<div class="hd" <#if 'false'==isHd>style="display:none;"</#if>><h3><span>${title}</span></h3></div>
	<div class="bd" data-lazy="false">
	<#if bd??&&''!=bd>${bd}<#else>该模块内容为空</#if>
	</div>
</div>