<div class="shop-chongzhi">
	<div class="hd" <#if 'false'==isHd>style="display:none;"</#if>><h3><span>${title}</span></h3></div>
	<div class="bd">
		<#if !(SITEIMPL.versionNo>1.5)>
		<div>您当前使用的是新淘网淘宝客分成版，无法使用虚拟充值推广模块，请删除此模块，或者升级为淘客返利版（月租型）或卖家版</div>
		<#else>
		<#if isDesigner>
			<h2 style="color:red;margin-top:50px;height:200px;">因联盟规则调整(<a href="http://club.alimama.com/read-htm-tid-3133847.html" target="_blank">http://club.alimama.com/read-htm-tid-3133847.html</a>),不再提供此类模块,请自行获取iframe代码,使用自定义模块--源码模式添加</h2>
		<#else>
			<iframe id="J_ShopChongzhiIframe" name="alimamaifrm" frameborder="0" marginheight="0" marginwidth="0" border="0" scrolling="no"></iframe>
		</#if>
		</#if>
	</div>
</div>