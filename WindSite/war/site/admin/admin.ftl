<@ws.header>
<meta name="keywords" content="新淘网,淘宝,淘客,淘宝客,购物,自助建站,电子商务,网赚">
<meta name="description" content="新淘网 - 系统管理">
<title>系统管理 - 新淘网</title>
</@ws.header>
<style>
#sidebar {
	width: 140px;
	margin: 0px;
	}
ul {
	list-style: none;
	margin: 0;
	padding: 0;
	}	
#sidebar li a {
	height: 32px;
  	voice-family: "\"}\""; 
  	voice-family: inherit;
  	height: 24px;
	text-decoration: none;
	}	
	
#sidebar li a:link, #sidebar li a:visited {
	color: #656556;
	display: block;
	background:  url(http://static.xintaonet.com/assets/images/sidebar.gif);
	padding: 8px 0 0 20px;
	}
	
#sidebar li a:hover {
	color: #474739;
	background:  url(http://static.xintaonet.com/assets/images/sidebar.gif) 0 -32px;
	padding: 8px 0 0 20px;
	}
</style>
<script type="text/javascript">
	$(function() {
		$("#typeA").click(function(){//组件类型
			getHtmlType();
		});
		$("#widgetA").click(function(){//组件
			getHtmlWidgets("0");
		});
		$("#systemTemplateA").click(function(){//系统模板
			getHtmlSystemTemplates();
		});
		$("#coolSitesA").click(function(){//酷站审核
			getHtmlCoolSitesAudit();
		});
		$("#domainA").click(function(){//域名审核
			getHtmlDomainAudit();
		});
		$('#weiboDomainA').click(function(){//域名审核
			getHtmlWeiboDomainAudit();
		});
		$("#userAnalyticsA").click(function(){//用户分析
			getHtmlUserAnalytics();
		});
		$("#userManagerA").click(function(){//用户管理
			getHtmlUserManager();
		});
		$("#adItemsManagerA").click(function(){//商品推荐
			getHtmlADItemsManager();
		});
		$("#designerErrorA").click(function(){//设计器日志
			getHtmlDesignerError();
		});
		$("#sellerAdsA").click(function(){
			getHtmlAdminAds();
		});//卖家广告计划
		var goto = $.url.param("goto");
		var wid= $.url.param("wid");
		if($.url.param("goto")){
			switch(goto){
				case "type"://组件类型
						getHtmlType();
					break;
				case "widget"://组件
					if(wid){
						getHtmlWidget(wid);
					}else{
						getHtmlWidgets();
					}
					break;
				case "template"://系统模板
					getHtmlSystemTemplates();
					break;
				case "coolsite"://酷站审核
					getHtmlCoolSitesAudit();
					break;
				case "userAnalytics"://用户分析
					getHtmlUserAnalytics();
					break;
				case "userManager"://用户管理
					getHtmlUserManager();
					break;		
				case "adItemsManager"://商品推荐
					getHtmlADItemsManager();	
					break;
				case "designerError"://设计器日志
					getHtmlDesignerError();
					break;			
				default://缺省组件类型		
					getHtmlSystemTemplates();			
			}
		}else{
			getHtmlSystemTemplates();
		}
	});
function openPageTemplateDialog(){
$('#page-template-dialog').remove();
$('body').append('<div id="page-template-dialog" title="新增模板"><input id="page-title" size=40></input><input id="page-add" type="button" value="新增"></div>');
$('#page-template-dialog').dialog({
bgiframe : true,
autoOpen : true,
width : 500,
zIndex : 1000,
modal : true
});
$('#page-add').unbind('click').click(function(){
	addPageTemplate();
});
}	
/**
 * 系统模板管理
 * 
 * @return
 */
