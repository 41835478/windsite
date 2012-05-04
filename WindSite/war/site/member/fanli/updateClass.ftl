<table width=100%><tr><td width=200px align=right><label class="fm-label" for="sortOrder"><span class="required">*</span>显示顺序：</label><input type="text"  required="required" class="i-text" id="sortOrder" name="sortOrder" value="${clazz.sortOrder}" style="width:50px;"></td><td  align=right><label for="title" class="fm-label"><span class="required">*</span>版块名称：</label><input type="text"  required="required" minlength="3" maxlength="20" class="i-text" id="title" name="title" value="${clazz.title}"></td></tr>
<tr><td width=200px align=right><label class="fm-label" for="blogClass"><span class="required">*</span>关联日志分类：</label><input readonly  style="background:#9C9C9C;width:50px;" type="text"  required="required" class="i-text" id="blogClass" name="blogClass" value="${clazz.blogClass}"></td><td  align=right><label for="classTitle" class="fm-label"><span class="required">*</span>分类名称：</label><input  readonly  style="background:#9C9C9C;" type="text"  required="required" minlength="3" maxlength="20" class="i-text" id="classTitle" name="classTitle" value="${clazz.classTitle}"></td></tr>
<td colspan=2 align=center><span class="btn btn-ok"><input type="button" id="createClassSubmit" value="确定"></span></td>
</table>
<div class="shortcut">
<div class="shortcut-rows">
<h4>我的日志分类</h4>
<#if classes??&&classes?size!=0>
<ul><#list classes as c><li><input type="radio" name="radio-class"><a href="http://home.xintaonet.com/space.php?uid=${USER.uc_id}&do=blog&classid=${c.classid}&view=me" cid="${c.classid}" target="_blank">${c.classname}</a></li></#list></ul>
<#else>您还没有在新淘家园发布日志及日志分类，<a target="_blank" style="color:#08E;font-weight:700;" href="/router/site/loginuc?redirect=http://home.xintaonet.com">进入家园</a>
</#if>
<div style="clear:both;"></div></div>
<div class="shortcut-rows">
<h4>系统文章分类</h4>
<ul><li><input type="radio" name="radio-class"><a cid="584" href="http://home.xintaonet.com/space.php?uid=1&do=blog&classid=584&view=me" target="_blank">返利帮助中心</a></li></ul>
<div style="clear:both;"></div>
</div>
</div>