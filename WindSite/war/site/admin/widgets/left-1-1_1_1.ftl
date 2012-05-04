<div class="custome-472-1">
<h2 class="custome-header-h2"><a href="${asa[0].clickUrl}" class="a-s" target="_blank"><span>${asa[0].title}</span></a></h2>
<table class="custome-table">
	<tr>
		<td width=950px style="padding-bottom:5px;">
			<ul class="custome-edit">
				<#list ldai as l>
					<li class="l-d-a-i" pw="60" ph="60">
						<div><a href="${l.clickUrl}" target="_blank"><img src="${l.picUrl}"  alt="${l.title}"/></a></div>
					</li>
				</#list>
			</ul>
		</td>
	</tr>
</table>
</div>