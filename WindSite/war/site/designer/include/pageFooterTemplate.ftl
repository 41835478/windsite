		<!--page ft-->
		<!--<div id="ft"><div class="layout grid-m"><div class="col-main"><div class="main-wrap J_TRegion"><div class="box J_TBox"><div class="shop-custom no-border"><div class="bd"><div class="custom-area"><table border="0" cellpadding="0" cellspacing="0" width="950"><tbody><tr><td height="32" width="338"><img height="32" src="http://img04.taobaocdn.com/imgextra/i4/263817957/T2pV8sXiVaXXXXXXXX_!!263817957.gif" width="338"></td><td height="32" width="92"><a href="/" target="_blank"><img alt="" height="32" src="http://img01.taobaocdn.com/imgextra/i1/263817957/T2uF8sXiNaXXXXXXXX_!!263817957.gif" width="92"></a></td><td height="32" width="104"><a  href="#" onclick="AddFavorite('${sitetitle}');return false;"><img alt="" height="32" src="http://static.xintaonet.com/assets/min/stylesheets/images/T2zF8sXixaXXXXXXXX_!!263817957.jpg" width="104"></a></td><td height="32" width="90"><a href="javascript:;" onclick="window.scrollTo(0,0);"><img height="32" src="http://img03.taobaocdn.com/imgextra/i3/263817957/T2EV8sXihaXXXXXXXX_!!263817957.gif" width="90"></a></td><td><img height="32" src="http://img02.taobaocdn.com/imgextra/i2/263817957/T2IX8sXhVaXXXXXXXX_!!263817957.gif" width="326"></td></tr></tbody></table></div></div></div></div></div></div></div></div>-->
</div>
<div id="footer">
<#include "/site/designer/include/pageFooter.ftl">
<#if share??&&''!=share.share>
${share.share}
</#if>
</div>
<#if (versionNo??&&(versionNo>=2))&&www??&&www!=''&&baiduTongJi??&&''!=baiduTongJi>
	<script type="text/javascript">
var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F${baiduTongJi}' type='text/javascript'%3E%3C/script%3E"));
</script>
</#if>
<#if analyticsType??&&""!=analyticsType>
	<#if "analytics_google"==analyticsType>
	<script type="text/javascript">var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));</script><script type="text/javascript">try {var pageTracker = _gat._getTracker("${gid}");pageTracker._trackPageview();} catch(err) {}</script>
	<#elseif "analytics_linezing"==analyticsType>
	<script type="text/javascript" src="http://js.tongji.linezing.com/${lid}/tongji.js"></script><noscript><a href="http://www.linezing.com"><img src="http://img.tongji.linezing.com/${lid}/tongji.gif"/></a></noscript>
	<#elseif "analytics_51la"==analyticsType>
	<script language="javascript" type="text/javascript" src="http://js.users.51.la/${laid}.js"></script><noscript><a href="http://www.51.la/?${laid}" target="_blank"><img alt="&#x6211;&#x8981;&#x5566;&#x514D;&#x8D39;&#x7EDF;&#x8BA1;" src="http://img.users.51.la/${laid}.asp" style="border:none" /></a></noscript>
	</#if>
</#if>
<#if kefu??&&''!=kefu.kefu>
${kefu.kefu}
</#if>
<#if tdjPid??&&tdjPid!=''>
<script type="text/javascript">
    (function(win,doc){
        var s = doc.createElement("script"), h = doc.getElementsByTagName("head")[0];
        if (!win.alimamatk_show) {
            s.charset = "gbk";
            s.async = true;
            s.src = "http://a.alimama.cn/tkapi.js";
            h.insertBefore(s, h.firstChild);
        };
        var o = {
            pid: "${tdjPid}",/*推广单元ID，用于区分不同的推广渠道*/
            appkey: "",/*通过TOP平台申请的appkey，设置后引导成交会关联appkey*/
            unid: ""/*自定义统计字段*/
        };
        win.alimamatk_onload = win.alimamatk_onload || [];
        win.alimamatk_onload.push(o);
    })(window,document);
</script>
</#if>