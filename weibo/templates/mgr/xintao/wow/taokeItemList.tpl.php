<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>商品管理 - 商品分享 - 推广管理</title>
<link href="http://static.xintaowang.com/css/admin/admin.css" rel="stylesheet" type="text/css" />
<script src="<?php echo W_BASE_URL;?>js/jquery.min.js"></script>
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/admin/admin_lib.js"></script>
<script src="<?php echo W_BASE_URL;?>js/admin-all.js"></script>
<script type="text/javascript">
var XT_IS_WOW=true,XT_IS_WEIBO=<?php echo XT_IS_WEIBO=='true'&&XT_FREE_DATELINE==''?'true':'false'?>;
</script>
<script src="<?php echo W_BASE_URL;?>js/xintao/wowtaokeitem.js?v=20111216"></script> 
<style>
.search-area .search-block .s-btn, .btn-login, .btn-launch-event, .btn-ffirm, .select-user .click-btn, .search-host {background: url(http://static.xintaowang.com/css/default/bgimg/skin_btn.png) no-repeat;}
.mod-search {padding:0 0 15px; height:109px;}
.search-area {padding:16px 0 0 10px; }
.search-area .search-block { position:relative;height:42px; padding-left:5px; background-position:0 0; }
.search-area .search-inner { padding-right:104px; _padding-right:102px; height:100%;  background-position:right -47px; }
.search-area .search-block .input-txt { width:100%; border:1px solid #ccc;color:#999;font-family:inherit;font-size:14px;height:28px;line-height:22px; padding:3px 0 0 5px; margin:5px 0 0 ;_width:98.5%;}
.search-area .search-block .s-btn{ position:absolute; right:6px; top:5px; height:32px; width:86px; background-position:0 -48px;
 text-indent:-9999px;line-height:0;vertical-align:top;outline:none;cursor:pointer;}
.search-area .search-block .s-btn:hover {background-position:-103px -48px;}
.search-area .search-field .ico-join { padding-left:23px;background-position:0 -886px;}
.search-area .search-field .ico-follow { padding-left:20px;}
.search-area .search-field { margin-right:15px;padding:6px 0 0 10px;overflow:hidden;}
.search-area .search-field label { margin-right:17px; *margin-right:12px;}
.search-area .search-field input { margin-right:3px;  *margin-top:-5px;vertical-align:-2px; }
.search-area .search-field span { float:right; margin-left:15px;}
.search-area .cate-bar { height:24px; padding-left:10px; overflow:hidden;}
.search-area .cate-bar span { float:left; height:24px; margin-right:13px; line-height:24px; }
.search-area .cate-bar span a { font-size:12px; }
.search-result {margin:50px 0;padding-left:30px;}
.search-result p {font-size:13px;margin-left:50px;padding-top:12px;}
.win-item .win-box{padding:0px;}.win-item .box{padding-left:0px;}
.win-item select {vertical-align: middle;padding: 0px;margin: 0px;}
.loading{ margin:15px auto 20px; width:20px; height:20px; background:url(http://static.xintaowang.com/css/default/bgimg/loading.gif) no-repeat;}
#recordList li{position:relative;}
#recordList li a.item-title{display:block;overflow:hidden;height:20px;width:340px;}		
</style>
<link href="http://static.xintaowang.com/assets/min/xintao.min.css" rel="stylesheet" type="text/css" />
</head>
<body class="main-body">
	<div class="path"><p>当前位置：推广管理<span>&gt;</span>商品分享</p></div>
    <div  class="main-cont" style="padding-left:10px;">
		<h3 class="title"><a href="<?php echo URL('mgr/xintao/wowMgr.itemCatList')?>">返回分类列表</a>　　<a href="#" rel="e:openTaokeItem" class="btn-general"><span>添加商品</span></a><?php
if (!empty ($cats)) {
	echo '<select id="J_WowCat">';
	foreach ($cats as $row) {
		echo '<option ' . ($cat == $row['id'] ? 'selected' : '') . ' value="' . $row['id'] . '">' . (empty ($row['title']) ? ('分类[' . $row['id'] . ']') : $row['title']) . '</option>';
	}
	echo '</select>';
}
?>　　　　每个分类最多添加200个商品!系统每天自动更新商品最新信息</h3>
	 	<div class="search-area ">
			<p class="filter" id="J_WowFilter"><label>有效性：</label><a href="#" class="current" data-value="">全部</a>|<a href="#" data-value="1">有效</a>|<a href="#" data-value="0">无效</a></p>
		</div>
        <table width="100%" border="0" cellpadding="0" cellspacing="0" class="table">
            <colgroup>
            	<col class="w50" />
                <col style="width:400px;"/>
                <col/>
            </colgroup>
            <thead class="tb-tit-bg">
                <tr>
                	<th><div class="th-gap"><a href="#" rel="e:deleteTaokeItem">删除</a></div></th>
                    <th><div class="th-gap">商品详情</div></th>
                    <th><div class="th-gap">分享内容</div></th>
                </tr>
            </thead>
            <tfoot class="td-foot-bg">
                <tr>
                    <td colspan="3">
                        <div class="pre-next">

                        </div>
                    </td>
                </tr>
            </tfoot>
            <tbody id="recordList">

            </tbody>
        </table>
    </div>
</body>	
<script type="text/javascript">
$(function(){
	$.get('/admin.php?m=mgr/xintao/wowMgr.synWowTaokeItemCat');
})
</script>
</html>
