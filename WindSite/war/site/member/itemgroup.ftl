<#setting number_format="0.##"> 
<script type="text/javascript">
	$(function() {
		$("#wTable-items").sortable({
			start:function(){
					$('body').bind("selectstart", function() {
						return false
					});
			},
			stop:function(){
				$('body').unbind("selectstart");
			},
			update:function(){
				$('#updateItemsSortable').css("color","#1C94C4").addClass("a-enabled");
			}
		});
		//保存商品顺序
		$('#updateItemsSortable').click(function(){
			if($(this).hasClass("a-enabled")){
				updateItemsSorts('${group.id}',$("#wTable-items").sortable("serialize",{'attribute':'item'}));
			}
		});
		$("#wTable-items .wTable-items-item").hover(function(){
			$(this).css("background","#fdf5ce");
		},function(){
			$(this).css("background","");
		});
		//$("a.fb").fancybox();
		$("#groups").unbind('change').change(function(){ //事件發生  
			if($('#groups').val()=="${group.id}"){
				return;
			}
			getHtmlItemGroup($('#groups').val());
		}); 
		$("#refresh").click(function(){ //事件發生  
			getHtmlItemGroup('${group.id}');
		});
		$("#checkAllItems").click(function(){
			$("input[name='items']").attr("checked",$(this).attr("checked"));
		});
	$("#deleteGroupItemsButton").click(function(){
			var checkedItems = $("input[name='items']:checked");
			var length=checkedItems.length;
			if(length==0){
				alert("您尚未选择商品！");
				return;
			}
			window.confirm("确定删除选中商品",function(r){
				if(r){
					var checkedData = [];
					checkedItems.each(function(){
						checkedData.push($(this).attr("data"));	//存储要删除的商品标识
					});
					//删除
					deleteItemsFromItemGroup('${group.id}',checkedData.join(",")+"");
				}else{
					checkedItems.attr("checked",false);
				}
				return;
			});
			return;
		});
	$('#renameGroupButton').click(function(){
			$('#renameGroupDialog').dialog('open');
			return false;
	});
	$('#deleteInvalidItems').click(function(){
			deleteInvalidItems('${group.id}');
			return false;
	});
	
	$('#moveGroupItemsButton').click(function(){
			var checkedItems = $("input[name='items']:checked");
			var length=checkedItems.length;
			if(length==0){
				alert("您尚未选择商品！");
				return;
			}
			$('#moveGroupDialog').dialog('open');
			return false;
	});
		//重命名dialog
		var renameStr = "<div id=\"renameGroupDialog\" title=\"重命名推广组\">";
		renameStr+="<p id=\"validateTips\">推广组名称不能为空.</p><br/>";
		renameStr+="<label for=\"renameGroupName\">推广组名称:</label>"
		renameStr+="<input type=\"text\" name=\"renameGroupName\" id=\"renameGroupName\" size=30 value=\"${group.name}\"/></div>";
		if($("#renameGroupDialog").length>0){
			$("#renameGroupDialog").remove();
		}
		$("body").append(renameStr);
		//移动推广组Dialog
		var moveStr="<div id=\"moveGroupDialog\" title=\"移动商品至其他推广组\">";	
			moveStr+="<select id=\"moveGroups\" style=\"height:22px;\">";
			<#if (groups?size>0)>
				<#list groups as g>
					<#if group.id!=g.id>
						moveStr+="<option selected value=\"${g.id}\" data=\"${g.count}\">${g.name}</option>";
					</#if>
				</#list>
			</#if>
			moveStr+="</select></div>";
		if($("#moveGroupDialog").length>0){
			$("#moveGroupDialog").remove();
		}	
		$("body").append(moveStr);
	//重命名推广组
	$("#renameGroupDialog").dialog({
			bgiframe: true,
			autoOpen: false,
			height: 200,
			width:400,
			modal: true,
			buttons: {
				'取消': function() {
					$(this).dialog('close');
				},
				'确定': function() {
					if ($("#renameGroupName").val()) {
						renameItemGroup('${group.id}',$("#renameGroupName").val());
					}else{
						alert("推广组名称不能为空");
					}
				}
			},
			close: function() {
			}
	});
	<#if sortBy??>
		$('#itemsSortBy').val('${sortBy}');	
	</#if>
	var itemsCache = [];
	$('#itemsSortBy').change(function(){
		var items = itemsCache.slice();
		var _sorts = $(this).val().replace('_asc', ' asc').replace('_desc',
					' desc').split(' ');
		if ('asc' == _sorts[1]) {// 升序
			items.sort(function(a, b) {
						try {
							var e0 = a[_sorts[0]] - b[_sorts[0]];// 指定列排序
							if (e0) {
								return e0;
							} else {// 如果false则按照默认规则再次排序
								return a['sortOrder'] - b['sortOrder'];
							}
						} catch (e) {
							return false;
						}
					});// 升序
		} else {// 降序
			items.sort(function(a, b) {
						try {
							var e0 = b[_sorts[0]] - a[_sorts[0]];// 指定列排序
							if (e0) {
								return e0;
							} else {// 如果false则按照默认规则再次排序
								return a['sortOrder'] - b['sortOrder'];
							}
						} catch (e) {
							return false;
						}
					});// 降序
		}
		for(var i=0;i<items.length;i++){
			var li = $('#wTable-items li.wTable-items-item[item="item_'+items[i].id+'"]');
			if(li.length>0){
				$('#wTable-items').append(li);
			}
		}
	});
	$('input[type="checkbox"][name="items"]').each(function(){
		var item = {};
		item.id=$(this).attr('data');
		item.price=$(this).attr("price");
		item.sortOrder=$(this).attr("sortOrder");
		item.commission_rate=$(this).attr("commission_rate");
		item.commission=$(this).attr("commission");
		item.commission_volume=$(this).attr("commission_volume");
		item.commission_num=$(this).attr("commission_num");
		item.isValid=$(this).attr("isValid");
		itemsCache.push(item);
	});
	//移动推广组
	$("#moveGroupDialog").dialog({
			bgiframe: true,
			autoOpen: false,
			height: 200,
			width:400,
			modal: true,
			buttons: {
				'取消': function() {
					$(this).dialog('close');
				},
				'确定': function() {
					var checkedItems = $("input[name='items']:checked");
					var length=checkedItems.length;
					if ($("#moveGroups").val()) {
						var selectedGroup = $("#moveGroups").find('option:selected');
						var validLength=30-parseInt(selectedGroup.attr("data"));
						var toGroup = selectedGroup.text();
						if(length>validLength){
							alert("移动商品数量已超过["+toGroup+"]当前限额,["+toGroup+"]还可添加"+validLength+"件商品");
							return;
						}
						window.confirm("确定移动选中商品",function(r){
							if(r){
								var checkedData = [];
								checkedItems.each(function(){
									if($(this).attr("checked")){
										checkedData.push($(this).attr("data"));	//存储要删除的商品标识
									}
								});
								//移动
								moveItemGroup($("#moveGroups").val(),checkedData.join(",")+"");
							}
							return;
						});
						return;
					}else{
						alert("未选择目标推广组");
					}
				}
			},
			close: function() {
			}
	});
});
	
