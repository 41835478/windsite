<?php


/**
 * 凡客分类列表模块模板
 * 需要参数参见component_94_pls
 * @version $Id$
 */
if (!defined('IN_APPLICATION')) {
	exit ('ACCESS DENIED!');
}
$params = $mod['param'];
//生成查询参数(已经由95传入)
?>
<!--<div class="searchdiv ks-clear">
    <div id="bottomsearch">
        <span class="searchinput"><input id="q" name="q" maxlength="25" type="text" value="<?php echo $params['q'];?>" autocomplete="off" class="ac_input"></span>
        <span class="searchbtn"><input id="btnSearch" type="button"></span>
    </div>
</div>-->
<div class="search-nav"><ul class="crumbs" id="J_VanclCrumbs"><li class="list-item" data-id="0"><a href="<?php echo URL('vancls',array('cid'=>0))?>">所有分类</a></li>
<?php 
if(!empty($cat)){
		$paths = json_decode($cat['path'], TRUE);
		if(count($paths)>0){
			foreach($paths as $row){
				echo '<li class="list-item"><a href="'.URL('vancls',array('cid'=>$row['n'])).'">'.$row['v'].'</a></li>';
			}
		}
		echo '<li class="list-item" data-id="'.$cat['id'].'">'.$cat['name'].'</li>';
	}
?>
找到相关宝贝<em><?php echo $params['total_results'];?></em>件</ul><div class="blank0"></div></div>
<?php if(count($cats)>0){?>
<div class="selectarea" style="border-top-width:0px;border-bottom-width:0px;">
    <div class="typearea">
	    <div class="selectareali" row="1" style="background:none;" id="">
	        <span class="blank5"></span>
	        <div class="selectareaRight">
	            <ul>
	            <?php

$urlTemp = URL('vancls', array (
	'cid' => 'CID'
));
foreach ($cats as $row) {
	$url = str_replace('CID', $row['id'], $urlTemp);
	echo '<li><a href="' . $url . '">' . $row['name'] . '<span>(' . $row['nums'] . ')</span></a></li>';
}
?>
	            </ul>
	        </div>
	        <span class="blank5"></span>
	    </div>
    </div>
</div>
<?php }?>