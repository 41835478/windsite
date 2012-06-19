<#setting number_format="0.##">
<style>
.path{color:#347ABA;cursor:pointer;}.path:hover{color: #FF8400;}
.bb-info{margin-left:5px;margin-right:0px;width:240px;height:80px;}
.bb-selectbox{margin-top:20px;margin-left:-5px;float:left;width:15px;}
.bb-pic{float:left;width:70px;margin-top:8px;border:1px solid #DDD;height:70px;}
.bb-pic img{max-width:70px;max-height:70px;}
.bb-disc{float:left;padding-left:5px;width:160px;}
.wTable td{line-height:14px;}
</style>
<script type="text/javascript">
$(function() {
	<#if catid??>
		$('#selectType').val('${catid}');
		<#else>
		$('#selectType').val('0');
	</#if>
	$('#selectShopCatsA').click(function(){
		getHtmlShopCats();
	})
	$('#myFavoriteShop').click(function(){
		getHtmlShops();
	});
	$('#J_byMall').click(function(){
		searchShopsByCats('${page.pageNo}','${keywords}','${catid}','${shopSortBy}','B');
		return false;
	});
	$('#J_byAll').click(function(){
		searchShopsByCats('${page.pageNo}','${keywords}','${catid}','${shopSortBy}','');
		return false;
	});
	$('#J_OrderByList li a').click(function(){
			searchShopsByCats('${page.pageNo}','${keywords}','${catid}',$(this).attr('order'),'${isMall}');
			return false;
		});
	$('#checkAllItems').change(function(){
		$('input[type="checkbox"][name="shopCheckbox"]').attr('checked',$(this).attr('checked'));
	});
	$('#addShopFav').click(function(){
		var checked=$('input[type="checkbox"][name="shopCheckbox"]:checked');
		if(checked.length==0){
			alert('您尚未选择店铺');return;
		}
		if(checked.length>(${USER.limit.shops-shopsSize})){
			alert('您选择的店铺超过可收藏余额！请减少选中店铺数量');return;
		}
		var ids="";
		checked.each(function(){
			ids+=$(this).attr('data')+",";
		});
		
		addShopsFav(ids);
	});
	$('#submitNewShop').click(function(){
		$('#submitNewShopDialog').remove();
		$('body').append('<div id="submitNewShopDialog" title="提交新的店铺"><label for="newSellerNick">卖家昵称：</label><input type="text" id="newSellerNick" style="width:150px;"></div>');
		$('#submitNewShopDialog').dialog({
						bgiframe : true,
						autoOpen : false,
						height : 200,
						width : 200,
						zIndex : 100000,
						modal : true,
						buttons:{
							'取消':function(){
								$(this).dialog('close');
							},
							'确认':function(){
								var nick = $('#newSellerNick').val();
								if(!nick||nick.length==0){
									alert('卖家昵称不能为空');return;
								}
								addNewShop(nick);
							}
						}
		});
		$('#submitNewShopDialog').dialog('open');
	});
	$('#schContent').click(function(){
		if(''==$(this).val()){
			$('#schLabel').text('');
		}
	}).blur(function(){
		if(''==$(this).val()){
			$('#schLabel').text('输入您想要的店铺名或掌柜名');
		}
	});
	$('.items-pages .page-number').click(function(){
		searchShopsByCats($('a',$(this)).text());
		return false;
	});
	$('.items-pages .pgNext').click(function(){
		if(!$(this).hasClass('pgEmpty')){
			searchShopsByCats($(this).attr('page'));
		}
		return false;
	});
});
</script>
<@ws.info>
<span>
您可以收藏淘宝店铺最高限额为
<strong style='color:#D02200;font-weight:bold;'>${USER.limit.shops}</strong>个,
已收藏 <strong style='color:#D02200;font-weight:bold;'>${shopsSize}</strong> 个淘宝店铺
</span>
</@ws.info>
<div class="search_con"> 
<table width=100%><tr><td align="left">
当前位置:<a class="path" href="/router/member/sitemanager/shops" style="color:#347ABA;">我的店铺收藏</a>>搜索店铺
</td><td align="right"><a id="submitNewShop" style="font-weight:bold;color:#D02200;">我要提交店铺</a></td></tr></table>
<br/>
	<div  style="position:relative;">
    <label for="schContent" id="schLabel" style="position:absolute;left:5px;top:8px;color: #BABABA;z-index: 2;cursor: text;"><#if keywords=="">输入您想要的店铺名或掌柜名</#if></label>
    <input id='schContent' name="textfield" type="text" value="${keywords}"  class="txt_sea" style="height:19px;" size="52"  maxLength="50"/>
    <select id='selectType'  name="select" style="height:21px;"> 
  		<option typeid="0"  value="0" selected>所有分类</option> 
  	   <option typeid="35"  value="35" >网络游戏点卡</option> 
  	   <option typeid="1048"  value="1048" >3C数码配件市场</option> 
  	   <option typeid="1106"  value="1106" >运动鞋</option> 
  	   <option typeid="36"  value="36" >网络游戏装备/游戏币/帐号/代练</option> 
  	   <option typeid="1047"  value="1047" >鲜花速递/蛋糕配送/园艺花艺</option> 
  	   <option typeid="1104"  value="1104" >个人护理/保健/按摩器材</option> 
  	   <option typeid="1046"  value="1046" >家用电器/hifi音响/耳机</option> 
  	   <option typeid="33"  value="33" >音乐/影视/明星/乐器</option> 
  	   <option typeid="1105"  value="1105" >闪存卡/U盘/移动存储</option> 
  	   <option typeid="1045"  value="1045" >户外/军品/旅游/机票</option> 
  	   <option typeid="34"  value="34" >书籍/杂志/报纸</option> 
  	   <option typeid="1102"  value="1102" >腾讯QQ专区</option> 
  	   <option typeid="1103"  value="1103" >IP卡/网络电话/在线影音充值</option> 
  	   <option typeid="37"  value="37" >男装</option> 
  	   <option typeid="1049"  value="1049" >床上用品/靠垫/窗帘/布艺</option> 
  	   <option typeid="1050"  value="1050" >家具/家具定制/宜家代购</option> 
  	   <option typeid="1051"  value="1051" >保健品/滋补品</option> 
  	   <option typeid="1054"  value="1054" >饰品/流行首饰/时尚饰品</option> 
  	   <option typeid="1055"  value="1055" >女士内衣/男士内衣/家居服</option> 
  	   <option typeid="1052"  value="1052" >网络服务/电脑软件</option> 
  	   <option typeid="1053"  value="1053" >演出/旅游/吃喝玩乐折扣券</option> 
  	   <option typeid="1153"  value="1153" >运动服</option> 
  	   <option typeid="1154"  value="1154" >服饰配件/皮带/帽子/围巾</option> 
  	   <option typeid="22"  value="22" >汽车/配件/改装/摩托/自行车</option> 
  	   <option typeid="23"  value="23" >珠宝/钻石/翡翠/黄金</option> 
  	   <option typeid="1082"  value="1082" >流行男鞋/皮鞋</option> 
  	   <option typeid="24"  value="24" >居家日用/厨房餐饮/卫浴洗浴</option> 
  	   <option typeid="26"  value="26" >装潢/灯具/五金/安防/卫浴</option> 
  	   <option typeid="27"  value="27" >成人用品/避孕用品/情趣内衣</option> 
  	   <option typeid="29"  value="29" >食品/茶叶/零食/特产</option> 
  	   <option typeid="1040"  value="1040" >ZIPPO/瑞士军刀/饰品/眼镜</option> 
  	   <option typeid="1041"  value="1041" >移动联通充值中心/IP长途</option> 
  	   <option typeid="30"  value="30" >玩具/动漫/模型/卡通</option> 
  	   <option typeid="1042"  value="1042" >网店装修/物流快递/图片存储</option> 
  	   <option typeid="1043"  value="1043" >笔记本电脑</option> 
  	   <option typeid="32"  value="32" >宠物/宠物食品及用品</option> 
  	   <option typeid="1044"  value="1044" >品牌手表/流行手表</option> 
  	   <option typeid="31"  value="31" >箱包皮具/热销女包/男包</option> 
  	   <option typeid="17"  value="17" >数码相机/摄像机/图形冲印</option> 
  	   <option typeid="18"  value="18" >运动/瑜伽/健身/球迷用品</option> 
  	   <option typeid="1122"  value="1122" >时尚家饰/工艺品/十字绣</option> 
  	   <option typeid="15"  value="15" >彩妆/香水/护肤/美体</option> 
  	   <option typeid="16"  value="16" >电玩/配件/游戏/攻略</option> 
  	   <option typeid="13"  value="13" >手机</option> 
  	   <option typeid="14"  value="14" >女装/流行女装</option> 
  	   <option typeid="11"  value="11" >电脑硬件/台式机/网络设备</option> 
  	   <option typeid="12"  value="12" >MP3/MP4/iPod/录音笔</option> 
  	   <option typeid="21"  value="21" >办公设备/文具/耗材</option> 
  	   <option typeid="20"  value="20" >古董/邮币/字画/收藏</option> 
  	   <option typeid="1062"  value="1062" >童装/婴儿服/鞋帽</option> 
  	   <option typeid="1020"  value="1020" >母婴用品/奶粉/孕妇装</option> 
  	   <option typeid="1056"  value="1056" >女鞋</option> 
  	</select>
<a id="searchShopsButton" onclick="searchShopsByCats(1);return false;" class="button">搜索</a>
</div> 
</div> 
<div class="filter" id="J_Filter">
	<ul class="filter-tabbar" id="J_FilterTabBar">
		<#assign mall=false>
		<#if isMall??&&isMall=='B'>
		<#assign mall=true>
		</#if>
		<li <#if !mall>class="selected"</#if> data-idx="1"><span class="l"></span><span class="r"></span><a href="" title="" id="J_byAll">所有店铺</a></li>
		<!--<li <#if mall>class="selected"</#if> data-idx="10"><span class="l"></span><span class="r"></span><a href="" title="" id="J_byMall">商城店铺</a></li>-->
		<li class="pagination">
		<div class="page-top items-pages">
			<#assign totalPageCount=page.totalPageCount>
			<#if (totalPageCount>100)><#assign totalPageCount=100></#if>
			<@ws.pager pageNo=(page.pageNo?number) pageSize=page.pageSize?number pageCount=totalPageCount></@ws.pager>
		</div></li>
	</ul>
	<div class="toolbarWrapper" _float="0">
	<input type="hidden" id="J_shopOrder" value="${shopSortBy}">
	<#assign orderdesc='' ordertext='默认排序'>
	<#if shopSortBy=='level_desc'><#assign orderdesc='by-credit-desc' ordertext='信用从高到低'>
	<#elseif shopSortBy=='commission_rate_desc'><#assign orderdesc='by-sale-desc' ordertext='佣金从高到低'>
	</#if>
		<ul class="toolbar" id="J_FilterToolbar">
			<li class="">
				<a id="addShopFav" style="color:red;font-weight:bold;" href="javascript:;">收藏已选店铺</a>
				<!--<a id="J_addTemp" href=""><span style="color:#f60;font-weight:bold;">放入暂存架</span></a>-->
			</li>
			<li class="order hoverMenu ${orderdesc}" id="J_Order">
				<span class="title">排序 </span>
				<a id="J_OrderSelector" href="" class="select-item  order-by"><span><span>${ordertext}</span></span></a>
				<ul class="order-options item-list" id="J_OrderByList">
				<li class="by-credit-desc"><a order="level_desc">信用从高到低</a></li>
				<li class="by-sale-desc"><a order="commission_rate_desc">佣金从高到低</a></li>
				</ul>
			</li>
		</ul>
	</div>
</div>
<!--<table class="items-pages" width=100% height="20px">
	<TR>
		<td height="20px" align="left" valign="bottom">
		<@ws.pager pageNo=(page.pageNo?number) pageSize=page.pageSize?number pageCount=page.totalPageCount?number></@ws.pager>
		</td>
		<td height="20px" align="left">
		<select id="shopSortBy">
		<option selected value="sortOrder_asc">默认</option>
		<option value="level_desc">信用由高到低</option>
		<option value="commission_rate_desc">佣金由高到低</option>
		</select>
		</td>
	</TR>
</table>-->
<div class="shop_list">
<TABLE class="wTable">
	<THEAD>
		<TR>
			<TH width=50px><input type="checkbox" class="checkbox" id="checkAllItems"/>全选</TH>
			<TH width=240px>店铺信息</TH>
			<TH width=55px>佣金比率</TH>
			<TH>推广地址</TH>
		</TR>
	</THEAD>
	<tbody>
	<#if shops?size!=0>
	<#assign spid=(USER.pid?replace('mm_','')?replace('_0_0',''))>
	<#list shops as s>
	<tr  class="<#if s_index%2==0>odd<#else>even</#if>">
	<td width=30px>
	<input type="checkbox" name="shopCheckbox" data="${s.sid}"/>
	</td>
	<TD width=240px>
		<div class="bb-info" align="left">
			<div class="bb-pic" align="center"><a href="${s.click_url?replace('13667242',spid)}" onClick="_gaq.push(['_trackEvent', 'xt-${USER.pid}', 'shop-d-${s.sid}', '${s.title}']);" target="_blank"><img src="<#if (s.pic_path!="")>http://logo.taobao.com/shop-logo/${s.pic_path}<#else>http://s.yijia.com/taobao/i/no_shop.gif</#if>" alt="${s.title}"/></a></div>
			<div class="bb-disc" align="left">
				<ul style="list-style-type:none">
					<li><a href="${s.click_url?replace('13667242',spid)}" onClick="_gaq.push(['_trackEvent', 'xt-${USER.pid}', 'shop-d-${s.sid}', '${s.title}']);" target="_blank"  style="color:#00E;">${s.title}</a></li>
					<li>掌柜:${s.nick}</li>
					<li>店铺等级:<img src="http://static.xintaonet.com/assets/min/images/credit/<@ws.credit s.level></@ws.credit>.gif"/></li>
				</ul>	
			</div>
		</div>
	</TD>
	<TD width=55px align="center"><font color="#D02200">${s.commission_rate}%</font></TD>
	<TD align="center"><font color="#D02200"><input style="width:400px" value="${s.click_url?replace('13667242',spid)}"></font></TD>
	</tr>
	</#list>
<#else>
<tr><td colspan=4><h3>抱歉,为搜索到店铺,您可以更换条件重新搜索</h3></td></tr>
</#if>
<tbody>
</table>
</div>