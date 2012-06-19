<#macro template>
<style>
.ui-selecting {background: #FECA40;}
.ui-selected {background: #F39814;color: white;}
#sys_Templates ul,#self_Templates ul {width:100%;height:100%;margin-left:5px;margin-top:5px;list-style: none;}

#sys_Templates li,#self_Templates li {border:1px solid #DDD;float: left;padding: 5px;margin-right: 15px;margin-bottom:15px;position:relative;display:inline;overflow:hidden;}
.t_details{background: transparent url('http://static.xintaonet.com/designer/assets/images/template_detail.gif) no-repeat scroll 0px 0px;border: none;bottom: 10px;color: black;height: 26px;line-height: 29px;overflow: hidden;position: absolute;right: 5px;text-align: center;width: 78px;z-index: 2;}
</style>
<script type="text/javascript">
	$(function() {
		var t_id;
		$('#template_detail').dialog({
						bgiframe : true,
						autoOpen : false,
						resizable : false,
						width : 680,
						zIndex : 100000,
						modal : true
					});
		$('#_templates').tabs();
		$("#sys_Templates ul li").hover(
				function() {
					$(this).toggleClass("ui-selecting").siblings().removeClass(
							"ui-selecting");
				}, function() {
					$(this).removeClass("ui-selecting");
				});
		$("#sys_Templates ul li a.t_details").click(
				function() {
					var tname = $(this).attr('tname');
					var tskin = $(this).attr('tskin');
					t_id=$(this).attr('tid');
					$('#template_name').text(tname);
					$('#template_pic img').attr('src','/assets/min/images/template/'+tskin+'_350x220.png');
					$('#template_desc_content').empty().append($(this).parent().find('.desc').html());
					$('#preview_template').attr('href','/zone/sys/'+tskin+'.html');
					$('#template_detail').dialog('open');
					$(this).toggleClass("ui-selected").siblings().removeClass(
							"ui-selected");
				});
		$("#use_template").click(function(){
				<#if type??&&"designer"==type>
					if($('#designer').length>0){
						if(t_id!=$('#designer').designer('option', 'stid')){//如果模板不同则切换
							if(confirm('确定使用此模板吗?')){
								$('#designer').designer('option', 'stid',t_id);
								$('#designer').designer('option', 'layout',t_layout);
								//$('#designer').designer('loadSysTemplate',t_id);
								$('#template_detail').dialog('close');
								$('#ui-designer-topbar').tabs( {
									selected : -1
								});
							}
						}else{
							alert('当前选择模板与正在使用的模板相同！');
							return;
						}
					}
					<#elseif type??&&"admin"==type>
						document.location.href="/router/member/designer/system/"+t_id;
					<#else>
						var _href="/router/member/designer?";
						<#if siteId??&&siteId!="">
							_href+="siteId=${siteId}";
							<#if tid??&&tid!="">
							_href+="&";
							</#if>
						</#if>
						<#if tid??&&tid!="">
							_href+="tid=${tid}";
						</#if>
						document.location.href=_href+"&stid="+t_id;
				</#if>
				
		});
	});
</script>
<div id="template_detail" title="模板详情">
<table>
<tr>
<td id="template_pic" align="center" style="padding:5px;border:1px solid #DDD;">
<ul style="list-style:none;">
<li><img width="350px" height="220px" style="border:1px solid #DDD;"/></li>
<li><a href="#" id="preview_template" target="_blank" class="button-red" style="color:#FFFFFF">预览页面效果</a><a href="#" id="use_template" class="button-red" style="color:#FFFFFF">应用此模板</a></li>
</ul>
</td>
<td id="_template_desc" width="250px" style="margin-left:30px;padding:5px;" valign="top">
	<div style="margin-left:30px;width:200px;">
	<h3 id="template_name"></h3>
	<strong>描述:</strong>
	<p id="template_desc_content"></p>
	</div>
</td>
</tr>
</table>
</div>
<div id="_templates">
<ul>
	<li><a href="#sys_Templates">系统模板</a></li>
</ul>
<div id="sys_Templates" style="background:#EFF8F9;margin:2px;height:100%;padding:5px;">
<table><tr><td>
<ul>
	<#if templates&&(templates?size>0)>
	<#list templates as t>
		<li>
			<div class="pic"><img
				src="/assets/min/images/template/${t.skin}_190x120.png" /></div>
			<div class="desc">
				${t.description}
			</div>
			<a href="#" class="t_details" tid="${t.id}" tname="${t.name}" tskin="${t.skin}">查看详情</a>
		</li>
	</#list>
	<#else>
		<li>糟糕！没有找到系统模板</li>
	</#if>
</ul>
</td></tr></table>
</div>
</div>
</#macro>