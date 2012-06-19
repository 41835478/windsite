<#setting number_format="0.##">
<script type="text/javascript">
	$(function() {
		//$("a.fb").fancybox();
		$(".bb-pic img").bind("error",function(){ 
			this.src="http://static.xintaonet.com/assets/min/images/nopicture.gif"; 
		});
		//$(".bb-pic img").lazyload({ 
		//	placeholder : "/assets/images/loadingImg.gif",
		//	effect : "fadeIn" 
		//}); 
		$("input[name='items']").change(function() {
			if ($(this).is(':checked')) {
				addSelectedItem($(this));
			} else {
				removeSelectedItem($(this).val());
			}
		}).hover(function(){
			var position = $(this).position();
			//$('#single-info').hide();
			$('#selected-items-warn').css({
				top : position.top - 20,
				left : position.left - 160
			}).show();
		});
		$("#checkAllItems").change(function(){
			$('#single-info').hide();
			if($(this).is(":checked")){
				$("input[name='items']").each(function(){
					if($(this).attr("checked")===false){
						$(this).attr("checked",true);
						return addSelectedItem($(this));
					}
				});
			}else{
				$("input[name='items']").each(function(){
					if($(this).attr("checked")===true){
						$(this).attr("checked",false);
						removeSelectedItem($(this).val());
					}
				});
			}
		});
		$('.pre-page').button().click(function(){
			if(!$(this).hasClass('ui-button-disabled')){
				page.setPageNo(page.getPrePage());
				itemsSearch();
			}
		});
		$('.next-page').button().click(function(){
			if(!$(this).hasClass('ui-button-disabled')){
				page.setPageNo(page.getNextPage());
				itemsSearch();
			}
		});
		$('#jumpPageSearch').change(function(){
			page.setPageNo($(this).val());
			itemsSearch();
		});
		$('#items-sort').val(items_sort);
		$('#items-sort').change(function(){
			itemsSearch();
		});
		<#if totalResults??>
			$("#resultSpan").text("${totalResults}");
			$("#searchDesc").show();
			if(page==null){
				page=new Page(parseInt(${totalResults}));
				page.setPageSize(30);
			}else{
				page.setTotalCount(parseInt(${totalResults}));
			}
			$('.page-totalPage').text(page.getTotalPageCount());
			for(var i=0;i<page.getTotalPageCount();i++){
				if(i==100){
					break;
				}
				$('#jumpPageSearch').append('<option value="'+(i+1)+'">'+(i+1)+'</option>');
			}
			if(page.isHasPrePage()){
				$('.pre-page').button('enable');
			}else{
				$('.pre-page').button('disable');
			}
			if(page.isHasNextPage()){
				$('.next-page').button('enable');
			}else{
				$('.next-page').button('disable');
			}
			$('.page-pageNo').text(page.getPageNo());
			$('#jumpPageSearch').val(page.getPageNo());
		</#if>
	});	
