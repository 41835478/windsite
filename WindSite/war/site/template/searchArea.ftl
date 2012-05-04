<script type="text/javascript">
	$(function() {
		$("#advancedButton").click(function(){
			if($("#advancedSearch").is(":hidden")){//如果已隐藏则显示并修改链接文字
				$("#advancedSearch").fadeIn();
				$("#advancedButton").text("隐藏高级搜索");
			}else{//如果已显示则隐藏并修改链接文字
				$("#advancedSearch").hide("blind",{},500,function(){
										$("#advancedButton").text("显示高级搜索");
										});
			}
			return false;
		});
		$('#advancedSearchButton').button();
});
</script>
<!--淘宝客商品查询工具条-->
<div class="ui-widget-content ui-corner-all" style="margin:0px;padding:0px;border:0px;" align="center"> 
	<table><tr>
	<!--<td><select id="select_type"><option selected value="0">搜索商品</option><option value="1">搜索卖家</option></select></td>-->
	<td>
	<input type="text" name="keyword" id="keyword" class="text" style="margin:5px;height:20px;" size="40"/>
	</td>
	<td>
	<select id='selectType'  name="select" style="margin:5px;height:25px;" > 
	 	<option typeid="0"  value="" selected>所有分类</option> 
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
	</td>
	<td>
	<a id="search" class="button-red-100x30" style="color:white;">搜索商品</a>
	</td>
	<td>
	<a id="advancedButton" class="button-red-100x30" style="color:white;">显示高级搜索</a>
	</td>
	</tr>
	</table>
	<br/>
	<div id="searchDesc" style="display:none">
	<p style="margin-left:20px; text-indent:20px; color:#AC7E35;">请注意<a href="http://club.alimama.com/read.php?tid=372124" target="_blank">推广宝贝若为虚拟物品</a>，无法获取佣金，请重新选择宝贝！</p>
	当前&nbsp;<span style="color:#D02200" id="categorySpan">所有</span>&nbsp;类目下共有<span id="resultSpan" style="color:#005BA5;"> </span>个商品
	</div>
	<hr width=100%/>
