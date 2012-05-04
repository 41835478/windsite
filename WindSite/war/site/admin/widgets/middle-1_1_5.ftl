<div  class="custome-950-5" align="center">
<div class="bar">
<table width=100% height="40px" border="0" align="center" cellpadding="0" cellspacing="0">
<tr><td align=left width=300 valign=top><a href="${asa[0].clickUrl}" class="a-s bar-logo" target="_blank"><span>${asa[0].title}</span></a></td>
<td align=right>
<ul class="bar-keywords">
<#list las[0..4] as l>
<li class="l-a-s"><a href="${l.clickUrl}" target="_blank"><span>${l.title}</span></a></li>
</#list>
</ul>
</td></tr>
</table>
</div>
<div class="shopwindow-content" align=center style="margin:0px;padding:0px;">
<table width=100% height="360">
<tr>
<td width=200px valign=top><table><tr><td>
<div class="d-a-i left-middle" pw="180" ph="250"><a href="${dai[0].clickUrl}" target="_blank"><img
			src="${dai[0].picUrl}" alt="${dai[0].title}"/></a></div>
</td></tr><tr><td>
<ul class="left-bottom">
<#list ldai[0..1] as l>
<li class="l-d-a-i" pw="60" ph="60">
<table>
	<tr>
		<td height=70px>
		<div><a href="${l.clickUrl}" target="_blank"><img
			src="${l.picUrl}" alt="${l.title}"/>
		</a></div>
		</td>
	</tr>
	<tr>
		<td height=20px align=center><a class="title" href="${l.clickUrl}" target="_blank"><span>${l.title}</span></a></td>
	</tr>
</table>
</li>
</#list>
</ul></td></tr></table></td>
<td width=470 valign=top><table><tr><td>
<ul class="middle-middle">
<#list ldaip[0..7] as l>
<li class="l-d-a-i-p" pw="100" ph="100">
<table>
	<tr>
		<td height=100px>
		<div><a href="${l.clickUrl}" target="_blank"><img
			src="${l.picUrl}" alt="${l.title}"/>
		</a></div>
		</td>
	</tr>
	<tr>
		<td align=center><a class="title" href="${l.clickUrl}" target="_blank"><span>${l.title}</span></a></td>
	</tr>
	<tr>
		<td align=center><span class="price">￥${l.price}</span>元</td>
	</tr>
</table>
</li>
</#list>
</ul>
</td></tr><tr><td align=center>
<ul class="middle-bottom">
<#list ldai[2..7] as l>
<li class="l-d-a-i" pw="100" ph="100">
<div><a href="${l.clickUrl}" target="_blank"><img src="${l.picUrl}" alt="${l.title}"/></a></div>
</li>
</#list>
</ul>
</td></tr></table></td>
<td valign=top>
<table>
<tr><td width=232 height=25 style="background:url(/assets/min/images/custome/icon5_02.jpg) no-repeat;">
<table><tr><td width=20 align=center><img src="/assets/min/images/custome/icon5_01.gif"/></td><td style="color: white;font-size: 14px;font-weight: bold;">
店铺促销</td></tr></table>
</td></tr>
<tr><td>
<ul class="right-middle">
<#list ldai[8..11] as l>
<li class="l-d-a-i" pw="100" ph="100">
<table>
	<tr>
		<td height=100px>
		<div><a href="${l.clickUrl}" target="_blank"><img
			src="${l.picUrl}" alt="${l.title}"/>
		</a></div>
		</td>
	</tr>
	<tr>
		<td height=20px align=center><a class="title" href="${l.clickUrl}" target="_blank"><span>${l.title}</span></a></td>
	</tr>
</table>
</li>
</#list>
</ul>
</td></tr>
</table>
</td>
</tr>
</table> 
</div>
</div>