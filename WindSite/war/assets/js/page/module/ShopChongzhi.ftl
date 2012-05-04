<div class="shop-chongzhi">
	<div class="hd" <#if 'false'==isHd>style="display:none;"</#if>><h3><span>${title}</span></h3></div>
	<div class="bd">
		<#if SITEIMPL.appType=='1'>
		<div>您当前使用的是新淘网淘宝客分成版，无法使用虚拟充值推广模块，请删除此模块，或者升级为淘客返利版（月租型）或卖家版</div>
		<#else>
		<iframe id="J_ShopChongzhiIframe" name="alimamaifrm" frameborder="0" marginheight="0" marginwidth="0" border="0" scrolling="no"></iframe>
		</#if>
	</div>
</div>