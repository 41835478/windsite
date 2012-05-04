<#if cats??&&(cats?size>0)>
	<#list cats as c>
		<li id="${c.cid}" title="${c.name}" url="${c.clickUrl?replace('{pid}',USER.pid)}" isparent="${c.isParent}" parentcid="${c.parentCid}">
		<input type="checkbox" name="cats">
    	<strong>${c.name}</strong>
    	<#if c.isParent><span style="font-weight:bold;color:red;" title="展开子类目">-></span></#if>
  		</li>
	</#list>
</#if>