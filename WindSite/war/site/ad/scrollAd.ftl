<#if ads??&&(ads?size>0)>
<div class="ui-designer-content ui-designer-ad"><div class="ui-designer-container middle-1" style="margin-right: 0px;"><div class="ui-designer-widget" name="itemsScrollableView" style="display:block;width:100%;height:225px;"  align="center"><div class="ui-designer-widget-header" align="left" style="cursor:default;"><b class="widget-title" wname="itemsScrollableView">掌柜推荐</b><a class="ui-designer-widget-more" target="_blank" style="display: inline;" href="">更多</a><div class="navi"></div></div><div class="widget-itemsscrollableview-items scrollable"> <div class="items"><#list ads as ad><#if ad.items?size!=0><div class="item" style="margin-left:20px;"><#list ad.items as i><div class="d-a-i" nid="${i.num_iid}" co="${i.commission}" style="margin-right:10px;"><a class="a-cell" href="/aditem/${i.id}.html" target="_blank" title="${i.title?replace('<span class=H>','')?replace('</span>','')}"><img src="${i.pic_url?replace("bao/uploaded", "imgextra")}_160x160.jpg" alt="${i.title?replace('<span class=H>','')?replace('</span>','')}" title="${i.title?replace('<span class=H>','')?replace('</span>','')}"/></a></div></#list></div></#if></#list></div></div></div></div></div>
<#if isLast??&&isLast><script>$(function(){WidgetUtils.itemsScrollableView_init($('.ui-designer-ad .widget-itemsscrollableview-items').show());});</script>
<#else>
<style>.widget-itemsscrollableview-items {display: none;padding: 0px;overflow: hidden;width: 100%;}.widget-itemsscrollableview-items {position: relative;overflow: hidden;height: 200px;width: 100%;}.widget-itemsscrollableview-items .items {width: 20000em;left: 0px;position: absolute;clear: both;}.widget-itemsscrollableview-items .items div.item {float: left;width: 100%;}.widget-itemsscrollableview-items .d-a-i {float: left;margin: 10px 4px 15px 4px;_margin: 10px 3px 15px 3px;background-color: #fff;padding: 2px;_padding: 1px;-moz-border-radius: 4px;-webkit-border-radius: 4px;vertical-align: middle;width: 160px;height: 160px;float: left;vertical-align: middle;border: 1px solid #ccc;}.widget-itemsscrollableview-items .d-a-i a {background-color: #F7F7F7;width: 160px;height: 160px; *font-size: 140px;}.widget-itemsscrollableview-items .d-a-i img {max-height:160px;max-width:160px;vertical-align: middle;border: 0px; #margin-top: -2px; /*IE7*/}.navi {position: absolute;right: 70px;top: 7px;}.navi a {width: 8px;height: 8px;float: left;margin: 3px;background: url(/assets/images/navigator.png) 0 0 no-repeat;display: block;font-size: 1px;}.navi a:hover {background-position: 0 -8px;}.navi a.active {background-position: 0 -16px;}</style>
<script type="text/javascript" src="/assets/js/jquery/tools/jquery.scrollable.all.min.js"></script>
<script>
$(function() {
	function itemsScrollableView_init(widget) {
		var parent = widget.parent();
		var nav = $('.navi', parent);
		if (nav.length == 0) {
			$('.ui-designer-widget-header', parent)
					.append('<div class="navi"></div>');
		}
		widget.show();
		var scrollable = widget.width(widget.width() - 2).height(200);
		var items = $('.item', scrollable).width(widget.width() - 2);
		var size = items.length;
		if (size > 0) {
			scrollable.scrollable({
						circular : true
					});
			scrollable.navigator({
						navi : widget.parent().find('.navi').empty()
					});
			scrollable.autoscroll({
						interval : 5000
					});
		}
	}
	itemsScrollableView_init($('.ui-designer-ad .widget-itemsscrollableview-items')
			.show());
});
</script>
</#if>
</#if>