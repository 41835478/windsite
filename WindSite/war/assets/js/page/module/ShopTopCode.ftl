<#setting url_escaping_charset='utf8'> 
<div class="shop-topcode">
	<div class="hd" <#if 'false'==isHd>style="display:none;"</#if>><h3><span>${title}</span></h3></div>
	<div class="bd">
		<#if SITEIMPL.appType=='1'>
		<div>您当前使用的是新淘网淘宝客分成版，无法使用淘宝榜单推广模块，请删除此模块，或者升级为淘客返利版（月租型）或卖家版</div>
		<#else>
		<iframe style="width:190px;height:${sh}px" frameborder="0"  id="previewiframe"  scrolling="no"  src="http://top.taobao.com/interface_v2.php?name=${name?url}&st=2&sw=190&sh=${sh}&sn=${sn}&tn=${tn}&bgc=${bgc}&bc=${bc}&fc=${fc}&tc=${tc}&trtp=${trtp}&up=${up}&cat_ids=${cat_ids}&f=html&ie=utf8&from=taoke&pid=${pid}" ></iframe>
		</#if>
	</div>
</div>