<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>链接管理--微博管理-我是淘客-新淘网</title>
</@ws.header>
<script src="/assets/js/jquery/tools/validator.min.js?v=${dateVersion()}" type="text/javascript"></script>
<script>
$(function(){
	initWeiboLinks();
});
</script>
<@xt.weibotemplate navselected='taoke' bdselected='weibo-links' group=2>
<style>
.nBox {margin-bottom: 15px;}.nBox .links-head {cursor:pointer;background: #5DAE40;border:1px solid #8AB78A;height: 20px;padding: 4px 14px 4px 9px;}.nBox .links-head .title {color:white;float: left;height: 20px;margin-right: 5px;overflow: hidden;font-size: 14px;font-weight: bold;}.nBox .links-head span{float:left;}
.nBox .links-head .title a{color:red;}.nBox .links-head .title a:hover{color:#333;}
.wTable td, .wTable th {height: 30px;line-height: 14px;}input.i-text{width:300px;}input.wb-link-name{width:150px;}
</style>
<div id="links">
<div class="nBox">
	<div class="links-head"><span class="ui-state-default ui-icon ui-icon-minusthick"></span><h3 class="title">微博用户资料下方链接<#if !profileLinks??||profileLinks?size<5>&nbsp;&nbsp;[&nbsp;<a id="wb-profile-link-create">新增用户资料广告链接</a>&nbsp;]&nbsp;</#if>目前顶部链接限额为5个</h3></div>
	<div class="links-body"><table class="wTable" id="wb-profile-links" width=100%>
	<THEAD>
		<TR>
			<TH width=200px>标题</TH>
			<TH width=400px>链接</TH>
			<TH>操作</TH>
		</TR>
	</THEAD>
	<#if profileLinks??&&profileLinks?size!=0><#list profileLinks as l><tr class="wb-link-row"><td width=200px><input class="i-text wb-link-name" value="${l.title}"/></td><td width=400px><input class="i-text wb-link-address" value="${l.link}"/></td><td><a class="delete-link" t="profile">删除</a></td></tr></#list><#else></#if></table>
	<span  class="btn btn-ok wb-link-confirm" t="profile"><input type="button" value="保存用户链接"></span><span class="fm-confirm"><span class="loading-text fn-hide">正在提交信息</span></span>
	</div>
</div>
<div class="nBox">
	<div class="links-head"><span class="ui-state-default ui-icon ui-icon-minusthick"></span><h3 class="title">微博顶部链接<#if !headLinks??||headLinks?size<5>&nbsp;&nbsp;[&nbsp;<a id="wb-top-link-create">新增顶部链接</a>&nbsp;]&nbsp;</#if>目前顶部链接限额为5个</h3></div>
	<div class="links-body"><table class="wTable" id="wb-top-links" width=100%>
	<THEAD>
		<TR>
			<TH width=200px>标题</TH>
			<TH width=400px>链接</TH>
			<TH>操作</TH>
		</TR>
	</THEAD>
	<#if headLinks??&&headLinks?size!=0><#list headLinks?keys as l><tr class="wb-link-row"><td width=200px><input class="i-text wb-link-name" value="${headLinks[l].link_name}"/></td><td width=400px><input class="i-text wb-link-address" value="${headLinks[l].link_address}"/></td><td><a class="delete-link" t="top">删除</a></td></tr></#list><#else></#if></table>
	<span  class="btn btn-ok wb-link-confirm" t="top"><input type="button" value="保存顶部链接"></span><span class="fm-confirm"><span class="loading-text fn-hide">正在提交信息</span></span>
	</div>
</div>
<div class="nBox">
	<div class="links-head"><span class="ui-state-default ui-icon ui-icon-minusthick"></span><h3 class="title">微博底部链接<#if !footLinks??||footLinks?size<10>&nbsp;&nbsp;[&nbsp;<a id="wb-bottom-link-create">新增底部链接</a>&nbsp;]&nbsp;</#if>目前顶部链接限额为10个</h3></div>
	<div class="links-body"><table class="wTable" id="wb-bottom-links" width=100%>
	<THEAD>
		<TR>
			<TH width=200px>标题</TH>
			<TH width=400px>链接</TH>
			<TH>操作</TH>
		</TR>
	</THEAD>
	<#if footLinks??&&footLinks?size!=0><#list footLinks?keys as l><tr class="wb-link-row"><td width=200px><input class="i-text wb-link-name" value="${footLinks[l].link_name}"/></td><td width=400px><input class="i-text wb-link-address" value="${footLinks[l].link_address}"/></td><td><a class="delete-link" t="bottom">删除</a></td></tr></#list><#else></#if></table></div>
	<span class="btn btn-ok wb-link-confirm" t="bottom"><input type="button" value="保存底部链接"></span><span class="fm-confirm"><span class="loading-text fn-hide">正在提交信息</span></span>
</div>
</div>
</@xt.weibotemplate>
