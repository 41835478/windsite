<?php $nums = F('user_item.getPreYingxiaoNums');?>
<style>
#J_Appstore .yes,#J_Appstore .no{display:block;width:13px;height:13px;text-indent:-9999px;overflow:hidden;background:url(http://static.xintaowang.com/css/default/xintao/bg-yes.gif) no-repeat;}#J_Appstore .no{background:url(http://static.xintaowang.com/css/default/xintao/bg-no.gif) no-repeat;}
</style>
<table id="J_Appstore" name="J_Appstore" class="table" cellpadding="0" cellspacing="0" width="100%" border="0">
	<colgroup>
			<col style="width:200px;*width:190px;"/>
            <!--<col style="width:200px;*width:190px;"/>-->
            <col style="width:120px;*width:100px;"/>
            <col style="width:210px;*width:200px;"/>
            <col/>
	</colgroup>
	<thead class="tb-tit-bg">
        <tr>
            <th><div class="th-gap">功能/版本</div></th>
            <th><div class="th-gap">免费</div></th>
            <!--<th><div class="th-gap">营销服务</div></th>-->
            <th><div class="th-gap">淘客服务</div></th>
            <th><div class="th-gap">卖家服务</div></th>
        </tr>
    </thead>
    <tbody>
    	<tr>
    		<td>适用对象</td>
    		<td>所有</td>
    		<td>淘宝客(赚佣金)</td>
    		<td>淘宝卖家(1.推广自己，2.赚佣金)</td>
    	</tr>
    	<tr>
    		<td>支持平台</td>
    		<td>新浪，腾讯微博</td>
    		<td>新浪，腾讯，搜狐，网易微博</td>
    		<td>新浪，腾讯，搜狐，网易微博</td>
    	</tr>
    	<tr>
    		<td>自动营销【<a style="color:#0072C1;font-weight:bold;" target="_blank" href="http://img04.taobaocdn.com/imgextra/i4/71614142/T2d3V.Xl8aXXXXXXXX_!!71614142.png">笑话</a>,<a style="color:#0072C1;font-weight:bold;" target="_blank" href="http://img01.taobaocdn.com/imgextra/i1/71614142/T2txB.XmJXXXXXXXXX_!!71614142.png">画报</a>,<a style="color:#0072C1;font-weight:bold;" target="_blank" href="http://img04.taobaocdn.com/imgextra/i4/71614142/T2phB.XmXXXXXXXXXX_!!71614142.png">影视</a>】</td>
    		<td><strong style="color:red;font-size:18px;">10x2</strong>条/天</td>
    		<td><strong style="color:red;font-size:18px;">40x4</strong>条/天</td>
    		<td><strong style="color:red;font-size:18px;">40x4</strong>条/天</td>
    	</tr>
    	<tr>
    		<td>　店铺营销【<a style="color:#0072C1;font-weight:bold;" target="_blank" href="http://img04.taobaocdn.com/imgextra/i4/71614142/T2m9mXXXpXXXXXXXXX_!!71614142.png">演示</a>,<a style="color:#0072C1;font-weight:bold;" target="_blank" href="http://img02.taobaocdn.com/imgextra/i2/71614142/T28GObXf4aXXXXXXXX_!!71614142.png">微博演示</a>】</td>
    		<td><strong style="color:red;font-size:18px;">1x2</strong>条/天</td>
    		<td>><strong style="color:red;font-size:18px;">2x4</strong>条/天</td>
    		<td>><strong style="color:red;font-size:18px;">2x4</strong>条/天,淘客帮助推广><strong style="color:red;font-size:18px;"><?php echo $nums['shop']?>x4</strong>条/天</td>
    	</tr>
    	<tr>
    		<td>　商品营销【<a style="color:#0072C1;font-weight:bold;" target="_blank" href="http://img04.taobaocdn.com/imgextra/i4/71614142/T2eMmaXbXXXXXXXXXX_!!71614142.png">演示</a>,<a style="color:#0072C1;font-weight:bold;" target="_blank" href="http://img01.taobaocdn.com/imgextra/i1/71614142/T2iGubXXFbXXXXXXXX_!!71614142.png">微博演示</a>】</td>
    		<td><strong style="color:red;font-size:18px;">6x2</strong>条/天</td>
    		<td>><strong style="color:red;font-size:18px;">10x4</strong>条/天</td>
    		<td>><strong style="color:red;font-size:18px;">10x4</strong>条/天,淘客帮助推广><strong style="color:red;font-size:18px;"><?php echo $nums['item']?>x4</strong>条/天</td>
    	</tr>
    	<tr>
    		<td>　淘客商品营销【自由推广】</td>
    		<td><strong style="color:red;font-size:18px;">2x2</strong>条/天</td>
    		<td><strong style="color:red;font-size:18px;">10x4</strong>条/天</td>
    		<td><strong style="color:red;font-size:18px;">10x4</strong>条/天</td>
    	</tr>
    	<tr>
    		<td>卖家推广【<a style="color:#0072C1;font-weight:bold;" target="_blank" href="http://img01.taobaocdn.com/imgextra/i1/71614142/T2XklAXmJMXXXXXXXX_!!71614142.png?v=1">演示</a>】</td>
    		<td><span class="no">no</span></td>
    		<td><span class="no">no</span></td>
    		<td><span class="yes">yes</span></td>
    	</tr>
    	<tr>
    		<td>集成淘宝店铺【<a href="http://t.xintaowang.com/products" target="_blank" style="color:#0072C1;font-weight:bold;">演示</a>】</td>
    		<td><span class="no">no</span></td>
    		<td><span class="no">no</span></td>
    		<td><span class="yes">yes</span></td>
    	</tr>
    	<tr>
    		<td>集成微博系统【<a href="http://t.xintaowang.com/pub" target="_blank" style="color:#0072C1;font-weight:bold;">演示</a>】</td>
    		<td><span class="no">no</span></td>
    		<td><span class="yes">yes</span></td>
    		<td><span class="yes">yes</span></td>
    	</tr>
    	<tr>
    		<td>集成会员分享【<a href="http://t.xintaowang.com/wow" target="_blank" style="color:#0072C1;font-weight:bold;">演示</a>】</td>
    		<td><span class="no">no</span></td>
    		<td><span class="yes">yes</span></td>
    		<td><span class="yes">yes</span></td>
    	</tr>
    	<tr>
    		<td>集成商品推广【<a href="http://taoke.xintaowang.com/items" target="_blank" style="color:#0072C1;font-weight:bold;">演示</a>】</td>
    		<td><span class="no">no</span></td>
    		<td><span class="yes">yes</span></td>
    		<td><span class="yes">yes</span></td>
    	</tr>
    	<tr>
    		<td>集成店铺推广</td>
    		<td><span class="no">no</span></td>
    		<td><span class="yes">yes</span></td>
    		<td><span class="yes">yes</span></td>
    	</tr>
    	<tr>
    		<td>集成画报推广【<a href="http://taoke.xintaowang.com/posters" target="_blank" style="color:#0072C1;font-weight:bold;">演示</a>】</td>
    		<td><span class="no">no</span></td>
    		<td><span class="yes">yes</span></td>
    		<td><span class="yes">yes</span></td>
    	</tr>
    	<tr>
    		<td>集成影视频道【<a href="http://taoke.xintaowang.com/tv.search" target="_blank" style="color:#0072C1;font-weight:bold;">演示</a>】</td>
    		<td><span class="no">no</span></td>
    		<td><span class="yes">yes</span></td>
    		<td><span class="yes">yes</span></td>
    	</tr>
    	<tr>
    		<td>支持域名绑定</td>
    		<td><span class="no">no</span></td>
    		<td><span class="yes">yes</span></td>
    		<td><span class="yes">yes</span></td>
    	</tr>
    	<tr>
    		<td>收费详情</td>
    		<td></td>
    		<td>
    			<ul id="J_Appstore_Taoke">
    				<li><strong style="font-size:16px;color: #A10000;">六折优惠中！</strong></li>
    				<li><label><input type="radio" name="appstore_taoke" value="1">现价：<span style="font-size:16px;color: #A10000;font-weight: bold;margin-right:4px;">15</span>原价：<em style="TEXT-DECORATION: line-through;">25</em>元/月</label></li>
    				<li><label><input type="radio" name="appstore_taoke" value="3" checked>现价：<span style="font-size:16px;color: #A10000;font-weight: bold;margin-right:4px;">39</span>原价：<em style="TEXT-DECORATION: line-through;">65</em>元/季</label></li>
    				<li><label><input type="radio" name="appstore_taoke" value="6">现价：<span style="font-size:16px;color: #A10000;font-weight: bold;margin-right:4px;">72</span>原价：<em style="TEXT-DECORATION: line-through;">120</em>元/半年</label></li>
    				<li><label><input type="radio" name="appstore_taoke" value="12">现价：<span style="font-size:16px;color: #A10000;font-weight: bold;margin-right:4px;">120</span>原价：<em style="TEXT-DECORATION: line-through;">200</em>元/年</label></li>
    			</ul>
    			<?php


