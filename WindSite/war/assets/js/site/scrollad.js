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