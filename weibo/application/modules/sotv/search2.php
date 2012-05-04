<?php
/*****************************************************
 * 搜狐视频开放平台PHP5客户端
 * 
 * @version 0.1
 * @date 2011-06
 ******************************************************
/*
 * 测试程序
 */

# Initialise common code
$preIP = dirname( __FILE__ );

# Initialize config
require_once( "$preIP/includes/config.php" );

# Initialize config
require_once( "$preIP/includes/SoDefine.php" );

# Initialize SOHU util
require_once( "$preIP/includes/SoUtil.php" );

# Initialize connect
require_once( "$preIP/includes/SoConnect.php" );

# Initialize SOHU client
require_once( "$preIP/includes/SoClient.php" );


$AppKeys=new ApplicationKeys(CONSUMER_KEY,CONSUMER_SECRET);
$client = new SoClient($AppKeys);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />

				
			
			
<title>检索页</title>


<link type="text/css" rel="stylesheet" href="http://css.sohu.com/upload/global1.3.css" />
<link type="text/css" rel="stylesheet" href="upload/feilei110419/style.css" />
<link type="text/css" rel="stylesheet" href="skin/api.css" />

<script type="text/javascript" src="http://js.sohu.com/library/jquery1.4.2.js"></script> 


<script type="text/javascript">

//列表形态
var lvs = function(v, oldJson){
	var jq=jQuery;
	var rr = jq(".taglist");
	
	rr.each(function(){
		var ss = jq(this);
		if(v==2){
			ss.find("span")[0].className = "ltA";
			ss.find("span")[1].className = "lzB";
		}else{
			ss.find("span")[0].className = "ltB";
			ss.find("span")[1].className = "lzA";
		}
	});
}

jQuery(function(jq){
	//弹层
	function popFun(rid){
		var aEls = jQuery("#"+rid+" .vPic"), playPop;
		
		aEls.each(function(i){
			var els = jQuery(this);
			els.hover(function(){
				els.css("z-index",1000);
				playPop = setTimeout(function(){
					els.find(".popInfo").attr("style","display:block;");
				},600)
			},function(){
				clearTimeout(playPop);
				els.css("z-index",1);
				els.find(".popInfo").attr("style","display:none");
			});
		});
	}
	popFun("videoData");
	
	jq(".shLay").live("click", function(){
		jq("#seaKey").hide();
		jq(this).removeClass().addClass("hdLay");
	});
	jq(".hdLay").live("click", function(){
		jq("#seaKey").show();
		jq(this).removeClass().addClass("shLay");
	});
});

</script>

</head>
<body>


<?php

require_once( "./apinav.php" );

$key="";
if ( isset( $_REQUEST['key'] ))
        $key = $_REQUEST['key'];

if ( isset( $_REQUEST['c'] ))
        $c = $_REQUEST['c'];

$page = 1;
if ( isset( $_REQUEST['page'] ))
        $page = $_REQUEST['page'];

$pageSize = 20;
if ( isset( $_REQUEST['pageSize'] ))
        $pageSize = $_REQUEST['pageSize'];

if ( isset( $_REQUEST['tvType'] ))
        $tvType = $_REQUEST['tvType'];

if ( isset( $_REQUEST['cat'] ))
        $cat = $_REQUEST['cat'];

if ( isset( $_REQUEST['area'] ))
        $area = $_REQUEST['area'];

if ( isset( $_REQUEST['year'] ))
        $year = $_REQUEST['year'];


?>
<div class="blank12H"></div>



