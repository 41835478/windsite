<#setting number_format="0.##">
<script type="text/javascript">
	$(function() {
		$("#groups").unbind('change').change(function(){ //事件發生  
			if($('#groups').val()=="${group.id}"){
				return;
			}
			getHtmlShopGroup($('#groups').val(),$('#shopsSortBy').val());
		}); 
		$("#refresh").click(function(){ //事件發生  
			getHtmlShopGroup('${group.id}',$('#shopsSortBy').val());
		});
		$("#checkAllShops").click(function(){
			$("input[name='shops']").attr("checked",$(this).attr("checked"));
		});
	$("#deleteGroupShopsButton").click(function(){
			var checkedShops = $("input[name='shops']:checked");
			var length=checkedShops.length;
			if(length==0){
				alert("您尚未选择店铺！");
				return;
			}
			window.confirm("确定删除选中店铺",function(r){
				if(r){
					var checkedData = [];
					checkedShops.each(function(){
						checkedData.push($(this).val());	//存储要删除的商品标识
					});
					//删除
					deleteShopsFromShopGroup('${group.id}',checkedData.join(",")+"");
				}else{
					checkedShops.attr("checked",false);
				}
				return;
			});
			return;
		});
	$('#shopsSortBy').change(function(){
		getHtmlShopGroup('${group.id}',$('#shopsSortBy').val());
	});	
	$('#renameGroupButton').click(function(){
			$('#renameGroupDialog').dialog('open');
			return false;
	});
	$('#deleteInvalidShops').click(function(){
			deleteInvalidShops('${group.id}');
			return false;
	});
	$('#renameGroupButton').click(function(){
			openRenameShopGroupDialog();
			return false;
	});
	function openRenameShopGroupDialog(){
		$('#renameGroupDialog').remove();
		$("body").append("<div id='renameGroupDialog' title='重命名店铺分组'><p id='validateTips'>店铺分组名称不能为空.</p><br/><form><label for='groupName'>推广组名称:</label><input type='text' name='renameGroupName' id='renameGroupName' size=30 value=''/></form></div>");
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
							renameShopGroup('${group.id}',$("#renameGroupName").val());
						}else{
							alert("推广组名称不能为空");
						}
					}
				},
				close: function() {
				}
		});
		$("#renameGroupDialog").dialog('open');
	}
	<#if sortBy??>
		$('#shopsSortBy').val('${sortBy}');	
	</#if>
});
	
