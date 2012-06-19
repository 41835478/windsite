<#setting number_format="0.##">
<script type="text/javascript">
	$(function() {
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
		$('#J_byAll').click(function(){
			advanceItemsSearch('${q}','${nicks}','${cid}','','${order_by}','${state}','${city}','${start_price}','${end_price}','${page_no}');
			return false;
		});
		$('#J_byMall').click(function(){
			advanceItemsSearch('${q}','${nicks}','${cid}','true','${order_by}','${state}','${city}','${start_price}','${end_price}','${page_no}');
			return false;
		});
		$('#J_OrderByList li a').click(function(){
			advanceItemsSearch('${q}','${nicks}','${cid}','${is_mall}',$(this).attr('order'),'${state}','${city}','${start_price}','${end_price}','${page_no}');
			return false;
		});
		$('.cate-panel dd a').click(function(){
			advanceItemsSearch('${q}','${nicks}',$(this).attr('cid'),'${is_mall}','${order_by}','${state}','${city}','${start_price}','${end_price}','${page_no}');
			return false;
		});
		$('#J_byCredit').click(function(){
			advanceItemsSearch('${q}','${nicks}','${cid}','${is_mall}','seller_credit:desc','${state}','${city}','${start_price}','${end_price}','${page_no}');
			return false;
		});
		$('#J_byPriceAsc').click(function(){
			advanceItemsSearch('${q}','${nicks}','${cid}','${is_mall}','price:asc','${state}','${city}','${start_price}','${end_price}','${page_no}');
			return false;
		});
		$('#J_byPriceDesc').click(function(){
			advanceItemsSearch('${q}','${nicks}','${cid}','${is_mall}','price:desc','${state}','${city}','${start_price}','${end_price}','${page_no}');
			return false;
		});
		$('#J_bySaleDesc').click(function(){
			advanceItemsSearch('${q}','${nicks}','${cid}','${is_mall}','volume:desc','${state}','${city}','${start_price}','${end_price}','${page_no}');
			return false;
		});
		$('#J_byPrice').click(function(){
			advanceItemsSearch('${q}','${nicks}','${cid}','${is_mall}','${order_by}','${state}','${city}',$('#start_price').val(),$('#end_price').val(),'${page_no}');
			return false;
		});
		<#if ''==state&&''==city>$('#filterLocation .loc1 li').addClass('checked');</#if>
		$('#filterLocation .loc1 li a').click(function(){
			advanceItemsSearch('${q}','${nicks}','${cid}','${is_mall}','${order_by}','','','${start_price}','${end_price}','${page_no}');
			return false;
		});
		<#if state??&&state!=''>
		$('#filterLocation .loc4 li a').each(function(){
			if($(this).text()=='${state}'){
				$(this).parent().addClass('checked');
				return false;
			}
		});
		</#if>
		$('#filterLocation .loc4 li a').click(function(){
			advanceItemsSearch('${q}','${nicks}','${cid}','${is_mall}','${order_by}',$(this).text(),'','${start_price}','${end_price}','${page_no}');
			return false;
		});
		<#if city??&&city!=''>
		$('#filterLocation .loc2 li a,#filterLocation .loc3 li a').each(function(){
			if($(this).text()=='${city}'){
				$(this).parent().addClass('checked');
				return false;
			}
		});
		</#if>
		$('#filterLocation .loc2 li a,#filterLocation .loc3 li a').click(function(){
			advanceItemsSearch('${q}','${nicks}','${cid}','${is_mall}','${order_by}','',$(this).text(),'${start_price}','${end_price}','${page_no}');
			return false;
		});
		$('.close').click(function(){
			if($('span',this).text()=='显示全部分类'){
				$('#J_AllCates').show();
				$('span',this).text('收起');
			}else{
				$('#J_AllCates').hide();
				$('span',this).text('显示全部分类');
			}
		});
		$('#J_FilterPrice').hover(function(){
			$(this).removeClass('price-selected').addClass('price-selected');
		},function(){
			$(this).removeClass('price-selected')
		});
		$('.page-number').click(function(){
			advanceItemsSearch('${q}','${nicks}','${cid}','${is_mall}','${order_by}','${state}','${city}','${start_price}','${end_price}',$('a',$(this)).text());
			return false;
		});
		$('.pgNext').click(function(){
			if(!$(this).hasClass('pgEmpty')){
				advanceItemsSearch('${q}','${nicks}','${cid}','${is_mall}','${order_by}','${state}','${city}','${start_price}','${end_price}',$(this).attr('page'));
			}
			return false;
		});
		$('#checkAllItems').change(function(){
			$('#itemsTable input[type="checkbox"][name="items"]').attr('checked',$(this).attr('checked'));
		});
		$('#J_addGroup').click(function(){
			var checkeds = $('#itemsTable input[type="checkbox"][name="items"]:checked');
			if(checkeds.length==0){
				alert('您尚未选中要加入的推广商品');return false;
			}
			var checkedArray=[];
			checkeds.each(function(){
				checkedArray.push($(this).val());
			});
			openMyItemGroupByItem(checkedArray);
			return false;
		});
	});	
