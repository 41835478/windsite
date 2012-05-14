<div style="padding: 1em;border: 1px solid #FF8E00;zoom: 1;">
<#if ad??>
<input type="hidden" id="ad-id" value="${ad.id}">
<table cellspacing="0" cellpadding="0" class="formtable">
<tbody><tr><th width="150px">广告标题</th><td><input id="ad-title" value="${ad.title}" class="t_input"></td></tr></tbody>
<tbody>
<tr><th width="150px">页面位置</th><td><select id="ad-pagetype"><option value="br"<#if 'br'==ad.pageType> selected</#if>>文章内容区域 (建议宽度<300px)</option><option value="ht"<#if 'ht'==ad.pageType> selected</#if>>画报主内容区域 (建议宽度<780px，高度<90px)</option></select></td></tr>
<tr><th width="150px">有效性</th><td><input type="checkbox" id="ad-isvalid" <#if ad.isValid>checked</#if>>是否有效</td></tr>
</tbody>
<tbody><tr><th width="150px">广告方式</th><td>
<select id="ad-type">
<option value="adsense" <#if 'adsense'==ad.adType>selected</#if>>Google Adsense</option>
<option value="alimama" <#if 'alimama'==ad.adType>selected</#if>>淘宝联盟(阿里妈妈)</option>
<option value="flash" <#if 'flash'==ad.adType>selected</#if>>flash广告牌</option>
<option value="image" <#if 'image'==ad.adType>selected</#if>>图片</option>
<option value="text" <#if 'text'==ad.adType>selected</#if>>文本</option>
</select>
</td></tr>
</tbody>
<tbody class="style-adtype adsense-adtype alimama-adtype"<#if 'adsense'!=ad.adType&&'alimama'!=ad.adType> style="display:none;"</#if>>
<tr><th width="150px">广告代码(必填)</th><td>
<textarea id="shop-union-textarea" style="width: 98%; height: 200px">
<#if 'adsense'==ad.adType>
<#if ad.code??&&ad.code.client??&&ad.code.slot??&&ad.code.width??&&ad.code.height??>
<script type="text/javascript">
google_ad_client = "${ad.code.client}";
google_ad_slot = "${ad.code.slot}";
google_ad_width = ${ad.code.width};
google_ad_height = ${ad.code.height};
</script>
<script type="text/javascript"
src="http://pagead2.googlesyndication.com/pagead/show_ads.js">
</script>
</#if>
<#elseif 'alimama'==ad.adType>
<#if ad.code??>
<script type="text/javascript">
alimama_pid="${ad.code.ali_pid}";
<#if ad.code.type??&&ad.code.type!=''>
alimama_titlecolor="${ad.code.titlecolor!'0000FF'}"; 
alimama_descolor ="${ad.code.descolor!'000000'}"; 
alimama_bgcolor="${ad.code.bgcolor!'FFFFFF'}"; 
alimama_bordercolor="${ad.code.bordercolor!'E6E6E6'}"; 
alimama_linkcolor="${ad.code.linkcolor!'008000'}"; 
alimama_bottomcolor="${ad.code.bottomcolor!'FFFFFF'}"; 
alimama_anglesize="${ad.code.anglesize!'0'}"; 
alimama_bgpic="${ad.code.bgpic!'0'}"; 
alimama_icon="${ad.code.icon!'0'}"; 
alimama_sizecode="${ad.code.sizecode!'14'}";
alimama_type=${ad.code.type}; 
</#if>
alimama_width=${ad.code.width}; 
alimama_height=${ad.code.height}; 
</script>
<script src="http://a.alimama.cn/inf.js" type="text/javascript"> 
</script>
</#if>
</#if>
</textarea></td></tr></tbody>
<tbody class="style-adtype flash-adtype"<#if 'flash'!=ad.adType> style="display: none; "</#if>>
<tr><th>Flash宽度(必填)</th><td><input id="flash-width" value="${ad.code.width}" size="5"></td></tr>
<tr><th>Flash高度(必填)</th><td><input id="flash-height" value="${ad.code.height}" size="5"></td></tr>
<tr><th>Flash URL(必填)</th><td><input id="flash-url" value="${ad.code.url}" size="50"></td></tr>
</tbody>
<tbody class="style-adtype image-adtype"<#if 'image'!=ad.adType> style="display: none; "</#if>>
<tr><th>图片地址(必填)</th><td><input id="image-src" value="${ad.code.src}" size="50"></td></tr>
<tr><th>图片链接(必填)</th><td><input id="image-url" value="${ad.code.url}" size="50"></td></tr>
<tr><th>图片宽度(选填)</th><td><input id="image-width" value="${ad.code.width}" size="5"></td></tr>
<tr><th>图片高度(选填)</th><td><input id="image-height" value="${ad.code.height}" size="5"></td></tr>
<tr><th>图片替换文字(选填)</th><td><input id="image-alt" value="${ad.code.alt}"></td></tr>
</tbody>
<tbody class="style-adtype text-adtype"<#if 'text'!=ad.adType> style="display: none; "</#if>>
<tr><th>文字内容(必填)</th><td><input id="text-content" value="${ad.code.content}" size="50"></td></tr>
<tr><th>文字链接(必填)</th><td><input id="text-url" value="${ad.code.url}" size="50"></td></tr>
<tr><th>文字大小(选填)</th><td><input id="text-size" value="${ad.code.size}" size="5"> px</td></tr>
</tbody>
</table>
<#else>
<table cellspacing="0" cellpadding="0" class="formtable">
<tbody><tr><th width="150px">广告标题</th><td><input id="ad-title" value="" class="t_input"></td></tr></tbody>
<tbody>
<tr><th width="150px">页面位置</th><td><select id="ad-pagetype"><option value="br">文章内容区域 (建议宽度<300px)</option><option value="ht">画报主内容区域 (建议宽度<780px，高度<90px)</option></select></td></tr>
<tr><th width="150px">有效性</th><td><input type="checkbox" id="ad-isvalid" checked>是否有效</td></tr>
</tbody>
<tbody><tr><th width="150px">广告方式</th><td>
<select id="ad-type"><option value="adsense" selected>Google Adsense</option><option value="alimama">淘宝联盟(阿里妈妈)</option><option value="flash">flash广告牌</option>
<option value="image">图片</option>
<option value="text">文本</option></select>
</td></tr>
</tbody>
<tbody class="style-adtype adsense-adtype alimama-adtype">
<tr><th width="150px">广告代码(必填)</th><td><textarea id="shop-union-textarea" style="width: 98%; height: 200px"></textarea></td></tr>
</tbody>
<tbody class="style-adtype flash-adtype" style="display: none; ">
<tr><th>Flash宽度(必填)</th><td><input id="flash-width" value="" size="5"></td></tr>
<tr><th>Flash高度(必填)</th><td><input id="flash-height" value="" size="5"></td></tr>
<tr><th>Flash URL(必填)</th><td><input id="flash-url" value="" size="50"></td></tr>
</tbody>
<tbody class="style-adtype image-adtype" style="display: none; ">
<tr><th>图片地址(必填)</th><td><input id="image-src" value="" size="50"></td></tr>
<tr><th>图片链接(必填)</th><td><input id="image-url" value="" size="50"></td></tr>
<tr><th>图片宽度(选填)</th><td><input id="image-width" value="" size="5"></td></tr>
<tr><th>图片高度(选填)</th><td><input id="image-height" value="" size="5"></td></tr>
<tr><th>图片替换文字(选填)</th><td><input id="image-alt" value=""></td></tr>
</tbody>
<tbody class="style-adtype text-adtype" style="display: none; ">
<tr><th>文字内容(必填)</th><td><input id="text-content" value="" size="50"></td></tr>
<tr><th>文字链接(必填)</th><td><input id="text-url" value="" size="50"></td></tr>
<tr><th>文字大小(选填)</th><td><input id="text-size" value="" size="5"> px</td></tr>
</tbody>
</table>
</#if>
</div>