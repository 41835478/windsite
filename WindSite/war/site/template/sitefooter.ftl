			</div>
			</div>
		</div>
		<div id="footer" class="layfoot" align="center" style="margin:0px auto;border-top:1px #d1d7dc solid;padding-top:10px;text-align:center;line-height:24px;clear:both">
			<#if versionNo??&&(versionNo>=2)&&www??&&www!=''&&friendLinks??&&friendLinks?size!=0><#list friendLinks as t><a target="_blank" href="<#if t.url?starts_with('/')>http://${www}${t.url}<#else>${t.url}</#if>">${t.title}</a>&nbsp;&nbsp;&nbsp;<#if t_index==9><br/></#if></#list>
			<#else>
			 Copyright 2009-2010 版权所有  <a href="http://www.xintaonet.com" style="color:#888">新淘网(www.xintaonet.com)</a>（<a  style="color:#888" href="http://www.miibeian.gov.cn/" target="_blank">京ICP备10035914号</a>）
			</#if>
		</div>
	<#if versionNo??&&(versionNo>=2)&&www??&&www!=''&&baiduTongJi??&&''!=baiduTongJi>
	<script type="text/javascript">
var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F${baiduTongJi}' type='text/javascript'%3E%3C/script%3E"));
</script>
	</#if>
<script type="text/javascript">
	var _gaq = _gaq || [];
	_gaq.push( [ '_setAccount', 'UA-10891782-8' ]);
	_gaq.push( [ '_trackPageview' ]);
	(function() {
		var ga = document.createElement('script');
		ga.type = 'text/javascript';
		ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl'
				: 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(ga, s);
	})();
</script>
<#if analyticsType??&&""!=analyticsType>
	<#if "analytics_google"==analyticsType>
	<script type="text/javascript">var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));</script><script type="text/javascript">try {var pageTracker = _gat._getTracker("${gid}");pageTracker._trackPageview();} catch(err) {}</script>
	<#elseif "analytics_linezing"==analyticsType>
	<script type="text/javascript" src="http://js.tongji.linezing.com/${lid}/tongji.js"></script><noscript><a href="http://www.linezing.com"><img src="http://img.tongji.linezing.com/${lid}/tongji.gif"/></a></noscript>
	<#elseif "analytics_51la"==analyticsType>
	<script language="javascript" type="text/javascript" src="http://js.users.51.la/${laid}.js"></script><noscript><a href="http://www.51.la/?${laid}" target="_blank"><img alt="&#x6211;&#x8981;&#x5566;&#x514D;&#x8D39;&#x7EDF;&#x8BA1;" src="http://img.users.51.la/${laid}.asp" style="border:none" /></a></noscript>
	</#if>
</#if>		
</body>
</html>