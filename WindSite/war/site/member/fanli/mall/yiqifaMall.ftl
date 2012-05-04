<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'>
<html>
<head>
<meta name="keywords" content="新淘网,淘宝,淘客,淘宝客,购物,自助建站">
<meta name="description" content="新淘网 - 新淘网实现了多种酷炫图片组件封装，向广大普通互联网用户提供一站式的建站方案，大幅度降低建站门槛，会用鼠标就可以拖拽生成独立而漂亮的淘宝推广网站，让更多的普通互联网用户成为专业淘客、推广淘宝、赚取佣金">
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>商城管理-新淘网</title>
<link href="/assets/stylesheets/common.css" rel="stylesheet"/>
<link href="/assets/stylesheets/xintao.css" rel="stylesheet"/>
<link href="/assets/stylesheets/pagemanager.css" rel="stylesheet"/>
<link href="/assets/css/ui/jquery-ui.css" rel="stylesheet"/>
<script>
var MYMALLS=<#if mallsJson??&&''!=mallsJson>${mallsJson}<#else>[]</#if>;
var MALLS=<#if b2cMallsJson??&&''!=b2cMallsJson>${b2cMallsJson}<#else>[]</#if>;
</script>
<style>
.ui-dialog {
	padding: 0px;
	border: 8px solid #FFAE4A;
	border-top-left-radius: 2px 2px;
	border-top-right-radius: 2px 2px;
	background: #FCF9E6;
}

.ui-dialog .ui-corner-all {
	border-bottom-left-radius: 0px 0px;
	border-bottom-right-radius: 0px 0px;
	border-top-left-radius: 0px 0px;
	border-top-right-radius: 0px 0px;
}
.help_info {
	background: 16px 16px no-repeat url(/assets/min/stylesheets/images/info.gif);
	padding: 14px 14px 14px 60px;
	margin: 0em;
	margin-top: 10px;
	font-size: 12px;
	border: 1px solid #FC6;
	background-color: #FFFFE3;
}

.help_info h3 {
	color: #4C7E07;
	margin-bottom: 5px;
}

.help_info a:hover h3 {
	color: #F60;
}

.help_info p {
	text-indent: 2em;
	color: #FF6B00;
	margin-bottom: 5px;
}
.red{color:red;}
#J_YiqifaCats a{
color:#666;
}
#J_YiqifaCats a.selected{
color: white;
display: inline-block;
background: #6CA620;
border: 1px solid #41810A;
padding: 2px 3px;
line-height: 12px;
vertical-align: middle;}
.pm-tbl .J_YiqifaActionTr thead th{
background:#C5E1F7;
font-weight:700;
color:#366;
}
.pm-tbl .J_YiqifaActionTr tbody td.last{
border-bottom-width:0px;
}
.J_YiqifaActionTitle{
	color:red;
}
</style>

</head>
<body>
<div id="page">
    <div id="content" class="tb-shop">
    	<div id="ds-sub-title"><h2>商城管理&nbsp;&nbsp;&nbsp;<a href="/router/member/sitemanager" style="font-size:16px;">返回站点管理</a></h2></div>
    	<div id="pm" class="layout" style="width:100%;">
			<div class="col-main">
				<div class="main-wrap">
					<div id="pm-content" style="padding-left:20px;">
						<table class="pm-tbl">
						<tbody id="J_YiqifaCats">
							<#if cats??&&cats?size!=0>
							<#list cats as c>
							<#if c_index%6==0><tr></#if>
							<td><a class="J_YiqifaCat<#if c_index==0> selected</#if>" cat="${c.id}">${c.title}</a></td>
							<#if c_index%6==5></tr></#if>
							</#list>
							</#if>
						</tbody>
						</table>
						<table class="pm-tbl">
						<thead>
							<tr>
							<th><input type="button" value="上传商城自定义链接" id="J_OpenUpload" style="padding:2px;"/></th>
							<th>
							商城分类:<select id="J_YiqifaCatsSelect"><option value="">全部</option><#if cats??&&cats?size!=0><#list cats as c><option value="${c.id}"<#if c_index==0> selected</#if>>${c.title}</option></#list></#if></select>
							计费类型:<select id="J_YiqifaAdType">
							<option value="" selected>全部</option>
							<option value="cps">CPS(销售)</option>
							<option value="cpa">CPA(行为)</option>
							<option value="cpc">CPC(点击)</option>
							</select>
							&nbsp;&nbsp;&nbsp;
							审核方式:<select id="J_YiqifaAudit">
							<option value="">全部</option>
							<option value="needless">无需审核</option>
							<option value="auto">自动审核</option>
							<option value="manual">人工审核</option>
							</select>
							</th></tr>
						</thead>
						</table>
						<table class="pm-tbl" style="text-align:center">
							<thead>
							<tr><th width=150>LOGO</th><th width=50>ID</th><th width=150>名称</th><th width=50>计费</th><th width=100>分类</th><th width=100>佣金</th><th width=200>周期</th><th width=100>审核</th><th>操作</th></tr>
							</thead>
							<tbody id="J_YiqifaMalls">
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div class="col-sub">
				<div id="pm-nav">
					<ul>
						<li class="s1"><a class="active">亿起发联盟</a></li>
					</ul>
				</div>
			</div>
		</div>
    </div>	
