/**
 * 商品图片浏览组件(图片大小固定)
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.itemsCycleView", $.ui.designerMacroWidget, {
		options : {
			gid : '0',// 推广组ID
			effect : 'all',// 效果
			length : 5
			// 长度
		},
		_moreOptions : function() {

		},
		_initDesignerWidget : function() {
			var cycle = $('.widget-itemscycleview-items', this.element)
			WidgetUtils.itemsCycleView_init(cycle);
		},
		_createDesignerWidget : function() {
		},
		_widgetOver : function() {
			$('#ui-designer-widget-handle').widgetHandle('display',
					[$('#widgetRemove'), $('#itemGroups')]);// 显示工具栏

		},
		_widgetOut : function() {
		},
		_itemLi : function(item) {
			var li;
			if (item) {
				var title = convertTitle(item.title);
				li = '<div class="pic" align="center" nid="' + item.num_iid
						+ '" co="' + item.commission + '"><a href="'
						+ item.click_url + '" target="_blank" nid="'
						+ item.num_iid + '" title="' + item.title
						+ '" xt="i"><img src="'
						+ item.pic_url.replace('bao/uploaded', 'imgextra')
						+ '_160x160.jpg" click="' + item.click_url + '" alt="'
						+ title + '" nid="' + item.num_iid + '" title="'
						+ title + '" price="' + item.price + '" commission="'
						+ item.commission + '"/></a></div>';// 图片
			} else {
				li = '<div class="pic" align="center"><img src="'
						+ this.noPicture
						+ '" click="#" alt="商品标题" title="商品标题" price="0" commission="0"/></div>';// 图片
			}
			return li;
		},
		_refresh : function(type) {
			if (type == 'resizable') {
				return;
			}
			var self = this;
			var widget = self.element;
			var o = this.options;
			var cycle = widget.find('.widget-itemscycleview-items');
			var component = widget.find(".widget-itemscycleview-items .pics");
			component.empty();
			var length = this.options.length;
			var items = self._items();
			if (items != null) {
				length = this.options.length = items.length > 10
						? 10
						: items.length;
				for (var i = 0; i < length; i++) {
					if (i < items.length) {
						component.append(self._itemLi(items[i]));
					} else {
						component.append(self._itemLi());
					}
				}
			} else {
				for (var i = 0; i < length; i++) {
					component.append(self._itemLi());
				}
			}
			WidgetUtils.itemsCycleView_init(cycle);
			if (isCommissionView) {// 如果是佣金查看模式
				$('.pic', component).each(function() {
							addViewCommission($(this));
						});
			}
		},
		_toMacro : function() {
			var widget = this.element;// 组件
			var o = this.options;
			// macro
			var gid = o.gid;
			var length = o.length;
			var _source = "";
			if (gid != null && gid != '0') {// 推广组
				this.storeGroups(gid);
				_source += " items=g_" + gid + "";
			}
			if (length && length != null) {// 显示数量
				_source += " length=" + length;
			}
			return _source;
		}

	});
})(jQuery);
