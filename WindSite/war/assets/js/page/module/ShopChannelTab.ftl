<div class="shop-channeltab" channel="${channel}">
	<div class="hd" <#if 'false'==isHd>style="display:none;"</#if>><h3><span>${title}</span></h3></div>
	<div class="bd">
		<div class="shop-custom">
		<#if !(SITEIMPL.versionNo>1.5)>
		<div>您当前使用的是新淘网淘宝客分成版，无法使用淘宝内嵌推广模块，请删除此模块，或者升级为淘客返利版（月租型）或卖家版</div>
		<#else>
			<#if channel??&&'beauty'==channel>
			<#if layout=='1'>
			<iframe frameborder="0" marginheight="0" marginwidth="0" border="0" id="alimamaifrm" name="alimamaifrm" scrolling="no" height="600px" width="100%" src="http://www.taobao.com/go/app/taoke/beautifychannelver.php?pid=${pid}" ></iframe>
			<#else>
			<iframe frameborder="0" marginheight="0" marginwidth="0" border="0" id="alimamaifrm" name="alimamaifrm" scrolling="no" height="150px" width="100%" src="http://www.taobao.com/go/app/taoke/beautifychannelhor.php?pid=${pid}" ></iframe>
			</#if>
			<#else>
			<iframe frameborder="0" width="100%" height="252" scrolling="no" src="http://pindao.huoban.taobao.com/tms/channel/tab.htm?pid=${pid}"></iframe>
			</#if>
		</#if>	
		</div>
	</div>
</div>