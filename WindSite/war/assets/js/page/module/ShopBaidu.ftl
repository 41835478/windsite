<div class="shop-baidu">
	<div class="hd" <#if 'false'==isHd>style="display:none;"</#if>><h3><span>${title}</span></h3></div>
	<div class="bd" align=center>
	<#if isDesigner??&&isDesigner>
	百度联盟广告位，正式发布后可查看最终效果
	<#else>
	<#if cpro_id??&&''!=cpro_id>
	<script type="text/javascript">var cpro_id = '${cpro_id}';</script><script src="http://cpro.baidu.com/cpro/ui/c.js" type="text/javascript"></script>
	</#if>
	</#if>
	</div>
</div>