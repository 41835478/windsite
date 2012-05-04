<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>凡客联盟配置</title>
<link href="<?php echo W_BASE_URL;?>css/admin/admin.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/jquery.min.js"></script>
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/admin/admin_lib.js"></script>
<script src="<?php echo W_BASE_URL;?>js/admin-all.js"></script>
<style>.win-tips{width:400px;}</style>
<script type="text/javascript">
	function check() {
		var err=true;
		$('.tips-error').hide();
		if(!$('#vancl').val()) {
			$('#vanclError').show();
			err=false;
			return false;
		}
		if(!/^[a-zA-Z]\w{4,15}$/.test($('#vancl').val())){
			$('#vanclError').show();
			err=false;
			return false;
		}
		if(err){
			var url = '<?php echo URL('mgr/xintao/vancl_manager.save');?>';
			var data = {
				'vancl_nick': $('#vancl').val()
			};
			$.post(url, data, function(json){
				json = eval('(' + json + ')');
				if (json.state == '200') {
					Xwb.ui.MsgBox.tipOk('联盟帐号保存成功');
				}else{
					Xwb.ui.MsgBox.error('保存失败');
				}
			});
		}
	}
</script>
</head>
<body>
<div id="login-active">
    <!--<div class="active-tit"><a href=""></a></div>-->
    <div class="active-cont">
        <div class="con-border" style="margin-top:20px;">
        	<h4 class="main-title">凡客联盟配置</h4>
            <form action="" method="post" onsubmit="check();return false;">
            	<div class="active-area" style="margin-bottom:0px;">
            		<p class="tips-desc">1.请注册<a href="http://union.vancl.com/" target="_blank">凡客诚品网站联盟</a>,将您注册的联盟帐户名填写在下边</p>
            		<p class="tips-desc">2.务必确保填写的帐户名正确，否则将无法获得推广佣金</p>
                	<div class="admin-cont" style="margin-bottom:0px;">
                		<div class="info-row">
                			<label><span class="required">*</span>联盟帐户名：</label>
                    		<input class="input-txt w250" name="vancl" id="vancl" type="text" value="<?php echo XT_VANCL_NICK;?>">
							<span class="tips-error" id="vanclError" style="display:none">联盟帐号格式不正确</span>
                            <p class="tips">联盟帐户名:登录凡客联盟时输入的账号，同时也是您推广凡客联盟的标识</p>
						</div>
        			</div>
                </div>
                <div class="active-save" style="margin-bottom:0px;">
                	<input name="" class="admin-btn" type="submit" value="保 存">
                </div>
            </form>
        </div>
    </div>
</div>
</body>
</html>

