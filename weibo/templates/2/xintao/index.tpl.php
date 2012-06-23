<?php
if (!defined('IN_APPLICATION')) {
	exit ('ACCESS DENIED!');
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>微购-轻松做推广</title>
<meta name="keywords" content="微购,淘宝客,淘宝卖家,微博营销,淘宝营销,社会化营销">
<meta name="description" content="微购以淘宝网为主，实现与新浪微博（其他平台陆续支持）互通，为淘宝卖家，淘宝客提供集淘宝店铺，自动化营销与一身的独立的新一代微博购物平台。">
<?php TPL::plugin('include/css_link');?>
<?php TPL::plugin('include/js_link');?>
<link href="http://static.xintaowang.com/css/default/pub.css" rel="stylesheet" type="text/css" />
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
.table td { padding:3px 5px; line-height:20px;}
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
<body id="pub">
	<div id="wrap">
		<div class="wrap-in">
			<?php TPL::plugin('include/header'); ?>
            
			<div id="container">
				<div class="extra">
					<!-- 站点导航 开始 -->
					<div class="site-nav">
						<div class="nav-bd">
							<div class="nav-block first">
								<h3><a href="http://t.xintaowang.com" title="淘宝卖家独立推广站点" target="_blank">卖家站点演示</a></h3>
							</div>
							<div class="nav-block">				
								<h3><a href="http://taoke.xintaowang.com" title="淘宝客独立推广站点" target="_blank">淘客站点演示</a></h3>
							</div>
							<div class="nav-block">
								<h3><a href="#" onclick="return false;" title="随机挑选">会员站点展示</a></h3>
								<ul>
									<?php


$admins = DS('mgr/adminCom.getAdminsByDomain', 'g0/' . CACHE_1);
if (!empty ($admins)) {
	shuffle($admins);
	$admins = array_slice($admins, 0, 20);
	foreach ($admins as $admin) {
		if (!in_array($admin['domain'], array (
				't.xintaowang.com',
				'taoke.xintaowang.com'
			))) {
			$title = !empty ($admin['nickname']) ? $admin['nickname'] : $admin['user_nick'];
			echo '<li><a href="http://' . $admin['domain'] . '" target="_blank" title="' . $title . '" style="overflow:hidden;">' . $title . '</a></li>';
		}

	}
}
?>
								</ul>
							</div>
						</div>
					</div>
					<!-- 站点导航 结束 -->
				</div>
				<div class="content">
					<div class="main-wrap">
						<div class="main">
                        	<div class="main-bd">
                        		<div class="title-box"><div></div><h3>微购累计为淘宝卖家，淘客带来<strong style="color:red;font-size:16px;"><?php echo F('yingxiao.getWeiboYingxiao');?></strong>次营销推广</h3></div>
                        		<style>.pub-feed-list .title-box{display:none;}</style>
                        		<?php Xpipe :: pagelet('component/component_14.run', array('component_id'=>14,'param'=>array('show_num'=>20),'title'=>('会员最新分享')));?>
                            </div>
						</div>
						<div class="aside">
							<div>
							<!--订购区开始-->
								<div class="mod-aside account-login">
									<div class="login-btn-area" align="center">
										<a id="J_Appstore_Seller_Buy" target="_blank" href="http://fuwu.taobao.com/service/service.htm?service_id=14975" class="btn-ordernow" style="display:block;background:url(http://img04.taobaocdn.com/tps/i4/T1SVipXelhXXXXXXXX-161-153.png) no-repeat scroll 0 0;margin-right: 10px;width: 161px;height: 35px;text-indent: -9999px;overflow: hidden;vertical-align: middle;background-position: 0 0;"><span>立即订购</span></a>
									</div>
									<em><a class="manage" href="http://container.open.taobao.com/container?appkey=12321683&amp;encode=utf-8" target="_blank">站长管理中心</a></em>
								</div>
							<!--订购区结束-->
							</div>
							<?php Xpipe :: pagelet('component/component_15.run', array('component_id'=>15,'param'=>array('show_num'=>15),'title'=>'最新用户'));?>
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
