<div class="custome-640-7">
<#if cat??&&itemProps??&&itemProps?size!=0>
   <div class="selected-attr"  style="display:none;"><dl><dt>您已选择:</dt></dl><div style="clear:both;"></div></div>
   <div class="prop-list" style="clear:both;">
<#assign propsLength=itemProps?size-1>
<#if (propsLength>3)>
	<#assign propsLength=3>
</#if>
<#list itemProps[0..propsLength] as i>
<#if i.propValues??&&i.propValues?size!=0>
<#assign valuesLength=i.propValues?size-1>
<#if (valuesLength>4)>
	<#assign valuesLength=4>
</#if>
<div class="prop-item">
<dl>
	<dt class="search-prop" title="${i.name}">${i.name}：</dt>
	<dd>
	<ul>
		<#list i.propValues[0..valuesLength] as p><li><a href="#" title="${p.name}" value="${i.pid}:${p.vid}">${p.name}</a></li></#list>
		<#if (i.propValues?size>5)>
		<li class="moreValue" style="display:none;"><ul>
		<#list i.propValues[5..(i.propValues?size-1)] as p><li><a href="#" title="${p.name}" value="${i.pid}:${p.vid}">${p.name}</a></li></#list>	
		</ul></li>
		</#if>
	</ul>
	<#if (i.propValues?size>5)><a href="#" class="more close">更多</a></#if></dd>
</dl>
</div>
</#if>
</#list>
<#if (itemProps?size>4)>
<#list itemProps[4..(itemProps?size-1)] as i>
<#if i.propValues??&&i.propValues?size!=0>
<#assign valuesLength=i.propValues?size-1>
<#if (valuesLength>4)>
	<#assign valuesLength=4>
</#if>
<div class="prop-item" style="display:none;">
<dl><dt class="search-prop" title="${i.name}">${i.name}：</dt>
	<dd><ul><#list i.propValues[0..valuesLength] as p><li><a href="#" title="${p.name}" value="${i.pid}:${p.vid}">${p.name}</a></li></#list>
		<#if (i.propValues?size>5)>
		<li class="moreValue" style="display: none;"><ul>
		<#list i.propValues[5..(i.propValues?size-1)] as p><li><a href="#" title="${p.name}" value="${i.pid}:${p.vid}">${p.name}</a></li></#list>	
		</ul></li>
		</#if>
	</ul>
	<#if (i.propValues?size>5)><a href="#" class="more close">更多</a></#if></dd>
</dl>
</div>
</#if>
</#list>
</#if>
	</div>
	<#if (itemProps?size>4)><div class="show-more prop-toggler J_PropToggler"><div class="inner"><a href="#" class="close" hidefocus="true"><span>更多</span></a></div></div></#if>
	<#else>
	未找到当前选择类目的查询属性值，请切换类目重新查询
	</#if>
 </div>