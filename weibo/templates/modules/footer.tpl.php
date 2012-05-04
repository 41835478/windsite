<?php if (!in_array(APP::getRequestRoute(), array('live','live.details','interview'))) {?>
<div class="ft-xad">
		<?php echo F('show_ad', 'global_footer', 'ft-xad-in');?>
</div>
<?php }?>
<div id="footer">
	<div class="ft-in">
		<div class="ft-bg"></div>
		<!-- ad页脚800 开始 -->
		<!--<div class="xad-box xad-box-p4">
			<a href="#" class="ico-close-btn"></a>
		</div>-->	
		<!-- ad页脚800 结束 -->
		<div class="ft-con">
		<div class="footer-defined">
			<em class="site-name">
				<?php echo V('-:sysConfig/site_name');?>
				<?php if (V('-:sysConfig/site_record',false)): ?>
					<a target="_blank" href="http://www.miibeian.gov.cn/ "><?php echo V('-:sysConfig/site_record');?></a>
				<?php endif; ?>
			</em>
				<!--<a target="_blank" href="<?php echo W_BASE_URL.'wap.php'?>"><?php LO('modules__footer__wap');?></a>
				<a target="_blank" href="<?php echo URL('pub.verified');?>"><?php LO('modules__footer__verify'); ?></a>-->
			<?php
				$foot = "";
				$foot = json_decode(V('-:sysConfig/foot_link'),true);
				if($foot){
					$count = count($foot);
					$i = 1;
					foreach($foot as $value){ ?>
						<a target="_blank" href="<?php echo $value['link_address'];?>"><?php echo $value['link_name'];?></a>
						<?php if($i < $count) echo '<s>|</s>'; $i++;}?>
				<?php }?>
				<?php if(XT_IS_SELLER=='true'){echo '<a target="_blank" href="http://'.XT_SITE_DOMAIN.'/sitemap_baidu.xml">百度站点地图</a>';} ?>
				<?php if (V('-:sysConfig/third_code', false)): ?>
					<?php if($foot){ echo "|"; }?>
					<?php echo V('-:sysConfig/third_code');?>
				<?php endif; ?>
		</div>
		<span></span>

		</div>
	</div>
	<?php 
		$urls = F('report','','publish');
		for($i=0,$count=count($urls);$i<$count; $i++) {
            if (!empty($urls[$i]))
			    echo '<img src="' . $urls[$i] . '" width="0" height="0" />';
		}
	?>
</div>
<?php
// 同步登录状态到附属站点  
$site_uid	= USER::get('site_uid');
$loginScript	= USER::get('syncLoginScript');
//var_dump(array($site_uid, $loginScript));
if ( $site_uid && $loginScript){
	$accAdapter = APP::ADP('account');
	$syncLogoutScript = $site_uid ? $accAdapter->syncLogin($site_uid) : '';
	//echo F('escape', $syncLogoutScript);
	if (!empty($syncLogoutScript)){
		echo $syncLogoutScript;
	}
	USER::set('syncLoginScript',0);
}
?>
<?php if (XT_FREE_DATELINE != '') { ?>
<script type="text/javascript">
(function(X, $) {
	Xwb.ui.MsgBox.alert('体验版提示:', '您【<?php echo XT_USER_NICK;?>】当前为体验版<br/>有效期至【<strong style="float:none;color:red;font-size:16px;"><?php echo XT_FREE_DATELINE;?></strong>】<br/>续订增值服务后不再提示');
})(Xwb, $);
</script>
<?php } ?>
<?php if(XT_IS_WEIBO=='true'&&XT_PIWIK_ID!=''&&false){?>
<!-- Tracking --> 
<script type="text/javascript">
var pkBaseURL = (("https:" == document.location.protocol) ? "https://track.xintaowang.com/" : "http://track.xintaowang.com/");
document.write(unescape("%3Cscript src='" + pkBaseURL + "piwik.js' type='text/javascript'%3E%3C/script%3E"));
</script><script type="text/javascript">
try {
var piwikTracker = Piwik.getTracker(pkBaseURL + "piwik.php", <?php echo XT_PIWIK_ID;?>);
piwikTracker.trackPageView();
piwikTracker.enableLinkTracking();
} catch( err ) {}
</script><noscript><p><img src="http://track.xintaowang.com/piwik.php?idsite=<?php echo XT_PIWIK_ID;?>" style="border:0" alt="" /></p></noscript>
<!-- End Tracking Code -->
<?php }?>
<script type="text/javascript">
(function(X, $) {$.get('/map.autoCronAdmin');})(Xwb, $);
</script>
