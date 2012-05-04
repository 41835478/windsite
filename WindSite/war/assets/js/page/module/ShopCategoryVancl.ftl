<div class="shop-categoryvancl">
<div class="hd" <#if 'false'==isHd>style="display:none;"</#if>><h3><span>${title}</span></h3></div>
<div class="bd">
<#if data??&&data?size!=0&&adType??&&''!=adType>
<#switch adType>
<#case 'cat'>
	<#if '1'==layout>
	<!--新分类-->
	<#list data?keys as k><#assign value=data[k]>
	<dl class="lv-cat">
        <dt cid="${k?split('#')[0]}"><a href="/search?cid=${k?split('#')[0]}" target="_blank" title="${k?split('#')[1]}">${k?split('#')[1]}</a><b></b></dt>
        <dd class=""><#if value??&&value?size!=0><#list value as v><a href="/search?cid=${v.cid}" title="${v.name}"  target="_blank">${v.name}</a></#list></#if></dd>
    </dl>
    </#list>
	<#else>
	<!--旧分类-->
	<#list data?keys as k>
		<#assign value=data[k]>
		<div class="kind-area ks-clear">
			<div class="kind ks-ellipsis" cid="${k?split('#')[0]}"><a href="javascript:;" title="${k?split('#')[1]}">${k?split('#')[1]}</a></div>
	        <div class="moreKind">
	          <ul><#if value??&&value?size!=0><#list value as v><li><a href="/search?cid=${v.cid}" title="${v.name}"  target="_blank">${v.name}</a></li></#list></#if></ul>
			</div>
		</div>
	</#list>
	</#if>
	<#break>
<#case 'keyword'>
	<!--关键词-->
	<#list data?keys as k>
		<#assign value=data[k]>
		<div class="kind-area ks-clear">
			<div class="kind"><a href="javascript:;" title="${k}">${k}</a></div>
	        <div class="moreKind desc">
	          <ul><#if value??&&value?size!=0><#list value as v><li><a href="/search?q=${v.objectName?url}" title="${v.objectName}" target="_blank">${v.objectName}</a></li></#list></#if></ul>
			</div>
		</div>
	</#list>
	<#break>	
</#switch>
</#if>
</div>
</div>