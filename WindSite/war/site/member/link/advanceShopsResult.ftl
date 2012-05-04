<#setting number_format="0.##">
<script type="text/javascript">
	$(function() {
		$('#J_FilterButton').click(function(){
			var start_credit =$('#start_credit').val();
			var end_credit =$('#end_credit').val();
			var start_commissionrate =$('#start_commissionrate').val();
			var end_commissionrate =$('#end_commissionrate').val();
			if($('#start_credit').attr('score')>$('#end_credit').attr('score')){
				alert('结束信用必须大于开始信用');return false;
			}
			if(start_commissionrate){
				start_commissionrate=start_commissionrate*100;
			}
			if(end_commissionrate){
				end_commissionrate=end_commissionrate*100;
			}
			advanceShopsSearch('${q}','${cid}','',start_credit,end_credit,start_commissionrate,end_commissionrate,'${start_totalaction}','${end_totalaction}','${page_no}');
		});
		<#if start_credit??&&''!=start_credit>$('#start_credit').val('${start_credit}');</#if>
		<#if end_credit??&&''!=end_credit>$('#end_credit').val('${end_credit}');</#if>
		<#if start_commissionrate??&&''!=start_commissionrate>$('#start_commissionrate').val('${start_commissionrate?number/100}');</#if>
		<#if end_commissionrate??&&''!=end_commissionrate>$('#end_commissionrate').val('${end_commissionrate?number/100}');</#if>
		$('#J_byAll').click(function(){
			advanceShopsSearch('${q}','${cid}','','${start_credit}','${end_credit}','${start_commissionrate}','${end_commissionrate}','${start_totalaction}','${end_totalaction}','${page_no}');
			return false;
		});
		$('#J_byMall').click(function(){
			alert('稍后开放');
			//advanceShopsSearch('${q}','${cid}','true','${start_credit}','${end_credit}','${start_commissionrate}','${end_commissionrate}','${start_totalaction}','${end_totalaction}','${page_no}');
			return false;
		});
		$('.page-number').click(function(){
			advanceShopsSearch('${q}','${cid}','${only_mall}','${start_credit}','${end_credit}','${start_commissionrate}','${end_commissionrate}','${start_totalaction}','${end_totalaction}',$('a',$(this)).text());
			return false;
		});
		$('.pgNext').click(function(){
			if(!$(this).hasClass('pgEmpty')){
				advanceShopsSearch('${q}','${cid}','${only_mall}','${start_credit}','${end_credit}','${start_commissionrate}','${end_commissionrate}','${start_totalaction}','${end_totalaction}',$(this).attr('page'));
			}
			return false;
		});
		$('#checkAllShops').change(function(){
			$('#shopsTable input[type="checkbox"][name="shops"]').attr('checked',$(this).attr('checked'));
		});
		$('#J_addGroup').click(function(){
			var checkeds = $('#shopsTable input[type="checkbox"][name="shops"]:checked');
			if(checkeds.length==0){
				alert('您尚未选中要加入的推广店铺');return false;
			}
			var checkedArray=[];
			checkeds.each(function(){
				checkedArray.push($(this).val());
			});
			openMyShopGroupByShop(checkedArray);
			return false;
		});
	});	
</script>
<div class="search-nav"><ul class="crumbs"><li class="list-item">找到相关店铺<em style="font-weight:700;color:red;">${page.totalCount}</em>个。<span style="color: #AC7E35;">请注意：该功能仅查询加入淘宝客推广的淘宝店铺！</span></li></ul></div>
<div class="filter" id="J_Filter">
	<ul class="filter-tabbar" id="J_FilterTabBar">
		<#assign mall=false>
		<#if only_mall??&&only_mall=='true'>
		<#assign mall=true>
		</#if>
		<li <#if !mall>class="selected"</#if> data-idx="1"><span class="l"></span><span class="r"></span><a href="" title="" id="J_byAll">所有店铺</a></li>
		<li <#if mall>class="selected"</#if> data-idx="10"><span class="l"></span><span class="r"></span><a href="" title="" id="J_byMall">商城</a></li>
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
				<a id="J_addGroup" href=""><span style="font-size:16px;color:red;font-weight:bold;">放入店铺分组</span></a>
				<!--<a id="J_addTemp" href=""><span style="color:#f60;font-weight:bold;">放入暂存架</span></a>-->
			</li>
			<li>信用：从<select id="start_credit">
						<option value="5goldencrown" score="20">五黄冠</option>
						<option value="4goldencrown" score="19">四黄冠</option>
						<option value="3goldencrown" score="18">三黄冠</option>
						<option value="2goldencrown" score="17">二黄冠</option>
						<option value="1goldencrown" score="16">一黄冠</option>
						<option value="5crown" score="15">五冠</option>
						<option value="4crown" score="14">四冠</option>
						<option value="3crown" score="13">三冠</option>
						<option value="2crown" score="12">二冠</option>
						<option value="1crown" score="11">一冠</option>
						<option value="5diamond" score="10">五钻</option>
						<option value="4diamond" score="9">四钻</option>
						<option value="3diamond" score="8">三钻</option>
						<option value="2diamond" score="7">二钻</option>
						<option value="1diamond" score="6">一钻</option>
						<option value="5heart" score="5">五心</option>
						<option value="4heart" score="4">四心</option>
						<option value="3heart" score="3">三心</option>
						<option value="2heart" score="2">两心</option>
						<option value="1heart" score="1" selected>一心</option>
						</select>
					到<select id="end_credit">
						<option value="5goldencrown" score="20" selected>五黄冠</option>
						<option value="4goldencrown" score="19">四黄冠</option>
						<option value="3goldencrown" score="18">三黄冠</option>
						<option value="2goldencrown" score="17">二黄冠</option>
						<option value="1goldencrown" score="16">一黄冠</option>
						<option value="5crown" score="15">五冠</option>
						<option value="4crown" score="14">四冠</option>
						<option value="3crown" score="13">三冠</option>
						<option value="2crown" score="12">二冠</option>
						<option value="1crown" score="11">一冠</option>
						<option value="5diamond" score="10">五钻</option>
						<option value="4diamond" score="9">四钻</option>
						<option value="3diamond" score="8">三钻</option>
						<option value="2diamond" score="7">二钻</option>
						<option value="1diamond" score="6">一钻</option>
						<option value="5heart" score="5">五心</option>
						<option value="4heart" score="4">四心</option>
						<option value="3heart" score="3">三心</option>
						<option value="2heart" score="2">两心</option>
						<option value="1heart" score="1">一心</option>
					</select>
			</li>
			<li>佣金比率：从<input type="text" id="start_commissionrate" size=5/>到<input size=5 id="end_commissionrate"/>%</li>
			<li><input type="button" value="筛选结果" id="J_FilterButton" style="padding:2px;"></li>
		</ul>
	</div>
