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
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<title>综合首页</title>
<link type="text/css" rel="stylesheet" href="http://tv.sohu.com/upload/tv110421/main.css" />
<link type="text/css" rel="stylesheet" href="http://tv.sohu.com/upload/tv110421/pd.css" />

<link type="text/css" rel="stylesheet" href="skin/api.css" />
</head>
<body>


<?php
require_once( "./apinav.php" );
?>
<div class="blank12H"></div>
<div id="mFocus1" class="fi_movie area"></div>
<div class="blank12H"></div>
<!-- Start:contentA -->
<div class="area" id="contentA">
    <div class="bordA blockA clear">
        <div class="title">
            <div class="t"><div class="hisHot r">
			<!--
			<span>热点：&nbsp;
			<a target="_blank" href="./search2.php?key=%E8%88%AA%E6%AF%8D">航母</a> <a target="_blank" href="./search2.php?key=%E5%AE%B6%E7%9A%84N%E6%AC%A1%E6%96%B9" title="">家的N次方</a></span>
			-->
			</div>
			
			<span id="dataId" class="color1">
<?php
	$week= array('日','一','二','三','四','五','六');
	echo date('Y年m月d日').' 星期'.$week[date('w')];
?>
			</span>
			
			</div>
        </div>
        <div class="cont clear">
            <div class="bL l">
<?php
$videos = $client->getTop("news/focus");
foreach($videos as $vIndex=>$video){

	$video->cid = 1300;

if($vIndex==0){
	

?>	
                <div class="fi03"><a target="_blank" href="<?php echo $client->getPlayLink($video->sid,$video->vid,$video->cid);?>"><img width="359" height="269" src="<?php echo $video->ver_small_pic;?>" alt="<?php echo $video->tv_name;?>"></a></div> 
                <div class="news clear">
                    <h1 class="color1"><a target="_blank" href="<?php echo $video->tv_url;?>"><?php echo $video->tv_name;?></a></h1>
				</div>
<?php
}else{
?>
				<div class="news clear">
    <p>[<a target="_blank" href="<?php echo $client->getPlayLink($video->sid,$video->vid,$video->cid);?>" title=""><?php echo $video->tv_name;?></a>]</p>
    
                </div>
<?php
}
	}
?>
            </div>
            <div class="bR r">
                <ul class="pp">
<?php
$videos = $client->getTop("news/recommend");
foreach($videos as $vIndex=>$video){

		$video->cid = 1300;

?>
                    <li><a target="_blank" href="<?php echo $client->getPlayLink($video->sid,$video->vid,$video->cid);?>"><img src="<?php echo $video->ver_small_pic;?>" width="149" height="92" alt=""></a><span sizcache="1" sizset="396"><strong><a target="_blank" href="<?php echo $client->getPlayLink($video->sid,$video->vid,$video->cid);?>"><?php echo $video->tv_name;?></a></strong><?php echo $video->tv_desc;?></span></li>
<?php
}
?>
                </ul>
            </div>
        </div>
    </div>
</div>
<div class="blank12H"></div>
<!-- End:contentA -->
<!-- Start:contentB -->
<div class="area" id="contentB">
    <div class="bordA blockB clear">
		<div class="title"><span><a target="_blank" href="./search.php?c=1"><img src="skin/imgs/bt1.gif" width="75" height="18" /></a></span></div>
<?php
$categorys = $client->getCategory("movie/category");
?>
        <div class="cont clear">
            <div class="bL l">
