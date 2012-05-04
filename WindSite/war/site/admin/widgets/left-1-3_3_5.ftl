<div class="custome-710-5">
    <div class="custome-header-img"></div>
        <div class="custome-header-nav">
        <table width=100%>
        	<tr><td width=250px align=center><a href="${asa[0].clickUrl}" class="a-s" target="_blank"><span>${asa[0].title}</span></a></td><td align=right>
        	<ul class="custome-highlight">
	        	<#list las as l>
					<li class="l-a-s"><a href="${l.clickUrl}" target="_blank"><span>${l.title}</span></a></li>
				</#list>
        	</ul></td>
        	</tr>
        </table>	
        </div>
        <div class="custome-box">
            <ul class="custome-list custome-edit custome-num"><#list ldaip as l>
				<li class="l-d-a-i-p" pw="100" ph="100">
				<table width=100%>
					<tr>
					<td width=60px class="num<#if l_index<3> numhighlight</#if>">${l_index+1}</td>
					<td width=110px><div><a href="${l.clickUrl}" target="_blank"><img src="${l.picUrl}"  alt="${l.title}"/></a></div></td>
					<td width=300px align=left><a class="title" href="${l.clickUrl}" target="_blank"><span>${l.title}</span></a><br/>
									<span class="level-desc">信用:</span><span class="level"><img src="/assets/min/images/credit/${l.level}.gif"/></span><br/>
									<span class="seller-desc">掌柜:</span><span class="seller">${l.seller}</span></td>
					<td align=left><span class="price-desc">促销价:</span><span class="price">${l.price}</span><br/>
								<span class="volume-desc">最近成交:</span><span class="volume">${l.volume}</span></td>
					</tr>
				</table>
				</li></#list>
             </ul>
        </div>
 </div>