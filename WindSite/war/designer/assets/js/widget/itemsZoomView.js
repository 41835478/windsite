/**
 * 九图放大展示组件
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.itemsZoomView", $.ui.designerMacroWidget, {
		options : {
			gid : '0',// 推广组ID
			length : 6
			// 长度
		},
		_initDesignerWidget : function() {
			WidgetUtils.itemsZoomView_init($('.widget-itemszoomview-items',
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
				li = '<li nid="' + item.num_iid + '" co="' + item.commission
						+ '"><div align="center" class="div-cell"><a nid="'
						+ item.num_iid + '" class="a-cell" href="' + pic_url
						+ '_310x310.jpg" price="' + item.price + '" title="'
						+ title + '" commission="' + item.commission
						+ '" click="' + item.click_url + '"><img src="'
						+ pic_url + '_100x100.jpg" alt="' + title
						+ '" /></a></div></li>';
			} else {
				li = '<li><div align="center" class="div-cell"><a  class="a-cell" href="'
						+ this.noPicture
						+ '" price="0" commission="0" title="商品标题" click="#"><img src="'
						+ this.noPicture + '" alt="商品标题" /></a></div></li>';
			}
			return li;
		},
		_refresh : function(type) {
			var self = this;
			var widget = self.element;
			var o = this.options;

			var component = widget.find(".widget-itemszoomview-items .thumb");
			var main = widget.find(".widget-itemszoomview-items .main-view");
			component.empty();
			var hCount = parseInt((widget.width() - 315) / 120);
			var length = this.options.length = hCount * 3;
			var items = self._items();
			if (items != null) {
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
			if (items != null) {
				var title = convertTitle(items[0].title);
				$('img', main).attr(
						'src',
						items[0].pic_url.replace('bao/uploaded', 'imgextra')
								+ "_310x310.jpg").attr('alt', title).attr(
						'title', title);
				$('.title a', main).empty().append(items[0].title).attr('href',
						items[0].click_url);
				$('.price', main).text(items[0].price + '元');
			} else {
				$('img', main).attr('src', this.noPicture).attr('alt', '商品标题')
						.attr('title', title);
				$('.title a', main).text("商品标题").attr('href', '#');
				$('.price', main).text("0元");
			}
			component.width(hCount * 120);
			WidgetUtils.itemsZoomView_init($('.widget-itemszoomview-items',
					widget));
			if (isCommissionView) {// 如果是佣金查看模式
				$('li', component).each(function() {
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
