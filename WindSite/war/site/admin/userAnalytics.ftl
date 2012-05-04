<script src="/assets/js/jquery/gchart/jquery.gchart.pack.js" type="text/javascript"></script>
<script type="text/javascript">
$(function(){
	$('#resultAnalytics').tabs();
	$('#startDate,#endDate').datepicker();
	$('input[type="radio"][name="analyticsType"]').change(function(){
		if($(this).val()=='0'){
			$('#resultHeader').empty().append('<th width="150px">时间</th><th width="100px">注册人数</th>');
		}else{
			$('#resultHeader').empty().append('<th width="150px">时间</th><th width="100px">登录次数</th>');
		}
	});
	$('#select').button().click(function(){
		var type = $('input[type="radio"][name="analyticsType"]:checked').val();
		var type1 = $('input[type="radio"][name="analyticsType1"]:checked').val();
		
		var startDate = $('#startDate').datepicker('getDate');
		var endDate = $('#endDate').datepicker('getDate');
		if(!startDate||!endDate){
			alert('您必须选择起始时间和结束时间');
		}
		endDate.addDays(1);
		if(startDate>endDate){
			alert('起始时间不能晚于结束时间');
		}
		if(type=="0"){
			userRegisterAnalytics(type1,startDate.format('isoDate'),endDate.format('isoDate'));
		}else{
			userLoginAnalytics(type1,startDate.format('isoDate'),endDate.format('isoDate'));
		}
	});
});
</script>
<input type="radio" name="analyticsType" value="0" checked>用户注册分析<input type="radio" name="analyticsType" value="1">用户登录分析<br/>
<input type="radio" name="analyticsType1" value="day" checked>按天统计<input type="radio" name="analyticsType1" value="week">按周统计<input type="radio" name="analyticsType1" value="month">按月统计<br/>
起始时间：<input type="text" id="startDate">
结束时间：<input type="text" id="endDate">
<button id="select">查询</button>
<div id="resultAnalytics">
<ul>
<li><a href="#result">图表</a></li>
<li><a href="#resultList">列表</a></li>
</ul>
<div id="result" style="width:800px;height:300px;">
</div>
<table id="resultList" class="wTable" width="100%" border="0" cellspacing="1" cellpadding="1">
<THEAD>
	<TR id="resultHeader">
	<th width="150px">时间</th><th width="100px">注册人数</th>
	</TR>
</THEAD>
<TBODY id="resultBody">
	
</TBODY>
</table>
</div>