</script>
<style>
.bb-info{width:350px;height:85px;}.bb-selectbox{margin:30px 0px 30px 0px;float:left;width:20px;}.bb-pic{float:left;width:90px;}.bb-disc{float:left;width:230px;}.bb-disc a{color:#0063DC;}.bb-disc a:hover{color:#F60;}
</style>
<div class="search-nav"><ul class="crumbs"><li class="list-item"><a href="" onClick="advanceItemsSearch('${q}','${nicks}','0','${is_mall}','${order_by}','${state}','${city}','${start_price}','${end_price}','${page_no}');return false;">所有分类</a>&nbsp;&nbsp;&nbsp;&nbsp;找到相关宝贝<em>${totalResults}</em>件。<span style="color: #AC7E35;">请注意<a href="http://club.alimama.com/read.php?tid=372124" target="_blank">推广宝贝若为虚拟物品</a>，无法获取佣金，请重新选择宝贝！</span></li></ul></div>
<#if categories??&&(categories?size!=0)>
<#assign length=categories?size-1>
<#if (length>7)>
	<#assign length=7>
</#if>
<div class="navigation " id="J_Navgation" _title="智能类目导航区" _detail="分类不再需要一步步点击，相关的热门分类直接呈现">
<div class="cate-panel hierarchy-cate" id="J_HierarchyCate"><dl><#list categories[0..length] as c><dd><a  cid="${c.categoryId}" title="${c.name}">${c.name}</a>(${c.count})</dd></#list></dl></div>
<#if (categories?size>8)>
<div class="cate-panel all-cate" id="J_AllCates" style="display:none"><dl><#list categories[8..(categories?size-1)] as c><dd><a  cid="${c.categoryId}" title="${c.name}">${c.name}</a>(${c.count})</dd></#list></dl></div>
<div count="" class="show-more cate-toggler" id="J_CateToggler"><div class="inner"><a href="#" class="close"><span>显示全部分类</span></a></div></div>
</#if>
</div>
</#if>
<div class="filter" id="J_Filter">
	<ul class="filter-tabbar" id="J_FilterTabBar">
		<#assign mall=false>
		<#if is_mall??&&is_mall=='true'>
		<#assign mall=true>
		</#if>
		<li <#if !mall>class="selected"</#if> data-idx="1"><span class="l"></span><span class="r"></span><a href="" title="" id="J_byAll">所有宝贝</a></li>
		<li <#if mall>class="selected"</#if> data-idx="10"><span class="l"></span><span class="r"></span><a href="" title="" id="J_byMall">淘宝商城</a></li>
		<li class="pagination">
		<div class="page-top">
			<#assign totalPageCount=page.totalPageCount>
			<#if (totalPageCount>100)><#assign totalPageCount=100></#if>
			<@ws.pager pageNo=(page.pageNo?number) pageSize=page.pageSize?number pageCount=totalPageCount></@ws.pager>
		</div></li>
	</ul>
	<div class="toolbarWrapper" _float="0">
	<#assign orderdesc='' ordertext='默认排序'>
	<#if order_by=='seller_credit:desc'><#assign orderdesc='by-credit-desc' ordertext='信用从高到低'>
	<#elseif order_by=='price:desc'><#assign orderdesc='by-price-desc' ordertext='价格从高到低'>
	<#elseif order_by=='price:asc'><#assign orderdesc='by-price-asc' ordertext='价格从低到高'>
	<#elseif order_by=='volume:desc'><#assign orderdesc='by-sale-desc' ordertext='销量从高到低'>
	</#if>
		<ul class="toolbar" id="J_FilterToolbar">
			<li class="">
				<a id="J_addGroup" href=""><span style="color:red;font-weight:bold;">放入已有推广组</span></a>
				<!--<a id="J_addTemp" href=""><span style="color:#f60;font-weight:bold;">放入暂存架</span></a>-->
			</li>
			<li class="order hoverMenu ${orderdesc}" id="J_Order">
				<span class="title">排序 </span>
				<a id="J_OrderSelector" href="" class="select-item  order-by"><span><span>${ordertext}</span></span></a>
				<ul class="order-options item-list" id="J_OrderByList">
				<li class="by-price-asc"><a order="price:asc">价格从低到高</a></li>
				<li class="by-price-desc"><a order="price:desc">价格从高到低</a></li>
				<li class="by-credit-desc"><a order="seller_credit:desc">信用从高到低</a></li>
				<li class="by-sale-desc"><a order="volume:desc">销量从高到低</a></li>
				<li class="by-default selected"><a order="">恢复默认排序</a></li>
			</ul>
			</li>
			<li class="order ${orderdesc}">
				<a href="" class="by-credit" id="J_byCredit" title="点击按照信用从高到低排序"><span>按信用排序</span></a>
				<a href="" <#if order_by=='price:desc'>id="J_byPriceAsc"<#else>id="J_byPriceDesc"</#if> title="点击按照价格（<#if order_by=='price:desc'>价格由低到高<#else>价格由高到低</#if>）重新排序" class="by-price"><span>按价格排序</span></a>
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
					<ul class="loc1"><li><a href="">所有地区</a></li></ul>
					<ul class="loc2 split"><li><a href="">北京</a></li><li><a href="">上海</a></li><li><a href="">广州</a></li><li><a href="">深圳</a></li></ul>
					<ul class="loc3"><li><a href="">杭州</a></li><li><a href="">温州</a></li><li><a href="">宁波</a></li><li><a href="">南京</a></li><li><a href="">苏州</a></li><li><a href="">济南</a></li><li><a href="">青岛</a></li><li><a href="">大连</a></li><li><a href="">无锡</a></li><li><a href="">合肥</a></li><li><a href="">天津</a></li><li><a href="">长沙</a></li><li><a href="">武汉</a></li><li><a href="">郑州</a></li><li><a href="">石家庄</a></li><li><a href="">成都</a></li><li><a href="">重庆</a></li><li><a href="">西安</a></li><li><a href="">昆明</a></li><li><a href="">南宁</a></li><li><a href="">福州</a></li><li><a href="">厦门</a></li><li><a href="">南昌</a></li><li><a href="">东莞</a></li><li><a href="">沈阳</a></li><li><a href="">长春</a></li><li><a href="">哈尔滨</a></li></ul>
					<ul class="loc4 split"><li><a href="">安徽</a></li><li><a href="">福建</a></li><li><a href="">甘肃</a></li><li><a href="">广东</a></li><li><a href="">广西</a></li><li><a href="">贵州</a></li><li><a href="">海南</a></li><li><a href="">河北</a></li><li><a href="">河南</a></li><li><a href="">湖北</a></li><li><a href="">湖南</a></li><li><a href="">江苏</a></li><li><a href="">黑龙江</a></li><li><a href="">江西</a></li><li><a href="">吉林</a></li><li><a href="">辽宁</a></li><li><a href="">内蒙古</a></li><li><a href="">宁夏</a></li><li><a href="">青海</a></li><li><a href="">山东</a></li><li><a href="">山西</a></li><li><a href="">陕西</a></li><li><a href="">四川</a></li><li><a href="">西藏</a></li><li><a href="">新疆</a></li><li><a href="">云南</a></li><li><a href="">浙江</a></li><li><a href="">香港</a></li><li><a href="">澳门</a></li><li><a href="">台湾</a></li></ul>
				</div>
			</li>
			<li class="order ${orderdesc}">
				<a href="" _detail="轻松了解淘友买的最多宝贝是哪些，挑选最热卖宝贝" id="J_bySaleDesc" _title="销量排序" _pos="bottom" class="by-sale" title="点击按照销量从高到低排序"><span>按销量排序</span></a>
			</li>
		</ul>
	</div>
</div>

<TABLE id="itemsTable" class="wTable" width="100%" border="0" cellspacing="1" cellpadding="1">
	<THEAD>
		<TR>
			<TH width=350px align=left><input type="checkbox" id="checkAllItems"/>全选&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;商品推广信息</TH>
			<TH width=80px>单价</TH>
			<TH width=80px>佣金(元)</TH>
			<TH width=100px>30天总销量(件)</TH>
			<TH>30天推广量(件)</TH>
		</TR>
	</THEAD>
	<TBODY>
	<#if items??&&items?size!=0>
	<#assign site=USER.sites[0]>
		<#list items as i>
			<TR  style="font-weight: bold;" class="<#if i_index%2==0>odd<#else>even</#if>">
				<TD>
					<div class="bb-info">
						<div class="bb-selectbox">
							<input type="checkbox" name="items" value="${i.numIid}"/>
						</div>
						<div class="bb-pic" align="center"><a href="${i.clickUrl}" onClick="_gaq.push(['_trackEvent', 'xt-${USER.pid}', 'item-d-${i.nick}-${i.numIid}', '${i.title}']);"  class="fb"  rel="group" target="_blank"><img src="${i.picUrl?replace('bao/uploaded', 'imgextra')}_80x80.jpg" alt="${i.title}"/></a></div>
						<div class="bb-disc">
							<ul style="list-style-type:none">
								<li><a href="${i.clickUrl}"  onClick="_gaq.push(['_trackEvent', 'xt-${USER.pid}', 'item-d-${i.nick}-${i.numIid}', '${i.title}']);" target="_blank">${i.title}</a></li>
								<li><a href="${i.shopClickUrl}" style="color:#555;font-weight:normal;" target="_blank">掌柜:${i.nick}</a></li>
								<li style="position:relative;">信用:<img src="http://static.xintaonet.com/assets/min/images/credit/<@ws.credit i.sellerCreditScore></@ws.credit>.gif"/><a style="color:#f60;position:absolute;right:0px;" href="#" xtUrl="http://<#if site.www??&&site.www!=''>${site.www}<#else>${site.domainName}.xintaonet.com</#if>/titem/${i.numIid}.html" mamaUrl="${i.clickUrl}" onClick="openItemAdsDialog($(this));return false;">推广此商品</a></li>
							</ul>	
						</div>
					</div>
				</TD>
				<TD align="right">${i.price}元</TD>
				<TD align="right"><font color="#D02200">${i.commission}</font>元</TD>
				<TD align="center"><font color="green">${i.volume}</font></TD>
				<TD align="center"><font color="green">${i.commissionNum}</font></TD>
			</TR>
		</#list>
	<#else>
		<tr><td colspan=5 align="center"><h3>抱歉，没有搜索到符合条件的商品</h3></td>
		</tr>
	</#if>
	</TBODY>
</TABLE>
<table class="items-pages" width="750px" height="20px">
	<TR>
		<td height="20px" width="220px" align="left" valign="bottom">
		当前页共隐藏<span style="color:#D02200;font-size:10pt;font-weight:bold;" >${invalidCount}</span>条非推广商品
		</td>
		<td><div style="float:right;"><@ws.pager pageNo=(page.pageNo?number) pageSize=page.pageSize?number pageCount=totalPageCount></@ws.pager></div></td>
	</TR>
</table>