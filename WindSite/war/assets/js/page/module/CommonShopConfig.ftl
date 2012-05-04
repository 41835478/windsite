<div style="width: 400px; margin: 0px auto;" class="ks-clear">
<div class="rowElem ks-clear">
	<label class="module-key" style="width:120px;float:none;margin-left:50px;">搜索</label><input id="ci-s-dataType-search" name="dataType" value="J_Search" checked type="radio">
	<label class="module-key" style="width:80px;float:none;margin-left:50px;">推广组</label><input id="ci-s-dataType-group" name="dataType" value="J_Group" type="radio">
</div>
<!-- 搜索条件 -->
<div class="rowElem ks-clear J_Filter J_Search" style="margin-bottom: 0px; padding: 0px;">
	<div class="rowElem ks-clear form-select">
		<label class="label-key" style="float:none;">所属分类:</label>
		<select id="ci-s-cid">
			<option selected value="0">请选择分类</option>
	    	<#list cats as c><option value="${c.cid}">${c.name}</option></#list>
		</select>
	</div>
</div>
<!-- 推广组条件 -->
<div class="rowElem ks-clear J_Filter J_Group" style="margin-bottom: 0px; padding: 0px;">
	<div class="rowElem ks-clear form-select">
		<label class="label-key" style="float:none;">选择店铺分组:</label>
			<select id="ci-s-groups">
				<option selected value="0">请选择店铺分组</option>
				<#if groups??&&groups?size!=0><#list groups as g><option value="${g.id}">${g.name}</option></#list></#if>
			</select>
		<label style="float:none;" ><a href="/router/member/sitemanager/shops" target="_blank">创建店铺分组组</a></label>
	</div>
</div>
<!-- 排序 -->
<div class="rowElem ks-clear form-select J_Order">
	<label class="label-key" style="float:none;">排序方式:</label>
	<select id="ci-s-orderType">
		<option value="sellerCredit_desc" selected>卖家信用从高到低</option>
		<option value="commissionRate_desc">佣金比率从高到低</option>
	</select>
</div>
<div class="rowElem ks-clear J_SearchFilter">
		<label class="label-key" style="float:none;">信用范围:</label>
		从<select id="ci-s-credit-start">
						<option value="5goldencrown" score="20">五黄冠</option>
						<option value="4goldencrown" score="19">四黄冠</option>
						<option value="3goldencrown" score="18">三黄冠</option>
						<option value="2goldencrown" score="17">二黄冠</option>
						<option value="1goldencrown" score="16">一黄冠</option>
						<option value="5crown" score="15">五冠</option>
						<option value="4crown" score="14">四冠</option>
						<option value="3crown" score="13">三冠</option>
						<option value="2crown" score="12">二冠</option>
						<option value="1crown" score="11">一冠</option>
						<option value="5diamond" score="10">五钻</option>
						<option value="4diamond" score="9">四钻</option>
						<option value="3diamond" score="8">三钻</option>
						<option value="2diamond" score="7">二钻</option>
						<option value="1diamond" score="6">一钻</option>
						<option value="5heart" score="5">五心</option>
						<option value="4heart" score="4">四心</option>
						<option value="3heart" score="3">三心</option>
						<option value="2heart" score="2">两心</option>
						<option value="1heart" score="1" selected>一心</option>
						</select>
					到<select id="ci-s-credit-end">
						<option value="5goldencrown" score="20" selected>五黄冠</option>
						<option value="4goldencrown" score="19">四黄冠</option>
						<option value="3goldencrown" score="18">三黄冠</option>
						<option value="2goldencrown" score="17">二黄冠</option>
						<option value="1goldencrown" score="16">一黄冠</option>
						<option value="5crown" score="15">五冠</option>
						<option value="4crown" score="14">四冠</option>
						<option value="3crown" score="13">三冠</option>
						<option value="2crown" score="12">二冠</option>
						<option value="1crown" score="11">一冠</option>
						<option value="5diamond" score="10">五钻</option>
						<option value="4diamond" score="9">四钻</option>
						<option value="3diamond" score="8">三钻</option>
						<option value="2diamond" score="7">二钻</option>
						<option value="1diamond" score="6">一钻</option>
						<option value="5heart" score="5">五心</option>
						<option value="4heart" score="4">四心</option>
						<option value="3heart" score="3">三心</option>
						<option value="2heart" score="2">两心</option>
						<option value="1heart" score="1">一心</option>
					</select>
	</div>
	<div class="rowElem ks-clear J_SearchFilter">
		<label class="label-key" style="float:none;">佣金比率:</label>
		<input id="ci-s-commission-start" type="text" value="" size=5><label style="float:none;">%--</label><input id="ci-s-commission-end" type="text" value="" size=5><label style="float:none;">%&nbsp;&nbsp;【0-50之间的整数】</label>
	</div>
<#if 'shopDisplay'==module>
<!-- 显示 -->
<div class="rowElem ks-clear ">
	<label class="label-key" style="float:none;">图片尺寸:</label>
	<select id="ci-s-picSize">
	<#if '1'==layout||'2'==layout>
		<option selected="" value="160x160">160x160</option>
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
	<label class="label-key" style="float:none;">店铺数量:</label>
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
</div>