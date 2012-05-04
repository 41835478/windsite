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

# Initialize define
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
<!doctype html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"><head>

<!-- 声明全局属性，JSP代码开始-->



<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />

<meta name="description" content="" />
<meta name="robots" content="all" />

<script src="http://www.sohu.com/sohuflash_1.js" type="text/javascript"></script>
<link type="text/css" rel="stylesheet" href="upload/global1.3.css" />
<link type="text/css" rel="stylesheet" href="upload/zjcss100707/style.css" />
<link type="text/css" rel="stylesheet" href="skin/api.css" />



</head>
<body>



<?php

require_once( "./apinav.php" );

?>

<?php
$sid = 0 ; 
if ( isset( $_REQUEST['sid'] ))
        $sid = $_REQUEST['sid'];

$vid = 0 ; 
if ( isset( $_REQUEST['vid'] ))
        $vid = $_REQUEST['vid'];

if($sid <= 0 && $vid > 0 ){
	$subVideoSet = $client->getSetInfoByVid($vid);
	if($subVideoSet != NULL){
		$sid = $subVideoSet->sid;
	}
}

$video = $client->getSetInfo($sid);

if($video == NULL){
	echo " 视频不存在 。";
	exit;
}
?>

<title><?php echo $video->tv_name;?>-高清正版在线观看-搜狐视频</title>

<div class="area" id="contentA">
	<div class="left">
		<div class="blockLA clear">



<!-- 专辑信息介绍栏 -->
<div id="infoId">
   

     <div class="title">
        <div class="l">
       	 <strong><?php echo $video->tv_name;?></strong>
       </div>

         <div class="r pscore"></div>
    </div>

    <div class="info clear">
        <div class="l">
			<img height=90 width=120 src="<?php echo $video->video_big_pic;?>">

         </div>

         <div class="r">
	 <dl>
	    <dt>
	     年份： <?php echo $video->tv_year;?>

         	    </dt>
			
	    <dd>
	    类型：
	       <em><?php echo $video->tv_year;?></em>
	       </dd>

	   </dl>
		
	    <dl>
                  <dt>
		导演：<?php echo $video->director;?>

	       </dt>
                          
                  <dd>
		 主演：<?php echo $video->main_actor;?>

	         </dd>

                </dl>
	      	<dl>
                     <dt class="pcount"></dt>
                </dl>		
	       <p>
                      <span id="infoL" style="display:none"><?php echo $video->tv_desc;?></span>

                       <span id="infoS"><?php echo SoUtil::utf8Substr($video->tv_desc,0,200);?>...</span>

                      <span id="infoC" class="shTxt">
                            <a href="javascript:void(0)">展开全部</a>
                       </span>

                                            		
                  </p>

		
	</div>
      </div>
   		
</div>


<?php

$page = 1 ; $pageSize = 20;
if ( isset( $_REQUEST['page'] ))
        $page = $_REQUEST['page'];
if ( isset( $_REQUEST['pageSize'] ))
        $pageSize = $_REQUEST['pageSize'];

$pagination = $client->getSetList($sid,$page,$pageSize);

 if($pagination!=null){

?>

<div class="menu clear">

   <div id="tagsID" class="l">
<?php
echo "共".$pagination->count."集 ";

$cnt = count($pagination->resultList); // 当前分集数
$idx = 0;
$pageIdx = 1; 
while($idx < $pagination->count){
	echo "<a href=\"./album.php?sid=".$sid."&page=".$pageIdx."\"";
	if($page == $pageIdx){
		echo "class=\"now\"";
	}
	echo ">".($idx+1)."-".(($idx+$pageSize)<=$pagination->count?($idx+$pageSize):$pagination->count)."</a>&nbsp;";
	$idx += $pageSize;
	$pageIdx += 1 ;
}
?>

   </div>


</div>
<div id="similarLists" class="pp">
<!-- 分集开始 --> 
<?php
	 echo "<ul>  ";
	foreach($pagination->resultList as $vIndex=>$video){
?>
	
	
<li>

<a target=_blank href="<?php echo $client->getPlayLink($video->sid,$video->tv_ver_id,$video->cid);?>"><img height=90 width=120 alt="<?php echo $video->tv_name;?>" src="<?php echo $video->video_big_pic;?>" >  </a><span><a target=_blank href="<?php echo $client->getPlayLink($video->sid,$video->tv_ver_id,$video->cid);?>" >  <?php echo $video->tv_name;?> </a>

<em>时长：<?php echo SoUtil::getTimes($video->time_length);?></em>

</span></li>


<?php
	}
	 echo "</ul>  ";
?>
</div>

<?php
 }
?>


<!-- 分集结束 --> 

<script type="text/javascript" src="http://js.sohu.com/library/jquery1.4.2.js"></script>
	<script type="text/javascript">	

			

			jQuery(function(jq){
				var introEls = jQuery("#infoId .info .r p");
                jQuery("#infoC").toggle(function(){
                        jQuery("#infoL").show();
                        jQuery("#infoS").hide();
                        jQuery(this).removeClass('shTxt');
                        jQuery(this).addClass('opTxt');
                        jQuery(this).find('a').text('收起内容');
                    },
                    function(){
                        jQuery("#infoS").show();
                        jQuery("#infoL").hide();
                        jQuery(this).removeClass('opTxt');
                        jQuery(this).addClass('shTxt');
                        jQuery(this).find('a').text('展开全部');
                    }
                );
			});
			
			</script>
	
			
			
		</div>

	</div>
	<div class="right">
               
		

	

		
		
		
		<div class="blockRB clear">
			
<!-- 右侧内容 -->
        </div>

		
		
	</div>
    <div class="footer"></div>
</div>
<div class="blank12H"></div>

<?php 
	require_once( "./apifooter.php" );
?>

</body></html>