<?php
foreach($categorys as $category){
?>
                <div class="list clear">
					<h3> <?php echo $category->cateName; ?></h3>
					<ul>
<?php
		foreach($category->searchKeys as $searchKey=>$searchValue){
					echo "<li><a href=\"./search.php?c=1&".$category->cateAlias."=".$searchValue."\">".$category->cateValues[$searchKey]."</a></li>";
		}
?>
					</ul>
					</div>
<?php
}
?>
            </div>
            
            <div class="bC l">
            	<ul id="ztjcTab" class="tab">
                     <li><a target="_blank" href="./search.php?&c=1">高清电影</a></li>                                               
                     <li><a target="_blank" href="./search.php?&c=1&area=%E5%8D%8E%E8%AF%AD">华语</a></li>
                     <li><a target="_blank" href="./search.php?&c=1&area=%E9%9F%A9%E5%9B%BD">韩国</a></li>
                     <li><a target="_blank" href="./search.php?&c=1&area=%E5%A5%BD%E8%8E%B1%E5%9D%9E">好莱坞</a></li>
                     <li><a target="_blank" href="./search.php?&c=1&area=%E6%AC%A7%E6%B4%B2">欧洲</a></li>
                     <li><a target="_blank" href="./search.php?&c=1">更多</a></li>
                </ul>
                    
                <div class="tabCont">
                    <div class="pp pp3">
                        <ul>
<?php
$videos = $client->getTop("movie/recommend");
foreach($videos as $vIndex=>$video){
		$video->cid = 1;
?>
					<li>
					<a target="_blank" href="<?php echo $client->getPlayLink($video->sid,$video->vid,$video->cid);?>"><img width="105" height="145" alt="" src="<?php echo $video->ver_small_pic;?>"></a>
					
					<span><strong><a href="<?php echo $client->getPlayLink($video->sid,$video->vid,$video->cid);?>" target="_blank"><?php echo $video->tv_name;?></a></strong> <?php echo $video->tv_desc;?></span>
					</li>
<?php
}
?>
                          
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="bR r">
            	<h2><span>电影排行榜</span></h2>
                <div class="menuA clear" id="hotMovieScoreTab">
                    <ul>
                        <li id="box_movie_top_views_daily"  rel="#movie_top_views_daily"  class="now">日<em></em></li>
                        <li id="box_movie_top_views_weekly" rel="#movie_top_views_weekly" >周<em></em></li>
                        <li id="box_movie_top_views_monthly" rel="#movie_top_views_monthly" >月<em></em></li>
                        <li id="box_movie_top_views_all"  rel="#movie_top_views_all" >全部<em></em></li>
                    </ul>
                </div>
                 <div class="line"></div>
                <div id="movie_top_views_daily" class="snList clear">
                    <ul id="score_data">
<?php
$videos = $client->getTop("movie/top/views/daily");
if($videos != NULL){
foreach($videos as $vIndex=>$video){
		$video->cid = 1;
?>
					<li>
					<span class="grade"><strong><?php echo round($video->tv_score,1);?></strong><?php echo $video->tv_all_count;?></span>					
					<em <?php if($vIndex<=2) echo "class=\"colorA\"";?>><?php echo ($vIndex+1);?></em>
					<a title="<?php echo $video->tv_name;?>" target="_blank" href="<?php echo $client->getPlayLink($video->sid,$video->vid,$video->cid);?>" class="color1"><?php echo $video->tv_name;?></a>
					
					</li>
					
					
<?php
	}}
?>
					
					
					
					</ul>
                </div>
               <div id="movie_top_views_weekly" class="snList clear" style="display:none;" >
                    <ul id="score_data">
<?php
$videos = $client->getTop("movie/top/views/weekly");
if($videos != NULL){
foreach($videos as $vIndex=>$video){
		$video->cid = 1;
?>
					<li>
					<span class="grade"><strong><?php echo round($video->tv_score,1);?></strong><?php echo $video->tv_all_count;?></span>					
					<em <?php if($vIndex<=2) echo "class=\"colorA\"";?>><?php echo ($vIndex+1);?></em>
					<a title="<?php echo $video->tv_name;?>" target="_blank" href="<?php echo $client->getPlayLink($video->sid,$video->vid,$video->cid);?>" class="color1"><?php echo $video->tv_name;?></a>
					
					</li>
					
					
<?php
	}}
?>			
					
					
					</ul>
                </div>
               <div id="movie_top_views_monthly" class="snList clear" style="display:none;" >
                    <ul id="score_data">
