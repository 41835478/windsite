<@ws.header>
<meta name="keywords" content="新淘网,淘宝,淘客,淘宝客,购物,自助建站,电子商务,网赚">
<meta name="description" content="新淘网 - 搜索新淘网会员及淘站">
<title>搜索页面- 新淘网</title>
</@ws.header>
<script type="text/javascript">
$(function() {
	$("#memberSearch").click(function(){
		if($("#keyword").val()!=""){
			getHtmlSearch("USER",$("#keyword").val());
		}else{
			alert(请输入要查询的会员昵称);
		}
	});
	$("#siteSearch").click(function(){
		if($("#keyword").val()!=""){
			getHtmlSearch("SITE",$("#keyword").val());
		}else{
			alert(请输入要查询的站点名称);
		}
	});
});
</script>
<div>
<div align="center" style="margin-top:10px;height:40px;margin-bottom:10px;">
<input type=text  id="keyword" style="font-size: 16px;height: 24px;width: 350px;"></br>
<a id="memberSearch" href="#">会员搜索</a>&nbsp;&nbsp;&nbsp;
<a id="siteSearch" href="#">淘站搜索</a>
</div>
<div id="rightContent" class="ui-widget-content ui-corner-all">
</div>
</div>
<#include "/site/template/footer.ftl">