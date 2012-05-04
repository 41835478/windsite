<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>501</title>
<script src="<?php echo W_BASE_URL;?>js/jquery.js"></script>
<link rel="stylesheet" href="<?php echo W_BASE_URL ?>css/default/error.css" type="text/css" />
<style>
ul, li {list-style-type: none;}
body, p, ul, li, dl, dt, dd, h1, h2, h3, h4, h5, h6, form, input, textarea, label {margin: 0;padding: 0;}
/*表格*/
/*表格列表*/
.table{ width:100%; font-family:"宋体",Arial;table-layout:fixed; }
.table table td,
.table table th { border-width:0 1px 1px 0;}
.table table td.last,
.table table th { border-right:0;}
.table table tr.last td { border-bottom:0;}
.table th ,
.table td { border:1px solid #CECECE;word-wrap:break-word; word-break:break-all; }
.table th { height:28px;text-align:left; color:#333; }
.table td { padding:3px 10px; line-height:20px;}
.table tfoot tr { height:29px; *height:22px;}
.table tbody tr:hover { background:#fffeec;}
.table .no-pad { padding:0;}
.table .pink-row { background:#fbebeb;}
.table .th-gap{ margin:0;padding:0 10px;}
.table .th-gap1 { padding-left:50px;}
.table .td-gap { padding:30px 0 30px 10%; overflow:hidden;}
.table .td-mar { margin:9px 0 0; }/*意见反馈-内容*/
.table .td-nowrap { white-space:nowrap; }
.table .btn-general{ *margin-top:3px;}
.table .fold-cotrol { position:relative; height:20px;line-height:16px; overflow:hidden}
.table .no-data { margin:15px 0;white-space:nowrap; color:#999;}
.table .weibo-pic { width:90px; height:100px; margin:0; padding:0; border:1px solid #c1c9cf; padding:2px; margin:10px auto; display:block;}
.tb-tit-bg{ background:#F4F4F4 url(bgimg/table_bg.png) 0 0 repeat-x;}
.td-foot-bg {background:#f4f4f4;}
.td-foot-bg .btn-general{ vertical-align:middle;}
.add-rows {background:#F7F7F7;}/*添加二级导航*/
.add-rows td { padding-left:20px;}
.add-main-rows {background:#EBEBEB;}

/*带有input、button的表格*/
.table-s1 td{ height:32px;}
.table-s1 .ipt-txt{ width:75%;}
.table-s1 select{ width:95%;}
.td-foot-bg .pre-next{line-height:25px;}
</style>
</head>
<body id="error">
	<div id="wrap">
    	<?php 
			if(isset($msg)){
				if($msg=='需订购增值服务'){
					echo '<div style="width:1048px;margin:0 auto;margin-top:100px;font: normal 12px/1.5 Arial, Helvetica, sans-serif;color: #222;"><h3 class="title">需要站长订购下列其中一个增值服务方可正常访问</h3>';
					echo '<div class="box">';
					TPL :: module('xintao/appstore');
					echo '</div></div>';
				}else{
					echo '<div class="error err-inhibit"><div class="error-con"><p>'.$msg.'</p></div></div>';
				}
			}else{ 
				echo '<div class="error err-inhibit"><div class="error-con"><p>抱歉，你访问的页面地址有误，或者该页面不存在</p></div></div>';
			}
		?>
    </div>
</body>
</html>