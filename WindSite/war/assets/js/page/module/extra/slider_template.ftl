<#setting url_escaping_charset='UTF-8'>
<#if pics??&&pics?size!=0>
<div class="slider-promo J_Slider J_TWidget" style="height:${height}px;">
	<ul class="lst-main ks-switchable-content">
		<#list pics as s><#assign url=s.href><#if isMall??&&isMall><#assign url=("http://s.click.taobao.com/t_9?p=${'$'+'{pid}'}&l="+url?url)></#if><li style="height:${height}px;"><a href="${url}" target="_blank"><img src="${s.pic}" alt="${s.title}" width="${width}px" height="${height}px"></a></li></#list>
	</ul>
	<ul class="lst-trigger"><#list pics as s><li class="<#if s_index==0>current</#if>">${s_index+1}</li></#list></ul>
</div>
</#if>