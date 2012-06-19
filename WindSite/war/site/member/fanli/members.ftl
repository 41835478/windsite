<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>会员管理-返利管理-我是淘客-新淘网</title>
<style>
</style>
</@ws.header>
<script src="/assets/min/js/fanli.min.js?v=${dateVersion()}" type="text/javascript"></script>
<script>
$(function(){
	getFanliMemberSearchHtml('',1);
	$('#searchMembers').click(function(){
		getFanliMemberSearchHtmlByBtn();
	});
});
function getFanliMemberSearchHtmlByBtn(){
	getFanliMemberSearchHtml($('#q').val(),1);
};
</script>
<link rel="stylesheet" href="http://static.xintaonet.com/assets/min/css/fanli.css?v=${dateVersion()}" type="text/css"/>
<link rel="stylesheet" href="http://static.xintaonet.com/assets/min/css/huabaosearch.css?v=${dateVersion()}" type="text/css"/>
<style>.wTable td{text-align:center}</style>
<@xt.taoketemplate navselected='taoke' bdselected='fanli-members' group=2>
<div class="search-form">
	<fieldset>
		<legend>搜索</legend>
			<div class="search-auto">
				<s class="l"></s><s class="r"></s>
				<div class="input allWidth"><s class="l"></s><s class="r"></s><input onkeydown="if(event.keyCode==13) {getFanliMemberSearchHtmlByBtn();}" name="q" maxlength="60" value="${q!''}" id="q">
				</div>
				<button id="searchMembers">搜索</button>
			</div>
	</fieldset>
</div>

<TABLE class="wTable" width=100% height=100% border="0" cellspacing="1" cellpadding="1">
	<THEAD>
		<TR>
			<TH width=50px>ID</TH>
			<TH width=150px>用户名</TH>
			<TH width=150px>注册时间</TH>
			<TH width=150px>最近登录</TH>
			<TH width=80px>登录次数</TH>
			<TH>操作</TH>
		</TR>
	</THEAD>
	<TBODY id="membersSearchResult">
	
	</TBODY>
</TABLE>
<@ws.help>
</@ws.help>
</@xt.taoketemplate>
