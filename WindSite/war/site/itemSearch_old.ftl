<#setting url_escaping_charset='UTF-8'>
<#assign isCat=false>
<#if categories??&&categories?size==1><#assign isCat=true></#if> 
<@p.pageHeader>
<meta name="keywords" content="<#if isCat>${categories[0].name}<#else>${q}</#if>,${sitetitle}">
<meta name="description" content="${sitetitle}<#if isCat>提供为您带来有关${categories[0].name}产品批发价格,品牌专卖店新品，厂家专卖产品等信息,是${categories[0].name}选购的最佳网站<#else>帮你找到${q}的所有关于价格，商家，产品图片和评测信息，你可以通过比较${q}不同商家的报价、服务、用户评论，帮您做出最好的购买选择</#if>">
<title><#if isCat>${categories[0].name}<#else><#if q??&&q!=''>${q}<#elseif ''!=nicks>淘宝掌柜${nicks}<#else>类目${cid}搜索</#if></#if>-${sitetitle}</title>
</@p.pageHeader>
<link rel="stylesheet" href="/assets/min/stylesheets/itemSearch.css?v=${dateVersion()}" type="text/css"/>
<#if 'list'==view>
<style>
.bigpic {position:absolute;z-index:2007;padding-left:6px;display:none}.bigpic .arrow{width:7px;height:13px;position:absolute;left:0px;top:10px;background-position:-8px -1045px;}.bigpic div{border:1px #666 solid;background:#fff;}
.bigpic a {display: table-cell;vertical-align:middle;width:250px;height:250px;text-align:center;*display:block;*font-size:186px;border:4px #e8e8e8 solid;background:#fff;}
.bigpic a.loading {background: url(/assets/min/stylesheets/images/T1JSdAXd0nXXXXXXXX-32-32.gif) no-repeat center center;}.bigpic a img{border:1px #b6b6b6 solid;max-width:220px;max-height:220px;vertical-align:middle;}
</style>
</#if>
<style>.big li{height:335px;}.grid-s5m0 .col-sub .box{width:180px;float:left;}.grid-m0s5 .col-sub .box{width:180px;float:right;}.col-sub .grid li{margin-left:0px;}.grid-s5m0 .main-wrap{margin-left:190px;}.grid-m0s5 .main-wrap{margin-right:190px;}</style>
<div class="layout grid-m ks-clear ks-hidden">
	<div class="col-main">
		<div class="main-wrap J_TRegion">
		</div>
	</div>
</div>
<div class="layout <#if site_searchLayout??&&site_searchLayout!=''>${site_searchLayout}<#else>grid-s5m0</#if>  ks-clear">
	<div class="col-main">
		<div class="main-wrap J_TRegion" style="overflow:auto;width:760px;">
			<#if site_searchBox??&&'true'==site_searchBox>
			<div name="itemSearch" class="box J_TBox ks-clear">
				<div class="item-search">
					<div class="hd" style="display:none;"><h3><span>搜索</span></h3></div>
					<div class="bd" style="border:0px;">
						<div class="shop-custom item-search-form">
							<form method="get" action="/search">
								<fieldset><legend>搜索</legend>
								<ul class="search-tab">
									<li <#if 'true'!=is_mall>class="selected"</#if> rel="item"><a href="javascript:;" target="_self" class="self">宝贝</a></li>
									<!--<li <#if 'true'==is_mall>class="selected"</#if> rel="mall"><a href="javascript:;" target="_self">商城</a></li>
									<li rel="shop"><a href="javascript:;" target="_self">店铺</a></li>-->
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
			</#if>
			<div class="search-nav"><ul class="crumbs"><li class="list-item"><a href="/search?q=${q?url}&cid=0&nicks=${nicks?url}&order_by=${order_by}&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=${state?url}&city=${city?url}&start_price=${start_price}&end_price=${end_price}&view=${view}&props=&page_no=${page_no}">所有分类</a><#if !isCat>&nbsp;&nbsp;&nbsp;&nbsp;找到相关宝贝<em>${totalResults}</em>件。</#if></li><#if isCat><li class="list-item">${categories[0].name}&nbsp;&nbsp;&nbsp;&nbsp;找到相关宝贝<em>${totalResults}</em>件。</li></#if></ul></div>
			<#if categories??&&(categories?size!=0)>
			<#assign length=categories?size-1>
			<#if (length>9)>
				<#assign length=9>
			</#if>
			<div class="navigation" style="clear:both;background-color: white;" id="J_Navgation" _title="智能类目导航区" _detail="分类不再需要一步步点击，相关的热门分类直接呈现">
			<#if categories?size==1>
			<!--属性-->
			<div class="prop-list" style="clear:both;">
			<#include "/site/itemprops.ftl">
			</div>
			<#if itemProps??&&(itemProps?size>4)><div class="show-more prop-toggler" id="J_PropToggler"><div class="inner"><a href="#" class="close" hidefocus="true"><span>更多</span></a></div></div></#if>
			<#else>
			<script type="text/javascript">
				var _gaq = _gaq || [];
				_gaq.push( [ '_setAccount', 'UA-10891782-8' ]);
				_gaq.push( [ '_trackPageview' ]);
				<#if pid??&&pid!=''>_gaq.push(['_trackEvent', 'xt-${pid}', 'key-<#if cid??&&cid!=''>${cid}<#else>0</#if>', '<#if q??&&q!=''>${q}<#else>类目:${cid!'0'}</#if>']);</#if>
			</script>
			<!--类目-->
			<div class="cate-panel hierarchy-cate" id="J_HierarchyCate"><dl><#list categories[0..length] as c><dd><a href="/search?q=${q?url}&cid=${c.categoryId}&nicks=${nicks?url}&order_by=${order_by}&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=${state?url}&city=${city?url}&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}" cid="${c.categoryId}" title="${c.name}">${c.name}</a>(${c.count})</dd></#list></dl></div>
			<#if (categories?size>10)>
			<div class="cate-panel all-cate" id="J_AllCates" style="display:none"><dl><#list categories[8..(categories?size-1)] as c><dd><a href="/search?q=${q?url}&cid=${c.categoryId}&nicks=${nicks?url}&order_by=${order_by}&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=${state?url}&city=${city?url}&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}" cid="${c.categoryId}" title="${c.name}">${c.name}</a>(${c.count})</dd></#list></dl></div>
			<div count="" class="show-more cate-toggler" id="J_CateToggler"><div class="inner"><a href="#" class="close"><span>显示全部分类</span></a></div></div>
			</#if>
			</#if>
			</div>
			</#if>
			<#if q??&&''!=q><div class="related-search-outter"><dl class="related-search" id="J_RelatedSearch"></dl></div></#if>
			<div class="filter" id="J_Filter">
				<ul class="filter-tabbar" id="J_FilterTabBar">
					<#assign mall=false>
					<#if is_mall??&&is_mall=='true'>
					<#assign mall=true>
					</#if>
					<li <#if !mall>class="selected"</#if> data-idx="1"><span class="l"></span><span class="r"></span><a href="/search?q=${q?url}&cid=${cid}&nicks=${nicks?url}&order_by=${order_by}&is_mall=&is_cod=${is_cod}&post_free=${post_free}&state=${state?url}&city=${city?url}&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}" title="" id="J_byAll">所有宝贝</a></li>
					<li <#if mall>class="selected"</#if> data-idx="10"><span class="l"></span><span class="r"></span><a href="/search?q=${q?url}&cid=${cid}&nicks=${nicks?url}&order_by=${order_by}&is_mall=true&is_cod=${is_cod}&post_free=${post_free}&state=${state?url}&city=${city?url}&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}" title="" id="J_byMall">淘宝商城</a></li>
					<li class="pagination">
						<div class="page-top">
						<#assign totalPageCount=page.totalPageCount>
						<#if (totalPageCount>100)><#assign totalPageCount=100></#if>
						<@ws.pager pageNo=(page.pageNo?number) pageSize=page.pageSize?number pageCount=totalPageCount url="/search?q=${q?url}&cid=${cid}&nicks=${nicks?url}&order_by=${order_by}&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=${state?url}&city=${city?url}&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}"  pageNoStr="page_no" pageSizeStr="page_size"></@ws.pager>
						</div>
					</li>
				</ul>
				<div id="filterForm">
				<fieldset>
					<legend>宝贝筛选器</legend>
					<ul class="basic">
						<li class="keywords"><label for="filterSearchKeyWord">关键字：</label><input id="filterSearchKeyWord" type="text" class="text" name="q" value="${q}"  autocomplete="off"></li>
						<li class="extra"><input type="checkbox" id="filterServiceCOD" <#if 'true'==is_cod>checked</#if>><label for="filterServiceCOD">货到付款</label></li>
						<li class="extra"><input type="checkbox" id="filterServicePostFree" <#if 'true'==post_free>checked</#if>><label for="filterServicePostFree">包邮</label></li>
						<li style="margin-top:-5px;_margin-top:-12px;"><button class="submit highlight" type="submit" id="J_SubmitBtn" style="_margin-top:2px;">确定</button></li>
					</ul>
					
				</fieldset>
				</div>
				<div class="toolbarWrapper" _float="0">
				<#assign orderdesc='' ordertext='默认排序'>
				<#if order_by=='seller_credit:desc'><#assign orderdesc='by-credit-desc' ordertext='信用从高到低'>
				<#elseif order_by=='price:desc'><#assign orderdesc='by-price-desc' ordertext='价格从高到低'>
				<#elseif order_by=='price:asc'><#assign orderdesc='by-price-asc' ordertext='价格从低到高'>
				<#elseif order_by=='volume:desc'><#assign orderdesc='by-sale-desc' ordertext='销量从高到低'>
				</#if>
					<ul class="toolbar" id="J_FilterToolbar">
						<#if 'list'==view><li class="mode thumb-mode"><a rel="nofollow" title="大图展示" href="/search?q=${q?url}&cid=${cid}&nicks=${nicks?url}&order_by=${order_by}&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=${state?url}&city=${city?url}&start_price=${start_price}&end_price=${end_price}&page_no=${page_no}&view=thumb"><span>切换到大图</span></a></li>
						<#else><li class="mode list-mode"><a rel="nofollow" title="小图展示" href="/search?q=${q?url}&cid=${cid}&nicks=${nicks?url}&order_by=${order_by}&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=${state?url}&city=${city?url}&start_price=${start_price}&end_price=${end_price}&page_no=${page_no}&view=list"><span>切换到列表</span></a></li></#if>
						<li class="order hoverMenu ${orderdesc}" id="J_Order" style="width:160px;">
							<span class="title">排序 </span>
							<a id="J_OrderSelector" href="" class="select-item  order-by"><span><span>${ordertext}</span></span></a>
							<ul class="order-options item-list" id="J_OrderByList">
							<li class="by-price-asc"><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&nicks=${nicks?url}&order_by=price:asc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=${state?url}&city=${city?url}&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}" order="price:asc">价格从低到高</a></li>
							<li class="by-price-desc"><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&nicks=${nicks?url}&order_by=price:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=${state?url}&city=${city?url}&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}" order="price:desc">价格从高到低</a></li>
							<li class="by-credit-desc"><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&nicks=${nicks?url}&order_by=seller_credit:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=${state?url}&city=${city?url}&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}" order="seller_credit:desc">信用从高到低</a></li>
							<li class="by-sale-desc"><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&nicks=${nicks?url}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=${state?url}&city=${city?url}&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}" order="volume:desc">销量从高到低</a></li>
							<li class="by-default selected"><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&nicks=${nicks?url}&order_by=&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=${state?url}&city=${city?url}&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}" order="">恢复默认排序</a></li>
						</ul>
						</li>
						<li class="order ${orderdesc}">
							<a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&nicks=${nicks?url}&order_by=seller_credit:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=${state?url}&city=${city?url}&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}" class="by-credit" id="J_byCredit" title="点击按照信用从高到低排序"><span>按信用排序</span></a>
							<a rel="nofollow" href="<#if order_by=='price:desc'>/search?q=${q?url}&cid=${cid}&nicks=${nicks?url}&order_by=price:asc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=${state?url}&city=${city?url}&start_price=${start_price}&end_price=${end_price}&page_no=${page_no}<#else>/search?q=${q?url}&cid=${cid}&nicks=${nicks?url}&order_by=price:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=${state?url}&city=${city?url}&start_price=${start_price}&end_price=${end_price}&page_no=${page_no}</#if>" title="点击按照价格（<#if order_by=='price:desc'>价格由低到高<#else>价格由高到低</#if>）重新排序" class="by-price"><span>按价格排序</span></a>
						</li>
						<li class="price-wrapper">
							<div class="price" id="J_FilterPrice">
							<input type="text" value="${start_price}" id="start_price">-<input type="text" value="${end_price}" id="end_price">
								<p class="sub-menu">
									<button class="submit" id="J_byPrice">确定</button>
								</p>
							</div>
						</li><li class="location hoverMenu" id="filterLocation">
							<span class="select-item"><span><span><#if ''!=state>${state}<#elseif ''!=city>${city}<#else>所在地</#if></span></span></span>
							<div class="item-list">
								<ul class="loc1"><li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&nicks=${nicks?url}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=&city=&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">所有地区</a></li></ul>
								<ul class="loc2 split">
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=&city=%E5%8C%97%E4%BA%AC&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">北京</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=&city=%E4%B8%8A%E6%B5%B7&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">上海</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=&city=%E5%B9%BF%E5%B7%9E&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">广州</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=&city=%E6%B7%B1%E5%9C%B3&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">深圳</a></li>
								</ul>
								<ul class="loc3">
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=&city=%E6%9D%AD%E5%B7%9E&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">杭州</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=&city=%E6%B8%A9%E5%B7%9E&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">温州</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=&city=%E5%AE%81%E6%B3%A2&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">宁波</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=&city=%E5%8D%97%E4%BA%AC&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">南京</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=&city=%E8%8B%8F%E5%B7%9E&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">苏州</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=&city=%E6%B5%8E%E5%8D%97&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">济南</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=&city=%E9%9D%92%E5%B2%9B&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">青岛</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=&city=%E5%A4%A7%E8%BF%9E&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">大连</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=&city=%E6%97%A0%E9%94%A1&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">无锡</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&is_cod=${is_cod}&post_free=${post_free}&state=&city=%E5%90%88%E8%82%A5&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">合肥</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=&city=%E5%A4%A9%E6%B4%A5&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">天津</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=&city=%E9%95%BF%E6%B2%99&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">长沙</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=&city=%E6%AD%A6%E6%B1%89&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">武汉</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=&city=%E9%83%91%E5%B7%9E&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">郑州</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=&city=%E7%9F%B3%E5%AE%B6%E5%BA%84&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">石家庄</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=&city=%E6%88%90%E9%83%BD&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">成都</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=&city=%E9%87%8D%E5%BA%86&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">重庆</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=&city=%E8%A5%BF%E5%AE%89&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">西安</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=&city=%E6%98%86%E6%98%8E&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">昆明</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=&city=%E5%8D%97%E5%AE%81&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">南宁</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=&city=%E7%A6%8F%E5%B7%9E&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">福州</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=&city=%E5%8E%A6%E9%97%A8&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">厦门</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=&city=%E5%8D%97%E6%98%8C&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">南昌</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=&city=%E4%B8%9C%E8%8E%9E&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">东莞</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=&city=%E6%B2%88%E9%98%B3&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">沈阳</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=&city=%E9%95%BF%E6%98%A5&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">长春</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=&city=%E5%93%88%E5%B0%94%E6%BB%A8&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">哈尔滨</a></li>
								</ul>
								<ul class="loc4 split">
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=%E5%AE%89%E5%BE%BD&city=&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">安徽</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=%E7%A6%8F%E5%BB%BA&city=&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">福建</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=%E7%94%98%E8%82%83&city=&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">甘肃</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=%E5%B9%BF%E4%B8%9C&city=&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">广东</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=%E5%B9%BF%E8%A5%BF&city=&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">广西</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=%E8%B4%B5%E5%B7%9E&city=&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">贵州</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=%E6%B5%B7%E5%8D%97&city=&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">海南</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=%E6%B2%B3%E5%8C%97&city=&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">河北</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=%E6%B2%B3%E5%8D%97&city=&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">河南</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=%E6%B9%96%E5%8C%97&city=&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">湖北</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=%E6%B9%96%E5%8D%97&city=&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">湖南</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=%E6%B1%9F%E8%8B%8F&city=&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">江苏</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=%E9%BB%91%E9%BE%99%E6%B1%9F&city=&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">黑龙江</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=%E6%B1%9F%E8%A5%BF&city=&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">江西</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=%E5%90%89%E6%9E%97&city=&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">吉林</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=%E8%BE%BD%E5%AE%81&city=&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">辽宁</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=%E5%86%85%E8%92%99%E5%8F%A4&city=&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">内蒙古</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=%E5%AE%81%E5%A4%8F&city=&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">宁夏</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=%E9%9D%92%E6%B5%B7&city=&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">青海</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=%E5%B1%B1%E4%B8%9C&city=&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">山东</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=%E5%B1%B1%E8%A5%BF&city=&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">山西</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=%E9%99%95%E8%A5%BF&city=&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">陕西</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=%E5%9B%9B%E5%B7%9D&city=&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">四川</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=%E8%A5%BF%E8%97%8F&city=&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">西藏</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=%E6%96%B0%E7%96%86&city=&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">新疆</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=%E4%BA%91%E5%8D%97&city=&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">云南</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=%E6%B5%99%E6%B1%9F&city=&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">浙江</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=%E9%A6%99%E6%B8%AF&city=&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">香港</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=%E6%BE%B3%E9%97%A8&city=&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">澳门</a></li>
								<li><a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=%E5%8F%B0%E6%B9%BE&city=&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}">台湾</a></li></ul>
							</div>
						</li>
						<li class="order ${orderdesc}">
							<a rel="nofollow" href="/search?q=${q?url}&cid=${cid}&nicks=${nicks?url}&order_by=volume:desc&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=${state?url}&city=${city?url}&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}&page_no=${page_no}" _detail="轻松了解淘友买的最多宝贝是哪些，挑选最热卖宝贝" id="J_bySaleDesc" _title="销量排序" _pos="bottom" class="by-sale" title="点击按照销量从高到低排序"><span>按销量排序</span></a>
						</li>
					</ul>
				</div>
			</div>
			<#if (items??&&items?size!=0)||taokeItem??||normal??>
			<#if 'list'==view>
			<div id="J_ListContent" class="list-content small-list">
			<!-- list view -->
				<ul class="list-view hlisting sell lazy-list-view">
					<#if taokeItem??>
					<li class="list-item" co='${taokeItem.commission}'>
						<h3 class="summary"><a href="/titem/${taokeItem.numIid}.html" target="_blank" class="EventCanSelect" title="${taokeItem.title}">${taokeItem.title}</a></h3>
						<div class="photo"><a href="/titem/${taokeItem.numIid}.html" target="_blank"><span><img class="hesper:small2big small2big" title="${('<div><span class="arrow" style="top:36px"></span><a href="/gitem/${taokeItem.numIid}.html" target="_blank" class="loading"><img oncontextmenu="return(false)" pic="'+taokeItem.picUrl?replace('bao/uploaded', 'imgextra')+'_b.jpg" border="0" /></a></div>')?html}" alt="${taokeItem.title}" src="${taokeItem.picUrl?replace('bao/uploaded', 'imgextra')}_80x80.jpg"></span></a><i class="antispam"></i></div>
						<ul class="attribute">
							<li class="legend2">
							</li>
							<li class="sale"></li>
							<li class="place"></li>
							<li class="price"><em>${taokeItem.price}</em><!--<span class="shipping">运费：5.00</span>--></li>
						</ul>
						<p class="seller lister hCard">
							<a href="/search?nicks=${taokeItem.nick?url}" target="_blank">${taokeItem.nick}</a>
						</p>
					</li>	
					<#elseif normal??>
					<li class="list-item">
						<h3 class="summary"><a class="EventCanSelect" title="${normal.title}">${normal.title}</a></h3>
						<div class="photo"><a><span><img class="hesper:small2big small2big" title="${('<div><span class="arrow" style="top:36px"></span><a class="loading"><img oncontextmenu="return(false)" pic="'+normal.picUrl?replace('bao/uploaded', 'imgextra')+'_b.jpg" border="0" /></a></div>')?html}" alt="${normal.title}" src="${normal.picUrl?replace('bao/uploaded', 'imgextra')}_80x80.jpg"></span></a><i class="antispam"></i></div>
						<ul class="attribute">
							<li class="legend2">
							</li>
							<li class="sale">商品数量${normal.num}</li>
							<li class="place"><#if normal.location??>${normal.location.city}</#if></li>
							<li class="price"><em>${normal.price}</em></li>
						</ul>
						<p class="seller lister hCard">
							<a>${normal.nick}</a>
						</p>
					</li>
					</#if>
					<#list items as i>
					<#assign item=itemsMap[(i.numIid+'')]>
					<li class="list-item" co='${i.commission}'>
						<h3 class="summary"><a href="/titem/${i.numIid}.html" target="_blank" class="EventCanSelect" title="${i.title}">${i.title}</a></h3>
						<div class="photo"><a href="/titem/${i.numIid}.html" target="_blank"><span><img class="hesper:small2big small2big" title="${('<div><span class="arrow" style="top:36px"></span><a href="/gitem/${i.numIid}.html" target="_blank" class="loading"><img oncontextmenu="return(false)" pic="'+i.picUrl?replace('bao/uploaded', 'imgextra')+'_b.jpg" border="0" /></a></div>')?html}" alt="${i.title}" src="${i.picUrl?replace('bao/uploaded', 'imgextra')}_80x80.jpg"></span></a><i class="antispam"></i></div>
						<ul class="attribute">
							<li class="legend2">
								<#if item??&&item?is_hash>
								<#if item.isPrepay><a target="_blank" title="消费者保障服务，卖家承诺商品如实描述" class="xb-as-fact" href="http://www.taobao.com/go/act/315/xfzbz_rsms.php"><span>如实描述</span></a></#if>
								<#if is_mall??&&is_mall><a target="_blank" title="消费者保障服务，卖家承诺正品保障" class="xb-quality_item" href="http://www.taobao.com/go/act/315/xfzbz_zpbz.php"><span>正品保障</span></a></#if>
								<#if item.promotedService??>
								<#if item.promotedService?contains('2')><a target="_blank" title="消费者保障服务，卖家承诺假一赔三" class="xb-jia1-pei3" href="http://www.taobao.com/go/act/315/xfzbz_jyps.php"><span>假一赔三</span></a></#if>
								<#if item.promotedService?contains('4')><a target="_blank" title="消费者保障服务，卖家承诺7天无理由退换货" class="xb-sevenday-return" href="http://www.taobao.com/go/act/315/xbqt090304.php"><span>七天退换</span></a></#if>
								<#if item.promotedService?contains('8')><a href="http://www.taobao.com/go/act/315/xfzbz_sdfh.php" class="xb-sdfh" title="消费者保障服务，卖家承诺24小时闪电发货服务" target="_blank"><span>闪电发货</span></a></#if>
								<#if item.promotedService?contains('16')><a href="http://www.taobao.com/go/act/315/xfzbz_wx.php" class="xb-thirtyday-repair" title="消费者保障服务，卖家承诺30天维修" target="_blank"><span>30天维修</span></a></#if>
								</#if>
								</#if>
							</li>
							<li class="sale">最近成交${i.volume}笔</li>
							<li class="place">${i.itemLocation}</li>
							<li class="price"><em>${i.price}</em><!--<span class="shipping">运费：5.00</span>--></li>
						</ul>
						<p class="seller lister hCard">
							<a href="/search?nicks=${i.nick?url}" target="_blank">${i.nick}</a>
							<!--<span class="ww-light ww-large"><a href="" target="_blank" class="ww-inline ww-online" title="点此可以直接和卖家交流选好的宝贝，或相互交流网购体验，还支持语音视频噢。"><span>旺旺在线</span></a></span>-->
						</p>
					</li>
					</#list>
				</ul>
			<!-- end list view -->
			</div>
			<#else>
			<div name="shopDisplay" class="box J_TBox ks-clear">
				<div class="shop-display">
					<div class="bd">
						<div class="grid big">
							<ul class="shop-list">
								<#assign pic_jpg='_b.jpg'>
								<#list items as i>
								<#assign item=itemsMap[(i.numIid+'')]>
								<li>
									<div class="item ks-clear" co='${i.commission}'>
										<div class="pic"><a href="/titem/${i.numIid}.html" target="_blank" title="${i.title}"><img original="${i.picUrl?replace("bao/uploaded", "imgextra")+pic_jpg}" alt="${i.title}"></a></div>
										<div class="desc"><a href="/titem/${i.numIid}.html" target="_blank" class="permalink">${i.title}</a></div>
										<div class="price"><div class="now"><span>￥ </span><strong>${i.price}元</strong></div></div>
										<div class="sales-amount">最近30天售出<em>${i.volume}</em>笔</div>
										<div class="seller"><a href="/search?nicks=${i.nick?url}" target="_blank">${i.nick}</a></div>
									</div>
								</li>
								</#list>
							</ul>
							<div class="ks-clear"></div>
						</div>
					</div>
				</div>
			</div>
			</#if>
			<#assign totalPageCount=page.totalPageCount>
			<#if (totalPageCount>100)><#assign totalPageCount=100></#if>
			<@ws.pager pageNo=(page.pageNo?number) pageSize=page.pageSize?number pageCount=totalPageCount url="/search?q=${q?url}&cid=${cid}&nicks=${nicks?url}&order_by=${order_by}&is_mall=${is_mall}&is_cod=${is_cod}&post_free=${post_free}&state=${state?url}&city=${city?url}&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props}"  pageNoStr="page_no" pageSizeStr="page_size"></@ws.pager>
			<#else>
			<div class="no-result-new">
    			<link rel="stylesheet" type="text/css" href="/assets/min/stylesheets/noresult.css">
				<p class="item-not-found"><strong>很抱歉，没有找到与“<em>${q}</em>”相关的宝贝</strong></p>
       			<div class="recommend-box">
            		<dl>
                		<dt>建议您：</dt>
                		<dd>1.  看看输入的文字是否有误</dd>
                		<dd>2.  去掉可能不必要的字词，如“的”、“什么”等</dd>
                		<dd>3.  调整关键字，如“兰蔻再生青春眼霜”改成“兰蔻 再生青春眼霜”或“兰蔻 眼霜”</dd>
                	</dl>
        		</div>
			</div>
			</#if>
		</div>
	</div>
	<div class="col-sub J_TRegion" data-user="${user_id}">
		<#if user_id??&&''!=user_id>
		<#assign objectConstructor = "freemarker.template.utility.ObjectConstructor"?new()>
		<#assign filePath = user_id?substring(user_id?length-2,user_id?length)>
		<#assign file = objectConstructor("java.io.File", htmlPath+"/htdocs/zone/"+filePath+"/"+user_id+"/search.html")>
		<#if file.exists()>
			<#include  "//"+filePath+"/"+user_id+"/search.html" parse=false encoding="utf8">
		<#else>
		<div name="shopCategory" class="box J_TBox ks-clear">
			<div class="shop-category">
				<div class="hd"><h3><span>商品分类</span></h3></div>
				<div class="bd" style="padding:0px;">
					<ul id="J_Cats" class="cats J_TWidget">
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=16">女装/女士精品</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=30">男装</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=50006843">女鞋</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=50010388">运动鞋</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=50011740">男鞋/皮鞋/休闲鞋</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=50016756">运动服/运动包/颈环配件</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=1625">女士内衣/男士内衣/家居服</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=50006842">箱包皮具/热销女包/男包</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=50010404">服饰配件/皮带/帽子/围巾</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=11">电脑硬件/显示器/电脑周边</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=1512">手机</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=1101">笔记本电脑</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=50041307">网络设备/路由器/网络相关</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=14">数码相机/摄像机/摄影器材</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=1201">MP3/MP4/iPod/录音笔</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=20">电玩/配件/游戏/攻略</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=50018908">影音电器</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=50018930">厨房电器</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=50018957">生活电器</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=50008090">3C数码配件市场</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=50019321">国货精品手机</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=50035182">大家电</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=50019142">个人护理/保健/按摩器材</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=50019393">闪存卡/U盘/移动存储</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=1801">美容护肤/美体/精油</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=50010788">彩妆/香水/美发/工具</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=50018121">国货精品/开架化妆品</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=21">居家日用/收纳/礼品</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=50035867">厨房/餐饮用具</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=50035458">日化/清洁/护理</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=50008163">床上用品/靠垫/毛巾/布艺</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=2128">家装饰品/窗帘/地毯</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=50008164">家具/家具定制/宜家代购</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=27">装潢/灯具/五金/安防/卫浴</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=50002766">零食/坚果/茶叶/特产</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=50035978">滋补/生鲜/速食/订餐</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=50008825">保健食品</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=35">奶粉/辅食/营养品</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=50006004">尿片/洗护/喂哺等用品</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=50005998">益智玩具/早教/童车床/出行</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=50008165">童装/童鞋/孕妇装</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=50010728">运动/瑜伽/健身/球迷用品</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=2203">户外/登山/野营/旅行</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=26">汽车/配件/改装/摩托/自行车</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=33">书籍/杂志/报纸</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=29">宠物/宠物食品及用品</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=34">音乐/影视/明星/音像</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=50039094">乐器/吉他/钢琴/配件</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=50007218">办公设备/文具/耗材</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=50015926">珠宝/钻石/翡翠/黄金</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=1705">饰品/流行首饰/时尚饰品</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=50005700">品牌手表/流行手表</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=25">玩具/模型/娃娃/人偶</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=23">古董/邮币/字画/收藏</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=28">ZIPPO/瑞士军刀/眼镜</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=50007216">鲜花速递/蛋糕配送/园艺花艺</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=50008075">演出/吃喝玩乐折扣券</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=50018963">酒店客栈/景点门票/度假旅游</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=50032886">网店/网络服务/个性定制/软件</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=50035966">成人用品/避孕/计生用品</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=50017708">网游装备/游戏币/帐号/代练</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=50008907">IP卡/网络电话/手机号码</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=99">网络游戏点卡</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=40">腾讯QQ专区</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a href="/search?cid=50004958">移动/联通/小灵通充值中心</a></li></ul></li>
					</ul>
				</div>
			</div>
		</div>
		</#if>
		</#if>
	</div>
