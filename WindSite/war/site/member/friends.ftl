<script type="text/javascript">
	$(function() {
		//Tab
		$("#tabs").tabs();
		//全选及反选
		$("#inviteAll").click(function(){ 
			$("input[name='invite']").attr("checked",$(this).attr("checked")); 
		});
		$("#sendInvite").click(function(){
			var uids = "";
			var isFirst = true;
			$("input[name='invite']").each(function(i) {
				if ($(this).attr("checked")) {
					if (!isFirst) {
						uids += ",";
					} else {
						isFirst = false;
					}
					uids += $(this).val();
				}
			});
			if(uids.length>0){
				sendInvite(uids);
			}else{
				alert("您还没有选择要邀请的好友");
			}
		}).hover(
			function() {
				$(this).addClass('ui-state-hover');
			},
			function() {
				$(this).removeClass('ui-state-hover');
			}
		)
		.focus(function() {
			$(this).addClass('ui-state-focus');
		})
		.blur(function() {
			$(this).removeClass('ui-state-focus');
		});
});
</script>
<div class="ui-widget-content">
<div id="tabs">
	<ul>
		<#if invites?size!=0>
		<li><a href="#tabs-1">未开通淘站的好友列表</a></li>
		</#if>
		<#if users?size!=0>
		<li><a href="#tabs-2">已开通淘站的好友列表</a></li>
		</#if>
	</ul>
	<div id="tabs-1">
		<#if invites?size!=0>
		<table class="wTable" width=100%>
			<thead>
				<tr>
					<td><input id="inviteAll" type="checkbox">全选</td>
					<td>头像</td>
					<td>昵称</td>
					<td>真实姓名</td>
				</tr>
			</thead>
			<tbody>
				<#list invites as i>
					<tr>
						<td width="50px;"><input name="invite" type="checkbox" value="${i.uid}"/></td>
						<td width="80px;"><img src="${i.icon.icon_40}"/></td>
						<td width="80px;">${i.nick}</td>
						<td>${i.realName}</td>
					</tr>
				</#list>
			</tbody>
			<tfoot>
				<tr>
					<td colspan=4>
						<textArea cols=60 rows=5>我已在新淘网开通淘站服务!你也快来吧!</textArea><br/>
						<input id="sendInvite" class="ui-state-default ui-corner-all button" type="button" value="发送邀请"/>
					</td>
				</tr>
			</tfoot>
		</table>
		<#else>
			<#if users?size!=0>
				<h4>恭喜您,所有好友都已开通新淘网！</h4>
			<#else>
				<h4>糟糕,您在淘江湖还没有好友！</h4>
			</#if>
		</#if>
	</div>
	<div id="tabs-2">
		<#if users?size!=0>
		<table class="wTable" width=100%>
			<thead>
				<tr>
					<td>昵称</td>
					<td>站点</td>
				</tr>
			</thead>
			<tbody>
				<#list users as u>
					<tr>
						<td width="80px">${u.nick}</td>
						<td>
							<#if u.sites?size!=0>
							<ul>
								<#list u.sites as s>
									<li><a href="http://${s.domainName}.xintaonet.com" style="color:#00E;font-weight:bold;" target="_blank">${s.title}</a></li>
								</#list>
							</ul>		
							</#if>
						</td>
					</tr>
				</#list>
			</tbody>
		</table>
		<#else>
			<#if (invites?size>0)>
				<h4>哎呀,您还没有好友加入到新淘网,快去要请他们吧！</h4>
			</#if>
		</#if>
	</div>
</div>
</div>