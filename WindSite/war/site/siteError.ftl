<#setting url_escaping_charset='utf8'> 
<@p.pageHeader>
<meta name="keywords" content="${sitetitle}">
<meta name="description" content="${sitetitle}">
<meta name="robots" content="noindex,nofollow">
<title>错误页面 - ${sitetitle}</title>
</@p.pageHeader>
<style>
body{color: #666;font-family: Tahoma, SimSun, Arial;font-size: 12px;font-weight: normal;margin: 0px;padding: 0px;width: 100%;height: 100%;line-height: normal;text-align: center;}
#error-notice{height: 155px;margin-bottom: 50px;margin-right: 0px;margin-top: 30px;width: 740px;}.ant-emotion{float: left;height: 52px;width: 50px;}.error-notice-text{float: left;height: 155px;margin-left: 20px;width: 459px;}
.error-notice-hd{font-size: 16px;font-weight: bold;margin-bottom: 30px;width: 459px;}.error-notice-info{height: 0px;width: 459px;}.error-notice-advice{height: 106px;line-height: 24px;width: 459px;}
.you-can{height: 24px;margin-bottom: 10px;width: 459px;}.error-notice-advice ol{height: 72px;list-style: none;margin: 0px;margin-left: 25px;padding:0px;width: 434px;}
.error-notice-advice ol li{height: 24px;list-style-type: decimal;margin:0px;padding:0px;width: 434px;}
</style>
<div class="layout grid-s5m0 ks-clear">
	<div class="col-main">
		<div class="main-wrap J_TRegion">
			<div class="shop-custom no-border">
				<div class="hd" style="display:none;"><h3><span>错误信息</span></h3></div>
				<div class="bd">
					<div class="custom-area">
						<div id="error-notice"> 
						    <div class="ant-emotion"> 
						        <img src="/assets/images/error.gif" alt="Search"> 
						    </div> 
						    <div class="error-notice-text"> 
						        <div class="error-notice-hd">
						        	<#if code??&&code=="404">
										对不起！您浏览的网页可能已被删除,重命名或暂时不可用！
									<#else>
										<#if msg??&&msg!=''>
											错误信息:${msg}<#if msg?contains('升级版本')>，<a href="http://pay.taobao.com/mysub/subdeal/upgrade_order_sub_deal.htm?servId=22000691&appstore=myapp2upgrade" target="_blank" style="font-size: 16px;font-weight: bold;color:#f60;">立刻升级</a></#if>
										<#elseif code??&&code!=''>
											错误信息:${code}
										<#else>
											系统错误！<br/>
											<#if cause??>
												${cause}
											</#if>
									</#if>	
									</#if>
								</div> 
						        <div class="error-notice-info"></div> 
						        <div class="error-notice-advice" align="left"> 
						            <span class="you-can">您可以：</span> 
						            <ol> 
						                <li>检查网址是否正确</li> 
						                <li>去其它地方逛逛: <a href="/" title="购物首页">首页</a></li> 
						            </ol> 
						        </div> 
						    </div> 
						</div>
					</div>
				</div>
			</div>
			<div name="shopDisplay" class="box J_TBox ks-clear">
				<div class="shop-display">
					
				</div>
			</div>
		</div>
	</div>
	<div class="col-sub J_TRegion">
		<div name="shopSearch" class="box J_TBox ks-clear">
			<div class="shop-search">
				<div class="hd"><h3><span>搜索淘宝宝贝</span></h3></div>
				<div class="bd">
					<div class="search-form">
						<form name="SearchForm" action="/search" method="get" target="_blank">
							<input type="hidden" name="cid" value="0">
							<ul>
								<li class="keyword"><label for="keyword">关键字：</label><input type="text" size="18" name="q" id="KeywordBox" value="" onfocus="this.select();"></li>
								<li class="price"><label for="price">价格：</label><input id="price1" type="text" name="start_price" class="price J_CheckInput" size="4" value="">到<input id="price2" name="end_price" class="price J_CheckInput" type="text" size="4" value=""></li>
								<li class="submit"><button type="submit" class="button">搜索</button></li>
							</ul>
						</form>
					</div>
				</div>
			</div>
		</div>
		<div name="shopCategory" class="box J_TBox ks-clear">
			<div class="shop-category">
				<div class="hd"><h3><span>商品分类</span></h3></div>
				<div class="bd">
					<ul id="J_Cats" class="cats J_TWidget">
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=16">女装/女士精品</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=30">男装</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50006843">女鞋</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50010388">运动鞋</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50011740">男鞋/皮鞋/休闲鞋</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50016756">运动服/运动包/颈环配件</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=1625">女士内衣/男士内衣/家居服</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50006842">箱包皮具/热销女包/男包</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50010404">服饰配件/皮带/帽子/围巾</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=11">电脑硬件/显示器/电脑周边</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=1512">手机</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=1101">笔记本电脑</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50041307">网络设备/路由器/网络相关</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=14">数码相机/摄像机/摄影器材</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=1201">MP3/MP4/iPod/录音笔</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=20">电玩/配件/游戏/攻略</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50018908">影音电器</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50018930">厨房电器</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50018957">生活电器</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50008090">3C数码配件市场</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50019321">国货精品手机</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50035182">大家电</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50019142">个人护理/保健/按摩器材</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50019393">闪存卡/U盘/移动存储</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=1801">美容护肤/美体/精油</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50010788">彩妆/香水/美发/工具</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50018121">国货精品/开架化妆品</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=21">居家日用/收纳/礼品</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50035867">厨房/餐饮用具</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50035458">日化/清洁/护理</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50008163">床上用品/靠垫/毛巾/布艺</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=2128">家装饰品/窗帘/地毯</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50008164">家具/家具定制/宜家代购</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=27">装潢/灯具/五金/安防/卫浴</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50002766">零食/坚果/茶叶/特产</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50035978">滋补/生鲜/速食/订餐</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50008825">保健食品</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=35">奶粉/辅食/营养品</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50006004">尿片/洗护/喂哺等用品</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50005998">益智玩具/早教/童车床/出行</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50008165">童装/童鞋/孕妇装</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50010728">运动/瑜伽/健身/球迷用品</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=2203">户外/登山/野营/旅行</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=26">汽车/配件/改装/摩托/自行车</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=33">书籍/杂志/报纸</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=29">宠物/宠物食品及用品</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=34">音乐/影视/明星/音像</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50039094">乐器/吉他/钢琴/配件</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50007218">办公设备/文具/耗材</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50015926">珠宝/钻石/翡翠/黄金</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=1705">饰品/流行首饰/时尚饰品</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50005700">品牌手表/流行手表</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=25">玩具/模型/娃娃/人偶</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=23">古董/邮币/字画/收藏</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=28">ZIPPO/瑞士军刀/眼镜</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50007216">鲜花速递/蛋糕配送/园艺花艺</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50008075">演出/吃喝玩乐折扣券</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50018963">酒店客栈/景点门票/度假旅游</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50032886">网店/网络服务/个性定制/软件</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50035966">成人用品/避孕/计生用品</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50017708">网游装备/游戏币/帐号/代练</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50008907">IP卡/网络电话/手机号码</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=99">网络游戏点卡</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=40">腾讯QQ专区</a></li></ul></li>
						<li class="cat expand"><ul class="cat-bd"><li><a target="_blank" href="/search?cid=50004958">移动/联通/小灵通充值中心</a></li></ul></li>
					</ul>
				</div>
			</div>
		</div>	
	</div>
</div>
<@p.pageFooter>
</@p.pageFooter>