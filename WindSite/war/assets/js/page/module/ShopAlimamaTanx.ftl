<div class="shop-alimama">
	<div class="hd" <#if 'false'==isHd>style="display:none;"</#if>><h3><span>${title}</span></h3></div>
	<div class="bd" <#if height??>style="height:${height}px;"</#if> align=center>
	<#if isDesigner??&&isDesigner>
	淘宝联盟广告位，正式发布后可查看最终效果
	<#else>
	<#if ali_pid??>
	<script type="text/javascript">
     document.write('<a style="display:none!important" id="tanx-a-${ali_pid}"></a>');
     tanx_s = document.createElement("script");
     tanx_s.type = "text/javascript";
     tanx_s.charset = "gbk";
     tanx_s.id = "tanx-s-${ali_pid}";
     tanx_s.async = true;
     tanx_s.src = "http://p.tanx.com/ex?i=${ali_pid}";
     tanx_h = document.getElementsByTagName("head")[0];
     if(tanx_h)tanx_h.insertBefore(tanx_s,tanx_h.firstChild);
	</script>
	</#if>
	</#if>
	</div>
</div>