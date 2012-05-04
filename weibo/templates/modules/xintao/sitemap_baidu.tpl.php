<?php
function EscapeXML($string) {
	return str_replace(array (
		'&',
		'"',
		"'",
		'<',
		'>'
	), array (
		'&amp;',
		'&quot;',
		'&apos;',
		'&lt;',
		'&gt;'
	), $string);
}
?>
<?php echo '<?xml version="1.0" encoding="UTF-8"?'.'>'."\n";?>
<document xmlns:bbs="http://www.baidu.com/search/bbs_sitemap.xsd">
	<webSite><?php echo EscapeXML(stripslashes('http://'.XT_SITE_DOMAIN));?></webSite>
	<webMaster></webMaster>
	<updatePeri>24</updatePeri>
	<updatetime><?php echo date('Y-m-d H:i:s'); ?></updatetime>
	<version><?php echo EscapeXML(stripslashes(V('-:sysConfig/site_name')));?></version>
	<?php if(XT_IS_SELLER=='true'&&isset($items)){foreach($items as $row){ ?>
	<item>
		<link><?php echo EscapeXML(stripslashes('http://'.XT_SITE_DOMAIN.'/item/id-'.$row['id']));?></link>
		<title><?php echo  EscapeXML(stripslashes((F('web_page_seo.title',$row['title'])))); ?></title>
		<pubDate><?php echo $row['list_time'] ?></pubDate>
	</item>
	<?php }} ?>
</document>

