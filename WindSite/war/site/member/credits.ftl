<script>
$(function() {
	$('#credits-tab').tabs();
	$('#group-discuz').button().click(function(){
		if($('#group-nums-discuz').val()=="0"){
			alert('请选择兑换数量');return;
		}
		$(this).button('disable');
		updateCreditsGroup($('#group-nums-discuz').val(),0);
	});
	<#if member.credit<1000>
	$('#group-discuz').button('disable');
	</#if>
	$('#group-uc').button().click(function(){
		if($('#group-nums-uc').val()=="0"){
			alert('请选择兑换数量');return;
		}
		$(this).button('disable');
		updateCreditsGroup($('#group-nums-uc').val(),1);
	});
	<#if space.credit<1000>
	$('#group-uc').button('disable');
	</#if>
	$('#group-nums-discuz').change(function(){
		$('#group-credits-discuz').text(parseInt($(this).val())*1000);
	});
	$('#group-nums-uc').change(function(){
		$('#group-credits-uc').text(parseInt($(this).val())*1000);
	});
});

</script>
<@ws.info>
<span>
您的论坛积分为【<strong style='color:#D02200;font-weight:bold;'>${member.credit}</strong>】,家园积分为【<strong style='color:#D02200;font-weight:bold;'>${space.credit}</strong>】
</span>
</@ws.info>
<div id="credits-tab">
<ul>
	<li><a href="#credits-tools">兑换中心</a></li>
	<li><a href="#credits-history">兑换记录</a></li>
</ul>
<div id="credits-tools">
<TABLE class="wTable" width="100%" border="0" cellspacing="1" cellpadding="1">
	<THEAD>
		<TR>
			<TH width=150px>兑换类型</TH>
			<TH width=100px>兑换数量</TH>
			<TH width=100px>消耗积分</TH>
			<TH>操作</TH>
		</TR>
	</THEAD>
	<TBODY>
		<tr>
		<td rowspan="2">推广组兑换<br/><span style="color:red">论坛:1000积分=1推广组</span><br/><span style="color:red">家园:1000积分=1推广组</span></td><td>
		<select id="group-nums-discuz">
					<#if member.credit<1000>
						<option value="0">0</option>
					<#else>
					<#list 1..member.credit/1000 as i>
						<option value="${i}">${i}</option>
					</#list>
					</#if></select></td><td><span id="group-credits-discuz">0</span></td><td><button id="group-discuz">论坛积分兑换</button></td>
		</tr>
		<tr><td><select id="group-nums-uc">
					<#if space.credit<1000>
						<option value="0">0</option>
					<#else>
						<option value="0" selected>选择数量</option>
					<#list 1..space.credit/1000 as i>
						<option value="${i}">${i}</option>
					</#list>
					</#if>
				</select></td><td><span id="group-credits-uc">0</span></td><td><button id="group-uc">家园积分兑换</button></td></tr>
	</tbody>
</table>
</div>
<div id="credits-history">
<TABLE class="wTable" width="100%" border="0" cellspacing="1" cellpadding="1">
	<THEAD>
		<TR>
			<TH width=150px>兑换类型</TH>
			<TH width=80px>兑换数量</TH>
			<TH width=80px>兑换积分</TH>
			<TH width=110px>兑换时间</TH>
		</TR>
	</THEAD>
	<TBODY>
	<#if creditsHistory??&&(creditsHistory?size>0)>
		<#list creditsHistory as c>
		<tr><td><#if c.c_type=="0">论坛积分兑换推广组<#else>家园积分兑换推广组</#if></td><td>${c.c_num}</td><td>${c.c_credits}</td><td>${c.updated}</td></tr>
		</#list>
		<#else>
		<tr><td colspan=4>糟糕，您还有没有兑换记录！</td></tr>
	</#if>
	</tbody>
</table>	
</div>
</div>