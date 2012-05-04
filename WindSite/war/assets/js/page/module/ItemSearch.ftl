<div class="item-search" line="${line}" cat="${cat}">
<div class="hd" <#if 'false'==isHd>style="display:none;"</#if>><h3><span>${title}</span></h3></div>
<div class="bd">
<div class="shop-custom item-search-form">
<form method="get" action="/search" target="_blank">
	<fieldset><legend>搜索</legend>
	<ul class="search-tab">
		<li class="selected" rel="item"><a href="javascript:;" target="_self" class="self">宝贝</a></li>
		<li rel="mall"><a href="javascript:;" target="_self">商城</a></li>
		<li rel="shop"><a href="javascript:;" target="_self">店铺</a></li>
		<#if SITEIMPL??&&(SITEIMPL.versionNo>1.5)><li rel="poster"><a href="javascript:;" target="_self" class="self">画报</a></li>
		<#elseif SITEIMPL??&&(SITEIMPL.versionNo==1.5)&&''!=SITEIMPL.www><li rel="poster"><a href="javascript:;" target="_self" class="self">画报</a></li></#if>
	</ul>
	<div class="search-auto" style="margin-top:-3px;">
		<input name="is_mall" type="hidden" value="">
		<input name="q" class="search-input" autocomplete="off">
		<input type="button" id="search-button"/>
	</div>
</fieldset>
</form>
</div>
</div>
</div>