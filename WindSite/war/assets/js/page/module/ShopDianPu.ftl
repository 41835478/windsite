<#assign imgAttr='original'><#if isDesigner><#assign imgAttr='src'></#if>
<div class="shop-dianpu">
<div class="hd" <#if 'false'==isHd>style="display:none;"</#if>><h3><span>${title}</span></h3></div>
<div class="bd">
<#if adType??&&''!=adType>
<div class="shop-dianpu-div">
	<div class="shop-dianpu-box<#if color??> ${color}<#else> red</#if>"> <div class="shop-dianpu-inner"> </div> <div class="shop-dianpu-cbbl"></div> <div class="shop-dianpu-cbbr"></div> </div>
	<ul class="shop-dianpu-ul">
	<#switch adType>
		<#case 'item'><!--商品-->
		<#if data??&&data?size!=0>
		<#list data as d>
			<#assign dTitle=d.title?replace('<span class=H>','')?replace('</span>','')>
			<li co='${d.commission}'><a class="dianpu-logo" href="/titem/${d.num_iid}.html" target="_blank"><img ${imgAttr}="${d.pic_url?replace("bao/uploaded", "imgextra")}_120x120.jpg" alt="${dTitle}"></a><h4><a href="/titem/${d.num_iid}.html" target="_blank" title="${dTitle}">${d.title}</a></h4><div><label>价格：</label><span>${d.price}&nbsp;元</span></div><div><label>销量：</label><span>${d.volume}&nbsp;件</span></div><div><label>店铺等级：</label><span class="rank r${d.seller_credit_score}"></span></div><div><label>商品地址：</label><span>${d.item_location}</span></div><div><a href="/titem/${d.num_iid}.html" target="_blank"><img src="/assets/min/stylesheets/images/gotosee.gif" width="67" height="19" alt="查看商品详情"></a></div></li>
		</#list>
		</#if>
		<#break>
		<#case 'mall'><!--商城-->
		<#if data??&&data?size!=0>
		<#list data as m>
			<#assign mallTitle=m.title?replace('CPS|ROI|CPA|CPC','','ir') mallCat=extra[m.cid+'']>
			<li><a class="dianpu-logo" href="/ymall-${m.b2cId}.html" target="_blank"><img ${imgAttr}="${m.logo}" alt="${mallTitle}"></a><h4><a href="/ymall-${m.b2cId}.html" target="_blank" title="${mallTitle}">${mallTitle}</a></h4><div  class="b2c-fl"><label>最高返利：</label><span>${m.topRate}</span></div><div><label>所属分类：</label><span><#if mallCat??><a target="_blank" href="/ymall.html?cat=${mallCat.id}">${mallCat.title}</a></#if></span></div><div><label>开始时间：</label><span>${m.startDate}</span></div><div><label>结束时间：</label><span>${m.endDate}</span></div><div><a href="/ymall-${m.b2cId}.html" target="_blank"><img src="/assets/min/stylesheets/images/gotosee.gif" width="67" height="19" alt="查看商城详情"></a></div></li>
		</#list>
		</#if>
		<#break>
		<#case 'shop'><!--店铺-->
		<#if data??&&data?size!=0>
		<#if 'search'==dataType><!--搜索结果-->
		<#list data as d>
			<#assign isExtra=false local={} shopClickUrl=d.clickUrl>
			<#if extra??&&extra[d.userId+'']??><#assign isExtra=true local=extra[d.userId+'']></#if>
			<#if isExtra>
				<#if ''!=local.sid><#assign shopClickUrl='/tshop/'+local.sid+'.html'></#if>
				<li cr="${d.commissionRate}"><a class="dianpu-logo" href="${shopClickUrl}" target="_blank"><img ${imgAttr}="<#if ''!=local.picPath>http://logo.taobao.com/shop-logo${local.picPath}<#else><#if d.shopType=='C'>http://img02.taobaocdn.com/tps/i2/T1nB0EXnBwXXXXXXXX-80-80.png<#else>http://img03.taobaocdn.com/tps/i3/T1N.tyXcNpXXXXXXXX-70-70.png</#if></#if>" alt="${d.shopTitle}" onerror="javascript:this.src='http://img02.taobaocdn.com/tps/i2/T1nB0EXnBwXXXXXXXX-80-80.png'"></a><h4><a href="${shopClickUrl}" target="_blank" title="${d.shopTitle}">${d.shopTitle}</a></h4><div><label>店铺等级：</label><span class="rank r${d.sellerCredit}"></span></div><div><label>店铺类型：</label><span><#if 'B'==d.shopType>商城卖家<#else>普通卖家</#if></span></div><div><label>推广量：</label><span>${d.totalAuction}&nbsp;件</span></div><div><label>商品数：</label><span>${d.auctionCount}&nbsp;件</span></div><div><a href="${shopClickUrl}" target="_blank"><img ${imgAttr}="http://img02.taobaocdn.com/tps/i2/T1r8J3Xi0zXXXXXXXX-67-19.png" width="67" height="19" alt="进入店铺"></a></div></li>
			<#else>
			<li cr="${d.commissionRate}"><a class="dianpu-logo" href="${shopClickUrl}" target="_blank"><img ${imgAttr}="<#if d.shopType=='C'>http://img02.taobaocdn.com/tps/i2/T1nB0EXnBwXXXXXXXX-80-80.png<#else>http://img03.taobaocdn.com/tps/i3/T1N.tyXcNpXXXXXXXX-70-70.png</#if>" alt="${d.shopTitle}"></a><h4><a href="${shopClickUrl}" target="_blank" title="${d.shopTitle}">${d.shopTitle}</a></h4><div><label>店铺等级：</label><span class="rank r${d.sellerCredit}"></span></div><div><label>店铺类型：</label><span><#if 'B'==d.shopType>商城卖家<#else>普通卖家</#if></span></div><div><label>推广量：</label><span>${d.totalAuction}&nbsp;件</span></div><div><label>商品数：</label><span>${d.auctionCount}&nbsp;件</span></div><div><a href="${shopClickUrl}" target="_blank"><img ${imgAttr}="http://img02.taobaocdn.com/tps/i2/T1r8J3Xi0zXXXXXXXX-67-19.png" width="67" height="19" alt="进入店铺"></a></div></li>
			</#if>
		</#list>
		<#else><!--店铺分组-->
		<#list data as d>
		<li cr="${d.commissionRate}"><a class="dianpu-logo" href="/tshop/${d.sid}.html" target="_blank"><img ${imgAttr}="<#if ''!=d.picPath>http://logo.taobao.com/shop-logo${d.picPath}<#else>http://img02.taobaocdn.com/tps/i2/T1nB0EXnBwXXXXXXXX-80-80.png</#if>" alt="${d.title}"></a><h4><a href="/tshop/${d.sid}.html" target="_blank" title="${d.title}">${d.title}</a></h4><div><label>店铺等级：</label><span class="rank r${d.sellerCredit}"></span></div><div><label>商品描述：</label><span class="c-value-no" title="${d.itemScore}/5.0"><i style="width: ${d.itemScore}em"></i></span></div><div><label>服务态度：</label><span class="c-value-no" title="${d.serviceScore}/5.0"><i style="width: ${d.serviceScore}em"></i></span></div><div><label>发货速度：</label><span class="c-value-no" title="${d.deliveryScore}/5.0"><i style="width: ${d.deliveryScore}em"></i></span></div><div><a href="/tshop/${d.sid}.html" target="_blank"><img ${imgAttr}="http://img02.taobaocdn.com/tps/i2/T1r8J3Xi0zXXXXXXXX-67-19.png" width="67" height="19" alt="进入店铺"></a></div></li>
		</#list>
		</#if>
		</#if>
		<#break>
		<#case 'poster'><!--画报-->
		<#if SITEIMPL.versionNo==1>
		<div>您当前使用的是新淘网普及版(免费)，无法使用淘店铺画报模块，请删除此模块，或者升级为淘客返利版（月租型）或卖家版</div>
		<#else>
		<#if data??&&data?size!=0>
		<#list data as d>
		<#assign pic=d.coverUrls>
		<#if d.coverUrls?contains(',')><#assign pic=d.coverUrls?split(',')[1]></#if>
		<li><a class="dianpu-logo" href="/huabao/${d.id}.html" target="_blank"><img ${imgAttr}="${pic}" alt="${d.title}" title="${d.title}"></a><h4><a href="/huabao/${d.id}.html" target="_blank" title="${d.title}">${d.shortTitle}</a></h4><div><label style="float:left;">标签：</label> <span class="shop-dianpu-goods" title="${d.tags}">${d.tags}</span><div class="ks-clear"></div></div><div><label>点击：</label><span>${d.hits}</span></div><div><label>创建时间：</label><span>${d.created?date}</span></div><div><label>修改时间：</label> <span>${d.modified?date}</span></div><div><a href="/huabao/${d.id}.html" target="_blank"><img src="/assets/min/stylesheets/images/gotosee.gif" width="67" height="19" alt="查看画报详情"></a></div></li>
		</#list></#if>
		</#if>
		<#break>
		<#case 'dianpu'><!--淘店铺-->
		<#if SITEIMPL.versionNo==1>
		<div>您当前使用的是新淘网普及版(免费)，无法使用淘店铺模块，请删除此模块，或者升级为淘客返利版（月租型）或卖家版</div>
		<#else>
			<#if data.shops??&&data.shops?size!=0><#list data.shops as s>
			<li cr="${s.commissionRate}"><a class="dianpu-logo" href="/tshop/${s.sid}.html" target="_blank"><img ${imgAttr}="${s.picPath}" alt="${s.title}"></a><h4><a href="/tshop/${s.sid}.html" target="_blank" title="${s.title}">${s.shortTitle}</a></h4><div><label style="float:left;">主营宝贝：</label> <span class="shop-dianpu-goods" title="${s.zhuying}">${s.zhuying}</span><div class="ks-clear"></div></div><div><label>好评率：</label><span>${s.haoping}</span></div><div><label>店铺等级：</label><span class="rank r${s.sellerCredit}"></span></div><div><label>卖家地址：</label> <span>${s.city}</span></div><div><a href="/tshop/${s.sid}.html" target="_blank"><img ${imgAttr}="http://img02.taobaocdn.com/tps/i2/T1r8J3Xi0zXXXXXXXX-67-19.png" width="67" height="19" alt="进入店铺"></a></div></li>
			</#list></#if>
		</#if>		
		<#break>
	</#switch>
	</ul>
	<#if moreUrl??&&''!=moreUrl><p class="more-items"><a href="${moreUrl}" target="_blank" class="button">查看更多</a></p></#if>
	<div class="shop-dianpu-flag"><h2><#if data?is_hash&&data.root??>${data.root.title}<#else>热荐</#if></h2></div>
</div>	
</#if>
</div>
</div>