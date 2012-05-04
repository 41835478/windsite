/**
 * 仿苹果图形展示组件
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.itemsAppleView", $.ui.designerMacroWidget, {
		options : {
			gid : '0',// 推广组ID
			length : 6
			// 长度
		},
		_initDesignerWidget : function() {
			WidgetUtils.itemsAppleView_init($('.widget-itemsappleview-items',
					this.element).show());
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
				var pic_url = item.pic_url.replace('bao/uploaded', 'imgextra');
				li = '<td class="menuItem" align="center"  nid="' + item.num_iid
						+ '" co="' + item.commission
						+ '"><a class="a-cell"><img src="' + pic_url
						+ '_60x60.jpg" alt="' + title + '" /></a></td>';
			} else {
				li = '<td class="menuItem" align="center"><a class="a-cell"><img src="'
						+ this.noPicture + '" alt="商品标题" /></a></td>';
			}
			return li;
		},
		_itemDiv : function(item) {
			var li;
			if (item) {
				var title = convertTitle(item.title);
				var pic_url = item.pic_url.replace('bao/uploaded', 'imgextra');
				li = '<div class="slide" align="center"><div style="width: 310px; height: 310px;"><a href="'
						+ item.click_url
						+ '" target="_blank" class="a-cell"><img src="'
						+ pic_url
						+ '_310x310.jpg" alt="'
						+ title
						+ '" /></a></div>'
						+ '<div><a class="title" target="_blank" href="'
						+ item.click_url
						+ '">'
						+ item.title
						+ '</a>'
						+ '<br/><span class="price-desc">价格:</span><span class="price">'
						+ item.price + '元</span></div></div>';
			} else {
				li = '<div class="slide" align="center"><div style="width: 310px; height: 310px;"><a class="a-cell"><img src="'
						+ this.noPicture
						+ '" alt="商品标题" /></a></div>'
						+ '<div><a class="title" target="_blank">商品标题</a>'
						+ '<br/><span class="price-desc">价格:</span><span class="price">0元</span></div></div>';
			}
			return li;
		},
		_refresh : function(type) {
			var self = this;
			var widget = self.element;
			var o = this.options;
			var slides = widget.find(".widget-itemsappleview-items .slides");
			var menu = widget
					.find(".widget-itemsappleview-items .menu table tr");
			slides.empty();
			menu.empty();
			var length = this.options.length = parseInt((widget.width() - 100)
					/ 80);
			var items = self._items();
			if (items != null) {
				for (var i = 0; i < length; i++) {
					if (i < items.length) {
						slides.append(self._itemDiv(items[i]));
						menu.append(self._itemLi(items[i]));
					} else {
						slides.append(self._itemDiv());
						menu.append(self._itemLi());
					}
				}
			} else {
				for (var i = 0; i < length; i++) {
					slides.append(self._itemDiv());
					menu.append(self._itemLi());
				}
			}
			WidgetUtils.itemsAppleView_init($('.widget-itemsappleview-items',
					widget));
			if (isCommissionView) {// 如果是佣金查看模式
				$('td', menu).each(function() {
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
