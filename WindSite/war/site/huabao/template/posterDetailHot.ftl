<div class="box J_TBox ks-clear">
<div class="shop-display">
	<div class="hd"><h3><span>${channel.cn_name}画报</span></h3></div>
	<div class="bd">
		<div class="grid big">
			<ul class="shop-list">
			<#if lasts??&&lasts?size!=0>
			<#list lasts as d>
			<#assign pic=d.cover_urls>
			<#if d.cover_urls?contains(',')><#assign pic=d.cover_urls?split(',')[1]></#if>
			<li>
			<div class="item">
				<div class="pic"><a target="_blank" href="/huabao/${d.id}.html" title="${d.title}"><img src="${pic}_250x250.jpg" alt="${d.title}"></a></div>
				<div class="desc"><a target="_blank" href="/huabao/${d.id}.html" class="permalink">${d.title}</a></div>
			</div>
			</li>
			</#list>
			</#if>	
			</ul>
			<p class="more-items"><a href="/router/huabao/search?channel=${channel.id}" target="_blank" class="button">查看更多</a></p>
		</div>
	</div>
</div>
</div>