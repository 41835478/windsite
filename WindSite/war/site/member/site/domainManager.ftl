<@ws.header>
<meta name="keywords" content="新淘网,站点基本信息">
<meta name="description" content="新淘网 - 我的新淘网,站点基本信息">
<title>域名管理-淘客建站-我是淘客-新淘网</title>
</@ws.header>
<script>
$(function(){
});
</script>
<style>.key,.value{line-height:20px;height:20px;}</style>
<@xt.taoketemplate navselected='taoke' bdselected='site-domain'>
<#if sites?size==1>
<#list sites as s>
<strong style="color:red;">不再要求域名已备案！</strong>
<table>
<tr><td><span class="key">独立域名:</span></td>
<td><#if s.www??&&s.www!=''>
			<a href="http://${s.www}" target="_blank">http://${s.www}</a>
	<#else>
		<#if domain??>
			http://${domain.www}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<#if domain.status==0>
				正在审核中
			<#elseif domain.status==2>
				<div id="updateWWWDialog" title="重新申请独立域名绑定" style="display:none;">
				<div id="macro_info" class="info" align="left"
					style="position: relative; padding: 5px; line-height: 20px;"><span
					style="color: red">请先在域名注册商处将您的域名指向到www.xintaonet.com，域名绑定方可顺利完成
				</span><br/>
				<strong style="color:red;">即日起：不再要求域名已备案！</strong> 
				<img style="position: absolute; cursor: pointer; float: right; top: -14px; right: 0px;" src="http://static.xintaonet.com/assets/images/delete.gif" onclick="$(this).parent().hide();">
				</div>
				<table>
					<tr height=35px>
						<td>独立域名：</td>
						<td>http://www.</td>
						<td align=left><input type="text"
							style="border-color: initial; border: 1px solid; color: #555; font-size: 15px; padding: 4px; text-shadow: white 0px 1px 0px; width: 300px;"
							id="wwwDialog-input" value="${domain.www?substring(4)}"></td>
					</tr>
					<tr height=35px style="display:none">
						<td>备案号：</td>
						<td colspan=2><input type="text"  value="京ICP备10035914号" 
							style="border-color: initial; border: 1px solid; color: #555; font-size: 15px; padding: 4px; text-shadow: white 0px 1px 0px; width: 380px;"
							id="wwwDialog-ICP" value="${domain.icp}"></td>
					</tr>
					<tr height=35px><td colspan=3><button id="wwwDialog-confirm">确认</button></td></tr>
				</table>
				</div>
				审核未通过【${domain.description}】<a href="#" style="color:#f60;" onClick="updateWWW('${domain.id}');return false;">重新申请绑定</a>
			<#elseif domain.status==3>
				已取消绑定&nbsp;&nbsp;&nbsp;&nbsp;<a style="color:#F60;" onClick="<#if USER.usb.versionNo??&&(USER.usb.versionNo>1.5)>createWWW('${s.id}');<#else>loadVersionInfo('独立域名绑定');</#if>return false;">重新绑定</a>		
			</#if>
		<#else>
			<a style="color:#F60;" onClick="<#if USER.usb.versionNo??&&(USER.usb.versionNo>1.5)>createWWW('${s.id}');<#else>loadVersionInfo('独立域名绑定');</#if>return false;">绑定独立域名</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://home.xintaonet.com/space.php?uid=1&do=blog&id=1803" target="_blank">查看帮助</a>
		</#if>
	</#if></td></tr>
<tr><td><span class="key">自定义二级域名:</span></td><td><span class="value"><#if !(s.domainName?starts_with('shop'))><a href="http://${s.domainName}.xintaonet.com" target="_blank">http://${s.domainName}.xintaonet.com</a><#else><a style="color:#F60;" onClick="createDomainName('${s.id}');return false;">设置自定义二级域名</a></#if></span></td></tr>
<tr><td><span class="key">系统级二级域名:</span></td><td><span class="value"><a href="http://shop${USER.user_id}.xintaonet.com" target="_blank">http://shop${USER.user_id}.xintaonet.com</a></span></td></tr>
</table>
</#list></#if>
<@ws.help>
<h3>1.独立域名，自定义二级域名，系统级二级域名三者之间的关系？</h3>
<p>在新淘网中这三者的关系只是优先级的不同，独立域名>自定义二级域名>系统级二级域名。三者均可正常访问您的新淘网推广站点及链接</P>
<h3>1.如何绑定独立域名？</h3>
<p>第一步：注册一个独立域名（到域名提供商那里注册购买，如<a href="http://www.net.cn" target="_blank">万网</a>）</P>
<p>第二步：把您注册的独立域名指向到新淘网的域名www.xintaonet.com,即：在域名服务商那里使用CNAME（别名）指向www.xintaonet.com</P>
<p>第三步：登录新淘网-我是淘客-淘站管理-域名管理-绑定独立域名-填写您的独立域名，通过审核后。您的新淘网站点和推广链接就可以使用独立域名访问了</P>
</@ws.help>
</@xt.taoketemplate>