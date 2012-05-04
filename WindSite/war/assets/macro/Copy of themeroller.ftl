<#ftl strip_whitespace=true>
<!--皮肤(主题)设计器宏-->
<#macro theme>
<table id="themeRoller" width="100%" style="margin: 0px;padding: 0px;">
<tr><td width="100%">
<ul>
	<li><a href="#themeGallery">系统主题</a></li>
	<li><a href="#rollYourOwn" id="rollYourOwnA">自定义</a></li>
</ul>
<div id="themeGallery" style="padding: 5px;">
<ul id="sysThemes" style="list-style:none;">
	<li navtheme='t_pink' systheme='t-pink' title="粉色" ><div class="sysskin" style="background-position:-300px 0px"><div class="desc" style="background:pink;color:pink;" align="center"><span>粉色</span></div></div></li>
	<li navtheme='t_green' systheme='t-green' title="绿色"><div class="sysskin" style="background-position:-900px 0px"><div class="desc" style="background:green;color:green;" align="center"><span>绿色</span></div></div></li>
	<li navtheme='t_yinse' systheme='t-silver' title="银色"><div class="sysskin" style="background-position:-1350px 0px"><div class="desc" style="background:silver;color:silver;" align="center"><span>银色</span></div></div></li>
	<li navtheme='t_black' systheme='t-black'  title="黑色"><div class="sysskin" style="background-position:-150px 0px"><div class="desc"  style="background:black;color:black;" align="center"><span>黑色</span></div></div></li>
	<li navtheme='t_blue' systheme='t-blue'  title="蓝色"><div class="sysskin" style="background-position:-1050px 0px"><div class="desc"  style="background:blue;color:blue;" align="center"><span>蓝色</span></div></div></li>
	<li navtheme='t_purple' systheme='t-purple' title="紫色"><div class="sysskin" style="background-position:-750px 0px"><div class="desc"  style="background:purple;color:purple;" align="center"><span>紫色</span></div></div></li>
	<li navtheme='t_orange' systheme='t-orange'  title="橘色"><div class="sysskin" style="background-position:-450px 0px"><div class="desc"  style="background:orange;color:orange;" align="center"><span>橘色</span></div></div></li>
