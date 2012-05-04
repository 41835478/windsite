<#assign imgAttr='original'><#if isDesigner><#assign imgAttr='src'></#if>
<div class="shop-child-floor no-border">
<div class="hd" <#if 'false'==isHd>style="display:none;"</#if>><h3><span>${title}</span></h3></div>
<div class="bd">
<#if baobaocat??&&''!=baobaocat>
<#switch baobaocat>
<#case '1'>
<h2 class="baobao-title baobao-title-green"><span>宝贝营养</span><span class="notice"><a href="/search?cid=35&amp;q=${'牛奶粉'?url}" target="_blank">牛奶粉</a>| <a href="/search?cid=50016094" target="_blank">羊奶粉</a>| <a href="/search?cid=50018836" target="_blank">鱼肝油/钙</a>| <a href="/search?cid=50018809" target="_blank">牛初乳</a>| <a href="/search?cid=50018812" target="_blank">DNA</a>| <a href="/search?cid=50018801" target="_blank">宝宝辅食</a>| <a href="/search?cid=35" target="_blank">更多</a> </span></h2>
<#break>
<#case '2'>
<h2 class="baobao-title  baobao-title-orange"><span>宝贝用品</span><span class="notice"><a href="/search?cid=50018813" target="_blank">纸尿裤</a>| <a href="/search?cid=50022520" target="_blank">推车</a>| <a href="/search?cid=50009522" target="_blank">奶嘴</a>| <a href="/search?cid=50012546" target="_blank">湿巾</a>| <a href="/search?cid=50014248" target="_blank">洗浴</a>| <a href="/search?cid=50014812" target="_blank">更多</a> </span> </h2>
<#break>
<#case '3'>
<h2 class="baobao-title  baobao-title-orange"><span>宝贝扮靓</span> <span class="notice"> <a href="/search?cid=50008165&amp;q=${'春装'?url}" target="_blank">春装</a>| <a href="/search?cid=50008165&amp;q=${'长裤'?url}" target="_blank">长裤</a>| <a href="/search?cid=50012340" target="_blank">童鞋</a>| <a href="/search?cid=50010540" target="_blank">套装</a>| <a href="/search?cid=50012354" target="_blank">孕妇装</a>| <a href="/search?cid=50008165" target="_blank">更多</a> </span> </h2>
<#break>
<#case '4'>
<h2 class="baobao-title  baobao-title-blue"><span>宝贝娱乐</span> <span class="notice"> <a href="/search?q=${'婴儿玩具'?url}" target="_blank">婴儿玩具</a>| <a href="/search?cid=50005998&amp;q=${'益智'?url}" target="_blank">益智玩具</a>| <a href="/search?cid=2512" target="_blank">运动休闲</a>| <a href="/search?cid=50005998" target="_blank">玩乐童车</a>| <a href="/search?cid=50012404" target="_blank">儿童箱包</a>| <a href="/search?cid=50005998" target="_blank">更多</a> </span> </h2>
<#break>
<#case '5'>
<h2 class="baobao-title  baobao-title-pink"><span>妈妈用品</span> <span class="notice"> <a href="/search?cid=50012374" target="_blank">防辐射</a>| <a href="/search?cid=50005997&amp;props=7895958%3A31765;" target="_blank">维生素</a>| <a href="/search?cid=50012354" target="_blank">孕妇装</a>| <a href="/search?cid=50017184" target="_blank">待产包</a>| <a href="/search?cid=50023613&amp;q=${'哺乳'?url}" target="_blank">哺乳衣</a>| <a href="/search?cid=50022517" target="_blank">更多</a> </span> </h2>
<#break>
</#switch>
<table width=100% style="table-layout:fixed;">
	<tbody>
		<tr>
			<td width=190px valign=top><#include "assets/js/page/module/extra/child_logo_${baobaocat}.ftl"></td>
			<td valign=top><#if data??&&data?size!=0><ul class="child-grid"><#list data as d><#assign dTitle=d.title?replace('<span class=H>','')?replace('</span>','')><li co='${d.commission}'><a href="/titem/${d.num_iid}.html" target="_blank"><img ${imgAttr}="${d.pic_url?replace("bao/uploaded", "imgextra")}_100x100.jpg" alt="${dTitle}" title="${dTitle}" width="100" height="90"> <span style="height:36px;white-space:normal;overflow:hidden;display:block;" title="${dTitle}">${d.title}</span> <strong class="baobao-effect-price">￥${d.price}</strong></a> </li></#list></ul></#if></td>
		</tr>	
	</tbody>
</table>
</#if>
</div>
</div>