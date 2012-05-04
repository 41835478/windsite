<#if groups??&&groups?size!=0>
&nbsp;&nbsp;&nbsp;请选择要加入的店铺分组:<br/><br/>
<ul style="list-style:none;line-height:18px;margin-left:30px;">
	<#list groups as g>
		<#if (g.count<30)>
			<#assign valid=(30-g.count)>
			<#if (length>valid)>
				<li style="margin-bottom:5px;">${g.name}(已有${g.count}，剩余限额不足，请减少选中店铺数量)</li>
			<#else>
				<li style="margin-bottom:5px;"><input type="radio" name="shopgroup" value="${g.id}">${g.name}(已有${g.count}，可加入所有已选店铺)</li>
			</#if>
		<#else>
			<li style="margin-bottom:5px;">${g.name}(已满)</li>
		</#if>
		
	</#list>
</ul>
<#else>
<h1>您尚未创建店铺分组，请进入<a href="/router/member/sitemanager/shops" style="color:#f60;">我的店铺收藏</a>-新增店铺分组</h1>
</#if>