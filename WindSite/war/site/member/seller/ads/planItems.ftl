<#setting number_format="0.##"> 
<TABLE id="itemsTable" class="wTable" width="100%" border="0" cellspacing="1" cellpadding="1">
	<THEAD>
		<TR>
			<TH width=350px>商品推广信息</TH>
			<TH width=80px>单价</TH>
			<TH width=80px>佣金(元)</TH>
			<TH width=100px>30天总销量(件)</TH>
			<TH>30天推广量(件)</TH>
		</TR>
	</THEAD>
	<TBODY>
	<#if items??&&items?size!=0>
		<#list items as i>
			<TR style="font-weight: bold;">
				<TD>
					<div class="bb-info">
						<div class="bb-pic" align="center"><a href="${i.click_url}" onClick="_gaq.push(['_trackEvent', 'xt-${USER.pid}', 'item-d-${i.nick}-${i.num_iid}', '${i.title}']);"  target="_blank"><img src="${i.pic_url?replace('bao/uploaded', 'imgextra')}_80x80.jpg" alt="${i.title}"/></a></div>
						<div class="bb-disc">
							<ul style="list-style-type:none">
								<li><a href="${i.click_url}"  onClick="_gaq.push(['_trackEvent', 'xt-${USER.pid}', 'item-d-${i.nick}-${i.num_iid}', '${i.title}']);" target="_blank">${i.title}</a></li>
								<li><a href="${i.shop_click_url}" style="color:#555;font-weight:normal;" target="_blank">掌柜:${i.nick}</a></li>
								<li style="position:relative;">信用:<img src="http://static.xintaonet.com/assets/min/images/credit/<@ws.credit i.seller_credit_score></@ws.credit>.gif"/></li>
							</ul>	
						</div>
					</div>
				</TD>
				<TD align="right">${i.price}元</TD>
				<TD align="right"><font color="#D02200">${i.commission}</font>元</TD>
				<TD align="center"><font color="green">${i.volume}</font></TD>
				<TD align="center"><font color="green">${i.commission_num}</font></TD>
			</TR>
		</#list>
	<#else>
		<tr><td colspan=5 align="center"><h3>当前推广计划中没有推广商品</h3></td>
		</tr>
	</#if>
	</TBODY>
</TABLE>