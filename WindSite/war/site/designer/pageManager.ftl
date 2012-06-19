<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'>
<html>
<head>
<meta name="keywords" content="新淘网,淘宝,淘客,淘宝客,购物,自助建站">
<meta name="description" content="新淘网 - 新淘网实现了多种酷炫图片组件封装，向广大普通互联网用户提供一站式的建站方案，大幅度降低建站门槛，会用鼠标就可以拖拽生成独立而漂亮的淘宝推广网站，让更多的普通互联网用户成为专业淘客、推广淘宝、赚取佣金">
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>淘站页面管理-新淘网</title>
<link href="http://static.xintaonet.com/assets/css/ui/jquery-ui.css" rel="stylesheet"/>
<link href="http://static.xintaonet.com/assets/stylesheets/common.css" rel="stylesheet"/>
<link href="http://static.xintaonet.com/assets/stylesheets/xintao.css" rel="stylesheet"/>
<link href="http://static.xintaonet.com/assets/stylesheets/designer.css" rel="stylesheet"/>
<link href="http://static.xintaonet.com/assets/stylesheets/pagemanager.css" rel="stylesheet"/>
<link href="/assets/js/jquery/jqtransform/jqtransform.css" rel="stylesheet"/>
<!--[if IE 6]><style>html {background: url(null) fixed;}#ds-toolbar {top: expression(documentElement.scrollTop);}</style><![endif]-->
</head>
<body>
<#assign site=USER.sites[0] VN=1>
<#if USER.usb.versionNo??&&''!=USER.usb.versionNo><#assign VN=USER.usb.versionNo></#if>
<#assign www=site.domainName+'.xintaonet.com'>
<#if site.www??&&''!=site.www><#assign www=site.www><#if VN==1.5><#assign VN=1.55></#if></#if>
<div id="page" style="padding-top:35px;">
<div style="background-color: #E8E8E8;padding: 5px 0px;text-align: center;">新淘网淘站装修教程集锦<a href="http://forum.xintaonet.com/forumdisplay.php?fid=18" target="_blank"> 翻阅教程</a></div>
	<@p.pageBar pages=pages></@p.pageBar>
    <div id="content" class="tb-shop">
    	<div id="ds-sub-title"><h2>页面管理</h2><p class="market"><!--<a href="" style="background:none;color:#3366CC">使用帮助</a>--></p></div>
    	<div id="pm" class="layout" style="width:100%;">
			<div class="col-main">
				<div class="main-wrap">
					<div id="pm-content">
						<#assign s=USER.sites[0]>
						<#if USER.limit??><@ws.info><#if s.status!=1>您尚未发布您的站点首页,请点击<a href="/router/member/page/designer" style="font-weight:bold;color:#00E;" target="_blank">设计站点</a>并发布后再新增新的页面设计.</#if>您目前的设计页面限额为<strong style='color:#D02200;'>${USER.limit.pages}</strong>,<#if USER.usb.versionNo==1>（<a href="http://pay.taobao.com/mysub/subdeal/upgrade_order_sub_deal.htm?servId=22000691&appstore=myapp2upgrade" target="_blank" style="font-size: 16px;font-weight: bold;color:#f60;">升级版本</a>即可获取更多页面设计）</#if>您已经设计<strong style='color:#D02200;'>${daoPage.totalCount}</strong>个页面.发布后的页面。您可以在页面顶部导航条设计中调整菜单显示页面。</@ws.info></#if>
						<@ws.pager pageNo=(daoPage.pageNo?number) pageSize=daoPage.pageSize?number pageCount=daoPage.totalPageCount url="/router/member/page/manager"></@ws.pager>
						<table id="J_PMTable" class="pm-tbl">
							<colgroup><col width="15"><col width="35"><col width="400"><col width="0"><col width="6"><col width="20"><col width="300"></colgroup>
							<thead>
								<tr>
									<th>&nbsp;</th>
									<th>&nbsp;</th>
									<th>页面名称</th>
									<th></th>
									<th>&nbsp;</th>
									<th>&nbsp;</th>
									<th>编辑</th>
									<th>状态</th>
									<th>&nbsp;</th>
								</tr>
							</thead>
							<tbody>
								<#assign siteWWW='shop'+USER.user_id+'.xintaonet.com'>
								<#if USER.sites[0].www??&&''!=USER.sites[0].www><#assign siteWWW=USER.sites[0].www></#if>
								<#if pages??&&pages?size!=0>
								<#list pages as p>
								<tr class="pm-tbl-tr-disable-sort   pm-tbl-tr-home J_TPage">
									<td class="pm-tbl-spacer">&nbsp;</td>
									<td align="center"><#if !p.isIndex&&p.status><input type="radio" name="index-set" value="${p.id}"></#if></td>
									<td class="pm-tbl-title"><div class="quick-edit"><div class="quick-edit-shower"><#if p.isIndex><strong style="color:red">[首页]</strong><#if p.status><a href="http://${siteWWW}" target="_blank">${p.title}</a><#else>${p.title}</#if><#else><#if p.status><a href="http://${siteWWW}/pages/${p.pageid}.html" target="_blank">${p.title}</a><#else>${p.title}</#if></#if></div></div></td>
									<td align="center"></td>
									<td>&nbsp;</td>
									<td align="center">&nbsp;</td>
									<td align="center"><a class="page-update-info" pid="${p.id}">修改基本信息</a>&nbsp;&nbsp;&nbsp;<a href="/router/member/page/designer?page=${p.id}">设计</a>&nbsp;&nbsp;&nbsp;<a href="/router/member/page/theme?id=${p.id}" title="为该页面单独指定主题">主题</a>&nbsp;&nbsp;&nbsp;<a href="/router/member/page/templates?page=${p.id}" title="根据现有模板重新生成页面">模板</a>&nbsp;&nbsp;&nbsp;<a href="/router/member/page/layout/manager/${p.id}" title="管理页面布局">布局</a>&nbsp;&nbsp;&nbsp;<a href="javascript:;" class="J_PageDeploy" title="直接发布当前页面" page="${p.id}">一键发布</a></td>
									<td align="center"><#if p.status>最新发布时间[<span style="color:#f60;">${p.deployDate?datetime}</span>]<#if p.nextDeploy??><br/>下次自动发布[${p.nextDeploy?datetime}]</#if><#else>未发布</#if></td>
									<td>&nbsp;</td>
								</tr>
								</#list>
								</#if>
							</tbody>
							<tfoot><tr><td colspan="9"><a href="javascript:;" style="color:#f60;" id="J_PageIndexSet">设置选中的页面为首页</a>&nbsp;&nbsp;&nbsp;&nbsp;<#if pages??&&(pages?size>=USER.limit.pages)><#if (USER.usb.versionNo>1)>您的页面限额已用完，无法添加新页面<#else>订购淘客返利版或者卖家版即可<b>添加使用更多页面</b>，<a target="_blank" href="http://pay.taobao.com/mysub/subdeal/upgrade_order_sub_deal.htm?servId=22000691&appstore=myapp2upgrade">点击立即订购&gt;&gt;</a></#if><#else><a href="/router/member/page/templates" class="pm-add-trigger">添加新页面</a></#if></td></tr></tfoot>
						</table>
					</div>
				</div>
			</div>
			<div class="col-sub">
				<div id="pm-nav">
					<ul>
						<li class="s1"><a href="/router/member/page/manager" class="active">淘站基础页</a></li>
						<li class="s3"><a href="<#if (USER.usb.versionNo??&&USER.usb.versionNo>1)>/router/member/page/manager/detail<#else>javascript:PageUtils.loadVersionInfo(VERSIONNO,'宝贝详情页');</#if>">宝贝详情页</a></li>
						<li class="s2"><a href="<#if (USER.usb.versionNo??&&USER.usb.versionNo>1)>/router/member/page/manager/search<#else>javascript:PageUtils.loadVersionInfo(VERSIONNO,'搜索列表页');</#if>">搜索列表页</a></li>
					</ul>
				</div>
			</div>
		</div>
    </div>	
