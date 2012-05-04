<#setting url_escaping_charset='utf8'>
<div class="layout grid-m0s5 ks-clear">
	<div class="col-main">
		<div class="main-wrap J_TRegion">
			<#if recommands??&&recommands?size!=0>
			<div name="shopScrollable" class="box J_TBox ks-clear">
				<div class="shop-display shop-scrollable shop-scrollable-h">
					<div class="hd"><h3><span>${channel.cn_name}推荐</span></h3></div>
					<div class="bd" style="height:200px;" data-lazy="false">
						<div class="grid shop-scrollable-items">
							<#list recommands as d>
							<#if d_index%4==0><div class="items"><ul class="shop-list"></#if>
							<#assign pic=d.coverUrls>
							<#if d.coverUrls?contains(',')><#assign pic=d.coverUrls?split(',')[1]></#if>
							<li>
							<div class="item">
								<div class="pic"><a target="_blank" href="/huabao/${d.id}.html" title="${d.title}"><img src="${pic}" alt="${d.title}"></a></div>
								<div class="desc"><a target="_blank" href="/huabao/${d.id}.html" class="permalink">${d.shortTitle}</a></div>
							</div>
							</li>
							<#if d_index%4==3||!d_has_next></ul></div>
							</#if>
							</#list>
						</div>
					</div>
				</div>
			</div>
			</#if>
			<div class="box J_TBox ks-clear">
				<div class="shop-display">
					<div class="hd"><h3><span>最新${channel.cn_name}画报</span></h3></div>
					<div class="bd">
						<div class="grid big">
							<ul class="shop-list">
							<#if lasts??&&lasts?size!=0>
							<#list lasts as d>
							<#assign pic=d.cover_urls>
							<#if d.cover_urls?contains(',')><#assign pic=d.cover_urls?split(',')[1]></#if>
							<li>
							<div class="item">
								<div class="pic"><a target="_blank" href="/huabao/${d.id}.html" title="${d.title}"><img src="${pic}" alt="${d.title}"></a></div>
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
		</div>
	</div>
	<div class="col-sub J_TRegion">
		<div class="box J_TBox ks-clear">
			<div class="shop-categoryvancl">
				<div class="hd"><h3><span>热门标签</span></h3></div>
				<div class="bd">
					<div class="kind-area ks-clear">
				        <div class="moreKind">
				          <ul><#if hotTags??&&hotTags?size!=0><#list hotTags as t><li><a href="/router/huabao/search?tag=${t.title?url}" title="${t.title}"  target="_blank">${t.title}</a></li></#list></#if></ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div name="shopRank" class="box J_TBox ks-clear">
		<div class="shop-rank">
			<div class="hd"><h3><span>${channel.cn_name}画报TOP30</span></h3></div>
			<div class="bd">
				<div class="rank-tab">
					<div class="rank-panels" style="border-top:0px;">
						<div class="rank-panel">
							<ul>
							<#if hots??&&hots?size!=0>
							<#list hots as d>
							<#assign pic=d.cover_urls>
							<#if d.cover_urls?contains(',')><#assign pic=d.cover_urls?split(',')[0]></#if>
							<li>
								<div class="pic"><a href="/huabao/${d.id}.html" target="_blank" title="${d.title}"><img src="${pic}" width=40px height=40px alt="${d.title}"></a></div>
								<div class="desc"><a href="/huabao/${d.id}.html" title="${d.title}" target="_blank">${d.short_title}</a></div>
								<div class="sale" style="text-align:left;">点击：<strong>${d.hits}</strong></div>
							</li>
							</#list>
							</#if>
							</ul>
							<p class="more-items"><a href="/router/huabao/search?channel=${channel.id}" target="_blank" class="button">查看更多</a></p>
						</div>
					</div>
				</div>
			</div>
		</div>
		</div>
	</div>
</div>