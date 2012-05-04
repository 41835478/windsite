<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>管理员登录</title>
<link href="<?php echo W_BASE_URL;?>css/admin/admin.css" rel="stylesheet" type="text/css" />
<style type="text/css">
html{ background:#F2F5F8;}
body{ background:#F2F5F8;}
</style>
<script type='text/javascript' src='<?php echo W_BASE_URL;?>js/jquery.min.js'></script>
<script type='text/javascript' src='<?php echo W_BASE_URL;?>js/admin/admin.js'></script>
<link rel="shortcut icon" href="<?php echo W_BASE_URL;?>favicon.ico">
</head>
<body>
<div id="login-wrap">
	<div class="login-main">
    	<div class="login-tit">
        	<div class="admin-logo"></div>
            <div class="tit"></div>
        </div>
        <div class="login-cont">
        	<from id="loginForm" action="" method="post">
			<input type="hidden" name="top_appkey" value="<?php echo $_GET['top_appkey']?>">
			<input type="hidden" name="top_parameters" value="<?php echo $_GET['top_parameters']?>">
			<input type="hidden" name="top_session" value="<?php echo $_GET['top_session']?>">
			<input type="hidden" name="top_sign" value="<?php echo $_GET['top_sign']?>">
			<div
				style="padding: 15px 60px; border: 1px solid #D5E5E8; background: #F4FBFF; text-align: center; margin: 20% auto auto; width: 55%">
			<a href="javascript:$('#loginForm').submit();">进入管理后台</a></a><br />
			<a href="javascript:$('#loginForm').submit();">如果您的浏览器没有自动跳转,请点击这里</a></div>
			</form>
        </div>
    </div>
</div>
<script>
$(function(){
	alert(1);
$('#loginForm').submit();
alert(2);
});
</script>
</body>
</html>