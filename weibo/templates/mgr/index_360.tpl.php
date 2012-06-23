<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>管理中心</title>
<link type="text/css" rel="stylesheet" href="<?php echo W_BASE_URL;?>css/admin/admin.css?v=1234" media="screen" />
<link rel="shortcut icon" href="<?php echo W_BASE_URL;?>favicon.ico" />
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/jquery.min.js"></script>
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/admin/admin.js?v=1234"></script>
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/admin-all.js"></script>
<style>
#ks-header, #ks-content, #ks-footer {margin-left: auto;margin-right: auto;}.col-main {float: left;width: 100%;min-height: 1px;}.col-sub, .col-extra {float: left;}.layout:after, .main-wrap:after, .col-sub:after, .col-extra:after {content: '\20';display: block;height: 0;clear: both;}.layout, .main-wrap, .col-sub, .col-extra {*zoom: 1;}
.grid-s5m0 .main-wrap { margin-left: 125px; }.grid-s5m0 .col-sub { width: 122px; margin-left: -100%; }
.grid-s5m0 .main-frame{min-width:810px}
#ks-content {clear: both; }
.corner-top{-moz-border-radius-topleft:5px;-moz-border-radius-topright:5px;-webkit-border-top-left-radius:5px;-webkit-border-top-right-radius:5px;border-top-left-radius:5px;border-top-right-radius:5px;}
.corner-bottom{-moz-border-radius-bottomleft:5px;-moz-border-radius-bottomright:5px;-webkit-border-bottom-left-radius:5px;-webkit-border-bottom-right-radius:5px;border-bottom-left-radius:5px;border-bottom-right-radius:5px;}
.w990 #ks-header, .w990 #ks-content, .w990 #ks-footer { width: 990px }
.main-frame {margin: 0px;min-width: 980px;border:0px;height:500px;position:relative;}
#header{background:none;height:95px;color:#D0EDFF;margin-bottom:5px;}#header a{color:#D0EDFF}
#header ul{margin-left:0px;padding-left:5px;padding-top:25px;}
#header li{padding-top:5px;background:none;width:74px;height:71px;text-align:center;}
#header li:hover,#header li.hover{background:url(http://static.xintaowang.com/css/default/xintao/360/toolbar_hover.png) no-repeat;_background:none;_background-color:#F0F0F0;}
#header li.pushed{background:url(http://static.xintaowang.com/css/default/xintao/360/toolbar_pushed.png) no-repeat;_background:none;_background-color:#F0F0F0;_color:red;}
#header li a{background:none;padding:5px 0px;display:block;width:74px;height:71px;text-align:center;float:none;padding:0px;font-size:12px;line-height:17px;color:#D0EDFF;text-decoration: none;}
#header li a:hover{text-decoration: none;}
#header li:hover a,#header li.hover a,#header li.pushed a{_color:red;}
#header li span{margin-left:16px;*margin-left:0px;display:block;width:42px;height:42px;}
#header li span.ico_Examine{background:url(http://static.xintaowang.com/css/default/xintao/360/ico_Examine.png) no-repeat;_background:url(http://static.xintaowang.com/css/default/xintao/360/ico_Examine_ie6.png) no-repeat;}
#header li span.ico_Update{background:url(http://static.xintaowang.com/css/default/xintao/360/ico_Update.png) no-repeat;_background:url(http://static.xintaowang.com/css/default/xintao/360/ico_Update_ie6.png) no-repeat;}
#header li span.ico_Setting{background:url(http://static.xintaowang.com/css/default/xintao/360/ico_Setting.png) no-repeat;_background:url(http://static.xintaowang.com/css/default/xintao/360/ico_Setting_ie6.png) no-repeat;}
#header li span.ico_Yingxiao{background:url(http://static.xintaowang.com/css/default/xintao/360/ico_Yingxiao.png) no-repeat;_background:url(http://static.xintaowang.com/css/default/xintao/360/ico_Yingxiao_ie6.png) no-repeat;}
#header li span.ico_Top{background:url(http://static.xintaowang.com/css/default/xintao/360/ico_Top.png) no-repeat;_background:url(http://static.xintaowang.com/css/default/xintao/360/ico_Top_ie6.png) no-repeat;}
#header li span.ico_Taozhan{background:url(http://static.xintaowang.com/css/default/xintao/360/ico_Taozhan.png) no-repeat;_background:url(http://static.xintaowang.com/css/default/xintao/360/ico_Taozhan_ie6.png) no-repeat;}
#header li span.ico_Money{background:url(http://static.xintaowang.com/css/default/xintao/360/ico_Money.png) no-repeat;_background:url(http://static.xintaowang.com/css/default/xintao/360/ico_Money_ie6.png) no-repeat;}
#header li span.ico_Log{background:url(http://static.xintaowang.com/css/default/xintao/360/ico_Log.png) no-repeat;_background:url(http://static.xintaowang.com/css/default/xintao/360/ico_Log_ie6.png) no-repeat;}		
#ks-header{margin-top:5px;background: url(http://static.xintaowang.com/css/default/xintao/360/frame.jpg) no-repeat}
#content-bottom{background: url(http://static.xintaowang.com/css/default/xintao/360/frame_footer.jpg) no-repeat;height:30px;}
#ks-header, #ks-content{border: 1px solid #3F5462;}#ks-header{border-bottom-width:0px;}#ks-content{border-top-width:0px;}
#side-menu ul {padding-left:4px;padding-right:4px;}#side-menu li a.a-menu{text-indent: 10px;}#side-menu li a.a-menu:hover{text-indent: 9px;}#side-menu .current a.a-menu, #side-menu .current a.a-menu:hover{text-indent: 10px;}
.loading-indicator {font-size:11px;background-image:url('http://static.xintaowang.com/css/default/bgimg/loading.gif');background-repeat: no-repeat;background-position:top left;padding-left:20px;height:18px;text-align:left;}
#loading-mask{position:absolute;left:0;top:0;width:0px;height:0px;z-index:20000;background-color:white;display:none;}#loading{position:absolute;left:45%;top:40%;padding:2px;z-index:20001;height:auto;display:none;}#loading img {margin-bottom:5px;}#loading .loading-indicator{background:white;color:#555;font:bold 13px tahoma,arial,helvetica;padding:10px;margin:0;text-align:center;height:auto;}

