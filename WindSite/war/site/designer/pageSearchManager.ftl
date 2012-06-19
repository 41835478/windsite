<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'>
<html>
<head>
<meta name="keywords" content="新淘网,淘宝,淘客,淘宝客,购物,自助建站">
<meta name="description" content="新淘网 - 新淘网实现了多种酷炫图片组件封装，向广大普通互联网用户提供一站式的建站方案，大幅度降低建站门槛，会用鼠标就可以拖拽生成独立而漂亮的淘宝推广网站，让更多的普通互联网用户成为专业淘客、推广淘宝、赚取佣金">
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>搜索列表页-新淘网</title>
<link href="http://static.xintaonet.com/assets/css/ui/jquery-ui.css" rel="stylesheet"/>
<link href="http://static.xintaonet.com/assets/stylesheets/common.css" rel="stylesheet"/>
<link href="http://static.xintaonet.com/assets/stylesheets/xintao.css" rel="stylesheet"/>
<link href="http://static.xintaonet.com/assets/stylesheets/designer.css" rel="stylesheet"/>
<link href="http://static.xintaonet.com/assets/stylesheets/pagemanager.css" rel="stylesheet"/>
<link href="/assets/js/jquery/jqtransform/jqtransform.css" rel="stylesheet"/>
<!--[if IE 6]><style>html {background: url(null) fixed;}#ds-toolbar {top: expression(documentElement.scrollTop);}</style><![endif]-->
</head>
<body>
<div id="page" style="padding-top:35px;">
<div style="background-color: #E8E8E8;padding: 5px 0px;text-align: center;">新淘网淘站装修教程集锦<a href="http://forum.xintaonet.com/forumdisplay.php?fid=18" target="_blank"> 翻阅教程</a></div>
	<@p.pageBar pages=pages mode=mode></@p.pageBar>
    <div id="content" class="tb-shop">
    	<div id="ds-sub-title"><h2>页面管理</h2><p class="market"><!--<a href="" style="background:none;color:#3366CC">使用帮助</a>--></p></div>
    	<div id="pm" class="layout" style="width:100%;">
			<div class="col-main">
				<div class="main-wrap">
					<div id="pm-content">
						<table id="J_PMTable" class="pm-tbl">
							<colgroup><col width="15"><col width="35"><col width="480"><col width="0"><col width="6"><col width="20"><col width="200"></colgroup>
							<thead>
								<tr>
									<th>&nbsp;</th>
									<th>&nbsp;</th>
									<th>页面名称</th>
									<th></th>
									<th>&nbsp;</th>
									<th>&nbsp;</th>
									<th>编辑</th>
									<th></th>
									<th>&nbsp;</th>
								</tr>
							</thead>
							<tbody>
								<tr class="pm-tbl-tr-disable-sort   pm-tbl-tr-home J_TPage">
									<td class="pm-tbl-spacer">&nbsp;</td>
									<td align="center"></td>
									<td class="pm-tbl-title"><div class="quick-edit"><div class="quick-edit-shower">搜索列表页</div></div></td>
									<td align="center"></td>
									<td>&nbsp;</td>
									<td align="center">&nbsp;</td>
									<td align="center"><a href="/router/member/page/designer/search">设计</a></td>
									<td align="center"></td>
									<td>&nbsp;</td>
								</tr>
							</tbody>
							<#if layout??>
							<tfoot>
							<tr><td colspan="9"><ul id="J_TLayoutList" class="layout-list"><li><a class="l-grid-s5m0 <#if 'grid-s5m0'==layout.layout> selected</#if>" layout="grid-s5m0"></a><a class="l-grid-m0s5 <#if 'grid-m0s5'==layout.layout> selected</#if>" layout="grid-m0s5"></a></li></ul></td></tr>
							<#if siteCommission??><tr><td colspan="9">搜索结果默认显示方案：<input type="radio" name="searchview" value="list" <#if ''==siteCommission.searchView||'list'==siteCommission.searchView>checked</#if>>列表视图&nbsp;&nbsp;&nbsp;<input type="radio" name="searchview" value="grid" <#if 'grid'==siteCommission.searchView>checked</#if>>大图视图&nbsp;&nbsp;&nbsp;<input type="checkbox" id="isSearchBox" <#if !(siteCommission.searchBox??&&!siteCommission.searchBox)>checked</#if>>是否显示搜索框<input type="button" style="padding:2px;" value="确认使用当前配置" id="J_TSearchView"></td></tr></#if>
							</tfoot>
							</#if>
						</table>
						<div class="help_info" align="left" style="position:relative;">
							<h3>1.搜索列表页目前仅开放侧边栏的编辑</h3><h3>2.设计完搜索列表页后点击发布，发布成功后，您站点的搜索列表页侧边栏将生效。</h3>
						</div>
					</div>
				</div>
			</div>
			<div class="col-sub">
				<div id="pm-nav">
					<ul>
						<li class="s1"><a href="/router/member/page/manager">淘站基础页</a></li>
						<li class="s3"><a href="/router/member/page/manager/detail">宝贝详情页</a></li>
						<li class="s2"><a href="/router/member/page/manager/search" class="active">搜索列表页</a></li>
					</ul>
				</div>
			</div>
		</div>
    </div>	
</div>
<!--Jquery-->
<script src="/assets/js/jquery/jquery-1.4.2.min.js"></script>
<script src="/assets/js/jquery/ui/jquery-ui.min.js"></script>
<script src="/assets/js/jquery/tools/jquery.scrollable.all.min.js"></script>
<script src="/assets/js/jquery/jqtransform/jquery.jqtransform.js"></script>
<script src="/assets/js/jquery/log/jquery.log.1.0.1.js"></script>

<!--xintao-->
<script src="/assets/js/taobao/core/TaobaoConstants.js"></script>
<script src="/assets/js/site/core/WindSender.js"></script>
<script src="/assets/js/site/core/WindResponse.js"></script>
<script src="/assets/js/page/PageUtils.js?v=${dateVersion()}"></script>
<script src="/assets/js/page/theme.js?v=${dateVersion()}"></script>
<!--Designer-->
<script type="text/javascript">
var DEBUG=true,MODE='${mode}',ISDESIGNER=true,USERID='${USER.user_id}',USERNICK='${USER.nick}',PID='${USER.pid}',VERSIONNO=${USER.usb.versionNo},LIMIT_PAGES=${USER.limit.pages},LIMIT_LAYOUTS=${USER.limit.layouts},LIMIT_MODULES=${USER.limit.modules},LIMIT_HEARDS=${USER.limit.headers};
$(function(){
initPageSearchManager();
});
</script>
</body>
</html>
