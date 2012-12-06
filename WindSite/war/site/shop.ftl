<#setting url_escaping_charset='utf8'> 
<@p.pageHeader>
<meta name="keywords" content="${local.title}">
<meta name="description" content="${local.title}<#if local??>,掌柜:${local.nick}</#if>">
<title>${local.title}- ${sitetitle}</title>
</@p.pageHeader>
<style>
.store_show_box{ float:left; margin:5px 0px; padding:0; width:945px; height:auto;}.store_show_box_logo{ float:left; margin:0px 0px 0px 5px; padding:0; width:222px; height:182px;color:#333333; overflow:hidden;}
.store_show_box_logo p.t1,.store_show_box_logo p.t2,.store_show_box_logo p.t3,.store_show_box_logo p.t4{ margin:0; padding:0;width:222px;}.store_show_box_logo .pic { width:100px; height:100px; margin:25px 61px 10px 61px; padding:0; display:block; overflow:hidden;}
.store_show_box_logo b{ color:#FF6600;}.store_show_box_logo p.t2,.store_show_box_logo p.t3{ height:25px; line-height:25px; overflow:hidden;}.store_show_box_logo p.t4{ margin:5px 0 0 0;}
.store_show_box_logo .jump{ display:block; width:125px; height:35px; margin:0 auto; padding:0; background:url(http://static.xintaonet.com/assets/min/stylesheets/images/jump.gif) no-repeat;}
.store_show_box_info{ float:left; margin:0px 0px 0px 8px; padding:0; width:710px; height:142px;}.store_show_box_info ul{ float:left; margin:0; padding:0;}
.store_show_box_info ul li{ float:left; width:350px; margin:5px 0px; text-align:left; height:30px; line-height:30px; overflow:hidden;border-bottom:1px dashed #CCCCCC;}
.store_show_box_info ul li h1{font-size:13px; font-weight:700;padding:0;display:inline;}
</style>
<#if ((versionNo??&&(versionNo>=2)))&&www??&&www!=''&&'true'==site_isLogin&&!MEMBER??>
<script src="/assets/min/js/page/fanli.min.js?v=${dateVersion()}"></script>
<style>
.apple_overlay {display:none;background-image:url(http://static.xintaonet.com/assets/min/stylesheets/images/white.png);width:300px;padding:35px;font-size:11px;}.apple_overlay .close {background-image:url(http://static.xintaonet.com/assets/min/stylesheets/images/close.png);position:absolute; right:5px; top:5px;cursor:pointer;height:35px;width:35px;}.apple_overlay .field {padding-top: 12px;zoom: 1;}.apple_overlay .field label {display: inline-block;padding-right: 10px;text-align: right;width: 66px;}.apple_overlay .login-text {border: 1px solid #C8C8C8;height: 18px;line-height: 18px;margin-right: 3px;padding: 3px;vertical-align: middle;width: 180px;}
<!--[if lt IE 7]><style>div.apple_overlay {background-image:url(http://static.flowplayer.org/tools/img/overlay/overlay_IE6.gif);color:#fff;}div.apple_overlay div.close {background-image:url(http://static.flowplayer.org/tools/img/overlay/overlay_close_IE6.gif);}</style><![endif]-->
</style>
<div id="J_FanliLoginBox" class="apple_overlay">
	<div class="hd"></div>
	<div class="bd">
		<div style="margin:10px 30px 0 30px; border-bottom:1px solid #E6E6E6; padding-bottom:12px;"><span style="color:#313131; font-size:14px; margin-left:9px;">您尚末登录，购物无法拿到返利!</span></div>
		<div class="field"><label>账户名</label> <input type="text" id="J_Username" class="login-text"></div>
		<div class="field"><label>密　码</label>	<input type="password" id="J_Pwd" class="login-text"></div>
		<div class="field"><span id="J_FanliLoginButton" class="btn btn-ok" style="margin-left:80px;"><input type="button" value="登录"></span>&nbsp;&nbsp;&nbsp;<a href="/router/fanli/registe" id="J_FanliRegiste" style="color:#f30;" target="_blank">注册新会员</a></div>
		<div style="margin:22px 30px 0 30px; text-align:right;"><a id="J_FanliLink" style="font-size:14px;" href="#" target="_blank">不要返利，直接购买&gt;&gt;</a></div>
	</div>
</div>
</#if>
<div class="layout grid-m ks-clear">
	<div class="col-main">
		<div class="main-wrap J_TRegion">
			<div name="shopCustom" class="box J_TBox ks-clear">
				<div class="shop-custom no-border">
					<div class="bd">
						<div class="custom-area">
							<div class="store_show_box">
							    <div class="store_show_box_logo">
									<p class="t1"><a href="/gshop/${sid}.html" target="_blank"><img src="<#if local??&&''!=local.picPath>http://logo.taobao.com/shop-logo${local.picPath}<#else>http://img02.taobaocdn.com/tps/i2/T1nB0EXnBwXXXXXXXX-80-80.png</#if>" class="pic" alt="${local.title}"></a></p><p class="t4"><a href="/gshop/${sid}.html" target="_blank"><img src="http://static.xintaonet.com/assets/min/stylesheets/images/jump.gif" class="jump" alt="${local.title}"></a></p>
								</div>
								<div class="store_show_box_info">
									<ul>
										<li style="width:550px;">店铺名称：<h1><a href="/gshop/${sid}.html" target="_self" title="${local.title}">${local.title}</a></h1></li>
										<li style="width:145px;"><img src="http://static.xintaonet.com/assets/min/stylesheets/images/315.gif" alt="品质卖家"></li>
										<#if local??><li>店铺掌柜：${local.nick}<a href="http://amos.im.alisoft.com/msg.aw?v=2&amp;uid=${local.nick}&amp;site=cntaobao&amp;s=2&amp;charset=utf-8" target="_blank"><img src="http://amos.im.alisoft.com/online.aw?v=2&amp;uid=${local.nick}&amp;site=cntaobao&amp;s=2&amp;charset=utf-8" alt="点击这里给我发消息"></a></li></#if>
										<#if local??&&local.sellerCredit??&&''!=local.sellerCredit><li>卖家信用：<span><img src="http://static.xintaonet.com/assets/min/stylesheets/images/${local.sellerCredit}.gif" style="vertical-align: text-bottom;"/></span></li></#if>
										<#if local??><li>商品描述：<span class="c-value-no" title="${local.itemScore}/5.0"><i style="width: ${local.itemScore}em"></i></span></li></#if>
										<#if local??><li>服务态度：<span class="c-value-no" title="${local.serviceScore}/5.0"><i style="width: ${local.serviceScore}em"></i></span></li></#if>
										<#if local??><li>发货速度：<span class="c-value-no" title="${local.deliveryScore}/5.0"><i style="width: ${local.deliveryScore}em"></i></span></li></#if>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<#if local??>
<div class="layout grid-m0s5 ks-clear">
	<div class="col-main">
		<div class="main-wrap J_TRegion"> 
			<div name="shopDetailHot" class="box J_TBox ks-clear"><div class="shop-detailhot shop-display" data-count="15" data-rtype="seller"><div class="hd"><h3><span>店主推荐</span></h3></div><div class="bd"></div></div></div>
		</div>
	</div>
	<div class="col-sub J_TRegion">
		<div name="shopRank" class="box J_TBox ks-clear">
			<div class="shop-rank">
				<div class="hd"><h3><span>同类店铺</span></h3></div>
				<div class="bd">
					<div class="rank-tab">
						<div class="rank-panels" style="border-top:0px;">
							<div class="rank-panel">
								<ul>
							<#if shops??&&shops?size!=0>
								<#list shops as d>
								<#assign shopClickUrl=d.clickUrl>
									<li>
										<div class="pic" cr='${d.commissionRate}'><a href="${shopClickUrl}" target="_blank" title="${d.shopTitle}"><img src="<#if d.shopType=='C'>http://img02.taobaocdn.com/tps/i2/T1nB0EXnBwXXXXXXXX-80-80.png<#else>http://img03.taobaocdn.com/tps/i3/T1N.tyXcNpXXXXXXXX-70-70.png</#if>" alt="${d.shopTitle}" onerror="javascript:this.src='http://img02.taobaocdn.com/tps/i2/T1nB0EXnBwXXXXXXXX-80-80.png'" width=40px height=40px></a></div>
										<div class="desc"><a href="${shopClickUrl}" title="${d.shopTitle}" target="_blank">${d.shopTitle}</a></div>
										<#if d.sellerCredit??&&''!=d.sellerCredit><div class="sales-amount"><img src="http://static.xintaonet.com/assets/min/stylesheets/images/${d.sellerCredit}.gif" style="vertical-align: text-bottom;"/></div></#if>
									</li>
								</#list>
							</#if>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<#if versionNo??&&(versionNo>1.5||(versionNo==1.5&&''!=www))>
		<div name="shopDianPuCat" class="box J_TBox ks-clear">
			<div class="shop-dianpu-cat">
				<div class="hd"><h3><span>淘店铺分类</span></h3></div>
				<div class="bd"><ul><#include  "//dianpu/sidebar.html" parse=false encoding="utf8"></ul></div>
			</div>
		</div>
		</#if>
	</div>
</div>
</#if>
<@p.pageFooter>
<#if local??>var SELLERNICK='${local.nick}';</#if>
<#if pid??&&pid!=''>
_gaq.push(['_trackEvent', 'xt-${pid}', 'shop-d-${sid}', '${local.title}']);
</#if>
<#if appKey??>
if (typeof(TOP) != 'undefined') {
	try {
		TOP.api({
					method : 'taobao.taobaoke.widget.items.convert',
					fields : 'commission,price',
					num_iids : nid
				}, function(resp) {
					try {
						if (resp.taobaoke_items.taobaoke_item) {
							var c = resp.taobaoke_items.taobaoke_item[0].commission;
							var co = Math.floor(parseFloat(c)
									* rate * 100)
									/ 100.00;
							self
									.after('<li class="xt-detail-commission xt-clearfix"><span style="color:red;">'
							+ pre
							+ '</span>'
							+ '<strong style="vertical-align: baseline;font-family:Tahoma,Arial,Helvetica,sans-serif;color: #F50;font-size:24px;font-weight: normal;padding-right: 5px;line-height:25px;">'
							+ co
							+ '</strong>'
							+ last + '<li>');
						}
					} catch (e) {
					}
	
				});
	} catch (e) {
	}
}
</#if>
</@p.pageFooter>
			