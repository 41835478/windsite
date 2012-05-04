<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>会员管理--微博管理-我是淘客-新淘网</title>
</@ws.header>
<script src="/assets/js/jquery/tools/validator.min.js?v=${dateVersion()}" type="text/javascript"></script>
<script>
$(function(){
	initWeiboUsers();
});
</script>
<@xt.weibotemplate navselected='taoke' bdselected='weibo-links' group=2>
<style>
.wTable td, .wTable th {height: 30px;line-height: 14px;}input.i-text{width:300px;}input.wb-link-name{width:150px;}
</style>
<table class="wTable" id="wb-profile-links" width=100%>
	<THEAD>
		<TR>
			<TH width=200px>昵称</TH>
			<TH width=400px>TA的微博</TH>
			<TH>操作</TH>
		</TR>
	</THEAD>
</table>	
</@xt.weibotemplate>
