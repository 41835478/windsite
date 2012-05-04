<@p.pageHeader>
<meta name="keywords" content="${group.name},${sitetitle}">
<meta name="description" content="${group.name},${sitetitle}">
<title>${group.name}- ${sitetitle}</title>
</@p.pageHeader>
<div class="layout grid-m ks-clear">
	<div class="col-main">
		<div class="main-wrap J_TRegion">
			<div name="itemSearch" class="box J_TBox ks-clear">
				<div class="item-search">
					<div class="hd" style="display:none;"><h3><span>搜索</span></h3></div>
					<div class="bd" style="border:0px;">
						<div class="shop-custom item-search-form">
							<form method="get" action="/search" target="_blank">
								<fieldset><legend>搜索</legend>
								<ul class="search-tab">
									<li class="selected" rel="item"><a href="javascript:;" target="_self" class="self">宝贝</a></li>
									<li rel="mall"><a href="javascript:;" target="_self">商城</a></li>
									<li rel="shop"><a href="javascript:;" target="_self">店铺</a></li>
									<#if (versionNo>1.5)><li rel="poster"><a href="javascript:;" target="_self" class="self">画报</a></li>
									<#elseif (versionNo==1.5)&&''!=www><li rel="poster"><a href="javascript:;" target="_self" class="self">画报</a></li></#if>
								</ul>
								<div class="search-auto" style="margin-top:-3px;">
									<input name="is_mall" type="hidden" value="">
									<input name="q" class="search-input" autocomplete="off">
									<input type="button" id="search-button"/>
								</div>
							</fieldset>
							</form>
						</div>
					</div>
				</div>	
			</div>
		</div>
	</div>
</div>
<div class="layout grid-s5m0 ks-clear">
	<div class="col-main">
		<div class="main-wrap J_TRegion">
			<div name="shopDisplay" class="box J_TBox ks-clear">
				<div class="shop-display">
					<div class="hd"><h3><span>${group.name}</span></h3></div>
					<div class="bd">
						<div class="grid<#if items??&&(items?size<=12)> big</#if>">
							<ul class="shop-list">
								<#if items??&&items?size!=0>
								<#assign pic_jpg='_160x160.jpg'>
								<#if (items?size<=12)><#assign pic_jpg='_b.jpg'></#if>
								<#list items as d>
								<#assign dTitle=d.title?replace('<span class=H>','')?replace('</span>','')>
								<li>
									<div class="item" co='${d.commission}'>
										<div class="pic"><a href="/titem/${d.num_iid}.html" title="${dTitle}"><img src="${d.pic_url?replace("bao/uploaded", "imgextra")+pic_jpg}" alt="${dTitle}"></a></div>
										<div class="desc"><a href="/titem/${d.num_iid}.html" class="permalink">${d.title}</a></div>
										<div class="price"><div class="now"><span>￥ </span><strong>${d.price}元</strong></div></div>
										<div class="sales-amount">最近30天售出<em>${d.volume}</em>笔</div>
									</div>
								</li>
								</#list>
								</#if>
							</ul>
							<div class="ks-clear"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="col-sub J_TRegion">
		<div name="shopCategory" class="box J_TBox ks-clear">
			<div class="shop-category">
				<div class="hd"><h3><span>商品分类</span></h3></div>
				<div class="bd">
					<ul id="J_Cats" class="cats J_TWidget">
						<#if groups??&&groups?size!=0>
							<#list groups as g><li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/tgroup/${g.id}.html">${g.name}</a></li></ul></li></#list>
						</#if>
					</ul>
				</div>
			</div>
		</div>	
	</div>
</div>
<@p.pageFooter>
</@p.pageFooter>