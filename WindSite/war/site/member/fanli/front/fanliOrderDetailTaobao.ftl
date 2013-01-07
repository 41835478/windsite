<style>fieldset{padding:5px;margin-bottom:10px;}fieldset legend{font-weight:700;font-size:14px;color:#014D7F}fieldset table td{height:25px;line-height:17px;} td.key{width:80px;text-align:right;}td.value{width:150px;padding-left:20px;}
td.fl-num{text-align:center;width:80px;}th strong{color:red} fieldset .wTable td.value{text-align:left;}
</style>
<fieldset><legend>确认订单</legend>
<table width=100% class="wTable">
<tr><td class="key">订单编号:</td><td class="value"><input type="text" class="i-text" id="trade-id" value=""></td><td class="key">返利(集分宝):</td><td class="value" style="color:red;font-weight:700">${report.commission?number*MEMBER.commissionRate}</td></tr>
<tr><td colspan=4><span class="btn btn-ok" id="trade-id-confirm" tid="${report.trade_id}"><input type="button" value="确认该笔交易"></span></td></tr>
</table>
</fieldset>
<fieldset><legend>订单信息</legend>
<table width=100% class="wTable">
<#assign tradeNum=report.trade_id?string>
<tr><td class="key">订单编号:</td><td class="value">${tradeNum[0]+'************'+tradeNum[tradeNum?length-1]}</td><td class="key">商品名称:</td><td class="value" style="width:auto;" colspan=3><a href="/titem/${report.num_iid}.html" target="_blank" style="color:#0166FF;">${report.item_title}</a></td></tr>
<tr><td class="key">成交单价:</td><td class="value">${report.pay_price}</td><td class="key">成交数量:</td><td class="value" style="width:auto;" >${report.item_num}</td><td class="key" width=80px>支付时间:</td><td class="value" style="width:auto;" >${report.pay_time?datetime}</td></tr>
</table>
</fieldset>