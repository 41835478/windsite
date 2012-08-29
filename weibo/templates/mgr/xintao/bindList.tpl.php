<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>连接网站 - 基础设置 - 系统设置</title>
<link href="<?php echo W_BASE_URL;?>css/admin/admin.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/jquery.min.js"></script>
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/admin/admin_lib.js"></script>
<script src="<?php echo W_BASE_URL;?>js/admin-all.js"></script>
</head>
<body class="main-body">
	<div class="path"><p>当前位置：基础设置<span>&gt;</span>帐号绑定</p></div>
    <div class="main-cont">
        <h3 class="title">您已绑定的网站及帐号</h3>
		<div class="set-area" style="margin-left:0px;margin-right:0px;">
		<?php if (WB_AKEY != WB_DEFAULT_AKEY) {?>
		<p class="tips-desc">如果新浪微博不能正常绑定,请进入<a href="http://open.weibo.com" target="_blank">http://open.weibo.com</a>,我的应用---应用信息---高级信息---编辑授权回调地址
			<br> <span class="tips" style="color:red">a.授权回调地址:http://<?php echo XT_SITE_DOMAIN;?>/map.oauthCallback</span>
			<br><span class="tips" style="color:red">b.取消授权回调地址:http://<?php echo XT_SITE_DOMAIN;?>/map.cancelOauthCallback</span>
		</p>
		<?php }?>
        	<table class="table" cellpadding="0" cellspacing="0" width="100%" border="0">
            	<colgroup>
						<col class="w120"/>
                        <col class="w250" />
    					<col />
    					<col class="w200" />
    			</colgroup>
                <thead class="tb-tit-bg">
  					<tr>
    					<th><div class="th-gap">网站</div></th>
    					<th><div class="th-gap">关联用户</div></th>
                        <th><div class="th-gap">描述</div></th>
    					<th><div class="th-gap">操作</div></th>
  					</tr>
                </thead>
				<tfoot class="tb-tit-bg"><tr><td colspan="4"><div class="pre-next"></div></td></tr></tfoot>
                <tbody>
                	<tr>
						<td>淘宝网(必选)</td>
						<td><?php echo XT_USER_NICK;?></td>
						<td>连接淘宝网后，您才可以正常使用后台管理中心</td>
						<td>已连接</td>
					</tr>
					<tr>
						<td>新浪微博(必选)</td>
						<td><?php echo $admin['nickname'];?></td>
						<td>连接新浪微博后，您可以操作后台新浪微博相关功能及营销功能</td>
						<td><?php if(empty($admin['sina_uid'])||V2_ACCESS_TOKEN==''){echo '<a class="icon-operate" href="javascript:openSinaAuthorityWin();">立刻连接</a>';}else{echo '<a class="icon-operate" href="javascript:cancelBind(\'sina\');">取消绑定</a>&nbsp;&nbsp;<a class="icon-operate" href="javascript:openSinaAuthorityWin();">更换帐号</a>';}?></td>
					</tr>
					<tr>
						<td>腾讯微博</td>
						<td><?php echo WB_QQ_NAME!=''?('用户:'.WB_QQ_NAME.',昵称:'.WB_QQ_NICK):'';?></td>
						<td>连接腾讯微博后，营销微博将同时发布至腾讯微博中</td>
						<td><?php if(WB_QQ_USER_OAUTH_TOKEN==''||WB_QQ_USER_OAUTH_TOKEN_SECRET==''){echo '<a class="icon-operate" href="'.URL('mgr/xintao/active_admin.bindQQ').'">立刻连接</a>';}else{echo '<a class="icon-operate" href="javascript:cancelBind(\'qq\');">取消绑定</a>&nbsp;&nbsp;<a class="icon-operate" href="'.URL('mgr/xintao/active_admin.bindQQ').'">更换帐号</a>';}?></td>
					</tr>
					<tr>
						<td>搜狐微博</td>
						<td><?php echo WB_SOHU_NICK;?></td>
						<td>连接搜狐微博后，营销微博将同时发布至搜狐微博中</td>
						<td><?php if(WB_SOHU_UID == '' || WB_SOHU_USER_OAUTH_TOKEN==''||WB_SOHU_USER_OAUTH_TOKEN_SECRET==''){echo '<a class="icon-operate" href="'.URL('mgr/xintao/active_admin.bindSohu').'">立刻连接</a>';}else{echo '<a class="icon-operate" href="javascript:cancelBind(\'sh\');">取消绑定</a>&nbsp;&nbsp;<a class="icon-operate" href="'.URL('mgr/xintao/active_admin.bindSohu').'">更换帐号</a>';}?></td>
					</tr>
					<tr>
						<td>网易微博</td>
						<td><?php echo WB_WY_NAME!=''?('用户:'.WB_WY_NAME.',昵称:'.WB_WY_NICK):'';?></td>
						<td>连接网易微博后，营销微博将同时发布至网易微博中</td>
						<td><?php if(WB_WY_UID == '' || WB_WY_USER_OAUTH_TOKEN==''||WB_WY_USER_OAUTH_TOKEN_SECRET==''){echo '<a class="icon-operate" href="'.URL('mgr/xintao/active_admin.bindWY').'">立刻连接</a>';}else{echo '<a class="icon-operate" href="javascript:cancelBind(\'wy\');">取消绑定</a>&nbsp;&nbsp;<a class="icon-operate" href="'.URL('mgr/xintao/active_admin.bindWY').'">更换帐号</a>';}?></td>
					</tr>
                </tbody>
			</table>
    	</div>
    	<div class="box" style="padding-left:0px;">
		<?php TPL :: module('xintao/appstore');?>
		</div>
</div>
<script type="text/javascript">
var authWin;
function openSinaAuthorityWin() {
	Xwb.ui.MsgBox.confirm('您确定要绑定微博帐号？',
			'<strong style="color:red;">绑定后，您的新浪微博将每天自动发布营销类微博，如不希望自己的微博自动发布内容，请勿绑定！</strong>', function(id) {
				if (id == 'ok') {
					var url = '<?php echo URL('mgr/xintao/active_admin.bindSina');?>';
    				authWin = window.open(url, 'authWin', "resizable=1,location=0,status=0,scrollbars=0,width=570,height=360");
				}
			});
}
function authoritySuccess() {
    if (authWin && !authWin.closed) {
        authWin.close();
        top.location.reload();//刷新
    }
}
function cancelBind($type) {
	Xwb.ui.MsgBox.confirm('您确定要取消绑定？',
			'如果您不希望在当前绑定帐号自动发布微博，建议重新注册一个新的微博帐号重新做绑定！', function(id) {
				if (id == 'ok') {
					$.post('/admin.php?m=mgr/xintao/xintao.cancelBind', {
								'type' : $type
							}, function(json) {
								location.reload();
							});
				}
			});

}
</script>
</body>
</html>
