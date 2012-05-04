<#if itemProps??&&itemProps?size!=0>
<#assign propsLength=itemProps?size-1 propsDesc=''>
<#if (propsLength>3)>
	<#assign propsLength=3>
</#if>
<#list itemProps[0..propsLength] as i>
<#if i.propValues??&&i.propValues?size!=0>
<#assign valuesLength=i.propValues?size-1>
<#if (valuesLength>5)>
	<#assign valuesLength=5>
</#if>
<#assign tempProps='' keyDesc=i.name isProp=false valueDesc=''><#if props??><#assign tempProps=props?replace(i.pid+':[0-9]+;','','r')><#if props?contains(i.pid+':')><#assign isProp=true></#if></#if>
<div class="prop-item ks-clear">
<dl>
	<dt style="" title="${i.name}">${i.name}：</dt>
	<dd>
	<ul>
		<#list i.propValues[0..valuesLength] as p>
		<#if isProp&&valueDesc==''><#if props?contains(i.pid+':'+p.vid)><#assign valueDesc=p.name+'|'+i.pid+':'+p.vid></#if></#if>
		<li><a href="/search?q=${q?url}&cid=${cid}&nicks=${nicks?url}&order_by=${order_by}&is_mall=${is_mall}&state=${state?url}&city=${city?url}&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${tempProps+i.pid+':'+p.vid+';'}&page_no=${page_no}" title="${p.name}">${p.name}</a></li>
		</#list>
		<#if (i.propValues?size>6)>
		<li class="moreValue" style="display:none;"><ul>
		<#list i.propValues[6..(i.propValues?size-1)] as p>
		<#if isProp&&valueDesc==''><#if props?contains(i.pid+':'+p.vid)><#assign valueDesc=p.name+'|'+i.pid+':'+p.vid></#if></#if>
			<li><a href="/search?q=${q?url}&cid=${cid}&nicks=${nicks?url}&order_by=${order_by}&is_mall=${is_mall}&state=${state?url}&city=${city?url}&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${tempProps+i.pid+':'+p.vid+';'}&page_no=${page_no}" title="${p.name}">${p.name}</a></li>
		</#list>	
		</ul></li>
		</#if>
	</ul>
	<#if (i.propValues?size>6)><a href="#" class="more close">更多</a></#if></dd>
</dl>
</div>
<#if isProp&&valueDesc!=''><#assign propsDesc=propsDesc+keyDesc+':'+valueDesc+';'></#if>
</#if>
</#list>
<#if (itemProps?size>4)>
<div class="more-prop" style="display: none; " id="J_MoreProp">
<#list itemProps[4..(itemProps?size-1)] as i>
<#if i.propValues??&&i.propValues?size!=0>
<#assign valuesLength=i.propValues?size-1>
<#if (valuesLength>5)>
	<#assign valuesLength=5>
</#if>
<#assign tempProps='' keyDesc=i.name isProp=false valueDesc=''><#if props??><#assign tempProps=props?replace(i.pid+':[0-9]+;','','r')><#if props?contains(i.pid+':')><#assign isProp=true></#if></#if>
<div class="prop-item ks-clear">
<dl>
	<dt style="" title="${i.name}">${i.name}：</dt>
	<dd>
	<ul>
		<#list i.propValues[0..valuesLength] as p>
		<#if isProp&&valueDesc==''><#if props?contains(i.pid+':'+p.vid)><#assign valueDesc=p.name+'|'+i.pid+':'+p.vid></#if></#if>
		<li><a href="/search?q=${q?url}&cid=${cid}&nicks=${nicks?url}&order_by=${order_by}&is_mall=${is_mall}&state=${state?url}&city=${city?url}&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${tempProps+i.pid+':'+p.vid+';'}&page_no=${page_no}" title="${p.name}">${p.name}</a></li>
		</#list>
		<#if (i.propValues?size>6)>
		<li class="moreValue" style="display: none;"><ul>
		<#list i.propValues[6..(i.propValues?size-1)] as p>
		<#if isProp&&valueDesc==''><#if props?contains(i.pid+':'+p.vid)><#assign valueDesc=p.name+'|'+i.pid+':'+p.vid></#if></#if>
			<li><a href="/search?q=${q?url}&cid=${cid}&nicks=${nicks?url}&order_by=${order_by}&is_mall=${is_mall}&state=${state?url}&city=${city?url}&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${tempProps+i.pid+':'+p.vid+';'}&page_no=${page_no}" title="${p.name}">${p.name}</a></li>
		</#list>	
		</ul></li>
		</#if>
	</ul>
	<#if (i.propValues?size>6)><a href="#" class="more close">更多</a></#if></dd>
</dl>
</div>
</#if>
<#if isProp&&valueDesc!=''><#assign propsDesc=propsDesc+keyDesc+':'+valueDesc+';'></#if>
</#list>
</div>
</#if>
<#if propsDesc!=''>
<div class="selected-attr" id="selected-attr" style="display:none;"><dl>
<dt>您已选择:</dt>
<#assign trackTitle=''>
<#list propsDesc?split(';') as d>
<#if d!=''>
<#assign ds2=d?split('|') ds=ds2[0]?split(':')>
<#assign trackTitle=trackTitle+ds[0]+':'+ds[1]+'|'>
<dd><a href="/search?q=${q?url}&cid=${cid}&order_by=${order_by}&is_mall=${is_mall}&state=${state?url}&city=${city?url}&start_price=${start_price}&end_price=${end_price}&view=${view}&props=${props?replace(ds2[1]+';','')}&page_no=${page_no}" title="${ds2[0]}"><h5>${ds[0]}:</h5>${ds[1]}<span class="close-icon"></span></a></dd>
</#if>
</#list>
</dl>
</div>
<script type="text/javascript">
	var _gaq = _gaq || [];
	_gaq.push( [ '_setAccount', 'UA-10891782-8' ]);
	_gaq.push( [ '_trackPageview' ]);
	<#if pid??&&pid!=''>_gaq.push(['_trackEvent', 'xt-${pid}', 'key-${categories[0].categoryId}', '${q}|${categories[0].name+'|'+trackTitle}']);</#if>
	(function() {
		var ga = document.createElement('script');
		ga.type = 'text/javascript';
		ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl'
				: 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(ga, s);
	})();
	$(function() {$('#J_Navgation').prepend($('#selected-attr').show());});
</script>
<#else>
<script type="text/javascript">
	var _gaq = _gaq || [];
	_gaq.push( [ '_setAccount', 'UA-10891782-8' ]);
	_gaq.push( [ '_trackPageview' ]);
	<#if pid??&&pid!=''>_gaq.push(['_trackEvent', 'xt-${pid}', 'key-${categories[0].categoryId}', '${q}|${categories[0].name}']);</#if>
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
</#if>
</#if>