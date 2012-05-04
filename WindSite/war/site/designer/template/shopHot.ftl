<div class="grid">
	<ul class="shop-list">
		<#if data??&&data?size!=0>
			<#list data as d>
				<#assign dTitle=d.title?replace('<span class=H>','')?replace('</span>','')>
				<li>
					<div class="item" co='${d.commission}'>
						<div class="pic"><a target="_blank" href="/titem/${d.numIid}.html" title="${dTitle}"><img src="${d.picUrl?replace("bao/uploaded", "imgextra")}_160x160.jpg" alt="${dTitle}"></a></div>
						<div class="desc"><a target="_blank" href="/titem/${d.numIid}.html" class="permalink">${d.title}</a></div>
						<div class="price"><div class="now"><span>￥ </span><strong>${d.price}元</strong></div></div>
						<div class="sales-amount">最近30天售出<em>${d.volume}</em>笔</div>
					</div>
				</li>
			</#list>
		</#if>
	</ul>
	<#if moreUrl??&&''!=moreUrl><p class="more-items"><a href="${moreUrl}" target="_blank" class="button">查看更多</a></p></#if>
</div>