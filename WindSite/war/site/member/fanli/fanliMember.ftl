<@ws.fanliheader navselected='H01'>
<meta name="keywords" content="${sitetitle},会员管理">
<meta name="description" content="会员管理 - ${sitetitle}">
<title>会员中心-${sitetitle}</title>
</@ws.fanliheader>
<script>
$(function(){
	initFanliSiteMember('${MEMBER.id}');
});
</script>
<style>fieldset{padding:5px;margin-bottom:10px;border:1px solid #EFEFEF;}fieldset legend{font-weight:700;font-size:14px;color:#014D7F}fieldset table td{height:25px;line-height:17px;} td.key{width:100px;text-align:right;}td.value{width:150px;padding-left:20px;}
td.fl-num{text-align:center;width:80px;}th strong{color:red} fieldset .wTable td.value{text-align:left;}a.a-num-un,a.a-num-wait,a.a-num-finish{font-weight:800;font-size:16px;text-decoration: underline;}a.a-num-un{color:red;}a.a-num-wait{color:#090;}a.a-num-finish{color:gray}</style>
<@xt.fanlitemplate>
<fieldset><legend>基本信息</legend>
<table width=100% class="wTable">
<tr><td class="key">用户名:</td><td class="value">${member.info.username}【ID:${member.id}】</td><td class="key">支付宝:</td><td class="value">${member.info.alipay}</td><td class="key">电子邮箱:</td><td class="value">${member.info.email}</td></tr>
<tr><td class="key">注册时间:</td><td class="value">${member.created?datetime}</td><td class="key">上次登录:</td><td class="value">${member.lastVisit?datetime}</td><td class="key">登录次数:</td><td class="value">${member.visits}</td></tr>
<tr><td class="key">QQ:</td><td class="value">${member.info.qq}</td><td class="key">MSN:</td><td class="value">${member.info.msn}</td><td class="key">旺旺:</td><td class="value">${member.info.wangwang}</td></tr>
</table>
</fieldset>
<fieldset><legend>返利信息</legend>
<table width=100% class="wTable">
<tr><td class="key">推荐会员信息:</td><td class="value" style="width:auto;"><#if member.parentId??&&''!=member.parentId>${member.parentUserName}【ID:${member.parentId}】<#else>无</#if></td>
<!--<td class="key">购买返利比例:</td><td class="value" style="width:auto;"><#if member.commissionRate??>${member.commissionRate}<#else>${siteCommission.commissionRate}</#if>%</td>-->
<td class="key">推广返利比例:</td><td class="value" style="width:auto;"><#if member.adCommissionRate??>${member.adCommissionRate}<#else>${siteCommission.adCommissionRate}</#if>%</td>
</tr>
</table>
</fieldset>
<fieldset><legend>返利记录</legend>
<div  id="fanli-trade-result" style="width:100%;height:100%;"></div>
</fieldset>
<fieldset><legend>收入信息</legend>
<div  id="fanli-income-result" style="width:100%;height:100%;"></div>
</fieldset>
</@xt.fanlitemplate>