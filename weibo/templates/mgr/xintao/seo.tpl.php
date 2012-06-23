<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>SEO设置</title>
<link href="http://static.xintaowang.com/css/admin/admin.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/jquery.min.js"></script>
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/admin/admin_lib.js"></script>
<script src="<?php echo W_BASE_URL;?>js/admin-all.js"></script>
<script src="<?php echo W_BASE_URL;?>js/xintao/seo.js"></script>
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/xintao/tokeninput/jquery.tokeninput.js"></script>
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/xintao/insertatcaret/jquery.insertatcaret.min.js"></script>
<link rel="stylesheet" href="http://www.xintaowang.com/js/xintao/tokeninput/token-input.css" type="text/css" />
<link rel="stylesheet" href="http://www.xintaowang.com/js/xintao/tokeninput/token-input-facebook.css" type="text/css" />
<style>ul.token-input-list-facebook,div.token-input-dropdown-facebook{width:400px;}</style>
</head>
<body class="main-body">
	<div class="path"><p>当前位置：系统设置<span>&gt;</span><a href="/admin.php?m=mgr/page_manager">页面设置</a><span>&gt;</span>SEO设置</p></div>
    <div class="main-cont">
		<div class="set-area">
			<div class="form web-info-form">
            	<form action="/admin.php?m=mgr/xintao/seo.update" name="form1" method="post" id="this_form">
            		<input type="hidden" name="page_id" value="<?php echo $seo['page_id']?>"/>
                    <div class="form-row">
                        <label class="form-field">页面标题</label>
                        <div class="form-cont">
                            <input name="title" class="input-txt" vrel="sz=max:20,min:2,m:最少2个汉字，最多20个汉字,ww|ne=m:不能为空" warntip="#nameTip" type="text" value="<?php echo F('escape', $seo['title'])?>" /><label>-&nbsp;&nbsp;<?php echo F('escape',V('-:sysConfig/site_name'));?></label><span class="tips-error hidden" id="nameTip"></span>
							<p class="form-tips">当前页面的显示标题，尽量简单明了，系统会自动在最后增加站点名称</p>
                        </div>
                    </div>
                    <div class="form-row">
                        <label class="form-field">关键词</label>
                        <div class="form-cont">
                        	<label><input type="radio" class="button" name="sug" value="baidu" checked/>百度关键词提示</label>
		       				<label><input type="radio" class="button" name="sug" value="taobao" />淘宝关键词提示</label>
                            <input vrel="sz=max:50,m:最多50个汉字,ww" warntip="#keywordTip" type="text" id="keyword" name="keyword" style="width:330px;"/><span class="tips-error hidden" id="keywordTip"></span>
                            
                        </div>
                    </div>
                    <div class="form-row">
                        <label for="declare" class="form-field">页面描述</label>
                        <div class="form-cont">
                        	<p><label><a href="#" class="insert_sys" title="随着站点名称自动更新" data-value="[站点名称]">插入站点名称</a></label><label><a href="#" class="insert_sys" title="随着当前页面标题自动更新" data-value="[页面标题]">插入页面标题</a></label></p>
                            <textarea vrel="sz=max:100,m:最多100个汉字,ww" warntip="#descriptionTip" id="J_Description" name="description" class="input-area area-s4 code-area" cols="10" rows="10" style="width:390px;"><?php echo F('escape', $seo['description'])?></textarea>
                            <span class="tips-error hidden" id="descriptionTip"></span>
                            <p class="form-tips">当前页面的描述信息，最多100个汉字</p>
                        </div>
                    </div>
                    <div class="btn-area"><a href="#" id="submitBtn" class="btn-general highlight" name="保存修改"><span>提交</span></a></div>
                </form>
            </div>
    	</div>
	</div>
	<form id="J_BaiduForm" action="http://index.baidu.com/main/word.php" accept-charset="gb2312" target="_blank">
		<input type="hidden" id="J_BaiduWord" name="word"/>
	</form>
<script type="text/javascript">
var valid = new Validator({
	form: '#this_form',
	trigger: '#submitBtn'
});
$(document).ready(function() {
	<?php
	$ks = array ();
if ($seo['keyword']) {
	$keywords = explode(',', $seo['keyword']);
	foreach ($keywords as $key => $value) {
		$ks[] = array (
			$value
		);
	}
}
?>
	var options = {
		'tokenLimit' : 10,
		'prePopulate' : <?php echo json_encode($ks);?>
	};
	// 默认初始化淘宝参数
	$("#keyword").tokenInput(
			"http://suggest.taobao.com/sug?code=utf-8&extras=1",
			$.extend(DEFAULT_TAOBAO_SUG, options));
	$('input[type="radio"][name="sug"]').change(function() {
		if ($('input[type="radio"][name="sug"]:checked').val() == 'taobao') {
			$("#keyword").tokenInput('setOptions',
					$.extend(DEFAULT_TAOBAO_SUG, options));
		} else {
			$("#keyword").tokenInput('setOptions',
					$.extend(DEFAULT_BAIDU_SUG, options));
		}
	}).change();
	$('a.insert_sys').click(function() {
				$('#J_Description').insertAtCaret($(this).attr('data-value'));
				return false;
			});
});
</script>	
</body>
</html>
