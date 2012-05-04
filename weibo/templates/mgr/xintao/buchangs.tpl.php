<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>补偿审核 - 审核管理 - 新淘管理</title>
<link href="<?php echo W_BASE_URL;?>css/admin/admin.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/jquery.min.js"></script>
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/admin/admin_lib.js"></script>
<script src="<?php echo W_BASE_URL;?>js/admin-all.js"></script>
</head>
<body class="main-body">
	<div class="path"><p>当前位置：审核管理<span>&gt;</span>补偿审核</p></div>
    <div class="main-cont">
        <h3 class="title">补偿审核列表</h3>
		<div class="set-area">
		
        	<table class="table" cellpadding="0" cellspacing="0" width="100%" border="0">
            	<colgroup>
						<col class="w140"/>
						<col class="w150" />
                        <col class="w100" />
    					<col class="w150" />
    					<col/>
    					<col class="w140" />
    			</colgroup>
                <thead class="tb-tit-bg">
  					<tr>
    					<th><div class="th-gap">昵称</div></th>
    					<th><div class="th-gap">版本</div></th>
                        <th><div class="th-gap">状态</div></th>
                        <th><div class="th-gap">时间</div></th>
    					<th><div class="th-gap">说明</div></th>
    					<th><div class="th-gap">操作</div></th>
  					</tr>
                </thead>
				<tfoot class="tb-tit-bg"><tr><td colspan="6"><div class="pre-next"></div></td></tr></tfoot>
                <tbody>
<?php if (!empty($list)){?>
	<?php
		foreach($list as $buchang){
	?>
                	<tr>
    					<td><?php echo $buchang['nick'];?></td>
    					<td><?php echo $buchang['appstore'];?></td>
                        <td><?php echo $buchang['status'];?></td>
                        <td><?php echo $buchang['created'];?></td>
    					<td><?php echo $buchang['remark'];?></td>
    					<td><a href="javascript:audit(<?php echo '\''.$buchang['nick'].'\'';?>)" class="icon-set">审核</a></td>
  					</tr>
	<?php }?>
<?php }else{?>
<tr><td colspan="6"><p class="no-data">搜索不到任何数据</p></td></tr>
<?php }?>
                </tbody>
			</table>
    	</div>
</div>
<script type="text/javascript">
var HtmlMode=['<form action="<?php echo URL('mgr/xintao/domains.buchangSave');?>" method="post"  name="changes-newlink" id="form1">',
				'	<div class="form-box">',
				'		<div class="form-row">',
                '  		  <label class="form-field">状态</label>',
                '   		 <div class="form-cont">',
                '      		  <label for="model1">通过</label>',
                '   		 </div>',
                '		</div>',
                '    	<div class="btn-area">',
                '			<input id="J_BuchangNick" name="nick" value="" type="hidden">',
                '			<input name="status" value="1" type="hidden">',
                '			<input name="remark" value="审核通过" type="hidden">',                                
                '    		<a class="btn-general  highlight" id="pop_submit" href="#"><span>确定</span></a>',
                '    		<a class="btn-general" id="pop_cancel" href="#"><span>取消</span></a>',
                '    	</div>',
            	'	</div>',
                '</form>'].join('');
  function audit(nick){
    Xwb.use('MgrDlg',{
		modeHtml:HtmlMode,
		formMode:true,
		valcfg:{
			form:'#form1',
			trigger: '#pop_submit'
		},
		dlgcfg:{
			onViewReady:function(View){
				$('#J_BuchangNick').val(nick);
				var self=this;
				$(View).find('#pop_cancel').click(function(){
					self.close();
				});
			},
			destroyOnClose:true,
			actionMgr:false,
			title:'审核补偿'
		}
	})
  }
</script>
</body>
</html>
