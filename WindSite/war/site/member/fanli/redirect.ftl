<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'>
<html>
<header>
<meta name="keywords" content="${sitetitle}">
<meta name="description" content="${sitetitle}">
<title>重定向页面- ${sitetitle}</title>
<link type="text/css" href="/assets/js/jquery/alert/jquery.alerts.css" rel="stylesheet" />
<script type="text/javascript" src="/assets/js/jquery/jquery-1.4.2.min.js"></script>
<script type="text/javascript" src="/assets/js/jquery/alert/jquery.alerts.js"></script>
<script src="/assets/js/util/AlertUtils.js" type="text/javascript"></script>
<script type="text/javascript">
$(function() {
		window.confirm("尚未登录或登录超时,请重新登录！",function(r){
			if(r){
			document.location.href="http://${www}/router/fanli/login";//定向至登录页面
			}else{
			document.location.href="/";//定向至首页
			}
		});
});
</script>
</header>
<BODY>

</BODY>
</html>