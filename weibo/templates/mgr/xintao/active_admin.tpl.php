<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>平台管理</title>
<link href="<?php echo W_BASE_URL;?>css/admin/admin.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/jquery.min.js"></script>
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/admin/admin_lib.js"></script>
<script src="<?php echo W_BASE_URL;?>js/admin-all.js"></script>
<style>.win-tips{width:400px;}</style>
<?php
$isWWW=true; 
if(XT_SITE_DOMAIN == 't' . XT_USER_ID . '.xintaowang.com'){
	$isWWW=false;
}
?>
<script type="text/javascript">
	function check() {
		var err=true;
		$('.tips-error').hide();
		if(!$('#appkey').val()) {
			$('#appkeys').show();
			err=false;
			return false;
		}

		if(!$('#secret').val()) {
			$('#secrets').show();
			err=false;
			return false;
		}

		if(err){
			<?php if(!empty($app_key)){echo "Xwb.ui.MsgBox.confirm('提醒','确定更换平台设置吗？更换后:<br/>1.管理员及代理帐号需重新连接新浪微博！<br/>2.已绑定的会员需重新绑定！<br/>3.已登录的会员需退出重新登录！',function(id){if(id=='ok'){";}?>
			var url = '<?php echo URL('mgr/xintao/active_admin.saveApp');?>';
			var data = {
				'appkey': $('#appkey').val(),
				'secret': $('#secret').val()
			};
			$.post(url, data, function(json){
				json = eval('(' + json + ')');
				if (json.state == '200') {
					Xwb.ui.MsgBox.confirm('提醒',
					'保存成功,修改APP后，需要重新连接新浪微博帐号', function(id) {
						if (id == 'ok') {
							top.location.href="/admin.php?m=mgr/admin.index#1,<?php echo (XT_IS_SIMPLE=='true')?'2':'5';?>";
		  					top.location.reload();		
						}
					});
					//top.location.href = '<?php echo URL('mgr/xintao/active_admin.bindList');?>';
				}else{
					if (json.state == '1001') {
						$('#appkeys').html(json.msg).addClass("tips-error").show();
						return false;
					}
					if (json.state == '1002') {
						$('#secrets').html(json.msg).addClass("tips-error").show();
						return false;
					}
				}
			});
			<?php if(!empty($app_key)){echo "}});";}?>
		}
	}
	function checkQQ() {
		var err=true;
		$('.tips-error').hide();
		if(!$('#qq_appkey').val()) {
			$('#qq_appkeys').show();
			err=false;
			return false;
		}

		if(!$('#qq_secret').val()) {
			$('#qq_secrets').show();
			err=false;
			return false;
		}

		if(err){
			<?php if(!empty($qq_app_key)){echo "Xwb.ui.MsgBox.confirm('提醒','确定更换平台设置吗？更换后:<br/>1.管理员需重新连接腾讯微博！',function(id){if(id=='ok'){";}?>
			var url = '<?php echo URL('mgr/xintao/active_admin.saveAppQQ');?>';
			var data = {
				'appkey': $('#qq_appkey').val(),
				'secret': $('#qq_secret').val()
			};
			$.post(url, data, function(json){
				json = eval('(' + json + ')');
				if (json.state == '200') {
					Xwb.ui.MsgBox.confirm('提醒',
					'保存成功,修改APP后，需要重新连接腾讯微博帐号', function(id) {
						if (id == 'ok') {
							top.location.href="/admin.php?m=mgr/admin.index#1,4";
		  					top.location.reload();		
						}
					});
					//top.location.href = '<?php echo URL('mgr/xintao/active_admin.bindList');?>';
				}else{
					if (json.state == '1001') {
						$('#qq_appkeys').html(json.msg).addClass("tips-error").show();
						return false;
					}
					if (json.state == '1002') {
						$('#qq_secrets').html(json.msg).addClass("tips-error").show();
						return false;
					}
				}
			});
			<?php if(!empty($qq_app_key)){echo "}});";}?>
		}
	}
