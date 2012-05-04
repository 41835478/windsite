<#setting number_format="0.##"> 
<script type="text/javascript">
$(function() {
	$('.audit').button().click(function(){
		auditCoolSite($(this).attr('sid'),"true");
		
	});
	$('.auditCancel').button().click(function(){
		$('#auditCanceldialog').dialog('option','sid',$(this).attr('sid'));
		$('#auditCanceldialog').dialog('open');
	});
	$('.coolsite-thumb-span').hover(function(){
		$(this).parent().find('img').show();	
	},function(){
		$(this).parent().find('img').hide();
	});
	$('#auditCanceldialog').dialog({
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
					auditCoolSite($('#auditCanceldialog').dialog('option','sid'),"false",$("#auditRemark").val());
					$('#auditRemark').val('');
				}
			}
	});
});
</script>
<style>
.thumbs{
position:relative;
}
.thumbs img{
	position:absolute;
	left:30px;
	top:-60px;
	display:none;
}
.coolsite-thumb-span{
	cursor:pointer;
}
</style>
<div id="auditCanceldialog" title="审核未通过" style="display:none;">
	审核意见:<input id="auditRemark" size="60">
</div>
<TABLE class="wTable" style="padding-left:2px;padding-right:2px;" width=100% border="0" cellspacing="1" cellpadding="1">
	<THEAD>
		<TR>
			<TH width=80px>审核</TH>
			<TH width=55px>640X480</TH>
			<TH width=55px>160X120</TH>
			<TH width=55px>90X80</TH>
			<TH width=150px>站点名称</TH>
		</TR>
	</THEAD>
	<TBODY>
	<#if sites?size!=0>
		<#list sites as s>
			<#assign pic = '/zone/'+(s.user_id?substring((s.user_id?length)-2,(s.user_id?length)))+'/'+s.user_id+'/'+s.user_id>
			<TR>
				<TD><button class="audit" sid="${s.id}">通过</button><button class="auditCancel" sid="${s.id}">未通过</button></TD>
				<TD><div class="thumbs" ><span class="coolsite-thumb-span">640X480</span><img src="${pic}_640X480.png" width="640px" height="480px"/></div></TD>
				<TD><div class="thumbs"><span class="coolsite-thumb-span">160X120</span><img src="${pic}_160X120.png" width="160px" height="120px"/></div></TD>
				<TD><div class="thumbs"><span class="coolsite-thumb-span">90X80</span><img src="${pic}_90X80.png" width="90px" height="80px"/></div></TD>
				<TD>
					<a href="http://${s.site.domainName}.xintaonet.com" target="_blank">${s.site.title}</a>
				</TD>
			</TR>
		</#list>
		<#else>
		<tr><td colspan=8 align="center"><h3>糟糕！还没有人提交酷站</h3></td>
		</tr>
	</#if>
	</TBODY>
</TABLE>
</div>
</div>