<?php
$videos = $client->getTop("movie/top/views/monthly");
if($videos != NULL){
foreach($videos as $vIndex=>$video){
		$video->cid = 1;
?>
					<li>
					<span class="grade"><strong><?php echo round($video->tv_score,1);?></strong><?php echo $video->tv_all_count;?></span>					
					<em <?php if($vIndex<=2) echo "class=\"colorA\"";?>><?php echo ($vIndex+1);?></em>
					<a title="<?php echo $video->tv_name;?>" target="_blank" href="<?php echo $client->getPlayLink($video->sid,$video->vid,$video->cid);?>" class="color1"><?php echo $video->tv_name;?></a>
					
					</li>
					
					
<?php
	}}
?>			
					
					
					</ul>
                </div>
               <div id="movie_top_views_all" class="snList clear" style="display:none;" >
                    <ul id="score_data">
<?php
$videos = $client->getTop("movie/top/views/all");
if($videos != NULL){
foreach($videos as $vIndex=>$video){
		$video->cid = 1;
?>
					<li>
					<span class="grade"><strong><?php echo round($video->tv_score,1);?></strong><?php echo $video->tv_all_count;?></span>					
					<em <?php if($vIndex<=2) echo "class=\"colorA\"";?>><?php echo ($vIndex+1);?></em>
					<a title="<?php echo $video->tv_name;?>" target="_blank" href="<?php echo $client->getPlayLink($video->sid,$video->vid,$video->cid);?>" class="color1"><?php echo $video->tv_name;?></a>
					
					</li>
					
					
<?php
	}}
?>
					
					
					
					</ul>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="blank12H"></div>
<!-- End:contentB -->
<!-- Start:contentC -->
<div class="area" id="contentC">
    <div class="bordA blockB clear">
		<div class="title"><span><a target="_blank" href="./search.php?c=2"><img src="skin/imgs/bt2.gif" width="88" height="18" /></a></span></div>
<?php
$categorys = $client->getCategory("teleplay/category");
?>
        <div class="cont clear">
            <div class="bL l">
<?php
foreach($categorys as $category){
?>
                <div class="list clear">
					<h3> <?php echo $category->cateName; ?></h3>
					<ul>
<?php
		foreach($category->searchKeys as $searchKey=>$searchValue){
					echo "<li><a href=\"./search.php?c=2&".$category->cateAlias."=".$searchValue."\">".$category->cateValues[$searchKey]."</a></li>";
		}
?>
					</ul>
					</div>
<?php
}
?>
    
            </div>
            <div class="bC l">
            	<ul id="ztjcTab" class="tab">
                     <li><a target="_blank" href="./search.php?&c=2">高清电视剧</a></li>                                               
                     <li><a target="_blank" href="./search.php?&c=2&area=%E5%86%85%E5%9C%B0">内地</a></li>
                     <li><a target="_blank" href="./search.php?&c=2&area=%E6%B8%AF%E5%89%A7">港剧</a></li>
                     <li><a target="_blank" href="./search.php?&c=2&area=%E5%8F%B0%E5%89%A7">台剧</a></li>
                     <li><a target="_blank" href="./search.php?&c=2&area=%E9%9F%A9%E5%89%A7">韩剧</a></li>
                     <li><a target="_blank" href="./search.php?&c=2&area=%E7%BE%8E%E5%89%A7">美剧</a></li>
                </ul>
                    
                <div class="tabCont">
                    <div class="pp">
                        <ul>
