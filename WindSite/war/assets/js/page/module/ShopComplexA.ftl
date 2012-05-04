<#assign imgAttr='original'><#if isDesigner><#assign imgAttr='src'></#if>
<#if adType??&&'poster'==adType>
<div class="shop-complex-a">
	<div class="hd" <#if 'false'==isHd>style="display:none;"</#if>><h3><span>${title}</span></h3></div>
	<div class="bd">
<#if SITEIMPL.versionNo==1>
	<div>您当前使用的是新淘网淘客普及版，无法使用画报类推广模块</div>
<#else>
<#if data??&&data?size==28>
<#assign left=data[0] middle=data[1..8] right=data[9..19] bottom=data[20..27]>
<#assign pic=left.cover_urls>
<#if left.cover_urls?contains(',')><#assign pic=left.cover_urls?split(',')[1]></#if>
		<table width=100% height=350><tbody>
			<tr><td valign="top">
				<table width=100%><tbody><tr>
					<td width=240px valign="top" align=center style="padding-top:10px;"><a href="/huabao/${left.id}.html" target="_blank" title="${left.title}"><img src="${pic}" alt="${left.title}" title="${left.title}" width=220 height=320  style="border:1px solid #CCC;"></a></td>
					<td width=480px valign="top">
						<div class="grid grid-110">
							<ul class="shop-list">
								<#list middle as d>
								<#assign pic=d.cover_urls>
								<#if d.cover_urls?contains(',')><#assign pic=d.cover_urls?split(',')[0]></#if>
								<li>
									<div class="item">
										<div class="pic"><a target="_blank" href="/huabao/${d.id}.html" title="${d.title}"><img ${imgAttr}="${pic}" alt="${d.title}" width=110px height=110px></a></div>
										<div class="desc"><a target="_blank" href="/huabao/${d.id}.html" class="permalink">${d.title}</a></div>
									</div>
								</li>
							</#list>
							</ul>
						</div>
					</td>
					<td width=220px align=center valign="top" style="padding-top:10px;">
						<h3 style="width: 220px;margin: 0;padding: 0;height: 25px;line-height: 25px;color: #900;font-size: 16px;overflow: hidden;">${posterChannel}画报热荐排行</h3>
						<ul class="items-right">
						<#list right as d>
							<li><a href="/huabao/${d.id}.html" target="_blank" title="${d.title}">${d.title}</a></li>
						</#list>
						</ul>
					</td>
				</tr></tbody></table>
			</td></tr>
			<tr><td valign="top">
				<div class="grid grid-100">
					<ul class="shop-list" style="margin-top:0px;">
					<#list bottom as d>
					<#assign pic=d.cover_urls>
					<#if d.cover_urls?contains(',')><#assign pic=d.cover_urls?split(',')[0]></#if>
						<li>
						<div class="item">
							<div class="pic"><a target="_blank" href="/huabao/${d.id}.html" title="${d.title}"><img ${imgAttr}="${pic}" alt="${d.title}" width=100px height=100px></a></div>
							<div class="desc"><a target="_blank" href="/huabao/${d.id}.html" class="permalink">${d.title}</a></div>
						</div>
						</li>
					</#list>
					</ul>
				</div>
			</td></tr>
		</tbody>
		</table>
</#if></#if>	
	</div>
</div>
<#else>
<div class="shop-complex-a">
	<div class="hd" <#if 'false'==isHd>style="display:none;"</#if>><h3><span>${title}</span></h3></div>
	<div class="bd">
		<table width=100% height=350><tbody>
			<tr><td valign="top">
				<table width=100%><tbody><tr>
					<td width=240px valign="top" align=center style="padding-top:10px;"><a href="${picHref}" target="_blank" title="${picTitle}"><img src="<#if picUrl=='http://logo.taobao.com/shop-logo'>http://img03.taobaocdn.com/tps/i3/T1N.tyXcNpXXXXXXXX-70-70.png<#else>${picUrl}</#if>" alt="${picTitle}" title="${picTitle}" width=220 height=320 onerror="javascript:this.src='http://img03.taobaocdn.com/tps/i3/T1N.tyXcNpXXXXXXXX-70-70.png';" style="border:1px solid #CCC;"></a></td>
					<td width=480px valign="top">
						<div class="grid grid-110">
							<ul class="shop-list">
								<#list data['mItems'] as d>
								<#assign dTitle=d.title?replace('<span class=H>','')?replace('</span>','')>
								<li>
									<div class="item" co='${d.commission}'>
										<div class="pic"><a target="_blank" href="/titem/${d.num_iid}.html" title="${dTitle}"><img ${imgAttr}="${d.pic_url?replace("bao/uploaded", "imgextra")}_110x110.jpg" alt="${dTitle}"></a></div>
										<div class="desc"><a target="_blank" href="/titem/${d.num_iid}.html" class="permalink">${d.title}</a></div>
										<div class="price"><div class="now"><span>￥ </span><strong>${d.price}元</strong></div></div>
									</div>
								</li>
							</#list>
							</ul>
						</div>
					</td>
					<td width=220px align=center valign="top" style="padding-top:10px;">
						<h3 style="width: 220px;margin: 0;padding: 0;height: 25px;line-height: 25px;color: #900;font-size: 16px;overflow: hidden;">淘宝店铺人气商品排行</h3>
						<ul class="items-right">
						<#list data['rItems'] as d><#assign dTitle=d.title?replace('<span class=H>','')?replace('</span>','')>
							<li><a href="/titem/${d.num_iid}.html" target="_blank" title="${dTitle}">${d.title}</a></li>
						</#list>
						</ul>
					</td>
				</tr></tbody></table>
			</td></tr>
			<tr><td valign="top">
				<div class="grid grid-100">
					<ul class="shop-list" style="margin-top:0px;">
					<#list data['shops'] as d>
						<li>
						<div class="item" cr='${d.commissionRate}'>
							<div class="pic"><a target="_blank" href="/tshop/${d.sid}.html" title="${d.title}"><img ${imgAttr}="<#if ''!=d.picPath>http://logo.taobao.com/shop-logo${d.picPath}<#else>http://img02.taobaocdn.com/tps/i2/T1nB0EXnBwXXXXXXXX-80-80.png</#if>" alt="${d.title}" width=100px height=100px></a></div>
							<div class="desc"><a target="_blank" href="/tshop/${d.sid}.html" class="permalink">${d.title}</a></div>
							<#if d.sellerCredit??&&''!=d.sellerCredit><div class="sales-amount"><img src="/assets/min/stylesheets/images/${d.sellerCredit}.gif" style="vertical-align: text-bottom;"/></div></#if>
						</div>
						</li>
					</#list>
					</ul>
				</div>
			</td></tr>
		</tbody></table>
	</div>
</div>
</#if>