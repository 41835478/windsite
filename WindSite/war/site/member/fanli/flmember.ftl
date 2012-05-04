<style>fieldset{padding:5px;margin-bottom:10px;}fieldset legend{font-weight:700;font-size:14px;color:#014D7F}fieldset table td{height:25px;line-height:17px;} td.key{width:100px;text-align:right;}td.value{width:150px;padding-left:20px;}
td.fl-num{text-align:center;width:80px;}th strong{color:red} fieldset .wTable td.value{text-align:left;}
</style>
<script>
$(function(){
	$('#confirmTradeRate').click(function(){
		if ($(this).hasClass('btn-ok-disabled')) {
			e.preventDefault();
			return;
		}
	$(this).addClass('btn-ok-disabled');
	var cr = $('#personalCommissionRate').val();
	var acr= $('#personalAdCommissionRate').val();
	if(cr){//如果购买比例不为空，则校验
		if(!checkCommissionNum($('#personalCommissionRate'))){
		$('#confirmTradeRate').removeClass('btn-ok-disabled');
			return;
		}
	}
	if(acr){//如果推广比例不为空，则校验
		if (!checkCommissionNum($('#personalAdCommissionRate'))) {
		$('#confirmTradeRate').removeClass('btn-ok-disabled');
			return;
		}
	}
	if (parseInt($('#personalCommissionRate').val()) + parseInt($('#personalAdCommissionRate').val()) > 90) {
		alert('建议您调低分成比例，返利比例+推广返利比例大于90，这样将造成您无法获取自己的推广佣金');
		$('#confirmTradeRate').removeClass('btn-ok-disabled');
		return;
	}
	updateFanliTradeRate($(this).attr('mid'), $('#personalCommissionRate').val(),$('#personalAdCommissionRate').val());
	});
});
</script>
<fieldset><legend>基本信息</legend>
<table width=100% class="wTable">
<tr><td class="key">用户名:</td><td class="value">${member.info.username}【ID:${member.id}】</td><td class="key">支付宝:</td><td class="value">${member.info.alipay}</td><td class="key">电子邮箱:</td><td class="value">${member.info.email}</td></tr>
<tr><td class="key">注册时间:</td><td class="value">${member.created?datetime}</td><td class="key">上次登录:</td><td class="value">${member.lastVisit?datetime}</td><td class="key">手机号:</td><td class="value">${member.mobile}</td></tr>
<tr><td class="key">QQ:</td><td class="value">${member.info.qq}</td><td class="key">MSN:</td><td class="value">${member.info.msn}</td><td class="key">旺旺:</td><td class="value">${member.info.wangwang}</td></tr>
</table>
</fieldset>
<fieldset><legend>返利设置</legend>
<table width=100% class="wTable">
<tr><td class="key">推荐会员信息:</td><td class="value" style="width:auto;"><#if member.parentId??&&''!=member.parentId>${member.parentUserName}【ID:${member.parentId}】<#else>无</#if></td>
<td class="key">站点购买返利比例:</td><td class="value" style="width:auto;">${siteCommission.commissionRate}%</td>
<td class="key">站点推广返利比例:</td><td class="value" style="width:auto;">${siteCommission.adCommissionRate}%</td>
</tr>
<tr><td class="key">个人购买返利比例:</td><td colspan=5 class="value" style="width:auto;"><input id="personalCommissionRate" style="width:50px;padding:2px;" value="${member.commissionRate}"><span>%（填写0-90）如 50% 表示推广总佣金的50% ，返还给买家的部分 </span></td></tr>
<tr><td class="key">个人推广返利比例:</td><td colspan=5 class="value" style="width:auto;"><input id="personalAdCommissionRate" style="width:50px;padding:2px;" value="${member.adCommissionRate}"><span>%（填写0-90）如 10% 表示推广总佣金的10% ，返还给会员推广人的部分</span></td></tr>
<tr><td colspan=6><span class="btn btn-ok" id="confirmTradeRate" mid="${member.id}"><input type="button" value="确认修改返利比例"></span>&nbsp;&nbsp;&nbsp;<span style="color:red">提醒：个人返利比例留空，则自动使用站点的返利比例。</span></td></tr>
</table>
</fieldset>
<fieldset><legend>收入信息</legend>
<div  id="fanli-income-result" style="width:100%;height:100%;"></div>
</fieldset>