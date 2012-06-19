<@ws.siteHeader isSearch=false>
<meta name="keywords" content="${sitetitle},${cidKeywords}">
<meta name="description" content="${sitetitle}挑选了淘宝网热卖人气店铺,这些${cidKeywords}热卖的店铺都提供了人气高而且价格便宜的热卖商品">
<title>店铺搜索-${keyword}-${sitetitle}</title>

<link rel="stylesheet" href="http://static.xintaonet.com/assets/min/css/shops.css?v=${dateVersion()}" type="text/css"/>
</@ws.siteHeader>
<script>
$(function(){
	$('#selectType').val(${cid});
	$('#searchShopsButton').click(function(){
		$('#shopsForm').attr('action',
					'/router/site/shops?version=' + Math.random());
		$('#shopsForm').submit();		
	});
	
	$('.next-page').click(function(){
		$('#shopsForm').attr('action',
					'/router/site/shops?version=' + Math.random());
		$('#pageNo').val(${page.pageNo+1});			
		$('#shopsForm').submit();
	});
	$('.prev-page').click(function(){
		$('#shopsForm').attr('action',
					'/router/site/shops?version=' + Math.random());
		$('#pageNo').val(${page.pageNo-1});			
		$('#shopsForm').submit();
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
})
</script>
		 <ul class="cats_list">
		 <li><a href="/router/site/shops/37?pid=${pid}" >男装</a></li> 
		 <li><a href="/router/site/shops/1056?pid=${pid}" >女鞋</a></li> 
		 <li><a href="/router/site/shops/14?pid=${pid}" >女装/流行女装</a></li> 
		 <li><a href="/router/site/shops/1082?pid=${pid}" >流行男鞋/皮鞋</a></li> 
		 <li><a href="/router/site/shops/1020?pid=${pid}" >母婴用品/奶粉/孕妇装</a></li> 
		 <li><a href="/router/site/shops/1062?pid=${pid}" >童装/婴儿服/鞋帽</a></li>
		 <li><a href="/router/site/shops/1055?pid=${pid}" >女士内衣/男士内衣/家居服</a></li> 
		 <li><a href="/router/site/shops/1054?pid=${pid}" >饰品/流行首饰/时尚饰品</a></li> 
		  <li><a href="/router/site/shops/1153?pid=${pid}" >运动服</a></li> 
		   <li><a href="/router/site/shops/15?pid=${pid}" >彩妆/香水/护肤/美体</a></li> 
  	   <li><a href="/router/site/shops/35?pid=${pid}">网络游戏点卡</a></li> 
  	   <li><a href="/router/site/shops/1048?pid=${pid}" >3C数码配件市场</a></li> 
  	   <li><a href="/router/site/shops/1106?pid=${pid}" >运动鞋</a></li> 
  	   <li><a href="/router/site/shops/36?pid=${pid}" >网络游戏装备/游戏币/帐号/代练</a></li> 
  	   <li><a href="/router/site/shops/1047?pid=${pid}" >鲜花速递/蛋糕配送/园艺花艺</a></li> 
  	   <li><a href="/router/site/shops/1104?pid=${pid}" >个人护理/保健/按摩器材</a></li> 
  	   <li><a href="/router/site/shops/1046?pid=${pid}" >家用电器/hifi音响/耳机</a></li> 
  	   <li><a href="/router/site/shops/33?pid=${pid}" >音乐/影视/明星/乐器</a></li> 
  	   <li><a href="/router/site/shops/1105?pid=${pid}" >闪存卡/U盘/移动存储</a></li> 
  	   <li><a href="/router/site/shops/1045?pid=${pid}" >户外/军品/旅游/机票</a></li> 
  	   <li><a href="/router/site/shops/34?pid=${pid}" >书籍/杂志/报纸</a></li> 
  	   <li><a href="/router/site/shops/1102?pid=${pid}" >腾讯QQ专区</a></li> 
  	   <li><a href="/router/site/shops/1103?pid=${pid}" >IP卡/网络电话/在线影音充值</a></li> 
  	   <li><a href="/router/site/shops/1049?pid=${pid}" >床上用品/靠垫/窗帘/布艺</a></li> 
  	   <li><a href="/router/site/shops/1050?pid=${pid}" >家具/家具定制/宜家代购</a></li> 
  	   <li><a href="/router/site/shops/1051?pid=${pid}" >保健品/滋补品</a></li> 
  	   <li><a href="/router/site/shops/1052?pid=${pid}" >网络服务/电脑软件</a></li> 
  	   <li><a href="/router/site/shops/1053?pid=${pid}" >演出/旅游/吃喝玩乐折扣券</a></li> 
  	   <li><a href="/router/site/shops/1154?pid=${pid}" >服饰配件/皮带/帽子/围巾</a></li> 
  	   <li><a href="/router/site/shops/22?pid=${pid}" >汽车/配件/改装/摩托/自行车</a></li> 
  	   <li><a href="/router/site/shops/23?pid=${pid}" >珠宝/钻石/翡翠/黄金</a></li> 
  	   <li><a href="/router/site/shops/24?pid=${pid}" >居家日用/厨房餐饮/卫浴洗浴</a></li> 
  	   <li><a href="/router/site/shops/26?pid=${pid}" >装潢/灯具/五金/安防/卫浴</a></li> 
  	   <li><a href="/router/site/shops/27?pid=${pid}" >成人用品/避孕用品/情趣内衣</a></li> 
  	   <li><a href="/router/site/shops/29?pid=${pid}" >食品/茶叶/零食/特产</a></li> 
  	   <li><a href="/router/site/shops/1040?pid=${pid}" >ZIPPO/瑞士军刀/饰品/眼镜</a></li> 
  	   <li><a href="/router/site/shops/1041?pid=${pid}" >移动联通充值中心/IP长途</a></li> 
  	   <li><a href="/router/site/shops/30?pid=${pid}" >玩具/动漫/模型/卡通</a></li> 
  	   <li><a href="/router/site/shops/1042?pid=${pid}" >网店装修/物流快递/图片存储</a></li> 
  	   <li><a href="/router/site/shops/1043?pid=${pid}" >笔记本电脑</a></li> 
  	   <li><a href="/router/site/shops/32?pid=${pid}" >宠物/宠物食品及用品</a></li> 
  	   <li><a href="/router/site/shops/1044?pid=${pid}" >品牌手表/流行手表</a></li> 
  	   <li><a href="/router/site/shops/31?pid=${pid}" >箱包皮具/热销女包/男包</a></li> 
  	   <li><a href="/router/site/shops/17?pid=${pid}" >数码相机/摄像机/图形冲印</a></li> 
  	   <li><a href="/router/site/shops/18?pid=${pid}" >运动/瑜伽/健身/球迷用品</a></li> 
  	   <li><a href="/router/site/shops/1122?pid=${pid}" >时尚家饰/工艺品/十字绣</a></li> 
  	   <li><a href="/router/site/shops/16?pid=${pid}" >电玩/配件/游戏/攻略</a></li> 
  	   <li><a href="/router/site/shops/13?pid=${pid}" >手机</a></li> 
  	   <li><a href="/router/site/shops/11?pid=${pid}" >电脑硬件/台式机/网络设备</a></li> 
  	   <li><a href="/router/site/shops/12?pid=${pid}" >MP3/MP4/iPod/录音笔</a></li> 
  	   <li><a href="/router/site/shops/21?pid=${pid}" >办公设备/文具/耗材</a></li> 
  	   <li><a href="/router/site/shops/20?pid=${pid}" >古董/邮币/字画/收藏</a></li> 
		</ul>
		<div class="shop_list">
		<form id="shopsForm" action="/router/site/shops" method="POST">
		<input type="hidden" name="pid" value="${pid}"/>
		<input type="hidden" id="pageNo" name="pageNo" value="${page.pageNo}"/>
		<div style="position:relative;">
		<label for="schContent" id="schLabel" style="position:absolute;left:5px;top:8px;color: #BABABA;z-index: 2;cursor: text;"><#if keyword=="">输入您想要的店铺名或掌柜名</#if></label>
		<input id='schContent' name="keyword" type="text" value="${keyword}"  class="txt_sea" style="height:19px;" size="52"  maxLength="50"/>
    <select id='selectType'  name="cid" style="height:21px;"> 
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
<a id="searchShopsButton" style="color:white;" class="button-red-100x30">搜索</a>
</div> 
<br/>
<table width=100% class="page-bar"><tr><td align="left" width="500px">店铺信息</td><td align="right" style="position:">
<div  class="page"><span class="page-info">${page.pageNo}/${page.totalPageCount}</span><a class="<#if page.pageNo==1>start-page<#else>prev-page</#if>"><span>上一页</span></a><a class="<#if ((page.pageNo+1)<=page.totalPageCount)>next-page<#else>end-page</#if>"><span>下一页</span></a></div> 
</td></tr></table>
</form>
		<TABLE class="wTable" style="padding-left:2px;padding-right:2px;" width=100% border="0" cellspacing="1" cellpadding="1">
			<tbody>
			<#if shops?size!=0>
			<#list shops as s>
			<#assign href=s.click_url?replace('13667242',spid)>
			<#if www??&&''!=www&&(versionNo??&&versionNo>=2)&&MEMBER??><#assign href=href?replace('xintao00[0-9]','xtfl'+MEMBER.id,'r')></#if>
			<tr>
			<TD>
				<div class="bb-info" align="left">
					<div class="bb-pic" align="center"><a onClick="_gaq.push(['_trackEvent', 'xt-${pid}', 'shop-d-${s.sid}', '${s.title}']);" href="${href}" target="_blank"><img src="<#if (s.pic_path!="")>http://logo.taobao.com/shop-logo/${s.pic_path}<#else>http://s.yijia.com/taobao/i/no_shop.gif</#if>" alt="${s.title}"/></a></div>
					<div class="bb-disc" align="left">
						<ul style="list-style-type:none">
							<br/>
							<li><a onClick="_gaq.push(['_trackEvent', 'xt-${pid}', 'shop-d-${s.sid}', '${s.title}']);" href="${href}" target="_blank" class="title">${s.title}</a></li>
							<br/>
							<li><div class="nick"><span class="key">掌柜:</span><span class="nick-name">${s.nick}</span></div><div class="level"><span class="key">店铺等级:</span><img src="/assets/min/images/credit/<@ws.credit s.level></@ws.credit>.gif"/></div></li>
						</ul>	
					</div>
				</div>
			</TD>
			</tr>
			</#list>
		<#else>
		<tr><td><h3>抱歉,为搜索到店铺,您可以更换条件重新搜索</h3></td></tr>
		</#if>
		</tbody>
		</table>
</div>
<@ws.siteFooter>
</@ws.siteFooter>