</div>
<@p.pageFooter>
var PID='${pid}',KEYWORD='${q}',CID='${cid}';
$(function() {
<#if 'list'==view>
	$('#J_ListContent .small2big').tooltip({
		layout:'<div class="bigpic" style="position: absolute; display: none;"><span class="arrow" style="top: 36px; "></span></div>',
		position:'center right',
		offset:[89,0],
		onShow:function(){
			var tip = this.getTip();
			var a = tip.find('a');
			if(a.hasClass('loading')){
				var pic = tip.find('img');
				var src = pic.attr('pic'); 
				var img = new Image();
				img.onload = function() {
					a.removeClass('loading');
					pic.attr('src',src);
					var o = img.width;
					var p = img.height;
					if (o >= p && o > 220) {
						pic.width(220);
					} else {
					}
					if (p >= o && p > 220) {
						pic.height(220);
					}
				};
				img.src=src;
			}
		}
	});
</#if>	
		$('#J_Order').hover(function(){
			$('#J_OrderByList').show();
		},function(){
			$('#J_OrderByList').hide();
		});
		$('#filterLocation').hover(function(){
			$('.item-list',$(this)).show();
		},function(){
			$('.item-list',$(this)).hide();
		});
		<#if ''==state&&''==city>$('#filterLocation .loc1 li').addClass('checked');</#if>
		<#if state??&&state!=''>
		$('#filterLocation .loc4 li a').each(function(){
			if($(this).text()=='${state}'){
				$(this).parent().addClass('checked');
				return false;
			}
		});
		</#if>
		<#if city??&&city!=''>
		$('#filterLocation .loc2 li a,#filterLocation .loc3 li a').each(function(){
			if($(this).text()=='${city}'){
				$(this).parent().addClass('checked');
				return false;
			}
		});
		</#if>
		$('#J_CateToggler').click(function(){
			if($('span',this).text()=='显示全部分类'){
				$('#J_AllCates').show();
				$('span',this).text('收起');
			}else{
				$('#J_AllCates').hide();
				$('span',this).text('显示全部分类');
			}
			return false;
		});
		$('#J_PropToggler').click(function(){
			var a = $('a',this);
			if(a.hasClass('close')){
				$('#J_MoreProp').show();
				$('span',a).text('收起');
				a.removeClass('close').addClass('open');
			}else{
				$('#J_MoreProp').hide();
				$('span',a).text('更多');
				a.removeClass('open').addClass('close');
			}
			return false;
		});
		$('#J_FilterPrice').hover(function(){
			$(this).removeClass('price-selected').addClass('price-selected');
		},function(){
			$(this).removeClass('price-selected')
		});
			$('.prop-item .more').click(function(){
				if($(this).hasClass('close')){
				$(this).parent().find('.moreValue').show();
				$(this).text('收起').removeClass('close').addClass('open');
				}else{
				$(this).parent().find('.moreValue').hide();
				$(this).text('更多').removeClass('open').addClass('close');
				}
				return false;
			});
			$('#J_byPrice').click(function(){
			advanceItemsSearch('${q}','${nicks}','${cid}','${is_mall}','${order_by}','${state}','${city}',$('#start_price').val(),$('#end_price').val(),'${page_no}','${is_cod}','${post_free}');
			return false;
		});
		$('#J_SubmitBtn').click(function(){
			var q=$('#filterSearchKeyWord').val();
			if(!q){
				alert('请输入要查询的关键词');return;
			}
			var is_cod=$('#filterServiceCOD').attr('checked')?'true':'';
			var post_free=$('#filterServicePostFree').attr('checked')?'true':'';
			advanceItemsSearch(q,'${nicks}','${cid}','${is_mall}','${order_by}','${state}','${city}','${start_price}', '${end_price}','${page_no}',is_cod,post_free);
		});
		$('#filterSearchKeyWord').autocomplete({
			url : "http://suggest.taobao.com/sug?code=utf-8&extras=1&callback=XT.Suggest.FilterSearchCallback",
			filterResults : false,
			sortResults : false,
			showResult : function(value, data) {
				return '<span class="ks-suggest-key">' + value
						+ '</span><span class="ks-suggest-result">约' + data
						+ '个宝贝</span>';
			}
		});
		window.XT.Suggest.FilterSearchCallback = function(d) {
			var q = $('#filterSearchKeyWord');
			if (q.length == 1 && typeof d == "object" && typeof d.result != "undefined") {
				var r = d.result;
				// TODO 暂未写入缓存
				q.data('autocompleter').filterAndShowResults(r);
			}
		}
		<#if q??&&''!=q>
		$.getScript('http://suggest.taobao.com/sug?code=utf-8&extras=1&callback=XT.Suggest.RelatedSearchCallback&q='
				+ encodeURIComponent('${q}'));
		window.XT.Suggest.RelatedSearchCallback = function(d) {
			var related = $('#J_RelatedSearch');
			if (related.length == 1 && typeof d == "object"
					&& typeof d.result != "undefined") {
				var r = d.result;
				if (r.length > 0) {
					var strs = [];
					strs.push('<dt>你是不是想找：</dt>');
					for (var i = 0; i < r.length; i++) {
						strs.push('<dd><a class="J_RelatedSearchA">' + r[i][0]
								+ '</a></dd>');
					}
					related.append(strs.join(''));
					$('.J_RelatedSearchA', related).click(function() {
						advanceItemsSearch($(this).text(), '${nicks}', '${cid}',
								'${is_mall}', '${order_by}', '${state}', '${city}',
								'${start_price}', '${end_price}', '1','${is_cod}','${post_free}');
					});
					related.show();
				}
			}
		}
		</#if>
		});
function advanceItemsSearch(q, nicks, cid, is_mall, order_by, state, city,
		start_price, end_price, page_no,is_cod,post_free) {
	if (!q) {
		q = '';
	}
	if (!nicks) {
		nicks = '';
	}
	if (!cid) {
		cid = '';
	}
	if (!is_mall) {
		is_mall = '';
	}
	if (!order_by) {
		order_by = '';
	}
	if (!state) {
		state = '';
	}
	if (!city) {
		city = '';
	}
	if (!start_price) {
		start_price = '';
	}
	if (!end_price) {
		end_price = '';
	}
	if (!page_no) {
		page_no = 1;
	}
	if(!is_cod){
		is_cod='';
	}
	if(!post_free){
		post_free='';
	}
	document.location.href="/search?q="+encodeURIComponent(q)+"&cid="+cid+"&order_by="+order_by+"&is_mall="+is_mall+"&state="+encodeURIComponent(state)+"&city="+encodeURIComponent(city)+"&start_price="+start_price+"&end_price="+end_price+"&page_no="+page_no+"&is_cod="+is_cod+"&post_free="+post_free;
}
</@p.pageFooter>
