<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>页面管理-淘客建站-我是淘客-新淘网</title>
</@ws.header>
<script>
$(function(){
	$('a.modifyPageInfo').click(function() {
				getHtmlTemplateDetail($(this).attr('tid'));
			});
	$('#add-page').button().click(function() {
		openAddTemplateDialog();
	});
	$('#setIndex').button().click(function() {
				var checked = $('input[type="radio"][name="index-radio"]:checked');
				if (checked.length == 0) {
					alert('您尚未选中页面');
					return;
				}
				setPageIndex(checked.val());
			});
	$('#cancelIndex').button().click(function() {
				$('input[type="radio"][name="index-radio"]').attr('checked',
						false);
			});
	$('.page-url-copy').click(function() {
				$(this).select();
			});
});
</script>
<style>
.t-title{overflow: hidden;width:190px;white-space: nowrap;display: inline-block;cursor: pointer;}.desc{color: gray;}.page-url-copy{width:250px;cursor:pointer;}
</style>
<@xt.taoketemplate navselected='taoke' bdselected='site-template'>
<#if sites?size==1>
<#list sites as s>
<input type="hidden" id="parenttid" value="${parenttid}"/>
<input type="hidden" id="site_Id" value="${s.id}"/>
		<#if USER.limit??><@ws.info><#if s.status!=1>您尚未发布您的站点首页,请点击<a href="/router/member/designer?siteId=${s.id}" style="font-weight:bold;color:#00E;" target="_blank">设计站点</a>并发布后再新增新的页面设计.</#if>您目前的设计页面限额为<strong style='color:#D02200;'>${USER.limit.pages}</strong>,您已经设计<strong style='color:#D02200;'>${templates?size}</strong>个页面.发布后的页面。您可以在首页的设计中调整菜单显示页面。</@ws.info></#if>
		<#if USER.limit??&&(USER.limit.pages>templates?size)&&(s.status==1)><a href="/router/member/page/manager" style="color:red;font-size:14px;font-weight:700;">请进入新版本页面管理</a></#if>
		<TABLE class="wTable">
			<THEAD><TR bgcolor="#E0E0E0"><TH width=230px>页面名称</TH><TH width=270px>页面地址</TH><TH width=80px>状态</TH><TH>操作</TH></TR>
			</THEAD>
			<tbody>
				<#if indexTemplate??><tr class="odd"><td width=230px><span class="t-title" title="${indexTemplate.name}">首页【${indexTemplate.name}】</span></td><td>
				<input type="text" class="page-url-copy" value="http://<#if s.www??&&s.www!=''>${s.www}<#else>${s.domainName}.xintaonet.com</#if>"/></td><td><#if s.status==1>已发布<#else>未发布</#if></td><td>
				<a class='modifyPageInfo' tid="${indexTemplate.id}">管理</a>&nbsp;&nbsp;
				<a id="designerSite" href="/router/member/designer?tid=${indexTemplate.id}" class='page-a' target="_blank">设计</a>&nbsp;&nbsp;<a  href="http://<#if s.www??&&s.www!=''>${s.www}<#else>${s.domainName}.xintaonet.com</#if>?check=${USER.pid}" target="_blank">检查PID</a></td></tr></#if>
			<#if templates??&&(templates?size>0)>
				<#list templates as t>
				<tr class="<#if t_index%2==1>odd<#else>even</#if>"><td>
				<#if t.status==1>
				<input type="radio" name="index-radio" value="${t.id}"/>&nbsp;&nbsp;
				<span class="t-title"><a class='page-a' title="${t.name}"  style="color:#00E;" href="http://<#if s.www??&&s.www!=''>${s.www}<#else>${s.domainName}.xintaonet.com</#if>/pages/${t.path}" target="_blank">${t.name}</a></span>
				<#else>
				<span class='page-a'>${t.name}</span>
				</#if>
				</td><td><input type="text" class="page-url-copy" value="http://<#if s.www??&&s.www!=''>${s.www}<#else>${s.domainName}.xintaonet.com</#if>/pages/${t.path}"/></td><td><#if t.status==1>已发布<#else>未发布</#if></td>
				<td width=200px><a class='modifyPageInfo' tid="${t.id}">管理</a>&nbsp;&nbsp;<a href="/router/member/designer?tid=${t.id}" target="_blank">设计</a>&nbsp;&nbsp;<a href="http://<#if s.www??&&s.www!=''>${s.www}<#else>${s.domainName}.xintaonet.com</#if>/pages/${t.path}?check=${USER.pid}" target="_blank">检查PID</a></td></tr>
				</#list>
				<td colspan=4><!--<button id="setIndex">设置当前选中的页面为站点首页</button>&nbsp;&nbsp;&nbsp;&nbsp;<button id="cancelIndex">取消选中</button>--></td>
			</#if></tbody>
		</TABLE>
		<@ws.help>
		<a href="http://www.xintaonet.com/router/site/view/support?type=help-designer&faq=09" target="_blank"><h3>1.如何设计多个页面？</h3></a>
		<a href="http://www.xintaonet.com/router/site/view/support?type=help-designer&faq=10" target="_blank"><h3>2.如何更换我的首页？</h3></a>
		</@ws.help>
</#list></#if>		
</@xt.taoketemplate>