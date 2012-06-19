<@ws.header>
<meta name="keywords" content="新淘网,淘宝,淘客,淘宝客,购物,自助建站,电子商务,网赚">
<meta name="description" content="新淘网 - 酷站演示,您可以加入新淘网,并设计自己的淘客站点申请酷站演示">
<title>酷站演示-第<#if page??>${page.pageNo}<#else>1</#if>页- 新淘网</title>
</@ws.header>
<style>
#coolsitesul li{float:left;width:161px;height:121px;padding:2px;margin-right:12px;margin-bottom:15px;border:1px solid #DDD;}
#coolsitesul li div{float:left;width:160px;height:120px;}
.ui-selecting {background: #FF7C00;}.pages a{color:#0073EA;font-weight:bold}.pages span{font-weight:bold}
.tooltip {display:none;background:transparent url(http://static.xintaonet.com/assets/images/black_arrow.png);font-size:12px;height:70px;width:160px;padding:25px;padding-top:20px;color:#fff;}
</style>
<script>
$(function() {
	$('#coolsitesul li').hover(
				function() {
					$(this).toggleClass("ui-selecting").siblings().removeClass(
							"ui-selecting");
				}, function() {
					$(this).removeClass("ui-selecting");
				});
	//$('#coolsitesul li a').fancybox();
	$('#coolsitesul li[title]').tooltip('#tooltip');
});
</script>
<div class="ui-widget-content ui-corner-all" style="padding-top:50px;background:url('http://static.xintaonet.com/assets/images/coolsitebg.gif') repeat-x;width:950px;height:100%;margin-bottom:10px;" align="center">
<table width="900px">
<tr  height="50px">
	<td align="left" width="100px">酷站展示</td>
	<td align="left" class="pages">
	<#if page??&&(page.totalPageCount>1)>
	<#list 0..(page.totalPageCount-1) as i>
		&nbsp;
		<#if page.pageNo==(i+1)>
		<span>${i+1}<span>
		<#else>
		<a href="/router/site/coolsites?pageNo=${i+1}&pageSize=15">${i+1}</a>
		</#if>
		
	</#list>
	</#if>
	</td><#if USER??><td align="right"></td></#if>
</tr>
</table>
<table>
<tr><td colspan="2" align="center">
<ul id="coolsitesul" style="padding-left:10px;list-style:none;width:900px;height:100%;">
	<#if coolSites??&&(coolSites?size>0)>
		<#list coolSites as s>
			<#assign pic = '/zone/'+(s.user_id?substring((s.user_id?length)-2,(s.user_id?length)))+'/'+s.user_id+'/'+s.user_id>
			<li  <#if ((s_index+1)%5)==0>style="margin-right:0px;"</#if> title="&lt;span style='color:#E65802'&gt;站点：&lt;/span&gt;&lt;a href='http://${s.site.domainName}.xintaonet.com' target='_blank' style='font-weight:bold;color:white;'&gt;${s.site.title}&lt;/a&gt;&lt;br/&gt;&lt;span style='color:#E65802'&gt;简介：&lt;/span&gt;${s.site.description}" ><div><a href="${pic}_640X480.png" rel="group" title="&lt;a href='http://${s.site.domainName}.xintaonet.com' target='_blank'&gt;${s.site.title}&lt;/a&gt;"><img src="${pic}_160X120.png" width="160px" height="120px"/></a></div></li>
		</#list>
	<#else>
		糟糕！还没有酷站展示。快点加入吧
	</#if>
</ul>
</div>
</td></tr>
</table>
<#include "/site/template/footer.ftl">