</div>
<div id="page-manager-dialog" title="添加新页面" style="display:none;position:relative;">
<div class="module-steps">
	<ol class="steps steps-two"><li class="current"><span>1.填写页面基本信息</span></li><li class="last"><span>2.选择默认布局</span></li></ol>
	<div class="items">
		<div class="step firstStep">
	       <form style="width:650px;margin:0px auto;">
				<div class="rowElem ks-clear "><label class="label-key">标题:</label><input id="page-title" type="text" size=30 /></div>
				<div class="rowElem ks-clear form-select">
					<label class="label-key">所属分类:</label>
					<select id="page-cid">
						<option selected value="0">请选择分类</option>
				    	<#list cats as c><option value="${c.cid}">${c.name}</option></#list>
					</select>
				</div>
				<div class="rowElem ks-clear "><label class="label-key">关键词:</label><textarea id="page-keywords" style="height:50px;width:300px;"></textarea></div>
				<div class="rowElem ks-clear "><label class="label-key">描述:</label><textarea id="page-description" style="height:50px;width:300px;"></textarea></div>
		  </form>
		  <div class="fm-item ks-clear" style="padding-left:270px;"><span class="btn btn-ok"><input type="button" value="下一步"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
		</div> 
		<div class="step secondStep">
			<div class="rowElem ks-clear "  style="width:650px;margin:0px auto;"><ul class="layout-list"><li><a class="l-grid-m" layout="grid-m"></a></li><li><a class="l-grid-s5m0" layout="grid-s5m0"></a><a class="l-grid-m0s5" layout="grid-m0s5"></a></li><li><a class="l-grid-s5m0e5" layout="grid-s5m0e5"></a><a class="l-grid-m0s5e5" layout="grid-m0s5e5"></a><a class="l-grid-s5e5m0" layout="grid-s5e5m0"></a></li></ul></div>
			<div class="fm-item ks-clear" style="padding-left:270px;"><span class="btn btn-ok"><input type="button" value="完成"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a class="prev" href="javascript:;" style="color:#f30;">上一步</a></div>
			<@ws.help>
			<p>提示：进入页面设计器后，您可以通过布局管理来重新调整布局设计。</P>
		</@ws.help>
		</div>
	</div>
	<div class="ks-clear"></div> 
