<div class="box" style="padding-left:0px;margin-bottom:5px">
	<?php TPL :: module('xintao/yingxiao');?>
</div>
<table id="J_Appstore" name="J_Appstore" class="table" cellpadding="0" cellspacing="0" width="100%" border="0">
	<colgroup>
			<col style="width:100px;*width:60px;"/>
            <col/>
            <?php if(!isset($noBuy)){?>
            <col style="width:200px;*width:190px;"/>
            <col style="width:200px;*width:180px;"/>
            <?php }?>
	</colgroup>
    <tbody>
    	<tr>
    		<td>免费服务</td>
    		<td>
    			<ul>
    				<li>1.自动营销：<strong style="font-size:18px;color:red;">44</strong>个内容分类每日自动发布营销微博（免费版每日<strong style="font-size:18px;color:red;">1</strong>个，卖家/淘客服务<strong style="font-size:18px;color:red;">10</strong>个）</li>
    			</ul>
    		</td>
    		 <?php if(!isset($noBuy)){?>
    		<td><label>免费</label></td>
    		<td></td>
    		<?php }?>
    	</tr>
    	<tr>
    		<td>卖家服务<br/><a href="http://t.xintaowang.com" target="_blank" style="text-decoration: underline;font-weight:bold;font-size:14px;color:red;">查看演示</a><br/><a style="text-decoration: none;">(非本店铺商品，自动转换为您的淘宝客推广获得佣金)</a></td>
    		<td>
    			<ul>
    				<li>1.集成淘宝店铺(<a href="http://t.xintaowang.com/products" target="_blank" style="color:#0072C1;font-weight:bold;">演示</a>)：<strong style="font-size:18px;color:red;">独立网店</strong>(含微博系统)，与淘宝互通，商品，店铺收藏直达淘宝</li>
    				<li>2.集成自动营销：44个分类内容(可做<strong style="font-size:18px;color:red;">淘宝客推广</strong>)，丰富您的微博，吸引粉丝关注</li>
    				<li>3.集成店铺营销(<a href="http://img02.taobaocdn.com/imgextra/i2/71614142/T28GObXf4aXXXXXXXX_!!71614142.png" target="_blank" style="color:#0072C1;font-weight:bold;">演示</a>)：每天除自己以外，微购淘宝客会员帮您发布<strong style="font-size:18px;color:red;">店铺</strong>营销微博</li>
    				<li>4.集成商品营销(<a href="http://img01.taobaocdn.com/imgextra/i1/71614142/T2iGubXXFbXXXXXXXX_!!71614142.png" target="_blank" style="color:#0072C1;font-weight:bold;">演示</a>)：每天除自己以外，微购淘宝客会员帮您发布<strong style="font-size:18px;color:red;">商品</strong>营销微博</li>
    				<li>5.集成淘客服务(<a href="http://t.xintaowang.com/items" target="_blank" style="color:#0072C1;font-weight:bold;">演示</a>)：含<strong style="font-size:18px;color:red;">淘客服务</strong><?php
