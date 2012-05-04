<div style="width:650px;margin-left:50px;" align=center>
<table width=650px>
<tr><td align=center style="font-size:16px;font-weight:700;"><input type="radio" name="dataType" value="J_Search" checked>卖家&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="dataType" value="J_Custom">手动</td></tr>
<tr><td  class="J_Filter J_Search" align=center>
<table width=500px align=center>
<tr><td width=100px>卖家昵称：</td><td width=400px><input name="shop-nick" type="text" style="padding:3px;width:300px;"></td></tr>
<tr><td width=100px>左侧大图(可选)：</td><td width=400px>图片地址:<input id="complexA-seller-picUrl" type="text" style="width:250px;padding:2px;">(高320，宽220)<br/></td></tr>
<tr><td width=100px>店铺商品(可选)：</td><td width=400px>
价格范围:<input id="complexA-price-start" type="text" value="" size=5>元--<input id="complexA-price-end" type="text" value="" size=5>元&nbsp;&nbsp;
排序方式:<select id="complexA-item-orderType">
			<option selected="" value="1">默认</option>
			<option value="7">人气值从高到低</option>
			<option value="3">成交量从高到低</option>
			<option value="5">价格从低到高</option>
			<option value="6">价格从高到低</option>
		</select>
</td></tr>
<tr><td width=100px>底部店铺(可选)：</td><td width=400px>
所属分类:<select id="complexA-cid">
			<option selected value="0">请选择分类</option>
	    	<#list cats as c><option value="${c.cid}">${c.name}</option></#list>
		</select>&nbsp;&nbsp;
信用范围:从<select id="complexA-credit-start">
						<option value="20" score="20">五黄冠</option>
						<option value="19" score="19">四黄冠</option>
						<option value="18" score="18">三黄冠</option>
						<option value="17" score="17">二黄冠</option>
						<option value="16" score="16">一黄冠</option>
						<option value="15" score="15">五冠</option>
						<option value="14" score="14">四冠</option>
						<option value="13" score="13">三冠</option>
						<option value="12" score="12">二冠</option>
						<option value="11" score="11">一冠</option>
						<option value="10" score="10">五钻</option>
						<option value="9" score="9">四钻</option>
						<option value="8" score="8">三钻</option>
						<option value="7" score="7">二钻</option>
						<option value="6" score="6">一钻</option>
						<option value="5" score="5">五心</option>
						<option value="4" score="4">四心</option>
						<option value="3" score="3">三心</option>
						<option value="2" score="2">两心</option>
						<option value="1" score="1" selected>一心</option>
						</select>
					到<select id="complexA-credit-end">
						<option value="20" score="20" selected>五黄冠</option>
						<option value="19" score="19">四黄冠</option>
						<option value="18" score="18">三黄冠</option>
						<option value="17" score="17">二黄冠</option>
						<option value="16" score="16">一黄冠</option>
						<option value="15" score="15">五冠</option>
						<option value="14" score="14">四冠</option>
						<option value="13" score="13">三冠</option>
						<option value="12" score="12">二冠</option>
						<option value="11" score="11">一冠</option>
						<option value="10" score="10">五钻</option>
						<option value="9" score="9">四钻</option>
						<option value="8" score="8">三钻</option>
						<option value="7" score="7">二钻</option>
						<option value="6" score="6">一钻</option>
						<option value="5" score="5">五心</option>
						<option value="4" score="4">四心</option>
						<option value="3" score="3">三心</option>
						<option value="2" score="2">两心</option>
						<option value="1" score="1">一心</option>
					</select>		
</td></tr>
</table>

<@ws.help><h3>请确定您输入的是真实的淘宝店铺卖家昵称，并确保该卖家加入了淘宝的淘宝客推广计划</h3><p>根据卖家昵称左侧自动显示该店铺店标及推广地址，中间和右侧自动显示该店铺的商品销量排行榜，底部显示同类按信用排行店铺</p></@ws.help>
</td></tr>
<tr><td class="J_Filter J_Custom" style="display:none;padding-left:80px;" align=center>
<table width=500px align=center>
<tr><td width=100px>左侧大图：</td><td width=400px>图片地址:<input id="complexA-picUrl" type="text" style="width:250px;padding:2px;">(高320，宽220)<br/><br/>图片标题:<input id="complexA-picTitle" type="text" style="width:250px;padding:2px;"><br/><br/>图片链接:<input id="complexA-picHref" type="text" style="width:250px;padding:2px;"></td></tr>
<tr><td width=100px>中间商品：</td><td width=400px>
		推广组:　<select id="mitems-groups"><option value="0">请选择推广组</option><#if itemGroups??&&itemGroups?size!=0><#list itemGroups as g><option value="${g.id}">${g.name}</option></#list></#if></select><a href="/router/member/sitemanager/groups" target="_blank">创建推广组</a><br/>
		排序方式:<select id="mitems-orderType"><option selected="" value="1">默认</option><option value="2">佣金从高到低</option><option value="3">成交量从高到低</option><option value="4">卖家信用从高到低</option><option value="5">价格从低到高</option><option value="6">价格从高到低</option></select>
</td></tr>
<tr><td width=100px>右侧商品：</td><td width=400px>
		推广组:　<select id="ritems-groups"><option value="0">请选择推广组</option><#if itemGroups??&&itemGroups?size!=0><#list itemGroups as g><option value="${g.id}">${g.name}</option></#list></#if></select><a href="/router/member/sitemanager/groups" target="_blank">创建推广组</a><br/>
		排序方式:<select id="ritems-orderType"><option selected="" value="1">默认</option><option value="2">佣金从高到低</option><option value="3">成交量从高到低</option><option value="4">卖家信用从高到低</option><option value="5">价格从低到高</option><option value="6">价格从高到低</option></select>
</td></tr>
<tr><td width=100px>底部店铺：</td><td width=400px>
		店铺分组:
		<select id="shops-groups"><option selected value="0">请选择店铺分组</option><#if shopGroups??&&shopGroups?size!=0><#list shopGroups as g><option value="${g.id}">${g.name}</option></#list></#if></select><a href="/router/member/sitemanager/shops" target="_blank">创建店铺分组</a><br/>
		排序方式:<select id="shops-orderType"><option value="sellerCredit_desc" selected>卖家信用从高到低</option><option value="commissionRate_desc">佣金比率从高到低</option></select>
</td></tr>
</table>
</td></tr>
</table>
</div>