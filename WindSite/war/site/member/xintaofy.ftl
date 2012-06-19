<style>
.fy-title{color:#F50;font-size:10pt;font-weight:bold;}
.col1{width:300px;}.col2{width:50px;}a.title{color:#0063DC;}a.title:hover{color:#F60}
.wTable td{padding-bottom: 4px;padding-top: 5px;vertical-align: top;}
.wTable tr{height:30px;}
#shopsFy tbody tr{height:50px;}
.db strong{background: url(http://assets.taobaocdn.com/app/firecup/img/firecup.png) no-repeat 0px -129px;color: white;display: block;height: 14px;line-height: 14px;margin: 0px auto;width: 14px;}
</style>
<script>
$(function(){
$('#xintaofyTabs').tabs();
$('.fav-add').click(function(){
addShopsFavBySid($(this).attr('sid'));
});
$('.group-add').click(function(){
openMyItemGroupByItem($(this).attr('numiid'));
});
});
</script>
<div id="xintaofyTabs">
<ul>
<li><a href="#itemsFy">推广商品总排行</a></li>
<li><a href="#shopsFy">推广店铺总排行</a></li>
</ul>
<TABLE id="itemsFy" class="wTable" style="padding-left:2px;padding-right:2px;" width=100% border="0" cellspacing="1" cellpadding="1">
<THEAD>
<TR>
	<TH width=40px align="center">排名</TH>
	<TH width=400px>商品名称</TH>
	<TH width=100px title="新淘网会员挑选该商品的数量" align="center">关注指数</TH>
	<TH width=150px>卖家昵称</TH>
	<TH width=80px>佣金(元)</TH>
</TR>
</THEAD>
	<tbody>
	<#if items??&&items?size!=0>
	<#list items as i>
	<tr><td class="db"><strong>${i_index+1}</strong></td><td><a href="${i.click_url?replace('mm_[0-9]+_0_0',USER.pid,'r')}" target="_blank" class="title">${i.title}</a><br/><br/><a href="#" numiid="${i.num_iid}" class="group-add">加入我的推广组</a></td><td>${i.icount}</td><td>${i.nick}</td><td>${i.commission}</td></tr>
	</#list>
	</#if>
	</tbody>
</table>
<TABLE id="shopsFy" class="wTable" style="padding-left:2px;padding-right:2px;" width=100% border="0" cellspacing="1" cellpadding="1">
<THEAD>
<TR>
	<TH width=40px align="center">排名</TH>
	<TH width=400px>店铺名称</TH>
	<TH width=100px title="新淘网会员挑选该店铺的商品的数量" align="center">关注指数</TH>
	<TH width=150px>卖家昵称</TH>
	<TH width=80px>佣金比例</TH>
</TR>
</THEAD>
	<tbody>
	<#if shops??&&shops?size!=0>
	<#list shops as s>
	<tr><td class="db"><strong>${s_index+1}</strong></td><td><a href="${s.click_url?replace('=-[0-9]+_','=-'+(USER.pid?replace('mm_','')?replace('_0_0',''))+'_','r')}" target="_blank"  class="title">${s.title}</a><br/><span class="key">店铺等级:</span><img src="http://static.xintaonet.com/assets/min/images/credit/<@ws.credit s.level></@ws.credit>.gif"/><br/><br/><a class="fav-add" href="#" sid="${s.sid}">收藏该店铺</a></td><td>${s.scount}</td><td>${s.nick}</td><td>${s.commission_rate}%</td></tr>
	</#list>
	</#if>
	</tbody>
</table>
</div>