$result = F('xintao.getTaokeSites');
if ($result) {
	if (isset ($result['count']) && $result['count'] != 0) {
		echo '，将<strong style="font-size:18px;color:red;">店铺，商品</strong>投放至<strong style="font-size:18px;color:red;">' . $result['count'] . '</strong>个淘客推广站点';
	}
}
?></li><li>6.支持域名绑定：您可以绑定自己的<strong style="font-size:18px;color:red;">独立域名</strong>（建议绑定您淘宝店铺独立域名的二级域名）</li>
    			</ul>
    		</td>
    		<?php if(!isset($noBuy)){?>
    		<td>
    			<ul id="J_Appstore_Seller">
    				<li><strong style="font-size:16px;color: #A10000;">六折优惠中！</strong></li>
    				<li><label><input type="radio" name="appstore_seller" value="1">现价：<span style="font-size:16px;color: #A10000;font-weight: bold;margin-right:4px;margin-right:4px;">30</span>原价：<em style="TEXT-DECORATION: line-through;">50</em>元/月</label></li>
    				<li><label><input type="radio" name="appstore_seller" value="3" checked>现价：<span style="font-size:16px;color: #A10000;font-weight: bold;margin-right:4px;">78</span>原价：<em style="TEXT-DECORATION: line-through;">130</em>元/季</label></li>
    				<li><label><input type="radio" name="appstore_seller" value="6">现价：<span style="font-size:16px;color: #A10000;font-weight: bold;margin-right:4px;">144</span>原价：<em style="TEXT-DECORATION: line-through;">240</em>元/半年</label></li>
    				<li><label><input type="radio" name="appstore_seller" value="12">现价：<span style="font-size:16px;color: #A10000;font-weight: bold;margin-right:4px;">270</span>原价：<em style="TEXT-DECORATION: line-through;">450</em>元/年</label></li>
    			</ul>
    		</td>
    		<td>
    			<?php

if (XT_IS_MULTI == 'true' && XT_FREE_DATELINE == '') {
	echo '<a id="J_Appstore_Seller_Buy" target="_blank" href="http://fuwu.taobao.com/item/subsc.htm?items=ts-14975-4:3" class="btn-charge" style="display:block;background:url(http://img04.taobaocdn.com/tps/i4/T1SVipXelhXXXXXXXX-161-153.png) no-repeat scroll 0 0;margin: 6px 10px 0 0;width: 79px;height: 22px;text-indent: -9999px;overflow: hidden;background-position: 0 -92px;">续订</a>';
} else {
?>
    			<a id="J_Appstore_Seller_Buy" target="_blank" href="http://fuwu.taobao.com/item/subsc.htm?items=ts-14975-4:3" class="btn-ordernow" style="display:block;background:url(http://img04.taobaocdn.com/tps/i4/T1SVipXelhXXXXXXXX-161-153.png) no-repeat scroll 0 0;margin-right: 10px;width: 161px;height: 35px;text-indent: -9999px;overflow: hidden;vertical-align: middle;background-position: 0 0;"><span>立即订购</span></a>
    			<?php } ?>
    		</td>
    		<?php }?>
    	</tr>
    	<tr>
    		<td>淘客服务<br/><a href="http://taoke.xintaowang.com" target="_blank" style="text-decoration: underline;font-weight:bold;font-size:14px;color:red;">查看演示</a></td>
    		<td>
    			<ul>
    				<li>1.集成微博系统(<a href="http://taoke.xintaowang.com/pub" target="_blank" style="color:#0072C1;font-weight:bold;">演示</a>)：粉丝自动关注，一键店铺，商品微博配图发布</li>
    				<li>2.集成商品推广(<a href="http://taoke.xintaowang.com/items" target="_blank" style="color:#0072C1;font-weight:bold;">演示</a>)：提供淘宝全网淘宝客商品推广赚取佣金，收入归自己所有</li>
    				<li>3.集成店铺推广：提供淘宝全网淘宝客店铺推广赚取佣金，收入归自己所有</li>
    				<li>4.集成画报推广(<a href="http://taoke.xintaowang.com/posters" target="_blank" style="color:#0072C1;font-weight:bold;">演示</a>)：提供淘宝全网淘画报推广赚取佣金，收入归自己所有</li>
    				<li>5.集成影视频道(<a href="http://taoke.xintaowang.com/tv.search" target="_blank" style="color:#0072C1;font-weight:bold;">演示</a>)：正版高清电影，电视剧，综艺，播客等频道</li>
    				<li>6.支持域名绑定：您可以绑定自己的一级，二级等独立域名做推广</li>
    				<li>7.集成SEO优化  ：淘宝商品，店铺推广链接，图片链接加密提高搜索引擎收录</li>
    			</ul>
    		</td>
    		<?php if(!isset($noBuy)){?>
    		<td>
    			<ul id="J_Appstore_Taoke">
    				<li><strong style="font-size:16px;color: #A10000;">六折优惠中！</strong></li>
    				<li><label><input type="radio" name="appstore_taoke" value="1">现价：<span style="font-size:16px;color: #A10000;font-weight: bold;margin-right:4px;">15</span>原价：<em style="TEXT-DECORATION: line-through;">25</em>元/月</label></li>
    				<li><label><input type="radio" name="appstore_taoke" value="3" checked>现价：<span style="font-size:16px;color: #A10000;font-weight: bold;margin-right:4px;">39</span>原价：<em style="TEXT-DECORATION: line-through;">65</em>元/季</label></li>
    				<li><label><input type="radio" name="appstore_taoke" value="6">现价：<span style="font-size:16px;color: #A10000;font-weight: bold;margin-right:4px;">72</span>原价：<em style="TEXT-DECORATION: line-through;">120</em>元/半年</label></li>
    				<li><label><input type="radio" name="appstore_taoke" value="12">现价：<span style="font-size:16px;color: #A10000;font-weight: bold;margin-right:4px;">120</span>原价：<em style="TEXT-DECORATION: line-through;">200</em>元/年</label></li>
    			</ul>
    		</td>
    		<td>
    			<?php

	if (F('xintao.check_appstore', explode(',', XT_APPSTORE_TAOKE)) && XT_FREE_DATELINE == '') {
		echo '<a id="J_Appstore_Taoke_Buy" target="_blank" href="http://fuwu.taobao.com/item/subsc.htm?items=ts-14975-5:3" class="btn-charge" style="display:block;background:url(http://img04.taobaocdn.com/tps/i4/T1SVipXelhXXXXXXXX-161-153.png) no-repeat scroll 0 0;margin: 6px 10px 0 0;width: 79px;height: 22px;text-indent: -9999px;overflow: hidden;background-position: 0 -92px;">续订</a>';
	}
	elseif (XT_IS_TAOKE == 'true' && XT_FREE_DATELINE == '') {
		echo '卖家服务已包含';
	} else {
?>
    			<a id="J_Appstore_Taoke_Buy" target="_blank" href="http://fuwu.taobao.com/item/subsc.htm?items=ts-14975-5:3" class="btn-ordernow" style="display:block;background:url(http://img04.taobaocdn.com/tps/i4/T1SVipXelhXXXXXXXX-161-153.png) no-repeat scroll 0 0;margin-right: 10px;width: 161px;height: 35px;text-indent: -9999px;overflow: hidden;vertical-align: middle;background-position: 0 0;"><span>立即订购</span></a>
    			<?php } ?>
    		</td>
    		<?php } ?>
    	</tr>
    </tbody>
</table>
<script>
$(function(){
	$('#J_Appstore_Seller input[type="radio"]').change(function(){
		$('#J_Appstore_Seller_Buy').attr('href','http://fuwu.taobao.com/item/subsc.htm?items=ts-14975-4:'+$(this).val());
	});
	$('#J_Appstore_Taoke input[type="radio"]').change(function(){
		$('#J_Appstore_Taoke_Buy').attr('href','http://fuwu.taobao.com/item/subsc.htm?items=ts-14975-5:'+$(this).val());
	});
	
});
</script>