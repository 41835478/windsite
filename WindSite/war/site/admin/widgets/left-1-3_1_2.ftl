<div class="custome-235-2" align="center">
	<h2><a href="${asa[0].clickUrl}" class="a-s" target="_blank"><span>${asa[0].title}</span></a></h2>
<ul class="custome-edit">
	<#list ldaip as l>
	<li class="l-d-a-i-p<#if l_index%2==1> pair</#if>" pw="60" ph="60">
		<table><tr>
			<td width=65px><div><a href="${l.clickUrl}" target="_blank"><img
						src="${l.picUrl}"  alt="${l.title}"/></a></div></td>
			<td width=150px style="padding-left:5px;"><a class="title" href="${l.clickUrl}" target="_blank"><span>${l.title}</span></a><br/><span class="price-desc">淘宝价:</span><span
								class="price">${l.price}</span></td>
		</tr></table>
	</li>
	</#list>
</ul>	
</div>