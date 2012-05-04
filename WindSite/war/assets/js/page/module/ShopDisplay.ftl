<#setting url_escaping_charset='utf8'>
<#assign imgAttr='original'><#if isDesigner><#assign imgAttr='src'></#if>
<div class="shop-display">
	<div class="hd" <#if 'false'==isHd>style="display:none;"</#if>><h3><span>${title}</span></h3></div>
	<div class="bd">
		<#assign pic_jpg='_160x160.jpg' isV=true>
		<div class="grid<#if picsize??&&'220x220'==picsize><#assign pic_jpg='_b.jpg'> big<#elseif '120x120'==picsize><#assign pic_jpg='_120x120.jpg'> small</#if>">
			<ul class="shop-list">
				<#if data??&&data?size!=0&&adType??&&''!=adType>
					<#switch adType>
						<#case 'item'>
							<#if isVolume??&&'false'==isVolume><#assign isV=false></#if>
							<#list data as d>
								<#assign dTitle=d.title?replace('<span class=H>','')?replace('</span>','')>
								<li>
									<div class="item" co='${d.commission}'>
										<div class="pic"><a target="_blank" href="/titem/${d.num_iid}.html" title="${dTitle}"><img ${imgAttr}="${d.pic_url?replace("bao/uploaded", "imgextra")+pic_jpg}" alt="${dTitle}"></a></div>
										<div class="desc"><a target="_blank" href="/titem/${d.num_iid}.html" class="permalink">${d.title}</a></div>
										<div class="price"><div class="now"><span>￥ </span><strong>${d.price}元</strong></div></div>
										<#if isV><div class="sales-amount">最近30天售出<em>${d.volume}</em>笔</div></#if>
									</div>
								</li>
							</#list>
							<#break>
						<#case 'shop'>
							<#assign w_h=" width=160px height=160px ">
							<#if pic_jpg=='_b.jpg'><#assign w_h=" width=220px height=220px "><#elseif pic_jpg=='_120x120.jpg'><#assign w_h=" width=120px height=120px "></#if>
							<#if 'search'==dataType><!--搜索结果-->
								<#list data as d>
								<#assign isExtra=false local={} shopClickUrl=d.clickUrl>
								<#if extra??&&extra[d.userId+'']??><#assign isExtra=true local=extra[d.userId+'']></#if>
								<#if isExtra>
									<#if ''!=local.sid><#assign shopClickUrl='/tshop/'+local.sid+'.html'></#if>
									<li>
										<div class="item" cr='${d.commissionRate}'>
											<div class="pic"><a target="_blank" href="${shopClickUrl}" title="${d.shopTitle}"><img ${imgAttr}="<#if ''!=local.picPath>http://logo.taobao.com/shop-logo${local.picPath}<#else><#if d.shopType=='C'>http://img02.taobaocdn.com/tps/i2/T1nB0EXnBwXXXXXXXX-80-80.png<#else>http://img03.taobaocdn.com/tps/i3/T1N.tyXcNpXXXXXXXX-70-70.png</#if></#if>" alt="${d.shopTitle}" onerror="javascript:this.src='http://img02.taobaocdn.com/tps/i2/T1nB0EXnBwXXXXXXXX-80-80.png'" ${w_h}></a></div>
											<div class="desc"><a target="_blank" href="${shopClickUrl}" class="permalink">${d.shopTitle}</a></div>
											<#if d.sellerCredit??&&''!=d.sellerCredit><div class="sales-amount"><img src="/assets/min/stylesheets/images/${d.sellerCredit}.gif" style="vertical-align: text-bottom;"/></div></#if>
										</div>
									</li>
								<#else>
									<li>
									<div class="item" cr='${d.commissionRate}'>
										<div class="pic"><a target="_blank" href="${shopClickUrl}" title="${d.shopTitle}"><img ${imgAttr}="<#if d.shopType=='C'>http://img02.taobaocdn.com/tps/i2/T1nB0EXnBwXXXXXXXX-80-80.png<#else>http://img03.taobaocdn.com/tps/i3/T1N.tyXcNpXXXXXXXX-70-70.png</#if>" alt="${d.shopTitle}" ${w_h}></a></div>
										<div class="desc"><a target="_blank" href="${shopClickUrl}" class="permalink">${d.shopTitle}</a></div>
										<#if d.sellerCredit??&&''!=d.sellerCredit><div class="sales-amount"><img src="/assets/min/stylesheets/images/${d.sellerCredit}.gif" style="vertical-align: text-bottom;"/></div></#if>
									</div>
									</li>	
								</#if>
								</#list>
							<#else><!--店铺分组-->
								<#list data as d>
								<li>
								<div class="item" cr='${d.commissionRate}'>
									<div class="pic"><a target="_blank" href="/tshop/${d.sid}.html" title="${d.title}"><img ${imgAttr}="<#if ''!=d.picPath>http://logo.taobao.com/shop-logo${d.picPath}<#else>http://img02.taobaocdn.com/tps/i2/T1nB0EXnBwXXXXXXXX-80-80.png</#if>" alt="${d.title}" ${w_h}></a></div>
									<div class="desc"><a target="_blank" href="/tshop/${d.sid}.html" class="permalink">${d.title}</a></div>
									<#if d.sellerCredit??&&''!=d.sellerCredit><div class="sales-amount"><img src="/assets/min/stylesheets/images/${d.sellerCredit}.gif" style="vertical-align: text-bottom;"/></div></#if>
								</div>
								</li>
								</#list>	
							</#if>
							<#break>
						<#case 'page'>
							<#if SITEIMPL.appType=='1'>
							<div>您当前使用的是新淘网淘宝客分成版，无法使用页面推广模块，请删除此模块，或者升级为淘客返利版（月租型）或卖家版</div>
							<#else>
							<#list data as d>
								<li>
									<div class="item">
										<div class="pic"><a target="_blank" href="/channel/${d.value}.html" title="${d.name}"><img ${imgAttr}="${d.bigPic}" alt="${d.name}"></a></div>
										<div class="desc"><a target="_blank" href="/channel/${d.value}.html" class="permalink">${d.name}</a></div>
									</div>
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
							<div class="item">
								<div class="pic"><a target="_blank" href="/huabao/${d.id}.html" title="${d.title}"><img ${imgAttr}="${pic}" alt="${d.title}"></a></div>
								<div class="desc"><a target="_blank" href="/huabao/${d.id}.html" class="permalink">${d.title}</a></div>
							</div>
							</li>
							</#list>
							</#if>
							<#break>			
					</#switch>
				</#if>
			</ul>
			<#if moreUrl??&&''!=moreUrl><p class="more-items"><a href="${moreUrl}" target="_blank" class="button">查看更多</a></p></#if>
		</div>
	</div>
</div>