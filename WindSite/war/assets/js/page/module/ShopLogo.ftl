<div class="shop-logo no-border">
<div class="hd" style="display:none;"><h3><span>${title}</span></h3></div>
<div class="bd" style="padding-top:8px;padding-top:8px!important;background-color:transparent;">
	<div class="logo" style="float:left;width:250px;height:70px;text-align:center;">
		<#if logo??&&''!=logo><a href="/" title="网上购物，从这里开始" style="display: table-cell;width: 250px;height: 70px;vertical-align: middle; *display: block; *font: 61px/ 1 Arial;"><img src="${logo}" style="border:0px;vertical-align:bottom;" <#if ''!=SITEIMPL.www>alt="http://${SITEIMPL.www}"<#else>alt="http://${SITEIMPL.domainName}.xintaonet.com"</#if>/></a></#if>
	</div>
	<div class="item-search-form" style="float:right;margin-right:50px;" align="center">
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
				<input name="q" class="search-input" autocomplete="off">
				<input type="button" id="search-button"/>
			</div>
		</fieldset>
		<input name="is_mall" type="hidden" value="">
		</form>
	</div>
</div>
</div>