<table cellspacing="5" cellpadding="4">
<input type="hidden" id="add-thread-dialog-id" value="<#if thread??>${thread.id!''}</#if>">
<tr><td><label for="add-thread-dialog-title">标题:</label></td><td><input type="text" title="您发表的文章或者回复标题，长度不能超过30" style="width:360px;" id="add-thread-dialog-title" value="<#if thread??>${thread.title!''}</#if>"></td></tr>
<tr><td><label for="add-thread-dialog-url">地址:</label></td><td><input type="text" title="您发表的文章或者回复所在的页面地址" style="width:360px;" id="add-thread-dialog-url" value="<#if thread??>${thread.url!''}</#if>"></td></tr>
<tr><td><label for="add-thread-dialog-type">类型:</label></td><td><input <#if thread??&&thread.type=='0'>checked<#else>checked</#if> type="radio" name="add-thread-dialog-type" value="0">帖子/日志&nbsp;<input <#if thread??&&thread.type=='1'>checked</#if> type="radio" name="add-thread-dialog-type" value="1">回复/评论</td></tr>
<tr><td><label for="add-thread-dialog-account">发表人:</label></td><td><input title="发表该文章或回复使用的该网站的帐号昵称" type="text" style="width:360px;" id="add-thread-dialog-account" value="<#if thread??>${thread.account!''}</#if>"></td></tr>
<tr><td><label for="add-thread-dialog-date">发表日期:</label></td><td><input title="发表该文章或回复的时间" type="text" id="add-thread-dialog-date" value="<#if thread??>${thread.createdDate!''}</#if>"></td></tr>
<tr><td><label for="add-thread-dialog-desc">备注:</label></td><td><textarea title="备注信息，长度不能超过100" id="add-thread-dialog-desc" rows="3" cols="50"><#if thread??>${thread.description!''}</#if></textarea></td></tr>
<tr><td><button id="add-thread-dialog-confirm">确定</button></td><td><button id="add-thread-dialog-cancel">取消</button></td></tr>
</table>