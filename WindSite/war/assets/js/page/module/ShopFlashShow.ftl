<div class="shop-custom shop-flashshow no-border" flash="${flash}">
<div class="hd" <#if 'false'==isHd>style="display:none;"</#if>><h3><span>${title}</span></h3></div>
<div class="bd">
<div class="custom-area">
<#if flash??&&''!=flash>
	<#if !flash?contains('tbcdn')>
		<#assign splits = flash?split('.swf')[0]?split('_')><#assign wh = splits[splits?size - 1]?split('x')>
		<#assign width=wh[0]>
		<#assign height=wh[1]>
		<#else>
		<#assign width='100%'>
		<#assign height=0>
	</#if>
<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" <#if (height>0)>height="${height}""</#if>  width="${width}> 
<param name="movie" value="${flash}"> 
<param name="wmode" value="transparent"> 
<!--[if !IE]>--> 
<object type="application/x-shockwave-flash" data="${flash}" <#if (height>0)>height="${height}""</#if>  width="${width}> 
<param name="wmode" value="transparent"> 
</object> 
<!--<![endif]--> 
</object>
</#if>
</div>
</div>
</div>