</script>
</head>
<body class="main-body">
	<div class="path"><p>当前位置：系统设置<span>&gt;</span>微博平台</p></div>
	<div class="main-cont clear">
		<div class="tab-box">
			<h5 class="tab-nav tab-nav-s1 clear" id="weibo-type">
				<a class="current"><span>新浪微博</span></a>
				<a><span>腾讯微博</span></a>
			</h5>
			<div class="tab-con-s1" id="weibo-tabs">
				<!-- tab内容 -->
				<div class="tab">
					<div class="main-cont">
						<div class="active-cont">
					    	<div class="con-border" style="margin-bottom:0px;">
					        	<h4 class="main-title" style="font-size:14px;">新浪微博平台配置(<strong style="color:red;">请务必确认自己了解该功能的用途</strong>)</h4>
					            <form action="" method="post" onsubmit="check();return false;">
					            	<div class="active-area" style="margin-bottom:0px;">
					            		<p class="tips-desc">1.请登录<A href="http://open.t.sina.com.cn/loginnew.php?source=xweibo" target="_blank">新浪微博开放平台</A>,<a target="_blank" href="http://bangpai.taobao.com/group/thread/14595174-266255015.htm">如何申请APP</a>,<a target="_blank" href="http://bangpai.taobao.com/group/thread/14595174-269690808.htm">如何在新浪微博网站接入</a></p>
					            		<p class="tips-desc">2.提醒：一旦设置AppKey以及Appkey Secret后，不建议再次更换，更换AppKey,Secret后：<br> <span class="tips" style="color:red">a.站点已加入的会员需要重新绑定新浪微博帐号</span><br><span class="tips" style="color:red">b.站长需要重新绑定自己的新浪微博帐号，以及重新绑定已有代理帐号</span></p>
					            		<p class="tips-desc">3.进入新浪微博开放平台--我的应用--找到您创建的应用，填写各种基本信息，并提交文案审核</p>
					                	<div class="admin-cont" style="margin-bottom:0px;">
					                		<div class="info-row">
					                			<label style="width:200px"><span class="required">*</span>（新浪）APPKEY：</label>
					                    		<input class="input-txt w250" name="appkey" id="appkey" type="text" value="<?php echo $app_key;?>"/>
												<span class="tips-error" id="appkeys" style="display:none">请输入APPKEY</span>
					                            <p class="tips" style="margin-left:200px;">请登录<A href="http://open.t.sina.com.cn/loginnew.php?source=xweibo" target="_blank">新浪微博开放平台</A>，查询您申请的APPKEY</p>
											</div>
											 <div class="info-row">
					                			<label style="width:200px"><span class="required">*</span>（新浪）APPKEY SECRET：</label>
					                    		<input class="input-txt w250" name="secret" id="secret" type="text" value="<?php echo $app_secret;?>"/>
					                    		<span class="tips-error" id="secrets" style="display:none">请输入APPKEY SECRET</span>
					                		</div>
					        			</div>
					                </div>
					                <div class="active-save" style="margin-bottom:0px;">
					                	<input name="" class="admin-btn" type="submit" value="保 存"/>
					                    <?php if(!empty($app_key)){?>
					                    <!--<input name="" class="admin-btn" type="submit" value="恢复为系统默认" />-->
					                    <?php }?>
					                </div>
					            </form>
					        </div>
					    </div>
					</div>
				</div>
				<div class='tab hidden' >
					<div class="main-cont">
						<div class="active-cont">
					    	<div class="con-border" style="margin-bottom:0px;">
					        	<h4 class="main-title" style="font-size:14px;">腾讯微博平台配置(<strong style="color:red;">请务必确认自己了解该功能的用途</strong>)</h4>
					            <form action="" method="post" onsubmit="checkQQ();return false;">
					            	<div class="active-area" style="margin-bottom:0px;">
					            		<p class="tips-desc">1.请登录<A href="http://dev.open.t.qq.com/apps/add/1/" target="_blank">腾讯微博开放平台</A>申请APPKEY</p>
					            		<p class="tips-desc">2.提醒：一旦设置AppKey以及Appkey Secret后，不建议再次更换，更换AppKey,Secret后：<br> <span class="tips" style="color:red">a.站长需要重新绑定自己的腾讯微博帐号</span></p>
					            		<p class="tips-desc">3.进入腾讯微博开放平台--我的应用--找到您创建的应用，填写各种基本信息，并提交来源字段审核</p>
					                	<div class="admin-cont" style="margin-bottom:0px;">
					                		<div class="info-row">
					                			<label style="width:200px"><span class="required">*</span>（腾讯）APPKEY：</label>
					                    		<input class="input-txt w250" name="appkey" id="qq_appkey" type="text" value="<?php echo $qq_app_key;?>"/>
												<span class="tips-error" id="qq_appkeys" style="display:none">请输入APPKEY</span>
					                            <p class="tips" style="margin-left:200px;">请登录<A href="http://open.t.qq.com/development/" target="_blank">腾讯微博开放平台</A>，查询您申请的APPKEY</p>
											</div>
											 <div class="info-row">
					                			<label style="width:200px"><span class="required">*</span>（腾讯）APPKEY SECRET：</label>
					                    		<input class="input-txt w250" name="secret" id="qq_secret" type="text" value="<?php echo $qq_app_secret;?>"/>
					                    		<span class="tips-error" id="qq_secrets" style="display:none">请输入APPKEY SECRET</span>
					                		</div>
					        			</div>
					                </div>
					                <div class="active-save" style="margin-bottom:0px;">
					                	<input name="" class="admin-btn" type="submit" value="保 存" />
					                    <?php if(!empty($app_key)){?>
					                    <!--<input name="" class="admin-btn" type="submit" value="恢复为系统默认" />-->
					                    <?php }?>
					                </div>
					            </form>
					        </div>
					    </div>
					</div>
				</div>	
			</div>
		 </div>
	</div>
</body>
<script type='text/javascript'>
$(function(){
		var switcher1 = new Switcher({
			items: $('#weibo-type a'),
			contents: $('#weibo-tabs>.tab'),
			trigMode: 'click',
			selectedCS: 'current'
		});
});
</script>
</html>

