<style>
.search_goods {background: #F3F3F3;border-top: 1px solid white;height: 30px;padding: 10px 0px;}.search_goods .search_con {margin: 0px auto;width: 700px;}.search_goods select {border: 1px solid #C1C1C1;float: left;font-size: 12px;height: 21px;margin-right: 5px;}
.txt_sea {border: 1px solid #C1C1C1;float: left;height: 19px;margin-right: 5px;width: 243px;}.btn_alltype_sea {background-position: -105px -61px;border: none;color: white;cursor: pointer;font-size: 14px;font-weight: bold;height: 21px;line-height: 25px;overflow: hidden;padding-bottom: 2px;width: 63px;}
.button{background: url(http://static.xintaonet.com/assets/images/btn_bg.gif) no-repeat 0px 0px;color: white;cursor: pointer;display: inline-block;font-size: 14px;font-weight: bold;height: 20px;line-height: 20px;text-align: center;width: 80px;background-position: 0px 0px;}
.nav_pager {background: #EEE;border-top: 1px solid #999;padding: 5px;}.nav_pager a {padding: 0px 5px;color: #005BD8;}.nav_pager a.highlight {zoom: 1;color: black;font-weight: bold;}
.wTable td{text-align:center;line-height:20px;}.bb-info{width:350px;height:85px;}.bb-selectbox{margin:30px 0px 30px 0px;float:left;width:20px;}.bb-pic{float:left;width:90px;}.bb-disc{float:left;width:230px;line-height:14px;text-align:left}.bb-disc a{color:#0063DC;}.bb-disc a:hover{color:#F60;}
#operate-overlay{display:none;width:400px;border:6px solid #666;border:6px solid rgba(82, 82, 82, 0.698);-moz-border-radius:8px;-webkit-border-radius:8px;}#operate-overlay h2 {color:#fff;background-color:#6D84B4;padding:5px 10px;border:1px solid #3B5998;font-size:20px;}
</style>
<script>
$(function(){
	$('#planIsDefault').change(function(){
		adminSearchPlans($('#q').val(),$('#planIsDefault').is(':checked'),1);
	});
});
function adminSearchPlans(q, isDefault, pageNo) {
	getHtmlContent('plansResult', '/router/member/admin/ads/search', 'POST', {q:q,isDefault:isDefault,pageNo:pageNo}, function(data){
		$('#plansResult').empty().append(data);
		$('.page-number').click(function(){
			adminSearchPlans($('#q').val(),$('#planIsDefault').attr('checked'),$('a',$(this)).text());
			return false;
		});
	$('.pgNext').click(function(){
		if(!$(this).hasClass('pgEmpty')){
			adminSearchPlans($('#q').val(),$('#planIsDefault').attr('checked'),$(this).attr('page'));
		}
		return false;
	});
	$('a.refreshAds').click(function(){
	var overlay = $('#operate-overlay').overlay({
				api : true,
				mask : {
					color : '#fff',
					loadSpeed : 0,
					opacity : 0.5
				},
				closeOnClick : false,
				load : true
			});
	var sender = new WindSender("/router/member/admin/ads/plan/"+$(this).attr('pid'));
	sender.load("GET", {
			}, function(response) {
				if (response.isSuccess()) {
					alert("重新投放广告计划成功");
				} else {
					alert(response.msg);
				}
				overlay.close();
			});
	});
	$('.wTable .plan .plan-ads').click(function() {
				getHtmlPlanAds($(this).attr('pid'));
				return false;
			});
	$('.wTable .plan .plan-view').click(function() {
		var parent = $(this).parents('.plan:first');
		var next = parent.next();
		if (next.length == 0 || next.hasClass('plan')) {
			$('.wTable tr.plan-items').hide();
			var id = 'plan_' + parent.attr('pid');
			var tr = $('<tr class="plan-items"><td colspan=6 id="' + id
					+ '"></td></tr>');
			parent.after(tr);
			getHtmlContent(id, '/router/member/selleradsmanager/plan/items/'
							+ parent.attr('pid'), 'GET', {}, function(data) {
						$('#' + id).empty().append(data);
					});
		} else {
			if (next.is(':hidden')) {
				$('.wTable tr.plan-items').hide();
				next.fadeIn();
			} else {
				next.fadeOut();
			}
		}
		return false;
	});
	});
}
function getHtmlPlanAds(id, isTaoke, pageNo) {
	getRightContentHtmlContent(
			'/router/member/selleradsmanager/plan/ads/' + id, "GET", {
				pageNo : pageNo,
				isTaoke : isTaoke
			}, rightContentAppend);
}
</script>
<div id="operate-overlay"><h2>正在操作中,请稍候...</h2></div>
<div class="search_goods">
  <div class="search_con">
	<input id="q" name="q" type="text" onkeydown="if(event.keyCode==13) {adminSearchPlans($(this).val(),$('#planIsDefault').is(':checked'),1);}" value="" size="52" class="txt_sea" maxlength="50">
    <input type="checkbox" id="planIsDefault">只显示主推
        <a id="search" class="button" onClick="adminSearchPlans($('#q').val(),$('#planIsDefault').is(':checked'),1);">搜索</a>
	</div>
</div>
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
	<TBODY id="plansResult"></TBODY>
</TABLE>