</script>
<style>
.bb-info{margin:0px;padding:0px;width:230px;height:80px;}
.bb-selectbox{margin-top:20px;margin-left:-5px;float:left;width:15px;}
.bb-pic{width:60px;margin-top:8px;border:1px solid #DDD;height:60px;}
.bb-disc{padding-left:5px;width:170px;}.bb-disc li{margin-bottom:3px;}
.ui-sortable-placeholder {border: 2px dotted black;height:80px;visibility: visible !important;}
.ui-sortable-placeholder * {visibility: hidden;}
.a-disabled{color:gray;}
.a-enabled{color:#1C94C4;}
.wTable-items-item{height:80px;border-bottom:1px solid #DDD;position:relative;z-Index:1}
#checkAllItems,.buttonBar a{position:relative;z-Index:1}
</style>
<div class="conent" style="height:100%" align="left">
<div class="buttonBar" style="height:25px;" align="left">
<a href="/router/member/sitemanager/groups">返回推广组</a>
&nbsp;&nbsp;&nbsp;
<select id="groups" style="height:22px;z-Index:1000;">
	<#if (groups?size>0)>
		<#list groups as g>
			<#if group.id==g.id>
				<option selected value="${g.id}">${g.name}</option>
			<#else>
				<option value="${g.id}">${g.name}</option>
			</#if>
		</#list>
	</#if>
</select>
<a href="#" id="refresh">刷新</a>
</div>
<div style="height:2px;"></div>
<@ws.info>
<span>
推广组中商品数量的最高限额为
<strong style='color:#D02200;font-weight:bold;'>30</strong> 件,
该推广组已添加 <strong style='color:#D02200;font-weight:bold;'>${items?size}</strong> 件商品
</span>
</@ws.info>
<div class="ui-widget-content ui-corner-all" align="center">
<div class="buttonBar" align="left">
<table width=100%>
<tr><td align='left'>
<input type="checkbox" class="checkbox" id="checkAllItems"/>全选
<a id="deleteGroupItemsButton" href="javascript:;">删除</a>&nbsp;|&nbsp;
<#if (groups?size>1)>
<a id="moveGroupItemsButton" href="javascript:;">移到其他推广组</a>&nbsp;|&nbsp;
</#if>
<a id="renameGroupButton" href="javascript:;">重命名推广组</a>&nbsp;|&nbsp;
<a id="deleteInvalidItems" href="javascript:;">删除所有无效商品</a>&nbsp;|&nbsp;
<a id="updateItemsSortable" style="color:gray" href="javascript:;">保存当前商品顺序</a>
<select id="itemsSortBy">
<option selected value="sortOrder_asc">默认</option>
<option value="price_asc">价格由低到高</option>
<option value="price_desc">价格由高到低</option>
<option value="commission_rate_desc">佣金比率由高到低</option>
<option value="commission_desc">佣金由高到低</option>
<option value="commission_volume_desc">总支出佣金由高到低</option>
<option value="commission_num_desc">成交量由高到低</option>
<option value="isValid_desc">有效商品</option>
<option value="isValid_asc">无效商品</option>
</select>
</td>
<td align='right'>
<#if (items?size<30)>
<a href="/router/member/itemgroup/searchitems/${group.id}" target="_blank" style="color:#D02200;">添加商品</a>
</#if>
</td>
</tr></table>
</div>
<TABLE class="wTable" width=100%>
	<THEAD>
		<TR>
			<TH width=30px></TH>
			<TH width=240px>商品推广信息</TH>
			<TH width=60px>单价</TH>
			<TH width=55px>佣金比率</TH>
			<TH width=55px>佣金(元)</TH>
			<TH width=55px>支出(元)</TH>
			<TH width=55px>累计(件)</TH>
			<TH width=60px>状态</TH>
		</TR>
	</THEAD>
</table>
<ul id="wTable-items" style="width:100%;font-weight:bold;">
	<#if items?size!=0>
	<#assign site=USER.sites[0]>
	<#list items as i>
	<li item="item_${i.id}" title="拖拽商品行可排序" class="wTable-items-item <#if i_index%2==0>odd<#else>even</#if>">
	<table  style="width:100%;" cellspacing="0" cellpadding="0"><tr>
	<td width=30px style="cursor:move;">
	<input type="checkbox" style="cursor:default;" data="${i.id}" name="items" value="${i.num_iid}" isValid="<#if i.isValid=true>1<#else>0</#if>" price="${i.price}" sortOrder="${i.sortOrder}" commission_rate="${i.commission_rate}" commission="${i.commission}" commission_volume="${i.commission_volume}" commission_num="${i.commission_num}"/>
	</td>
	<TD width=240px>
		<table>
			<tr><td><div class="bb-pic" align="center"><a class="fb"  rel="group" onClick="_gaq.push(['_trackEvent', 'xt-${USER.pid}', 'item-d-${i.nick}-${i.num_iid}', '${i.title}']);" href="${i.click_url}" target="_blank"><img id="${i.num_iid}" src="${i.pic_url?replace('bao/uploaded', 'imgextra')}_60x60.jpg" alt="${i.title}" width="60px" height="60px"/></a></div></td>
			<td><div class="bb-disc" align="left">
				<ul style="list-style-type:none">
					<li><a href="${i.click_url}" onClick="_gaq.push(['_trackEvent', 'xt-${USER.pid}', 'item-d-${i.nick}-${i.num_iid}', '${i.title}']);" target="_blank"  style="color:#00E;">${i.title}</a></li>
					<li>掌柜:${i.nick}</li>
					<li><#if i.isValid=true><a style="color:#f60;" href="#" xtUrl="http://<#if site.www??&&site.www!=''>${site.www}<#else>${site.domainName}.xintaonet.com</#if>/titem/${i.num_iid}.html" mamaUrl="${i.click_url}" onClick="openItemAdsDialog($(this));return false;">推广此商品</a></#if></li>
				</ul>
			</div></td></tr></table>	
	</TD>
	<TD width=60px align="center">${i.price}元</TD>
	
	<TD width=55px align="center"><font color="#D02200">${(i.commission_rate?number)/100}%</font></TD>
	<TD width=55px align="center"><font color="#D02200">${i.commission}</font>元</TD>
	<TD width=55px align="center"><font color="#D02200">${i.commission_volume}</font>元</TD>
	<TD width=55px align="center"><font color="green">${i.commission_num}件</font></TD>
	<TD width=60px><font color="green"><#if i.isValid=true>可推广<#else>无效商品</#if></font></TD>
	</tr></table>
	</li>
	</#list>
</ul>
<#else>
<h3>抱歉，暂无商品</h3>
</#if>
</div>
</div>