</style>
<script>
$(function() {
	var alert = null;
	<?php if(XT_IS_INIT=='false'&&XT_IS_WEIBO=='true'){?>
	alert = Xwb.ui.MsgBox.alert('系统初始化', '稍候,系统初始化中,请勿操作...', function() {
			}, 'null', 'tips');
	<?php }?>
	<?php if(XT_PIWIK_ID==''&&XT_IS_WEIBO=='true'&&XT_FREE_DATELINE==''){F('piwik.addSite',XT_USER_NICK,'http://t'.XT_USER_ID.'.xintaowang.com');}?>
	<?php if(XT_IS_INIT=='false'||!USER :: get('isInit')){?>
	$.ajax({
				type : 'POST',
				url : '/admin.php?m=mgr/xintao/xintao.initXintao',
				dataType : 'json',
				data : {
					'nick' : '<?php echo XT_USER_NICK;?>'
				},
				success : function(data) {
					if (alert != null) {
						alert.close();
						$.get('/map.synItem');
					}
				}
			});
	<?php }?>
});
</script>
</head>
<body class="w990">
<div id="ks-header" class="corner-top">
	<div class="layout grid-m">
	    <div class="col-main">
	    	<div id="header">
				<ul>
					<li data-value="/admin.php?m=mgr/admin.default_page" data-tmp="1" data-access="true" class="pushed"><a><span class="ico_Examine"></span>微购体检</a></li>
					<li data-value="system" data-tmp="2" data-access="true"><a><span class="ico_Setting"></span>系统管理</a></li>
					<li data-value="yingxiao" data-tmp="2" data-access="true"><a><span class="ico_Yingxiao"></span>营销管理</a></li>
					<li data-value="/admin.php?m=mgr/xintao/xintao.top" data-tmp="1" data-access="true"><a><span class="ico_Top"></span>营销排行</a></li>
					<li data-value="/admin.php?m=mgr/xintao/taoke_sites" data-tmp="1" data-access="<?php echo XT_IS_SELLER;?>" ><a><span class="ico_Taozhan"></span>淘站推广</a></li>
					<li data-value="/admin.php?m=mgr/xintao/xintao.taokeReport" data-tmp="1" data-access="true"><a><span class="ico_Money"></span>淘客收入</a></li>
					<li data-value="/admin.php?m=mgr/xintao/xintao.weigoulog" data-tmp="1" data-access="true"><a><span class="ico_Log"></span>更新日志</a></li>
					<li data-value="/admin.php?m=mgr/xintao/xintao.upgrade" data-tmp="1" data-access="true"><a><span class="ico_Update"></span>升级服务</a></li>
					
				</ul>
				<p>
					<a href="#" rel="e:isSimple" style="color:#f60;" data-value="false">切换为专业版</a>
					<span class="line">|</span>
					<span>欢迎回来：<?php echo '淘宝-' . XT_USER_NICK;?></span>
					<span class="line">|</span>
					<a href="/" target="_blank" class="home">微博首页</a>
					<span class="line">|</span>
					<a href="<?php echo URL('mgr/admin.logout');?>">退出</a>
				</p>
			</div>
		</div>
	</div>
