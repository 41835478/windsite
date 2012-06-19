<script type="text/javascript">
$(function(){
	
	$('#startDate,#endDate').datepicker();
	
	$('#searchSellerAdsItems').button().click(function(){
		searchSellerAdsItems();
	});
	$('.next-page').click(function(){
		$('#pageNo').val(${page.pageNo+1});			
		searchSellerAdsItems();
	});
	$('.prev-page').click(function(){
		$('#pageNo').val(${page.pageNo-1});			
		searchSellerAdsItems();
	});
});
function searchSellerAdsItems(){
		var startDate = $('#startDate').datepicker('getDate');
		var endDate = $('#endDate').datepicker('getDate');
		if(startDate&&!endDate){
			alert('您必须选择结束时间');return;
		}
		if(!startDate&&endDate){
			alert('您必须选择开始时间');return;
		}
		if(endDate){
			endDate.addDays(1);
			if(startDate>endDate){
				alert('起始时间不能晚于结束时间');return;
			}
		}
		var nick='';
		if($('#sellerNick').length==1){
			nick=$('#sellerNick').val();
		}
	getHtmlSellerAdsItems(startDate?startDate.format('isoDate'):'',endDate?endDate.format('isoDate'):'',$('#pageNo').val(),nick);
}
</script>
<style>
.page-info{float: left;height: 20px;line-height: 20px;margin: 0px 3px 0px 0px;overflow: hidden;min-width: 8px;padding: 0px 6px;width: auto;}
.page a{text-decoration: none;color: #555;display:block;float:left;margin: 0px 3px 0px 0px;background: transparent url(http://static.xintaonet.com/assets/min/images/shops.png) no-repeat scroll 500px 500px;height: 20px;line-height: 20px;overflow: hidden;padding: 0px;text-align: center;vertical-align: middle;white-space: nowrap;border: 1px solid #CCC;}
a.next-page{background-position: -52px -5px;padding: 0px 16px 0px 5px;}
a.end-page{background-position: -52px -21px;}
a.start-page{background-position: 6px -21px;padding: 0px;width:20px;}
a.prev-page{width:20px;background-position: 6px -5px;padding: 0px;}
a.prev-page span,a.start-page span{display: none;}
a.prev-page:hover,a.prev-page:active,a.next-page:hover,a.next-page:active{border-color: #FD6D01;}
.page-bar{background-color: #F9F9F9;border-bottom: 1px solid #F07002;color: #565656;height: 31px;}
</style>
<#if USER.role=="admin">
卖家昵称:<input type="text" id="sellerNick" value="${nick}"/>
</#if>
起始时间：<input type="text" id="startDate" value="${startDate}">
结束时间：<input type="text" id="endDate" value="${endDate}">
<button id="searchSellerAdsItems">查询</button>
<input type="hidden" id="pageNo" name="pageNo" value="${page.pageNo}"/>
<table width=100% class="page-bar"><tr><td align="left" width="500px">推广统计:该统计仅统计了新淘会员推广组内的商品推广</td><td align="right" style="position:">
<div  class="page"><span class="page-info">共${page.totalCount}条&nbsp;&nbsp;|${page.pageNo}/${page.totalPageCount}</span><a class="<#if page.pageNo==1>start-page<#else>prev-page</#if>"><span>上一页</span></a><a class="<#if ((page.pageNo+1)<=page.totalPageCount)>next-page<#else>end-page</#if>"><span>下一页</span></a></div> 
</td></tr></table>
<table class="wTable" width="100%" border="0" cellspacing="1" cellpadding="1">
<THEAD>
	<TR>
	<th width="300px">商品名称</th><th width="100px">推广人</th><th width="100px">站点</th><th width="100px">推广时间</th>
	</TR>
</THEAD>
<TBODY>
	<#if adsitems??&&adsitems?size!=0>
	<#list adsitems as a>
	<TR>
	<td>${a.title}</td><td>${a.nick}</td><td><a href="http://shop${a.user_id}.xintaonet.com" style="color:#00E;" target="_blank">访问该站点</a></td><td>${a.created}</td>
	</TR>
	</#list>
	</#if>
	
</TBODY>
</table>