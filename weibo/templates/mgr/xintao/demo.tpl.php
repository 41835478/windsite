<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>功能演示</title>
<link type="text/css" rel="stylesheet" href="<?php echo W_BASE_URL;?>css/admin/admin.css" media="screen" />
<script type="text/javascript" src="/js/jquery.min.js"></script>
<script type="text/javascript" src="/js/xintao/url/jquery.url.min.js"></script>
<style type="text/css">
.usemap{display:none;width:100%;height:100%;}
</style>
</head>
<body class="main-body">
<div class="main-cont">
<h3 class="title"><a href="#J_Appstore">订购</a>增值服务后，才能正常使用</h3>
<div id="demo_map" class="usemap">
<div>
<img style="border-style:none"/>
</div>
</div>
<div class="box" style="padding-left:0px;">
<?php TPL :: module('xintao/appstore');?>
</div>
</div>
</body>
<script type="text/javascript">
$(function(){
	var m='<?php echo $m?>';
	if(m){
		var id=m.replace('.','_').replace('/','_');
		//$('body').css('background','url(http://www.xintaowang.com/css/admin/demo/'+m+'.png) no-repeat');
		$('#demo_map').find('img').attr('src','http://www.xintaowang.com/css/admin/demo/'+id+'.png').end().show();
	}
});

</script>
<script type="text/javascript" src=" http://toptrace.taobao.com/assets/getAppKey.js" topappkey="12321683"></script>
</html>