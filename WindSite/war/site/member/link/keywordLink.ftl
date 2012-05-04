<#if keyword??>
<style>
.clearing{clear: both;display: block;height: 0px;overflow: hidden;}
fieldset{background-color: #EFF8F9;border: 1px solid #D8EDFF;color: #505050;margin-bottom: 20px;padding-left:20px;margin-top: 20px;padding-bottom: 10px;position: relative;}
fieldset td{line-height:20px;}
legend{color: #005BA5;display: block;font-size: 14px;font-weight: bolder;left: 10px;position: absolute;top: -14px;}
</style>
<fieldset class="style_txtlink">
    <legend>
        文字链形式
    </legend>
    <table width=100%>
    <#assign site=USER.sites[0]>
    	<tr><td><input name="txtlinkRadio" id="txtlinkRadio1" type="radio" value="url" title="http://<#if site.www??&&site.www!=''>${site.www}<#else>${site.domainName}.xintaonet.com</#if>/keywords" checked>&nbsp;&nbsp;<label for="txtlinkRadio1">URL推广</label></td></tr>
    	<tr><td><input name="txtlinkRadio" id="txtlinkRadio2" type="radio" value="txtlink" title="${keyword}" url="http://<#if site.www??&&site.www!=''>${site.www}<#else>${site.domainName}.xintaonet.com</#if>/keywords">&nbsp;&nbsp;<label  for="txtlinkRadio2">${keyword}</label></td></tr>
    	<tr><td><input name="txtlinkRadio" id="txtlinkRadio3" type="radio" value="customelink" url="http://<#if site.www??&&site.www!=''>${site.www}<#else>${site.domainName}.xintaonet.com</#if>/keywords">&nbsp;&nbsp;<label for="txtlinkRadio3">自定义：</label><input id="txtlinkInput" style="width:350px;padding:5px;" disabled value="${keyword}"></a></td></tr>
    </table>
</fieldset><br/>
<a href="#" id="thirdPrev" class="button prev">上一步</a> 
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<a href="#" id="thirdNext" class="button">下一步</a> 
</#if>