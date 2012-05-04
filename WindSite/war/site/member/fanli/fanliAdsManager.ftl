<@ws.fanliheader navselected='H04'>
<meta name="keywords" content="${sitetitle},会员管理">
<meta name="description" content="会员管理 - ${sitetitle}">
<title>我的推广-${sitetitle}</title>
</@ws.fanliheader>
<script src="/assets/js/jquery/tools/dateinput.min.js" type="text/javascript"></script>
<script src="/assets/min/js/fanlisite.min.js?v=${dateVersion()}" type="text/javascript"></script>
<script>
$(function(){
	initFanliSiteAds('${q}');
});
</script>
<link rel="stylesheet" href="/assets/min/css/fanli.css?v=${dateVersion()}" type="text/css"/>
<link rel="stylesheet" href="/assets/min/css/huabaosearch.css?v=${dateVersion()}" type="text/css"/>
<style>.wTable td{text-align:center;line-height:17px;}.links-head {cursor:pointer;background: #5DAE40;border:1px solid #8AB78A;height: 20px;padding: 4px 14px 4px 9px;}.links-head .title {color:white;float: left;height: 20px;margin-right: 5px;overflow: hidden;font-size: 14px;font-weight: bold;}.links-head span{float:left;}.links-head .title a{color:red;}.links-head .title a:hover{color:#333;}
.shortcut-rows{background-color: white;border-bottom: 1px dotted #CCC;clear: both;float: left;margin: 0px 0px 5px;overflow: hidden;position: relative;width: 590px;}
.shortcut-rows h4 {padding: 5px 8px;height:100px;background: url(/assets/images/cat.png) repeat-y 0px 0px;background-color: #F3F7F9;background-position: 0% 50%;background-repeat: repeat-y;border: 1px solid #CCE3F1;clear: left;float: left;font-size: 14px;margin: 0px 8px 0px 0px;overflow: hidden;width: 12px;}
.shortcut-rows ul {height:100px;float: left;margin: 0px;overflow: hidden;padding-top: 5px;width: 540px;}.shortcut-rows ul li{float: left;line-height: 18px;margin-right: 20px;overflow: hidden;padding: 5px 0px 0px;white-space: nowrap;display:inline;}.shortcut-rows li a{color: #04D;font-size: 12px;}
#operate-overlay{display:none;width:400px;border:6px solid #666;border:6px solid rgba(82, 82, 82, 0.698);-moz-border-radius:8px;-webkit-border-radius:8px;}#operate-overlay h2 {color:#fff;background-color:#6D84B4;padding:5px 10px;border:1px solid #3B5998;font-size:20px;}
.wTable td, .wTable th {height: 30px;line-height: 14px;}.search-form{margin-left:80px;}
.adsstep {width: 100%;margin-bottom: 20px;overflow: hidden;}.adsstep li,.adsstep li span {background-image: url('/assets/min/images/bg-step.png');background-repeat: no-repeat;text-align: center;}.adsstep li {width: 207px;height: 29px;line-height: 29px;padding-left: 20px;float: left;overflow: hidden;text-align: center;position: relative;background-position: right -108px;border: none;color: #605F5F;}.adsstep li span {width: 100%;font-size: 14px;line-height: 27px;line-height: 29px;display: block;position: absolute;left: -17px;background-position: 0 -108px;text-indent: 17px;}.adsstep li.finished {background-position: -4px -108px;}.adsstep li.finished span {left: 0;background-position: 0 -108px;}.adsstep li.current {height: 29px;background-position: right -51px;border: none;}.adsstep li.current span {background-position: 17px -51px;font-weight: bold;color: #AB4400;}.adsstep li.last {border-right: 1px #DBDBDB solid;background-position: right -406px;}.adsstep li.last span {background: none;left: 0;}.adsstep li.last-current {height: 29px;background-position: right -166px;border: none;border-right: 1px solid #ffab0a;}.adsstep li.last-current span {background-position: 15px -166px;font-weight: bold;color: #AB4400;left: -15px;}
.adsstep-two li{width:450px;}.date {border:1px solid #ccc;font-size:18px;padding:2px;text-align:center;width:194px;-moz-box-shadow:0 0 10px #eee inset;}#calroot {z-Index:1000;margin-top:-1px;width:198px;padding:2px;background-color:#fff;font-size:11px;border:1px solid #ccc;-moz-border-radius:5px;-webkit-border-radius:5px;-moz-box-shadow: 0 0 15px #666;-webkit-box-shadow: 0 0 15px #666;}#calhead {	padding:2px 0;height:22px;} #caltitle {font-size:14px;color:#0150D1;	float:left;text-align:center;width:155px;line-height:20px;text-shadow:0 1px 0 #ddd;}
#calnext, #calprev {display:block;width:20px;height:20px;background:transparent url(/assets/css/ui/images/prev.gif) no-repeat scroll center center;float:left;cursor:pointer;}#calnext {background-image:url(/assets/css/ui/images/next.gif);float:right;}#calprev.caldisabled, #calnext.caldisabled {visibility:hidden;}#caltitle select {font-size:10px;	}#caldays {height:14px;border-bottom:1px solid #ddd;}#caldays span {display:block;float:left;width:28px;text-align:center;}#calweeks {background-color:#fff;margin-top:4px;}.calweek {clear:left;height:22px;}.calweek a {display:block;float:left;width:27px;height:20px;text-decoration:none;font-size:11px;margin-left:1px;text-align:center;line-height:20px;color:#666;-moz-border-radius:3px;-webkit-border-radius:3px;} .calweek a:hover, .calfocus {background-color:#ddd;}a.calsun {color:red;}a.caloff {color:#ccc;}a.caloff:hover {background-color:rgb(245, 245, 250);}a.caldisabled {background-color:#efefef !important;color:#ccc	!important;cursor:default;}#calcurrent {background-color:#498CE2;color:#fff;}#caltoday {background-color:#333;color:#fff;}
#adsMemberWizard {font-size:12px;width:940px;height:600px;overflow-x:hidden;position:relative;}#adsMemberWizard .items {width:20000em;clear:both;position:absolute;}#adsMemberWizard .step {width:940px;float:left;}#adsMemberWizard .clearfix {clear:both;padding-top:10px;}#adsMemberWizard .right {float:right;}
.search-form {margin:0px;padding:0px;margin-left:150px;margin-bottom: 10px;position: relative;width: 604px;}
</style>
<@xt.fanlitemplate>
<#assign commission=0>
<#if member.adCommissionRate><#assign commission=member.adCommissionRate><#else><#assign commission=siteCommission.adCommissionRate></#if>
<@ws.help>
<span style="color: #F60;">提醒:</span>&nbsp;&nbsp;您目前的推广返利比例为&nbsp;<strong style="color:red;">${commission}</strong>%。推广链接为<input id="adsLink" style="width:400px;padding:2px;" value="http://${www}/router/fanli/registe?id=${member.id}"><input type="button" id="copyAdsLink" style="padding:2px;" value="复制推广链接">
<h3>1.什么是我的推广？</h3>
<p>我的推广是本站为广大会员提供的推广返利功能。通过复制您的推广链接，邀请他人注册本站，只要他通过您的推广链接注册了本站，今后只要他通过本站购物，您将一直获得&nbsp;<strong style="color:red;">${commission}</strong>%&nbsp;的返利</p>
</@ws.help>
<ol id="adsstep" class="adsstep adsstep-two"><li class="current"><span>1.我的推广会员</span></li><li class="last"><span>2.推广交易记录</span></li></ol>
<div id="adsMemberWizard">
	<div class="items">
		<div class="step firstStep" align=center>
			<div class="shop-custom item-search-form search-form">
				<fieldset><legend>搜索</legend>
					<div class="search-auto" style="margin-top:-3px;">
						<input onkeydown="if(event.keyCode==13) {searchFanliSiteMembers();}" name="q" maxlength="60" value="${q!''}" id="q">
						<input type="button" id="searchMembers"/>
					</div>
				</fieldset>
			</div>
			<TABLE class="wTable" width=100% height=100% border="0" cellspacing="1" cellpadding="1">
				<THEAD>
					<TR>
						<TH width=50px>ID</TH>
						<TH width=200px>用户名</TH>
						<TH width=150px>注册时间</TH>
						<TH width=150px>最近登录</TH>
						<TH width=80px>登录次数</TH>
						<TH>操作</TH>
					</TR>
				</THEAD>
				<TBODY id="membersSearchResult">
				</TBODY>
			</TABLE>
		</div> 
		<div class="step secondStep">
		<span class="btn btn-ok" id="backAdsMembers"><input type="button" value="返回推广会员列表"></span>
			<TABLE class="wTable" width=100% height=100% border="0" cellspacing="1" cellpadding="1">
				<THEAD>
					<TR>
						<TH width=120px>淘宝交易号</TH>
						<TH width=200px>商品名称</TH>
						<TH width=50px>单价</TH>
						<TH width=50px>数量</TH>
						<TH width=80px>推广返利</TH>
						<TH width=120px>交易时间</TH>
						<TH>会员</TH>
					</TR>
				</THEAD>
				<TBODY id="reportSearchResult">
				</TBODY>
			</TABLE>
		</div> 
	</div>  
</div> 
</@xt.fanlitemplate>
