/**
 * 滑动门图片展示组件
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.itemsRotatorView", $.ui.designerMacroWidget, {
		options : {
			gid : '0',// 推广组ID
			length : 6
			// 长度
		},
		_initDesignerWidget : function() {
			WidgetUtils.itemsRotatorView_init($(
					'.widget-itemsrotatorview-items', widget));
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
				li = '<li nid="' + item.num_iid + '" co="' + item.commission
						+ '"><div class="div-cell" align="center"><a href="'
						+ item.pic_url + '"  class="a-cell"><img src="'
						+ item.pic_url.replace('bao/uploaded', 'imgextra')
						+ '_40x40.jpg" alt="' + title + '" /></a></div>';
				li += '<div align="left" class="title" commission="'
						+ item.commission + '" price="' + item.price
						+ '" href="' + item.click_url + '">' + item.title
						+ '</div></li>';
			} else {
				li = '<li><div class="div-cell" align="center"><a href="'
						+ this.noPicture + '"  class="a-cell"><img src="'
						+ this.noPicture + '" alt="商品标题" /></a></div>';
				li += '<div align="left" class="title" commission="0" price="0">商品标题</div></li>';
			}
			return li;
		},
		_refresh : function(type) {
			if (type == 'resizable') {// 如果是拉伸则直接返回
				return;
			}
			var self = this;
			var widget = self.element;
			var o = this.options;
			var component = widget
					.find(".widget-itemsrotatorview-items .image_thumb ul");
			var main = widget
					.find(".widget-itemsrotatorview-items .main_image");
			component.empty();
			var length = this.options.length;
			var items = self._items();
			for (var i = 0; i < length; i++) {
				if (items != null) {
					if (i < items.length) {
						component.append(self._itemLi(items[i]));
					} else {
						component.append(self._itemLi());
					}
				} else {
					component.append(self._itemLi());
				}
				if (i == 0) {
					if (items != null) {
						var title = convertTitle(items[0].title);
						$('.main_img', main).parent().attr("href",
								items[0].click_url);
						$('.main_img', main).attr(
								'src',
								items[0].pic_url.replace('bao/uploaded',
										'imgextra')
										+ "_310x310.jpg").attr('alt', title)
								.attr('title', title);
					} else
						$('.main_img', main).attr('src', this.noPicture).attr(
								'alt', '商品标题').attr('title', '商品标题');
				}
			}
			WidgetUtils.itemsRotatorView_init($(
					'.widget-itemsrotatorview-items', widget));
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
