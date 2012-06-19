<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<#assign filePath = user_id?substring(user_id?length-2,user_id?length)>
<!--#if expr="$QUERY_STRING = /SHOPSID=([0-9]+)/" --><!--#set var="SHOPSID" value="$1" --><!--#endif -->
<!--#if expr="$SHOPSID = /[0-9]+([0-9]{2})/" --><!--#set var="SHOPSIDPATH" value="$1" --><!--#endif -->
<meta name="keywords" content="<!--#include virtual="/hshop/$SHOPSIDPATH/$SHOPSID/meta.html"-->">
<meta name="description" content="<!--#include virtual="/hshop/$SHOPSIDPATH/$SHOPSID/meta.html"-->">
<title><!--#include virtual="/hshop/$SHOPSIDPATH/$SHOPSID/meta.html"-->- ${sitetitle}</title>
<!--#include virtual="/zone/${filePath}/${user_id}/pageHtmlHeader.html"-->
<style>
.store_show_box{ float:left; margin:5px 0px; padding:0; width:945px; height:auto;}.store_show_box_logo{ float:left; margin:0px 0px 0px 5px; padding:0; width:222px; height:182px;color:#333333; overflow:hidden;}
.store_show_box_logo p.t1,.store_show_box_logo p.t2,.store_show_box_logo p.t3,.store_show_box_logo p.t4{ margin:0; padding:0;width:222px;}.store_show_box_logo .pic { width:100px; height:100px; margin:25px 61px 10px 61px; padding:0; display:block; overflow:hidden;}
.store_show_box_logo b{ color:#FF6600;}.store_show_box_logo p.t2,.store_show_box_logo p.t3{ height:25px; line-height:25px; overflow:hidden;}.store_show_box_logo p.t4{ margin:5px 0 0 0;}
.store_show_box_logo .jump{ display:block; width:125px; height:35px; margin:0 auto; padding:0; background:url(http://static.xintaonet.com/assets/min/stylesheets/images/jump.gif) no-repeat;}
.store_show_box_info{ float:left; margin:0px 0px 0px 8px; padding:0; width:710px; height:142px;}.store_show_box_info ul{ float:left; margin:0; padding:0;}
.store_show_box_info ul li{ float:left; width:350px; margin:5px 0px; text-align:left; height:30px; line-height:30px; overflow:hidden;border-bottom:1px dashed #CCCCCC;}
.store_show_box_info ul li h1{font-size:13px; font-weight:700;padding:0;display:inline;}
</style>
<!--#include virtual="/hshop/$SHOPSIDPATH/$SHOPSID/$SHOPSID.html"-->	
<!--#include virtual="/zone/${filePath}/${user_id}/footer.html"-->
<!--Designer-->
<script type="text/javascript">
var DEBUG=false,ISDESIGNER=false,PID='${pid}',<#if versionNo??>VERSIONNO=${versionNo},<#else>VERSIONNO=1,</#if>WWW='${www}';
$(function(){
	var boxs = $('#content .J_ShopDetailBox');
	$('#J_TabBar li').click(function(){
		$(this).addClass('selected').siblings().removeClass('selected');
		boxs.hide();
		$('#'+$(this).attr('data-box')).show();
	});
});
</script>
</body>
</html>