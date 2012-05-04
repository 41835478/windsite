<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>首页</title>
<link type="text/css" rel="stylesheet" href="<?php echo W_BASE_URL;?>css/admin/admin.css" media="screen" />
<script src="<?php echo W_BASE_URL;?>js/jquery.min.js"></script>
<script src="<?php echo W_BASE_URL;?>js/admin-all.js"></script>
<style>.win-howtojoin{width:470px;}.win-howtojoin .win-box{padding:10px 10px 10px;}.btn-group .btn-general{*display:inline;}.win-domain{width:500px;}.tips-help{ display:inline-block; height:28px;width:22px;margin-left:-5px;background:url( http://www.xintaowang.com/css/default/bgimg/ico_bg.png ) no-repeat; background-position:3px -700px;}</style>
<script type="text/javascript">
	/*$(function(){
		$.ajax({
			url:'http://x.weibo.com/papi.php?type=19&records=10',
			type:'get',
			dataType:'jsonp',
			success:function(r){
				$(r).each(function(){
					$("<li><a href='"+this.link_url+"' target='_blank'>"+this.title+"</a><span>"+this.create_time+"</span></li>")
					.appendTo($('#news'));
				});
			}
		})
	})*/
</script>
</head>
<?php 
$daydiff = -1;
if(XT_IS_WEIBO=='true'&&XT_FREE_DATELINE==''&&(XT_APPSTORE_DATELINE!='false'&&XT_APPSTORE_DATELINE!='')){
$daydiff = (strtotime(XT_APPSTORE_DATELINE)-strtotime(date("Y-m-d")))/60/60/24;
}
?>
<body class="main-body">
	<?php if(!(XT_IS_WEIBO=='true'&&XT_FREE_DATELINE=='')){ echo (XT_SID!=''?'<div id="J_NoTaoke" style="padding:10px;padding-left:30px;height:45px;background:url(http://www.xintaowang.com/css/default/xintao/360/Mainbanner_Danger.png) repeat-x;"><div style="padding:10px;padding-left:60px;height:20px;background:url(http://www.xintaowang.com/css/default/xintao/360/Error_L.png) no-repeat;color:#B11506;font-size:16px;font-weight:700;">您尚未订购卖家服务，淘宝客无法推广您的淘宝店铺，<a href="#" rel="e:openAppstore">立刻订购卖家服务？</a></div></div>':'<div id="J_NoTaoke" style="padding:10px;padding-left:30px;height:45px;background:url(http://www.xintaowang.com/css/default/xintao/360/Mainbanner_Danger.png) repeat-x;"><div style="padding:10px;padding-left:60px;height:20px;background:url(http://www.xintaowang.com/css/default/xintao/360/Error_L.png) no-repeat;color:#B11506;font-size:16px;font-weight:700;">您尚未订购淘客服务，无法得到微购所有推广功能，<a href="#" rel="e:openAppstore">立刻订购淘客服务？</a></div></div>'); }?>
	<div class="path">
			<p>当前位置：首页(
		<?php 
			if(XT_FREE_DATELINE!=''){
				echo '您当前是体验版，体验版提供<strong style="color:red;font-size:16px;">3</strong>天的增值服务试用，到期后恢复为免费版';
			}else{
				echo '已订购：<strong style="color:red;">'.(XT_IS_MULTI=='true'?'卖家服务(含淘客服务)':(XT_IS_TAOKE=='true'?'淘客服务':'免费服务')).'</strong>'.(XT_APPSTORE_DATELINE!='false'&&XT_APPSTORE_DATELINE!=''?('，到期日期【<strong style="color:red;">'.str_replace(' 00:00:00','',XT_APPSTORE_DATELINE).'</strong>】'.($daydiff>0?'，还可以使用【<strong style="color:red;">'.$daydiff.'</strong>】天':'')):'');
			}
		?>),官方QQ群：<strong style="color:red;font-size:16px;">183216546</strong></p>
	</div>
	<div class="main-cont" style="padding-top:0px">
		<?php TPL :: module('xintao/360',array('counts'=>$counts)); ?>
		<?php TPL :: module('xintao/yingxiao/top10');?>
		<h3 class="title">增值服务列表(提醒：订购增值服务后。需要<a href="<?php echo TB_CONTAINER;?>" target="_top">重新登录</a>管理员后台)</h3>
		<div class="box" style="padding-left:0px;">
		<?php TPL :: module('xintao/appstore');?>
		</div>
		<div style="clear:both;"></div>
	</div>
<script type="text/javascript">
$(function(){
	<?php if(XT_IS_INIT=='true' && XT_IS_SELLER == 'true' && XT_FREE_DATELINE == '' && XT_SID!=''){?>
	$.ajax({
				type : 'POST',
				url : '/admin.php?m=mgr/xintao/xintao.synTaokeShop',
				data : {},
				success : function(json) {
					json = eval('(' + json + ')');
					if (json.state == '201') {
						if($('#J_NoTaoke').length==0){
							$('body').prepend('<div id="J_NoTaoke" style="padding:10px;padding-left:30px;height:45px;background:url(http://www.xintaowang.com/css/default/xintao/360/Mainbanner_Danger.png) repeat-x;"><div style="padding:10px;padding-left:60px;height:20px;background:url(http://www.xintaowang.com/css/default/xintao/360/Error_L.png) no-repeat;color:#B11506;font-size:16px;font-weight:700;">您的淘宝店铺尚未加入淘宝客推广计划，淘客无法推广，<a href="#" rel="e:openHowToJoin">淘宝卖家如何加入淘客推广计划？</a></div></div>');
						}
					}
				}
			});
	<?php }?>	
});
<?php $sina_uid=USER :: uid();if(empty($sina_uid)){?>
var authWin;
function openSinaAuthorityWin() {
    var url = '<?php echo URL('mgr/xintao/active_admin.bindSina');?>';
    authWin = window.open(url, 'authWin', "resizable=1,location=0,status=0,scrollbars=0,width=570,height=360");
}
function authoritySuccess() {
    if (authWin && !authWin.closed) {
        authWin.close();
        window.location.reload();
    }
}
<?php }?>
<?php if(XT_IS_SIMPLE=='true'){?>
  Xwb.use("action").reg("siteSetting",function(e){
  	top.location.href="/admin.php?m=mgr/admin.index#1,0";
  	top.location.reload();
  },{na:true});
  Xwb.use("action").reg("activeApp",function(e){
  	top.location.href="/admin.php?m=mgr/admin.index#1,1";
  	top.location.reload();
  },{na:true});
  Xwb.use("action").reg("bindList",function(e){
  	top.location.href="/admin.php?m=mgr/admin.index#1,2";
  	top.location.reload();
  },{na:true});
   Xwb.use("action").reg("proxy",function(e){
  	top.location.href="/admin.php?m=mgr/admin.index#1,3";
  	top.location.reload();
  },{na:true});
  Xwb.use("action").reg("yingxiaoShop",function(e){
  	top.location.href="/admin.php?m=mgr/admin.index#2,2";
  	top.location.reload();
  },{na:true});
  Xwb.use("action").reg("yingxiaoItem",function(e){
  	top.location.href="/admin.php?m=mgr/admin.index#2,3";
  	top.location.reload();
  },{na:true});
  Xwb.use("action").reg("taokeItem",function(e){
  	top.location.href="/admin.php?m=mgr/admin.index#2,5";
  	top.location.reload();
  },{na:true});
  Xwb.use("action").reg("weiboAnalytics",function(e){
  	top.location.href="/admin.php?m=mgr/admin.index#2,0";
  	top.location.reload();
  },{na:true});
  Xwb.use("action").reg("yingxiaoTop",function(e){
  	top.location.href="/admin.php?m=mgr/admin.index#3,0";
  	top.location.reload();
  },{na:true});
  Xwb.use("action").reg("autoCron",function(e){
  	top.location.href="/admin.php?m=mgr/admin.index#2,1";
  	top.location.reload();
  },{na:true});
  Xwb.use("action").reg("wowUserItem",function(e){
  	top.location.href="/admin.php?m=mgr/admin.index#2,4";
  	top.location.reload();
  },{na:true});
  Xwb.use("action").reg("wowTaokeItem",function(e){
  	top.location.href="/admin.php?m=mgr/admin.index#2,6";
  	top.location.reload();
  },{na:true});
<?php }else{?>
  Xwb.use("action").reg("weiboAnalytics",function(e){
  	top.location.href="/admin.php?m=mgr/admin.index#4,2";
  	top.location.reload();
  },{na:true});
  Xwb.use("action").reg("activeApp",function(e){
  	top.location.href="/admin.php?m=mgr/admin.index#1,3";
  	top.location.reload();
  },{na:true});
  Xwb.use("action").reg("bindList",function(e){
  	top.location.href="/admin.php?m=mgr/admin.index#1,5";
  	top.location.reload();
  },{na:true});
   Xwb.use("action").reg("siteSetting",function(e){
  	top.location.href="/admin.php?m=mgr/admin.index#1,0";
  	top.location.reload();
  },{na:true});
  Xwb.use("action").reg("guanzhu",function(e){
  	top.location.href="/admin.php?m=mgr/admin.index#0,10";
  	top.location.reload();
  },{na:true});
  Xwb.use("action").reg("autoCron",function(e){
  	top.location.href="/admin.php?m=mgr/admin.index#0,1";
  	top.location.reload();
  },{na:true});
  Xwb.use("action").reg("proxy",function(e){
  	top.location.href="/admin.php?m=mgr/admin.index#1,7";
  	top.location.reload();
  },{na:true});
   Xwb.use("action").reg("pageNav",function(e){
  	top.location.href="/admin.php?m=mgr/admin.index#2,0";
  	top.location.reload();
  },{na:true});
   Xwb.use("action").reg("skin",function(e){
  	top.location.href="/admin.php?m=mgr/admin.index#2,2";
  	top.location.reload();
  },{na:true});
  Xwb.use("action").reg("yingxiaoShop",function(e){
  	top.location.href="/admin.php?m=mgr/admin.index#0,3";
  	top.location.reload();
  },{na:true});
  Xwb.use("action").reg("yingxiaoItem",function(e){
  	top.location.href="/admin.php?m=mgr/admin.index#0,4";
  	top.location.reload();
  },{na:true});
  Xwb.use("action").reg("yingxiaoTop",function(e){
  	top.location.href="/admin.php?m=mgr/admin.index#0,9";
  	top.location.reload();
  },{na:true});
  Xwb.use("action").reg("sitemapSet",function(e){
  	top.location.href="/admin.php?m=mgr/admin.index#0,8";
  	top.location.reload();
  },{na:true});
  Xwb.use("action").reg("taokeItem",function(e){
  	top.location.href="/admin.php?m=mgr/admin.index#0,6";
  	top.location.reload();
  },{na:true});
  Xwb.use("action").reg("wowUserItem",function(e){
  	top.location.href="/admin.php?m=mgr/admin.index#0,5";
  	top.location.reload();
  },{na:true});
  Xwb.use("action").reg("wowTaokeItem",function(e){
  	top.location.href="/admin.php?m=mgr/admin.index#0,7";
  	top.location.reload();
  },{na:true});
<?php }?>  
  Xwb.use("action").reg("binddomain",function(e){
  		<?php if(XT_FREE_DATELINE!=''){ ?>
  			Xwb.ui.MsgBox.alert('体验版提示：','您当前为体验版<br/>不允许绑定独立域名');
  			return false;	
  		<?php } ?>
		Xwb.use('MgrDlg',{
		dlgcfg:{
			cs:'win-domain win-fixed',
			title:'绑定独立域名',
			destroyOnClose:true,
			onViewReady:function(view){
				var self=this;
				$(view).find('#pop_cancel').click(function(){
					self.close();
				})
				$('#checkIp').click(function(e){
					if(!$('#domain').val()){
						alert('域名不能为空！');
						return false;
					}
					$.post('<?php echo URL('mgr/xintao/xintao.checkIp');?>', {'domain':$('#domain').val()}, function(json){
						json = eval('(' + json + ')');
						if (json.state == '200') {
							alert('域名解析已成功，可以点击提交');
							$('#checkIp').hide();
							$('#submitBtn').removeClass('hidden');
						}else{
							if (json.state == '201') {
								Xwb.ui.MsgBox.alert('解析尚未成功', '当前域名尚未解析成功，请进入域名服务商那里配置cname(别名)指向www.xintaowang.com.', function() {}, 'null', 'tips');
								return false;
							}
						}
					});
					return false;
				})
			}
		}
		,valcfg:{
			form:'#addForm',
			trigger:'#submitBtn'
		}
		,modeUrl:"<?php echo URL('mgr/xintao/domains.bindDomainView');?>"
		,formMode:true
		});
		},{na:true});
	 Xwb.use("action").reg("buchang",function(e){
		Xwb.use('MgrDlg',{
		dlgcfg:{
			cs:'win-domain win-fixed',
			title:'申请补偿',
			destroyOnClose:true,
			onViewReady:function(view){
				var self=this;
				$(view).find('#pop_cancel').click(function(){
					self.close();
				})
			}
			}
		,valcfg:{
			form:'#addForm',
			trigger:'#submitBtn'
		}
		,modeUrl:"<?php echo URL('mgr/xintao/domains.buchang');?>"
		,formMode:true
		});
		},{na:true});
		<?php 
			if(XT_IS_WEIBO=='true'&&XT_FREE_DATELINE==''&&(XT_APPSTORE_DATELINE!='false'&&XT_APPSTORE_DATELINE!='')){
				$daydiff = (strtotime(XT_APPSTORE_DATELINE)-strtotime(date("Y-m-d")))/60/60/24;
				if($daydiff<=7&&$daydiff>=0){?>
					Xwb.ui.MsgBox.alert('服务到期提醒', '您的微购有效期还剩下【<strong style="color:red"><?php echo $daydiff;?></strong>】天，请及时续订！否则将关闭所有服务！', function() {}, 'null', 'tips');
		<?php			
				}
			}
		?>
	 Xwb.use("action").reg("openHowToJoin",function(e){
	  	Xwb.use('MgrDlg',{
			modeHtml:'<div style="width:425px" id="__ss_2919091"><strong>加入淘宝客推广计划后，一般第二天才会正式生效！</strong><iframe src="http://www.slideshare.net/slideshow/embed_code/2919091?rel=0" width="425" height="355" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe> </div>',
			formMode:false,
			dlgcfg:{
				cs:'win-howtojoin win-fixed',
				onViewReady:function(View){
				},
				destroyOnClose:false,
				actionMgr:false,
				title:'淘宝卖家如何加入淘宝客推广计划'
			}
		})
  },{na:true});	
</script>	
</body>
</html>
