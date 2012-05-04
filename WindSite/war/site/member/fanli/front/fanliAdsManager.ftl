<@p.pageMemberHeader>
<meta name="keywords" content="会员中心">
<meta name="description" content="会员中心">
<title>我的推广- ${sitetitle}</title>
</@p.pageMemberHeader>
<script>$(function(){initFanliSiteAds('${q}');});</script>
<div class="layout grid-m0 ks-clear"><div class="col-main"><div class="main-wrap J_TRegion"><dl id="position"><dt>找回订单</dt><dd> &gt; <span id="UserMap">找回商城订单</span></dd></dl></div></div></div>
<div class="layout grid-s5m0 ks-clear">
	<div class="col-main">
		<div class="main-wrap J_TRegion">
			<div class="box J_TBox ks-clear">
				<div class="shop-custome fanli-member-info">
					<div class="fanli-member-info-bd">
						<TABLE class="wTable" width=100%>
							<THEAD>
								<TR>
									<TH width=50px>ID</TH>
									<TH width=200px>用户名</TH>
									<TH width=150px>注册时间</TH>
									<TH width=150px>最近登录</TH>
									<TH width=80px>登录次数</TH>
									<TH>操作</TH>
								</TR>
							</THEAD>
							<TBODY id="membersSearchResult">
							</TBODY>
						</TABLE>
						<#assign commission=0>
						<#if member.commissionRate><#assign commission=member.adCommissionRate><#else><#assign commission=siteCommission.adCommissionRate></#if>
						<@ws.help>
						<span style="color: #F60;">提醒:</span>&nbsp;&nbsp;您目前的推广返利比例为&nbsp;<strong style="color:red;">${commission}</strong>%。推广链接为<input id="adsLink" style="width:400px;padding:2px;" value="http://${www}/router/fanli/registe?id=${member.id}">
						<h3>1.什么是我的推广？</h3>
						<p>我的推广是本站为广大会员提供的推广返利功能。通过复制您的推广链接，邀请他人注册本站，只要他通过您的推广链接注册了本站，今后只要他通过本站购物，您将一直获得&nbsp;<strong style="color:red;">${commission}</strong>%&nbsp;的返利</p>
						</@ws.help>
					</div>
				</div>
			</div>			
		</div>
	</div>
	<div class="col-sub J_TRegion">
		<@p.pageMemberSideMenu></@p.pageMemberSideMenu>
	</div>
</div>
<@p.pageFooter>
</@p.pageFooter>
			