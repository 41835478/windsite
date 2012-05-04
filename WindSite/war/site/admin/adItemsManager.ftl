<#setting number_format="0.##"> 
<script type="text/javascript">
	$(function() {
		$('#addADItemsButton').button().click(function(){
			var numiid = $('#addAdsItemsIID').val();
			if(!numiid||numiid==0){
				alert("商品numiid不能为空");return;
			}
			addAdItems(numiid,$('#selectType').val());
		});
	});
</script>
<style>
.bb-info{margin-left:5px;margin-right:0px;width:240px;height:80px;}
.bb-selectbox{margin-top:20px;margin-left:-5px;float:left;width:15px;}
.bb-pic{float:left;width:60px;margin-top:8px;border:1px solid #DDD;height:60px;}
.bb-disc{float:left;padding-left:5px;width:170px;}
.ui-sortable-placeholder {border: 2px dotted black;height:80px;visibility: visible !important;}
.ui-sortable-placeholder * {visibility: hidden;}
.a-disabled{color:gray;}
.a-enabled{color:#1C94C4;}
.wTable-items-item{height:80px;width:796px;padding-bottom:5px;border-bottom:1px solid #DDD;position:relative;z-Index:1}
#checkAllItems,.buttonBar a{position:relative;z-Index:1}
</style>	
<div class="conent" style="height:100%" align="left">
<fieldset style="border: 0px; padding: 5px;"><legend><strong>新增商品推荐:</strong></legend>
商品IID:<input type="text" id="addAdsItemsIID"/>
所属类别:
<select id='selectType'  name="select" style="margin:5px;height:25px;" > 
	 	<option typeid="0"  value="0" selected>所有分类</option> 
	 	<option typeid="14"  value="14" >数码相机/摄像机/摄影器材</option> 
	 	<option typeid="50008090"  value="50008090" >3C数码配件市场</option> 
	 	<option typeid="50012164"  value="50012164" >闪存卡/U盘/移动存储</option> 
	 	<option typeid="50007218"  value="50007218" >办公设备/文具/耗材</option> 
	 	<option typeid="21"  value="21" >居家日用/收纳/礼品</option> 
	 	<option typeid="50016349"  value="50016349" >厨房/餐饮用具</option> 
	 	<option typeid="50016348"  value="50016348" >日化/清洁/护理</option> 
	 	<option typeid="50008163"  value="50008163" >床上用品/靠垫/毛巾/布艺</option> 
	 	<option typeid="2128"  value="2128" >家装饰品/窗帘/地毯</option> 
	 	<option typeid="35"  value="35" >奶粉/辅食/营养品</option> 
	 	<option typeid="50014812"  value="50014812" >尿片/洗护/喂哺等用品</option> 
	 	<option typeid="50005998"  value="50005998" >益智玩具/早教/童车床/出行</option> 
	 	<option typeid="50008165"  value="50008165" >童装/童鞋/孕妇装</option> 
	 	<option typeid="50002766"  value="50002766" >零食/坚果/茶叶/特产</option> 
	 	<option typeid="50016422"  value="50016422" >滋补/生鲜/速食/订餐</option> 
	 	<option typeid="50012472"  value="50012472" >保健食品</option> 
	 	<option typeid="1201"  value="1201" >MP3/MP4/iPod/录音笔</option> 
	 	<option typeid="1512"  value="1512" >手机</option> 
	 	<option typeid="50012081"  value="50012081" >国货精品手机</option> 
	 	<option typeid="50002768"  value="50002768" >个人护理/保健/按摩器材</option> 
	 	<option typeid="40"  value="40" >腾讯QQ专区</option> 
	 	<option typeid="11"  value="11" >电脑硬件/台式整机/网络设备</option> 
	 	<option typeid="1101"  value="1101" >笔记本电脑</option> 
	 	<option typeid="50010728"  value="50010728" >运动/瑜伽/健身/球迷用品</option> 
	 	<option typeid="50013886"  value="50013886" >户外/登山/野营/旅行用品</option> 
	 	<option typeid="50011699"  value="50011699" >运动服/运动包/颈环配件</option> 
	 	<option typeid="50010388"  value="50010388" >运动鞋</option> 
	 	<option typeid="20"  value="20" >电玩/配件/游戏/攻略</option> 
	 	<option typeid="25"  value="25" >玩具/模型/娃娃/人偶</option> 
	 	<option typeid="50011665"  value="50011665" >网游装备/游戏币/帐号/代练</option> 
	 	<option typeid="50008907"  value="50008907" >IP卡/网络电话/手机号码</option> 
	 	<option typeid="99"  value="99" >网络游戏点卡</option> 
	 	<option typeid="23"  value="23" >古董/邮币/字画/收藏</option> 
	 	<option typeid="50008164"  value="50008164" >家具/家具定制/宜家代购</option> 
	 	<option typeid="50007216"  value="50007216" >鲜花速递/蛋糕配送/园艺花艺</option> 
	 	<option typeid="26"  value="26" >汽车/配件/改装/摩托/自行车</option> 
	 	<option typeid="50004958"  value="50004958" >移动/联通/小灵通充值中心</option> 
	 	<option typeid="27"  value="27" >装潢/灯具/五金/安防/卫浴</option> 
	 	<option typeid="50005700"  value="50005700" >品牌手表/流行手表</option> 
	 	<option typeid="50010788"  value="50010788" >彩妆/香水/美发/工具</option> 
	 	<option typeid="50011740"  value="50011740" >流行男鞋</option> 
	 	<option typeid="16"  value="16" >女装/女士精品</option> 
	 	<option typeid="34"  value="34" >音乐/影视/明星/乐器</option> 
	 	<option typeid="50006843"  value="50006843" >女鞋</option> 
	 	<option typeid="50006842"  value="50006842" >箱包皮具/热销女包/男包</option> 
	 	<option typeid="30"  value="30" >男装</option> 
	 	<option typeid="1625"  value="1625" >女士内衣/男士内衣/家居服</option> 
	 	<option typeid="50010404"  value="50010404" >服饰配件/皮带/帽子/围巾</option> 
	 	<option typeid="50011397"  value="50011397" >珠宝/钻石/翡翠/黄金</option> 
	 	<option typeid="28"  value="28" >ZIPPO/瑞士军刀/眼镜</option> 
	 	<option typeid="33"  value="33" >书籍/杂志/报纸</option> 
	 	<option typeid="29"  value="29" >宠物/宠物食品及用品</option> 
	 	<option typeid="2813"  value="2813" >成人用品/避孕/计生用品</option> 
	 	<option typeid="50011150"  value="50011150" >其它</option> 
	 	<option typeid="50011949"  value="50011949" >旅游度假/打折机票/特惠酒店</option> 
	 	<option typeid="50011972"  value="50011972" >影音电器</option> 
	 	<option typeid="1801"  value="1801" >美容护肤/美体/精油</option> 
	 	<option typeid="50012082"  value="50012082" >厨房电器</option> 
	 	<option typeid="50012100"  value="50012100" >生活电器</option> 
	 	<option typeid="50008075"  value="50008075" >演出/吃喝玩乐折扣券</option> 
	 	<option typeid="50013864"  value="50013864" >饰品/流行首饰/时尚饰品新</option> 
	 	<option typeid="50014442"  value="50014442" >世博会特许商品</option> 
	 	<option typeid="50014811"  value="50014811" >网店/网络服务/个性定制/软件</option> 
	 	<option typeid="50016891"  value="50016891" >网游垂直市场根类目</option> 
	</select> 
<button id="addADItemsButton">确认添加</button>	
</fieldset>

<div style="height:2px;"></div>
<div class="ui-widget-content ui-corner-all" align="center">
<div class="buttonBar" align="left">
<table width=100%>
<tr><td align='left'>
<a id="deleteGroupItemsButton" href="javascript:;">删除</a>&nbsp;|&nbsp;
<a id="updateItemsSortable" style="color:gray" href="javascript:;">保存当前商品顺序</a>
</td>
<td align='right'>
</td>
</tr></table>
</div>
<TABLE class="wTable" style="padding-left:2px;padding-right:2px;" width=100% border="0" cellspacing="1" cellpadding="1">
	<THEAD>
		<TR>
			<TH width=30px></TH>
			<TH width=240px>商品推广信息</TH>
			<TH width=60px>单价</TH>
			<TH width=55px>佣金比率</TH>
			<TH width=55px>佣金(元)</TH>
			<TH width=95px>总支出佣金(元)</TH>
			<TH width=95px>累计推广量(件)</TH>
			<TH width=60px>推广状态</TH>
		</TR>
	</THEAD>
</table>
<ul id="wTable-items" style="padding-left:2px;padding-right:2px;width:796px;font-weight:bold;">
	<#if items?size!=0>
	<#list items as i>
	<li item="item_${i.id}" title="拖拽商品行可排序" class="wTable-items-item">
	<table  style="width:796px;margin-left:0px;margin-right:0px;" cellspacing="0" cellpadding="0"><tr>
	<td width=30px style="cursor:move;">
	<input type="checkbox" style="cursor:default;" data="${i.id}" name="items" value="${i.num_iid}" isValid="<#if i.isValid=true>1<#else>0</#if>" price="${i.price}" sortOrder="${i.sortOrder}" commission_rate="${i.commission_rate}" commission="${i.commission}" commission_volume="${i.commission_volume}" commission_num="${i.commission_num}"/>
	</td>
	<TD width=240px>
		<div class="bb-info" align="left">
			<div class="bb-pic" align="center"><a class="fb"  rel="group" href="${i.pic_url}" target="_blank"><img id="${i.num_iid}" src="${i.pic_url?replace('bao/uploaded', 'imgextra')}_60x60.jpg" alt="${i.title}"/></a></div>
			<div class="bb-disc" align="left">
				<ul style="list-style-type:none">
					<li><a href="${i.click_url}" target="_blank"  style="color:#00E;">${i.title}</a></li>
					<li>掌柜:${i.nick}</li>
				</ul>	
			</div>
		</div>
	</TD>
	<TD width=60px align="center">${i.price}元</TD>
	
	<TD width=55px align="center"><font color="#D02200">${(i.commission_rate?number)/100}%</font></TD>
	<TD width=55px align="center"><font color="#D02200">${i.commission}</font>元</TD>
	<TD width=95px align="center"><font color="#D02200">${i.commission_volume}</font>元</TD>
	<TD width=95px align="center"><font color="green">${i.commission_num}件</font></TD>
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