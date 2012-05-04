<?php


/**
 * 广告位展现
 * @version $Id$
 */
if (!defined('IN_APPLICATION')) {
	exit ('ACCESS DENIED!');
}
?>
<div class="box">
	<div class="ads">
	    <div class="hd" style="display:none"></div>
	    <div class="bd">
<?php


$params = $mod['param'];
switch ($params['source']) {
	case 0 : //淘宝联盟
		echo '<script type="text/javascript"> alimama_pid="' . $params['pid'] . '"; alimama_titlecolor="' . $params['titlecolor'] . '"; alimama_descolor ="' . $params['descolor'] . '"; alimama_bgcolor="' . $params['bgcolor'] . '"; alimama_bordercolor="' . $params['bordercolor'] . '"; alimama_linkcolor="' . $params['linkcolor'] . '"; alimama_bottomcolor="' . $params['bottomcolor'] . '"; alimama_anglesize="' . $params['anglesize'] . '"; alimama_bgpic="' . $params['bgpic'] . '"; alimama_icon="' . $params['icon'] . '"; alimama_sizecode="' . $params['sizecode'] . '"; alimama_width=' . $params['width'] . '; alimama_height=' . $params['height'] . '; alimama_type=' . $params['type'] . '; </script><script src="http://a.alimama.cn/inf.js" type="text/javascript"></script>';
		break;
	case 1 : //Google Adsense
		echo '<script type="text/javascript">google_ad_client = "' . $params['ad_client'] . '";google_ad_slot = "' . $params['ad_slot'] . '";google_ad_width = ' . $params['ad_width'] . ';google_ad_height = ' . $params['ad_height'] . ';</script><script type="text/javascript" src="http://pagead2.googlesyndication.com/pagead/show_ads.js"></script>';
		break;
	case 2 : //百度联盟
		echo '<script type="text/javascript">var cpro_id = "' . $params['cpro_id'] . '";</script><script type="text/javascript" src="http://cpro.baidu.com/cpro/ui/c.js"></script>';
		break;
	case 3 : //Flash
		echo '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" adcodebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,45,0" width="' . $params['flash-width'] . '" height="' . $params['flash-height'] . '"><param name="movie" value="' . $params['flash-url'] . '" /><param name="quality" value="high" /><embed src="' . $params['flash-url'] . '" quality="high" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" width="' . $params['flash-width'] . '" height="' . $params['flash-height'] . '"></embed></object>';
		break;
	case 4 : //图片
		echo '<a href="' . $params['image-url'] . '" target="_blank"><img src="' . $params['image-src'] . '" width="' . $params['image-width'] . 'px" height="' . $params['image-height'] . 'px" border="0" alt="' . $params['image-alt'] . '" title="' . $params['image-alt'] . '"></a>';
		break;
	case 5 : //文本
		echo '<span style="padding:0.8em"><a href="' . $params['text-link'] . '" title="' . $params['text-title'] . '" target="_blank" style="font-size:' . $params['text-size'] . 'px;">' . $params['text-title'] . '</a></span>';
		break;
	default :
		}
?>
</div>    
</div>
</div>