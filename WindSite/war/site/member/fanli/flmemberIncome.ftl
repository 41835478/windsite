<#setting number_format="0.##">
<script>
$(function(){
	$('#fanli-income-result input[type="radio"][name="change-income-view"]').change(function(){
		if($(this).is(':checked')){
			$('.fanli-income').hide();
			$('#income-'+$(this).val()).show();
		}
	});
});
</script>
<input type="radio" name="change-income-view" value="0" checked>返利状态视图&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="change-income-view" value="1">返利类型视图
<table border="1" cellspacing=0 cellpadding=0 class="wTable fanli-income" width=100% id="income-0">
<thread>
<tr><th colspan=2>等待站长支付返利(元)</th><th colspan=2>等待会员确认收款(元)</th><th colspan=2>已完成返利支付(元)</th><th>总返利(元)</th></tr>
<tr><th>购买返利</th><th>推广返利</th><th>购买返利</th><th>推广返利</th><th>购买返利</th><th>推广返利</th><th></th></tr>
</thread>
<tbody>
<tr><td class="fl-num">${unBuyFanli}</td><td class="fl-num">${unAdsFanli}</td><td class="fl-num">${waitBuyFanli}</td><td class="fl-num">${waitAdsFanli}</td><td class="fl-num">${finishBuyFanli}</td><td class="fl-num">${finishAdsFanli}</td><td class="fl-num" rowspan=2>${allFanli}</td></tr>
<tr><td class="fl-num" colspan=2>${unBuyFanli+unAdsFanli}</td><td class="fl-num" colspan=2>${waitBuyFanli+waitAdsFanli}</td><td class="fl-num" colspan=2>${finishBuyFanli+finishAdsFanli}</td></tr>
</tbody>
</table>
<table border="1" cellspacing=0 cellpadding=0 class="wTable fanli-income" width=100% id="income-1" style="display:none;">
<thread>
<tr><th colspan=3>购买返利(元)</th><th colspan=3>推广返利(元)</th><th>总返利(元)</th></tr>
<tr><th>等待站长支付返利</th><th>等待会员确认收款</th><th>已完成返利支付</th><th>等待站长支付返利</th><th>等待会员确认收款</th><th>已完成返利支付</th><th></th></tr>
</thread>
<tbody>
<tr><td class="fl-num">${unBuyFanli}</td><td class="fl-num">${waitBuyFanli}</td><td class="fl-num">${finishBuyFanli}</td><td class="fl-num">${unAdsFanli}</td><td class="fl-num">${waitAdsFanli}</td><td class="fl-num">${finishAdsFanli}</td><td class="fl-num" rowspan=2>${allFanli}</td></tr>
<tr><td class="fl-num" colspan=3>${unBuyFanli+waitBuyFanli+finishBuyFanli}</td><td class="fl-num" colspan=3>${unAdsFanli+waitAdsFanli+finishAdsFanli}</td></tr>
</tbody>
</table>