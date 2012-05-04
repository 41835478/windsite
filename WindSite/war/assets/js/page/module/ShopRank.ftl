<#assign imgAttr='original'><#if isDesigner><#assign imgAttr='src'></#if>
<div class="shop-rank">
	<div class="hd" <#if 'false'==isHd>style="display:none;"</#if>><h3><span>${title}</span></h3></div>
	<div class="bd">
		<div class="rank-tab">
			<div class="rank-panels" style="border-top:0px;">
				<div class="rank-panel">
					<ul>
						<#if data??&&data?size!=0&&adType??&&''!=adType>
						<#switch adType>
							<#case 'item'>
							<#list data as d><#assign dTitle=d.title?replace('<span class=H>','')?replace('</span>','')>
							<li>
								<div class="pic" co='${d.commission}'><a href="/titem/${d.num_iid}.html" target="_blank" title="${dTitle}"><img ${imgAttr}="${d.pic_url?replace("bao/uploaded", "imgextra")}_40x40.jpg" alt="${dTitle}"></a></div>
								<div class="desc"><a href="/titem/${d.num_iid}.html" title="${dTitle}" target="_blank">${d.title}</a></div>
								<div class="price"><i></i>${d.price}元</div>
								<div class="sale"><i></i>已售出 <strong>${d.volume}</strong> 笔</div>
							</li>
							</#list>
							<#break>
							<#case 'shop'>
							<#if 'search'==dataType><!--搜索结果-->
								<#list data as d>
								<#assign isExtra=false local={} shopClickUrl=d.clickUrl>
								<#if extra??&&extra[d.userId+'']??><#assign isExtra=true local=extra[d.userId+'']></#if>
								<#if isExtra>
									<#if ''!=local.sid><#assign shopClickUrl='/tshop/'+local.sid+'.html'></#if>
									<li>
									<div class="pic" cr='${d.commissionRate}'><a href="${shopClickUrl}" target="_blank" title="${d.shopTitle}"><img ${imgAttr}="<#if ''!=local.picPath>http://logo.taobao.com/shop-logo${local.picPath}<#else><#if d.shopType=='C'>http://img02.taobaocdn.com/tps/i2/T1nB0EXnBwXXXXXXXX-80-80.png<#else>http://img03.taobaocdn.com/tps/i3/T1N.tyXcNpXXXXXXXX-70-70.png</#if></#if>" alt="${d.shopTitle}" onerror="javascript:this.src='http://img02.taobaocdn.com/tps/i2/T1nB0EXnBwXXXXXXXX-80-80.png'" width=40px height=40px></a></div>
									<div class="desc"><a href="${shopClickUrl}" title="${d.shopTitle}" target="_blank">${d.shopTitle}</a></div>
									<#if d.sellerCredit??&&''!=d.sellerCredit><div class="sales-amount"><img src="/assets/min/stylesheets/images/${d.sellerCredit}.gif" style="vertical-align: text-bottom;"/></div></#if>
									</li>
								<#else>
									<li>
									<div class="pic" cr='${d.commissionRate}'><a href="${shopClickUrl}" target="_blank" title="${d.shopTitle}"><img ${imgAttr}="<#if d.shopType=='C'>http://img02.taobaocdn.com/tps/i2/T1nB0EXnBwXXXXXXXX-80-80.png<#else>http://img03.taobaocdn.com/tps/i3/T1N.tyXcNpXXXXXXXX-70-70.png</#if>" alt="${d.shopTitle}" onerror="javascript:this.src='http://img02.taobaocdn.com/tps/i2/T1nB0EXnBwXXXXXXXX-80-80.png'" width=40px height=40px></a></div>
									<div class="desc"><a href="${shopClickUrl}" title="${d.shopTitle}" target="_blank">${d.shopTitle}</a></div>
									<#if d.sellerCredit??&&''!=d.sellerCredit><div class="sales-amount"><img src="/assets/min/stylesheets/images/${d.sellerCredit}.gif" style="vertical-align: text-bottom;"/></div></#if>
									</li>
								</#if>
								</#list>
							<#else><!--店铺分组-->
								<#list data as d>
									<li>
									<div class="pic" cr='${d.commissionRate}'><a href="/tshop/${d.sid}.html" target="_blank" title="${d.title}"><img ${imgAttr}="<#if ''!=d.picPath>http://logo.taobao.com/shop-logo${d.picPath}<#else>http://img02.taobaocdn.com/tps/i2/T1nB0EXnBwXXXXXXXX-80-80.png</#if>" alt="${d.title}" onerror="javascript:this.src='http://img02.taobaocdn.com/tps/i2/T1nB0EXnBwXXXXXXXX-80-80.png'" width=40px height=40px></a></div>
									<div class="desc"><a href="/tshop/${d.sid}.html" title="${d.title}" target="_blank">${d.title}</a></div>
									<#if d.sellerCredit??&&''!=d.sellerCredit><div class="sales-amount" style="text-align:left;"><img src="/assets/min/stylesheets/images/${d.sellerCredit}.gif" style="vertical-align: text-bottom;"/></div></#if>
									</li>
								</#list>	
							</#if>
							<#break>
							<#case 'poster'>
								<#if SITEIMPL.versionNo==1>
								<div>您当前使用的是新淘网淘客普及版，无法使用画报类推广模块</div>
								<#else>
								<#list data as d>
								<#assign pic=d.coverUrls>
								<#if d.coverUrls?contains(',')><#assign pic=d.coverUrls?split(',')[1]></#if>
								<li>
									<div class="pic"><a target="_blank" href="/huabao/${d.id}.html" title="${d.title}"><img ${imgAttr}="${pic}" alt="${d.title}" width=40px height=40px ></a></div>
									<div class="desc"><a target="_blank" href="/huabao/${d.id}.html" class="permalink">${d.shortTitle}</a></div>
									<div class="sale" style="text-align:left;">点击：<strong>${d.hits}</strong></div>
								</li>
								</#list>
								</#if>
							<#break>	
						</#switch>
						</#if>
					</ul>
					<#if moreUrl??&&''!=moreUrl><span class="no-traded"><a href="${moreUrl}">查看更多</a></span></#if>
				</div>
			</div>
		</div>
	</div>
</div>