<?php
$videos = $client->getTop("teleplay/recommend");
foreach($videos as $vIndex=>$video){
		$video->cid = 2;
?>
                            <li><a target="_blank" href="<?php echo $client->getPlayLink($video->sid,$video->vid,$video->cid);?>"><img width="105" height="78" alt="" src="<?php echo $video->ver_small_pic;?>"></a><span><strong><a href="<?php echo $client->getPlayLink($video->sid,$video->vid,$video->cid);?>" target="_blank"><?php echo $video->tv_name;?></a></strong> <?php echo $video->tv_desc;?></span></li>
<?php
}
?>
                           
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="bR r">
            	<h2><span>电视剧排行榜</span></h2>
                <div class="menuA clear" id="hotTvScoreTab">
                    <ul>
                        <li id="box_teleplay_top_views_daily"  rel="#teleplay_top_views_daily" class="now">日<em></em></li>
                        <li id="box_teleplay_top_views_weekly"  rel="#teleplay_top_views_weekly" >周<em></em></li>
                        <li id="box_teleplay_top_views_monthly"  rel="#teleplay_top_views_monthly" >月<em></em></li>
                        <li id="box_teleplay_top_views_all"  rel="#teleplay_top_views_all" >全部<em></em></li>
                    </ul>
                </div>
                 <div class="line"></div>
                <div id="teleplay_top_views_daily" class="snList clear">
                   
                    <ul id="score_data">
<?php
$videos = $client->getTop("teleplay/top/views/daily");
if($videos != NULL){
foreach($videos as $vIndex=>$video){
	$video->cid = 2;
?>
					<li>
					
					<span class="grade"><strong><?php echo round($video->tv_score,1);?></strong><?php echo $video->tv_all_count;?></span>					
					<em <?php if($vIndex<=2) echo "class=\"colorA\"";?>><?php echo ($vIndex+1);?></em>
					<a title="<?php echo $video->tv_name;?>" target="_blank" href="<?php echo $client->getPlayLink($video->sid,$video->vid,$video->cid);?>" class="color1"><?php echo $video->tv_name;?></a>
					
					</li>
					
					
<?php
	}
}
?>
					
					
					
					</ul>
                </div>
                <div id="teleplay_top_views_weekly" class="snList clear" style="display:none;">
                   
                    <ul id="score_data">
<?php
$videos = $client->getTop("teleplay/top/views/weekly");
if($videos != NULL){
foreach($videos as $vIndex=>$video){
	$video->cid = 2;
?>
					<li>
					
					<span class="grade"><strong><?php echo round($video->tv_score,1);?></strong><?php echo $video->tv_all_count;?></span>					
					<em <?php if($vIndex<=2) echo "class=\"colorA\"";?>><?php echo ($vIndex+1);?></em>
					<a title="<?php echo $video->tv_name;?>" target="_blank" href="<?php echo $client->getPlayLink($video->sid,$video->vid,$video->cid);?>" class="color1"><?php echo $video->tv_name;?></a>
					
					</li>
					
					
<?php
	}
}
?>
					
					
					
					</ul>
                </div>
                <div id="teleplay_top_views_monthly" class="snList clear" style="display:none;">
                   
                    <ul id="score_data">
<?php
$videos = $client->getTop("teleplay/top/views/monthly");
if($videos != NULL){
foreach($videos as $vIndex=>$video){
	$video->cid = 2;
?>
					<li>
					
					<span class="grade"><strong><?php echo round($video->tv_score,1);?></strong><?php echo $video->tv_all_count;?></span>					
					<em <?php if($vIndex<=2) echo "class=\"colorA\"";?>><?php echo ($vIndex+1);?></em>
					<a title="<?php echo $video->tv_name;?>" target="_blank" href="<?php echo $client->getPlayLink($video->sid,$video->vid,$video->cid);?>" class="color1"><?php echo $video->tv_name;?></a>
					
					</li>
					
					
<?php
	}
}
?>
					
					
					
					</ul>
                </div>
                <div id="teleplay_top_views_all" class="snList clear" style="display:none;">
                   
                    <ul id="score_data">
<?php
$videos = $client->getTop("teleplay/top/views/all");
if($videos != NULL){
foreach($videos as $vIndex=>$video){
	$video->cid = 2;
?>
					<li>
					
					<span class="grade"><strong><?php echo round($video->tv_score,1);?></strong><?php echo $video->tv_all_count;?></span>					
					<em <?php if($vIndex<=2) echo "class=\"colorA\"";?>><?php echo ($vIndex+1);?></em>
					<a title="<?php echo $video->tv_name;?>" target="_blank" href="<?php echo $client->getPlayLink($video->sid,$video->vid,$video->cid);?>" class="color1"><?php echo $video->tv_name;?></a>
					
					</li>
					
					
<?php
	}
}
?>
					
					
					
					</ul>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="blank12H"></div>
