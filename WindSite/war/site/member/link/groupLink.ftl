<#if group??>
<style>
#group_type{background-color: #FFF7EA;border: 1px solid #F6DDB0;clear: both;margin-top: 6px;}
#group_type li{float:left;cursor:pointer;position:relative;}
.clearing{clear: both;display: block;height: 0px;overflow: hidden;}
fieldset{background-color: #EFF8F9;border: 1px solid #D8EDFF;color: #505050;margin-bottom: 10px;margin-top: 20px;padding: 10px;position: relative;}
fieldset td{line-height:20px;}fieldset label{cursor:pointer}
legend{color: #005BA5;display: block;font-size: 14px;font-weight: bolder;left: 10px;position: absolute;top: -14px;}
</style>
<fieldset id="group_type">
    <legend>
        版式
    </legend>
<ul>
<li class="selected" t="0"><img id="checkedImg" src="/assets/images/link/checked.gif" style="position:absolute;"/><img src="/assets/images/link/group-default.gif"/></li>
</ul>
<div style="clear:both;"></div>
 </fieldset>
<fieldset id="group_skin">
<legend>
   皮肤
</legend>
<label><input type="radio" name="group_skin" value="7" checked>橘色</label>
<label><input type="radio" name="group_skin" value="1">粉色</label>
<label><input type="radio" name="group_skin" value="2">绿色</label>
<label><input type="radio" name="group_skin" value="3">银色</label>
<label><input type="radio" name="group_skin" value="4">黑色</label>
<label><input type="radio" name="group_skin" value="5">蓝色</label>
<label><input type="radio" name="group_skin" value="6">紫色</label>
<label><input type="radio" name="group_skin" value="8">棕色</label>
<label><input type="radio" name="group_skin" value="9">黄色</label>
<label><input type="radio" name="group_skin" value="10">红色</label>
<div style="clear:both;"></div>
 </fieldset>
 <fieldset id="group_order">
<legend>
    排序
</legend>
<label><input type="radio" name="group_order" value="1" checked>默认</label>
<label><input type="radio" name="group_order" value="2">佣金从高到低</label>
<label><input type="radio" name="group_order" value="3">成交量从高到低</label>
<label><input type="radio" name="group_order" value="4">卖家信用从高到低</label>
<label><input type="radio" name="group_order" value="5">价格从低到高</label>
<label><input type="radio" name="group_order" value="6">价格从高到低</label>
<div style="clear:both;"></div>
 </fieldset>
<fieldset>
    <legend>
        文字链形式
    </legend>
    <table width=100%>
    <#assign site=USER.sites[0]>
    	<tr><td><input name="txtlinkRadio" id="txtlinkRadio1" type="radio" value="url" title="http://<#if site.www??&&site.www!=''>${site.www}<#else>${site.domainName}.xintaonet.com</#if>/tgroup/${group.id}.html" checked>&nbsp;&nbsp;<label for="txtlinkRadio1">URL推广</label></td></tr>
    	<tr><td><input name="txtlinkRadio" id="txtlinkRadio2" type="radio" value="txtlink" title="${group.name}" url="http://<#if site.www??&&site.www!=''>${site.www}<#else>${site.domainName}.xintaonet.com</#if>/tgroup/${group.id}.html">&nbsp;&nbsp;<label  for="txtlinkRadio2">${group.name}</label></td></tr>
    	<tr><td><input name="txtlinkRadio" id="txtlinkRadio3" type="radio" value="customelink" url="http://<#if site.www??&&site.www!=''>${site.www}<#else>${site.domainName}.xintaonet.com</#if>/tgroup/${group.id}.html">&nbsp;&nbsp;<label for="txtlinkRadio3">自定义：</label><input id="txtlinkInput" style="width:350px;padding:5px;" disabled value="${group.name}"></a></td></tr>
    </table>
</fieldset><br/>
<a href="#" id="thirdPrev" class="button prev">上一步</a> 
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<a href="#" id="thirdNext" class="button">下一步</a> 
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	<a href="#" id="thirdPreview" class="button">预览</a>
<form id="thirdPreviewForm" method="get" target="_blank">
<input type="hidden" name="t" id="tc">
<input type="hidden" name="s" id="sc">
<input type="hidden" name="o" id="oc">
</form> 
</#if>