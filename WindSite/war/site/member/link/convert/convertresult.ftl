<#setting number_format="0.##"> 
<style>
.bb-info{margin:0px;padding:0px;width:230px;height:80px;}
.bb-selectbox{margin-top:20px;margin-left:-5px;float:left;width:15px;}
.bb-pic{width:60px;margin-top:8px;border:1px solid #DDD;height:60px;}
.bb-disc{padding-left:5px;width:170px;}.bb-disc li{margin-bottom:3px;}
.wTable td{line-height:20px;}
</style>
<TABLE class="wTable" width=750px>
	<THEAD>
		<TR>
			<TH width=240px>商品推广信息(<span style="color:red">成功转换<#if items??>${items?size!0}<#else>0</#if></span>)</TH>
			<TH width=80px>单价</TH>
			<TH width=80px>佣金比率</TH>
			<TH width=80px>佣金(元)</TH>
			<TH width=100px>支出(元)</TH>
			<TH>累计(件)</TH>
		</TR>
	</THEAD>
	<#if items??&&items?size!=0>
	<#assign site=USER.sites[0]>
	<#list items as i>
	<#if i_index%3==0><TBODY class="pageTbody"></#if>
	<TR class="<#if i_index%2==0>odd<#else>even</#if>">
	<TD width=240px>
		<table>
			<tr><td><div class="bb-pic" align="center"><a onClick="_gaq.push(['_trackEvent', 'xt-${USER.pid}', 'item-d-${i.nick}-${i.numIid}', '${i.title}']);" href="${i.clickUrl}" target="_blank"><img id="${i.numIid}" src="${i.picUrl?replace('bao/uploaded', 'imgextra')}_60x60.jpg" alt="${i.title}" width="60px" height="60px"/></a></div></td>
			<td><div class="bb-disc" align="left">
				<ul style="list-style-type:none">
					<li><a href="${i.clickUrl}" onClick="_gaq.push(['_trackEvent', 'xt-${USER.pid}', 'item-d-${i.nick}-${i.numIid}', '${i.title}']);" target="_blank"  style="color:#00E;">${i.title}</a></li>
					<li>掌柜:${i.nick}</li>
					<li><a href="#" onClick="openMyItemGroupByItem(['${i.numIid}']);return false;">加入推广组</a>&nbsp;&nbsp;&nbsp;<a style="color:#f60;" href="#" xtUrl="http://<#if site.www??&&site.www!=''>${site.www}<#else>${site.domainName}.xintaonet.com</#if>/titem/${i.numIid}.html" mamaUrl="${i.clickUrl}" onClick="openItemAdsDialog($(this));return false;">推广此商品</a></li>
				</ul>
			</div></td></tr>
		</table>	
	</TD>
	<TD width=60px align="center">${i.price}元</TD>
	
	<TD width=55px align="center"><font color="#D02200">${(i.commissionRate?number)/100}%</font></TD>
	<TD width=55px align="center"><font color="#D02200">${i.commission}</font>元</TD>
	<TD width=55px align="center"><font color="#D02200">${i.commissionVolume}</font>元</TD>
	<TD width=55px align="center"><font color="green">${i.commissionNum}件</font></TD>
	</TR>
	<#if i_index%3==2||!i_has_next></TBODY></#if>
	</#list>
	<#else><tr><td colspan=6>糟糕，您要转换的淘宝商品还没有加入淘宝客推广！</td></tr>
	</#if>
</table>