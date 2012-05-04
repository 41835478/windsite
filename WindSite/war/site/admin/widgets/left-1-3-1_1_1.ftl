<div class="custome-185-1">
	<table cellspacing="0" cellpadding="0"><tr><td>
	<h2><a href="${asa[0].clickUrl}" class="a-s" target="_blank"><span>${asa[0].title}</span></a></h2>
	<table cellspacing="0" cellpadding="0">
	<tr><td class="middle" height=115px align=center>
		<ul style="width:175px;">
			<#list ldaip as l>
				<li class="l-d-a-i-p" pw="80" ph="80" <#if l_index==0>style="margin-right:2px;"</#if>>
					<table cellspacing="0" cellpadding="0">
					<tr><td height=80px><div><a href="${l.clickUrl}" target="_blank"><img src="${l.picUrl}"  alt="${l.title}"/></a></div></td></tr>
					<tr><td height=20px align=center><a class="title" href="${l.clickUrl}" target="_blank"><span>${l.title}</span></a></td></tr>
					<tr><td height=15px align=center><span class="price-desc">特价:</span><span class="price">${l.price}</span></td></tr>
					</table>				
				</li>
			</#list>
		</ul>
	</td></tr>
	<tr><td class="bottom" align=center height="auto" valign="top">
		<ul class="custome-edit custome-highlight">
			<#list las as l>
				<li class="l-a-s"><a href="${l.clickUrl}" target="_blank"><span>${l.title}</span></a></li>
			</#list>
		</ul>
	</td></tr>
	</table>
	</td></tr></table>
</div>