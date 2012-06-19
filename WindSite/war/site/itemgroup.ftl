<#assign RATE=0 ISFANLI=(versionNo>=2&&''!=www)>
<#if MEMBER??><#assign RATE=(MEMBER.commissionRate/100)?number></#if> 
<@ws.siteHeader>
<meta name="keywords" content="${title}">
<meta name="description" content="${title}">
<title>${title}- ${sitetitle}</title>
</@ws.siteHeader>
<style>
.rc-tp,.bd{background: url(http://static.xintaonet.com/assets/min/images/shops_header_bg.png) no-repeat -999em 0px;}.rc-bt{background-position: -96px -424px;display: block;height: 4px;margin-top: -4px;position: relative;}.bd{background-position: 0px -459px;background-repeat: repeat-x;border-bottom: none;border: 1px #F69968;height: 33px;}.trade{float: left;font-size: 14px;line-height: 33px;margin-top: 3px;overflow: hidden;padding-left: 5px;position: relative;}.bb-info{margin-left:5px;margin-right:0px;width:320px;height:80px;}.bb-selectbox{margin-top:20px;margin-left:-5px;float:left;width:15px;}.bb-pic{float:left;width:80px;margin-top:3px;border:1px solid #DDD;height:80px;}.bb-disc{float:left;padding-left:5px;width:220px;}.wTable td{line-height:20px}
</style>
<table><tr><td width="700px" valign=top>
<#if items?size!=0>
<TABLE class="wTable" width="700px" style="float:left;padding-left:2px;padding-right:2px;" width=100% border="0" cellspacing="1" cellpadding="1">
	<THEAD>
		<TR>
			<TH width=340px>商品信息</TH>
			<TH width=60px>单价</TH>
			<TH width=95px>最近售出(件)</TH>
		</TR>
	</THEAD>
	<TBODY>
	<#list items as i>
		<TR class="<#if i_index%2==0>odd<#else>even</#if>">
			<TD>
				<div class="bb-info" align="left">
					<div class="bb-pic" align="center"><a onClick="_gaq.push(['_trackEvent', 'xt-${pid}', 'item-d-${i.nick}-${i.num_iid}', '${i.title}']);" href="/item/${i.id}.html" target="_blank"><img id="${i.num_iid}" src="${i.pic_url?replace('bao/uploaded', 'imgextra')}_80x80.jpg" alt="${i.title}"/></a></div>
					<div class="bb-disc" align="left">
						<ul style="list-style:none;padding:0px;margin:0px;">
							<li><a href="/item/${i.id}.html" target="_blank"  style="color:#00E;">${i.title}</a></li>
							<li>掌柜:<a <#if i.sid??>onClick="_gaq.push(['_trackEvent', 'xt-${pid}', 'shop-d-${i.sid}', '${i.shop_title}']);"</#if> href="<@ws.convertLink href=i.shop_click_url></@ws.convertLink>" target="_blank"  style="color:#F60;">${i.nick}</a></li>
							<li>店铺等级:<img src="http://static.xintaonet.com/assets/min/images/credit/<@ws.credit i.seller_credit_score></@ws.credit>.gif"/></li>
						</ul>	
					</div>
				</div>
			</TD>
			<TD align=center><#if ISFANLI><div class="fanli" style="float:right;"><span class="fanli-desc">返利:</span><@ws.rate RATE=RATE commission=i.commission></@ws.rate></div></#if></TD>
			<TD align=center>${i.volume}件</TD>
		</TR>
	</#list>
	</TBODY>
</table>
	<#else>
	<embed src="http://a.alimama.cn/widget/yr1/yr1any.swf?r=0.0635696230456233" flashvars="count=20&catid=999900001&h_h=800&h_w=700&sz=9999&type=1&i=${pid}&st_tc=3366CC&st_bgc=FFFFFF&st_bdc=CCCCCC&st_pc=434343&st_lg=2&st_pb=0" width="700" height="800" quality="high" wmode="transparent" bgcolor="#ffffff" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />
	</#if>
</td><td valign=top>	
<div style="float:left;padding-left:5px;width:240px;">
<embed src="http://a.alimama.cn/widget/yr1/yr1any.swf?r=0.36877851374447346" flashvars="count=20&catid=999900001&h_h=800&h_w=240&sz=9999&type=1&i=${pid}&st_tc=3366CC&st_bgc=FFFFFF&st_bdc=CCCCCC&st_pc=434343&st_lg=2&st_pb=0" width="240" height="800" quality="high" wmode="transparent" bgcolor="#ffffff" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />
</div>
</td></tr></table>
<@ws.siteFooter>
</@ws.siteFooter>