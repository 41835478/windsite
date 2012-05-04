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
require_once( "$preIP/config.php" );

# Initialize SOHU util
require_once( "$preIP/SoUtil.php" );

# Initialize connect
require_once( "$preIP/connect.php" );

# Initialize SOHU client
require_once( "$preIP/SoClient.php" );

$AppKeys=new ApplicationKeys($ApiKey,$SecretKey);
$client = new SoClient($AppKeys);


/*
$video = $client->getVideo(310153);
if($video != NULL){
   echo "\r\n"."vid = ".$video->{"vid"}."\r\n";
   print_r($video);
}
*/
/**/

//$videos = $client->getTop("teleplay/top/views/daily");
//print_r($videos);

//$videos = $client->getTop("teleplay/top/score/perfect");
//print_r($videos);


//$categorys = $client->getCategory("teleplay/category");
//print_r($categorys);


//$videos = $client->getSetList(451);
//print_r($videos);

$video = $client->getSetInfo(451);
print_r($video);

//$vidos[] = $client->getFocus("news/focus");
//print_r($vidos);

?>