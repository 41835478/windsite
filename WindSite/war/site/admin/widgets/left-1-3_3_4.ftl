<div class="custome-710-4">
    <div class="custome-header-img"></div>
        <div class="custome-header-nav">
        <table width=100%>
        	<tr><td width=200px align=center><a href="${asa[0].clickUrl}" class="a-s" target="_blank"><span>${asa[0].title}</span></a></td><td align=right>
        	<ul class="custome-highlight">
	        	<#list las as l>
					<li class="l-a-s"><a href="${l.clickUrl}" target="_blank"><span>${l.title}</span></a></li>
				</#list>
        	</ul></td>
        	</tr>
        </table>	
        </div>
        <div class="custome-box">
            <ul class="custome-list custome-edit"><#list ldaip as l>
				<li class="l-d-a-i-p" pw="160" ph="160">
				<table>
					<tr><td><div><a href="${l.clickUrl}" target="_blank"><img src="${l.picUrl}"  alt="${l.title}"/></a></div></td></tr>
					<tr><td height=50px valign=top><a class="title" href="${l.clickUrl}" target="_blank"><span>${l.title}</span></a></td></tr>
					<tr><td><span class="price-desc">￥:</span><span class="price">${l.price}</span>&nbsp;<span class="volume-desc">最近成交</span><span class="volume">${l.volume}</span></td></tr>
				</table>
				</li></#list>
             </ul>
        <div style="clear:both"></div>    
        </div>
 </div>