</div>
<div id="ks-content" class="corner-bottom">
	<div id="content-bottom" class="ks-clear" style="line-height:30px;padding-left:10px;color: #D0EDFF;">
		<?php 
$daydiff = -1;
if(XT_IS_WEIBO=='true'&&XT_FREE_DATELINE==''&&(XT_APPSTORE_DATELINE!='false'&&XT_APPSTORE_DATELINE!='')){
$daydiff = (strtotime(XT_APPSTORE_DATELINE)-strtotime(date("Y-m-d")))/60/60/24;
}
?>
		<?php echo '已订购：<strong style="color:#f60;">'.(XT_IS_MULTI=='true'&&XT_FREE_DATELINE==''?'卖家服务(含淘客服务)':(XT_IS_TAOKE=='true'&&XT_FREE_DATELINE==''?'淘客服务':'免费服务')).'</strong>'.(XT_APPSTORE_DATELINE!='false'&&XT_APPSTORE_DATELINE!=''?('，到期日期【<strong style="color:#f60;">'.str_replace(' 00:00:00','',XT_APPSTORE_DATELINE).'</strong>】'.($daydiff>0?'，还可以使用【<strong style="color:#f60;">'.$daydiff.'</strong>】天':'')):'')?>
	</div>
</div>
</body>
<script type='text/javascript'>
var ONE_TMP = ['<div class="layout grid-m">',
			   '	<div class="col-main">',
			   '		<div id="mainDiv" class="main-frame"><div id="loading-mask" style=""></div><div id="loading"><div class="loading-indicator"><img src="http://www.xintaowang.com/doc/resources/extanim32.gif" width="32" height="32" style="margin-right:8px;" align="absmiddle"/>加载中...</div></div>',
			   '			<iframe src="" id="mainframe" name="mainframe" width="100%" height="100%" frameborder="0" title="main frame content"></iframe>',
			   '		</div>',
			   '	</div>',
			   '</div>'].join('');
