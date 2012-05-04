<#assign imgAttr='original'><#if isDesigner><#assign imgAttr='src'></#if> 
<div class="shop-tenorder">
	<div class="hd" <#if 'false'==isHd>style="display:none;"</#if>><h3><span>${title}</span></h3></div>
	<div class="bd">
		<table><tbody>
		<#if data??&&data?size!=0>
		<#list data as d><#assign dTitle=d.title?replace('<span class=H>','')?replace('</span>','')>
		<tr class="item">
			<td width="945" height="180" valign="top">
				<table width="100%" border="0" cellpadding="0" cellspacing="0">
	      			<tbody>
	      				<tr>
	        				<td width="100" height="180" valign="top"><table width="100%" border="0" cellpadding="0" cellspacing="0"><tbody><tr><td width="100" height="180"><img src="/assets/min/stylesheets/images/no${d_index+1}.gif" width="100" height="180"></td></tr></tbody></table></td>
	        				<td width="160" valign="middle"><table width="100%" border="0" cellpadding="0" cellspacing="0"><tbody><tr><td width="160" height="180" class="pic" co="${d.commission}"><a href="/titem/${d.num_iid}.html" target="_blank"><img ${imgAttr}="${d.pic_url?replace("bao/uploaded", "imgextra")}_160x160.jpg" alt="${dTitle}" title="${dTitle}" border="0"></a></td></tr></tbody></table></td>
	        				<td width="390" valign="top">
	        					<table width="100%" border="0" cellpadding="0" cellspacing="0">
	        						<tbody>
	        							<tr><td width="390" height="55" valign="top"><table width="100%" border="0" cellpadding="0" cellspacing="0"><tbody><tr><td width="390" height="55" align="center" valign="middle" class="desc"><a href="/titem/${d.num_iid}.html" target="_blank" style="font-size:18px;" title="${dTitle}">${d.title}</a></td></tr></tbody></table></td></tr>
	          							<tr><td height="53" valign="top"><table width="100%" border="0" cellpadding="0" cellspacing="0"><tbody><tr><td width="390" height="53" align="center" valign="middle" class="price"><a href="/titem/${d.num_iid}.html" target="_blank" style="font-size: 36px;">淘宝特卖价：<strong style="font-size: 36px;font-weight: bold;">${d.price}元</strong></a></td></tr></tbody></table></td></tr>
	        						</tbody>
	        					</table>
        					</td>
        					<td width="130" valign="top">
        						<table width="100%" border="0" cellpadding="0" cellspacing="0" class="sales-amount">
        							<tbody>
        								<tr><td width="128" height="55" valign="top"><table width="100%" border="0" cellpadding="0" cellspacing="0"><tbody><tr><td width="128" height="55" align="center" valign="middle"><span style="font-size:18px;">30天售出量</span></td></tr></tbody></table></td></tr>
         				 				<tr>
         				 					<td height="125" valign="top">
         				 					<table width="100%" border="0" cellpadding="0" cellspacing="0">
         				 						<tbody>
         				 							<tr><td width="102" height="53" valign="top"><table width="100%" border="0" cellpadding="0" cellspacing="0"><tbody><tr><td width="102" height="53" align="center" valign="middle"><a href="/titem/${d.num_iid}.html" target="_blank" style="font-size:24px;"><em>${d.volume}</em>件</a></td></tr></tbody></table></td></tr>
              										<tr><td height="72"><a href="/titem/${d.num_iid}.html" target="_blank"><img src="/assets/min/stylesheets/images/anniu.jpg" width="113" height="29" hspace="10" border="0" align="middle"></a></td></tr>
              									</tbody>
              								</table>
              								</td>
              							</tr>
        							</tbody>
        						</table>
        					</td>
        					<td width="160" valign="top">
        						<table width="100%" border="0" cellpadding="0" cellspacing="0">
          							<tbody>
          							<tr><td width="160" height="55" valign="top"><table width="100%" border="0" cellpadding="0" cellspacing="0"><tbody><tr><td width="160" height="55" align="center" valign="middle" style="font-size:14px;" class="desc"><span>掌柜：<a target="_blank" href="${d.shop_click_url}">${d.nick}</a></span></td></tr></tbody></table></td></tr>
          							<tr><td height="53" valign="top"><table width="100%" border="0" cellpadding="0" cellspacing="0"><tbody><tr><td width="160" height="53" align="center" valign="middle"><span style="font-size:24px;">店铺信誉</span></td></tr></tbody></table></td></tr>
          							<tr><td height="72" align="center" valign="middle"><img src="/assets/min/stylesheets/images/${d.seller_credit_score}.gif" align="absmiddle"></td></tr>
        							</tbody>
        						</table>
        					</td>
      					</tr>
    				</tbody>
    			</table>
    		</td>
  		</tr>
  		<#if d_has_next??>
  		<tr><td height="5" valign="top"><table width="100%" border="0" cellpadding="0" cellspacing="0"><tbody><tr bgcolor="#993333"><td width="945" height="5"></td></tr></tbody></table></td></tr>
  		</#if>
		</#list>
		</#if>
  </tbody>
  </table>
	</div>
</div>