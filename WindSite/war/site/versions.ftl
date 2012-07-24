<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>版本说明-淘客建站-我是淘客-新淘网</title>
</@ws.header>
<script>
$(function(){
});
</script>
<style>
.order-table{border:1px solid #e1e1e1;border-bottom:none;border-collapse:collapse;margin:0;table-layout: fixed;width:100%;}
.order-table th{background:#3d3d3d url(http://static.xintaonet.com/assets/images/version/bg-th.gif) repeat-x;color:#fff;padding:5px;}
.order-table th.active{background:#51732b url(http://static.xintaonet.com/assets/images/version/images/bg-th-active.gif) repeat-x;}
.order-table .features{text-align:left;}
.order-table .starter{width:100px;}
.order-table .standard{width:100px;}
.order-table .medium{width:100px;}
.order-table .large{width:100px;}
.order-table .ultra{width:100px;}
.order-table td{padding:10px;text-align:center;border-bottom:1px solid #e1e1e1;}
.order-table td.features{text-align:left;padding-left:15px;text-decoration:underline;}
.order-table .odd td{background:url(http://static.xintaonet.com/assets/images/version/bg-td.png) repeat-x 0 100%;}
.order-table .yes,.order-table .no{display:block;width:13px;height:13px;text-indent:-9999px;overflow:hidden;margin:0 auto;background:url(http://static.xintaonet.com/assets/images/version/bg-yes.gif) no-repeat;}.order-table .no{background:url(http://static.xintaonet.com/assets/images/version/bg-no.gif) no-repeat;}.order-table strong{font-size:14px;color:#3d3d3d;}.order-table .action{color:#2d6200;}.order-table .pay{color:red;}.order-table .description{background:#eff5e9;}.order-version{color:red;font-weight:bold;font-size:14px;padding:5px 0px;}
</style>
<@xt.taoketemplate navselected='taoke' bdselected='site-versions'>
<#assign version='starter' versionDesc='普及版'>
<#if USER??>
<#if USER.usb??&&(USER.usb.versionNo==1.5)>
<#assign version='standard' versionDesc='分成版(分成型)'>
<#elseif USER.usb??&&(USER.usb.versionNo==2)>
<#assign version='medium' versionDesc='返利版(月租型)'>
<#elseif USER.usb??&&(USER.usb.versionNo==3)>
<#assign version='large' versionDesc='卖家版'>
</#if>
</#if>
<#if USER.usb??>
<#if 1==USER.usb.versionNo>
<#assign versionDesc='普及版（免费）'>
<#elseif 1.5==USER.usb.versionNo>
<#assign versionDesc='分成版'>
<#elseif 1.6==USER.usb.versionNo>
<#assign versionDesc='普及版（收费）'>
<#elseif 2==USER.usb.versionNo>
<#assign versionDesc='返利版'>
<#elseif 3==USER.usb.versionNo>
<#assign versionDesc='卖家版'>
</#if>
</#if>
<@ws.info>
<span>
您当前使用版本为<strong style='color:red;font-weight:bold;font-size:14px;'>${versionDesc}</strong>，升级更高版本后，您需要重新登录才可以生效。<a href="http://forum.xintaonet.com/viewthread.php?tid=707&extra=page%3D1" style="color:red;font-weight:bold;" target="_blank">版本升级帮助</a>
</span>
</@ws.info>
<br/>
<table class="order-table">
		<thead>
			<tr>
				<th class="features" width=120>功能/资源</th>
				<th class="standard">分成版<br/>（未绑定域名）</th>
				<th class="starter">普及版<br/>（收费）</th>
				<th class="medium">返利版<br/>（月租型）<a href="http://www.lovezippo.com" target="_blank">演示站点</a></div></th>
				<th class="large">卖家版<br/>（月租型）</th>
			</tr>
		</thead>
		<tbody>
			<tr class="odd">
				<td class="features">淘客建站</td>
				<td class="active"><span class="yes">yes</span></td>
				<td><span class="yes">yes</span></td>
				<td><span class="yes">yes</span></td>
				<td><span class="yes">yes</span></td>
			</tr>
			<tr>
				<td colspan=5>
					<table class="order-table page-table">
						<tr><td class="features" width=120>个性化模板</td><td class="active" width=105><span class="yes">yes</span></td><td width=105><span class="yes">yes</span></td><td width=105><span class="yes">yes</span></td><td width=105><span class="yes">yes</span></td></tr>
						<tr><td class="features">自定义页面</td><td class="active"><strong>10</strong></td><td><strong>10</strong></td><td><strong>10</strong></td><td><strong>15</strong></td></tr>
						<tr><td class="features">布局容器</td><td class="active"><strong>5</strong></td><td><strong>5</strong></td><td><strong>5</strong></td><td><strong>5</strong></td></tr>
						<tr><td class="features">单页面模块</td><td class="active"><strong>30</strong></td><td><strong>30</strong></td><td><strong>30</strong></td><td><strong>30</strong></td></tr>
						<tr title="投放第三方广告联盟各种形式的广告，站长收入多样化"><td class="features" style="color:red;font-weight:bold;">广告代码投放</td><td><span class="no">no</span></td><td class="active"><span class="yes">yes</span></td><td><span class="yes">yes</span></td><td width=80><span class="yes">yes</span></td></tr>
						<tr title="系统每天按照站长设计的页面自动更新站内商品"><td class="features" style="color:#f60;font-weight:bold;">站点自动更新</td><td class="active"><span class="yes">yes</span></td><td><span class="yes">yes</span></td><td><span class="yes">yes</span></td><td width=80><span class="yes">yes</span></td></tr>
					</table>
				</td>
				
			</tr>
			<tr class="odd">
				<td class="features">淘客推广</td>
				<td class="active"><span class="yes">yes</span></td>
				<td><span class="yes">yes</span></td>
				<td><span class="yes">yes</span></td>
				<td><span class="yes">yes</span></td>
			</tr>
			<tr>
				<td class="features">推广统计</td>
				<td class="active"><span class="yes">yes</span></td>
				<td><span class="yes">yes</span></td>
				<td><span class="yes">yes</span></td>
				<td><span class="yes">yes</span></td>
			</tr>
			<tr class="odd">
				<td class="features">收入报表</td>
				<td class="active"><span class="yes">yes</span></td>
				<td><span class="yes">yes</span></td>
				<td><span class="yes">yes</span></td>
				<td><span class="yes">yes</span></td>
			</tr>
			<tr class="odd">
				<td class="features">导购画报</td>
				<td class="active"><span class="no">no</span></td>
				<td><span class="yes">yes</span></td>
				<td><span class="yes">yes</span></td>
				<td><span class="yes">yes</span></td>
			</tr>
			<tr class="odd">
				<td class="features">淘店铺</td>
				<td class="active"><span class="no">no</span></td>
				<td><span class="yes">yes</span></td>
				<td><span class="yes">yes</span></td>
				<td><span class="yes">yes</span></td>
			</tr>
			<tr>
				<td class="features">返利管理</td>
				<td><span class="no">no</span></td>
				<td><span class="no">no</span></td>
				<td><span class="yes">yes</span></td>
				<td><span class="yes">yes</span></td>
			</tr>
			<tr>
				<td class="features">找淘客</td>
				<td class="active"><span class="no">no</span></td>
				<td><span class="no">no</span></td>
				<td><span class="no">no</span></td>
				<td><span class="yes">yes</span></td>
			</tr>
			<tr class="odd">
				<td class="features">广告投放</td>
				<td class="active"><span class="no">no</span></td>
				<td><span class="no">no</span></td>
				<td><span class="no">no</span></td>
				<td><span class="yes">yes</span></td>
			</tr>
			<tr>
				<td class="features pay">按月付</td>
				<td class="active"><strong>0</strong></td>
				<td><strong class="action">15元</strong></td>
				<td><strong class="action">20元</strong></td>
				<td><strong class="action">25元</strong></td>
			</tr>
			<tr class="odd">
				<td class="features pay">按季度付</td>
				<td class="active"><strong>0</strong></td>
				<td><strong class="action">35元</strong></td>
				<td><strong class="action">45元</strong></td>
				<td><strong class="action">65元</strong></td>
			</tr>
			<tr class="odd">
				<td class="features pay">按半年付</td>
				<td class="active"><strong>0</strong></td>
				<td><strong class="action">60元</strong></td>
				<td><strong class="action">80元</strong></td>
				<td><strong class="action">120元</strong></td>
			</tr>
			<tr class="odd">
				<td class="features pay">按年付</td>
				<td class="active"><strong>0</strong></td>
				<td><strong class="action">100元</strong></td>
				<td><strong class="action">130元</strong></td>
				<td><strong class="action">200元</strong></td>
			</tr>
			<tr class="odd">
				<td class="features pay">新淘网分成</td>
				<td class="active"><strong>10%</strong></td>
				<td><strong class="action">0</strong></td>
				<td><strong class="action">0</strong></td>
				<td><strong class="action">0</strong></td>
			</tr>
		</tbody>
	</table>
</@xt.taoketemplate>