if (F('xintao.check_appstore', explode(',', XT_APPSTORE_TAOKE)) && XT_FREE_DATELINE == '') {
	echo '<a id="J_Appstore_Taoke_Buy" data-href="http://fuwu.taobao.com/item/subsc.htm?items=ts-14975-5:3" target="_blank" href="javascript:vold(0);" class="btn-charge" style="display:block;background:url(http://img04.taobaocdn.com/tps/i4/T1SVipXelhXXXXXXXX-161-153.png) no-repeat scroll 0 0;margin: 6px 10px 0 0;width: 79px;height: 22px;text-indent: -9999px;overflow: hidden;background-position: 0 -92px;">续订</a>';
}
elseif (XT_IS_TAOKE == 'true' && XT_FREE_DATELINE == '') {
	echo '卖家服务已包含';
} else {
?>
    			<a id="J_Appstore_Taoke_Buy" data-href="http://fuwu.taobao.com/item/subsc.htm?items=ts-14975-5:3" target="_blank" href="javascript:vold(0);" class="btn-ordernow" style="display:block;background:url(http://img04.taobaocdn.com/tps/i4/T1SVipXelhXXXXXXXX-161-153.png) no-repeat scroll 0 0;margin-right: 10px;width: 161px;height: 35px;text-indent: -9999px;overflow: hidden;vertical-align: middle;background-position: 0 0;"><span>立即订购</span></a>
    			<?php } ?>
			</td>
    		<td>
    			<ul id="J_Appstore_Seller">
    				<li><strong style="font-size:16px;color: #A10000;">六折优惠中！</strong></li>
    				<li><label><input type="radio" name="appstore_seller" value="1">现价：<span style="font-size:16px;color: #A10000;font-weight: bold;margin-right:4px;margin-right:4px;">30</span>原价：<em style="TEXT-DECORATION: line-through;">50</em>元/月</label></li>
    				<li><label><input type="radio" name="appstore_seller" value="3" checked>现价：<span style="font-size:16px;color: #A10000;font-weight: bold;margin-right:4px;">78</span>原价：<em style="TEXT-DECORATION: line-through;">130</em>元/季</label></li>
    				<li><label><input type="radio" name="appstore_seller" value="6">现价：<span style="font-size:16px;color: #A10000;font-weight: bold;margin-right:4px;">144</span>原价：<em style="TEXT-DECORATION: line-through;">240</em>元/半年</label></li>
    				<li><label><input type="radio" name="appstore_seller" value="12">现价：<span style="font-size:16px;color: #A10000;font-weight: bold;margin-right:4px;">270</span>原价：<em style="TEXT-DECORATION: line-through;">450</em>元/年</label></li>
    			</ul>
    			<?php


	if (XT_IS_MULTI == 'true' && XT_FREE_DATELINE == '') {
		echo '<a id="J_Appstore_Seller_Buy" target="_blank" href="http://fuwu.taobao.com/item/subsc.htm?items=ts-14975-4:3" class="btn-charge" style="display:block;background:url(http://img04.taobaocdn.com/tps/i4/T1SVipXelhXXXXXXXX-161-153.png) no-repeat scroll 0 0;margin: 6px 10px 0 0;width: 79px;height: 22px;text-indent: -9999px;overflow: hidden;background-position: 0 -92px;">续订</a>';
	} else {
?>
    			<a id="J_Appstore_Seller_Buy" target="_blank" href="http://fuwu.taobao.com/item/subsc.htm?items=ts-14975-4:3" class="btn-ordernow" style="display:block;background:url(http://img04.taobaocdn.com/tps/i4/T1SVipXelhXXXXXXXX-161-153.png) no-repeat scroll 0 0;margin-right: 10px;width: 161px;height: 35px;text-indent: -9999px;overflow: hidden;vertical-align: middle;background-position: 0 0;"><span>立即订购</span></a>
    			<?php } ?>
    		</td>
    	</tr>
    </tbody>
</table>
<script>
$(function(){
	$('#J_Appstore_Seller input[type="radio"]').change(function(){
		$('#J_Appstore_Seller_Buy').attr('href','http://fuwu.taobao.com/item/subsc.htm?items=ts-14975-4:'+$(this).val());
	});
	$('#J_Appstore_Taoke input[type="radio"]').change(function(){
		$('#J_Appstore_Taoke_Buy').attr('data-href','http://fuwu.taobao.com/item/subsc.htm?items=ts-14975-5:'+$(this).val());
	});
	var taokeWin;
	$('#J_Appstore_Taoke_Buy').click(function(){
		Xwb.ui.MsgBox.confirm('您确定要订购淘客服务？',
			'<strong style="color:red;">淘客服务针对淘宝客用户，可赚取推广佣金，不会对自己店铺的商品进行营销！</strong>', function(id) {
				if (id == 'ok') {
					window.open($('#J_Appstore_Taoke_Buy').attr('data-href'), 'taokeWin', "resizable=1,location=0,status=0,scrollbars=0,width=670,height=660");
				}
			});	
	});
	
});
</script>