var TWO_TMP = ['<div class="layout grid-s5m0">',
			   '	<div class="col-main">',
			   '		<div class="main-wrap">',
			   '			<div id="mainDiv" class="main-frame"><div id="loading-mask" style=""></div><div id="loading"><div class="loading-indicator"><img src="http://www.xintaowang.com/doc/resources/extanim32.gif" width="32" height="32" style="margin-right:8px;" align="absmiddle"/>加载中...</div></div>',
			   '				<iframe src="" id="mainframe" name="mainframe" width="100%" height="100%" frameborder="0" title="main frame content"></iframe>',
			   '			</div>',
			   '		</div>',
			   '	</div>',
			   '	<div class="col-sub">',
			   '		<div id="side-menu" style="width:122px;position: static;left: 0px;top: 0px;height:100%;border-width:0px;border-right-width:1px;">',
			   '			<div data-value="system" class="menu-group" style="display: none; ">',
			   '				<h2 class="first" style="height:34px;line-height:34px;background-position: 0 -34px;">基础设置</h2>',
			   '					<ul>',
			   '						<li class="ks-clear current"><a class="a-menu" data-sina="false" data-access="<?php echo XT_IS_WEIBO;?>" href="/admin.php?m=mgr/setting.editIndex" target="mainframe">站点设置</a><a class="tips-help" target="_blank" href="http://bangpai.taobao.com/group/thread/14595174-266212007.htm"></a></li>',
			   '						<li class="ks-clear"><a class="a-menu" data-sina="false" data-access="true" href="/admin.php?m=mgr/xintao/active_admin.active" target="mainframe">微博平台</a><a class="tips-help" target="_blank" href="http://bangpai.taobao.com/group/thread/14595174-266255015.htm"></a></li>',
			   '						<li class="ks-clear"><a class="a-menu" data-sina="false" data-access="true" href="/admin.php?m=mgr/xintao/active_admin.bindList" target="mainframe">帐号绑定</a><a class="tips-help" target="_blank" href="http://bangpai.taobao.com/group/thread/14595174-266213267.htm"></a></li>',
			   '						<li class="ks-clear"><a class="a-menu" data-sina="false" data-access="<?php echo XT_IS_WEIBO;?>" href="/admin.php?m=mgr/proxy_account.accountList" target="mainframe">代理帐号设置</a><a class="tips-help" target="_blank" href="http://bangpai.taobao.com/group/thread/14595174-266214233.htm"></a></li>',
			   '					</ul>',
			   '			</div>',
			   '			<div data-value="yingxiao" class="menu-group" style="display: none; ">',
			   '				<h2 class="first" style="height:34px;line-height:34px;background-position: 0 -34px;">营销管理</h2>',
			   '					<ul>',
			   '						<li class="ks-clear"><a class="a-menu" data-sina="false" data-access="true" href="/admin.php?m=mgr/xintao/xintao.analytics" target="mainframe">微博统计</a></li>',
			   '						<li class="ks-clear"><a class="a-menu" data-sina="false" data-access="true" href="/admin.php?m=mgr/xintao/autoCron.yingxiao" target="mainframe">自动营销</a></li>',
			   '						<li class="ks-clear"><a class="a-menu" data-sina="false" data-access="true" href="/admin.php?m=mgr/xintao/yingxiaoWeibo.shopWeiboList" target="mainframe">店铺营销(卖家)</a></li>',
			   '						<li class="ks-clear"><a class="a-menu" data-sina="false" data-access="true" href="/admin.php?m=mgr/xintao/yingxiaoWeibo.itemWeiboList" target="mainframe">商品营销(卖家)</a></li>',
			   '						<!--<li class="ks-clear"><a class="a-menu" data-sina="false" data-access="true" href="/admin.php?m=mgr/xintao/wowMgr.userItemList" target="mainframe">商品分享(卖家)</a></li>-->',
			   '						<li class="ks-clear"><a class="a-menu" data-sina="false" data-access="true" href="/admin.php?m=mgr/xintao/yingxiaoWeibo.taokeItemList" target="mainframe">商品营销(淘客)</a></li>',
			   '						<li class="ks-clear"><a class="a-menu" data-sina="false" data-access="true" href="/admin.php?m=mgr/xintao/wowMgr.itemCatList" target="mainframe">商品分享(淘客)</a></li>',
			   '					</ul>',
			   '			</div>',			   
			   '		</div>',
			   '	</div>',
			   '</div>'].join('');
if(!window.Xwb)Xwb={};
	Xwb.cfg={
		basePath : '<?php echo W_BASE_URL;?>',
		verifyhash : '<?php echo XSec::makeVerifyHash('jsapi'); ?>'
	}
Xwb.request.basePath = Xwb.cfg.basePath;
</script>
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/xintao/360.js"></script>
</html>
