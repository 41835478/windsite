/**
 * 店铺列表浏览组件
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.shopsListView", $.ui.designerWidget, {
		options : {
			resizable : 'false',
			autoSize : 'true'
		},
		_toSource : function() {
			var widget = this.element;// 当前组件
			var clone = $('.widget-shopslistview-shops', widget).clone();
			this._convertHref(clone);
			var _source = $('<div></div>').append(clone).html();
			return _source;
		},
		_convertHref : function(widget) {
			$('li a', widget).each(function() {
				var href = $(this).attr('href').replace(PID, '%7Bpid%7D')
						.replace(PID, '%7Bpid%7D');
				$(this).attr('href', href);
			});
			return widget;
		},
		widgetSet : function() {
			var self = this;
			var component = this.element.find(".widget-shopslistview-shops");
			$('#shopsEditor').remove();
			$('body').append('<div id="shopsEditor" title="选择您收藏的店铺"></div>');
			editingShopsEditor = component;
			$('#shopsEditor').shopsEditor();
		},
		_moreOptions : function() {

		},
		_initDesignerWidget : function() {
			$('.widget-shopslistview-shops', this.element).show();
			var more = $('.ui-designer-widget-shops-more', this.element);
			if (more.length > 0) {
				more.attr('href', '/router/site/shops/14?pid=' + PID).show();
			}
		},
		_createDesignerWidget : function() {
		},
		_widgetOver : function() {
			$('#ui-designer-widget-handle').widgetHandle('display',
					[$('#widgetRemove')]);// 显示工具栏

		},
		_widgetOut : function() {
		},
		shopLi : function(shop) {
			var li;
			if (shop) {
				li = '<li class="shop" title="'
						+ shop.title
						+ '" commission="'
						+ shop.commission
						+ '" credit="'
						+ shop.credit
						+ '" sid="'
						+ shop.sid
						+ '"><a href="'
						+ shop.click_url.replace('13667242', convertPID())
						+ '" target="_blank"><span class="title">'
						+ shop.shortTitle
						+ '</span></a><span class="credit"><img src="/assets/min/images/credit/'
						+ shop.credit + '.gif"></span></li>';
			}
			return li;
		},
		_refresh : function(type) {
			var component = $('.widget-shopslistview-shops', this.element);
			if (component.children().length == 0) {
				var shops = SHOPS['default'];
				for (var i = 0; i < shops.length; i++) {
					component.append(this.shopLi(shops[i]));
				}
			}
		}
	});
})(jQuery);
