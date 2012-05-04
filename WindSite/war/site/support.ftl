<@ws.header>
<meta name="keywords" content="新淘网,淘宝,淘客,淘宝客,购物,自助建站,电子商务,网赚">
<meta name="description" content="新淘网 - 帮助与支持">
<title>帮助与支持- 新淘网</title>
</@ws.header>
 <script type="text/javascript" src="/help/demo/swfobject.js"></script>
<script type="text/javascript">
	$(function() {
	 	var type = $.url.param("type");
	 	var faq = $.url.param("faq");
	 	if(!type){
	 		type='help-register';
	 	}
	 	
	 	$('#'+type).show();
	 	if(faq){
			$('dt[dd="'+faq+'"]',$('#'+type)).css('background-position','5px -80px');
			$('dd[dt="'+faq+'"]',$('#'+type)).show();
	 	}
		$('dl dt').click(function(){
			var parent=$(this).parent();
			var dd = $('dd[dt="'+$(this).attr("dd")+'"]',parent);
			if(dd.is(':hidden')){
				dd.show();
				$(this).css('background-position','5px -80px');
			}else{
				dd.hide();
				$(this).css('background-position','5px 11px');
			}
		});
	});
</script>
<style>
#help-left{width:250px;float:left;}#help-right{width:680px;float:left;margin-left:10px;border: 1px solid #DFDFDF;}
ol{list-style:none;}ol li{font-size:14px;}
h3{color: #4C7E07;font-weight: bold;font-size: 14px;}p{text-indent: 2em;padding-top:10px;padding-bottom:10px;color:#666666;font-size:11pt;}
.keyword{color:#FF6600;font-size:13pt;}
dl dd{width:580px;text-align:left;display:none;background: white;border: 1px solid #CCC;color: #6C6C6C;margin-bottom: 10px;margin-top: 10px;padding: 25px 35px;position: relative;zoom: 1;}
dl dt{width:650px;text-align:left;font-size:14px;padding:5px;padding-left:20px;cursor:pointer;background: url(/assets/images/bzImg.gif) no-repeat 5px 11px;}dl dt:hover{background: #FFFFCA;border: 1px solid #CCC;}
.bzArrow{background: url(/assets/images/bzBg.png) no-repeat 0px 300px;background-position: -240px -87px;display: block;height: 8px;left: 30px;position: absolute;top: -8px;width: 15px;}
.paixu{background: url(/assets/images/titleBg.png) repeat-x 0px -121px;border-bottom: 1px solid #DFDFDF;color: #C9C9C9;height: 29px;line-height: 29px;}
.paixu a{margin-left:5px;color: #4C7E07;font-weight: bold;height: 30px;margin-bottom: -1px;position: relative;text-decoration: none;float: left;font-size: 14px;height: 29px;padding: 0px 20px;}
.help-menu{list-style:none;margin:0px;padding:10px;}.help-menu li{margin-left:20px;margin-bottom:5px;}.help-menu a{color:#31475C;font-size:10pt;}.help-menu a:hover{color:#f60;}
.help-menu span{color:#0668B3;}
</style>
<table style="background:#fafafa;width:950px;" align="center">
<tr>
<td>
<div id="help-left">
 <div style="border: 1px solid #DFDFDF;">
 <div class="paixu"> 
  	<a href="#">用户帮助</a>
  </div>
  	<ul class="help-menu">
		<li><a href="/router/site/view/support?type=help-register">注册/激活</a></li>
		<li><a href="/router/site/view/support?type=help-guide">新手指南</a></li>
		<li><a href="/router/site/view/support?type=help-myxintao">我的新淘网</a></li>
		<li><a href="/router/site/view/support?type=help-designer">新淘设计器</a></li>
		<li><a href="/router/site/view/support?type=help-customewidget">自定义组件</a></li>
		<li><a href="/router/site/view/support?type=help-fanli" style="color:red;font-weight:bold;">返利版帮助</a></li>
		<li><a href="/router/site/view/support?type=help-seller" style="color:red;font-weight:bold;">卖家版帮助</a></li>
	</ul>
</div>	
 <div style="border: 1px solid #DFDFDF;">
 <div class="paixu"> 
  	<a href="#">演示视频</a>
  </div>
  	<ul class="help-menu">
		<li><a href="/help/demo/video.html" target="_blank">新淘网1.0版本建站视频</a></li>
		<li><a href="/help/demo/widget/widget.html" target="_blank">新淘网2.0版本建站视频</a></li>
		<li><a href="/help/demo/favwidget/favwidget.html" target="_blank">收藏组件快速建站视频</a></li>
	</ul>
</div> 
 <div style="border: 1px solid #DFDFDF;">
 <div class="paixu"> 
  	<a href="#">联系我们</a>
  </div>
  	<ul class="help-menu">
		<li><a href="">广告合作：ad@xintaonet.com</a></li>
		<li><a href="">业务合作：bd@xintaonet.com</a></li>
		<li><a href="">技术支持：support@xintaonet.com</a></li>
	</ul>
</div>
 <div style="border: 1px solid #DFDFDF;">
 <div class="paixu"> 
  	<a href="#">官方QQ群</a>
  </div>
  	<ul class="help-menu">
		<li>QQ群(006):<span href="">123845835</span><br/></li>
		<li>QQ群(001):<span href="">105242300(已满)</span><br/></li>
		<li>QQ群(002):<span href="">48255660(已满)</span><br/></li>
		<li>QQ群(003):<span>2425943(已满)</span><br/></li>
		<li>QQ群(004):<span href="">115022718(已满)</span><br/></li>
		<li>QQ群(005):<span href="">119459960(已满)</span><br/></li>
	</ul>
</div> 
</div>
<div id="help-right">
<dl id="help-fanli" width="700px" style="display:none;">
	<dt dd="01">01.如何订购淘客返利版</dt>
	<dd dt="01"><span class="bzArrow"></span>
	<p>方法1：如果您尚未订购过新淘网。可以直接访问<a href="http://fuwu.taobao.com/service/service.htm?service_id=300" target="_blank">http://fuwu.taobao.com/service/service.htm?service_id=300</a>选择淘客返利版订购</p>
	<p>方法2：如果您正在使用新淘网淘客普及版（以前的淘客版），可以进入淘宝服务---<a href="http://fuwu.taobao.com/service/my_service.htm" target="_blank">我的服务</a>。选择新淘网，点击操作中的升级按钮。</p>
	<p>备注：如果在升级时提示费用过高（升级费用与您之前使用淘客版的到期时间有关），您希望一个月一个月的订购，那么请您先关闭新淘网服务，然后按照方法1直接订购新淘网淘客返利版。</p>
	</dd>
	<dt dd="02">02.如何使用淘客返利版？</dt>
	<dd dt="02"><span class="bzArrow"></span>
	<h3>前提条件：</h3>
	1.绑定了顶级域名：<a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=1803" target="_blank">查看绑定顶级域名帮助</a><br/>2.订购了新淘网返利版：<a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=4174" target="_blank">查看如何订购新淘网返利版</a>
	<h3>使用流程：</h3>
	1.确认自己的站点已经处于发布状态<br/>
	2.进入我是淘客--->返利管理--->基本设置。调整全站返利比例和推广比例（默认为50%以及10%）<br/>
	3.进入我是淘客--->链接管理。调整全站友情链接，全站购物导航（不配置则启用默认链接及导航）<br/>
	4.进入我是淘客--->文章管理。新增文章分类（与您新淘网家园的日志分类关联即可）<br/>
	完成以上步骤后，您的返利版淘站的基本配置就完成了，您可以随时调整以上内容。
	</dd>
	<dt dd="03">03.是否可以单独为某一个会员设置返利比例和推广比例？</dt>
	<dd dt="03"><span class="bzArrow"></span>
	新淘网返利版为站长提供了全站返利比例，全站推广比例。默认情况下，所有会员使用该比例。如果想单独为某一个会员设置。请按照以下步骤操作。
	<p>1.进入我是淘客--->返利管理--->会员管理--->会员详情---->在个人返利比例或个人推广比例一栏中填写对应比例，点击修改，即完成对个人的返利和推广设置</p>
	</dd>
	<dt dd="04">04.站长返利流程</dt>
	<dd dt="04"><span class="bzArrow"></span>
	<h3>站长返利流程：	等待站长支付返利----->等待会员确认收款----->完成返利流程</h3>
1.当买家确认收货后，您的站点将产生该交易的交易记录以及返利记录（如果发现系统没有自动获取，可以在交易管理中点击手动获取订单来获取指定时间段内的交易记录及返利记录）<br/>
2.进入我是淘客--->返利管理--->返利管理--->查看等待站长支付返利状态的返利记录--->点击确认支付（请务必保证自己已经将相关返利金额通过支付宝转账至会员的支付宝帐号）。此后进入了等待会员确认收款。一旦会员确认收款，该返利记录即完成返利流程。<br/>
	</dd>
</dl>
<dl id="help-seller" width="700px" style="display:none;">
	<dt dd="01">01.如何订购卖家版</dt>
	<dd dt="01"><span class="bzArrow"></span>
	<p>方法1：如果您尚未订购过新淘网。可以直接访问<a href="http://fuwu.taobao.com/service/service.htm?service_id=300" target="_blank">http://fuwu.taobao.com/service/service.htm?service_id=300</a>选择卖家版订购</p>
	<p>方法2：如果您正在使用新淘网淘客普及（或返利）版，可以进入淘宝服务---<a href="http://fuwu.taobao.com/service/my_service.htm" target="_blank">我的服务</a>。选择新淘网，点击操作中的升级按钮。</p>
	<p>备注：如果在升级时提示费用过高（升级费用与您之前使用淘客版的到期时间有关），您希望一个月一个月的订购，那么请您先关闭新淘网服务，然后按照方法1直接订购新淘网卖家版。</p>
	</dd>
	<dt dd="02">02.如何使用卖家版？</dt>
	<dd dt="02"><span class="bzArrow"></span>
	<h3>前提条件：</h3>
	1.您是淘宝卖家并且店铺加入了淘宝客推广：<a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=13" target="_blank">查看如何加入淘宝客推广</a><br/>2.订购了新淘网卖家版：<a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=4175" target="_blank">查看如何订购新淘网卖家版</a>
	<h3>使用流程：</h3>
	1.进入我是卖家--->首页广告计划--->新增计划<br/>
	2.进入我是卖家--->文章广告计划--->新增计划<br/>
	完成以上步骤后，您的广告计划就进入广告投放服务了，系统将自动投放一部分广告，其余由淘客自由选择推广
	</dd>
	<dt dd="03">03.为什么我创建广告计划时搜索不到我的商品？</dt>
	<dd dt="03"><span class="bzArrow"></span>
	<p>请确认您的店铺加入了淘宝客推广，只有加入推广的店铺才能正常创建广告计划。</p>
	</dd>
</dl>
<dl id="help-register" width="700px" style="display:none;">
	<dt dd="01">01.如何免费使用新淘网?</dt>
	<dd dt="01"><span class="bzArrow"></span>您需要登录淘宝箱,在其他应用中,找到新淘网,点击<a href="http://app.taobao.com/app/detail.htm?platform_id=81&tadget_id=35508&type=90" target="_blank">免费订购</a>,订购成功后。您可以选择从<a href="http://www.xintaonet.com" target="_blank">新淘网</a>登录，或者从淘宝箱-<a href="http://app.taobao.com/myapp/index.htm" target="_blank">我的应用</a>中找到新淘网直接点击使用</dd>
	<dt dd="02">02.为什么我登录的时候提示我:您需要订购才能使用该应用?</dt>
	<dd dt="02"><span class="bzArrow"></span>请确认您已经在淘宝箱免费订购了新淘网，如果尚未订购，请点击<a href="http://app.taobao.com/app/detail.htm?platform_id=81&tadget_id=35508&type=90" target="_blank">订购</a>。如果您确认已经订购，可能是因为淘宝箱订购没有及时生效的原因，您可以稍等1-2分钟后按F5刷新几次浏览器页面</dd>
	<dt dd="03">03.为什么要用淘宝账号进行授权?</dt>
	<dd dt="03"><span class="bzArrow"></span>新淘网和淘宝TOP平台是以合作的形式为淘宝客提供服务，其中商品推广等功能需要用户授权后才能够在商品中加入淘宝客的推广ID，只要带有淘宝客推广ID的商品在被用户购买后淘宝客才能获取推广的佣金，因此需使用淘宝帐号即可登录新淘网。</dd>
	<dt dd="04">04.没有淘宝帐号怎么办?</dt>
	<dd dt="04"><span class="bzArrow"></span>
		新淘网是和淘宝TOP平台联合推出的淘客独立推广平台，因此需要使用淘宝帐号登录，如果用户没有淘宝帐号，可以按照<a href="http://forum.xintaonet.com/viewthread.php?tid=15" target="_blank">此指南</a>申请淘宝帐号<br/>
		<a href="http://forum.xintaonet.com/viewthread.php?tid=15" target="_blank">淘宝帐号申请指南</a>
</dd>
</dl>
<dl id="help-guide" width="700px" style="display:none;">
	<dt dd="01">01.什么是淘宝客?</dt>
	<dd dt="01"><span class="bzArrow"></span>“淘宝客”，又叫“淘客”，是指帮助淘宝卖家推广商品获取佣金赚钱的人。淘客推广是一种按成交计费的推广模式,淘宝客只要从淘宝客推广专区获取商品代码，任何买家（包括您自己）经过您的推广 (链接,个人网站,博客或者社区发的帖子)进入淘宝卖家店铺完成购买后,就可得到由卖家支付的佣金，最高佣金达商品成交额的50%。详情查看<a href="http://help.alimama.com/support/search_result.htm?catid=6" target="_blank">淘宝客推广帮助</a></dd>
	<dt dd="02">02.新淘网建站有什么优势?</dt>
	<dd dt="02"><span class="bzArrow"></span><p>		新淘网实现了多种酷炫效果的组件封装，向广大普通互联网用户提供一站式的建站方案，大幅度降低普通用户建站门槛，会用鼠标就可以拖拽生成自己独立而漂亮的淘宝推广网站，让更多的普通互联网用户成为专业淘客、推广淘宝、赚取佣金。<br/><br/>
	新淘网主要为淘客提供如下便利：</p>
	<h3>提供独立站点</h3>
		<p>		淘客终于有了自己的地盘，不用再像打游击那样单个商品推广，而可以推广自己的独立站点，给互联网用户更专业的形象。</p>
	<h3>垂直分类管理</h3>
		<p>		淘客可以根据不同商品类型建立多个推广组，每个推广组维护不同类别的商品。比如：淘客整个站点全部推广手机，不同型号的手机放置在不同的推广组中，这样会给网购用户更权威更专业的感觉。</p>
	<h3>配套淘客助手</h3>
		<p>		淘客助手包含了淘站卫士、收入报表管理以及站点统计分析等一系列辅助性功能。淘站卫士可以帮您监管推广商品的有效性，避免推广商品中出现无效商品而带来的烦恼。收入报表管理可以让您快速查看某天的佣金收入详情。站点统计分析集成了多款成熟的站点统计工具，可以有效的为您展示推广站点的访问情况，帮助您及时调整推广策略。</p>
	<h3>操作简单、拖拽建站</h3>
		<p>		新淘网屏蔽了所有和技术相关的操作，淘客只需要通过鼠标拖拽控件就可以快速完成建站过程，无需淘客有任何IT经验。
			新手接触新淘网，请参考<a href="http://forum.xintaonet.com/viewthread.php?tid=62&extra=page%3D1" target="_blank" style="font-size:11pt;">《新淘网快速攻略》</a>。
		</p>	
	<h3>智能生成推广链接</h3>
	<p>目前很多淘宝客程序需要淘客手动修改PID，很是繁琐，稍不小心漏掉某个PID，则推广出去的商品最后佣金还是别人的，真是出力不讨好。新淘网利用淘客的淘宝帐号直接自动生成推广链接，无需修改任何PID，简单快捷，淘客心理也踏实</p></dd>
</dd>
<dt dd="03">03.如何使用一键建站?</dt>
	<dd dt="03"><span class="bzArrow"></span>
	<a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=9" target="_blank">如何使用一键建站?</a>
	</dd>
<dt dd="04">04.怎么在新淘网建立淘客独立推广网站?</dt>
	<dd dt="04"><span class="bzArrow"></span>
	<a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=344" target="_blank">怎么在新淘网建立淘客独立推广网站?</a>
	</dd>	
<dt dd="05">05.什么是PV,UV?</dt>
	<dd dt="05"><span class="bzArrow"></span>
	1.什么是pv<br/>PV(page view)，即页面浏览量，或点击量;通常是衡量一个网络新闻频道或网站甚至一条网络新闻的主要指标.高手对pv的解释是，一个访问者在24小时(0点到24点)内到底看了你网站几个页面。这里需要强调:同一个人浏览你网站同一个页面，不重复计算pv量，点100次也算1次。说白了，pv就是一个访问者打开了你的几个页面。PV之于网站，就像收视率之于电视，从某种程度上已成为投资者衡量商业网站表现的最重要尺度。pv的计算:当一个访问者访问的时候，记录他所访问的页面和对应的IP，然后确定这个IP今天访问了这个页面没有。如果你的网站到了23点，单纯IP有60万条的话，每个访问者平均访问了3个页面，那么pv表的记录就要有180万条。有一个可以随时查看PV流量以及你的网站世界排名的工具alexa工具条，安装吧!网编们一定要安装这个。<br/>2.什么是uv<br/>uv(unique visitor)，指访问某个站点或点击某条新闻的不同IP地址的人数。
　　在同一天内，uv只记录第一次进入网站的具有独立IP的访问者，在同一天内再次访问该网站则不计数。独立IP访问者提供了一定时间内不同观众数量的统计指标，而没有反应出网站的全面活动。
	</dd>	
</dl>
<dl id="help-myxintao" width="700px" style="display:none;">
	<dt dd="01">01.我在新淘网的推广站点地址是?</dt>
	<dd dt="01"><span class="bzArrow"></span>首先登录<a href="http://www.xintaonet.com" target="_blank">新淘网</a>,在我的新淘网-我的淘站-<a href="/router/member/view/personal" target="_blank">基本信息</a>-站点地址,点击复制即可获取您的站点地址
	<img src="http://home.xintaonet.com/attachment/201006/28/1_1277715843dEJD.png"/>
	</dd>
	<dt dd="02">02.如何修改我的站点名称?</dt>
	<dd dt="02"><span class="bzArrow"></span>首先登录<a href="http://www.xintaonet.com" target="_blank">新淘网</a>,在我的新淘网-我的淘站-基本信息-<a href="/router/member/view/personal?goto=sites&isUpdate=true" target="_blank">修改基本信息</a>.注：修改基本信息完成后。需要进入设计器重新发布您的站点才可以生效
	<img src="http://home.xintaonet.com/attachment/201006/28/1_12777165201J1Z.png"/>
	</dd>
	<dt dd="03">03.如何提交酷站展示?</dt>
	<dd dt="03"><span class="bzArrow"></span>首先登录<a href="http://www.xintaonet.com" target="_blank">新淘网</a>,在我的新淘网-<a href="/router/member/view/personal" target="_blank">我的淘站</a>-酷站展示中。提交三张规定尺寸的PNG图片，提交并通过审核后，您的站点将出现在酷站展示中。
	<img src="http://home.xintaonet.com/attachment/201006/28/1_1277716784p1c3.png"/>
	</dd>
	<dt dd="04">04.如何统计我在新淘网的站点的流量?</dt>
	<dd dt="04"><span class="bzArrow"></span>
		新淘网集成了多种第三方统计。首先登录<a href="http://www.xintaonet.com" target="_blank">新淘网</a>,在我的新淘网-<a href="/router/member/view/personal" target="_blank">我的淘站</a>-站点统计中。您可以选择其中一个来作为您的站点统计工具。详情查看:<br/>
		<ul><li><a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=6" target="_blank">如何配置量子恒道来统计我的新淘网站点?</a></li>
		<li><a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=4" target="_blank">如何配置51啦来统计我的新淘网站点?</a></li>
		<li><a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=5" target="_blank">如何配置Google Analytics来统计我的新淘网站点?</a></li></ul></dd>
	<dt dd="05">05.什么是店铺收藏?店铺收藏有什么用处?</dt>
	<dd dt="05"><span class="bzArrow"></span>新淘网为淘宝客们提供了淘宝推广店铺的收藏功能。在新淘网设计器中会提供店铺推广组件。该类组件可以推广您在新淘网中收藏的推广店铺。</dd>
	<dt dd="06">06.如何提交淘宝的推广店铺到新淘网中?</dt>
	<dd dt="06"><span class="bzArrow"></span>首先登录<a href="http://www.xintaonet.com" target="_blank">新淘网</a>,在我的新淘网-店铺收藏-添加新的店铺收藏-搜索-点击我要提交店铺，输入您要提交的店铺的卖家昵称即可，如果该店铺存在并且加入了淘宝客推广计划，则可以顺利提交至新淘网。
	<img src="http://home.xintaonet.com/attachment/201006/28/1_1277717645Z7ln.png"/>
	</dd>
	<dt dd="07">07.如何查询我的佣金收入?</dt>
	<dd dt="07"><span class="bzArrow"></span><a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=19" target="_blank">如何查询我的佣金收入?</a>
	</dd>	
	<dt dd="08">08.什么是淘站卫士?如何使用?</dt>
	<dd dt="08"><span class="bzArrow"></span><a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=343" target="_blank">什么是淘站卫士?如何使用?</a>
	</dd>
	<dt dd="09">09.什么是推广组?如何创建推广组?</dt>
	<dd dt="09"><span class="bzArrow"></span><a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=342" target="_blank">什么是推广组?如何创建推广组?</a>
	</dd>
	<dt dd="10">10.为什么我在新淘网的PID与阿里妈妈的PID不一致?</dt>
	<dd dt="10"><span class="bzArrow"></span><a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=31" target="_blank">为什么我在新淘网的PID与阿里妈妈的PID不一致?</a>
	</dd>
	<dt dd="11">11.为什么我的店铺商品搜索不到?</dt>
	<dd dt="11"><span class="bzArrow"></span>
	<ul style="list-style:none;margin:0px;padding:0px;">
	<li>1.请检查您的店铺或者商品是否加入了淘宝客推广，如果没有加入。<br/>
	请参考：<a href="/router/site/view/support?type=help-myxintao&faq=12">淘宝卖家如何加入淘宝客推广</a></li>
<li>2.进入我的新淘网，如果没有推广组。可以新建推广组</li>
<li>3.进入您要添加商品的推广组。点击添加商品</li>
<li>4.开始搜索您的推广商品(您可以复制您的推广商品的名称进行搜索)</li>
</ul>
	</dd>
	<dt dd="12">12.淘宝卖家如何加入淘宝客推广?</dt>
	<dd dt="12"><span class="bzArrow"></span>
	<ul style="list-style:none;margin:0px;padding:0px;">
	<li>第一步、一心以上信誉度的卖家。登录：“我的淘宝>>我是卖家>>我要推广”，进入“我要推广”页面后在右边的淘宝客推广区域点击“进入”。</li>
<li>第二步、阅读淘宝客推广协议后，点击提交注册信息。</li>
<li>第三步、注册后进入“新增主推商品”页面，在页面的商品前面打勾后，点击“下一步：设置佣金比率”。（您最多可以勾选30件商品作为主推商品。）</li>
<li>第四步、进入设置佣金比率页面后，先设置好主推商品的佣金比率，然后设置店铺佣金比率，两个都设置好以后，点击“设置完成”即完成了加入淘宝客推广所需的操作。</li>
</ul>
	</dd>
</dl>
<dl id="help-designer" width="700px" style="display:none;">
	<dt dd="01">01.怎么在新淘网建立淘客独立推广网站?</dt>
	<dd dt="01"><span class="bzArrow"></span>
	<a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=344" target="_blank">怎么在新淘网建立淘客独立推广网站?</a>
	</dd>
	<dt dd="02">02.如何切换设计模式来方便自己设计页面?</dt>
	<dd dt="02"><span class="bzArrow"></span>
	<a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=8" target="_blank">如何切换设计模式来方便自己设计页面?</a>
	</dd>
	<dt dd="03">03.如何制作我自己的店标?</dt>
	<dd dt="03"><span class="bzArrow"></span>
	<a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=345" target="_blank">如何制作我自己的店标?</a>
	</dd>
	<dt dd="04">04.如何改变我的页面布局?</dt>
	<dd dt="04"><span class="bzArrow"></span>
	<a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=346" target="_blank">如何调整我的页面布局?</a>
	</dd>
	<dt dd="05">05.如何改变我的页面皮肤/主题?</dt>
	<dd dt="05"><span class="bzArrow"></span>
	<a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=347" target="_blank">如何改变我的页面皮肤/主题?</a>
	</dd>
	<dt dd="06">06.如何使用推广组类组件?</dt>
	<dd dt="06"><span class="bzArrow"></span>
	<a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=348" target="_blank">如何使用推广组类组件?</a>
	</dd>
	<dt dd="07">07.如何使用阿里妈妈组件?</dt>
	<dd dt="07"><span class="bzArrow"></span>
	<a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=349" target="_blank">如何使用阿里妈妈组件?</a>
	</dd>
	<dt dd="08">08.如何使用其他组件(友情链接)?</dt>
	<dd dt="08"><span class="bzArrow"></span>
	<a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=350" target="_blank">如何使用其他组件(友情链接)?</a>
	</dd>
	<dt dd="09">09.如何设计多个页面?</dt>
	<dd dt="09"><span class="bzArrow"></span>
	<a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=352" target="_blank">如何设计多个页面?</a>
	</dd>
	<dt dd="10">10.如何更换我的首页?</dt>
	<dd dt="10"><span class="bzArrow"></span>
	<a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=353" target="_blank">如何更换我的首页?</a>
	</dd>
</dl>
<dl id="help-customewidget" width="700px" style="display:none;">
	<dt dd="01">01.什么是新淘网自定义组件?自定义组件有什么优势?</dt>
	<dd dt="01"><span class="bzArrow"></span>
	<a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=1158" target="_blank">什么是新淘网自定义组件?自定义组件有什么优势?</a>
	</dd>
	<dt dd="02">02.我收藏并使用其他人的自定义组件可以获取佣金吗?</dt>
	<dd dt="02"><span class="bzArrow"></span>
	<a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=1159" target="_blank">我收藏并使用其他人的自定义组件可以获取佣金吗?</a>
	</dd>
	<dt dd="03">03.为什么查看佣金时有的组件内容没有显示佣金?</dt>
	<dd dt="03"><span class="bzArrow"></span>
	<a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=1160" target="_blank">为什么查看佣金时有的组件内容没有显示佣金?</a>
	</dd>
	<dt dd="04">04.自定义组件推广内容如何排序?</dt>
	<dd dt="04"><span class="bzArrow"></span>
	<a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=1085" target="_blank">自定义组件推广内容如何排序?</a>
	</dd>
	<dt dd="05">05.如何使用推广组来编辑自定义组件?</dt>
	<dd dt="05"><span class="bzArrow"></span>
	<a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=1086" target="_blank">如何使用推广组来编辑自定义组件?</a>
	</dd>
	<dt dd="06">06.如何使用店铺收藏编辑自定义组件?</dt>
	<dd dt="06"><span class="bzArrow"></span>
	<a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=1162" target="_blank">如何使用店铺收藏编辑自定义组件?</a>
	</dd>
	<dt dd="07">07.如何使用类目推广编辑自定义组件?</dt>
	<dd dt="07"><span class="bzArrow"></span>
	<a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=1164" target="_blank">如何使用类目推广编辑自定义组件?</a>
	</dd>
	<dt dd="08">08.如何使用关键词推广编辑自定义组件?</dt>
	<dd dt="08"><span class="bzArrow"></span>
	<a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=1165" target="_blank">如何使用关键词推广编辑自定义组件?</a>
	</dd>
	<dt dd="09">09.如何使用频道推广编辑自定义组件?</dt>
	<dd dt="09"><span class="bzArrow"></span>
	<a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=1167" target="_blank">如何使用频道推广编辑自定义组件?</a>
	</dd>
	<dt dd="10">10.如何使用活动推广编辑自定义组件?</dt>
	<dd dt="10"><span class="bzArrow"></span>
	<a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=1170" target="_blank">如何使用活动推广编辑自定义组件?</a>
	</dd>
</dl>
</div>
</td></tr>
</table>
<#include "/site/template/footer.ftl">