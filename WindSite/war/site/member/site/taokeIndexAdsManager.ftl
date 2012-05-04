<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>首页广告-站点管理-淘客建站-我是淘客-新淘网</title>
<script language="javascript" type="text/javascript" src="/assets/js/site/taokeindexads.js?v=${dateVersion()}"></script>
</@ws.header>
<script language="javascript" type="text/javascript" src="/designer/assets/js/adPlansEditor.js?v=${dateVersion()}"></script>
<script>
$(function(){
	$('.taokeIndexPlanManager').click(function(){
		getHtmlTaokeIndexPlan($(this).attr('tid'));
		return false;
	});
});
</script>
<style>
.wTable td{text-align:center;line-height:20px;}.bb-info{width:350px;height:85px;}.bb-selectbox{margin:30px 0px 30px 0px;float:left;width:20px;}.bb-pic{float:left;width:90px;}.bb-disc{float:left;width:230px;line-height:14px;text-align:left}.bb-disc a{color:#0063DC;}.bb-disc a:hover{color:#F60;}
#operate-overlay{display:none;width:400px;border:6px solid #666;border:6px solid rgba(82, 82, 82, 0.698);-moz-border-radius:8px;-webkit-border-radius:8px;}#operate-overlay h2 {color:#fff;background-color:#6D84B4;padding:5px 10px;border:1px solid #3B5998;font-size:20px;}
</style>
<@xt.taoketemplate navselected='taoke' bdselected='site-indexAds'>
<@ws.info>每个页面可以放置10个卖家广告计划，其中5个为淘客选择投放，剩余5个为系统自动推荐</@ws.info>
<TABLE class="wTable">
	<THEAD><TR bgcolor="#E0E0E0"><TH width=400px>页面名称</TH><TH width=100px>淘客投放</TH><TH width=100px>系统投放</TH><TH>操作</TH></TR></THEAD>
	<tbody>
	<#if templates??&&(templates?size>0)>
		<#list templates as t>
		<tr class="<#if t_index%2==1>odd<#else>even</#if>"><td style="text-align:left">
		<span class="t-title"><a class='page-a' title="${t.name}" style="color:#00E;" href="http://<#if site.www??&&site.www!=''>${site.www}<#else>${site.domainName}.xintaonet.com</#if><#if t.path??&&t.path!=''>/pages/${t.path}</#if>" target="_blank">${t.name}</a></span>
		</td><td><#if t.cads??&&t.cads!=''>${t.cads?split(',')?size}<#else>0</#if></td><td><#if t.sads??&&t.sads!=''>${t.sads?split(',')?size}<#else>0</#if></td>
		<td><a class="taokeIndexPlanManager" tid="${t.id}" >管理</a></td></tr>
		</#list>
	</#if>
	</tbody>
</TABLE>
<@ws.help>
<h3>为什么我不可以添加广告？</h3>
<p>只有发布后的页面才可以添加广告。每个页面可以自己挑选5个广告计划，当达到5个后，只有删除其中一个之后，才可以继续添加</p>
</@ws.help>	
</@xt.taoketemplate>