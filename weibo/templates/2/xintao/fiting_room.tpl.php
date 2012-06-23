<?php 
if(!defined('IN_APPLICATION')){
	exit('ACCESS DENIED!');
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<?php F('web_page_seo',1000);?>
<?php TPL::plugin('include/css_link');?>
<?php TPL::plugin('include/js_link');?>
<link href="http://static.xintaowang.com/css/default/pub.css" rel="stylesheet" type="text/css" />
</head>

<body id="user-recommend">
	<div id="wrap">    
    	<div class="wrap-in">	
            <!-- 头部 开始-->
			<?php TPL::plugin('include/header'); ?>
            <!-- 头部 结束-->
            <div id="container" class="single" style="overflow:hidden;width:990px;background-image:none;background-color:white;">
                <!--<iframe frameborder="0" marginheight="0" marginwidth="0" border="0" id="alimamaifrm" name="alimamaifrm" scrolling="no" height="670" width="780" src="http://www.taobao.com/go/act/shiyi/alishiyi.php?t=tk&pid=" ></iframe>-->
                <iframe style="margin-top:-30px;" frameborder="0" marginheight="0" marginwidth="0" border="0" id="alimamaifrm" name="alimamaifrm" scrolling="no" height="4600px" width="100%" src="http://www.taobao.com/go/chn/tbk_channel/lady.php?pid=<?php echo XT_USER_PID?>&eventid=101345" ></iframe>
            </div>
             <!-- 底部 开始-->
            <?php TPL::module('footer');?>
            <!-- 底部 结束-->
        </div>
    </div>
    <?php TPL::module('gotop');?>
</body>
</html>
