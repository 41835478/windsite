<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>版本说明</title>
<?php TPL::plugin('include/css_link');?>
<?php TPL::plugin('include/js_link');?>
<style>
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
.td-foot-bg {background:#f4f4f4;}
.td-foot-bg .btn-general{ vertical-align:middle;}
.yes,.no{display:block;width:13px;height:13px;text-indent:-9999px;overflow:hidden;margin:0 auto;background:url(http://www.xintaowang.com/css/default/xintao/check_green.gif) no-repeat;}
.no{background:url(http://www.xintaowang.com/css/default/xintao/close_red.gif) no-repeat;}
.w30{ width:30px;}.w40{ width:40px;}.w50{ width:50px; }.w60{ width:60px; }.w70{ width:70px; }.w80{ width:80px; }.w90{ width:90px; }.w100{ width:100px; }.w110{ width:110px; }.w120{ width:120px; }.w130{ width:130px; }.w140{ width:140px; }.w150{ width:150px; }.w160{ width:160px; }.w170{ width:170px; }.w180{ width:180px; }.w190{ width:190px; }.w200 { width:200px;}.w210{ width:210px; } .w240{ width:240px; }.w250 { width:250px;}
</style>
</head>
<body id="items">
	<div id="wrap">
		<div class="wrap-in">
			<?php TPL::plugin('include/header'); ?>
			<div id="container" class="single">
				<div class="content">
					<div class="main-wrap">
						<div class="main">
							<div class="main-bd">
                            	<?php TPL::plugin('mgr/xintao/versionTable',false,false); ?>
                            </div>
                         </div>
					</div>
				</div>
			</div>
			<!-- 尾部 开始 -->
			<?php TPL::module('footer');?>
			<!-- 尾部 结束 -->
		</div>
	</div>
	<?php TPL::module('gotop');?>
</body>
</html>
