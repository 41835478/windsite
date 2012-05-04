<style>#taokeAdPlansDialog .items {width:20000em;clear:both;position:absolute;}#taokeAdPlansDialog .step {width:740px;float:left;padding:10px;}</style>
<div id="taokeAdPlansDialog" title="挑选并添加卖家广告计划" style="display:none;;overflow-x:hidden;position:relative;padding:0px;margin:0px;">
<div style="width:700px;padding-top:10px;" align="center">
<input type="radio" name="p_type" value="name" checked>广告<input type="radio" name="p_type" value="nick">卖家
<input name="plansSearchText" id="plansSearchText" style="padding:2px;width:300px;">
<select id="plan_type">
<option value="0">所有分类</option><#list cats as c><option value="${c.cid}">${c.name}</option></#list>
</select>
<button id="plansSearchButton" style="padding:2px;cursor:pointer;">搜索广告计划</button>
</div>
<div style="padding-left:10px;padding-top:10px;"><button id="plansViewButton" style="padding:2px;cursor:pointer;">查看已选广告</button></div>
<div class="items">
<div class="step taoke-adplans-search">
<TABLE class="wTable" width=100% border="0" cellspacing="1" cellpadding="1">
	<THEAD>
		<TR>
			<TH width=60px>类型</TH>
			<TH width=200px>广告计划名称</TH>
			<TH width=150px>所属卖家</TH>
			<TH width=80px>被投放站点</TH>
			<TH width=150px>创建时间</TH>
		</TR>
	</THEAD>
	<TBODY id="plans-search"></TBODY>
</TABLE>
</div>
<div class="step">
<TABLE class="wTable" width=100% border="0" cellspacing="1" cellpadding="1"><THEAD><TR><TH width=60px>类型</TH><TH width=200px>广告计划名称</TH><TH width=150px>所属卖家</TH><TH width=80px>被投放站点</TH><TH width=150px>创建时间</TH></TR></THEAD>
	<TBODY id="plans-checked"></TBODY>
</TABLE>
</div>
</div>
<div style="clear:both;"></div>
</div>