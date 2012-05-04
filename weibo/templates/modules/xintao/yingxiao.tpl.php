<?php $nums = F('user_item.getPreYingxiaoNums');?>
<table class="table" cellpadding="0" cellspacing="0" width="100%" border="0">
	<colgroup>
			<col style="width:130px;"/>
            <col style="width:150px;*width:130px;"/>
            <col style="width:300px;*width:280px;"/>
            <col/>
	</colgroup>
	<thead class="tb-tit-bg">
        <tr>
            <th><div class="th-gap">营销(微博)/版本</div></th>
            <th><div class="th-gap">免费</div></th>
            <th><div class="th-gap">淘客服务(适合淘宝客：赚取佣金)<?php if(isset($isBuy)&&$isBuy){echo '<a href="#J_Appstore">订购</a>';}?></div></th>
            <th><div class="th-gap">卖家服务(适合淘宝卖家:推广店铺,<strong style="color:red;font-size:18px;">20倍</strong>营销增速)<?php if(isset($isBuy)&&$isBuy){echo '<a href="#J_Appstore">订购</a>';}?></div></th>
        </tr>
    </thead>
    <tbody>
    	<tr>
    		<td>自动营销（全自动）</td>
    		<td>自动发<strong style="color:red;font-size:18px;">8</strong>条/天</td>
    		<td>自动发<strong style="color:red;font-size:18px;">30x4</strong>条/天</td>
    		<td>自动发<strong style="color:red;font-size:18px;">30x4</strong>条/天</td>
    	</tr>
    	<tr>
    		<td>店铺营销（全自动）</td>
    		<td>自动发<strong style="color:red;font-size:18px;">1</strong>条/天</td>
    		<td>自动发><strong style="color:red;font-size:18px;">2x4</strong>条/天</td>
    		<td>自动发><strong style="color:red;font-size:18px;">2x4</strong>条/天，淘客帮助推广><strong style="color:red;font-size:18px;"><?php echo $nums['shop']?>x4</strong>条/天<br/>【<a style="font-weight:bold;font-size:14px;" target="_blank" href="http://img04.taobaocdn.com/imgextra/i4/71614142/T2m9mXXXpXXXXXXXXX_!!71614142.png">演示</a>】【<a style="font-weight:bold;font-size:14px;" target="_blank" href="http://img02.taobaocdn.com/imgextra/i2/71614142/T28GObXf4aXXXXXXXX_!!71614142.png">单条微博演示</a>】</td>
    	</tr>
    	<tr>
    		<td>商品营销（全自动）</td>
    		<td>自动发<strong style="color:red;font-size:18px;">6</strong>条/天</td>
    		<td>自动发><strong style="color:red;font-size:18px;">10x4</strong>条/天</td>
    		<td>自动发><strong style="color:red;font-size:18px;">10x4</strong>条/天，淘客帮助推广><strong style="color:red;font-size:18px;"><?php echo $nums['item']?>x4</strong>条/天<br/>【<a style="font-weight:bold;font-size:14px;" target="_blank" href="http://img04.taobaocdn.com/imgextra/i4/71614142/T2eMmaXbXXXXXXXXXX_!!71614142.png">演示</a>】【<a style="font-weight:bold;font-size:14px;" target="_blank" href="http://img01.taobaocdn.com/imgextra/i1/71614142/T2iGubXXFbXXXXXXXX_!!71614142.png">单条微博演示</a>】</td>
    	</tr>    	
    </tbody>
</table>
