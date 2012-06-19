<#if shops??&&shops?size!=0>
<#assign spid=(USER.pid?replace('mm_','')?replace('_0_0',''))>
<#list shops as s>
	<#if s_index%15==0>
		<ul>
	</#if>
	<li title="掌柜:${s.nick}" level="${s.level}" nick="${s.nick}" sid="${s.sid}" cr="${s.commission_rate}" pi="<#if (s.pic_path!="")>http://logo.taobao.com/shop-logo${s.pic_path}<#else>http://s.yijia.com/taobao/i/no_shop.gif</#if>" t="${s.title}" c="/tshop/${s.sid}.html">
		<div class="pic" align="center">
		<img src="<#if (s.pic_path!="")>http://logo.taobao.com/shop-logo${s.pic_path}<#else>http://s.yijia.com/taobao/i/no_shop.gif</#if>"/>
		</div>
		<div class="item">
		<div class="title">
		<a href="${s.click_url?replace('13667242',spid)}" target="_blank">${s.title}</a>
		</div>
		<div><span class="k">信用:</span><span class="v"><img src="http://static.xintaonet.com/assets/min/images/credit/<@ws.credit s.level></@ws.credit>.gif"/></span></div>
		<div><span class="k">佣金:</span><span class="v">${s.commission_rate}%</span></div>
		<input class="customechecked" type="radio" name="checkedshop"/></div></li>
	<#if s_index%15==14>
		</ul>
	</#if>
</#list>
<#else>
<ul>
<h4>旧版本自定义组件已不提供店铺收藏推广功能</h4>
</ul>
</#if>