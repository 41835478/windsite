<#include "/site/template/header.ftl">
<script type="text/javascript">
	$(function() {
		var goto = $.url.param("goto");
		if($.url.param("goto")){
			switch(goto){
				case "widgets"://组件类型
						getHtmlDesignerWidgets();
					break;
				default://缺省组件类型		
					getHtmlDesignerWidgets();				
			}
		}else{
			getHtmlDesignerWidgets();
		}
	});
</script>	
<div id="rightContent" class="ui-widget-content ui-corner-all" style="width:950px;height:100%;" align="left">
</div>
<#include "/site/template/footer.ftl">