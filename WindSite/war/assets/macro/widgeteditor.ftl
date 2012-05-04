<#macro widgetEditor>
<!--自定义组件-->
<div id="customeWidgetDialog" title="编辑自定义内容" style="display:none;position:relative;padding:0px;margin:0px;">
<table>
	<tr><td width=320px valign="top" style="">
	<div style="position:relative;border: 1px solid #D0E8FF;background:#FFFFFF;padding: 5px;width:320px;height:430px;overflow:auto;overflow-y:scroll;overflow-x:scroll">
	<strong style="color:#0073EA;">当前编辑区域:</strong><br/>
	<div id="custome_preview" style="margin:0px;padding:0px;position:absolute;background:none;">
	</div>
	</div>
	</td><td width=650px valign="top">
	<div id="custome_clickurl" style="width:630px;height:100%;padding:0px;margin:0px;position:relative;">
	<table width=630px>
	<tr><td height=30px width=630px align=right style="border-bottom:2px solid #FFAE4A">
	<!--<button id="custome_system_restore">恢复系统默认</button>&nbsp;&nbsp;&nbsp;-->
	<button id="custome_save_next">保存修改并编辑下一个</button>&nbsp;&nbsp;&nbsp;
	<button id="custome_save_prev">保存修改并编辑上一个</button>&nbsp;&nbsp;&nbsp;
	<button id="custome_save">保存修改</button>&nbsp;&nbsp;&nbsp;
	<button id="custome_cancel">取消修改</button></td></tr>
	</table>
	<table id="pre_custome_editor" style="margin-bottom:10px;">
	<tr><td><label id="pre_title_l" for="pre_title">文字标题:</label></td><td><input type="text" id="pre_title" class="tb"/></td><td><label id="pre_clickurl_l" for="pre_clickurl">链接地址:</label></td><td><input type="text" id="pre_clickurl" class="tb"/></td></tr>
	<tr><td><label id="pre_picurl_l" for="pre_picurl">图片地址:</label></td><td><input type="text" id="pre_picurl" class="tb"/></td><td><label id="pre_price_l" for="pre_price">价格:</label></td><td><input type="text" id="pre_price" class="tb"/></td></tr>
	<tr><td colspan=4><input type="hidden" id="pre_nick" class="tb"/>
	<input type="hidden" id="pre_tclickurl" class="tb"/>
	<input type="hidden" id="pre_commission" class="tb"/>
	<input type="hidden" id="pre_commissionrate" class="tb"/>
	<input type="hidden" id="pre_nid" class="tb"/>
	<input type="hidden" id="pre_sid" class="tb"/>
	<input type="hidden" id="pre_level" class="tb"/>
	<input type="hidden" id="pre_volume" class="tb"/>
	<input type="hidden" id="pre_tbc" class="tb"/>
	</td></tr>
	</table>
	
	<ul>
		<li><a href="#custome_groups">推广组推广</a></li>
		<li><a href="#custome_shops">店铺收藏推广</a></li>
		<li><a href="#custome_cats">类目推广</a></li>
		<li><a href="#custome_keyword">关键词推广</a></li>
		<li><a href="#custome_channels">频道推广</a></li>
		<li><a href="#custome_activity">活动推广</a></li>
		<li><a href="#custome_homeblog">家园日志</a></li>
	</ul>
	<table id="custome_groups" style="margin:0px;padding:0px;">
	<tr><td><table><tr><td><select id="customeItemGroupsSelect"  class="ui-designer-groups" style="display:block;">
			<option value="0">选择推广组</option>
		</select></td><td><select id="itemsSortBy">
		<option selected value="sortOrder_asc">默认</option>
		<option value="price_asc">价格由低到高</option>
		<option value="price_desc">价格由高到低</option>
		<option value="commission_rate_desc">佣金比率由高到低</option>
		<option value="commission_desc">佣金由高到低</option>
		<option value="commission_volume_desc">总支出佣金由高到低</option>
		<option value="commission_num_desc">成交量由高到低</option>
		</select></td><td><a id="autoItemGroup" title="选择下列商品中的某一个，点击自动配置后，会从当前选择的商品开始自动配置后续商品">自动配置下列商品</a></td><tr></table>
		</td></tr><tr><td>		
		<div id="custome_groups_items">
		</div></td></tr>
	<tr><td>
		<@ws.help>
		<h3>推广组推广帮助</h3>
		<p><ul style="list-style:none;"><li>第一步:选择推广组，如果您尚未创建推广组，请进入我的新淘网-我的推广组-添加推广组-添加商品</li><li>第二步:点击您要选择的商品,预览效果(您也可以手动修改属性内容)</li><li>第三步:点击保存修改或保存修改并编辑上一个(下一个)</li></ul></P>
		<p>自动配置商品功能：选择推广组中商品的某一个，点击自动配置后，会从当前选择的商品开始自动配置为后续商品</P>
		</@ws.help>
	</td></tr>	
	</table>
	<div id="custome_shops" style="margin:0px;padding:0px;">
	<table width=100%><tr><td>
	<div id="custome_shops_list">
	</div>
	</td></tr><tr><td>
	<@ws.help>
	<h3>店铺收藏推广帮助</h3>
	<p><ul style="list-style:none;"><li>第一步:点击选择店铺,预览效果(您也可以手动修改属性内容)</li><li>第二步:保存修改</li></ul></P>
	</@ws.help></td></tr></table>
	</div>
	<div id="custome_cats" style="margin:0px;padding:0px;">
	<table><tr><td>
	<table><tr><td>
	<select id="custome_cats_select1">
	</select></td><td><select id="custome_cats_select2">
	</select></td><td><select id="custome_cats_select3">
	</select></td><td><select id="custome_cats_select4">
	</select></td></tr>
	<tr><td colspan=4><div id="custome_cats_props"></div></td></tr>
	<tr><td colspan=4><button id="custome_cats_confirm">确认</button></td></tr></table>
	</td></tr>
	<tr><td><@ws.help>
	<h3>高级类目推广帮助</h3>
	<p><ul style="list-style:none;"><li>第一步:选择类目</li><li>第二步:如果当前类目为叶子类目，则可以选择当前类目下的多种属性查询，点击确认按钮,预览效果(您也可以手动修改属性内容)</li><li>第三步:点击保存修改或保存修改并编辑上一个(下一个)</li></ul></P>
	</@ws.help></td></tr></table>
	</div>
	<div id="custome_keyword" style="display:block;">
		<table width=100%>
			<tr>
			<td><label id="c_keyword_l" for="c_keyword">关键词:</label><input id="c_keyword" type="text"/></td>
			<td><label id="c_keyword_cats_l" for="c_keyword_cats">类目:</label>
			<select id="c_keyword_cats">
			<option typeid="0"  value="0" selected>所有分类</option>
			<#list cats as c><option value="${c.cid}" >${c.name}</option> </#list>
			</select>
			</td>
			<td><button id="c_keyword_save">确认</button></td>
			</tr>
			<tr><td colspan=3>
			<table id="c_keyword_table"><tr><td><strong>最近一周关键词排名:<span style="color:#60c">RPM是指千次搜索产生的收益</span></strong></td></tr>
			<tr><td>
			<div class="top_box">
				<div class="list">
				<ol>
				<li><span class="num"></span><span class="keyname header">关键词</span><span class="rpm header">RPM</span></li>
				
				</ol>
				</div>
				 </div>
				 <div class="top_box">
				<div class="list">
				<ol>
				<li><span class="num"></span><span class="keyname header">关键词</span><span class="rpm header">RPM</span></li>
				
				</ol>
				</div>
				 </div>
				 <div style="clear:both;"></div>
			</td></tr>
			</table>
			</td></tr>
		</table>
		<@ws.help>
		<h3>关键词推广帮助</h3>
		<p><ul style="list-style:none;"><li>第一步:填写关键词</li><li>第二步:选择类目</li><li>第三步:点击确认按钮,预览效果(您也可以手动修改属性内容)</li><li>第四步:点击保存修改或保存修改并编辑上一个(下一个)</li></ul></P>
		</@ws.help>
	</div>
	<div id="custome_channels" style="margin:0px;padding:0px;">
	<table><tr><td height=310px>
	<div id="custome_channels_list" style="height:310px;">
	<ul>
		<#list channels as c><li t="${c.name}" tc="${c.clickUrl}" c="/zone/channel/channel.html?channel=${c.value}&pid=${USER.pid}" pi="${c.bigPic}">
			<img src="${c.pic}"/>
			<a href="/zone/channel/channel.html?channel=${c.value}&pid=${USER.pid}" target="_blank">${c.name}</a>
			<input type="radio" name="checkedcustomechannel" class="customechecked"/>
		</li></#list>
	</ul>
	</div>
	</td></tr><tr><td>
	<@ws.help>
	<h3>频道推广帮助</h3>
	<p><ul style="list-style:none;"><li>第一步:选择频道,预览效果(您也可以手动修改属性内容)</li><li>第二步:点击保存修改或保存修改并编辑上一个(下一个)</li></ul></P>
	</@ws.help></td></tr></table>
	</div>
	<div id="custome_activity" style="margin:0px;padding:0px;">
	<table><tr><td>
		<div id="custome_activity_list">
		<#if activities??&&activities?size!=0>
			<#list activities as a>
				<#if a_index%10==0><ul></#if>
				<li t="${a.title}" c="/activity/${a.eventId}.html" tc="${a.clickUrl}" pi="${a.picUrl}"><img src="${a.picUrl}"/><a href="/activity/${a.eventId}" target="_blank"><span>${a.title}</span></a><input type="radio" name="checkedcustomeactivity" class="customechecked"/></li>
				<#if a_index%10==9||!a_has_next></ul></#if>
			</#list>
		</#if>
		</div></td></tr><tr><td>
		<@ws.help>
			<h3>活动推广帮助</h3>
			<p><ul style="list-style:none;"><li>第一步:选择活动,预览效果(您也可以手动修改属性内容)</li><li>第二步:点击保存修改或保存修改并编辑上一个(下一个)</li></ul></P>
		</@ws.help>
		</td></tr></table>
	</div>
	<div id="custome_homeblog" style="margin:0px;padding:0px;">
	<table><tr><td>
		<div id="custome_homeblog_list">
		</div></td></tr><tr><td>
		<@ws.help>
			<h3>家园日志帮助</h3>
			<p><ul style="list-style:none;"><li>第一步:选择要显示的购物资讯日志,预览效果(您也可以手动修改属性内容)</li><li>第二步:点击保存修改或保存修改并编辑上一个(下一个)</li></ul></P>
		</@ws.help>
		</td></tr></table>
	</div>
	
	</td></tr>
	</table>
</div>
</#macro>