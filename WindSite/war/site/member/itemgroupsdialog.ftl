<#if groups??&&groups?size!=0>
&nbsp;&nbsp;&nbsp;请选择要加入的推广组:<br/><br/>
<ul style="list-style:none;line-height:18px;margin-left:30px;">
	<#list groups as g>
		<#if (g.count<30)>
			<#assign valid=(30-g.count)>
			<#if (length>valid)>
				<li style="margin-bottom:5px;"><input type="radio" name="itemgroup" value="${g.id}">${g.name}(已有${g.count}，可加入前${valid}件商品)</li>
			<#else>
				<li style="margin-bottom:5px;"><input type="radio" name="itemgroup" value="${g.id}">${g.name}(已有${g.count}，可加入${length}件全部商品)</li>
			</#if>
		<#else>
			<li style="margin-bottom:5px;">${g.name}(已满)</li>
		</#if>
		
	</#list>
</ul>
<#else>
<h1>您尚未创建推广组，请进入我的新淘网-我的推广组-新增推广组</h1>
</#if>