<#setting url_escaping_charset='UTF-8'>
<#assign isCat=false>
<#if catName??&&''!=catName><#assign isCat=true></#if> 
<@p.pageHeader>
<meta name="keywords" content="<#if isCat>${catName},</#if>${q},${sitetitle}">
<meta name="description" content="${sitetitle}<#if isCat>提供为您带来有关${catName}精品店铺,产品批发价格,品牌专卖店新品，厂家专卖产品等信息,是${catName}选购的最佳网站<#else>帮你找到${q}的所有商家信息，你可以通过比较${q}不同商家的报价、服务、用户评论，帮您做出最好的购买选择</#if>">
<title><#if isCat>${catName}-<#else><#if q??&&q!=''>${q}-</#if></#if>店铺搜索-${sitetitle}</title>
</@p.pageHeader>
<script src="/assets/min/js/page/jquery.tooltip.min.js" type="text/javascript"></script>
<link rel="stylesheet" href="/assets/min/stylesheets/shopSearch.css?v=${dateVersion()}" type="text/css"/>
<style>.result-container a{color:#36c;}.result-container a:hover{color:#f60;}.ww-inline {width: 77px;height: 20px;display: inline-block;vertical-align: text-bottom;overflow: hidden;}</style>
<div class="layout grid-m ks-clear">
	<div class="col-main">
		<div class="main-wrap J_TRegion">
			<div class="crumbs"><a href="/">购物首页</a><span>&gt;</span>店铺搜索<#if isCat><span>&gt;</span>${catName}(${page.totalCount})</#if></div>
		</div>
	</div>
</div>
<div class="layout grid-s5m0 ks-clear">
	<div class="col-main">
		<div class="main-wrap J_TRegion">
			<div name="itemSearch" class="box J_TBox ks-clear">
				<div class="item-search">
					<div class="hd" style="display:none;"><h3><span>搜索</span></h3></div>
					<div class="bd" style="border:0px;">
						<div class="shop-custom item-search-form">
							<form method="get" action="/shops">
								<fieldset><legend>搜索</legend>
								<ul class="search-tab">
									<li class="selected" rel="shop"><a href="javascript:;" target="_self">店铺</a></li>
									<li rel="item"><a href="javascript:;" target="_self" class="self">宝贝</a></li>
									<li rel="mall"><a href="javascript:;" target="_self">商城</a></li>
									<#if (versionNo>1.5)><li rel="poster"><a href="javascript:;" target="_self" class="self">画报</a></li>
									<#elseif (versionNo==1.5)&&''!=www><li rel="poster"><a href="javascript:;" target="_self" class="self">画报</a></li></#if>
								</ul>
								<div class="search-auto" style="margin-top:-3px;">
									<input name="is_mall" type="hidden" value="">
									<input name="q" class="search-input" value="${q}"  autocomplete="off">
									<input type="button" id="search-button"/>
								</div>
							</fieldset>
							</form>
						</div>
					</div>
				</div>	
			</div>
			<div id="main-content" class="tab-item"><!-- tab bar start --> <!-- tabbar.vm-->
				<ul class="tabbar">
					<li<#if ''==start_credit> class="selected"</#if>><a href="/shops?cid=${cid}&q=${q}">所有店铺</a></li>
					<li<#if '1goldencrown'==start_credit> class="selected"</#if>><a href="/shops?cid=${cid}&q=${q}&start_credit=1goldencrown">至尊店铺</a></li>
					<li<#if '1crown'==start_credit> class="selected"</#if>><a href="/shops?cid=${cid}&q=${q}&start_credit=1crown">皇冠店铺</a></li>
					<li class="pagination">
						<div class="page-top">
						<#assign totalPageCount=page.totalPageCount>
						<#if (totalPageCount>100)><#assign totalPageCount=100></#if>
						</div>
					</li>
				</ul>
				<#if shops??&&shops?size!=0>
				<ul id="toolbar">
    					<li class="mode">店铺信息</li>
						<li class="order by-pop-desc">&nbsp;</li>
    					<li class="location">&nbsp;</li>
    					<li class="status">&nbsp;</li>
    					<li class="amount" style="margin-left:315px;float:left;">
    						<span>宝贝总数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    					</li>
    				</ul>
				<!-- shopList-->
				<div class="result-container" style="background:#fff;">
					<table id="item-matched">
						<colgroup><col class="col-meta"></colgroup>
						<colgroup class="col-infomation">
							<col class="col-amount">
							<!-- 不同处，新增列 -->
							<col class="col-shopkeeper">
							<col class="col-location">
							<col class="col-credit">
						</colgroup>
						<thead style="display:none;">
							<tr>
								<th>店铺信息</th>
								<th><em>相关宝贝</em>/<span>总数</span></th>
								<!-- 不同处，新增列 -->
								<th>卖家</th>
								<th>所在地</th>
								<th>信用/评价</th>
							</tr>
						</thead>
						<tbody>
							<!-- 表格内容循环开始 -->
							<#list shops as s>
							<#assign isExtra=false local={} shopClickUrl=s.clickUrl>
							<#if extra??&&extra[s.userId+'']??><#assign isExtra=true local=extra[s.userId+'']></#if>
							<#if isExtra>
							<#if ''!=local.sid><#assign shopClickUrl='/tshop/'+local.sid+'.html'></#if>
							<tr>
								<td class="thumb">
									<div class="pic s70"><a target="_blank" href="${shopClickUrl}" title="${s.shopTitle}"><img title="${s.shopTitle}" alt="${s.shopTitle}" src="<#if ''!=local.picPath>http://logo.taobao.com/shop-logo${local.picPath}<#else><#if s.shopType=='C'>http://img02.taobaocdn.com/tps/i2/T1nB0EXnBwXXXXXXXX-80-80.png<#else>http://img03.taobaocdn.com/tps/i3/T1N.tyXcNpXXXXXXXX-70-70.png</#if></#if>" onerror="javascript:this.src='http://img02.taobaocdn.com/tps/i2/T1nB0EXnBwXXXXXXXX-80-80.png'"></a></div>
									<dl>
										<dt><a href="${shopClickUrl}" class="title" target="_blank">${s.shopTitle}</a></dt>
										<dd><p></p><p></p><ul></ul></dd>
									</dl>
								</td>
								<td>
									<p class="amount"><span>${s.auctionCount}</span></p>
								</td>
								<td>
									<p class="nick"><a target="_blank" href="${shopClickUrl}">${local.nick}</a></p>
									<p>
										<#if ''!=local.nick><a target="_blank" title="联系掌柜-${local.nick}" href="http://amos1.taobao.com/msg.ww?v=2&uid=${local.nick}&s=1" class="ww-inline"><img border="0" src="http://amos1.taobao.com/online.ww?v=2&uid=${local.nick}&s=1" alt="联系掌柜-${local.nick}" onerror="http://img.im.alisoft.com/actions/wbtx/wangwang/1/offline.gif"/></a><!-- 旺旺 icon --></#if>
										<#if s.shopType=='B'><a href="${shopClickUrl}" target="_blank"><ins title="商城店铺" class="service-mall"></ins></a><!-- 商城店铺 icon --></#if>
									</p>
								</td>
								<td>
									<p></p>
								</td>
								<td>
									<p><a class="rank seller-rank-${s.sellerCredit}">卖家信用</a></p>
									<p><#if ''!=local.itemScore><a class="score" href="${shopClickUrl}" title="${('<ul><li><span>宝贝与描述相符：</span><a href=\"javascript:;\" target=\"_blank\"><span class=\"c-value-no c-value-'+local.itemScore?replace('.','d')+'\" title=\"'+local.itemScore+'/5.0\"></span>'+local.itemScore+'</a></li><li><span>卖家的服务态度：</span><a href=\"javascript:;\" target=\"_blank\"><span class=\"c-value-no c-value-'+local.serviceScore?replace('.','d')+'\" title=\"'+local.serviceScore+'/5.0\"></span>'+local.serviceScore+'</a></li><li><span>卖家发货的速度：</span><a href=\"javascript:;\" target=\"_blank\"><span class=\"c-value-no c-value-'+local.deliveryScore?replace('.','d')+'\" title=\"'+local.deliveryScore+'/5.0\"></span>'+local.deliveryScore+'</a></li></ul>')?html}">店铺动态评分</a></#if></p>
								</td>
							</tr>
							<#else>
							<tr>
								<td class="thumb">
									<div class="pic s70"><a target="_blank" href="${s.clickUrl}" title="${s.shopTitle}"><img title="${s.shopTitle}" alt="${s.shopTitle}" src="<#if s.shopType=='C'>http://img02.taobaocdn.com/tps/i2/T1nB0EXnBwXXXXXXXX-80-80.png<#else>http://img03.taobaocdn.com/tps/i3/T1N.tyXcNpXXXXXXXX-70-70.png</#if>"></a></div>
									<dl>
										<dt><a href="${s.clickUrl}" class="title" target="_blank">${s.shopTitle}</a></dt>
										<dd><p></p><p></p><ul></ul></dd>
									</dl>
								</td>
								<td>
									<p class="amount"><span>${s.auctionCount}</span></p>
								</td>
								<td>
									<p class="nick"><a target="_blank" href=""> </a></p>
									<p></p>
								</td>
								<td>
									<p></p>
								</td>
								<td>
									<p><a class="rank seller-rank-${s.sellerCredit}">卖家信用</a></p>
									<p><a class="score"></a></p>
								</td>
							</tr>
							</#if>
							</#list>
							<!-- 表格内容循环结束 -->
						</tbody>
						<tfoot>
							<tr>
								<td colspan="5"><!-- 不同处，兼容列 -->&nbsp;</td>
							</tr>
						</tfoot>
					</table>
					<@ws.pager pageNo=(page.pageNo?number) pageSize=page.pageSize?number pageCount=totalPageCount url="/shops?q=${q?url}&cid=${cid}&only_mall=${only_mall}&start_credit=${start_credit}&end_credit=${end_credit}"></@ws.pager>
				</div>
				<#else>
				<div id="no-result">
					<h2>很抱歉！没有找到与“<em>${q}</em>”相关的店铺</h2>
					<dl>
						<dt>温馨提示：</dt>
						<dd>
							<ol>
								<li>1、缩短或更改搜索关键字（例：将“电动滑板车”改成“滑板车”后重新搜索）</li>
								<li>2、减少您的"筛选条件"进行重新搜索</li>
							</ol>
						</dd>
					</dl>
				</div>
				</#if>
			</div>
		</div>	
	</div>
	<div class="col-sub J_TRegion">
		<div name="shopCategory" class="box J_TBox ks-clear">
			<div class="shop-category">
				<div class="hd"><h3><span>商品分类</span></h3></div>
				<div class="bd" style="padding:0px;">
					<ul id="J_Cats" class="cats J_TWidget">
						<#list cats as c>
						<li class="cat expand">
							<ul class="cat-bd">
								<li><a href="/shops?cid=${c.cid}">${c.name}</a></li>
							</ul>
						</li>
						</#list>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>
<@p.pageFooter>
$(function(){
$('#item-matched .score').tooltip({
		layout:'<div class="score-popup"><h4>店铺动态评分</h4></div>',
		position:'top left',
		offset:[10,90]
	});
});
</@p.pageFooter>