</div>

<TABLE id="shopsTable" class="wTable" width="100%" border="0" cellspacing="1" cellpadding="1">
	<THEAD>
		<TR>
			<TH width=350px align=left><input type="checkbox" id="checkAllShops"/>全选&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;店铺推广信息</TH>
			<TH width=160px>佣金比率</TH>
			<TH>商品总量</TH>
			<TH width=100px>累计推广量(件)</TH>
		</TR>
	</THEAD>
	<TBODY>
	<#if shops??&&shops?size!=0>
	<#assign site=USER.sites[0]>
		<#list shops as s>
			<#assign isExtra=false local={}>
			<#if extra[s.userId+'']??><#assign isExtra=true local=extra[s.userId+'']></#if>
			<TR  style="font-weight: bold;" class="<#if s_index%2==0>odd<#else>even</#if>">
				<TD>
					<div class="bb-info">
						<div class="bb-selectbox">
							<input type="checkbox" name="shops" value="${s.userId}"/>
						</div>
						<div class="bb-pic" align="center"><a href="${s.clickUrl}" <#if isExtra&&local.sid??>onClick="_gaq.push(['_trackEvent', 'xt-${USER.pid}', 'shop-d-${local.sid}', '${s.shopTitle}']);"</#if> target="_blank"><img src="<#if isExtra&&local.picPath??>http://logo.taobao.com/shop-logo${local.picPath}<#else><#if s.shopType=='C'>http://img02.taobaocdn.com/tps/i2/T1nB0EXnBwXXXXXXXX-80-80.png<#else>http://img03.taobaocdn.com/tps/i3/T1N.tyXcNpXXXXXXXX-70-70.png</#if></#if>" alt="${s.shopTitle}" width=70px height=70px onerror="javascript:this.src='http://img02.taobaocdn.com/tps/i2/T1nB0EXnBwXXXXXXXX-80-80.png'"/></a></div>
						<div class="bb-disc">
							<ul style="list-style-type:none">
								<li><a href="${s.clickUrl}"  <#if isExtra&&local.sid??>onClick="_gaq.push(['_trackEvent', 'xt-${USER.pid}', 'shop-d-${local.sid}', '${s.shopTitle}']);"</#if> target="_blank">${s.shopTitle}</a></li>
								<#if isExtra><li><a href="${s.clickUrl}" <#if local.sid??>onClick="_gaq.push(['_trackEvent', 'xt-${USER.pid}', 'shop-d-${local.sid}', '${s.shopTitle}']);"</#if> style="color:#555;font-weight:normal;" target="_blank">掌柜:${local.nick}</a></li></#if>
								<li style="position:relative;"><#if s.sellerCredit??&&''!=s.sellerCredit>信用:<img src="/assets/min/stylesheets/images/${s.sellerCredit}.gif"/></#if><a style="color:#f60;position:absolute;right:0px;" href="#" xtUrl="<#if isExtra>http://<#if site.www??&&site.www!=''>${site.www}<#else>${site.domainName}.xintaonet.com</#if>/tshop/${local.sid}.html</#if>" mamaUrl="${s.clickUrl}" onClick="openItemAdsDialog($(this));return false;">推广此店铺</a></li>
							</ul>	
						</div>
					</div>
				</TD>
				<TD align="center">${s.commissionRate}%</TD>
				<TD align="center"><font color="#D02200">${s.auctionCount}</font></TD>
				<TD align="center"><font color="green">${s.totalAuction}</font></TD>
			</TR>
		</#list>
	<#else>
		<tr><td colspan=4 align="center"><h3>抱歉，没有搜索到符合条件的店铺</h3></td>
		</tr>
	</#if>
	</TBODY>
</TABLE>