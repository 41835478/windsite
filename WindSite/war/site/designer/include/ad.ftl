<#if 'adsense'==ad.adType>
<#if ad.adMeta??&&ad.adMeta.client??&&ad.adMeta.slot??&&ad.adMeta.width??&&ad.adMeta.height??>
<script type="text/javascript">
google_ad_client = "${ad.adMeta.client}";
google_ad_slot = "${ad.adMeta.slot}";
google_ad_width = ${ad.adMeta.width};
google_ad_height = ${ad.adMeta.height};
</script>
<script type="text/javascript" src="http://pagead2.googlesyndication.com/pagead/show_ads.js"></script>
</#if>
<#elseif 'alimama'==ad.adType>
<#if ad.adMeta??>
<script type="text/javascript">
alimama_pid="${ad.adMeta.ali_pid}";
alimama_titlecolor="${ad.adMeta.titlecolor!'0000FF'}"; 
alimama_descolor ="${ad.adMeta.descolor!'000000'}"; 
alimama_bgcolor="${ad.adMeta.bgcolor!'FFFFFF'}"; 
alimama_bordercolor="${ad.adMeta.bordercolor!'E6E6E6'}"; 
alimama_linkcolor="${ad.adMeta.linkcolor!'008000'}"; 
alimama_bottomcolor="${ad.adMeta.bottomcolor!'FFFFFF'}"; 
alimama_anglesize="${ad.adMeta.anglesize!'0'}"; 
alimama_bgpic="${ad.adMeta.bgpic!'0'}"; 
alimama_icon="${ad.adMeta.icon!'0'}"; 
alimama_sizecode="${ad.adMeta.sizecode!'14'}"; 
alimama_width=${ad.adMeta.width}; 
alimama_height=${ad.adMeta.height}; 
alimama_type=${ad.adMeta.type}; 
</script>
<script src="http://a.alimama.cn/inf.js" type="text/javascript"></script>
</#if>
<#elseif 'flash'==ad.adType>
<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" adcodebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,45,0"<#if ad.adMeta.width??> width="${ad.adMeta.width}"</#if><#if ad.adMeta.height??> height="${ad.adMeta.height}"</#if>>
<param name="movie" value="${ad.adMeta.url}" />
<param name="quality" value="high" />
<embed src="${ad.adMeta.url}" quality="high" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash"<#if ad.adMeta.width??> width="${ad.adMeta.width}"</#if><#if ad.adMeta.height??> height="${ad.adMeta.height}"</#if>></embed>
</object>
<#elseif 'image'==ad.adType>
<a href="${ad.adMeta.url}" target="_blank"><img src="${ad.adMeta.src}"<#if ad.adMeta.width??> width="${ad.adMeta.width}"</#if><#if ad.adMeta.height??> height="${ad.adMeta.height}"</#if> border="0"<#if ad.adMeta.alt??> alt="${ad.adMeta.alt}" title="${ad.adMeta.alt}"</#if>></a>
<#elseif 'text'==ad.adType>
<span style="padding:0.8em"><a href="${ad.adMeta.url}" target="_blank" style="font-size:<#if ad.adMeta.size??>${ad.adMeta.size}<#else>15</#if>px;">${ad.adMeta.content}</a></span>
</#if>