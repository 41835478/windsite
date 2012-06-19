<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>点击排行榜-淘客排行榜-新淘排行榜-新淘网</title>
</@ws.header>
<script>
$(function(){
	$('.top_box li').hover(function(){
		$('.top_box li').not($(this)).removeClass("active");
		$(this).removeClass('active').addClass('active');
	},function(){
		$(this).removeClass('active');
	});
});
</script>
<style>
.top_box{background: #F9FCF7;}
.top_box{display: inline;float: left;margin: 0px 12px 12px 0px;overflow: ;width: 370px;}
.top_box .title{background: url(http://static.xintaonet.com/assets/images/top_greenbox_title_bg.gif);height: 28px;margin: 0px;padding: 0px 0px 0px 6px;}
.top_box .title h3{color: #455409;float: left;margin: 8px 0px 0px;font-size:14px;}
.top_box .note{border:1px solid #D6D6D6;border-width: 0px 1px;clear: both;padding: 8px 5px 5px;}
.top_box .note p{background: #FDFDE0;border: 1px dashed #CCC;margin: 0px 5px;padding: 5px;}
.top_box .list{border:1px solid #D6D6D6;border-top:0px;clear: both;height: 250px;overflow: hidden;padding: 5px;position: relative;width: 358px;}
.top_box li{border-bottom: 1px dashed #CCC;height: 12px;overflow: hidden;padding: 6px 0px;position: relative;vertical-align: top;width: 358px;}
.top_box li.active{background: #EAF6C1;}
.top_box .num{display: inline-block;font-size: 13px;text-align: right;width: 22px;}
.top_box .sitetitle{height: 13px;left: 29px;overflow: hidden;position: absolute;top: 6px;width: 150px;word-wrap: break-word;}
.top_box .nick{height: 13px;left: 180px;overflow: hidden;position: absolute;top: 6px;width: 80px;word-wrap: break-word;}
.pv{text-align: right;}.top_box .pv{height: 13px;overflow: hidden;position: absolute;right: 6px;top: 6px;width: 48px;}
.sitetitle a{color: #0A4409;}.sitetitle a:hover{color: red;font-size: 13px;font-size: 13px;position: static;}
</style>
<@xt.toptemplate navselected='top' bdselected='top-pv'>
 <div class="top_box">
 <div class="title">
 <h3>总点击排行榜</h3>
 </div>
<div class="note"><p>淘客站点推广总点击TOP10</p></div>
<div class="list">
<ol>
<#if all??&&all?size!=0><#list all as a>
<li title="站长:${a.nick}"><span class="num">${a_index+1}.</span><span class="sitetitle"><a title="${a.sitetitle}" target="_blank" href="http://<#if a.www??&&a.www!=''>${a.www}<#else>${a.domain}.xintaonet.com</#if>">${a.sitetitle}</a></span><span class="pv" title="点击数">${a.pv}</span></li>
</#list></#if>
</ol>
</div>
 </div>
<div class="top_box">
 <div class="title">
 <h3>本月点击排行榜</h3>
 </div>
<div class="note"><p>本月淘客站点推广点击TOP10</p></div>
<div class="list">
<ol>
<#if month??&&month?size!=0><#list month as m>
<li title="站长:${m.nick}"><span class="num">${m_index+1}.</span><span class="sitetitle"><a title="${m.sitetitle}" target="_blank" href="http://<#if m.www??&&m.www!=''>${m.www}<#else>${m.domain}.xintaonet.com</#if>">${m.sitetitle}</a></span><span class="pv" title="点击数">${m.pv}</span></li>
</#list></#if>
</ol>
</div>
 </div>
 <div style="clear:both;"></div>
 <div class="top_box">
 <div class="title">
 <h3>本周点击排行榜</h3>
 </div>
<div class="note"><p>本周淘客站点击推广点击TOP10</p></div>
<div class="list">
<ol>
<#if week??&&week?size!=0><#list week as w>
<li title="站长:${w.nick}"><span class="num">${w_index+1}.</span><span class="sitetitle"><a title="${w.sitetitle}" target="_blank" href="http://<#if w.www??&&w.www!=''>${w.www}<#else>${w.domain}.xintaonet.com</#if>">${w.sitetitle}</a></span><span class="pv" title="点击数">${w.pv}</span></li>
</#list></#if>
</ol>
</div>
 </div>
<div class="top_box">
 <div class="title">
 <h3>昨日点击排行榜</h3>
 </div>
<div class="note"><p>昨日淘客站点击推广点击TOP10</p></div>
<div class="list">
<ol>
<#if day??&&day?size!=0><#list day as d>
<li title="站长:${d.nick}"><span class="num">${d_index+1}.</span><span class="sitetitle"><a title="${d.sitetitle}" target="_blank" href="http://<#if d.www??&&d.www!=''>${d.www}<#else>${d.domain}.xintaonet.com</#if>">${d.sitetitle}</a></span><span class="pv" title="点击数">${d.pv}</span></li>
</#list></#if>
</ol>
</div>
 </div>
 <div style="clear:both;"></div>
</@xt.toptemplate>