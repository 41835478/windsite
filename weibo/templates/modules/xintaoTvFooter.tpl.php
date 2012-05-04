<?php if (!in_array(APP::getRequestRoute(), array('live','live.details','interview'))) {?>
<div class="ft-xad">
		<?php echo F('show_ad', 'global_footer', 'ft-xad-in');?>
</div>
<?php }?>
<div id="footer">
	<div class="ft-in" style="width:950px;">
		<div class="ft-bg"></div>
		<!-- ad页脚800 开始 -->
		<!--<div class="xad-box xad-box-p4">
			<a href="#" class="ico-close-btn"></a>
		</div>-->	
		<!-- ad页脚800 结束 -->
		<div class="ft-con">
		<div class="footer-defined">
			<em class="site-name">
				<?php if (V('-:sysConfig/site_record',false)): ?>
					<a target="_blank" href="http://www.miibeian.gov.cn/ "><?php echo V('-:sysConfig/site_record');?></a>
				<?php endif; ?>
			</em>
			<a rel="e:xtv,na" href="/video.movie">电影大全</a>
			<a rel="e:xtv,na" href="/video.teleplay">电视剧大全</a>
		</div>
		<span></span>

		</div>
	</div>
</div>
<script>crossFrame.init();setInterval(crossFrame.setHeight, 500);</script>
<script type="text/javascript">
var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F1c9d1c91d473dc1baa5411de17c40486' type='text/javascript'%3E%3C/script%3E"));
</script>
<?php if(USER :: isTvLogin()&&USER :: get('__CLIENT_XTTV_SYNUSER')==1){?>
<script type="text/javascript">
(function(X, $) {$.get('/xintaotv.synUser');})(Xwb, $);
</script>
<?php }?>