</div>
<div id="J_YiqifaAddDialog" title="确认商城推广" style="display:none;position:relative;">
<@ws.help>
	<h3>第一步：登录<a id="J_YiqifaShenQing" target="_blank" style="color:red;">亿起发联盟</a>，申请该商城推广。</h3>
	<h3>第二步：登录新淘网后台，商城管理---点击推广此商城</h3>
	<h3 style="color:red;">提醒：如果未到亿起发联盟申请，则推广无效</h3>
</@ws.help>
<div class="fm-item ks-clear" style="padding-left:100px;"><span class="btn btn-ok" id="J_ConfirmAddYiqifaMall"><input type="button" value="确认推广"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a id="J_CancelAdd" href="javascript:;" style="color:#f30;">取消当前操作</a></div>
</div>
<div id="J_YiqifaRemoveDialog" title="取消商城推广" style="display:none;position:relative;">
<@ws.help>
	<h3>您确定要删除该商城推广？删除后，您的商城推广频道将不再显示该商城！</h3>
</@ws.help>
<div class="fm-item ks-clear" style="padding-left:100px;"><span class="btn btn-ok" id="J_ConfirmRemoveYiqifaMall"><input type="button" value="取消推广"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a id="J_CancelRemove" href="javascript:;" style="color:#f30;">取消当前操作</a></div>
</div>
<div id="J_YiqifaUploadDialog" title="批量上传商城推广链接" style="display:none;position:relative;">
<@ws.help>
	<p>
		<ul>
		<li>第一步：登录<a href="http://www.yiqifa.com/earner/applyBatchLinkList.do" style="color:red;text-decoration: underline" target="_blank">亿起发联盟</a>后台，下载批量自定义链接:<a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=12112" style="color:red;text-decoration: underline" target="_blank">相关帮助</a></li>
		<li>第二步：选择您下载的自定义链接XLS文件上传</li>
		</ul>
	</p>
</@ws.help>
<form id="yiqifa_form" name="yiqifa_form" method="post" action="/router/member/fl/mall/upload" enctype="multipart/form-data">xls文件：<input type="file" class="multi" name="yiqifa_xls" id="yiqifa_xls"></form>
<div class="fm-item ks-clear" style="padding-left:100px;"><span class="btn btn-ok" id="J_ConfirmUploadYiqifaMall"><input type="button" value="确认上传"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a id="J_CloseUpload" href="javascript:;" style="color:#f30;">关闭</a></div>
</div>
<!--Jquery-->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js"></script>
<script src="/assets/js/jquery/ui/jquery-ui.min.js"></script>
<script src="/assets/js/page/yiqifa.js"></script>
<script src="/assets/js/taobao/core/TaobaoConstants.js"></script>
<script src="/assets/js/site/core/WindSender.js"></script>
<script src="/assets/js/site/core/WindResponse.js"></script>
<script>
$(function(){
	initYiqifaMall();
	<#if mallsJson??&&'{}'==mallsJson>$('#J_OpenUpload').click();</#if>
});
</script>
</body>
</html>