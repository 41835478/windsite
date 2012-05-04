<#include "/site/template/header.ftl">
<script type="text/javascript">
$('#search').click(function(){
		alert("搜索");
	}).hover(
		function() {
			$(this).addClass('ui-state-hover');
		},
		function() {
			$(this).removeClass('ui-state-hover');
		}
	)
	.focus(function() {
		$(this).addClass('ui-state-focus');
	})
	.blur(function() {
		$(this).removeClass('ui-state-focus');
	});
</script> 	
<div class="ui-widget-content ui-corner-all" align="left">
	<fieldset>
		<input type="text" name="keyword" id="keyword" class="text ui-widget-content ui-corner-all" />
		<#include "/site/template/category.ftl">
		<input type="button" name="search" id="search" class="" value="搜索"/>
	</fieldset>
</div>
<#include "/site/template/footer.ftl">