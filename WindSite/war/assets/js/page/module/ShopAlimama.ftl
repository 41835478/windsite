<div class="shop-alimama">
	<div class="hd" <#if 'false'==isHd>style="display:none;"</#if>><h3><span>${title}</span></h3></div>
	<div class="bd" <#if height??>style="height:${height}px;"</#if> align=center>
	<#if isDesigner??&&isDesigner>
	淘宝联盟广告位，正式发布后可查看最终效果
	<#else>
	<#if ali_pid??&&height??&&width??>
	<script type="text/javascript">alimama_pid="${ali_pid}";<#if type??&&type!=''>alimama_titlecolor="${titlecolor}";alimama_descolor ="${descolor}";alimama_bgcolor="${bgcolor}";alimama_bordercolor="${bordercolor}";alimama_linkcolor="${linkcolor}";alimama_bottomcolor="${bottomcolor}";alimama_anglesize="${anglesize}";alimama_bgpic="${bgpic}";alimama_icon="${icon}";alimama_sizecode="${sizecode}";alimama_type=${type};</#if>alimama_width=${width};alimama_height=${height};</script> 
	<script src="http://a.alimama.cn/inf.js" type="text/javascript"> </script>
	</#if>
	</#if>
	</div>
</div>