<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>店铺收藏-淘客建站-我是淘客-新淘网</title>
</@ws.header>
<script>
$(function(){
	$('#deleteShopFavButton').click(function(){
		var checked=$('input[type="checkbox"][name="shopCheckbox"]:checked');
		if(checked.length==0){
			alert('您尚未选择店铺');return;
		}
		var ids="";
		checked.each(function(){
			ids+=$(this).attr('data')+",";
		});
		deleteShopsFav(ids);
	});
	$('#checkAllItems').change(function(){
		$('input[type="checkbox"][name="shopCheckbox"]').attr('checked',$(this).attr('checked'));
	});
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
				$('#updateShopsSortable').css("color","#1C94C4").addClass("a-enabled");
			}
		});
	//保存店铺收藏顺序
		$('#updateShopsSortable').click(function(){
			if($(this).hasClass("a-enabled")){
				updateFavShopsSorts($("#wTable-items").sortable("serialize",{'attribute':'shop'}));
			}
		});	
		$('#shopSortBy').change(function(){
			document.location.href="/router/member/sitemanager/shops?sortOrder="+$(this).val();
		});
		<#if sortOrder??>
			$('#shopSortBy').val('${sortOrder}');
			<#else>
			$('#shopSortBy').val('sortOrder_asc');	
		</#if>
		$(".wTable-shops-item").hover(function(){
			$(this).css("background","#fdf5ce");
		},function(){
			$(this).css("background","");
		});	
});
</script>
<style>
.bb-info{margin-left:5px;margin-right:0px;width:240px;height:80px;}
.bb-selectbox{margin-top:20px;margin-left:-5px;float:left;width:15px;}
.bb-pic{float:left;width:70px;margin-top:8px;border:1px solid #DDD;height:70px;}
.bb-pic img{width:70px;height:70px;max-width:70px;max-height:70px;}
.bb-disc{float:left;padding-left:5px;width:160px;}
.ui-sortable-placeholder {border: 2px dotted black;height:80px;visibility: visible !important;}
.ui-sortable-placeholder * {visibility: hidden;}
.a-disabled{color:gray;}
.a-enabled{color:#1C94C4;}
.wTable-shops-item{height:80px;padding-bottom:5px;border-bottom:1px solid #DDD;position:relative;z-Index:1}
.search-nav, .search-nav .crumbs li,.filter-tabbar li,.filter-tabbar li .l, .filter-tabbar li .r,.toolbarWrapper,.filter .select-item  {background: url(/assets/images/T1MBVHXjdeXXXXXXXX.png) repeat-x;}
.filter .select-item span,.filter-tabbar li.status a, .filter-tabbar li.combine a, .filter-tabbar li.status a span, .toolbar .order .order-options li a , .page-start, .page-next, .page-prev, .page-end{background: url(/assets/images/T18VtIXbdwXXXXXXXX.png) no-repeat -9999px -9999px;}
.toolbar .order a, .toolbar .protection .title,.filter button.submit,  .mall-icon, .shoe-mall-icon{background: url(/assets/images/T1omRHXmpHXXXXXXXX.png) no-repeat -9999px -9999px;}
.filter {margin-top: 5px;width: 760px;}.filter-tabbar {border-bottom: 2px solid #F50;height: 27px;padding-top: 1px;position: relative;width: 100%;z-index: 100;}
.filter-tabbar li {background-position: 0px -361px;float: left;margin: 3px 3px 0px 0px;position: relative;}
.filter-tabbar li.selected {background-position: 0px -310px;margin-top: 0px;}
.filter .item-list li a:hover {background-color: #EEE;text-decoration: none;}
.filter-tabbar li .l, .filter-tabbar li .r {background-repeat: no-repeat;height: 24px;position: absolute;top: 0px;width: 3px;}
.filter-tabbar li .l {background-position: 0px -337px;left: 0px;}.filter-tabbar li .r {background-position: 100% -337px;right: 0px;}
.filter-tabbar li.selected .l {background-position: 0px -283px;}.filter-tabbar li.selected .r {background-position: 100% -283px;}
.filter-tabbar li a {color: #333;float: left;height: 24px;line-height: 24px;padding: 0px 20px;}
.filter-tabbar li.selected a {color: white;font-size: 14px;font-weight: bold;height: 27px;line-height: 27px;}
.filter-tabbar li.pagination {background-image: none;float: right;margin: 0px;padding: 0px;position: static;}
.toolbarWrapper {background-position: 0px -244px;border: 1px solid #CCC;color: #404040;height: 34px;margin-top: -1px;width: 760px;}
.toolbar {border: 1px solid white;float: left;width: 758px;}.toolbar li {float: left;height: 32px;line-height: 32px;}.toolbar .order {line-height: 19px;margin-left: 20px;position: relative;z-index: 99;}.toolbar .order .order-by {width: 120px;}.toolbar .order .by-price {background-position: -133px -133px;height: 20px;margin-left: -1px;width: 46px;}
.toolbar .order-by span span {background-position: -9999px -9999px;padding: 0px;white-space: nowrap;}
.toolbar .order .order-options {background-color: white;border: 1px solid #A6A6A6;display: none;left: 28px;position: absolute;top: 26px;width: 120px;}
.toolbar .order .order-options li {border-bottom: 1px solid #D9E9FB;height: auto;line-height: 22px;padding: 0px;width: 100%;}
.toolbar .order .order-options li.by-price-asc a {background-position: 5px -390px;}
.toolbar .order .order-options li.by-price-desc a {background-position: 5px -410px;}
.toolbar .order .order-options li.by-credit-desc a {background-position: 5px -430px;}
.toolbar .order .order-options li.by-sale-desc a {background-position: 5px -449px;}
.toolbar .order .by-price:hover, .toolbar .by-price-asc .by-price {background-position: -133px -153px;}
.toolbar .order .by-sale:hover, .toolbar .by-sale-desc .by-sale {background-position: -10px -153px;position: relative;z-index: 1;}
.toolbar .order:hover .order-options, .toolbar .order.hover .order-options {display: block;}
.toolbar .order .order-options li a {color: black !important;display: block;margin: 1px 0px;padding-left: 28px;text-decoration: none !important;width: 92px;}
.toolbar .order .order-options li.by-default a {background: none;}
.toolbar .order span.title, .toolbar .order a {color: #404040 !important;float: left;margin-top: 7px;}.toolbar .order .by-price, .toolbar .order .by-credit {position: relative;z-index: 0;}.toolbar .order .by-credit {background-position: -92px -133px;height: 20px;margin-left: -1px;width: 42px;}
.filter .select-item {background-position: 0px -676px !important;border: 1px solid #A6A6A6;cursor: pointer;float: left;height: 18px;}
.filter .select-item span {background-position: 100% -1130px;display: block;overflow: hidden;padding: 0px 21px 0px 5px;white-space: nowrap;}
.toolbar a {color: #404040;outline: none;}.filter .item-list li a {color: #404040;display: block;}.toolbar .location .item-list li a {padding: 2px;white-space: nowrap;}.toolbar .location .split {border-top: 1px dotted gray;}.toolbar .order .by-sale {background-position: -10px -133px;height: 20px;width: 42px;}
.toolbar .order .by-credit:hover, .toolbar .by-credit-desc .by-credit {background-position: -92px -153px;z-index: 1;}
.toolbar .by-credit span, .toolbar .by-price span, .toolbar .by-sale span {display: none;}
.toolbar .by-price-desc .by-price:hover, .toolbar .by-price-desc .by-price {background-position: -178px -153px;}
.toolbar .order .by-sale:hover, .toolbar .by-sale-desc .by-sale {background-position: -10px -153px;position: relative;z-index: 1;}
.toolbar .by-sale-desc .order-by span span {background-position: 0px -451px;padding-left: 23px;}.toolbar .by-price-asc .order-by span span {background-position: 0px -392px;padding-left: 23px;}
.toolbar .by-price-desc .order-by span span {background-position: 0px -412px;padding-left: 23px;}.toolbar .by-credit-desc .order-by span span {background-position: 0px -432px;padding-left: 23px;}
ul.pages li{background:none;padding:3px;}ul.pages li a{height: 14px;line-height: 14px;padding: 0px;}
.button{background: url(/assets/images/btn_bg.gif) no-repeat 0px 0px;color: white;cursor: pointer;display: inline-block;font-size: 14px;font-weight: bold;height: 20px;line-height: 20px;text-align: center;width: 80px;background-position: 0px 0px;}
</style>
<@xt.taoketemplate navselected='taoke' bdselected='site-shops'>
<@ws.info>
<span>
您可以收藏淘宝店铺最高限额为
<strong style='color:#D02200;font-weight:bold;'>${USER.limit.shops}</strong>个,
已收藏 <strong style='color:#D02200;font-weight:bold;'>${shops?size}</strong> 个淘宝店铺
</span>
</@ws.info>
<div class="buttonBar" align="left">
<table width=100%>
<tr><td align='left'>
<input type="checkbox" class="checkbox" id="checkAllItems"/>全选
<a id="deleteShopFavButton" href="javascript:;">删除</a>&nbsp;|&nbsp;
<a id="updateShopsSortable" style="color:gray" href="javascript:;">保存当前店铺顺序</a>
<select id="shopSortBy">
<option selected value="sortOrder_asc">默认</option>
<option value="level_desc">信用由高到低</option>
<option value="commission_rate_desc">佣金由高到低</option>
</select>
<a href="/router/member/links?type=4&value=favshop" style="color:#f60;">推广整个店铺收藏</a>
</td>
<td align='right'>
<#if (shops?size<USER.limit.shops)>
<a href="javascript:searchShopsByCats(1);" style="color:#D02200;">添加新的店铺收藏</a>
</#if>
</td>
</tr></table>
</div>
<TABLE class="wTable">
	<THEAD>
		<TR>
			<TH width=30px></TH>
			<TH width=240px>店铺信息</TH>
			<TH width=55px>佣金比率</TH>
			<TH>推广地址</TH>
		</TR>
	</THEAD>
</table>
<ul id="wTable-items">
	<#if shops?size!=0>
	<#assign spid=(USER.pid?replace('mm_','')?replace('_0_0',''))>
	<#list shops as s>
	<li shop="shop_${s.sid}" title="拖拽店铺行可排序" class="wTable-shops-item <#if s_index%2==0>odd<#else>even</#if>">
	<table width=100% style="margin:0px;padding:0px;" cellspacing="0" cellpadding="0"><tr>
	<td width=30px style="cursor:move;">
	<input type="checkbox" name="shopCheckbox" data="${s.sid}"/>
	</td>
	<TD width=240px>
		<div class="bb-info" align="left">
			<div class="bb-pic" align="center"><a href="${s.click_url?replace('13667242',spid)}" onClick="_gaq.push(['_trackEvent', 'xt-${USER.pid}', 'shop-d-${s.sid}', '${s.title}']);" target="_blank"><img src="<#if (s.pic_path!="")>http://logo.taobao.com/shop-logo/${s.pic_path}<#else>http://s.yijia.com/taobao/i/no_shop.gif</#if>" alt="${s.title}"/></a></div>
			<div class="bb-disc" align="left">
				<ul style="list-style-type:none">
					<li><a href="${s.click_url?replace('13667242',spid)}" onClick="_gaq.push(['_trackEvent', 'xt-${USER.pid}', 'shop-d-${s.sid}', '${s.title}']);" target="_blank"  style="color:#00E;">${s.title}</a></li>
					<li>掌柜:${s.nick}</li>
					<li>店铺等级:<img src="/assets/min/images/credit/<@ws.credit s.level></@ws.credit>.gif"/></li>
					<li><a style="color:#f60;" href="/router/member/links?type=2&value=${s.sid}">推广此店铺</a></li>
				</ul>	
			</div>
		</div>
	</TD>
	<TD width=55px align="center"><font color="#D02200">${s.commission_rate}%</font></TD>
	<TD align="center"><font color="#D02200"><input style="width:400px" value="${s.click_url?replace('13667242',spid)}"></font></div></TD>
	</tr></table>
	</li>
	</#list>
<#else>
<h3>抱歉，暂无收藏</h3>
</#if>
</ul>
<div style="height:2px;"></div>
<@ws.help>
		<h3>1.什么是店铺收藏？店铺收藏有什么用处？</h3>
		<p>新淘网为淘宝客们提供了淘宝推广店铺的收藏功能。在新淘网设计器中会提供店铺推广组件。该类组件可以推广您在新淘网中收藏的推广店铺。</P>
		<a href="http://www.xintaonet.com/router/site/view/support?type=help-myxintao&faq=06" target="_blank"><h3>2.如何提交淘宝的推广店铺到新淘网中？</h3></a>
</@ws.help>
</@xt.taoketemplate>