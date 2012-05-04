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
        	<from id="loginForm" action="" method="post" onsubmit="ajax_submit();return false;">
			<input type="hidden" id="top_appkey" name="top_appkey" value="<?php echo $_GET['top_appkey']?>">
			<input type="hidden" id="top_parameters" name="top_parameters" value="<?php echo $_GET['top_parameters']?>">
			<input type="hidden" id="top_session" name="top_session" value="<?php echo $_GET['top_session']?>">
			<input type="hidden" id="top_sign"  name="top_sign" value="<?php echo $_GET['top_sign']?>">
			<div
				style="padding: 15px; border: 1px solid #D5E5E8; background: #F4FBFF; text-align: center;width:330px;>
			<a href="javascript:$('#loginForm').submit();">进入管理后台</a><br />
			<a href="javascript:$('#loginForm').submit();">如果您的浏览器没有自动跳转,请点击这里</a></div>
			<input class="admin-btn" onfocus="this.blur()" id="J_Submit" name="" type="submit" value="登 录" />
			</form>
        </div>
    </div>
</div>
<script>
function ajax_submit() {
	alert(1);
	var url = '<?php echo URL('mgr/admin.loginTB',array('ajax'=>1));?>';
	var data = {
			'top_appkey': $('#top_appkey').val(),
			'top_parameters': $('#top_parameters').val(),
			'top_session': $('#top_session').val(),
			'top_sign':$('#top_sign').val()
		};
	$.post(url, data, function(json){
		if ('string' == typeof json) {
			json = eval('(' + json + ')');
		}
		if (json.state == '200') {
			window.location.href = '<?php echo URL('mgr/admin.index');?>';
		} else {
			if (json.state == '402') {
				$('#username_msg').html(json.msg).addClass("tips-error").show();
				$('#verify_code_msg').hide();
			}
		}
	})
}
$(function(){
	alert(1);
$('#J_Submit').click(function(){
	alert(2);
});
});
</script>
</body>
</html>