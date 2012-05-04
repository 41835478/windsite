<div class="custome-950-1" align="center">
<div class="bar">
<table width=100%>
	<tr>
		<td width=130px align=center><a href="${asa[0].clickUrl}" class="a-s bar-logo" target="_blank"><span>${asa[0].title}</span></a></td>
		<td width=420px>
		<ul class="bar-tabs">
			<#list las[0..2] as l>
			<li class="l-a-s" ><a href="${l.clickUrl}" target="_blank"><span>${l.title}</span></a></li>
			</#list>
		</ul>
		</td>
		<td>
		<ul class="bar-keywords">
			<#list las[3..5] as l>
			<li class="l-a-s" ><a href="${l.clickUrl}" target="_blank"><span>${l.title}</span></a></li>
			</#list>
		</ul>
		</td>
	</tr>
</table>
</div>
<div class="shopwindow-content">
<table width=100% height=100%>
	<tr>
		<td width=240px valign="top">
		<div class="d-a-i left-middle" pw="230" ph="350" style="width:230px;height:350px;"><a href="${dai[0].clickUrl}"
			style="width: 230px; height: 350px; * font-size: 307px;" target="_blank"><img
			src="${dai[0].picUrl}" alt="${dai[0].title}"/></a></div>
		</td>
		<td width=370px valign="top">
		<table>
			<tr>
				<td height=35px align=center valign=top><a
					href="${asa[1].clickUrl}" class="a-s middle-top" target="_blank"><span>${asa[1].title}</span></a></td>
			</tr>
			<tr>
				<td height=150px align=center>
				<ul class="middle-middle">
					<#list las[6..11] as l>
					<li class="l-a-s"><a href="${l.clickUrl}" target="_blank"><span>${l.title}</span></a></li>
					</#list>
				</ul>
				</td>
			</tr>
			<tr>
				<td height=160px valign=top>
				<ul class="middle-bottom">
				<#list ldai[0..2] as l>
					<li class="l-d-a-i" pw="100" ph="100">
					<table>
						<tr>
							<td height=105px>
							<div><a href="${l.clickUrl}" target="_blank"><img
								src="${l.picUrl}" alt="${l.title}"/>
							</a></div>
							</td>
						</tr>
						<tr>
							<td height=40px align=center><a class="title" href="${l.clickUrl}" target="_blank"><span>${l.title}</span></a></td>
						</tr>
					</table>
					</li>
				</#list>
				</ul>
				</td>
			</tr>
		</table>
		</td>
		<td width=310px valign="top">
		<ul class="right-middle">
		<#list ldaip[0..2] as l>
			<li class="l-d-a-i-p" <#if l_index!=2>style="border-bottom: 1px dotted;" </#if>pw="100" ph="100">
			<table>
				<tr>
					<td>
					<div><a href="${l.clickUrl}" target="_blank"><img
						src="${l.picUrl}"  alt="${l.title}"/></a></div>
					</td>
					<td valign="top">
					<table>
						<tr>
							<td height=60px valign=top><a class="title" href="${l.clickUrl}" target="_blank"><span>${l.title}</span></a></td>
						</tr>
						<tr>
							<td><span class="price-desc">促销价:</span><span
								class="price">${l.price}</span>元</td>
						</tr>
					</table>
					</td>
				</tr>
			</table>
			</li>
			</#list>
		</ul>
		</td>
	</tr>
</table>
</div>
</div>