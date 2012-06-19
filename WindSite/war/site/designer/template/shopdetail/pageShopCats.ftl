<#if shops??&&shops?size!=0>
	<#list shops as d>
	<#assign shopClickUrl=d.clickUrl>
		<li>
			<div class="pic" cr='${d.commissionRate}'><a href="/tshop/${d.sid}.html" target="_blank" title="${d.title}"><img src="http://logo.taobao.com/shop-logo${d.picPath}" alt="${d.title}" onerror="javascript:this.src='http://img02.taobaocdn.com/tps/i2/T1nB0EXnBwXXXXXXXX-80-80.png'" width=40px height=40px></a></div>
			<div class="desc"><a href="/tshop/${d.sid}.html" title="${d.title}" target="_blank">${d.title}</a></div>
			<#if d.sellerCredit??&&''!=d.sellerCredit><div class="sales-amount"><img src="http://static.xintaonet.com/assets/min/stylesheets/images/${d.sellerCredit}.gif" style="vertical-align: text-bottom;"/></div></#if>
		</li>
	</#list>
</#if>