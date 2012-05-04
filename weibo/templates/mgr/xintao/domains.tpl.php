<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>域名审核 - 审核管理 - 新淘管理</title>
<link href="<?php echo W_BASE_URL;?>css/admin/admin.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/jquery.min.js"></script>
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/admin/admin_lib.js"></script>
<script src="<?php echo W_BASE_URL;?>js/admin-all.js"></script>
</head>
<body class="main-body">
	<div class="path"><p>当前位置：审核管理<span>&gt;</span>域名审核</p></div>
    <div class="main-cont">
        <h3 class="title">域名审核列表</h3>
		<div class="set-area">
		
        	<table class="table" cellpadding="0" cellspacing="0" width="100%" border="0">
            	<colgroup>
						<col class="w60"/>
                        <col class="w140" />
    					<col class="w60" />
    					<col class="w140" />
    					<col class="w140" />
    					<col />
    					<col class="w140" />
    			</colgroup>
                <thead class="tb-tit-bg">
  					<tr>
    					<th><div class="th-gap">编号</div></th>
    					<th><div class="th-gap">域名</div></th>
                        <th><div class="th-gap">状态</div></th>
                        <th><div class="th-gap">时间</div></th>
                        <th><div class="th-gap">用户</div></th>
    					<th><div class="th-gap">说明</div></th>
    					<th><div class="th-gap">操作</div></th>
  					</tr>
                </thead>
				<tfoot class="tb-tit-bg"><tr><td colspan="7"><div class="pre-next"></div></td></tr></tfoot>
                <tbody>
<?php if (!empty($list)){?>
	<?php
		foreach($list as $domain){
	?>
                	<tr>
    					<td><?php echo $domain['id'];?></td>
    					<td><?php echo '<a href="http://'.$domain['domain'].'" target="_blank">'.$domain['domain'].'</a>';?></td>
                        <td><?php echo $domain['status'];?></td>
                        <td><?php echo $domain['created'];?></td>
    					<td><?php echo $domain['user_id'];?></td>
    					<td><?php echo $domain['remark'];?></td>
    					<td><a href="javascript:audit(<?php echo $domain['id'].','.$domain['user_id'].',\''.$domain['domain'].'\'';?>)" class="icon-set">审核</a><a href="/admin.php?m=mgr/xintao/domains.delete&id=<?php echo $domain['id'];?>" class="icon-del">删除</a></td>
  					</tr>
	<?php }?>
<?php }else{?>
<tr><td colspan="7"><p class="no-data">搜索不到任何数据</p></td></tr>
<?php }?>
                </tbody>
			</table>
    	</div>
</div>
<script type="text/javascript">
var HtmlMode=['<form action="<?php echo URL('mgr/xintao/domains.save');?>" method="post"  name="changes-newlink" id="form1">',
				'	<div class="form-box">',
				'		<div class="form-row">',
                '  		  <label class="form-field">状态</label>',
                '   		 <div class="form-cont">',
                '      		  <input id="model1" class="ipt-radio" name="status" type="radio" value="1" rel="change">',
                '      		  <label for="model1">通过</label>',
                '       		 <input id="model2" class="ipt-radio" name="status" type="radio" value="2" checked="checked" rel="change">',
                '      		  <label for="model2">未通过</label>',
                '   		 </div>',
                '		</div>',
				'		<div class="form-row">',
            	'			<label for="name" class="form-field">备注</label>',
            	'			<div class="form-cont">',
            	'				<input id="J_DomainUserId" name="user_id" value="" type="hidden"><input id="J_DomainId" name="id" value="" type="hidden"><input id="J_Domain" name="domain" value="" type="hidden">',
            	'				<input id="remark" name="remark" class="ipt-txt" style="width:200px;" type="text" warntip="#remarkTip" value=""/><span class="tips-error hidden" id="remarkTip"></span>',
            	'			</div>',
            	'			<div class="form-cont" id="J_RemarkRadio">',
            	'				<input name="remark_radio" type="radio" value="您尚未到域名服务商配置当前域名cname(别名)指向www.xintaowang.com."/>CNAME',
            	'			</div>',            	
            	'		</div>',
                '    	<div class="btn-area">',
                '    		<a class="btn-general  highlight" id="pop_submit" href="#"><span>确定</span></a>',
                '    		<a class="btn-general" id="pop_cancel" href="#"><span>取消</span></a>',
                '    	</div>',
            	'	</div>',
                '</form>'].join('');             
  function audit(id,user_id,domain){
    Xwb.use('MgrDlg',{
		modeHtml:HtmlMode,
		formMode:true,
		valcfg:{
			form:'#form1',
			trigger: '#pop_submit'
		},
		dlgcfg:{
			onViewReady:function(View){
				$('#J_DomainUserId').val(user_id);
				$('#J_DomainId').val(id);
				$('#J_Domain').val(domain);
				var self=this;
				$(View).find('#pop_cancel').click(function(){
					self.close();
				});
				$('#J_RemarkRadio input[type="radio"][name="remark_radio"]').change(function(){
  					$('#remark').val($(this).val());
  				});
			},
			destroyOnClose:true,
			actionMgr:false,
			title:'审核独立域名'
		}
	})
  }
</script>
</body>
</html>
