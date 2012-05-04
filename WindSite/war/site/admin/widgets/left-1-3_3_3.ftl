<div class="custome-710-3">
<h2 class="custome-header-h2"><a href="${asa[0].clickUrl}" class="a-s" target="_blank"><span>${asa[0].title}</span></a></h2>
<table class="custome-table">
	<tr>
		<td width=700px style="padding-bottom:5px;">
			<ul class="custome-edit custome-highlight">
			<#list las as l>
				<li class="l-a-s"><a href="${l.clickUrl}" target="_blank"><span>${l.title}</span></a></li>
			</#list>
			</ul>
		</td>
	</tr>
</table>
</div>