<#if item??>
<style>
.single_pro_show{background-color: #FFF7EA;border: 1px solid #F6DDB0;clear: both;margin-top: 6px;padding: 10px 20px;}.single_pro_show dt{float: left;}
.single_pro_show dd{height: 1%;line-height: 25px;margin-left: 100px;}.single_pro_show dd a{color: #0065FF;font-size: 14px;font-weight: bolder;}.single_pro_show dd span{margin-right: 20px;}
.single_pro_show dd span em{color: #D02200;font-style: normal;font-weight: bolder;margin-right: 5px;}.single_pro_show dd span em.f_c_green{color: green;}
.clearing{clear: both;display: block;height: 0px;overflow: hidden;}
fieldset{background-color: #EFF8F9;border: 1px solid #D8EDFF;color: #505050;margin-bottom: 20px;padding-left:20px;margin-top: 20px;padding-bottom: 10px;position: relative;}
fieldset td{line-height:20px;}
legend{color: #005BA5;display: block;font-size: 14px;font-weight: bolder;left: 10px;position: absolute;top: -14px;}
</style>
<div class="single_pro_show">
<dl>
	<dt><img onerror="this.src='http://img.alimama.cn/images/tbk/cps/nomiage.gif'" src="${item.picUrl?replace("bao/uploaded", "imgextra")}_80x80.jpg" width="80" height="80"></dt>
	<dd class="single_pro_name"><a target="_blank" onClick="_gaq.push(['_trackEvent', 'xt-${USER.pid}', 'item-d-${item.nick}-${item.numIid}', '${item.title}']);" href="${item.clickUrl}">${item.title}</a></dd>
	<dd>
		<span>商品价格：<em>${item.price}</em>元</span>
		<span>佣金比率：<em>${item.commissionRate?number/100}</em>%</span>
		<span>佣金：<em>${item.commission}</em>元</span>
		<span>累计推广成交量：<em class="f_c_green">${item.commissionNum}</em>件</span>
	</dd>
</dl>
	<p style="margin:25px 0 0 20px; text-indent:20px; float:left; color:#AC7E35; background:url(http://img.alimama.cn/cms/images/1263979509293.gif) no-repeat;">请注意<a href="http://club.alimama.com/read.php?tid=372124" target="_blank">推广宝贝若为虚拟物品</a>，无法获取佣金，请重新选择宝贝！</p>
	<div class="clearing"></div>
</div>
<fieldset class="style_txtlink">
    <legend>
        文字链形式
    </legend>
    <table width=100%>
    <#assign site=USER.sites[0]>
    	<tr><td><input name="txtlinkRadio" id="txtlinkRadio1" type="radio" value="url" title="http://<#if site.www??&&site.www!=''>${site.www}<#else>${site.domainName}.xintaonet.com</#if>/titem/${item.numIid}.html" checked>&nbsp;&nbsp;<label for="txtlinkRadio1">URL推广</label></td></tr>
    	<tr><td><input name="txtlinkRadio" id="txtlinkRadio2" type="radio" value="txtlink" title="${item.title}" url="http://<#if site.www??&&site.www!=''>${site.www}<#else>${site.domainName}.xintaonet.com</#if>/titem/${item.numIid}.html">&nbsp;&nbsp;<label  for="txtlinkRadio2">${item.title}</label></td></tr>
    	<tr><td><input name="txtlinkRadio" id="txtlinkRadio3" type="radio" value="customelink" url="http://<#if site.www??&&site.www!=''>${site.www}<#else>${site.domainName}.xintaonet.com</#if>/titem/${item.numIid}.html">&nbsp;&nbsp;<label for="txtlinkRadio3">自定义：</label><input id="txtlinkInput" style="width:350px;padding:5px;" disabled value="${item.title}"></a></td></tr>
    </table>
</fieldset><br/>
<a href="#" id="thirdPrev" class="button prev">上一步</a> 
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<a href="#" id="thirdNext" class="button">下一步</a> 
</#if>