<@p.pageMemberHeader>
<meta name="keywords" content="会员中心">
<meta name="description" content="会员中心">
<title>我的淘宝交易- ${sitetitle}</title>
</@p.pageMemberHeader>
<script>$(function(){initTaobaoFanliSiteReport();});</script>
<div class="layout grid-m0 ks-clear"><div class="col-main"><div class="main-wrap J_TRegion"><dl id="position"><dt>交易管理</dt><dd> &gt; <span id="UserMap">我的淘宝交易</span></dd></dl></div></div></div>
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
							<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="btn btn-ok" id="searchReportButton"><input type="button" value="查询"></span></td>
							</tr>
						</table>
						<TABLE class="wTable" border="0" cellspacing="1" cellpadding="1">
							<THEAD><TR><TH width=120px>淘宝交易号</TH><TH width=300px>商品名称</TH><TH width=60px>单价</TH><TH width=40px>数量</TH><TH width=150px>返利(集分宝)</TH><TH>交易时间</TH></TR></THEAD>
							<TBODY id="reportTaobaoSearchResult"></TBODY>
						</TABLE>
						<@ws.help>
						<h3>1.什么是集分宝？</h3>
						<p><a href="http://help.alipay.com/lab/help_detail.htm?help_id=211849" target="_blank">支付宝集分宝介绍</a>,100集分宝=1元</p>
						<h3>2.什么情况下会产生交易记录？</h3>
						<p>当您以正常的返利流程完成购物，并且确认收货后，将同时产生交易记录和对应的返利记录。如果您发现交易记录和返利记录出现问题，您可以联系我们的客服</p>
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
			