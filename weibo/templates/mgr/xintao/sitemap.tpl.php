<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>自动营销  - 基础设置 - 系统设置</title>
<link href="<?php echo W_BASE_URL;?>css/admin/admin.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/jquery.min.js"></script>
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/admin/admin_lib.js"></script>
<script src="<?php echo W_BASE_URL;?>js/admin-all.js"></script>
<script type='text/javascript'>
var CIDS = '<?php echo !empty($sitemap['cids'])?$sitemap['cids']:''?>';
var TABS = '<?php echo V('g:tab',XT_IS_SELLER=='true'?'products':'cids')?>';
var HtmlMode=['<form action="<?php echo URL('mgr/xintao/sitemap.keywordsUpload');?>" method="post" id="J_SiteMap_KeywordsUploadForm" enctype="multipart/form-data">',
				'	<div class="form-box" style="height:200px;">',
				'		<p class="tips-desc" style="padding-bottom:5px;">提示:上传新的关键词文件,将覆盖旧的关键词,最多提取前100个关键词!</p>',
				'		<p class="tips-desc" style="padding-bottom:5px;">第一步：进入<a href="http://taoke.alimama.com/spreader/searchKeywords.htm" target="_blank">关键词中心</a></p>',
				'		<p class="tips-desc" style="padding-bottom:5px;">第二步：挑选关键词，导出CSV</p>',
				'		<p class="tips-desc" style="padding-bottom:5px;">第三步：上传->完成</p>',				
				'		<div class="form-row">',
            	'			<label for="name" class="form-field">xls文件：</label>',
            	'			<div class="form-cont">',
            	'				<input type="file" warntip="#keywordsErr" vrel="ne=m:不能为空|file=m:请选择关键词xls文件,type:xls" name="keywords_xls" id="keywords_xls">',
            	'				<span class="tips-error hidden" id="keywordsErr"></span>',
            	'			</div>',           	
            	'		</div>',
                '    	<div class="btn-area">',
                '    		<a class="btn-general  highlight" id="J_SiteMap_KeywordsUploadConfirmBtn" href="#"><span>确定上传</span></a>',
                '    	</div>',
            	'	</div>',
                '</form>'].join('');
