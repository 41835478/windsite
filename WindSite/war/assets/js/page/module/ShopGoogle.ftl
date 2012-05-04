<div class="shop-google">
	<div class="hd" <#if 'false'==isHd>style="display:none;"</#if>><h3><span>${title}</span></h3></div>
	<div class="bd" <#if height??>style="height:${height}px;"</#if> align=center>
	<#if isDesigner??&&isDesigner>
	Google广告位，正式发布后可查看最终效果
	<#else>
	<#if client??&&slot??&&width??&&height??>
	<script type="text/javascript">google_ad_client = "${client}";google_ad_slot = "${slot}";google_ad_width = ${width};google_ad_height = ${height};</script>
	<script type="text/javascript" src="http://pagead2.googlesyndication.com/pagead/show_ads.js"></script>
	</#if>
	</#if>
	</div>
</div>