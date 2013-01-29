<@p.pageMemberHeader>
<meta name="keywords" content="会员中心">
<meta name="description" content="会员中心">
<title>会员中心- ${sitetitle}</title>
</@p.pageMemberHeader>
<script>$(function(){initFanliSiteMember();});</script>
<div class="layout grid-m0 ks-clear"><div class="col-main"><div class="main-wrap J_TRegion"><dl id="position"><dt>帐户管理</dt><dd> &gt; <span id="UserMap">我的会员中心</span></dd></dl></div></div></div>
<div class="layout grid-s5m0 ks-clear">
	<div class="col-main">
		<div class="main-wrap J_TRegion">
			<div class="box J_TBox ks-clear">
				<div class="shop-custome fanli-member-info">
					<div class="fanli-member-info-bd">
						<#if siteCommission.bulletin??>
						<fieldset><legend>站点公告</legend>
						${siteCommission.bulletin}
						</fieldset>
						</#if>
						<fieldset><legend>基本信息</legend>
						<table width=100% class="wTable">
						<tr><td class="key">用户名:</td><td class="value">${member.info.username}【ID:${member.id}】</td><td class="key">支付宝:</td><td class="value">${member.info.alipay}</td><td class="key">电子邮箱:</td><td class="value">${member.info.email}</td></tr>
						<tr><td class="key">注册时间:</td><td class="value">${member.created?datetime}</td><td class="key">上次登录:</td><td class="value">${member.lastVisit?datetime}</td><td class="key">登录次数:</td><td class="value">${member.visits}</td></tr>
						<tr><td class="key">QQ:</td><td class="value">${member.info.qq}</td><td class="key">MSN:</td><td class="value">${member.info.msn}</td><td class="key">旺旺:</td><td class="value">${member.info.wangwang}</td></tr>
						<tr><td class="key">手机:</td><td class="value" style="width:auto;">${member.info.mobile}</td><!--<td class="key">购买返利比例:</td><td class="value" style="width:auto;"><#if member.commissionRate??>${member.commissionRate}<#else>${siteCommission.commissionRate}</#if>%</td>-->
						<#if siteCommission.adCommissionRate??&&''!=siteCommission.adCommissionRate&&(siteCommission.adCommissionRate>0)><td class="key">推广返利比例:</td><td class="value" style="width:auto;"><#if member.adCommissionRate??>${member.adCommissionRate}<#else>${siteCommission.adCommissionRate}</#if>%</td><#else><td></td><td></td></#if><td></td><td></td></tr>
						</table>
						</fieldset>
						<fieldset><legend>最新淘宝订单</legend>
						<TABLE width=100% class="wTable">
							<THEAD><TR><TH width=120px>淘宝交易号</TH><TH width=300px>商品名称</TH><TH width=60px>单价</TH><TH width=40px>数量</TH><TH width=150px>返利(集分宝)</TH><TH>交易时间</TH></TR></THEAD>
							<TBODY id="reportTaobaoSearchResult"></TBODY>
						</TABLE>
						</fieldset>
						<fieldset><legend>最新商城订单</legend>
						<TABLE width=100% class="wTable">
							<THEAD><TR><TH width=120px>商城订单编号</TH><TH width=180px>商城活动</TH><TH width=120px>商品编号</TH><TH width=60px>单价</TH><TH width=40px>数量</TH><TH width=80px>状态</TH><TH>下单时间</TH></TR></THEAD>
							<TBODY id="reportMallSearchResult"></TBODY>
						</TABLE>
						</fieldset>
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
			