<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>文章管理-返利管理-我是淘客-新淘网</title>
<style>
</style>
</@ws.header>
<script src="/assets/min/js/fanli.min.js?v=${dateVersion()}" type="text/javascript"></script>
<script>
$(function(){
	initClasss();
});
</script>
<link rel="stylesheet" href="http://static.xintaonet.com/assets/min/css/fanli.css?v=${dateVersion()}" type="text/css"/>
<style>.wTable td{text-align:center}.links-head {background: #5DAE40;border:1px solid #8AB78A;height: 20px;padding: 4px 14px 4px 9px;}.links-head .title {color:white;float: left;height: 20px;margin-right: 5px;overflow: hidden;font-size: 14px;font-weight: bold;}.links-head span{float:left;}.links-head .title a{color:red;}.links-head .title a:hover{color:#333;}
.shortcut-rows{background-color: white;border-bottom: 1px dotted #CCC;clear: both;float: left;margin: 0px 0px 5px;overflow: hidden;position: relative;width: 590px;}
.shortcut-rows h4 {padding: 5px 8px;height:100px;background: url(http://static.xintaonet.com/assets/images/cat.png) repeat-y 0px 0px;background-color: #F3F7F9;background-position: 0% 50%;background-repeat: repeat-y;border: 1px solid #CCE3F1;clear: left;float: left;font-size: 14px;margin: 0px 8px 0px 0px;overflow: hidden;width: 12px;}
.shortcut-rows ul {height:100px;float: left;margin: 0px;overflow: hidden;padding-top: 5px;width: 540px;}.shortcut-rows ul li{float: left;line-height: 18px;margin-right: 20px;overflow: hidden;padding: 5px 0px 0px;white-space: nowrap;display:inline;}.shortcut-rows li a{color: #04D;font-size: 12px;}
#operate-overlay{display:none;width:400px;border:6px solid #666;border:6px solid rgba(82, 82, 82, 0.698);-moz-border-radius:8px;-webkit-border-radius:8px;}#operate-overlay h2 {color:#fff;background-color:#6D84B4;padding:5px 10px;border:1px solid #3B5998;font-size:20px;}
.wTable td, .wTable th {height: 30px;line-height: 14px;}#keywords .k{width:180px;padding:2px;}#keywords .v{width:350px;padding:2px;}
</style>
<@xt.taoketemplate navselected='taoke' bdselected='site-class' group=1>
<div class="links-head"><h3 class="title">站点所有文章版块&nbsp;&nbsp;[&nbsp;<a class="createClass" t="F">新增文章版块</a>&nbsp;]&nbsp;&nbsp;&nbsp;<!--[&nbsp;<a id="keywordsManager">文章关键词</a>&nbsp;]&nbsp;--></h3></div>
<TABLE class="wTable" width=100% height=100% border="0" cellspacing="1" cellpadding="1">
	<THEAD>
		<TR>
			<TH width=100px>显示顺序</TH>
			<TH width=150px>版块名称</TH>
			<TH width=200px>关联家园日志分类</TH>
			<TH width=150px>版块类型</TH>
			<TH>操作</TH>
		</TR>
	</THEAD>
	<TBODY>
		<#if classes??&&classes?size!=0><#list classes as c><tr><td>${c.sortOrder}</td><td>${c.title}</td><td>${c.classTitle}</td><td><#if 0==c.type>系统<#else>自定义</#if></td><td><a class="modify-class" cid="${c.id}">编辑</a>&nbsp;&nbsp;&nbsp;&nbsp;<#if 0==c.type><#else><a class="delete-class" cid="${c.id}">删除</a></#if></td></tr></#list>
		<#else>
		<tr><td colspan=5>您还未添加自己的文章版块</td></tr>
		</#if>
	</TBODY>
</TABLE>
<@ws.help>
</@ws.help>
</@xt.taoketemplate>
