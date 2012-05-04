<form style="width: 400px; margin: 0px auto;" class="ks-clear">
<div class="rowElem ks-clear">
	<label class="module-key" style="width:120px;">搜索</label><input id="ci-s-dataType-search" name="dataType" value="J_Search" checked type="radio">
	<label class="module-key" style="width:80px;">卖家</label><input id="ci-s-dataType-seller" name="dataType" value="J_Seller" type="radio">
	<label class="module-key" style="width:80px;">推广组</label><input id="ci-s-dataType-group" name="dataType" value="J_Group" type="radio">
</div>
<!-- 搜索条件 -->
<div class="rowElem ks-clear J_Filter J_Search" style="margin-bottom: 0px; padding: 0px;">
	<div class="rowElem ks-clear "><label class="label-key">关键词:</label><input id="ci-s-keyword" type="text" size=20 /></div>
	<div class="rowElem ks-clear form-select">
		<label class="label-key">所属分类:</label>
		<input id="ci-s-cid" type="text" readonly style="background:gray;" size=20 value="<#if cat??>${cat.name}</#if>" cid="<#if cat??>${cat.cid}</#if>"><a id="J_OpenCids">选取分类</a>
		<!--<select id="ci-s-cid">
			<option selected value="0">请选择分类</option>
	    	<#list cats as c><option value="${c.cid}">${c.name}</option></#list>
		</select>-->
	</div>
	<div class="rowElem ks-clear ">
		<label class="label-key">价格范围:</label>
		<input id="ci-s-price-start" type="text" value="" size=5><label>元--</label><input id="ci-s-price-end" type="text" value="" size=5><label>元</label>
	</div>
	<div class="rowElem ks-clear ks-hidden">
		<label class="label-key">佣金比率:</label>
		<input id="ci-s-commission-start" type="text" value="" size=5><label>%--</label><input id="ci-s-commission-end" type="text" value="" size=5><label>%</label>
	</div>
</div>
<!-- 搜索卖家 -->
<div class="rowElem ks-clear J_Filter J_Seller" style="margin-bottom: 0px; padding: 0px;">
	<#if (USER.usb.versionNo>1)>
	<div class="rowElem ks-clear "><label class="label-key">卖家昵称:</label><input id="ci-s-seller-nick" type="text" size=20 /></div>	
	<div class="rowElem ks-clear "><label class="label-key">关键词:</label><input id="ci-s-seller-keyword" type="text" size=20 /></div>
	<div class="rowElem ks-clear "><label class="label-key">价格范围:</label><input id="ci-s-seller-price-start" type="text" value="" size=5><label>元--</label><input id="ci-s-seller-price-end" type="text" value="" size=5><label>元</label></div>
	<!-- 排序 -->
	<div class="rowElem ks-clear form-select J_Seller_Order">
		<label class="label-key">排序方式:</label>
		<select id="ci-s-seller-orderType">
			<option selected="" value="1">默认</option>
			<option value="7">人气值从高到低</option>
			<option value="3">成交量从高到低</option>
			<option value="5">价格从低到高</option>
			<option value="6">价格从高到低</option>
		</select>
	</div>
	<#else>
	<@ws.help>
	<h3>选择升级或订购下列任意一个版本，即可使用卖家搜索</h3>
	<p><ul>
		<li>订购淘客返利版（分成型）[<a href="javascript:alert(\'即将推出\');">订购</a>]</li>
		<li>升级淘客返利版（月租型）[<a target="_blank" href="http://pay.taobao.com/mysub/subdeal/upgrade_order_sub_deal.htm?servId=22000691&appstore=myapp2upgrade">升级</a>]</li>
		<li>升级卖家版[<a target="_blank" href="http://pay.taobao.com/mysub/subdeal/upgrade_order_sub_deal.htm?servId=22000691&appstore=myapp2upgrade">升级</a>]</li>
	</ul></p>
	<h3>提示：升级或订购后，需退出重新登录才可以生效</h3>
	</@ws.help>
	</#if>
</div>
<!-- 推广组条件 -->
<div class="rowElem ks-clear J_Filter J_Group" style="margin-bottom: 0px; padding: 0px;">
	<div class="rowElem ks-clear form-select">
		<label class="label-key">选择推广组:</label>
			<select id="ci-s-groups">
				<option selected value="0">请选择推广组</option>
				<#if groups??&&groups?size!=0><#list groups as g><option value="${g.id}">${g.name}</option></#list></#if>
			</select>
		<label>
		<a href="/router/member/sitemanager/groups" target="_blank">创建推广组</a></label>
	</div>
</div>
<!-- 排序 -->
<div class="rowElem ks-clear form-select J_Order">
	<label class="label-key">排序方式:</label>
	<select id="ci-s-orderType">
		<option selected="" value="1">默认</option>
		<option value="2">佣金从高到低</option>
		<option value="3">成交量从高到低</option>
		<option value="4">卖家信用从高到低</option>
		<option value="5">价格从低到高</option>
		<option value="6">价格从高到低</option>
	</select>
</div>

<!-- 显示 -->
<#if 'shopDisplay'==module>
<div class="rowElem ks-clear ">
	<label class="label-key">图片尺寸:</label>
	<select id="ci-s-picSize">
	<#if '1'==layout||'2'==layout>
		<option selected="" value="160x160">160x160</option>
	<#elseif '4'==layout>
		<option selected="" value="160x160">160x160</option>
		<option selected="" value="220x220">220x220</option>
	<#else>
		<option value="120x120">120x120</option>
		<option selected="" value="160x160">160x160</option>
		<option value="220x220">220x220</option>
	</#if>
	</select>
</div>
</#if>
<#if 'shopDisplay'==module||'shopRank'==module||'shopDianPu'==module>
<div class="rowElem ks-clear ">
	<label class="label-key">宝贝数量:</label>
	<select id="ci-s-itemNum">
		<option value="3">3</option>
		<option selected value="4">4</option>
		<option value="5">5</option>
		<option value="6">6</option>
		<option value="7">7</option>
		<option value="8">8</option>
		<option value="9">9</option>
		<option value="10">10</option>
		<option value="11">11</option>
		<option value="12">12</option>
		<option value="13">13</option>
		<option value="14">14</option>
		<option value="15">15</option>
		<option value="16">16</option>
		<option value="17">17</option>
		<option value="18">18</option>
		<option value="19">19</option>
		<option value="20">20</option>
	</select>
</div>
</#if>
<#if 'shopDisplay'==module>
<div class="rowElem ks-clear ">
	<label class="label-key">显示销量:</label>
	<input type="checkbox" checked id="ci-s-isVolume">
</div>
</#if>
<#if 'shopChildFloor'==module>
<div class="rowElem ks-clear ">
	<label class="label-key">母婴分类:</label>
	<select id="ci-s-baobaocat">
		<option value="0">请选择分类</option>
		<option value="1">宝贝营养</option>
		<option value="2">宝贝用品</option>
		<option value="3">宝贝扮靓</option>
		<option value="4">宝贝娱乐</option>
		<option value="5">妈妈用品</option>
	</select>
</div>
</#if>
</form>