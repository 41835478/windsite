<!--设计器工具条-->
<div id="ds-toolbar">
	<div class="clear">
		<div class="ds-logo menu-select"><a href="#"><span>新淘网淘站装修</span></a></div>
		<ul class="ds-nav">
			<li class="edit menu-select">
				<a href="http://design.taobao.com/shop/sup/designSuperShop.htm">编辑<i></i></a>
				<div class="menu-select-popup">
					<div class="wrap clear">
                        <div class="custom">
							<strong>自定义页面</strong>
                            <ul>
                            <#if pages??&&pages?size!=0><#list pages as p><li <#if p.id==page.id>class="selected"</#if>><a href="/router/member/page/<#if 'sys'==mode>sys</#if>designer/${p.id}">${p.title}</a></li></#list></#if></ul>
                         </div>
                          <div class="system">
							<strong>系统页面</strong>
                            <ul></ul>
                         </div>
						<p><a href="/router/member/page/manager">管理所有页面 »</a></p>
                    </div>
				</div>
			</li>
			<li><a href="/router/member/page/manager">页面</a></li>
			<#if page??><li><a href="/router/member/page/theme">模板</a></li></#if>
		</ul>
		<ul class="ds-confirm">
			<li class="nick">fxy060608, <a href="http://login.taobao.com/member/logout.jhtml">退出</a></li>
			<li class="release"><a href="#" id="J_TRelease">发布</a></li>
			<#if page??><li class="preview"><a href="/router/member/page/preview/${page.id}" target="_blank">预览</a></li></#if>
			<li class="myshop"><a href="http://store.taobao.com/shop/view_shop.htm?shop_id=64043441" target="_blank" title="查看我的店铺"><i></i></a></li>
			<li class="help"><a href="http://bbs.taobao.com/catalog/thread/510526-13939879.htm" target="_blank" title="帮助"><i></i></a></li>
			<#if page??><li class="layoutmgr"><a id="J_TLayoutMgr" href="/router/member/page/layout/manager/${page.id}"><i></i>布局管理</a></li></#if>
		</ul>
	</div>
	<div class="ds-msgs">
		<span id="J_DSMsg" class="txt" style="margin-top:0px;"></span>
	</div>
</div>