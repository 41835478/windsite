<style>
.widgets .ui-selecting { background: #FECA40; }
.widgets .ui-selected { background: #F39814; color: white; }
.widgets { list-style-type: none; margin: 0; padding: 0; width: 100%;height:100% }
.widgets li { margin: 3px; padding: 1px; float: left; width: 170px; height: 170px; font-size: 4em; text-align: center; }
</style>
<script type="text/javascript">
	$(function() {
		$("#tabs").tabs();
		$(".selectedWidget").button();
		$(".widgets").selectable({
			/**stop: function(){
				if($(".ui-selected", this).length>1){
					alert("目前不支持选择多个组件");
					return;
				}
				$(".ui-selected", this).each(function(){
					alert("组件:"+$(this).attr("widget")+"\n属性:"+$(this).attr("properties"));
				});
			}**/
		});
		$(".selectedWidget").click(function(){
			var selected = $(".ui-selected", $(".widgets"));
			if(selected.length==0){
				alert("您没有选中组件");
			}
			if(selected.length>1){
				alert("目前不支持选择多个组件");
				return;
			}
			alert(selected.attr("name"));
		});
	});
	</script>
<div  class="ui-widget-content ui-corner-all">
<#if widgets??&&(widgets?size>0)>
<div id="tabs">
	<ul>
		<#list widgets as w>
		<li><a href="#${w.name}">${w.title}</a></li>
		</#list>
	</ul>
	<#list widgets as w>
		<table id="${w.name}">
			<tr><td>
			<#if w.widgets??&&(w.widgets?size>0)>
			<ol class="widgets">
				<#list w.widgets as s>	
					<li name="${s.name}" widget="{'name':'${s.name}','title':'${s.title}',picUrl:'${s.picUrl}','isActive':'${s.isActive}','isCharge':'${s.isCharge}'}"
						properties="<#if s.attributes??&&(s.attributes?size>0)><#list s.attributes as a><#if (a_index>0)>,</#if>{'name':'${a.name}','title':'${a.title}','type':'${a.type}','value':'${a.value}'}</#list></#if>">
						<div style="font-size:11pt;margin:10px;font-weight:bold;">
							<img src="${s.picUrl}" width=140px height=120px/>
							<table width=100%><tr>
							<td align=left><#if s.isCharge>收费<#else>免费</#if></td>
							<td align=right>${s.title}</td>
							</tr></table>
						</div>
					</li>
				</#list>
			</ol>
			</#if>
			</td>
			</tr>
			<tr><td><input type="button" class="selectedWidget" value="确定"/></td></tr>
		</table>
	</#list>
</div>
</#if>
</div><!-- End demo -->