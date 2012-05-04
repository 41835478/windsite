<div class="shop-itemlist <#if 'shop'==adType>shop-itemlist-shop</#if>">
	<div class="hd" <#if 'false'==isHd>style="display:none;"</#if>><h3><span>${title}</span></h3></div>
	<div class="bd">
		<ul class="goods">
			<div class="bt"><div class="lt">排名</div><div class="ct"><#if 'item'==adType>商品名称<#elseif 'poster'==adType>画报名称<#else>店铺名称</#if></div><div class="rt"><#if 'item'==adType>月销售<#elseif 'poster'>点击<#else>信用</#if></div></div>
			<#if data??&&data?size!=0&&adType??&&''!=adType>
			<#switch adType>
				<#case 'item'>
					<#list data as d><#assign dTitle=d.title?replace('<span class=H>','')?replace('</span>','')>
					<li><div class="mc"><b class="r${d_index+1}"></b><a href="/titem/${d.num_iid}.html" target="_blank" title="${dTitle}">${d.title}</a></div><div class="num">${d.volume}</div></li>
					</#list>
					<#break>
				<#case 'shop'>
					<#if 'search'==dataType><!--搜索结果-->
						<#list data as d>
						<#assign isExtra=false local={} shopClickUrl=d.clickUrl>
						<#if extra??&&extra[d.userId+'']??><#assign isExtra=true local=extra[d.userId+'']></#if>
						<#if isExtra>
							<#if ''!=local.sid><#assign shopClickUrl='/tshop/'+local.sid+'.html'></#if>
							<li><div class="mc"><b class="r${d_index+1}"></b><a href="${shopClickUrl}" target="_blank" title="${d.shopTitle}">${d.shopTitle}</a></div><div class="num"><#if d.sellerCredit??&&''!=d.sellerCredit><img src="/assets/min/stylesheets/images/${d.sellerCredit}.gif" style="vertical-align: text-bottom;"/></#if></div></li>
						<#else>
							<li><div class="mc"><b class="r${d_index+1}"></b><a href="${shopClickUrl}" target="_blank" title="${d.shopTitle}">${d.shopTitle}</a></div><div class="num"><#if d.sellerCredit??&&''!=d.sellerCredit><img src="/assets/min/stylesheets/images/${d.sellerCredit}.gif" style="vertical-align: text-bottom;"/></#if></div></li>
						</#if>
						</#list>
					<#else><!--店铺分组-->
						<#list data as d>
							<li><div class="mc"><b class="r${d_index+1}"></b><a href="/tshop/${d.sid}.html" target="_blank" title="${d.title}">${d.title}</a></div><div class="num"><#if d.sellerCredit??&&''!=d.sellerCredit><img src="/assets/min/stylesheets/images/${d.sellerCredit}.gif" style="vertical-align: text-bottom;"/></#if></div></li>
						</#list>
					</#if>
				<#break>
				<#case 'poster'>
					<#if SITEIMPL.versionNo==1>
						<div>您当前使用的是新淘网淘客普及版，无法使用画报类推广模块</div>
					<#else>
					<#list data as d>
					<li><div class="mc"><b class="r${d_index+1}"></b><a href="/huabao/${d.id}.html" target="_blank" title="${d.title}">${d.title}</a></div><div class="num">${d.hits}</div></li>
					</#list>
					</#if>
				<#break>
			</#switch>
			</#if>
		</ul>
	</div>
</div>