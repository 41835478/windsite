<script>
$(function(){
	$('#createdDate').datepicker(
		{
			numberOfMonths: 3,
			dateFormat: 'yy-mm-dd',
			defaultDate:0,
			minDate: '-3M', 
			maxDate: '0D',
   			onSelect: function(dateText, inst) {
   				getHtmlUserManager(dateText);
   				return false;
			}
		}
	);
	$("#isDisplay").click(function() {
			if($("#createdDate").is(":hidden")){//如果已隐藏则显示并修改链接文字
				$("#createdDate").fadeIn();
				$("#isDisplay").text("点我隐藏查询日期");
			}else{//如果已显示则隐藏并修改链接文字
				$("#createdDate").hide("blind",{},500,function(){$("#isDisplay").text("点我显示查询日期");});
			}
			return false;
		});
});
</script>
<table><tr><td>
<div class="buttonBar" style="height:25px;" align="center">
<a href="#" id="isDisplay">点我隐藏查询日期</a>
</div>
<div id="createdDate" style="margin-left:60px;">
</td></tr><tr><td>
<br/>
总会员<strong style="color:red;">【${userCount}】</strong>&nbsp;&nbsp;&nbsp;总发布站点<strong style="color:red;">【${siteCount}】</strong>&nbsp;&nbsp;&nbsp;${currentDate}注册人数<#if users??><strong style="color:red;">【${users?size}】</strong>&nbsp;&nbsp;&nbsp;发布站点<strong style="color:red;">【${currentSiteCount}】</strong></#if>
<TABLE id="itemsTable" class="wTable" width="100%" border="0" cellspacing="1" cellpadding="1">
	<THEAD>
		<TR>
			<TH width=50px>序号</TH>
			<TH width=100px>昵称</TH>
			<TH width=60px>是否建站</TH>
			<TH width=120px>注册时间</TH>
			<TH width=120px>上次登录时间</TH>
			<TH width=60px>登录次数</TH>
			<TH width=150px>邮箱</TH>
			<!--<TH width=100px>PID</TH>-->
		</TR>
	</THEAD>
	<TBODY id="registerResult">
	<#if users??>
	<#if users?size!=0>
		<#list users as u>
			<TR  style="font-weight: bold;">
				<TD>${u_index+1}</TD>
				<TD>${u.nick}</TD>
				<TD><#if u.sites[0].status==0>未发布<#else><a href="http://${u.sites[0].domainName}.xintaonet.com" target="_blank" style="color:#00E;">已发布</a></#if></TD>
				<TD>${u.created}</TD>
				<TD>${u.last_visit}</TD>
				<TD>${u.visits}</TD>
				<TD>${u.alipay_account}</TD>
				<!--<TD>${u.pid}</TD>-->
			</TR>
		</#list>
		<#else>
		<tr><td colspan=8 align="center"><h3>抱歉，暂无会员</h3></td>
		</tr>
	</#if>
	</#if>
	</TBODY>
</TABLE>
</td></tr></table>