</script>
<script type="text/javascript" src="<?php echo W_BASE_URL;?>js/xintao/sitemap.js"></script>
<script src="<?php echo W_BASE_URL;?>js/admin/jquery-ui-1.8.16.sortable.min.js"></script>
<link type="text/css" rel="stylesheet" href="http://www.xintaowang.com/css/default/xintao/category.css" media="screen" />
<style type="text/css">
.form-box{height:380px;}
.form-cids .cid-searchInput {margin-left:200px;float:left;background: url(http://www.xintaowang.com/css/default/xintao/taobao/T1kehZXkFiXXXXXXXX-290-24.png) no-repeat scroll 0 0 transparent;border: 0 none;color: #666;font-size: 12px;height: 22px;line-height: 24px;overflow: hidden;padding-left: 5px;width: 160px;}
.form-cids .form-cids-search a {float:left;background: url(http://www.xintaowang.com/css/default/xintao/taobao/T13QJ6XotAXXXXXXXX-50-140.png) no-repeat scroll 0 0 transparent;color: white;display: block;height: 22px;padding-top: 2px;text-align: center;top: 0;width: 50px;text-decoration: none;cursor: pointer;}
#J_SiteMap_KeywordsForm li{margin-right:20px;margin-bottom:5px;float:left;}	
</style>
</head>
<?php $cats = F('top.getRootCat');?>
<?php $posterCats = F('top.posterChannelsGet');?>
<?php $sotvs = V('-:sotv');?>
<body class="main-body">
	<div class="path"><p>当前位置：系统设置<span>&gt;</span>站点地图</p></div>
    <div class="main-cont">
    	<h3 class="title">网站地图设置(建议绑定自己的独立域名，请根据自己站点的收录情况，适时调整站点地图配置)</h3>
    	<div class="tab-box">
			<h5 class="tab-nav tab-nav-s1 clear" id="sitemap-type">
				<a class="current<?php echo XT_IS_SELLER=='true'?'':' hidden'?>" data-value="products"><span>官方店铺</span></a>
				<a data-value="cids"><span>类目地图</span></a>
				<a data-value="items"><span>商品地图</span></a>
				<a data-value="posters"><span>画报地图</span></a>
				<a data-value="shops"><span>店铺地图(<strong style="color:red">即将开放</strong>)</span></a>
				<a data-value="tvs"><span>影视地图</span></a>
				<a data-value="keywords"><span>关键词地图</span></a>
				<a data-value="weibos"><span>微博地图(<strong style="color:red">即将开放</strong>)</span></a>
			</h5>
			<div class="tab-con-s1" id="sitemap-tabs">
				<!-- tab内容 -->
				<div class='tab hidden' <?php echo XT_IS_SELLER=='true'?'':'style="display:none"'?>>
					<div class="main-cont">
						<h3 class="title">官方店铺设置(每天根据您的配置更新您的淘宝店铺所有商品列表，目前提供您的淘宝店铺的<strong style="font-size:16px;color:red">所有</strong>商品显示)</h3>
						<div class="form-box" style="height:500px;">	
							<form id="J_SiteMap_ProductsForm" action="<?php echo URL('mgr/xintao/sitemap.update');?>" method="post">
								<input type="hidden" name="type" value="products">
								<?php
$isProducts = false;
if (!empty ($sitemap['products'])) {
	$isProducts=true;
	$params = json_decode($sitemap['products'], true);
	TPL :: module('xintao/sitemap/productsEdit', array (
		'params' => $params
	));
} else {
	TPL :: module('xintao/sitemap/products');
}
?>
								<div class="btn-area">
						            <a class="btn-general highlight" href="#" id="J_SiteMap_ProductsSubmitBtn"><span>确定</span></a>
						            <a <?php echo $isProducts?'':'onclick="alert(\'请先保存!\');return false;"'?> class="btn-general" href="http://<?php echo XT_SITE_DOMAIN?>/sitemap" target="_blank"><span>保存后可预览</span></a>
						        </div>
							</form>
						</div>	
					</div>
				</div>
				<div class="tab hidden ">
					<div class="main-cont">
						<h3 class="title">分类地图设置【推广得佣金】(每天根据您的配置更新推广分类下的商品列表，目前最多支持<strong style="font-size:16px;color:red">100</strong>个分类显示)</h3>
						<div class="btn-group clear" style="padding-bottom:10px;">
							<a class="btn-general highlight" href="#" rel="e:openCids"><span style="color:red;font-weight:bold;">添加新的商品分类</span></a>
							<a <?php echo !empty($sitemap['cids'])?'':'onclick="alert(\'请先保存!\');return false;"'?> class="btn-general" href="http://<?php echo XT_SITE_DOMAIN?>/sitemap<?php echo (XT_IS_SELLER=='true'?'.cat':'')?>" target="_blank"><span>预览</span></a>
						</div>	
						<div class="cate-container" id="J_SiteMap_CateContainer" style="margin-bottom:15px;display:none">
    						<div id="cate-cascading">
	       						<div class="cc-listwrap">
	       							<ol id="J_OlCascadingList" class="cc-list" style="width: 2000em;position: absolute;left: 0;top: 0">
	       								<li class="cc-list-item">
	       									<div class="cc-cbox">
	       										<ul class="cc-cbox-cont" data-value="0">
	       											<?php
foreach ($cats as $cat) {
	if ($cat['is_parent']) {
		echo '<li data-value="' . $cat['cid'] . '" class="cc-cbox-item cc-hasChild-item">' . $cat['name'] . '<a href="#" class="btn_add" data-value="' . $cat['cid'] . '">添加</a></li>';
	} else {
		echo '<li data-value="' . $cat['cid'] . '" class="cc-cbox-item">' . $cat['name'] . '<a href="#" class="btn_add" data-value="' . $cat['cid'] . '">添加</a></li>';
	}
}
?>
	       										</ul>
	       									</div>
	       								</li>
	       								<li class="cc-list-item">
	       									<div class="cc-cbox">
	       										<ul class="cc-cbox-cont" data-value="1">
	       										</ul>
	       									</div>
	       								</li>
	       								<li class="cc-list-item">
	       									<div class="cc-cbox">
	       										<ul class="cc-cbox-cont" data-value="2">
	       										</ul>
	       									</div>
	       								</li>
	       								<li class="cc-list-item" style="width:222px;">
	       									<div class="cc-cbox">
	       										<div class="cc-cbox-filter" style="width:100%;height:22px;">
	       											<label for="cc-cbox-filter267" style="padding-left:15px;">已添加<strong style="color:red;font-size:16px;" id="J_SiteMap_AddedCount"></strong>，已选择<strong style="color:red;font-size:16px;" id="J_SiteMap_SelectededCount"></strong>，<a href="#" id="J_SiteMap_CidsConfirm">确认添加</a></label>
	       										</div>
	       										<ul class="cc-cbox-cont" style="margin-top:26px;" id="J_SiteMap_CidsSelected">
	       										</ul>
	       									</div>
	       								</li>
	       							</ol>
	       						</div>
    						</div>
						</div>
						<table class="table" cellpadding="0" cellspacing="0" width="100%" border="0">
			            	<colgroup>
			            			<col class="w80"/>
									<col class="w100"/>
			                        <col class="w300" />
			    					<col />
			    			</colgroup>
			                <thead class="tb-tit-bg">
			  					<tr>
			  						<th><div class="th-gap"><input type="checkbox" id="J_SiteMap_Cats_All">全选</div></th>
			    					<th><div class="th-gap">拖动排序</div></th>
			    					<th><div class="th-gap">名称</div></th>
			    					<th><div class="th-gap">操作</div></th>
			  					</tr>
			                </thead>
			                <tfoot class="tb-tit-bg"><tr><td colspan="4"><a class="icon-del" href="#" id="J_SiteMap_SelectedDel"> 删除所选</a>&nbsp;&nbsp;<a class="icon-set" href="#" id="J_SiteMap_SaveSort"> 保存排序</a>&nbsp;&nbsp;您最多可以添加100个淘宝商品分类</td></tr></tfoot>
			                <tbody id="J_SiteMap_Cats">
			                <tr><td colspan=4><?php echo empty($sitemap['cids'])?'类目地图为空...':'正在加载中...'?></td></tr>
			                </tbody>
						</table>
					 </div>
				</div>
				<div class='tab hidden' >
					<div class="main-cont">
						<h3 class="title">商品地图设置【推广得佣金】(每天根据您的配置更新推广商品列表，目前最多支持<strong style="font-size:16px;color:red">4000</strong>个商品显示)</h3>
						<div class="form-box" style="height:500px;">	
							<form id="J_SiteMap_ItemsForm" action="<?php echo URL('mgr/xintao/sitemap.update');?>" method="post">
								<input type="hidden" name="type" value="items">
								<?php

$isItems=false;
if (!empty ($sitemap['items'])) {
	$isItems=true;
	$params = json_decode($sitemap['items'], true);
	TPL :: module('xintao/sitemap/itemsEdit', array (
		'params' => $params,
		'cats' => $cats
	));
} else {
	TPL :: module('xintao/sitemap/items', array (
		'cats' => $cats
	));
}
?>
								<div class="btn-area">
						            <a class="btn-general highlight" href="#" id="J_SiteMap_ItemsSubmitBtn"><span>确定</span></a>
						            <a <?php echo $isItems?'':'onclick="alert(\'请先保存!\');return false;"'?> class="btn-general" href="http://<?php echo XT_SITE_DOMAIN?>/sitemap.item" target="_blank"><span>保存后可预览</span></a>
						        </div>
							</form>
						</div>	
					</div>
				</div>
				<div class='tab hidden' >
					<div class="main-cont">
						<h3 class="title">画报地图设置【推广得佣金】(每天根据您的配置更新推广画报列表，目前最多支持<strong style="font-size:16px;color:red">2000</strong>个画报显示)</h3>
						<div class="form-box" style="height:500px;">	
							<form id="J_SiteMap_PostersForm" action="<?php echo URL('mgr/xintao/sitemap.update');?>" method="post">
								<input type="hidden" name="type" value="posters">
								<?php

$isPosters=false;
if (!empty ($sitemap['posters'])) {
	$isPosters=true;
	$params = json_decode($sitemap['posters'], true);
	TPL :: module('xintao/sitemap/postersEdit', array (
		'params' => $params,
		'posterCats' => $posterCats
	));
} else {
	TPL :: module('xintao/sitemap/posters', array (
		'posterCats' => $posterCats
	));
}
?>
								<div class="btn-area">
						            <a class="btn-general highlight" href="#" id="J_SiteMap_PostersSubmitBtn"><span>确定</span></a>
						            <a <?php echo $isPosters?'':'onclick="alert(\'请先保存!\');return false;"'?> class="btn-general" href="http://<?php echo XT_SITE_DOMAIN?>/sitemap.poster" target="_blank"><span>保存后可预览</span></a>
						        </div>
							</form>
						</div>	
					</div>
				</div>
				<div class='tab hidden' >
					<div class="main-cont">
					即将开放
					</div>
				</div>
				<div class='tab hidden' >
					<div class="main-cont">
						<h3 class="title">影视地图设置【推广得佣金】(每天根据您的配置更新推广影视列表，目前最多支持<strong style="font-size:16px;color:red">4000</strong>个影视显示)</h3>
						<div class="form-box" style="height:500px;">	
							<form id="J_SiteMap_TvsForm" action="<?php echo URL('mgr/xintao/sitemap.update');?>" method="post">
								<input type="hidden" name="type" value="tvs">
								<?php

$isTvs=false;
if (!empty ($sitemap['tvs'])) {
	$isTvs=true;
	$params = json_decode($sitemap['tvs'], true);
	TPL :: module('xintao/sitemap/tvsEdit', array (
		'params' => $params,
		'sotvs' => $sotvs
	));
} else {
	TPL :: module('xintao/sitemap/tvs', array (
		'sotvs' => $sotvs
	));
}
?>
								<div class="btn-area">
						            <a class="btn-general highlight" href="#" id="J_SiteMap_TvsSubmitBtn"><span>确定</span></a>
						            <a <?php echo $isTvs?'':'onclick="alert(\'请先保存!\');return false;"'?> class="btn-general" href="http://<?php echo XT_SITE_DOMAIN?>/sitemap.tv" target="_blank"><span>保存后可预览</span></a>
						        </div>
							</form>
						</div>	
					</div>
				</div>
				<div class='tab hidden' >
					<div class="main-cont" style="padding-left:0px;padding-right:0px;">
					<h3 class="title">关键词地图设置【推广得佣金】(目前最多支持<strong style="font-size:16px;color:red">100</strong>个关键词显示)，关键词参考地址：<a href="http://taoke.alimama.com/spreader/searchKeywords.htm" target="_blank">关键词中心</a>　</h3>
						<div class="form-box" style="height:850px;">	
							<form id="J_SiteMap_KeywordsForm" action="<?php echo URL('mgr/xintao/sitemap.update');?>" method="post">
								<div class="btn-group clear" style="padding-bottom:10px;">
									<a class="btn-general highlight" href="#" id="J_SiteMap_KeywordsUploadBtn"><span>上传关键词</span></a>
									<a class="btn-general highlight" href="#" id="J_SiteMap_KeywordsSubmitBtn"><span>保存</span></a>
						            <a <?php echo !empty ($sitemap['keywords'])?'':'onclick="alert(\'请先保存!\');return false;"'?> class="btn-general" href="http://<?php echo XT_SITE_DOMAIN?>/sitemap.keyword" target="_blank"><span>保存后可预览</span></a>
								</div>
								<input type="hidden" name="type" value="keywords">
								<?php

$isKeywords=false;
if (!empty ($sitemap['keywords'])) {
	$isKeywords=true;
	$params = json_decode($sitemap['keywords'], true);
	TPL :: module('xintao/sitemap/keywordsEdit', array (
		'keywords' => $params
	));
} else {
	TPL :: module('xintao/sitemap/keywords');
}	

?>

							</form>
						</div>	
					</div>
				</div>
				<div class='tab hidden' >
					<div class="main-cont">
					即将开放
					</div>
				</div>
			</div>
		</div>		
	</div>
</body>
</html>
