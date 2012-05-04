<@p.pageMemberHeader>
<meta name="keywords" content="会员中心">
<meta name="description" content="会员中心">
<title>我的返利记录- ${sitetitle}</title>
</@p.pageMemberHeader>
<script>$(function(){initFanliSiteTrade();});</script>
<div class="layout grid-m0 ks-clear"><div class="col-main"><div class="main-wrap J_TRegion"><dl id="position"><dt>返利管理</dt><dd> &gt; <span id="UserMap">我的返利记录</span></dd></dl></div></div></div>
<div class="layout grid-s5m0 ks-clear">
	<div class="col-main">
		<div class="main-wrap J_TRegion">
			<div class="box J_TBox ks-clear">
				<div class="shop-custome fanli-member-info">
					<div class="fanli-member-info-bd">
						<ol class="step step-four"><li><span>1.登录返利网站</span></li><li><span>2.淘宝网交易</span></li><li class="current"><span>3.确认收货</span></li><li class="last"><span>返利</span></li></ol>
						<table>
							<tr>
							<td>查询时间：</td><td><input type="text" name="startDate" id="startDate" value="${startDate}" />&nbsp;&nbsp;至&nbsp;&nbsp;<input type="text" name="endDate" id="endDate" value="${endDate}"/></td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="btn btn-ok" id="searchTradeButton"><input type="button" value="查询"></span></td>
							</tr>
							<tr><td colspan=3>
							<#if status??&&''!=status>
							</#if>
							<table id="fanli-filter"><tr><td height=25px>返利类型：</td><td id="fanli-type-a"><a class="fanli-type<#if !type??||''==type||'-1'==type> selected</#if>" t="-1">全部</a>&nbsp;&nbsp;&nbsp;<a class="fanli-type<#if 'BUY'==type> selected</#if>" t="BUY">购买返利</a>&nbsp;&nbsp;&nbsp;<a class="fanli-type<#if 'ADS'==type> selected</#if>" t="ADS">推广返利</a></td></tr>
									<tr><td height=25px>返利状态：</td><td id="fanli-status-a"><a class="fanli-status<#if !status??||''==status||'-1'==status> selected</#if>" t="-1">全部</a>&nbsp;&nbsp;&nbsp;<a class="fanli-status<#if '0'==status> selected</#if>" t="0">等待站长支付返利</a>&nbsp;&nbsp;&nbsp;<a class="fanli-status<#if '1'==status> selected</#if>" t="1">等待会员确认收款</a>&nbsp;&nbsp;&nbsp;<a class="fanli-status<#if '2'==status> selected</#if>" t="2">已完成返利支付</a></td></tr></table>
							</td></tr>
						</table>
						<TABLE class="wTable" width=100%>
							<THEAD>
								<TR>
									<TH width=200px>商品名称|所属商城</TH>
									<TH width=80px>返利金额</TH>
									<TH width=80px>返利类型</TH>
									<TH width=150px>状态</TH>
									<TH width=120px>时间</TH>
									<TH>操作</TH>
								</TR>
							</THEAD>
							<TBODY id="tradeSearchResult">
							</TBODY>
						</TABLE>
						<@ws.help>
						<h3>1.返利状态----等待站长支付返利？</h3>
						<p>是指当前淘宝交易已经完成（即会员已经在淘宝确认收货）。</p>
						<h3>1.返利状态----等待会员确认收款？</h3>
						<p>是指本站已经将返利金额转账至您的支付宝帐号，此时需要等待当前您确认支付宝帐号已经收到了返利。</p>
						<h3>1.返利状态----已完成返利支付？</h3>
						<p>是指您已经确认了支付宝帐号已经收到了返利转账。此时整个购物返利流程完成</p>
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
			