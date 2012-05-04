<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>分类列表 - 商品分享 - 营销管理</title>
<link href="<?php echo W_BASE_URL;?>css/admin/admin.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/jquery.min.js"></script>
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/admin/admin_lib.js"></script>
<script src="<?php echo W_BASE_URL;?>js/admin-all.js"></script>
<script type="text/javascript">
</script>
</head>
<body id="star-catlist" class="main-body">
	<?php if(!(XT_IS_WEIBO=='true'&&XT_FREE_DATELINE=='')){ echo ('<div id="J_NoTaoke" style="padding:10px;padding-left:30px;height:45px;background:url(http://www.xintaowang.com/css/default/xintao/360/Mainbanner_Danger.png) repeat-x;"><div style="padding:10px;padding-left:60px;height:20px;background:url(http://www.xintaowang.com/css/default/xintao/360/Error_L.png) no-repeat;color:#B11506;font-size:16px;font-weight:700;">您尚未订购淘客/卖家服务，无法自主挑选商品分享，<a href="#" rel="e:openAppstore">立刻订购？</a></div></div>'); }?>
	<div class="path"><p>当前位置：营销管理<span>&gt;</span>商品分享<span>&gt;</span>分类列表</p></div>
    <div class="main-cont">
        <h3 class="title"><?php echo (XT_IS_WEIBO=='true'&&XT_FREE_DATELINE=='')?'<a href="http://'.XT_SITE_DOMAIN.'/wow.item" target="_blank">查看分享频道</a>':'<a href="http://t.xintaowang.com/wow.item" target="_blank">查看分享演示</a>　<a href="#" rel="e:openAppstore">订购淘客/卖家服务</a>';?>　　只有配置了分类名称，且添加了商品，设置为启用的分类才会显示在站点分享中!</h3>
		<div class="set-area">
				<?php if(XT_IS_WEIBO=='true'&&XT_FREE_DATELINE==''){?>
				<form id="sortfrm" method="post" action="<?php echo URL('mgr/xintao/wowMgr.updateTaokeItemCatSort'); ?>">
            	<table  class="table" cellpadding="0" cellspacing="0" width="100%" border="0">
            		<colgroup>
                        <col class="w50" />
                        <col style="width:300px" />
                        <col class="w200" />
    					<col class="w80" />
    					<col class="w50" />
                        <col/>
    				</colgroup>
                    <thead class="tb-tit-bg">
  						<tr>
                            <th><div class="th-gap">编号</div></th>
                            <th><div class="th-gap">分类名称</div></th>
                            <th><div class="th-gap">排序值</div></th>
                            <th><div class="th-gap">商品数量</div></th>
                            <th><div class="th-gap">启用</div></th>
                            <th><div class="th-gap">操作</div></th>
  						</tr>
                	</thead>
                	<tfoot class="td-foot-bg">
                    	<tr>
                    		<td colspan="6">
                                <a href="#" id="J_ItemCatSubmit" class="btn-general"><span>批量修改</span></a>
                            </td>
                   		</tr>
                    </tfoot>
                    <tbody id="recordList">
                    	<?php if (empty($list)) {?>
                    	<tr>
                    		<td colspan="6">
                            	<p class="no-data">没有数据</p>
                            </td>
                   		</tr>
                   		
						<?php } else { foreach($list as $value): ?>
                        <tr>
                            <td>
                                <input type="hidden" name="data[<?php echo $value['id']; ?>][id]" value="<?php echo $value['id']; ?>" />
                                <?php echo $value['id']; ?>
                            </td>
                            <td>
                                <input type="text" class="ipt-txt w150" vrel="sz=max:4,min:0,m:0-4个汉字,ww" warntip="#titleErr_<?php echo $value['id']; ?>" name="data[<?php echo $value['id']; ?>][title]" value="<?php echo htmlspecialchars($value['title']); ?>" />
                                <span class="tips-error hidden" id="titleErr_<?php echo $value['id']; ?>"></span>
                            </td>
                            <td>
                                <input type="text" class="ipt-txt w30" vrel="bt=min:0,max:10,m:范围为0-10|int=m:只能输入数字" warntip="#sortOrderErr_<?php echo $value['id']; ?>" name="data[<?php echo $value['id']; ?>][sortOrder]" value="<?php echo (int)$value['sortOrder']; ?>" />
                                <span class="tips-error hidden" id="sortOrderErr_<?php echo $value['id']; ?>"></span>
                            </td>
                            <td>
                                <?php echo $value['nums']; ?>
                            </td>
                            <td>
                                <input type="checkbox" class="w30" name="data[<?php echo $value['id']; ?>][isValid]" value="1" <?php echo $value['isValid'] ? 'checked' : ''; ?> />
                            </td>
                            
                            <td><a href="<?php echo URL('mgr/xintao/wowMgr.taokeItemList', array('id'=>$value['id'])); ?>" class="icon-set">商品管理</a></td>
                        </tr>
						<?php endforeach; } ?>
                    </tbody>
                </table>
                </form>
                <?php }else{echo '<img src="http://img04.taobaocdn.com/imgextra/i4/71614142/T2mdCiXh4XXXXXXXXX_!!71614142.png">';}?>
        </div> 
    </div>
</body>
<script type="text/javascript">
$(function(){
new Validator({
				form : '#sortfrm',
				trigger : '#J_ItemCatSubmit'
			});	
});
</script>
</html>