<div id="advancedSearch" style="width:90%;height:100%;display:none">
	<form id="advancedSearchForm">
	<table width=90% cellspacing="8" cellpadding="2">
		<tr>
			<td>佣金比率</td><td><input id="crs" type="text" size="5">&nbsp;-&nbsp;<input id="cre" type="text" size="5">%</td>
			<td>卖家信用</td><td>
								 <select name="rs" id="rs"> 
					                <option value="" selected></option> 
					                <option v="20" value="5goldencrown">5皇冠</option> 
					                <option v="19" value="4goldencrown">4皇冠</option> 
					                <option v="18" value="3goldencrown">3皇冠</option> 
					                <option v="17" value="2goldencrown">2皇冠</option> 
					                <option v="16" value="1goldencrown">1皇冠</option> 
					                <option v="15" value="5crown">5蓝冠</option> 
					                <option v="14" value="4crown">4蓝冠</option> 
					                <option v="13" value="3crown">3蓝冠</option> 
					                <option v="12" value="2crown">2蓝冠</option> 
					                <option v="11" value="1crown">1蓝冠</option> 
					                <option v="10" value="5diamond">5钻</option> 
					                <option v="9" value="4diamond">4钻</option> 
					                <option v="8" value="3diamond">3钻</option> 
					                <option v="7" value="2diamond">2钻</option> 
					                <option v="6" value="1diamond">1钻</option> 
					                <option v="5" value="5heart">5心</option> 
					                <option v="4" value="4heart">4心</option> 
					                <option v="3" value="3heart">3心</option> 
					                <option v="2" value="2heart">2心</option> 
					                <option v="1" value="1heart">1心</option> 
    							</select> 
    								-
    							<select name="re" id="re"> 
					                <option value="" selected></option> 
					                <option v="20" value="5goldencrown">5皇冠</option> 
					                <option v="19" value="4goldencrown">4皇冠</option> 
					                <option v="18" value="3goldencrown">3皇冠</option> 
					                <option v="17" value="2goldencrown">2皇冠</option> 
					                <option v="16" value="1goldencrown">1皇冠</option> 
					                <option v="15" value="5crown">5蓝冠</option> 
					                <option v="14" value="4crown">4蓝冠</option> 
					                <option v="13" value="3crown">3蓝冠</option> 
					                <option v="12" value="2crown">2蓝冠</option> 
					                <option v="11" value="1crown">1蓝冠</option> 
					                <option v="10" value="5diamond">5钻</option> 
					                <option v="9" value="4diamond">4钻</option> 
					                <option v="8" value="3diamond">3钻</option> 
					                <option v="7" value="2diamond">2钻</option> 
					                <option v="6" value="1diamond">1钻</option> 
					                <option v="5" value="5heart">5心</option> 
					                <option v="4" value="4heart">4心</option> 
					                <option v="3" value="3heart">3心</option> 
					                <option v="2" value="2heart">2心</option> 
					                <option v="1" value="1heart">1心</option> 
    							</select> 	
							</td>
			<td>所在地</td><td>
								<select id="loc">
								<option value="" selected>所有地区</option> 
						        	<option value="江浙沪">江浙沪</option> 
							    	<option value="珠三角">珠三角</option> 
							    	<option value="北京">北京</option> 
							    	<option value="上海">上海</option> 
							    	<option value="杭州">杭州</option> 
							    	<option value="广州">广州</option> 
							    	<option value="深圳">深圳</option> 
							    	<option value="南京">南京</option> 
							    	<option value="武汉">武汉</option> 
							    	<option value="天津">天津</option> 
							    	<option value="成都">成都</option> 
							    	<option value="哈尔滨">哈尔滨</option> 
							    	<option value="重庆">重庆</option> 
							    	<option value="宁波">宁波</option> 
							    	<option value="无锡">无锡</option> 
							    	<option value="济南">济南</option> 
							    	<option value="苏州">苏州</option> 
							    	<option value="温州">温州</option> 
							    	<option value="青岛">青岛</option> 
							    	<option value="沈阳">沈阳</option> 
							    	<option value="福州">福州</option> 
							    	<option value="西安">西安</option> 
							    	<option value="长沙">长沙</option> 
							    	<option value="合肥">合肥</option> 
							    	<option value="南宁">南宁</option> 
							    	<option value="南昌">南昌</option> 
							    	<option value="郑州">郑州</option> 
							    	<option value="厦门">厦门</option> 
							    	<option value="大连">大连</option> 
							    	<option value="常州">常州</option> 
							    	<option value="石家庄">石家庄</option> 
							    	<option value="东莞">东莞</option> 
							    	<option value="安徽">安徽</option> 
							    	<option value="福建">福建</option> 
							    	<option value="甘肃">甘肃</option> 
							    	<option value="广东">广东</option> 
							    	<option value="广西">广西</option> 
							    	<option value="贵州">贵州</option> 
							    	<option value="海南">海南</option> 
							    	<option value="河北">河北</option> 
							    	<option value="黑龙江">黑龙江</option> 
							    	<option value="河南">河南</option> 
							    	<option value="湖北">湖北</option> 
							    	<option value="湖南">湖南</option> 
							    	<option value="江苏">江苏</option> 
							    	<option value="江西">江西</option> 
							    	<option value="吉林">吉林</option> 
							    	<option value="辽宁">辽宁</option> 
							    	<option value="内蒙古">内蒙古</option> 
							    	<option value="宁夏">宁夏</option> 
							    	<option value="青海">青海</option> 
							    	<option value="山东">山东</option> 
							    	<option value="山西">山西</option> 
							    	<option value="陕西">陕西</option> 
							    	<option value="四川">四川</option> 
							    	<option value="新疆">新疆</option> 
							    	<option value="西藏">西藏</option> 
							    	<option value="云南">云南</option> 
							    	<option value="浙江">浙江</option> 
							    	<option value="香港">香港</option> 
							    	<option value="澳门">澳门</option> 
							    	<option value="台湾">台湾</option> 
							    	<option value="海外">海外</option> 
								</select> 
							</td>
		</tr>
		<tr>
			<td>价格</td><td><input id="ps" type="text" size="5">&nbsp;-&nbsp;<input id="pe" type="text" size="5">元</td>
			<td>30天推广量</td><td><input id="hs" type="text" size="5">&nbsp;-&nbsp;<input id="he" type="text" size="5">个</td>
			<td colspan=2><a id="advancedSearchButton" href="javascript:$('#advancedSearchForm')[0].reset();">重置搜索条件</a></td>
		</tr>	
	</table>
	</form>
</div>
</div>