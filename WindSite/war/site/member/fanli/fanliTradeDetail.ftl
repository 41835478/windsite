<style>#trade-detail-dialog fieldset{padding:5px;margin-bottom:10px;}#trade-detail-dialog fieldset legend{font-weight:700;font-size:14px;color:#014D7F}#trade-detail-dialog fieldset table td{height:25px;line-height:17px;} td.key{width:80px;text-align:right;}td.value{padding-left:20px;text-align:left}
td.fl-num{text-align:center;width:80px;}#trade-detail-dialog th strong{color:red} 
</style>
<ol class="step step-three"><li><span>1.等待站长支付返利</span></li><li class="current"><span>2.等待会员确认收款</span></li><li class="last"><span>完成</span></li></ol>
<fieldset><legend>订单信息</legend>
<#if trade.report??>
<TABLE class="wTable" width=100% height=100% border="0" cellspacing="1" cellpadding="1">
	<#assign report=trade.report>
	<tr><td class="key">淘宝交易号：</td><td class="value">${report.trade_id}</td><td class="key">商品名称：</td><td colspan=3 class="value"><a href="/titem/${report.num_iid}.html" target="_blank">${report.item_title}</a></td></tr>
	<tr><td class="key">卖家昵称：</td><td class="value">${report.seller_nick}</td><td class="key">店铺名称：</td><td colspan=3 class="value">${report.shop_title}</td></tr>
	<tr><td class="key">成交价格：</td><td class="value">${report.pay_price}</td><td class="key">成交数量：</td><td class="value">${report.item_num}</td><td class="key">成交时间：</td><td class="value">${report.pay_time?datetime}</td></tr>
	<tr><td class="key">购买会员：</td><td class="value">${report.nick}</td><td class="key"></td><td class="value"></td><td class="key"></td><td class="value"></td></tr>
</TABLE>
<#else>
<TABLE class="wTable" width=100% height=100% border="0" cellspacing="1" cellpadding="1">
	<#assign yiqifa=trade.yiqifa>
	<tr><td class="key">商城活动：</td><td class="value"><#if malls??&&malls?size!=0&&malls[yiqifa.actionId+'']??>${malls[yiqifa.actionId+''].title}<#else>${yiqifa.actionId}</#if></td><td class="key">下单时间：</td><td colspan=3 class="value">${yiqifa.orderTime}</td></tr>
	<tr><td class="key">订单编号：</td><td class="value">${yiqifa.orderNo}</td><td class="key">商品编号：</td><td colspan=3 class="value">${yiqifa.itemId}</td></tr>
	<tr><td class="key">成交价格：</td><td class="value">${yiqifa.itemPrice}</td><td class="key">成交数量：</td><td colspan=3 class="value">${yiqifa.itemNums}</td></tr>
	<tr><td class="key">购买会员：</td><td class="value">${yiqifa.nick}</td><td class="key">总佣金：</td><td colspan=3 class="value">${yiqifa.commission}</td></tr>
</TABLE>
</#if>
</fieldset>
<fieldset><legend>返利信息</legend>
<TABLE class="wTable" width=100% height=100% border="0" cellspacing="1" cellpadding="1">
	<#assign member=trade.flMember>
	<tr><td class="key">返利金额：</td><td class="value" style="color:red;font-size:14px;font-weight:700">${trade.commission}</td><td class="key">返利会员：</td><td class="value">${member.info.username}</td><td class="key">返利类型：</td><td class="value"><#if 'BUY'==trade.type>购买返利<#else>推广返利</#if></td></tr>
	<tr><td class="key">支付宝帐号：</td><td colspan=2 class="value">${member.info.alipay}</td><td colspan=4 class="value"><span class="btn btn-ok" id="confirmTradeStatus2"><input type="button" value="确认已经收款"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;联系客服：<a target="_blank" title="联系客服-${nick}" href="http://amos1.taobao.com/msg.ww?v=2&uid=${nick}&s=1" ><img border="0" src="http://amos1.taobao.com/online.ww?v=2&uid=${nick}&s=1" alt="联系客服-${nick}" /></a></td></tr>
</TABLE>
</fieldset>