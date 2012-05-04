<#setting number_format="0.##">
<script>
$(function(){
	$('#fanli-trade-result input[type="radio"][name="change-trade-view"]').change(function(){
		if($(this).is(':checked')){
			$('.fanli-trade').hide();
			$('#trade-'+$(this).val()).show();
		}
	});
});
</script>
<input type="radio" name="change-trade-view" value="0" checked>返利状态视图&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="change-trade-view" value="1">返利类型视图
<table border="1" cellspacing=0 cellpadding=0 class="wTable fanli-trade" width=100% id="trade-0">
<thread>
<tr><th colspan=2>等待站长支付返利(条)</th><th colspan=2>等待会员确认收款(条)</th><th colspan=2>已完成返利支付(条)</th><th>总返利(条)</th></tr>
<tr><th>购买返利</th><th>推广返利</th><th>购买返利</th><th>推广返利</th><th>购买返利</th><th>推广返利</th><th></th></tr>
</thread>
<tbody>
<tr><td class="fl-num"><a class="a-num-un" href="/router/fanlimember/trade?status=0&type=BUY">${unBuyFanli}</a></td><td class="fl-num"><a class="a-num-un" href="/router/fanlimember/trade?status=0&type=ADS">${unAdsFanli}</a></td><td class="fl-num"><a class="a-num-wait" href="/router/fanlimember/trade?status=1&type=BUY">${waitBuyFanli}</a></td><td class="fl-num"><a class="a-num-wait" href="/router/fanlimember/trade?status=1&type=ADS">${waitAdsFanli}</a></td><td class="fl-num"><a class="a-num-finish" href="/router/fanlimember/trade?status=2&type=BUY">${finishBuyFanli}</a></td><td class="fl-num"><a class="a-num-finish" href="/router/fanlimember/trade?status=2&type=ADS">${finishAdsFanli}</a></td><td class="fl-num" rowspan=2>${allFanli}</td></tr>
<tr><td class="fl-num" colspan=2><a class="a-num-un" href="/router/fanlimember/trade?status=0">${unBuyFanli+unAdsFanli}</a></td><td class="fl-num" colspan=2><a class="a-num-wait" href="/router/fanlimember/trade?status=1">${waitBuyFanli+waitAdsFanli}</a></td><td class="fl-num" colspan=2><a class="a-num-finish" href="/router/fanlimember/trade?status=2">${finishBuyFanli+finishAdsFanli}</a></td></tr>
</tbody>
</table>
<table border="1" cellspacing=0 cellpadding=0 class="wTable fanli-trade" width=100% id="trade-1" style="display:none;">
<thread>
<tr><th colspan=3>购买返利(条)</th><th colspan=3>推广返利(条)</th><th>总返利(条)</th></tr>
<tr><th>等待站长支付返利</th><th>等待会员确认收款</th><th>已完成返利支付</th><th>等待站长支付返利</th><th>等待会员确认收款</th><th>已完成返利支付</th><th></th></tr>
</thread>
<tbody>
<tr><td class="fl-num">${unBuyFanli}</td><td class="fl-num">${waitBuyFanli}</td><td class="fl-num">${finishBuyFanli}</td><td class="fl-num">${unAdsFanli}</td><td class="fl-num">${waitAdsFanli}</td><td class="fl-num">${finishAdsFanli}</td><td class="fl-num" rowspan=2>${allFanli}</td></tr>
<tr><td class="fl-num" colspan=3>${unBuyFanli+waitBuyFanli+finishBuyFanli}</td><td class="fl-num" colspan=3>${unAdsFanli+waitAdsFanli+finishAdsFanli}</td></tr>
</tbody>
</table>