<div id="contentA" class="area">
	<div class="left">
		<div class="indexMenu bord clear">
			<h2><span>分类检索</span></h2>
			<ul>

				<li <?php if(isset($c) && $c == 1) echo "class=\"now\"";?>><a href="./search.php?c=1">电影</a></li>
				<li <?php if(isset($c) && $c == 2) echo "class=\"now\"";?>><a href="./search.php?c=2" >电视剧</a></li>
				<li <?php if(isset($c) && $c == 7) echo "class=\"now\"";?>><a href="./search.php?c=7" >综艺</a></li>
				<li <?php if(isset($c) && $c == 8) echo "class=\"now\"";?>><a href="./search.php?c=8" >纪录片</a></li>
				<li <?php if(isset($c) && $c == 13) echo "class=\"now\"";?>><a href="./search.php?c=13" >娱乐</a></li>
				<li <?php if(isset($c) && $c == 16) echo "class=\"now\"";?>><a href="./search.php?c=16" >动漫</a></li>
				<li <?php if(isset($c) && $c == 21) echo "class=\"now\"";?>><a href="./search.php?c=21" >教育</a></li>
				<li <?php if(isset($c) && $c == 24) echo "class=\"now\"";?>><a href="./search.php?c=24" >音乐</a></li>
				<li <?php if(isset($c) && $c == 1300) echo "class=\"now\"";?>><a href="./search.php?c=1300" >新闻</a></li>
				<li <?php if(isset($c) && $c == 1301) echo "class=\"now\"";?>><a href="./search.php?c=1301" >健康</a></li>
				<li <?php if(isset($c) && $c == 9001) echo "class=\"now\"";?>><a href="./search.php?c=9001" >播客</a></li>

			</ul>
		</div>
		
		
	</div>
    
    <div class="right">
		
<?php


$pagination = $client->search($page,$pageSize,$key);

 if($pagination!=null){

?>
		
		<div class="menuC">
			<p class="p">搜索"<span class="color1"><?php echo $key;?></span>"，共找到 <?php echo $pagination->count;?> 条结果</p>
			<div class="taglist">
				
			</div>
		</div>
				
		<div class="jsonPP clear" id="videoData">

<?php
$columnIndex = 0 ;
foreach($pagination->resultList as $vIndex=>$video){

	if($columnIndex % 4 ==0){echo "<div class=\"vData clear\">";}
?>					
					<div class="vInfo">
						<div class="vPic">
							<a href="<?php echo $client->getPlayLink($video->sid,$video->vid,$video->cid);?>" target="_blank">
							<img src="<?php echo $video->video_big_pic;?>" width="120" alt="" />
							</a>
							
							<div class="label"><i></i><em><?php echo $video->tip;?></em></div>
<?php 
	// 是否付费视频
	if(isset($video->fee) && $video->fee == 1){echo "<span class=\"payPos\"></span>";} 
?>
							<!--
							<span class="cq_ico"></span>
							-->
							<div style="display:none;" class="popInfo">
								<div class="popBG"></div>
								<div class="popLay">
									<h4><?php echo $video->tv_name;?></h4>
									<p>评分：<strong><?php echo round($video->tv_score,1);?>分</strong></p>
									
									<p><?php echo SoUtil::utf8Substr($video->tv_desc,0,110);?>...<a href="<?php echo $client->getPlayLink($video->sid,$video->vid,$video->cid);?>" target="_blank">[详细]</a></p>
								</div>
							</div>
						</div>				
						<div class="vTxt">
							<h4>
							<a href="<?php echo $client->getPlayLink($video->sid,$video->vid,$video->cid);?>" target="_blank"><?php echo $video->tv_name;?></a></h4>		
							
							<?php echo !empty($video->main_actor)?("<p>主演：".$video->main_actor."</p>"):"";?>
							<?php 
								if(isset($video->cid) && $video->cid == 16){
									// 动漫
									echo !empty($video->director)?("<p>年龄：".$video->director."</p>"):"";
								}else if(isset($video->cid) && $video->cid == 9001){
									// 播客
									echo !empty($video->tv_source)?("<p>播主：".$video->tv_source."</p>"):"";
								}else
									echo !empty($video->director)?("<p>导演：".$video->director."</p>"):"";
							?>

							<p>总播放：<em><?php echo $video->tv_play_count;?>次</em></p>
						</div>
					</div>						
<?php
	if(++$columnIndex % 4 ==0){echo "</div>";}
 }
 // 补齐</div>
 if($columnIndex > 0 && $columnIndex % 4 !=0){echo "</div>";}

?>

		</div>
		<div class="jumpB clear">
<?php

echo SoUtil::getPageTag($page , $pagination->count , "./search2.php?key=".$key."&page=#pg#" , $pageSize , true , true );
?>	
		</div>


<?php
 } // End of pagination 
		 ?>
		 </div>
	
</div>

<?php 
	require_once( "./apifooter.php" );
?>
</body>
</html>