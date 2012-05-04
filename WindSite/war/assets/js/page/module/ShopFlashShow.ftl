<div class="shop-custom shop-flashshow no-border" flash="${flash}">
<div class="hd" <#if 'false'==isHd>style="display:none;"</#if>><h3><span>${title}</span></h3></div>
<div class="bd">
<div class="custom-area">
<#if flash??&&''!=flash>
<#assign splits = flash?split('.swf')[0]?split('_')><#assign wh = splits[splits?size - 1]?split('x')>
<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" height="${wh[1]}" width="${wh[0]}"> 
<param name="movie" value="${flash}"> 
<param name="wmode" value="transparent"> 
<!--[if !IE]>--> 
<object type="application/x-shockwave-flash" data="${flash}" height="${wh[1]}" width="${wh[0]}"> 
<param name="wmode" value="transparent"> 
</object> 
<!--<![endif]--> 
</object>
</#if>
</div>
</div>
</div>