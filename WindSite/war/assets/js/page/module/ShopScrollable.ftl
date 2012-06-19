<#assign imgAttr='original'><#if isDesigner><#assign imgAttr='src'></#if>
<div class="shop-display shop-scrollable shop-scrollable-h">
	<div class="hd" <#if 'false'==isHd>style="display:none;"</#if>><h3><span>${title}</span></h3></div>
	<div class="bd" data-lazy="false">
		<div class="grid shop-scrollable-items">
			<#if data??&&data?size!=0&&adType??&&''!=adType>
			<#switch adType>
			<#case 'item'><!--商品滚动-->
				<#list data as d>
				<div class="items">
				<ul class="shop-list" style="margin-top:1px;margin-bottom:1px;">
					<#list items as i>
					<li>
						<div class="item" co="${i.commission_rate}">
							<div class="pic"><a target="_blank" href="/titem/${i.num_iid}.html" title="${i.title}"><img ${imgAttr}="${i.pic_url}_80x80.jpg" alt="${i.title}"></a></div>
							<div class="desc"><a target="_blank" href="/titem/${i.num_iid}.html" class="permalink">${i.title}</a></div>
							<div class="price"><div class="now"><strong>${i.price}元</strong></div></div>
						</div>
					</li>
					</#list>
				</ul>
				</div>
				</#list>
				<#break>
			<#case 'shop'>
				<#list data as d>
				<div class="items">
				<ul class="shop-list" style="margin-top:1px;margin-bottom:1px;">
					<#list data as d>
					<#assign isExtra=false local={} shopClickUrl=d.clickUrl>
					<#if extra??&&extra[d.userId+'']??><#assign isExtra=true local=extra[d.userId+'']></#if>
					<#if isExtra>
						<#if ''!=local.sid><#assign shopClickUrl='/tshop/'+local.sid+'.html'></#if>
						<li>
							<div class="item" cr='${d.commissionRate}'>
								<div class="pic"><a target="_blank" href="${shopClickUrl}" title="${d.shopTitle}"><img ${imgAttr}="<#if ''!=local.picPath>http://logo.taobao.com/shop-logo${local.picPath}<#else><#if d.shopType=='C'>http://img02.taobaocdn.com/tps/i2/T1nB0EXnBwXXXXXXXX-80-80.png<#else>http://img03.taobaocdn.com/tps/i3/T1N.tyXcNpXXXXXXXX-70-70.png</#if></#if>" alt="${d.shopTitle}" onerror="javascript:this.src='http://img02.taobaocdn.com/tps/i2/T1nB0EXnBwXXXXXXXX-80-80.png'" ${w_h}></a></div>
								<div class="desc"><a target="_blank" href="${shopClickUrl}" class="permalink">${d.shopTitle}</a></div>
								<#if d.sellerCredit??&&''!=d.sellerCredit><div class="sales-amount"><img src="http://static.xintaonet.com/assets/min/stylesheets/images/${d.sellerCredit}.gif" style="vertical-align: text-bottom;"/></div></#if>
							</div>
						</li>
					<#else>
						<li>
						<div class="item" cr='${d.commissionRate}'>
							<div class="pic"><a target="_blank" href="${shopClickUrl}" title="${d.shopTitle}"><img ${imgAttr}="<#if d.shopType=='C'>http://img02.taobaocdn.com/tps/i2/T1nB0EXnBwXXXXXXXX-80-80.png<#else>http://img03.taobaocdn.com/tps/i3/T1N.tyXcNpXXXXXXXX-70-70.png</#if>" alt="${d.shopTitle}" ${w_h}></a></div>
							<div class="desc"><a target="_blank" href="${shopClickUrl}" class="permalink">${d.shopTitle}</a></div>
							<#if d.sellerCredit??&&''!=d.sellerCredit><div class="sales-amount"><img src="http://static.xintaonet.com/assets/min/stylesheets/images/${d.sellerCredit}.gif" style="vertical-align: text-bottom;"/></div></#if>
						</div>
						</li>	
					</#if>
					</#list>
				</ul>
				</div>
				</#list>
				<#break>
			<#case 'poster'>
				
				<#break>
			</#switch>
			</#if>
		</div>
	</div>
</div>