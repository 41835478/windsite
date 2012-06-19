<div id="gt"></div>
<style>.tooltip{display:none;background:transparent url(http://static.xintaonet.com/assets/images/black_arrow.png);font-size:12px;height:70px;width:160px;padding:25px;padding-top:20px;color:#fff;}</style>
<div id="guidetooltip" style="display:block;">点击同步淘宝公开信息可以同步您的淘宝帐号在淘宝网的所有公开信息</div>
<script type="text/javascript">
	$(function(){
		var gt = $.url.param("gt");
		if(gt&&gt!=''){
			try{
			$.getScript('/assets/js/guide/'+gt+'.js?v=${dateVersion()}',function(){$('#gt')[gt+'Guide']()});
			}catch(e){alert(e)}; 
		}
	});
</script>