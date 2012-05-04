<div class="custome-710-2">
<h2 class="custome-header-h2"><a href="${asa[0].clickUrl}" class="a-s" target="_blank"><span>${asa[0].title}</span></a></h2>
<table class="custome-table">
	<tr>
		<td width=170px valign=top align=center>
			<div class="d-a-i" pw="160" ph="160" style="width:160px;height:260px;">
			<a href="${dai[0].clickUrl}" style="width: 160px; height: 160px; * font-size: 140px;" target="_blank">
			<img src="${dai[0].picUrl}" alt="${dai[0].title}"/></a>
			<br/>
			<a class="title" href="${dai[0].clickUrl}" target="_blank"><span>${dai[0].title}</span></a> 
			</div>
		</td>
		<td width=530px>
		<ul style="width:530px">
			<#list ldaip as l>
				<li class="l-d-a-i-p" pw="80" ph="80">
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
								<td><span class="price-desc">特价:</span><span class="price">${l.price}</span></td>
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