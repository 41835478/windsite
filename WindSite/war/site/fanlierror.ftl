<#assign desc=''> 
<#if site??&&site!=''>
<#if site?starts_with('x')><#assign desc='社区'><#elseif site?starts_with('t')><#assign desc='微博'></#if>
</#if>
<html> 
<head> 
<meta http-equiv="content-type" content="text/html; charset=UTF-8"> 
<meta name="keywords" content="${desc}"> 
<meta name="description" content="新淘网 - 抱歉,您的${desc}域名未绑定">
<title>${desc}域名未绑定- 新淘网</title> 
<style> 
<!--.STYLE1 {font-size: 14px;	font-weight: bold;}.STYLE3 {font-size: 14px}.STYLE4 {font-size: 12px}-->
</style> 
</header>
<body>
<div align="center">
<table width="750" border="0" align="center" cellpadding="0" cellspacing="0">
  <tbody><tr>
    <td height="1" colspan="3" bgcolor="#65CBE2"></td>
  </tr>
  <tr>
    <td width="1" bgcolor="#65CBE2"></td>
    <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tbody><tr>
        <td height="29"><div align="center" class="STYLE1">您的${desc}域名还没有绑定</div></td>
      </tr>
      <tr>
        <td height="100"><table width="98%" border="0" align="center" cellpadding="５" cellspacing="0">
          <tbody><tr>
            <td height="30"><span class="STYLE3">尊敬的用户您好：</span></td>
          </tr>
          <tr>
            <td height="30"><span class="STYLE3">${desc}域名绑定后才可以正常访问，登录<a href="http://www.xintaonet.com">新淘网</a>申请绑定我的${desc}域名 </span></td>
          </tr>
          <tr></tr>
        </tbody></table></td>
      </tr>
    </tbody></table></td>
    <td width="1" bgcolor="#65CBE2"></td>
  </tr>
  <tr>
    <td height="1" colspan="3" bgcolor="#65CBE2"></td>
  </tr>
</tbody></table>
</div>
</body> 
</html>