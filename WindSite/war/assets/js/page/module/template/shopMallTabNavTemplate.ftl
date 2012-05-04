<div class="s-l" style="width:890px">
	<#if malls??&&malls?size!=0>
	<#list malls as m>
	<#assign mallTitle=m.title?replace('CPS|ROI|CPA|CPC','','ir')>
	<#if m_index%6==0><dl style="width:177px;"></#if><dd style="width:177px;"><a target="_blank" href="/ymall-${m.b2cId}.html" title="${mallTitle}">${mallTitle}<strong class="b2c-fl">（最高返${m.topRate}）</strong></a></dd><#if m_index%6==5||!m_has_next></dl></#if>
	</#list>
	</#if>
</div>