<!-- End:contentC -->
<!-- Start:contentD -->
<div class="area" id="contentD">
    <div class="bordA blockB clear">
		<div class="title"><span><a target="_blank" href="./search.php?c=7"><img src="skin/imgs/bt3.gif" width="71" height="18" /></a></span></div>
<?php
$categorys = $client->getCategory("zongyi/category");
?>
        <div class="cont clear">
            <div class="bL l">
<?php
foreach($categorys as $category){
?>
                <div class="list clear">
					<h3> <?php echo $category->cateName; ?></h3>
					<ul>
<?php
		foreach($category->searchKeys as $searchKey=>$searchValue){
					echo "<li><a href=\"./search.php?c=7&".$category->cateAlias."=".$searchValue."\">".$category->cateValues[$searchKey]."</a></li>";
		}
?>
					</ul>
					</div>
<?php
}
?>
			</div>
            
            <div class="bC l">
            	<ul id="ztjcTab" class="tab">
                     <li><a target="_blank" href="./search.php?c=7">高清综艺</a></li>                                               
                     <li><a target="_blank" href="./search.php?&c=7&area=%E5%86%85%E5%9C%B0">内地</a></li>
                     <li><a target="_blank" href="./search.php?&c=7&area=%E6%B8%AF%E5%8F%B0">港台</a></li>
                </ul>
                    
                <div class="tabCont">
                    <div class="pp">
                        <ul>
<?php
$videos = $client->getTop("zongyi/recommend");
foreach($videos as $vIndex=>$video){
	$video->cid=7;
?>
                            <li>
								<a target="_blank" href="<?php echo $client->getPlayLink($video->sid,$video->vid,$video->cid);?>"><img width="105" height="78" alt="" src="<?php echo $video->ver_small_pic;?>"></a>
								<span><strong><a href="<?php echo $client->getPlayLink($video->sid,$video->vid,$video->cid);?>" target="_blank"><?php echo $video->tv_name;?></a></strong> <?php echo $video->tv_desc;?></span>
							</li>
<?php
}
?>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="bR r">
            	<h2><span>综艺片排行榜</span></h2>
                <div class="menuA clear" id="hotZyScoreTab">
                    <ul>
                        <li id="box_zongyi_top_views_daily"  rel="#zongyi_top_views_daily" class="now">日<em></em></li>
                        <li id="box_zongyi_top_views_weekly" rel="#zongyi_top_views_weekly">周<em></em></li>
						<li id="box_zongyi_top_views_monthly" rel="#zongyi_top_views_monthly">月<em></em></li>
                        <li id="box_zongyi_top_views_all"  rel="#zongyi_top_views_all">全部<em></em></li>
                    </ul>
                </div>
                 <div class="line"></div>
				<div id="zongyi_top_views_daily" class="snList clear">
                    <ul id="score_data">
<?php
$videos = $client->getTop("zongyi/top/views/daily");
if($videos != NULL){
foreach($videos as $vIndex=>$video){
	$video->cid = 7;
?>
					<li>					
					<span class="grade"><strong><?php echo round($video->tv_score,1);?></strong>
					<?php echo $video->tv_all_count;?></span>					
					<em <?php if($vIndex<=2) echo "class=\"colorA\"";?>><?php echo ($vIndex+1);?></em>
					<a title="<?php echo $video->tv_name;?>" target="_blank" href="<?php echo $client->getplaylink($video->sid,$video->vid,$video->cid);?>" class="color1"><?php echo $video->tv_name;?></a></li>
					
					
<?php
	}
}
?>								
					
					</ul>
                </div>
				<div id="zongyi_top_views_weekly" class="snList clear" style="display:none;">
                    <ul id="score_data">
