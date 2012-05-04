<div style="width:310px;padding:0px;margin:0px;font-size:12px;line-height:14px;">
<ul class="custome-edit" style="margin:0px;padding:0px;list-style:none;">
<#list ldaip as l>
<li style="margin:0px;padding:0px;height:82px;width:310px;" class="l-d-a-i-p" pw="80" ph="80">
<table cellpadding="0" cellspacing="0" bgcolor="#FFFFFF"
	style="width: 290px; border: 1px solid #E6E6E6;">
	<tr>
		<td rowspan="2" align="center">
		<div style="width:80px;height:80px;padding:0px;margin:0px;"><a href="${l.clickUrl}" target="_blank"><img src="${l.picUrl}"  alt="${l.title}" style="border:0px;padding:0px;margin:0px;" width="80px" height="80px"/></a></div>
		</td>
		<td colspan="2"><a class="title" style="height: 40px; width: 210px; margin: 5px; color: #0000FF;overflow: hidden;" href="${l.clickUrl}" target="_blank" title="${l.title}"><span style="width: 210px;cursor: pointer;display: inline-block;font-size: 12px;line-height: 14px;text-align:left;overflow: hidden;white-space: normal;">${l.title}</span></a></td>
	</tr>
	<tr>
		<td nowrap="nowrap"><span class="price" style="font-weight: 600; margin: 5px; line-height: 30px; color: #CC0000; cursor: pointer;display: inline-block;font-size: 12px;overflow: hidden;white-space: normal;text-align:left;">${l.price}</span>元</td>
		<td nowrap="nowrap" width="100px"><a class="title" target="_blank"
			href="${l.clickUrl}" title="${l.title}"><img
			style="margin: 0px; pandding: 0px; line-height: 24px; vertical-align: text-bottom; border:0px;"
			src="http://www.xintaonet.com/assets/min/images/custome/fgetccode_btn.gif"></a></td>
	</tr>
</table>
</#list>
</li>
</ul>
</div>