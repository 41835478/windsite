<#macro pageLayout modules=[]>
<#if modules??&&modules?size!=0>
<#list modules as m>
<b name="${m.name}" class="J_TBox" data-id="${m.id}"><span>${m.title}</span><a class="ui-icon ui-icon-circle-arrow-n" title="上移">上移</a><a class="ui-icon ui-icon-circle-arrow-s" title="下移">下移</a><a class="ui-icon ui-icon-circle-close" title="删除" href="javascript:;">删除</a></b>
</#list>
</#if>
<i><a href="javascript:;"> + 添加模块</a></i>
</#macro>
<#if layouts??>
<#list layouts as layout>
	<#if 'grid-m'==layout.layout>
		<div class="layout grid-m ks-clear" data-id="${layout.id}">
			<div class="clear ks-clear">
				<div class="col-main">
					<div class="main-wrap J_TRegion" data-id="${layout.main.id}">
						<@pageLayout modules=layout.main.modules></@pageLayout>
					</div>
				</div>
			</div>
		</div>
	<#elseif 'grid-s5m0'==layout.layout>
		<div class="layout grid-s5m0 ks-clear" data-id="${layout.id}">
			<div class="clear ks-clear">
				<div class="col-main">
					<div class="main-wrap J_TRegion" data-id="${layout.main.id}">
						<@pageLayout modules=layout.main.modules></@pageLayout>
					</div>
				</div>
				<div class="col-sub J_TRegion" data-id="${layout.sub.id}">
					<@pageLayout modules=layout.sub.modules></@pageLayout>
				</div>
			</div>
		</div>
	<#elseif 'grid-m0s5'==layout.layout>
		<div class="layout grid-m0s5 ks-clear" data-id="${layout.id}">
			<div class="clear ks-clear">
				<div class="col-main">
					<div class="main-wrap J_TRegion" data-id="${layout.main.id}">
						<@pageLayout modules=layout.main.modules></@pageLayout>
					</div>
				</div>
				<div class="col-sub J_TRegion" data-id="${layout.sub.id}">
					<@pageLayout modules=layout.sub.modules></@pageLayout>
				</div>
			</div>
		</div>
	<#elseif 'grid-s5m0e5'==layout.layout>
		<div class="layout grid-s5m0e5 ks-clear" data-id="${layout.id}">
			<div class="clear ks-clear">
				<div class="col-main">
					<div class="main-wrap J_TRegion" data-id="${layout.main.id}">
						<@pageLayout modules=layout.main.modules></@pageLayout>
					</div>
				</div>
				<div class="col-sub J_TRegion" data-id="${layout.sub.id}">
					<@pageLayout modules=layout.sub.modules></@pageLayout>
				</div>
				<div class="col-extra J_TRegion" data-id="${layout.extra.id}">
					<@pageLayout modules=layout.extra.modules></@pageLayout>
				</div>
			</div>
		</div>
	<#elseif 'grid-m0s5e5'==layout.layout>
		<div class="layout grid-m0s5e5 ks-clear" data-id="${layout.id}">
			<div class="clear ks-clear">
				<div class="col-main">
					<div class="main-wrap J_TRegion" data-id="${layout.main.id}">
						<@pageLayout modules=layout.main.modules></@pageLayout>
					</div>
				</div>
				<div class="col-sub J_TRegion" data-id="${layout.sub.id}">
					<@pageLayout modules=layout.sub.modules></@pageLayout>
				</div>
				<div class="col-extra J_TRegion" data-id="${layout.extra.id}">
					<@pageLayout modules=layout.extra.modules></@pageLayout>
				</div>
			</div>
		</div>
	<#elseif 'grid-s5e5m0'==layout.layout>
		<div class="layout grid-s5e5m0 ks-clear" data-id="${layout.id}">
			<div class="clear ks-clear">
				<div class="col-main">
					<div class="main-wrap J_TRegion" data-id="${layout.main.id}">
						<@pageLayout modules=layout.main.modules></@pageLayout>
					</div>
				</div>
				<div class="col-sub J_TRegion" data-id="${layout.sub.id}">
					<@pageLayout modules=layout.sub.modules></@pageLayout>
				</div>
				<div class="col-extra J_TRegion" data-id="${layout.extra.id}">
					<@pageLayout modules=layout.extra.modules></@pageLayout>
				</div>
			</div>
		</div>
	<#elseif 'grid-s310m0e310'==layout.layout>
		<div class="layout grid-s310m0e310 ks-clear" data-id="${layout.id}">
			<div class="clear ks-clear">
				<div class="col-main">
					<div class="main-wrap J_TRegion" data-id="${layout.main.id}">
						<@pageLayout modules=layout.main.modules></@pageLayout>
					</div>
				</div>
				<div class="col-sub J_TRegion" data-id="${layout.sub.id}">
					<@pageLayout modules=layout.sub.modules></@pageLayout>
				</div>
				<div class="col-extra J_TRegion" data-id="${layout.extra.id}">
					<@pageLayout modules=layout.extra.modules></@pageLayout>
				</div>
			</div>
		</div>	
	</#if>
</#list>
</#if>