<?php
$videos = $client->getTop("zongyi/top/views/weekly");
if($videos != NULL){
foreach($videos as $vIndex=>$video){
	$video->cid = 7;
?>
					<li>
					
										<span class="grade"><strong><?php echo round($video->tv_score,1);?></strong>					
					<?php echo $video->tv_all_count;?></span>					
					<em <?php if($vIndex<=2) echo "class=\"colorA\"";?>><?php echo ($vIndex+1);?></em>
					<a title="<?php echo $video->tv_name;?>" target="_blank" href="<?php echo $client->getplaylink($video->sid,$video->vid,$video->cid);?>" class="color1"><?php echo $video->tv_name;?></a></li>
					
					
<?php
	}
}
?>								
					
					</ul>
                </div>
				<div id="zongyi_top_views_monthly" class="snList clear" style="display:none;">
                    <ul id="score_data">
<?php
$videos = $client->getTop("zongyi/top/views/monthly");
if($videos != NULL){
foreach($videos as $vIndex=>$video){
	$video->cid = 7;
?>
					<li>
					
					<span class="grade"><strong><?php echo round($video->tv_score,1);?></strong>					
					<?php echo $video->tv_all_count;?></span>					
					<em <?php if($vIndex<=2) echo "class=\"colorA\"";?>><?php echo ($vIndex+1);?></em>
					<a title="<?php echo $video->tv_name;?>" target="_blank" href="<?php echo $client->getplaylink($video->sid,$video->vid,$video->cid);?>" class="color1"><?php echo $video->tv_name;?></a></li>
					
					
<?php
	}
}
?>								
					
					</ul>
                </div>
				<div id="zongyi_top_views_all" class="snList clear" style="display:none;">
                    <ul id="score_data">
<?php
$videos = $client->getTop("zongyi/top/views/all");
if($videos != NULL){
foreach($videos as $vIndex=>$video){
	$video->cid = 7;
?>
					<li>
					
					<span class="grade"><strong><?php echo round($video->tv_score,1);?></strong>					
					<?php echo $video->tv_all_count;?></span>					
					<em <?php if($vIndex<=2) echo "class=\"colorA\"";?>><?php echo ($vIndex+1);?></em>
					<a title="<?php echo $video->tv_name;?>" target="_blank" href="<?php echo $client->getplaylink($video->sid,$video->vid,$video->cid);?>" class="color1"><?php echo $video->tv_name;?></a></li>
					
					
<?php
	}
}
?>								
					
					</ul>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- End:contentD -->
<div class="blank12H"></div>

<?php 
	require_once( "./apifooter.php" );
?>



<script src="js/j_1.6.1_utf.js"></script>
<script src="js/g.js"></script>
<script src="js/imageSlide.js"></script>
<script>
$(function(){
    $.getJSON('http://api.tv.sohu.com/teleplay/focus.json?api_key=4a62c00db90213d0f54115e0b3ab5535&callback=?',function(data){
        _e(data)
        try{
            jQuery('#mFocus1').ImgSlide({
                loop : true,
                timeout : 15e3,
                data : data.data.data
            });
        }
        catch(e){_e(e);}
    });
    sohuHD.switchTab( $('#hotMovieScoreTab>ul>li'), {
        boxs : $('#movie_top_views_daily,#movie_top_views_weekly,#movie_top_views_monthly,#movie_top_views_all')
        ,'event' : 'mouseover'
        ,cssName : 'now'
    });					
    sohuHD.switchTab( $('#hotTvScoreTab>ul>li'), {
        boxs : $('#teleplay_top_views_daily,#teleplay_top_views_weekly,#teleplay_top_views_monthly,#teleplay_top_views_all')
        ,'event' : 'mouseover'
        ,cssName : 'now'
    });					
    sohuHD.switchTab( $('#hotZyScoreTab>ul>li'), {
        boxs : $('#zongyi_top_views_daily,#zongyi_top_views_weekly,#zongyi_top_views_monthly,#zongyi_top_views_all')
        ,'event' : 'mouseover'
        ,cssName : 'now'
    });					
});
</script>
</body>
</html>
