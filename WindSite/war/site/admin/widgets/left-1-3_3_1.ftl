<div class="custome-710-1">
<table><tr><td>
<h2><a href="${asa[0].clickUrl}" class="a-s" target="_blank"><span>${asa[0].title}</span></a></h2>
<span class="more"><a href="${asa[1].clickUrl}" class="a-s" target="_blank"><span>${asa[1].title}</span></a></span>
<table width="700px">
	<tr>
		<td>
			<div class="d-a-i" pw="160" ph="160" style="width:160px;height:160px;">
			<a href="${dai[0].clickUrl}" style="width: 160px; height: 160px; * font-size: 140px;" target="_blank">
			<img src="${dai[0].picUrl}" alt="${dai[0].title}"/></a></div>
		</td>
		<td>
		<ul>
			<#list ldaip as l>
				<li class="l-d-a-i-p<#if l_index==0> nobg</#if>" pw="110" ph="110">
					<table>
					<tr><td height=110px><div><a href="${l.clickUrl}" target="_blank"><img src="${l.picUrl}"  alt="${l.title}"/></a></div></td></tr>
					<tr><td height=20px align=center><a class="title" href="${l.clickUrl}" target="_blank"><span>${l.title}</span></a></td></tr>
					<tr><td height=30px align=center><span class="price-desc">特价:</span><span class="price">${l.price}</span></td></tr>
					</table>				
				</li>
			</#list>
		</ul>
		</td>
	</tr>
</table>
</td></tr></table>
</div>