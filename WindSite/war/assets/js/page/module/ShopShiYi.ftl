<div class="shop-shiyi">
	<div class="hd" <#if 'false'==isHd>style="display:none;"</#if>><h3><span>${title}</span></h3></div>
	<div class="bd" align=center>
		<#if !(SITEIMPL.versionNo>1.5)>
		<div>您当前使用的是新淘网淘宝客分成版，无法使用淘宝榜单推广模块，请删除此模块，或者升级为淘客返利版（月租型）或卖家版</div>
		<#else>
		<iframe frameborder="0" marginheight="0" marginwidth="0" border="0" id="alimamaifrm" name="alimamaifrm" scrolling="no" height="670" width="780" src="http://www.taobao.com/go/act/shiyi/alishiyi.php?t=tk&pid=${pid}" ></iframe>
		</#if>
	</div>
</div>