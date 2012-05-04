<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'>
<html>
<head>
<meta name="keywords" content="新淘网,淘宝,淘客,淘宝客,购物,自助建站">
<meta name="description" content="新淘网 - 新淘网实现了多种酷炫图片组件封装，向广大普通互联网用户提供一站式的建站方案，大幅度降低建站门槛，会用鼠标就可以拖拽生成独立而漂亮的淘宝推广网站，让更多的普通互联网用户成为专业淘客、推广淘宝、赚取佣金">
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>淘站模板市场-新淘网</title>
<link href="/assets/css/ui/jquery-ui.css" rel="stylesheet"/>
<link href="/assets/stylesheets/common.css" rel="stylesheet"/>
<link href="/assets/stylesheets/xintao.css" rel="stylesheet"/>
<link href="/assets/stylesheets/designer.css" rel="stylesheet"/>
<link href="/assets/stylesheets/theme.css" rel="stylesheet"/>
<!--[if IE 6]><style>html {background: url(null) fixed;}#ds-toolbar {top: expression(documentElement.scrollTop);}</style><![endif]-->
<style>
.step li span{display: -moz-inline-box;display: inline-block; *zoom: 1; *display: inline;vertical-align: middle;line-height: 100%;text-align: left;font-size: 12px;}
.step {width: 100%;margin-bottom: 10px;overflow: hidden;}.step li,.step li span {background-image: url('/assets/min/images/bg-step.png');background-repeat: no-repeat;text-align: center;}.step li {width: 207px;height: 29px;line-height: 29px;padding-left: 20px;float: left;overflow: hidden;text-align: center;position: relative;background-position: right -108px;border: none;color: #605F5F;}.step li span {width: 100%;font-size: 14px;line-height: 27px;line-height: 29px;display: block;position: absolute;left: -17px;background-position: 0 -108px;text-indent: 17px;}.step li.finished {background-position: -4px -108px;}.step li.finished span {left: 0;background-position: 0 -108px;}.step li.current {height: 29px;background-position: right -51px;border: none;}.step li.current span {background-position: 17px -51px;font-weight: bold;color: #AB4400;}.step li.last {border-right: 1px #DBDBDB solid;background-position: right -406px;}.step li.last span {background: none;left: 0;}.step li.last-current {height: 29px;background-position: right -166px;border: none;border-right: 1px solid #ffab0a;}.step li.last-current span {background-position: 15px -166px;font-weight: bold;color: #AB4400;left: -15px;}
.step-three li{width:450px;}.fm-input .i-text{width:300px}
.layout-list {position: relative;z-index: 1;padding: 10px;}.layout-list .extra {position: absolute;z-index: 1;right: 12px;top: 8px;}.layout-list a {background: url(/assets/min/stylesheets/images/T1o9toXe8gXXXXXXXX-308-141.png) no-repeat 1px 1px;border: 1px solid #FFF;display: inline-block;height: 41px;margin-right: 20px;padding: 1px;width: 151px;cursor: pointer;}.layout-list a:hover,.layout-list a.selected {border-color: #ffc500;}.layout-list .l-grid-s5m0 {background-position: 1px -48px;}.layout-list .l-grid-m0s5 {background-position: -156px -48px;}.layout-list .l-grid-s5m0e5 {background-position: 1px -99px;}.layout-list .l-grid-m0s5e5 {background-position: -156px -99px;}.layout-list .l-grid-s5e5m0 {background-position: -156px 1px;}
</style>
</head>
<body>
<#assign site=USER.sites[0] VN=1>
<#if USER.usb.versionNo??&&''!=USER.usb.versionNo><#assign VN=USER.usb.versionNo></#if>
<#assign www=site.domainName+'.xintaonet.com'>
<#if site.www??&&''!=site.www><#assign www=site.www><#if VN==1.5><#assign VN=1.55></#if></#if>
<#assign versionDesc='普及版（免费）'>
<#if 1==VN>
<#assign versionDesc='普及版（免费）'>
<#elseif 1.5==VN>
<#assign versionDesc='分成版（未绑定域名）'>
<#elseif 1.55==VN>
<#assign versionDesc='分成版（绑定域名）'>
<#elseif 1.6==VN>
<#assign versionDesc='普及版（收费）'>
<#elseif 2==VN>
<#assign versionDesc='返利版'>
<#elseif 3==VN>
<#assign versionDesc='卖家版'>
</#if>
<div id="page" style="padding-top:35px;">
<div style="background-color: #E8E8E8;padding: 5px 0px;text-align: center;">新淘网淘站装修教程集锦<a href="http://forum.xintaonet.com/forumdisplay.php?fid=18" target="_blank"> 翻阅教程</a></div>
<form id="page_preview" target="_blank">
</form>
	<@p.pageBar page=page pages=pages></@p.pageBar>
    <div id="content" class="tb-shop" style="position: relative;overflow: hidden;height:1000px;width:950px;margin-top:20px;">
    	<h1 style="text-align:center;color:red;font-size:16px;font-weight:700;">当前位置---<#if isIndex??&&'true'==isIndex>创建站点首页<#elseif page??>修改自定义页面【${page.title}】<#else>创建自定义页面</#if></h1>
    	<ol class="step step-three"><li class="current"><span>基本信息</span></li><li class="last"><span>选择模板/布局</span></li></ol>
    	<!--page content-->
    	<div id="bd" style="overflow: hidden;width: 20000em;clear: both;position: absolute;">
    		<div class="layout grid-m0 ks-clear" style="float:left;<#if page??>display:none;</#if>">
    			<div class="col-main">
    				<div class="main-wrap J_TRegion" align=center>
    					<div style="width:450px;" align=center>
    					<#if page??>
						<table class="formtable" style="table-layout:auto;" cellspacing="4" cellpadding="4" width=450>
							<tr>
								<th width=100px><label for="modifyTemplateName">标题：</label></th>
								<td><input id="modifyTemplateName" type="text" style="width:300px;padding:2px;" value="${page.title}"/></td>
							</tr>
							<tr>
								<th>推广类别:</th><td>
									<select id="modifyTemplateCid" style="padding:2px;">
										<#list cats as c>
											<#if c.cid==page.cid>
												<option value="${c.cid}" selected>${c.name}</option>
											<#else>
												<option value="${c.cid}">${c.name}</option>
											</#if>
										</#list>
									</select></td>
							</tr>
							<tr>
								<th><label for="modifyTemplateKeyWords">关键词：</label></th>
								<td><textarea id="modifyTemplateKeyWords" rows="4" cols="60">${page.metadata}</textarea></td>
							</tr>
							<tr>
								<th><label for="modifyTemplateDesc">描述：</label></th>
								<td><textarea id="modifyTemplateDesc" rows="4" cols="60">${page.description}</textarea></td>
							</tr>
						</table>
						<#elseif isIndex??&&'true'==isIndex>
						<table class="formtable" cellspacing="4" cellpadding="4" width=450>
							<tr>
								<th width=100px><label for="modifyTemplateName">标题：</label></th>
								<td><input id="modifyTemplateName" type="text" style="width:300px;padding:2px;" value="${site.title}"/></td>
							</tr>
							<tr>
								<th>推广类别:</th><td>
									<select id="modifyTemplateCid" style="padding:2px;">
										<#list cats as c>
											<#if c.cid==site.cid>
												<option value="${c.cid}" selected>${c.name}</option>
											<#else>
												<option value="${c.cid}">${c.name}</option>
											</#if>
										</#list>
									</select></td>
							</tr>
							<tr>
								<th><label for="modifyTemplateKeyWords">关键词：</label></th>
								<td><textarea id="modifyTemplateKeyWords" rows="4" cols="60">${site.metadata}</textarea></td>
							</tr>
							<tr>
								<th><label for="modifyTemplateDesc">描述：</label></th>
								<td><textarea id="modifyTemplateDesc" rows="4" cols="60">${site.description}</textarea></td>
							</tr>
						</table>
						<#else>
						<table class="formtable" cellspacing="4" cellpadding="4" width=450>
							<tr>
								<th width=100px><label for="modifyTemplateName">标题：</label></th>
								<td><input id="modifyTemplateName" type="text" style="width:300px;padding:2px;" value=""/></td>
							</tr>
							<tr>
								<th>推广类别:</th><td>
									<select id="modifyTemplateCid" style="padding:2px;">
										<#list cats as c><option value="${c.cid}">${c.name}</option></#list>
									</select></td>
							</tr>
							<tr>
								<th><label for="modifyTemplateKeyWords">关键词：</label></th>
								<td><textarea id="modifyTemplateKeyWords" rows="4" cols="60"></textarea></td>
							</tr>
							<tr>
								<th><label for="modifyTemplateDesc">描述：</label></th>
								<td><textarea id="modifyTemplateDesc" rows="4" cols="60"></textarea></td>
							</tr>
						</table>
						</#if>
						<div class="fm-item ks-clear" style="padding-left:0px;"><span id="firstStepButton" class="btn btn-ok"><input type="button" value="下一步"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
						</div>
    				</div>
    			</div>	
    		</div>
    		<div class="layout grid-m0 ks-clear" style="float:left;">
    			<div class="col-main">
    				<div class="main-wrap J_TRegion" style="margin-bottom:0px;padding-bottom:0px;" align=center>
    					<span>您当前使用版本为<strong style='color:red;font-weight:bold;font-size:14px;'>${versionDesc}</strong>，升级更高版本后，您需要重新登录才可以生效。<a href="http://forum.xintaonet.com/viewthread.php?tid=707&extra=page%3D1" style="color:red;font-weight:bold;" target="_blank">版本升级帮助</a></span>
    					<table width=100%><tr><td width=190px valign=top>
		    				<ul class="col2 ks-clear" style="margin-top:5px;margin-bottom:10px;"><li style="margin-bottom:5px;margin-right:20px;"><a class="page-templates-version" t="0">所有版本</a></li><li style="margin-right:15px;margin-bottom:5px;"><a class="page-templates-version" t="1">普及版（免费）</a></li><li style="margin-right:15px;margin-bottom:5px;"><a class="page-templates-version" t="1.5">分成版</a></li><li style="margin-right:15px;margin-bottom:5px;"><a class="page-templates-version" t="1.6">普及版（收费）</a></li><li style="margin-right:15px;margin-bottom:5px;"><a class="page-templates-version" t="2">返利版，卖家版</a></li></ul>
		    				</td><td width=760px valign=top>
			    				<div class="mk-list" id="J_img-zoom" style="width:760px;">
									<div class="ks-clear" style="margin:0px 0px 0px 0px;"><h2 style="margin-top:0px;"><#if !page??><a class="prev">返回上一步</a>&nbsp;&nbsp;&nbsp;<a id="page-templates-template">根据模板</a>&nbsp;&nbsp;&nbsp;<a id="page-templates-layout">自定义布局</a></#if></h2></div>
									<div id="page-templates-div" class="page-templates-content">
				    					<ul id="page-templates" class="temp-thumb-ul ks-clear" style="margin-top:5px;">
					    					<#if templates??&&templates?size!=0>
					    						<#list templates as t>
					    							<#assign versionDesc='返利版，卖家版'>
					    							<#if '1'==t.versionNo><#assign versionDesc='普及版（免费）'></#if>
					    							<#if '1.5'==t.versionNo><#assign versionDesc='分成版（未绑定域名）'></#if>
					    							<#if '1.55'==t.versionNo><#assign versionDesc='分成版（绑定域名）'></#if>
					    							<#if '1.6'==t.versionNo><#assign versionDesc='普及版（付费）'></#if>
					    							<li style="float:left;" t="${t.versionNo}">
					    							<dl>
					                                    <dt class="temp-thumb"><a title="${t.title}" href="${t.url}" target="_blank"><img src="/assets/stylesheets/images/templates/${t.id}.jpg"></a></dt>
					                                    <dt class="temp-info">
					                                       <div class="temp-title"><a title="${t.title}" href="${t.url}" target="_blank">${t.title}</a></div>
					                                       <div class="temp-site">适用版本:<span title="${versionDesc}">${versionDesc}&nbsp;以上</span></div>
														   <div class="temp-label">描述：<span>${t.description}</span></div>
														   <div><span class="btn btn-ok btn-apply" template="${t.id}" version="${t.versionNo}"><input type="button" value="应用"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="btn btn-ok btn-preview" style="width:62px;" template="${t.id}"><a href="${t.url}" style="display:block;" target="_blank">演示</a></span></div>
					                                    </dt>
					                                </dl>
					    							</li>
					    						</#list>
					    					</#if>
				    					</ul>
			    						<div class="ks-clear"></div>
			    					</div>
			    					<div id="page-layout-div" class="page-templates-content" style="text-align:left;display:none;">
			    						<ul class="layout-list" style="margin-top:0px;"><li style="float:none;margin-bottom:0px;"><a class="l-grid-m" layout="grid-m"></a></li><li style="float:none;margin-bottom:0px;"><a class="l-grid-s5m0" layout="grid-s5m0"></a><a class="l-grid-m0s5" layout="grid-m0s5"></a></li><li style="float:none;margin-bottom:0px;"><a class="l-grid-s5m0e5" layout="grid-s5m0e5"></a><a class="l-grid-m0s5e5" layout="grid-m0s5e5"></a><a class="l-grid-s5e5m0" layout="grid-s5e5m0"></a><a style="background:none;" layout="grid-s310m0e310"><img src="/assets/stylesheets/images/layout310.jpg"/></a></li></ul>
			    						<div class="fm-item ks-clear"><span id="secondStepButton" class="btn btn-ok"><input type="button" value="确认"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
			    						<div class="ks-clear"></div>
			    					</div>
		    			     	</div>
		    				</td>
		    			</table>
    				</div>
    			</div>
    		</div>
    	</div>
    </div>
</div>
<!--Jquery-->
<script src="/assets/js/jquery/jquery-1.4.2.min.js"></script>
<script src="/assets/js/jquery/ui/jquery-ui.min.js"></script>
<script src="/assets/js/jquery/tools/jquery.scrollable.all.min.js"></script>
<script src="/assets/js/jquery/log/jquery.log.1.0.1.js"></script>
<!--xintao-->
<script src="/assets/js/taobao/core/TaobaoConstants.js"></script>
<script src="/assets/js/site/core/WindSender.js"></script>
<script src="/assets/js/site/core/WindResponse.js"></script>
<script src="/assets/js/page/PageUtils.js"></script>
<script src="/assets/js/page/PageBar.js"></script>
<script src="/assets/js/page/templates.js"></script>
<!--Designer-->
<script type="text/javascript">
var DEBUG=true,<#if isIndex??&&'true'==isIndex>ISINDEX=true,<#else>ISINDEX=false,</#if>MODE='${mode}',ISDESIGNER=true,APP=${USER.appType},<#if page??>PAGEID='${page.id}',</#if>USERID='${USER.user_id}',USERNICK='${USER.nick}',PID='${USER.pid}',VERSIONNO=${VN},LIMIT_LAYOUTS=${USER.limit.layouts},LIMIT_MODULES=${USER.limit.modules},LIMIT_HEARDS=${USER.limit.headers};
</script>
</body>
</html>
