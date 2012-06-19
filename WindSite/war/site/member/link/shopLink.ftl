<#if shop??>
<#assign spid=(USER.pid?replace('mm_','')?replace('_0_0',''))>
<style>
.shop_bg{background-color: #FFF9EF;border: 1px solid #F6DDB0;clear: both;height: 1%;padding-right: 0px;position: relative;}
.shop_bg .shop_bg_top{border-bottom: 1px solid #FADCAC;color: #7F0000;display: block;font-size: 14px;font-weight: bolder;height: 1%;line-height: 30px;margin: 5px 15px;}
.shop_bg .shop_bg_top a{color: #7F0000;display: block;}
.shop_bg_tb{float: left;}.shop_bg_tb .shop_pic{border: 1px solid #D4D3FF;display: inline-block;float: left;height: 100px;margin: 0px 25px 0px;padding: 0px;width: 100px;}
.shop_bg_tb .lc_tb{display: inline-block;float: left;}
.shop_bg_tb .lc_tb li i{color: #003CEC;font-style: normal;font-weight: bold;margin-right: 5px;}
.shop_bg_tb .lc_tb li{border-bottom: 1px dashed #CCC;clear: both;line-height: 28px;margin-right: 5px;padding: 0px 20px;width: 210px;}
.clearing{clear: both;display: block;height: 0px;overflow: hidden;}
fieldset{background-color: #EFF8F9;border: 1px solid #D8EDFF;color: #505050;margin-bottom: 20px;padding-left:20px;margin-top: 20px;padding-bottom: 10px;position: relative;}
fieldset td{line-height:20px;}
legend{color: #005BA5;display: block;font-size: 14px;font-weight: bolder;left: 10px;position: absolute;top: -14px;}
</style>
<div class="shop_bg">
	<div class="clearing"></div>
	<h3 class="shop_bg_top"><a href="${shop.click_url?replace('13667242',spid)}" onClick="_gaq.push(['_trackEvent', 'xt-${USER.pid}', 'shop-d-${shop.sid}', '${shop.title}']);" target="_blank" title="${shop.title}">${shop.title}</a></h3>
	<div class="lc">
		<ul>
			<li>
				<div class="shop_bg_tb">
					<div class="shop_pic">
						<a href="${shop.click_url?replace('13667242',spid)}" onClick="_gaq.push(['_trackEvent', 'xt-${USER.pid}', 'shop-d-${shop.sid}', '${shop.title}']);" target="_blank"><img src="<#if (shop.pic_path!="")>http://logo.taobao.com/shop-logo/${shop.pic_path}<#else>http://s.yijia.com/taobao/i/no_shop.gif</#if>" alt="${shop.title}" width=100px height=100px/></a>
					</div>
					<div class="lc_tb">
						<ul>
							<li><strong>掌柜：</strong><i>${shop.nick}</i></li>
							<li><strong>佣金比率：</strong><span style="color:red;font-weight:bold;">${shop.commission_rate}%</span></li>
							<li id="sellerCredit" style="_padding-top:5px;"><strong>掌柜信用：<img src="http://static.xintaonet.com/assets/min/images/credit/<@ws.credit shop.level></@ws.credit>.gif"/></li>
							<li><strong>创建时间：</strong>${shop.t_created}</li>
						</ul>
					</div>
				</div>
			</li>						
		</ul>
		<div class="clearing"></div>
	</div>
</div>
<fieldset class="style_txtlink">
    <legend>
        文字链形式
    </legend>
    <table width=100%>
    <#assign site=USER.sites[0]>
    	<tr><td><input name="txtlinkRadio" id="txtlinkRadio1" type="radio" value="url" title="http://<#if site.www??&&site.www!=''>${site.www}<#else>${site.domainName}.xintaonet.com</#if>/tshop/${shop.sid}.html" checked>&nbsp;&nbsp;<label for="txtlinkRadio1">URL推广</label></td></tr>
    	<tr><td><input name="txtlinkRadio" id="txtlinkRadio2" type="radio" value="txtlink" title="${shop.title}" url="http://<#if site.www??&&site.www!=''>${site.www}<#else>${site.domainName}.xintaonet.com</#if>/tshop/${shop.sid}.html">&nbsp;&nbsp;<label  for="txtlinkRadio2">${shop.title}</label></td></tr>
    	<tr><td><input name="txtlinkRadio" id="txtlinkRadio3" type="radio" value="customelink" url="http://<#if site.www??&&site.www!=''>${site.www}<#else>${site.domainName}.xintaonet.com</#if>/tshop/${shop.sid}.html">&nbsp;&nbsp;<label for="txtlinkRadio3">自定义：</label><input id="txtlinkInput" style="width:350px;padding:5px;" disabled value="${shop.title}"></a></td></tr>
    </table>
</fieldset><br/>
<a href="#" id="thirdPrev" class="button prev">上一步</a> 
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<a href="#" id="thirdNext" class="button">下一步</a> 
</#if>