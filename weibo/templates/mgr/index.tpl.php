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
<style>#side-menu li{width:146px;}a.a-menu{width:115px;float:left;}.tips-help{ display:inline-block; height:22px;width:22px; background:url( http://static.xintaowang.com/css/default/bgimg/ico_bg.png ) no-repeat; background-position:3px -700px;}</style>
<script>
$(function() {
	admin.index.init();
	$('#map').click(function() {
		Xwb.use('MgrDlg', {
			dlgcfg : {
				title : '后台管理导航',
				cs : ' win-fixed map '
			},
			modeUrl : Xwb.request.mkUrl('mgr/admin', 'map'),
			actiontrig : function(e) {
				if (e.get('e') == 'reload') {
					var arr = e.get('data').split('|');
					location.href = "?_=" + Math.random() + "#" + arr.join(',');
				}
			},
			afterDisplay : function() {
				this.dlg.jq().css({
							'marginLeft' : '0px',
							'marginTop' : '0px'
						});
				this.dlg.center();
			}
		});
	});
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

<body>
		<div id="header">
			<h1 style="display:none;background:none;text-indent:0em;"><?php echo XT_IS_SIMPLE=='true'?('简洁版<a href="#" id="J_SwitchSimple" style="font-size:14px;" data-value="false">【切换为完整版】</a>'):('完整版<a href="#" id="J_SwitchSimple" style="font-size:14px;" data-value="true">【切换为简洁版】</a>');?></h1>
			<ul>
				<?php if (isset($menu) && is_array($menu)) {foreach ($menu as $m_index => $m_menu) {?>
				<li<?php if(XT_IS_SIMPLE=='true'&&in_array($m_menu['title'],array('界面管理','用户管理'))){echo ' style="display:none"';}?>><a href="#"><?php echo $m_menu['title'];?></a></li>
				<?php }}?>
			</ul>
			<p>
				<a href="#" rel="e:isSimple" style="color:#f60;" data-value="true">切换为简洁版</a>
				<span>欢迎回来：<?php
echo '淘宝-' . XT_USER_NICK;
?>

</span>
				<span class="line">|</span>
				<a href="javascript:;" id="map">地图导航</a> 
				<span class="line">|</span>
				<a href="/" target="_blank" class="home">微博首页</a>
				<span class="line">|</span>
				<a href="<?php echo URL('mgr/admin.logout');?>">退出</a>
			</p>
		</div>

			<div id="mainDiv" class="main-frame">
				<iframe src="" id="mainframe" name="mainframe" width="100%" height="100%" frameborder="0" title="main frame content"></iframe>
			</div>
			<div id="side-menu">
				<?php


if (isset ($menu) && is_array($menu)) {
	foreach ($menu as $m_index => $m_menu) {
		$HELPS = array (
			'站点设置' => 'http://bangpai.taobao.com/group/thread/14595174-266212007.htm',
			'帐号绑定' => 'http://bangpai.taobao.com/group/thread/14595174-266213267.htm',
			'代理帐号设置' => 'http://bangpai.taobao.com/group/thread/14595174-266214233.htm',
			'导航' => 'http://bangpai.taobao.com/group/thread/14595174-266207992.htm',
			'皮肤' => 'http://bangpai.taobao.com/group/thread/14595174-266212858.htm',
			'广告' => 'http://bangpai.taobao.com/group/thread/14595174-266215584.htm',
			'页面' => 'http://bangpai.taobao.com/group/thread/14595174-266214305.htm',
			'通知' => 'http://bangpai.taobao.com/group/thread/14595174-266212935.htm',
			'自动营销' => 'http://bangpai.taobao.com/group/thread/14595174-267702454.htm',
			'微博平台' => 'http://bangpai.taobao.com/group/thread/14595174-266255015.htm',
			'个人资料推广' => 'http://bangpai.taobao.com/group/thread/14595174-266378369.htm',
			'页头页脚链接' => 'http://bangpai.taobao.com/group/thread/14595174-266382414.htm',
			'首次登录关注' => 'http://bangpai.taobao.com/group/thread/14595174-266577886.htm'
		);
?>
				<div class="menu-group">
					<?php if (isset($m_menu['sub']) && is_array($m_menu)) {foreach ($m_menu['sub'] as $l_index => $l_menu) {?>
					
					<h2 <?php if($l_index == 0) {?> class="first"<?php }?>><?php echo $l_menu['title'];?></h2>
					<ul>
						<?php if (isset($l_menu['sub']) && is_array($l_menu['sub'])) {foreach ($l_menu['sub'] as $s_index => $s_menu) {?>
						<li class="ks-clear"><a class="a-menu" data-sina="<?php if($s_menu['isSina']){echo 'true';}else{echo 'false';} ?>" data-access="<?php if($s_menu['isAccess']){echo 'true';}else{echo 'false';} ?>" href="<?php echo URL($s_menu['url'][0],isset($s_menu['url'][1])?$s_menu['url'][1]:'');?>"  router="<?php echo $m_index . '/' . $l_index . '/' . $s_index;?>" target="mainframe"><?php echo in_array($s_menu['title'],array('自动营销','店铺营销','商品营销','商品统计','排行榜','站点地图'))?($s_menu['title'].'（<span style="color:red;font-weight:bold;">新</span>）'):$s_menu['title'];?></a>
						<?php if(isset($HELPS[$s_menu['title']])){ echo '<a class="tips-help" target="_blank" href="'.$HELPS[$s_menu['title']].'"></a>';}?>
						</li>
						<?php }}?>
					</ul>
					<?php }}?>
				</div>
				
				<?php }}?>
			</div>
<?php if (XWB_SERVER_ENV_TYPE!=='sae'){?>
<script type="text/javascript">
var update_url = '<?php echo WB_UPGRADE_CHK_URL;?>';
var version = '<?php echo WB_VERSION;?>';
if (update_url && version)
{
	//checkNewVer(update_url, version);
}
</script>
<?php }?>
<script type='text/javascript'>
if(!window.Xwb)Xwb={};
	Xwb.cfg={
		basePath : '<?php echo W_BASE_URL;?>',
		verifyhash : '<?php echo XSec::makeVerifyHash('jsapi'); ?>'
	}
Xwb.request.basePath = Xwb.cfg.basePath;

//初始化 自适应窗口大小
var autoSize = function(){
	var height = document.documentElement.clientHeight - 89;
	$('#side-menu').css('height',height+'px');
	$('#mainDiv').css('height',height+'px');
}
autoSize();
$(window).resize(autoSize);
$(function(){
	var mkUrl = Xwb.util.getBind(Xwb.request, 'mkUrl');
	$('#J_SwitchSimple').click(function(){
		$isSimple = $(this).attr('data-value');
		Xwb.request.postReq(mkUrl('mgr/xintao/xintao', 'setIsSimple'), {
			isSimple:$isSimple
		}, function(r) {
			if (r.isOk()) {
				Xwb.ui.MsgBox.success('提示', '切换成功', function(id) {
							if (id == 'ok') {
								location.reload();
							}
						});
			} else {
				Xwb.ui.MsgBox.alert('提示', r.getMsg());
			}
		});
	});
});
</script>
</body>

</html>
