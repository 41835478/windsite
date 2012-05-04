<div id="category-cascading" class="box">
	<div class="bd">
		<div class="category-extra">
			<dl>
				<div>
					<dt>您当前选择的是：</dt>
					<dd>
						<ol class="category-path" id="J_OlCatePath"></ol>
					</dd>
				</div>
			</dl>
		</div>
		<div class="cascading-container">
			<ol id="J_OlCascadingList" style="left: 0px; ">
				<#if cats??&&cats?size!=0>
				<#list cats as c>
				<li class="page-cats">
					<#list c?keys as k>
					<#assign value=c[k]>
					<#if value??&&value?size!=0>
					<ul>
						<#list value as v><li class="<#if v.isParent&&c_index!=3>parent</#if><#if k==v.cid> selected</#if>" cid="${v.cid}"><span>${v.name}</span></li></#list>
					</ul>
					</#if>
					</#list>
				</li>
				</#list>
				</#if>
			</ol>
			<div style="clear:both;"></div>
		</div>
	</div>
</div>