function getHtmlSystemTemplates() {
	//getRightContentHtmlContent("/router/member/admin/pages?v="+Math.random(),
	//		"GET", {}, rightContentAppend);
}
function addPageTemplate(){
var sender = new WindSender("/router/member/page/add");
	sender.load('POST', {
				"page_title" : $('#page-title').val(),
				"type" : 'sys'
			}, function(response) {
				if (response.isSuccess()) {
					alert("新增页面完成");
					getHtmlSystemTemplates();
				} else {
					alert(response.msg);
				}
			});
}
function auditDomain(did, status, remark) {
	var sender = new WindSender("/router/member/admin/domain/" + did + "/audit");
	sender.load('POST', {
				"status" : status,
				"remark" : remark
			}, function(response) {
				if (response.isSuccess()) {
					alert("审核完成");
					getHtmlDomainAudit();
				} else {
					alert(response.msg);
				}
			});
}	
function getHtmlAdminAds(){
getRightContentHtmlContent('/router/member/admin/ads', "POST", {}, rightContentAppend);
}	
function getHtmlWeiboDomainAudit(){
getRightContentHtmlContent('/router/member/admin/wbdomain/audit', "GET", {}, rightContentAppend);
}	
function getHtmlCacheManager(){
	$('#rightContent').empty().load('/site/admin/cacheManager.html?v='+Math.random(),function(){
		$('#keywordsCache').button().click(function(){
			var sender = new WindSender("/router/member/admin/cache/words");
			sender.load("GET", {
					}, function(response) {
						if (response.isSuccess()) {
							alert('阿里妈妈关键词更新成功');
						} else {
							alert(response.msg);
						}
					});
		});
		$('#shopCatsCache').button().click(function(){
			var sender = new WindSender("/router/member/admin/cache/shopCats");
			sender.load("GET", {
					}, function(response) {
						if (response.isSuccess()) {
							alert('淘宝店铺前台类目更新成功');
						} else {
							alert(response.msg);
						}
					});
		});
		$('#activitiesCache').button().click(function(){
			var sender = new WindSender("/router/member/admin/cache/activities");
			sender.load("GET", {
					}, function(response) {
						if (response.isSuccess()) {
							alert('阿里妈妈活动更新成功');
						} else {
							alert(response.msg);
						}
					});
		});
		$('#channelsCache').button().click(function(){
			var sender = new WindSender("/router/member/admin/cache/channels");
			sender.load("GET", {
					}, function(response) {
						if (response.isSuccess()) {
							alert('阿里妈妈频道更新成功');
						} else {
							alert(response.msg);
						}
					});
		});
	});
}	
</script>	
<div class="ui-widget-content ui-corner-all" style="width:950px;height:100%;" align="left">
<table>
	<tr>
		<td width=140px; valign="top">
			<div id="sidebar">
				<ul>
					<li><a href="#" id="systemTemplateA" title="管理模板">新版本模板</a></li>
					<li><a href="#" id="domainA" title="独立域名绑定审核">域名审核</a></li>
					<li><a href="#" id="weiboDomainA" title="微博域名绑定审核">微博审核</a></li>
					<li><a href="#" id="coolSitesA" title="酷站缩略图审核">酷站审核</a></li>
					<li><a href="#" id="sellerAdsA" title="查看卖家广告计划">卖家广告计划</a></li>
					<li><a href="#" id="userAnalyticsA" title="分析用户注册及登录">用户分析</a></li>
					<li><a href="#" id="userManagerA" title="管理用户">用户管理</a></li>
					<!--<li><a href="#" id="adItemsManagerA" title="管理商品推荐">商品推荐</a></li>-->
					<li><a href="#" id="designerErrorA" title="管理用户">设计器日志</a></li>
					<li><a href="/awstats/awstats.pl?config=www.xintaonet.com" title="查看访问日志" target="_blank">访问日志分析</a></li>
					<li><a href="/awstats/awstats.pl?config=mail" title="查看邮件日志" target="_blank">邮件日志分析</a></li>
					<!--<li><a href="#" id="typeA" title="管理淘客展示组件类型">组件类型</a></li>
					<li><a href="#" id="widgetA" title="管理淘客展示组件及属性配置">淘客组件</a></li>
					<li><a href="/router/member/admin/forum/add/3" target="_blank" title="管理博客">新增博客阵地</a></li>
					<li><a href="/router/member/admin/forum/add/2" target="_blank" id="snsForumA" title="管理社区">新增社区阵地</a></li>
					<li><a href="/router/member/admin/forum/add/4" target="_blank" id="microblogForumA" title="管理微博">新增微博阵地</a></li>-->
					<li><a href="#" id="cacheManager" onclick="getHtmlCacheManager();return false;" title="更新新淘网的数据缓存">缓存更新</a></li>
				</ul>
			</div>
		</td>
		<td width=100% height=100% valign=top>
			<div id="rightContent" style="min-height:400px;height:100%">
			</div>
		</td>
	</tr>
</table>
</div>
<#include "/site/template/footer.ftl">