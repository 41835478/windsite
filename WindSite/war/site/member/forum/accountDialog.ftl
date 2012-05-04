<table cellspacing="5" cellpadding="4">
<input type="hidden" id="add-account-dialog-id" value="<#if account??>${account.id!''}</#if>">
<tr><td><label for="add-account-dialog-title">昵称:</label></td><td><input type="text" id="add-account-dialog-nick" value="<#if account??>${account.nick!''}</#if>"></td></tr>
<tr><td><label for="add-account-dialog-url">帐号:</label></td><td><input type="text" id="add-account-dialog-account" value="<#if account??>${account.account!''}</#if>"></td></tr>
<tr><td><label for="add-account-dialog-type">密码:</label></td><td><input type="text" id="add-account-dialog-pwd" value="<#if account??>${account.pwd!''}</#if>"></td></tr>
<tr><td><label for="add-account-dialog-desc">备注:</label></td><td><textarea id="add-account-dialog-desc" rows="3" cols="50"><#if account??>${account.description!''}</#if></textarea></td></tr>
</table>
