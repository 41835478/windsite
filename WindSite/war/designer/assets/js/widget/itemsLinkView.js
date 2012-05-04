/**
 * 商品图片浏览组件(图片大小固定)
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.itemsLinkView", $.ui.designerMacroWidget, {
		options : {
			resizable : 'true',
			gid : '0',// 推广组ID
			length : null
			// 长度
		},
		_moreOptions : function() {

		},
		_initDesignerWidget : function() {
			WidgetUtils.itemsLinkView_init($('.widget-itemslinkview-items',
					this.element));
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
				li = '<dt class="item" align="left" nid="' + item.num_iid
						+ '" co="' + item.commission + '">';
				li += '<a target="_blank" nid="' + item.num_iid + '" title="'
						+ title + '" xt="i" href="' + item.click_url
						+ '"><span class="ellipsis_text">' + item.title
						+ '</span></a>';// 标题
				li += "</dt>";
			} else {
				li = '<dt class="item" align="left">';
				li += '<a target="_blank" numiid="0" title="商品标题" href=""><span class="ellipsis_text">商品标题</span></a>';// 标题
				li += "</dt>";
			}
			return li;
		},
		_refresh : function(type) {
			var self = this;
			var widget = self.element;
			var o = this.options;
			var itemHeight = 30;
			var height = widget.height();
			var component = widget.find(".widget-itemslinkview-items");
			component.empty();
			if (isNaN(height)) {
				height = 0;
			}
			var vCount = parseInt((height - 30) / itemHeight);
			if (vCount == 0) {
				vCount = 1;
			}
			var length = this.options.length = vCount;
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
			component.height(vCount * 30);// 组件内部高度
			widget.height(component.height() + 30);// 组件高度
			WidgetUtils.itemsLinkView_init(component);
			if (isCommissionView) {// 如果是佣金查看模式
				$('dt', component).each(function() {
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