</script>
<style>
.button{background: url(/assets/images/btn_bg.gif) no-repeat 0px 0px;color: white;cursor: pointer;display: inline-block;font-size: 14px;font-weight: bold;height: 20px;line-height: 20px;text-align: center;width: 80px;background-position: 0px 0px;}
.wTable td{line-height:20px;}
.bb-info{width:350px;height:85px;}
.bb-selectbox{margin:30px 0px 30px 0px;float:left;width:20px;}
.bb-pic{float:left;width:90px;padding-top:10px;}
.bb-disc{float:left;width:230px;}
.bb-disc a{color:#0063DC;}
.bb-disc a:hover{color:#F60;}
.a-disabled{color:gray;}
.a-enabled{color:#1C94C4;}
.wTable-items-item{height:80px;border-bottom:1px solid #DDD;position:relative;z-Index:1}
#checkAllShops,.buttonBar a{position:relative;z-Index:1}
</style>
<div class="conent" style="height:100%" align="left">
	<div class="buttonBar" style="height:25px;" align="left">
	<a href="/router/member/sitemanager/shops">返回店铺分组</a>
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
	店铺分组中店铺数量的最高限额为
	<strong style='color:#D02200;font-weight:bold;'>30</strong> 个,
	该分组已添加 <strong style='color:#D02200;font-weight:bold;'>${shops?size}</strong> 个店铺
	</span>
	</@ws.info>
<div class="ui-widget-content ui-corner-all" align="center">
	<div class="buttonBar" align="left">
		<table width=100%>
		<tr><td align='left'>
		<input type="checkbox" class="checkbox" id="checkAllShops"/>全选
		<#if (shops?size<30)>
		<a href="/router/member/links/shops" style="font-size:16px;color:#D02200;">添加店铺</a>&nbsp;|&nbsp;
		</#if>
		<a id="deleteGroupShopsButton" href="javascript:;">删除</a>&nbsp;|&nbsp;
		<a id="renameGroupButton" href="javascript:;">重命名店铺分组</a>&nbsp;|&nbsp;
		<select id="shopsSortBy">
		<option selected value="sellerCredit_desc">信用由高到低</option>
		<option value="commissionRate_desc">佣金比率由高到低</option>
		<option value="isValid_desc">有效店铺</option>
		<option value="isValid_asc">无效店铺</option>
		</select>
		</td>
		<td align='right'>
		
		</td>
		</tr></table>
	</div>
	<TABLE id="shopsTable" class="wTable" width="100%" border="0" cellspacing="1" cellpadding="1">
		<THEAD>
			<TR>
				<TH width=350px align=left>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;店铺推广信息</TH>
				<TH width=160px>佣金比率</TH>
				<TH width=100px></TH>
				<TH></TH>
			</TR>
		</THEAD>
		<TBODY>
		<#if shops??&&shops?size!=0>
		<#assign site=USER.sites[0]>
			<#list shops as s>
				<#assign isExtra=false>
				<#if s.nick??&&''!=s.nick><#assign isExtra=true></#if>
				<TR  style="font-weight: bold;" class="<#if s_index%2==0>odd<#else>even</#if>">
					<TD>
						<div class="bb-info">
							<div class="bb-selectbox">
								<input type="checkbox" name="shops" value="${s.userId}"/>
							</div>
							<#if s.sid??&&''!=s.sid>
							<#assign shopClickUrl=''><#if site.www??&&''!=site.www><#assign shopClickUrl='http://'+site.www+'/tshop/'+s.sid+'.html'><#else><#assign shopClickUrl='http://'+site.domainName+'.xintaonet.com/tshop/'+s.sid+'.html'></#if>
							<div class="bb-pic" align="center"><a href="${shopClickUrl}" target="_blank"><img src="<#if ''!=s.picPath>http://logo.taobao.com/shop-logo${s.picPath}<#else>http://img02.taobaocdn.com/tps/i2/T1nB0EXnBwXXXXXXXX-80-80.png</#if>" alt="${s.title}" width=70px height=70px onerror="javascript:this.src='http://img02.taobaocdn.com/tps/i2/T1nB0EXnBwXXXXXXXX-80-80.png'"/></a></div>
							<div class="bb-disc">
								<ul style="list-style-type:none">
									<li><a href="${shopClickUrl}" target="_blank">${s.title}</a></li>
									<li><a href="${shopClickUrl}" style="color:#555;font-weight:normal;" target="_blank">掌柜:${s.nick}</a></li>
									<li style="position:relative;"><#if ''!=s.sellerCredit>信用:<img src="/assets/min/stylesheets/images/${s.sellerCredit}.gif"/></#if><a style="color:#f60;position:absolute;right:0px;" href="#" xtUrl="${shopClickUrl}" mamaUrl="" onClick="openItemAdsDialog($(this));return false;">推广此店铺</a></li>
								</ul>	
							</div>
							<#else>
							<div class="bb-pic" align="center"><a href="javascript:;" target="_blank"><img src="<#if ''!=s.picPath>http://logo.taobao.com/shop-logo${s.picPath}<#else>http://img02.taobaocdn.com/tps/i2/T1nB0EXnBwXXXXXXXX-80-80.png</#if>" alt="${s.title}" width=70px height=70px/></a></div>
							<div class="bb-disc">
								<ul style="list-style-type:none">
									<li><a href="javascript:;" target="_blank">${s.title}</a></li>
									<li><a href="javascript:;" style="color:#555;font-weight:normal;" target="_blank">掌柜:${s.nick}</a></li>
									<li style="position:relative;"><#if ''!=s.sellerCredit>信用:<img src="/assets/min/stylesheets/images/${s.sellerCredit}.gif"/></#if></li>
								</ul>	
							</div>
							</#if>
							
						</div>
					</TD>
					<TD align="center">${s.commissionRate}%</TD>
					<TD align="center"></TD>
					<TD align="center"></TD>
				</TR>
			</#list>
		<#else>
			<tr><td colspan=4 align="center"><h3>您还没有添加店铺</h3></td>
			</tr>
		</#if>
		</TBODY>
	</TABLE>
</div>
</div>