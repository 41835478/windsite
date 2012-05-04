<#if sites?size==1>
<#list sites as s>
<!--<script src="/assets/js/jquery/multiple-file/jquery.MultiFile.js" type="text/javascript"></script>-->
 <script type="text/javascript" src="/assets/js/clipboard/ZeroClipboard.js"></script>
<script type="text/javascript" src="/assets/js/site/mysite.js"></script>

<style>
.desc{color: gray;}.page-a{font-weight:bold;color:gray;}.modifyPageInfo{cursor:pointer;font-weight:bold;color:#00E;}.page-url-copy{width:230px;cursor:pointer;}
.my_clip_button { width:100px; text-align:center; border:1px solid black; background-color:#ccc; margin:5px; padding:5px; cursor:default; font-size:9pt; }.my_clip_button.hover { background-color:#eee; }.my_clip_button.active { background-color:#aaa; }
</style>
<input type="hidden" id="parenttid" value="${parenttid}"/>
<input type="hidden" id="site_Id" value="${s.id}"/>
<div id="mySiteTab">
	<ul>
		<li><a href="#siteProfileTab">基本信息</a></li>
		<li><a href="#pagesManager">页面管理</a></li>
		<li><a href="#coolSiteTab">酷站展示</a></li>
		<li><a href="#analytics">站点统计</a></li>
	</ul>
	<div id="siteProfileTab">
	<table id="siteProfile" cellspacing="5" cellpadding="5">
		<tr><td colspan=2><@ws.info>当您修改站点信息时，如果您的站点已发布，那么该站点下所有页面会自动重新发布</@ws.info></td></tr>
		<tr><td>淘站名称:</td><td>
			<#if s.status==1>
					<a class="site-link" href="http://${s.domainName}.xintaonet.com" target="_blank" style="color:#00E;font-weight:bold;" >${s.title}</a>
				<#else>
					<span style="color:#00E;font-weight:bold;">${s.title}</span>
			</#if>
			&nbsp;&nbsp;&nbsp;&nbsp;<a id="designerSite" href="/router/member/designer?siteId=${s.id}" target="_blank">设计站点首页</a>
		</td><tr>
		<tr><td>淘站地址:</td><td>
			<input id="site_Url" type="text" style="width:200px;" value="http://${s.domainName}.xintaonet.com">&nbsp;&nbsp;&nbsp;<input type="button" id="copySiteUrl" value="复制">
			<!--<span id="copyWebSite" class="my_clip_button"><b>复制到剪贴板</b></span>-->
		</td><tr>
		<tr><td>简介:</td><td>${s.description}</td><tr>
		<tr><td>店铺类别:</td><td><#if cat??>${cat.name}<#else>尚未设置类目</#if></td><tr>
		<tr><td>关键词:</td><td>${s.metadata}</td><tr>
		<tr><td>状态:</td><td><#if s.status==1>已发布<#else>未发布</#if></td><tr>
		<tr><td>创建时间:</td><td>${s.created?datetime}</td><tr>
		<tr><td colspan="2"><button id="changeSiteUpdate">点击修改基本信息</button></td><tr>
		<tr><td colspan="2">
		<@ws.help>
		<h3>1.为什么不能访问我的站点？</h3>
		<p>请确认您的站点状态为已发布，如果尚未发布请点击设计站点，进入设计器，调整您的站点设计后，点击发布按钮。</P>
		<a href="http://www.xintaonet.com/router/site/view/support?type=help-myxintao&faq=01" target="_blank"><h3>2.我在新淘网的推广站点地址是？</h3></a>
		<a href="http://www.xintaonet.com/router/site/view/support?type=help-myxintao&faq=02" target="_blank"><h3>3.如何修改我的站点名称？</h3></a>
		<h3>4.为什么我修改了站点名称，访问时没有显示修改后的？</h3>
		<p>请确认您修改站点名称后重新发布了该站点，如果发布后。访问时还是老的站点名称，请尝试刷新浏览器页面重新访问该站点页面</P>
		</@ws.help></td></tr>
	</table>
	<table  id="updateSiteTable" style="display:none;" cellspacing="5" cellpadding="5">
		<tr>
			<td>淘站名称:</td><td><input id="siteTitle" type="text" size="50" class="text" value="${s.title}"/></td>
		</tr>
		<tr>
			<td>店铺类别:</td><td>
			<select id="siteCid" style="width:135px;">
				<#list cats as c>
					<#if c.cid==s.cid>
						<option value="${c.cid}" selected>${c.name}</option>
					<#else>
						<option value="${c.cid}">${c.name}</option>
					</#if>
				</#list>
			</select></td>
		</tr>
		<tr>
			<td>描述:</td><td><textarea id="siteDescription" rows="3" cols="50">${s.description}</textarea></td>
		</tr>
		<tr>
			<td>关键词:</td><td><textarea id="siteMetadata" rows="3" cols="50">${s.metadata}</textarea><br/><span>关键词可以让搜索引擎更好的了解您的站点.<br/>例如:女装,男装,韩装...</span></td>
		</tr>
		<tr><td><input type="button" id="updateSite" value="保存修改"/></td><td><input type="button" id="cancelSite" value="取消"/></td></tr>
	</table>
	</div>
	<div id="pagesManager">
		<#if USER.limit??><@ws.info><#if s.status!=1>您尚未发布您的站点首页,请点击<a href="/router/member/designer?siteId=${s.id}" style="font-weight:bold;color:#00E;" target="_blank">设计站点</a>并发布后再新增新的页面设计.</#if>您目前的设计页面限额为<strong style='color:#D02200;'>${USER.limit.pages}</strong>,您已经设计<strong style='color:#D02200;'>${templates?size}</strong>个页面.发布后的页面。您可以在首页的设计中调整菜单显示页面。</@ws.info></#if>
		<#if USER.limit??&&(USER.limit.pages>templates?size)&&(s.status==1)><button id="add-page">新增页面</button></#if>
		<TABLE class="wTable" style="padding-left:2px;padding-right:2px;" width=100% border="0" cellspacing="1" cellpadding="1">
			<THEAD><TR><TH>页面名称</TH><TH>页面地址</TH><TH>状态</TH><TH>操作</TH></TR>
			</THEAD>
			<tbody>
				<#if indexTemplate??><tr><td width=230px>首页【${indexTemplate.name}】</td><td>
				<input type="text" class="page-url-copy" value="http://${s.domainName}.xintaonet.com"/></td><td><#if s.status==1>已发布<#else>未发布</#if></td><td>
				<a class='modifyPageInfo' style="color:#00E;" tid="${indexTemplate.id}">管理此页面</a>&nbsp;&nbsp;
				<a id="designerSite" href="/router/member/designer?tid=${indexTemplate.id}" class='page-a' style="color:#00E;" target="_blank">设计站点首页</a></td></tr></#if>
			<#if templates??&&(templates?size>0)>
				<#list templates as t>
				<tr><td>
				<#if t.status==1>
				<input type="radio" name="index-radio" value="${t.id}"/>&nbsp;&nbsp;
				<a class='page-a' style="color:#00E;" href="http://${s.domainName}.xintaonet.com/pages/${t.path}" target="_blank">${t.name}</a>
				<#else>
				<span class='page-a'>${t.name}</span>
				</#if>
				</td><td><input type="text" class="page-url-copy" value="http://${s.domainName}.xintaonet.com/pages/${t.path}"/></td><td><#if t.status==1>已发布<#else>未发布</#if></td>
				<td width=200px><a class='modifyPageInfo' style="color:#00E;" tid="${t.id}">管理此页面</a>&nbsp;&nbsp;<a href="/router/member/designer?tid=${t.id}" target="_blank" style="cursor:pointer;font-weight:bold;color:#00E;">设计此页面</a></td></tr>
				</#list>
				<td colspan=4><button id="setIndex">设置当前选中的页面为站点首页</button>&nbsp;&nbsp;&nbsp;&nbsp;<button id="cancelIndex">取消选中</button></td>
			</#if></tbody>
		</table>
		<@ws.help>
		<a href="http://www.xintaonet.com/router/site/view/support?type=help-designer&faq=09" target="_blank"><h3>1.如何设计多个页面？</h3></a>
		<a href="http://www.xintaonet.com/router/site/view/support?type=help-designer&faq=10" target="_blank"><h3>2.如何更换我的首页？</h3></a>
		</@ws.help>
	</div>
	<div id="coolSiteTab" style="margin:10px;">
		<@ws.help>
		<a href="http://www.xintaonet.com/router/site/view/support?type=help-myxintao&faq=03" target="_blank"><h3>1.如何提交酷站展示？</h3></a>
		</@ws.help>
		<#assign pic='/assets/images/nopicture.gif'>
		<form id="coolSitePic" name="coolSitePic" method="post" cid="${s.id}" action="/router/member/coolsite/pic/${s.id}" enctype="multipart/form-data">
		<table>
		<#if coolSite??&&coolSite.user_id??>
				<#if !coolSite.isValid>
					<#if coolSite.remark??>
						<tr><td colspan="2">您的酷站展示审核未通过：【<span style="color:red">${coolSite.remark}</span>】,请修改后提交</td></tr>
						<#else>
						<tr><td colspan="2">您的酷站展示进入审核阶段.审核通过后将进入酷站展示</td></tr>
					</#if>
				<#else>
					<tr><td colspan="2">您的淘站已经在酷站展示中.如果修改缩略图,将会进入审核阶段.在审核阶段.您的淘站将不会出现在酷站展示中。</td></tr>
				</#if>
				<#assign pic = '/zone/'+(coolSite.user_id?substring((coolSite.user_id?length)-2,(coolSite.user_id?length)))+'/'+coolSite.user_id+'/'+coolSite.user_id>
				<tr><td><img id="pic_90X80_img" src="${pic}_90X80.png"  width="90px" height="80px"/><br/><input type="file" class="multi" name="${USER.user_id}_90X80" id="pic_90X80">
				<p class="desc"> 上传90 X 80像素长宽的图片，大小不能超过50K，只支持PNG一种格式 </p></td><td>
				</td></tr>
				<tr><td><img id="pic_160X120_img" src="${pic}_160X120.png"  width="160px" height="120px"/><br/><input type="file" class="multi" name="${USER.user_id}_160X120" id="pic_160X120">
				<p class="desc"> 上传160 X 120像素长宽的图片，大小不能超过100K，只支持PNG一种格式 </p></td><td>
				</td></tr>
				<tr><td><img id="pic_640X480_img" src="${pic}_640X480.png" width="640px" height="480px"/><br/><input type="file" class="multi" name="${USER.user_id}_640X480" id="pic_640X480">
				<p class="desc"> 上传640 X 480像素长宽的图片，大小不能超过500K，只支持PNG一种格式 </p></td><td>
				</td></tr>
				<#else>
				<tr><td colspan="2">您尚未上传缩略图</td></tr>
				<tr><td><img id="pic_90X80_img" src="${pic}"  width="90px" height="80px"/><br/><input type="file" class="multi" name="${USER.user_id}_90X80" id="pic_90X80">
				<p class="desc"> 上传90 X 80像素长宽的图片，大小不能超过50K，只支持PNG一种格式 </p></td><td>
				</td></tr>
				<tr><td><img id="pic_160X120_img" src="${pic}"  width="160px" height="120px"/><br/><input type="file" class="multi" name="${USER.user_id}_160X120" id="pic_160X120">
				<p class="desc"> 上传160 X 120像素长宽的图片，大小不能超过100K，只支持PNG一种格式 </p></td><td>
				</td></tr>
				<tr><td><img id="pic_640X480_img" src="${pic}" width="640px" height="480px"/><br/><input type="file" class="multi" name="${USER.user_id}_640X480" id="pic_640X480">
				<p class="desc"> 上传640 X 480像素长宽的图片，大小不能超过500K，只支持PNG一种格式 </p></td><td>
				</td></tr>
		</#if>
		</table>
		</form>
		<table><tr><td><button id="coolsiteconfirm">提交</button>&nbsp;&nbsp;&nbsp;&nbsp;<button id="coolsitecancel">取消</button></td></tr></table>
	</div>
	<div id="analytics" align="center" style="width: 80%;">
		<@ws.info>建议您尽量不要随便修改站点统计，这样会影响统计准确度，当您修改站点统计时，如果您的站点已发布，那么该站点下所有页面会自动重新发布并启用当前的站点统计配置</@ws.info>
		<table cellpadding="10" style="border: 1px solid #DDD;">
			<tr style="border: 1px solid #DDD;">
				<th width=50px height=30px>默认</th>
				<th width=100px height=30px>类型</th>
				<th width=200px height=30px>标识</th>
			</tr>
			<tr>
				<td align="center"><input type="radio" value="analytics_google" name="analytics_radios" <#if s.analyticsType=='analytics_google'>checked</#if>/></td>
				<td align="left"><a href="http://www.google.com/analytics/"
					target="_blank">Google Analytics</a></td>
				<td align="center"><input type="text" style="" id="analytics_google" value="${s.gid}"/>&nbsp;&nbsp;&nbsp;<a
					href="http://forum.xintaonet.com/faq.php?action=faq&id=36&messageid=44" target="_blank">查看帮助</a></td>
			</tr>
			<tr>
				<td align="center"><input type="radio" value="analytics_linezing" name="analytics_radios" <#if s.analyticsType=='analytics_linezing'>checked</#if>/></td>
				<td align="left"><a href="http://tongji.linezing.com"
					target="_blank">量子恒道</a></td>
				<td align="center"><input type="text" style="" id="analytics_linezing" value="${s.lid}"/>&nbsp;&nbsp;&nbsp;<a
					href="http://forum.xintaonet.com/faq.php?action=faq&id=36&messageid=45" target="_blank">查看帮助</a></td>
			</tr>
			<tr>
				<td align="center"><input type="radio" value="analytics_51la" name="analytics_radios" <#if s.analyticsType=='analytics_51la'>checked</#if>/></td>
				<td align="left"><a href="http://www.51.la" target="_blank">我要啦</a></td>
				<td align="center"><input type="text"  style="" id="analytics_51la" value="${s.laid}"/>&nbsp;&nbsp;&nbsp;<a
					href="http://forum.xintaonet.com/faq.php?action=faq&id=36&messageid=43" target="_blank">查看帮助</a></td>
			</tr>
			<tr>
				<td colspan="3" align="center">
				<button id="analytics_update">确认</button>
				</td>
			</tr>
			<tr><td colspan=3>
			<@ws.help>
				<a href="http://www.xintaonet.com/router/site/view/support?type=help-myxintao&faq=04" target="_blank"><h3>1.如何统计我在新淘网的站点的流量？</h3></a>
			</@ws.help>
			</td></tr>
		</table>
	</div>
</div>
</#list>
</#if>