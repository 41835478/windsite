<?php
if (!defined('IN_APPLICATION')) {
	exit ('ACCESS DENIED!');
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<?php


$site = '新淘高清视频';
echo '<title>' . $cName . '大全' . '-' . $site . '</title>';
echo '<meta name="title" content="' . $video['tv_name'] . '-' . $cName . '-' . $site . '">';
echo '<meta name="keywords" content="' . $cName . '大全,' . $cName . '搜索,' . $cName . '检索,分类检索">';
echo '<meta name="description" content="' . $cName . '大全,' . $site . '是提供100%正版在线观看高清电影、高清电视剧、高清纪录片的视频，包括正在影院热映，电视热播的最新大片，多年来最受网友喜欢的经典影视作品，国内外品质优秀的历史，地理，探索等纪录片，总计10万余集, 观看清晰度可达DVD标准">';
?>
<?php TPL::plugin('include/css_link');?>
<?php TPL::plugin('include/js_link');?>
<link href="http://static.xintaowang.com/css/default/tv.css" rel="stylesheet" type="text/css" />
<style type="text/css">
.fix:after {content:".";display:block;height:0;clear:both;visibility:hidden;}*html .fix{zoom:1}.fix{display:block;min-height:1%;}
.tab_box{height:28px;overflow:hidden;padding:10px 0;}
.tab{background:#FFF;border:1px solid #dedede;height:28px;overflow:hidden;}
.tab .s1{display:inline-block;color:#7f7f7f;height:28px;line-height:28px;padding-left:5px;}
.tab a,.tab span{display:inline-block;width:31px;height:28px;line-height:28px;border-right:1px solid #dedede;background:#f6f6f6;text-align:center;font-weight:bold;font-family:arial;}
.tab a:hover,.tab .active{text-decoration:none;background:#fdf4f4;border-top:1px solid #f9ece3;margin-top:-1px;}
.tab .one{border-left:1px solid #fef6ee;width:30px;padding-left:15px;border-left-color:#fff;background:#fdf4f4 url(http://www.xintaotv.com/css/default/xintao/xintaotv/bgsy.gif) no-repeat;color:#dd0d0b;}
.tab a.last{width:43px;font-family: Simsun,Arial,sans-serif;border-right-color:#f6f6f6; font-weight:normal}
.tab a.one:hover,.tab .active{background-color:#f9ece3;}
.tab a.one:hover{background:#f9ece3 url(http://www.xintaotv.com/css/default/xintao/xintaotv/bgsy.gif) no-repeat}
.listA dt{color:#000;font:17px arial;background:url(http://www.xintaotv.com/css/default/xintao/xintaotv/point1.png) no-repeat 0 33px;padding-left:17px;padding-top:30px;font-weight:bold;margin:0 0 5px;*padding-top:5px;*background-position:0 8px;}
.listA dd{border:1px solid #EAEAEA;padding:0 0 10px 10px;margin:0 0 15px;padding-top:10px;}
.listA dd li{width:159px;margin-right:10px;float:left;overflow:hidden;height:22px;line-height:22px;background:url(http://www.xintaotv.com/css/default/xintao/xintaotv/point2.png) no-repeat 0 6px;*background-position:0 5px;padding:0 0 0 18px;}
.tab span.dark_bg{background:#eaeaea;}
.muluCon{ position:absolute;z-index:3;width:123px;left:35px;top:30px;background:#FFFFFF;border: 1px solid #dedede;display:none}
.muluCon p {border-bottom: 1px solid #dedede;height: 20px;line-height: 18px;padding-top: 5px;text-indent: 13px; text-align:left;font-size:12px;}
.muluCon p.over{background:#f9ece3; font-weight:bold}
</style>
</head>

<body id="sotv">
	<div id="wrap">
		<div class="wrap-in">
			<?php TPL::plugin('include/xintaoTvHeader',array('channel'=> $type)); ?>
			<div id="container">
				<div class="tab_box"><div class="tab"><strong class="s1">快速索引</strong><a class="one" href="#A">A</a><a href="#B">B</a><a href="#C">C</a><a href="#D">D</a><a href="#E">E</a><a href="#F">F</a><a href="#G">G</a><a href="#H">H</a><a href="#I">I</a><a href="#J">J</a><a href="#K">K</a><a href="#L">L</a><a href="#M">M</a><a href="#N">N</a><a href="#O">O</a><a href="#P">P</a><a href="#Q">Q</a><a href="#R">R</a><a href="#S">S</a><a href="#T">T</a><a href="#U">U</a><a href="#V">V</a><a href="#W">W</a><a href="#X">X</a><a href="#Y">Y</a><a href="#Z">Z</a><a class="last" href="<?php echo $more?>">更多&gt;&gt;</a></div></div>
				<?php echo F('xintaotv_map.create_map',$type);?>
			</div>
			<!-- 尾部 开始 -->
			<?php TPL::module('xintaoTvFooter');?>
			<!-- 尾部 结束 -->
		</div>
	</div>
	<?php TPL::module('gotop');?>
</body>
<script type="text/javascript">

$(function(){
	initFloat($(".tab"),{x:140,y:209,z:235,speed:"fast"});
	$("#mulu").hover(function(){
	    $(".muluCon").show();
	    $(".mulu").attr("src","http://tv.sohu.com/upload/mvmulu110105/images/up_comic.png");
	},function(){
	    $(".muluCon").hide();
	    $(".mulu").attr("src","http://tv.sohu.com/upload/mvmulu110105/images/down_comic.png");
	});
	$("#mulu").find("p").hover(function(){
		$(this).addClass("over");
	},function(){
		$(this).removeClass("over");
	});	
});    
</script>
</html>
