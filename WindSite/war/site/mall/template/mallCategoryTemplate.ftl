<div class="layout grid-s5m0 ks-clear">
	<div class="col-main">
		<div class="main-wrap J_TRegion" id="J_YiqifaImgLazyLoad">
			<#if cats??&&cats?size!=0>
			<#list cats as c>
			<div id="J_Cat${c.id}" name="shopB2CMall"<#if c_index!=0> style="display:none;"</#if> class="box J_TBox ks-clear">
				<div class="shop-b2c-mall">
					<div class="hd"><h3><span><a name="b2c-cat-${c.id}">${c.title}</a></span></h3></div>
					<div class="bd" data-lazy="false">
						<#if c.malls??&&c.malls?size!=0>
						<ul>
						<#list c.malls as m>
						<#assign title=m.title?replace('CPS|ROI|CPA|CPC','','ir')>
						<li><a href="/ymall-${m.b2cId}.html" target="_blank"><img src="http://img02.taobaocdn.com/imgextra/i2/71614142/T2Hf0lXatMXXXXXXXX_!!71614142.gif" original="${m.logo}" width="120px" height="60px" alt="${title}" title="${title}"/></a><span class="b2c-fl">最高返利：<strong>${m.topRate}</strong></span></li>
						</#list>
						</ul>
						</#if>
					</div>
				</div>
			</div>
			</#list>
			</#if>
		</div>
	</div>
	<div class="col-sub J_TRegion">
		<div name="shopB2CCat" class="box J_TBox ks-clear">
			<div class="shop-b2c-cat no-border">
				<div class="hd" style="display:none;"><h3><span>商城分类</span></h3></div>
				<div class="bd">
					<div class="navList" id="J_NavList">
					<#if cats??&&cats?size!=0>
					<#list cats as c>
					<a cid="${c.id}" title="${c.title}">${c.title}</a>
					</#list>
					</#if>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div id="J_FocusBar" class="focusBar"></div>