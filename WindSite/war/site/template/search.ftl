<#include "/site/template/searchArea.ftl">
<input type="hidden" id="_group_id" value="${group.id}"/>
<input type="hidden" id="_user_nick" value="${USER.nick}"/>
<div id="items-group-items" style="position:relative;">
<a id="check-selected-items" style="font-size:11pt;font-weight:bold;cursor:pointer;display:block;color: #404040;line-height: 1.2;position: absolute;left: -30px;text-align: center;top: 200px;width: 21px;z-Index:101;">查看暂存架</a>
<ul>
<li><a href="#rightContent">商品搜索结果</a></li>
<li><a href="#selected-items">暂存架</a></li>
</ul>
<div style="width:100%;height:100%;margin:0px;padding:0px;" id="rightContent">

</div>
<div style="width:100%;height:100%;margin:0px;padding:0px;" id="selected-items">
<table><tr><td>
<a href="#" id="confirmAddButton" class="button-red-100x30" style="color:white;">确认添加</a>
<a href="#" id="confirmDeleteButton" class="button-red-100x30" style="color:white;">删除已选</a>
</td><td>
<div id="selected-items-info">
<span style="color:#005BA5;font-size:12pt;font-weight: bold;">暂存个数/推广组剩余空间:</span>
<span id="selectCount" style="font-size:12pt;color:red;font-weight: bold;">0</span>
<span style="font-size:12pt;font-weight: bold;">/</span>
<span id="validCount" style="font-size:12pt;font-weight: bold;">${30-group.count}</span>
</div>
</td>
</tr></table>
<TABLE class="wTable" width="100%" border="0" cellspacing="1" cellpadding="1">
	<THEAD>
		<TR>
			<TH width=350px align="center">商品推广信息</TH>
			<TH width=60px>单价</TH>
			<TH width=80px>佣金比率</TH>
			<TH width=80px>佣金(元)</TH>
			<TH width=110px>30天支出佣金(元)</TH>
			<TH width=110px>30天总销量(件)</TH>
			<TH>30天推广量(件)</TH>
		</TR>
	</THEAD>
	<TBODY id="selected-items-table">
	</TBODY>
</TABLE>
</div>
<!--<div id="selected-items-warn" class="ui-widget-content" style="position:absolute;padding:2px;left:-150px;top:50px;">
	<span id="single-info" style="display:none;width:130px;font-weight:bold;">
	<div id="selected-item-warn" style="color:#FF0084;width:120px;"></div>
	<span id="selected-item-desc">已加入暂存架</span></span>
	<br/>
	您还可以添加<span id="add-validCount" style="font-weight:bold;color:#D02200">${30-group.count}</span>个商品<br/>
	<a id="check-selected-items" class="button-red-100x30" style="color:white;">查看暂存架</a>
</div>-->
</div>