</div> 
</div>
<div id="J_ReleaseDialog" title="发布" style="display:none;position:relative;">
<@ws.help>
	<h3>1.大功告成！马上让买家看到你的最新淘站杰作吧！</h3>
</@ws.help>
<div class="fm-item ks-clear" style="padding-left:100px;"><span class="btn btn-ok" id="J_ConfirmRelease" <#if page??&&''!=page>pageid="${page.id}"</#if> isHeader="false"><input type="button" value="确认发布"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a id="J_CancelRelease" href="javascript:;" style="color:#f30;">取消</a></div>
</div>
<div id="page-update-dialog" title="编辑页面信息" style="display:none;position:relative;">
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
<script src="/assets/js/page/PageUtils.js"></script>
<script src="/assets/js/page/theme.js"></script>
<!--Designer-->
<script type="text/javascript">
var DEBUG=true,MODE='${mode}',ISDESIGNER=true,USERID='${USER.user_id}',USERNICK='${USER.nick}',PID='${USER.pid}',VERSIONNO=${VN},LIMIT_PAGES=${USER.limit.pages},LIMIT_LAYOUTS=${USER.limit.layouts},LIMIT_MODULES=${USER.limit.modules},LIMIT_HEARDS=${USER.limit.headers};
$(function(){
	initPageManager();
});
</script>
</body>
</html>