</script>
<style>
.bb-info{
	width:350px;
	height:85px;
}
.bb-selectbox{
	margin:30px 0px 30px 0px;
	float:left;
	width:20px;
}
.bb-pic{
	float:left;
	width:90px;
}
.bb-disc{
	float:left;
	width:230px;
}
.pre-page{
	
}
.items-pages .ui-button-text{
	padding-top:0px;
	padding-bottom:0px;
}
.ads-items{background:#FFF8E7;}.wTable td{line-height:20px;}
span.rcomicon{background-image: url(http://static.xintaonet.com/assets/min/images/ads-items.gif);background-repeat: no-repeat;background-position: 0px -75px;display: inline-block;height: 15px;width: 35px;}
</style>
<table class="items-pages" width="500px" height="20px">
	<TR>
		<td height="20px" align="left" valign="bottom">
		共<span class="page-totalPage" style="color:#D02200";font-size:10pt;font-weight:bold; ></span>页,当前第<span class="page-pageNo" style="color:#D02200;font-size:10pt;font-weight:bold;" ></span>页
		<button class="pre-page" style="padding:0px;">上一页</button>&nbsp&nbsp;
		<button class="next-page" style="padding:0px;">下一页</button>&nbsp&nbsp;
		</td>
		<td height="20px" align="left" valign="bottom">
		<select id="jumpPageSearch"></select>
		</td>
		<td height="20px" align="left" valign="bottom">
		<select id="items-sort">
			<option value="default">默认</option>
			<option value="price_asc">价格由低到高</option>
			<option value="price_desc">价格由高到低</option>
			<option value="credit_desc">信用等级从高到低</option>
			<option value="commissionRate_desc">佣金比率从高到低</option>
			<option value="commissionRate_asc">佣金比率从低到高</option>
			<option value="commissionNum_desc">成交量从高到低</option>
			<option value="commissionNum_asc">成交量从低到高</option>
			<option value="commissionVolume_desc">总支出佣金从高到低</option>
			<option value="commissionVolume_asc">总支出佣金从低到高</option>
			<option value="delistTime_desc" selected>商品下架时间从高到低</option>
			<option value="delistTime_asc">商品下架时间从低到高</option>
		</select>
		</td>
	</TR>
</table>
<TABLE id="itemsTable" class="wTable" width="100%" border="0" cellspacing="1" cellpadding="1">
	<THEAD>
		<TR>
			<TH width=350px align=left><input type="checkbox" id="checkAllItems"/>全选&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;商品推广信息</TH>
			<TH width=60px>单价</TH>
			<TH width=80px>佣金比率</TH>
			<TH width=80px>佣金(元)</TH>
			<TH width=110px>30天支出佣金(元)</TH>
			<TH width=110px>30天总销量(件)</TH>
			<TH>30天推广量(件)</TH>
		</TR>
	</THEAD>
	<TBODY>
	<#if aditems??>
	<#if aditems?size!=0>
		<#list aditems as i>
			<TR  style="font-weight: bold;" class="ads-items">
				<TD>
					<div class="bb-info">
						<div class="bb-selectbox">
							<input type="checkbox" num_iid="${i.num_iid}" shop_click_url="${i.shop_click_url}" seller_credit_score="${i.seller_credit_score}" item_location="${i.item_location}" volume="${i.volume}" title="${i.title}" nick="${i.nick}" pic_url="${i.pic_url}" price="${i.price}" click_url="${i.click_url}" commission="${i.commission}" commission_rate="${i.commission_rate}" commission_num="${i.commission_num}" commission_volume="${i.commission_volume}" name="items" value="${i.num_iid}"/>
						</div>
						<div class="bb-pic" align="center"><a href="${i.click_url}" onClick="_gaq.push(['_trackEvent', 'xt-${USER.pid}', 'item-d-${i.nick}-${i.num_iid}', '${i.title}']);" class="fb"  rel="group" target="_blank"><img src="${i.pic_url?replace('bao/uploaded', 'imgextra')}_80x80.jpg" alt="${i.title}"/></a></div>
						<div class="bb-disc">
							<ul style="list-style-type:none">
								<li><span class="rcomicon" title="新淘推荐"></span><a href="${i.click_url}" onClick="_gaq.push(['_trackEvent', 'xt-${USER.pid}', 'item-d-${i.nick}-${i.num_iid}', '${i.title}']);" style="color:#00E;" target="_blank">${i.title}</a></li>
								<li><a href="${i.shop_click_url}" target="_blank">掌柜:${i.nick}</a></li>
							</ul>	
						</div>
					</div>
				</TD>
				<TD align="right">${i.price}元</TD>
				<TD align="right"><font color="#D02200">${(i.commission_rate?number)/100}%</TD>
				<TD align="right"><font color="#D02200">${i.commission}</font>元</TD>
				<TD align="right"><font color="#D02200">${i.commission_volume}</font>元</TD>
				<TD align="center"><font color="green">${i.volume}</font></TD>
				<TD align="center"><font color="green">${i.commission_num}</font></TD>
			</TR>
		</#list>
	</#if>
	</#if>
	<#if items??>
	<#if items?size!=0>
		<#list items as i>
			<TR  style="font-weight: bold;" class="<#if i_index%2==0>odd<#else>even</#if>">
				<TD>
					<div class="bb-info">
						<div class="bb-selectbox">
							<input type="checkbox" num_iid="${i.numIid}" shop_click_url="${i.shopClickUrl}" seller_credit_score="${i.sellerCreditScore}" item_location="${i.itemLocation}" volume="${i.volume}" title="${i.title}" nick="${i.nick}" pic_url="${i.picUrl}" price="${i.price}" click_url="${i.clickUrl}" commission="${i.commission}" commission_rate="${i.commissionRate}" commission_num="${i.commissionNum}" commission_volume="${i.commissionVolume}" name="items" value="${i.num_iid}"/>
						</div>
						<div class="bb-pic" align="center"><a href="${i.clickUrl}" onClick="_gaq.push(['_trackEvent', 'xt-${USER.pid}', 'item-d-${i.nick}-${i.numIid}', '${i.title}']);"  class="fb"  rel="group" target="_blank"><img src="${i.picUrl?replace('bao/uploaded', 'imgextra')}_80x80.jpg" alt="${i.title}"/></a></div>
						<div class="bb-disc">
							<ul style="list-style-type:none">
								<li><a href="${i.clickUrl}"  onClick="_gaq.push(['_trackEvent', 'xt-${USER.pid}', 'item-d-${i.nick}-${i.numIid}', '${i.title}']);" style="color:#00E;" target="_blank">${i.title}</a></li>
								<li><a href="${i.shopClickUrl}" target="_blank">掌柜:${i.nick}</a></li>
							</ul>	
						</div>
					</div>
				</TD>
				<TD align="right">${i.price}元</TD>
				<TD align="right"><font color="#D02200">${(i.commissionRate?number)/100}%</TD>
				<TD align="right"><font color="#D02200">${i.commission}</font>元</TD>
				<TD align="right"><font color="#D02200">${i.commissionVolume}</font>元</TD>
				<TD align="center"><font color="green">${i.volume}</font></TD>
				<TD align="center"><font color="green">${i.commissionNum}</font></TD>
			</TR>
		</#list>
		<#else>
		<tr><td colspan=7 align="center"><h3>抱歉，暂无商品</h3></td>
		</tr>
	</#if>
	</#if>
	</TBODY>
</TABLE>
<table class="items-pages" width="400px" height="20px">
	<TR>
		<td height="20px" align="left" valign="bottom">
		共<span class="page-totalPage" style="color:#D02200;font-size:10pt;font-weight:bold; "></span>页,当前第<span class="page-pageNo" style="color:#D02200;font-size:10pt;font-weight:bold;" ></span>页
		<button class="pre-page" style="padding:0px;">上一页</button>&nbsp&nbsp;
		<button class="next-page" style="padding:0px;">下一页</button>
		</td>
	</TR>
</table>