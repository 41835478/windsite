<@ws.haibaoheader>
<meta name="keywords" content="淘宝店铺,${sitetitle}">
<meta name="description" content="淘宝店铺,${sitetitle}">
<title>淘宝热门店铺- ${sitetitle}</title>
</@ws.haibaoheader>
<div class="custome-950-10">
   <div class="custome-header-nav">
		<table width=100%>
        	<tr><td width=250px align=left><a href="#" class="a-s" style="margin-left:10px;"><span>淘宝店铺精选</span></a></td>
        	</tr>
        </table>
	</div>
<#assign spid=(pid?replace('mm_','')?replace('_0_0',''))>
<div class="custome-box">
	<ul class="custome-list"><#list shops as s>
		<li class="l-d-a-i-p">
		<table>
			<tr><td><div><a onClick="_gaq.push(['_trackEvent', 'xt-${pid}', 'shop-d-${s.sid}', '${s.title}']);" href="${s.click_url?replace('13667242',spid)}" target="_blank" title="${s.title}"><img src="<#if (s.pic_path!="")>http://logo.taobao.com/shop-logo/${s.pic_path}<#else>http://s.yijia.com/taobao/i/no_shop.gif</#if>"  alt="${s.title}"/></a></div></td></tr>
			<tr><td height=50px valign=top><a class="title" onClick="_gaq.push(['_trackEvent', 'xt-${pid}', 'shop-d-${s.sid}', '${s.title}']);" href="${s.click_url?replace('13667242',spid)}" target="_blank"><span>${s.title}</span></a></td></tr>
			<tr><td><span class="price-desc">店铺等级:</span><span class="price"><img src="http://static.xintaonet.com/assets/min/images/credit/<@ws.credit s.level></@ws.credit>.gif"/></span></td></tr>
		</table>
		</li></#list>
	</ul>
	<div style="clear:both"></div>  
</div>
</div>
<#include "/site/template/haibaofooter.ftl">