<table width=100%><tr><td><label class="fm-label" for="sortOrder"><span class="required">*</span>顺序：</label><input type="text"  required="required" class="i-text" id="sortOrder" name="sortOrder" value="0" style="width:50px;"></td><td><label for="title" class="fm-label"><span class="required">*</span>标题：</label><input type="text"  required="required" minlength="3" maxlength="20" class="i-text" id="title" name="title" value=""></td>
<td><label class="fm-label" for="url"><span class="required">*</span>地址：</label><input type="url"  required="required" class="i-text" id="url" name="url" value="" style="width:300px;"></td>
<td><span class="btn btn-ok"><input type="button" id="createLinkSubmit" value="确定"></span></td>
</tr></table>
<div class="shortcut">
<#assign site=USER.sites[0] domain=''>
<#if site.www??&&site.www!=''><#assign domain=site.www><#else><#assign domain=site.domainName+'.xintaonet.com'></#if>
<#if mytemplates??&&mytemplates?size!=0>
<div class="shortcut-rows">
<h4>我的页面</h4>
<ul><#list mytemplates as t><li><input type="radio" name="radio-link"><a href="http://${domain}/pages/${t.path}" target="_blank">${t.name}</a></li></#list></ul>
<div style="clear:both;"></div></div>
</#if>
<div class="shortcut-rows">
<h4>系统页面</h4>
<ul><li><input type="radio" name="radio-link"><a href="http://${domain}/huabao/index.html">导购画报首页</a></li></ul>
<div style="clear:both;"></div>
</div>
<div class="shortcut-rows">
<h4 class="title">淘宝频道</h4>
<ul><#list channels as c><li><input type="radio" name="radio-link"><a href="http://${domain}/zone/channel/channel.html?channel=${c.value}&pid=${USER.pid}" target="_blank">${c.name}</a></li></#list></ul>
<div style="clear:both;"></div>
</div>
</div>