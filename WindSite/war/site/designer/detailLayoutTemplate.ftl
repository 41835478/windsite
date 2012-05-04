<#if layout??>
	<div class="layout ${layout.layout} ks-clear">
		<div class="col-main">
			<div class="main-wrap J_TRegion" data-edit="false">
				<!--<div class="switch-bar"><a href="#" style="height: 501px; "><span>点此展开/折叠侧栏</span></a></div>-->
				<#include "/site/designer/template/itemDetailTemplate.ftl">
				<div name="shopCustom" class="box J_TBox ks-clear">
					<div class="shop-custom no-border">
						<div class="hd"><h3><span>宝贝详情</span></h3></div>
						<div class="bd">
							<div id="J_ItemDetail" class="ks-post custom-area" style="padding-top:10px;">${item.desc}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-sub J_TRegion" data-id="${layout.sub.id}"></div>
	</div>
</#if>