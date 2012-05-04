<#setting number_format="0.##"> 
<script type="text/javascript">
$(function() {
	$('.audit').button().click(function(){
		auditWeiboDomain($(this).attr('did'),"1");
		
	});
	$('.auditCancel').button().click(function(){
		var did = $(this).attr('did');
		$('#auditWeiboCanceldialog').remove();
		$('body').append('<div id="auditWeiboCanceldialog" title="审核未通过">审核意见:<input id="auditRemark" size="60"/></div>');
		$('#auditWeiboCanceldialog').dialog({
			bgiframe: true,
			autoOpen: false,
			width:400,
			buttons: {
				'取消': function() {
					$(this).dialog('close');
				},
				'确定': function() {
					if($("#auditRemark").val().length==0){
						alert("审核意见不能为空！");return;
					}
					auditWeiboDomain(did,"2",$("#auditRemark").val());
					$('#auditRemark').val('');
				}
			}
	});
		$('#auditWeiboCanceldialog').dialog('open');
	});
});
function auditWeiboDomain(did, status, remark) {
	var sender = new WindSender("/router/member/admin/wbdomain/" + did + "/audit");
	sender.load('POST', {
				"status" : status,
				"remark" : remark
			}, function(response) {
				if (response.isSuccess()) {
					alert("审核完成");
					getHtmlWeiboDomainAudit();
				} else {
					alert(response.msg);
				}
			});
}
</script>
<TABLE class="wTable" style="padding-left:2px;padding-right:2px;" width=100% border="0" cellspacing="1" cellpadding="1">
	<THEAD>
		<TR>
			<TH width=150px>审核</TH>
			<TH width=100px>会员</TH>
			<TH width=150px>域名</TH>
			<TH>ICP</TH>
		</TR>
	</THEAD>
	<TBODY>
	<#if domains?size!=0>
		<#list domains as d>
			<TR>
				<TD><button class="audit" did="${d.site_id}">通过</button><button class="auditCancel" did="${d.site_id}">未通过</button></TD>
				<TD>${d.nick}</TD>
				<TD><a href="http://${d.tdomain}" target="_blank">${d.tdomain}</a></TD>
				<TD>${d.icp}</TD>
			</TR>
		</#list>
		<#else>
		<tr><td colspan=8 align="center"><h3>糟糕！还没有人提交域名</h3></td>
		</tr>
	</#if>
	</TBODY>
</TABLE>
</div>
</div>