</ul>
</div>
<div id="rollYourOwn" style="padding: 5px;">
<ul style="list-style:none;">
	<!--<li>
		<fieldset style="border: 1px solid #DDD; padding: 5px;"><legend><strong>空间背景:</strong></legend>
		<table style="padding:2px;width:100%;">
			<tr>
				<td width="60px;"><label>背景颜色:</label></td>
				<td>
				<div class="colorContainer">
				<div name="bgColorPicker" group=".ui-designer-body"
					class="colorPicker">
					<div class="bgColorPicker"></div>
				</div>
				</div>
				</td>
			</tr>
			<tr>
				<td><label>背景图片:</label></td>
				<td><select name="bgPic" group=".ui-designer-body">
					<option value="">选择图片</option>
					<option value="bg_clouds.gif">云淡风清</option>
					<option value="bg_snow.gif">雪域风情</option>
				</select></td>
			</tr>
		</table>
		</fieldset>
	</li>-->
	<li>
	<fieldset style="border: 1px solid #DDD; padding: 5px;"><legend><strong>标题栏:</strong></legend>
	<table style="padding:2px;width:100%;">
		<!--<tr>
			<td width="60px;"><label>背景颜色:</label></td>
			<td>
			<div class="colorContainer">
			<div name="bgColorPicker" group=".ui-designer-widget-header"
				class="colorPicker">
			<div class="bgColorPicker"></div>
			</div>
			</div>
			</td>
		</tr>-->
		<tr>
			<td><label>背景图片:</label></td>
			<td><select name="bgPic" group=".ui-designer-widget-header">
				<option value="">选择图片</option>
				<option value="pink.jpg">青春粉红</option>
				<option value="orange.jpg">橙黄色</option>
				<option value="orange1.jpg">橙色数码</option>
				<option value="green.jpg">草绿色</option>
				<option value="purple.jpg">紫色情怀</option>
				<option value="purple1.jpg">清幽紫色</option>
				<option value="red.jpg">红色</option>
				<option value="silver.jpg">青色</option>
				<option value="deeporange.jpg">浓郁橙黄</option>
				<option value="blue.jpg">蓝色</option>
				<option value="cutepink.jpg">可爱粉色</option>
				<option value="black1.jpg">灰色</option>
				<option value="black.jpg">极致酷黑</option>
				<option value="brown.png">棕色</option>
				<option value="yellow.png">黄色</option>
			</select></td>
		</tr>
		<tr>
			<td><label>文字:</label></td>
			<td>
			<div class="colorContainer">
			<div name="tColorPicker" group=".ui-designer-widget-header"
				class="colorPicker">
			<div class="bgColorPicker"></div>
			</div>
			</div>
			</td>
		</tr>
	</table>
	</fieldset>
	</li>
	<li>
	<fieldset style="border: 1px solid #DDD; padding: 5px;"><legend><strong>内容:</strong></legend>
	<table style="padding:2px;width:100%;">
		<tr>
			<td width="60px;"><label>背景颜色:</label></td>
			<td>
			<div class="colorContainer">
			<div name="bgColorPicker" group=".ui-designer-widget"
				class="colorPicker">
			<div class="bgColorPicker"></div>
			</div>
			</div>
			</td>
		</tr>
		<!--<tr>
			<td><label>背景图片:</label></td>
			<td><select name="bgPic" class="texture">
				<option value="01_flat.png" data-texturewidth="40"
					data-textureheight="100">flat</option>
			</select></td>
		</tr>-->
	</table>
	</fieldset>
	</li>
	<li>
		<fieldset style="border: 1px solid #DDD; padding: 5px;"><legend><strong>商品:</strong></legend>
		<table style="padding:2px;width:100%;">
			<tr>
				<td width="100px;"><label>标题字体颜色:</label></td>
				<td width="100px;">
				<div class="colorContainer">
				<div name="tColorPicker" group=".title,.title a"
					class="colorPicker">
				<div class="bgColorPicker"></div>
				</div>
				</div>
				</td>
			</tr>
			<tr>
				<td><label>价格字体颜色:</label></td>
				<td>
				<div class="colorContainer">
				<div name="tColorPicker" group=".price"
					class="colorPicker">
				<div class="bgColorPicker"></div>
				</div>
				</div>
				</td>
			</tr>
		</table>
		</fieldset>
	</li>
	<li>
		<fieldset style="border: 1px solid #DDD; padding: 5px;"><legend><strong>类目:</strong></legend>
		<table style="padding:2px;width:100%;">
			<tr>
				<td width="60px;"><label>字体颜色:</label></td>
				<td width="150px;">
				<div class="colorContainer">
				<div name="tColorPicker" group=".widget-catslistview-cats .title"
					class="colorPicker">
				<div class="bgColorPicker"></div>
				</div>
				</div>
				</td>
			</tr>
		</table>
		</fieldset>
	</li>
	<li>
	<fieldset style="border: 1px solid #DDD; padding: 5px;"><legend><strong>导航栏:</strong></legend>
	<table style="padding:2px;width:100%;">
	<tr>
		<td width="60px;"><label>菜单主题:</label></td>
		<td width="150px;">
		<select name="nav">
			<option value="">选择主题</option>
			<option value="t_yinse">银色</option>
			<option value="t_pink">粉色</option>
			<option value="t_green">绿色</option>
			<option value="t_black">黑色</option>
			<option value="t_blue">蓝色</option>
			<option value="t_purple">紫色</option>
			<option value="t_orange">橘色</option>
			<option value="t_brown">棕色</option>
			<option value="t_yellow">黄色</option>
			<option value="t_red">红色</option>
		</select>
		</td>
	</tr>
</table>
	</fieldset>
	</li>
</ul>
</div>
</td></tr>
<tr><td width="100%" align="center" id="systhemebuttons"><button id="previewTempButton">预览主题</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button id="confirmTheme">确定</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button id="cancelTheme">重置</button></td></tr>
</table>
</#macro>