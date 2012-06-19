<@ws.header>
<meta name="keywords" content="新淘网,首页广告计划">
<meta name="description" content="新淘网 - 我的新淘网,我是卖家,广告管理，文章广告计划">
<title>文章广告计划-广告管理-我是卖家-新淘网</title>
<script language="javascript" type="text/javascript" src="/assets/js/site/indexads.js?v=${dateVersion()}"></script>
</@ws.header>
<script>
$(function(){
	initPlanManager('blog');
});
</script>
<style>
#tableProfile td{line-height:20px;text-align:left}.btn{background: url(http://static.xintaonet.com/assets/images/btn_bg.gif) no-repeat;color: white;cursor: pointer;display: inline-block;font-size: 14px;font-weight: bold;height: 25px;line-height: 25px;text-align: center;width: 100px;background-position: 0px -350px;}
#planWizard {font-size:12px;width:750px;height:650px;overflow-x:hidden;position:relative;}  
#planWizard .items {width:20000em;clear:both;position:absolute;}
#planWizard .step {padding:20px 30px;width:680px;float:left;}
#planWizard h2{position:relative;}
#planWizard h2,#planWizard h2 strong {color:#5DAE40;font-weight:bold;border-bottom:1px dotted #ccc;font-size:17px;padding-bottom:5px;}
#planWizard h2 em {display:block;font-size:14px;color:#666;font-weight:normal;margin-top:5px;}
#planWizard ul {padding:0px !important;margin:0px !important;}
#planWizard .firstStep li {list-style-type:none;list-style-image:none;margin-bottom:15px;}
#planWizard .firstStep li label{color:#f60;font-weight:bold;}
#planWizard .firstStep label {font-size:15px;display:block;cursor:pointer;}#planWizard .firstStep label strong {color:#789;	position:relative;top:-1px;}
#planWizard .firstStep em {display:block;font-size:11px;color:#666;font-style:normal;font-weight:normal}
#planWizard select {border:1px solid #ccc;padding:4px;}
#planWizard label span {color:#b8128f;font-weight:bold;position:relative;top:4px;font-size:20px;}#planWizard .double label {width:50%;float:left;}#planWizard .double .text {width:93%;}
#planWizard .clearfix {clear:both;padding-top:10px;}#planWizard .right {float:right;}
#planWizard #status {border: 1px solid #8AB78A;margin:0px !important;height:35px;background:#F0F5F9;padding-left:25px !important;}#status li {list-style-type:none;list-style-image:none;float:left;color:#414141;padding:10px 30px;}#status li.active {background-color:#5DAE40;color:#fff;font-weight:bold;}
.button{background: url(http://static.xintaonet.com/assets/images/btn_bg.gif) no-repeat 0px 0px;color: white;cursor: pointer;display: inline-block;font-size: 14px;font-weight: bold;height: 25px;line-height: 25px;text-align: center;width: 80px;background-position: 0px 0px;}
.nav_pager {background: #EEE;border-top: 1px solid #999;padding: 5px;}.nav_pager a {padding: 0px 5px;color: #005BD8;}.nav_pager a.highlight {zoom: 1;color: black;font-weight: bold;}
.itemSearchResult li {margin-bottom:0px;float: left;border: 1px solid #AAA;float: left;cursor: pointer;margin-right: 15px;margin-top: 5px;overflow: hidden;width: 200px;height: 54px;}img.customechecked,input.customechecked {position: absolute;right: 0px;bottom: 0px;cursor: pointer;}.itemSearchResult .item,.itemSearchResult .item {float: right;width: 140px;position: relative;}.itemSearchResult li .title a{line-height:12px;height:12px;overflow: hidden;white-space: nowrap;}
.itemSearchResult .item .k,.itemSearchResult .item .k {color: #274F80;font-weight: bold;}.itemSearchResult .item .v,.itemSearchResult .item .v {color: #F60;font-weight: bold;}.itemSearchResult .item div,.itemSearchResult .item div {height: 18px;overflow: hidden;width: 130px;}.itemSearchResult .pic,.itemSearchResult .pic {width: 52px;height: 52px;float: left;}.itemSearchResult .pic img,.itemSearchResult .pic img {max-width: 50px;max-height: 50px;width: 50px;height: 50px;cursor: pointer;vertical-align: middle;}
.ui-selecting{background: #FECA40;}.ui-selected{background: #F39814;}span.red{color:red;font-weight:bold;}.firstStep td{vertical-align: top;}
.planTags{list-style:none;margin:0px;padding:0px;}.planTags li{display:inline;float:left;margin-right:10px;color:#0082CB;lin-height:14px;height:14px;cursor:pointer;}
.wTable td{text-align:center;line-height:20px;}.bb-info{width:350px;height:85px;}.bb-selectbox{margin:30px 0px 30px 0px;float:left;width:20px;}.bb-pic{float:left;width:90px;}.bb-disc{float:left;width:230px;line-height:14px;text-align:left}.bb-disc a{color:#0063DC;}.bb-disc a:hover{color:#F60;}
#operate-overlay{display:none;width:400px;border:6px solid #666;border:6px solid rgba(82, 82, 82, 0.698);-moz-border-radius:8px;-webkit-border-radius:8px;}#operate-overlay h2 {color:#fff;background-color:#6D84B4;padding:5px 10px;border:1px solid #3B5998;font-size:20px;}
</style>
<@xt.sellertemplate navselected='seller' bdselected='ads-blog'>
<#if (plans?size<USER.limit.blogAds)>
<a href="#" id="createPlan" class="button">新增计划</a>
<div style="height:2px;"></div>
</#if>
<@ws.info>
<span>
您的文章广告计划数量最高限额为<strong style='color:#D02200;font-weight:bold;'>${USER.limit.blogAds}</strong>  个，
您还可以添加 <strong style='color:#D02200;font-weight:bold;'>${USER.limit.blogAds-plans?size}</strong> 个
</span>
</@ws.info>
<TABLE class="wTable" width=100% height=100% border="0" cellspacing="1" cellpadding="1">
	<THEAD>
		<TR>
			<TH width=200px>广告计划名称</TH>
			<TH width=80px>是否主推</TH>
			<TH width=80px>被投放站点</TH>
			<TH width=80px>是否有效</TH>
			<TH width=200px>创建时间</TH>
			<TH>操作</TH>
		</TR>
	</THEAD>
	<TBODY>
	<#if (plans?size>0)>
		<#list plans as p>
			<TR class="plan <#if p_index%2==0>odd<#else>even</#if>" pid="${p.id}">
				<TD align=left><a href="#" class="plan-view" pid="${p.id}" style="color:#00E;font-weight:bold">${p.name}</a></TD>
				<TD><#if p.isDefault>是<#else>否</#if></TD>
				<TD><a class="plan-ads" style="color:#00E;font-weight:bold" pid="${p.id}">${p.used}个</a></TD>
				<TD><#if p.isValid>有效<#else>无效</#if></TD>
				<TD>${p.created?datetime}</TD>
				<TD><a href="#"  class="updatePlan" pid="${p.id}">修改广告计划</a></TD>
			</TR>
		</#list>
	<#else>
		<tr><td colspan=4 align="center"><h3>抱歉，您还未创建推广计划</h3></td>
		</tr>
	</#if>
	</TBODY>
</TABLE>
<@ws.help>
	<ul><li><a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=3919" target="_blank"><h3>1.什么是广告计划？如何创建广告计划？</h3></a></li>
	<li><h3>1.为什么我将其他计划设置为主推计划后，系统没有投放该计划？</h3><p>当您已经创建过主推计划后，再次修改其他计划为主推计划时，需要第二天才会生效，当天投放的仍然是之前的主推计划</p></li></ul>
</@ws.help>
</@xt.sellertemplate>