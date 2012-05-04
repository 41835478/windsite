<div class="catlist">
	<a class="btn_left"></a>
	<div class="pre" style="position: relative">
		<div class="movelist" style="position:relative;left:0;top:0;">
			<ul style="position:relative;left:0;top:0;">
				<#list cats as c>
				<li cid="${c.cid}" isparent="${c.isParent}"><#if c.isParent><b class="arrow-right"></b></#if><span>${c.name}</span><#if 'true'==isParent><#if c.isParent><a href="javascript:void(0);" class="btn_add" cid="${c.cid}" cname="${c.name}">添加</a></#if><#else><a href="javascript:void(0);" class="btn_add" cid="${c.cid}" cname="${c.name}">添加</a></#if></li>
				</#list>
			</ul>
		</div>
	</div>
	<div class="selected">
		<ul id="ul_selected">
		</ul>
		<div class="operater"><span class="btn_del">删除</span><span class="btn_up">上移</span><span class="btn_down">下移</span></div>
	</div>
	<a class="btn_right"></a>
</div>